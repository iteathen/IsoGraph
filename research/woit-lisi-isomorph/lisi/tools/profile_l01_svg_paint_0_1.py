#!/usr/bin/env python3
"""Source-pinned L01 Figure 1 SVG paint and geometry-role diagnostic.

Report render occurrences, *not* certified edges. Fill-only artwork, including
possible text/glyph outlines and filled connectors, stays in scope separately
from stroke-bearing curves. Unknown CSS, clip/mask/filter, and paint is reported.
"""
import argparse
import collections
import hashlib
import importlib.util
import json
import pathlib
import subprocess
import tempfile
import xml.etree.ElementTree as ET

PDF_SHA = '344cfc45eb505b28f322ccee3de6192703893da7c31260ed384885525d6a9dfe'
SVG_SHA = '3e6d5eb7ba8ad6410ac25ae50a4a47ae844e932aad06284684e8c0f9fe183430'
PNG_SHA = '8355664c5dd621e0aaec479db0e13f6bacacaa2b01b9dea517c581edbdf1b4fe'
CROP = [270, 275, 540, 495]
STYLE_KEYS = {'fill','stroke','opacity','fill-opacity','stroke-opacity','display','visibility','clip-path','mask','filter'}
SHAPES={'path','line','polyline','polygon','rect','circle','ellipse','text','image'}


def name(el):return el.tag.rsplit('}', 1)[-1]

def sha(data):return hashlib.sha256(data).hexdigest()

def attrs(el, inherited):
    d = dict(inherited)
    for k in STYLE_KEYS:
        if k in el.attrib:d[k]=el.attrib[k].strip()
    for chunk in el.attrib.get('style','').split(';'):
        if ':' in chunk:
            k,v=chunk.split(':',1)
            if k.strip() in STYLE_KEYS:d[k.strip()]=v.strip()
    return d

def active(value):
    if value is None:return True
    try:return float(value)>0
    except (TypeError,ValueError):return None

def paint(status,el,ancillary):
    if status.get('display')=='none' or status.get('visibility')=='hidden':return 'hidden',[]
    opa=active(status.get('opacity'))
    fs=active(status.get('fill-opacity'))
    ss=active(status.get('stroke-opacity'))
    if opa is False:return 'hidden',[]
    fill=status.get('fill','black')
    stroke=status.get('stroke','none')
    unclear=bool(el.get('class')) or ancillary.get('stylesheets',False)
    if any(v is None for v in (opa,fs,ss)):unclear=True
    for k in ('fill','stroke'):
        v=status.get(k,'')
        if 'url(' in v or v in {'inherit','currentColor','context-stroke','context-fill','unset','initial'}:
            unclear=True
    if unclear:return 'paint_unknown',['CSS_CLASS_OR_UNRESOLVED_PAINT']
    have_fill = fill not in {'none','transparent',''} and fs is not False
    have_stroke=stroke not in {'none','transparent',''} and ss is not False
    if have_fill and have_stroke:return 'filled_and_stroked',[]
    if have_stroke:return 'stroke_only',[]
    if have_fill:return 'fill_only',[]
    return 'unpainted',[]

def inspect_svg(raw):
    root=ET.fromstring(raw)
    index={el.get('id'):el for el in root.iter() if el.get('id')}
    style_elements=[el for el in root.iter() if name(el)=='style']
    counts=collections.Counter(); examples=collections.defaultdict(list)
    clip_visits=collections.Counter(); unknowns=collections.Counter()
    use_unresolved=[]
    def walk(el, st, marks, parents, address, chain=()):
        typ=name(el)
        if typ in {'defs','symbol','clipPath','mask','filter','pattern','marker'} and not chain:return
        cur=attrs(el,st)
        marker=list(marks)
        if el.get('class'):marker.append('css_class')
        for k in ('clip-path','mask','filter'):
            if cur.get(k) not in (None,'none'):
                if k not in marker:marker.append(k)
        if cur.get('display')=='none':return
        location=address+'/'+typ+((':'+el.get('id')) if el.get('id') else '')
        if typ=='use':
            href=el.get('href') or el.get('{http://www.w3.org/1999/xlink}href')
            if not href or not href.startswith('#') or href[1:] not in index or href in chain:
                use_unresolved.append({'where':location[-145:],'ref':href,'reason':'invalid-or-cyclic-use'})
                return
            walk(index[href[1:]],cur,marker,parents+[location],location,chain+(href,))
            return
        if typ in SHAPES:
            counts['rendered_shape_occurrences']+=1
            p,errs=paint(cur,el,{'stylesheets':bool(style_elements)})
            counts['paint_'+p]+=1
            if typ=='path':
                d=el.get('d','')
                is_curve=any(ch in d for ch in 'CcSsQqTtAa')
                kind='curve' if is_curve else 'no_curve'
            else: kind='other_shape'
            label=p+'_'+kind
            counts[label]+=1
            if len(examples[label])<5:
                examples[label].append({'source':location[-175:],'type':typ,'d':el.get('d','')[:90],
                   'fill':cur.get('fill','black'),'stroke':cur.get('stroke','none'),
                   'style_keys':sorted(cur.keys())})
            if marker:
                counts['shape_with_unresolved_render_context']+=1
                for k in set(marker):clip_visits[k]+=1
            for e in errs:unknowns[e]+=1
            # Even fill-only curved artwork can depict an actual thick connector.
            # Therefore retain fill-only occurrences rather than calling them irrelevant.
        for i,kid in enumerate(el):
            walk(kid,cur,marker,parents+[location],location+f'[{i}]',chain)
    walk(root,{},[],[],'root')
    return {'source_svg_sha256':sha(raw),'candidate_authority':False,
        'fill_only_artwork_semantics_unresolved':True,
        'rendered_shape_occurrences':counts['rendered_shape_occurrences'],
        'counts':dict(sorted(counts.items())),
        'clip_and_opaque_render_contexts':dict(sorted(clip_visits.items())),
        'unknowns':dict(sorted(unknowns.items())),
        'invalid_use_references':use_unresolved[:25],
        'examples':dict(examples),
        'glyph_vs_connector_mapping':'UNQUALIFIED'}

def selftest():
    xml=b'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs><path id="glyph" fill="black" d="M0 0 C1 1 2 2 3 3Z"/></defs>
      <use xlink:href="#glyph"/><use xlink:href="#glyph"/>
      <path d="M0 0 Q1 2 3 4" stroke="black" fill="none"/>
      <g style="stroke:green;fill:none" clip-path="url(#missing)"><path d="M0 0L5 5"/></g>
      <path d="M0 0L2 2" fill="none" stroke="blue"/>
    </svg>'''
    x=inspect_svg(xml);c=x['counts']
    assert x['rendered_shape_occurrences']==5,c
    assert c['fill_only_curve']==2,c
    assert c['stroke_only_curve']==1,c
    assert c['stroke_only_no_curve']==2,c
    assert c['shape_with_unresolved_render_context']==1,c
    assert x['clip_and_opaque_render_contexts']=={'clip-path':1}
    assert x['candidate_authority'] is False
    empty=b'<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0 C1 1 2 2 3 3" fill="none" stroke="none"/></svg>'
    z=inspect_svg(empty);assert z['counts']['unpainted_curve']==1,z
    print(json.dumps({'self_test':'PASS','cases':2,'two_reused_fill_curves_preserved':True,
        'stroke_curve_separately_preserved':True,'clipped_shape_debt_preserved':True,
        'figure_semantics_qualified':False},sort_keys=True))

def run(args):
    return subprocess.run(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True,timeout=70).stdout

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--self-test',action='store_true')
    ap.add_argument('--pdf',type=pathlib.Path)
    ap.add_argument('--extractor',type=pathlib.Path,required=False)
    a=ap.parse_args()
    if a.self_test:selftest();return
    if not a.pdf or not a.extractor:ap.error('--pdf and --extractor required')
    data=a.pdf.read_bytes()
    if sha(data)!=PDF_SHA or len(data)!=623525:raise SystemExit('L01_FROZEN_PDF_SHA_OR_BYTES_MISMATCH')
    spec=importlib.util.spec_from_file_location('original_L01_candidate_extractor',a.extractor)
    mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
    with tempfile.TemporaryDirectory(prefix='L01-svg-paint-') as tmp:
        folder=pathlib.Path(tmp)
        base=folder/'original_page3.svg'
        run(['pdftocairo','-f','3','-l','3','-svg',str(a.pdf),str(base)])
        svgs=list(folder.glob('original_page3*svg'))
        if len(svgs)!=1:raise ValueError('source SVG export not unique')
        raw=svgs[0].read_bytes()
        if sha(raw)!=SVG_SHA:raise SystemExit('SVG_RENDERER_SHA_CHANGE_NOT_QUALIFIED')
        pngprefix=folder/'original_96'
        run(['pdftoppm','-f','3','-l','3','-r','96','-singlefile','-png',str(a.pdf),str(pngprefix)])
        png=(folder/'original_96.png').read_bytes()
        if sha(png)!=PNG_SHA:raise SystemExit('RASTER_RENDERER_SHA_CHANGE_NOT_QUALIFIED')
        paintreport=inspect_svg(raw)
        old=mod.parse_svg(raw,region=CROP)
        if old['source_svg_sha256']!=SVG_SHA or old['expanded_shape_count']!=paintreport['rendered_shape_occurrences']:
            raise ValueError('expansion census mismatch')
        if old['qualifies_source_graph'] or paintreport['candidate_authority']:
            raise ValueError('unqualified source geometry was promoted')
        longs=[]
        for seg in old['stroke_candidates']:
            p,q=seg['geometry'];dx=q[0]-p[0];dy=q[1]-p[1]
            length=(dx*dx+dy*dy)**.5
            if length>=10.0:
                longs.append({'node':seg['node'][-140:],'p':p,'q':q,'length_pt':round(length,5),
                    'stroke':seg.get('stroke'),'clip_certified':seg.get('clip_certified')})
        longs.sort(key=lambda x:-x['length_pt'])
        out={
          'schema':'isograph.exp062.track-L.G0.L01-original-svg-paint-role-profile.v0.1',
          'track':'L','stage':'G0','evidence_class':'PROJECT_CONTROLLED_SOURCE_VECTOR_PAINT_DIAGNOSTIC',
          'source_rev':'arXiv:0711.0770v1','PDF_SHA256':sha(data),
          'svg_sha256':sha(raw),'raster_SHA256':sha(png),
          'paint_profile':paintreport,
          'v0_2_extractor_expanded_shapes':old['expanded_shape_count'],
          'v0_2_candidate_strokes_in_crop':len(old['stroke_candidates']),
          'v0_2_incomplete_entries':len(old['incomplete_items']),
          'candidate_segments_length_ge10_pt':len(longs),
          'candidate_segment_ge10_samples':longs[:36],
          'semantic_source_connector_map_qualified':False,
          'figure_glyph_semantic_read_cold_qualified':False,
          'L01_S004_cold_complete':False,'SSC0_96_count_unchanged':191,'G0_frozen':False,
          'W_imported':False,'G1_authorized':False,'PR70_merge_authorized':False,
          'source_svg_role_scope':'All rendered SVG shapes, not bounded to Figure1 for curves; straight-line selection uses crop only.',
          'qualifying_claim':'SOURCE_DRAWING_PAINT_CLASS_COUNTS_ONLY'}
        print('BEGIN_L01_PAINT_PROFILE_JSON')
        print(json.dumps(out,ensure_ascii=False,sort_keys=True,indent=2))
        print('END_L01_PAINT_PROFILE_JSON')

if __name__=='__main__':main()
