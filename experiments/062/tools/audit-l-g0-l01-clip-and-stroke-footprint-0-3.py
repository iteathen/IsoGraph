#!/usr/bin/env python3
"""L01 G0 -- source-pinned SVG stroke *footprint* and clip polygon audit.

This is mechanical rendered-ink geometry, not field-action semantics, a cold
image decoder, a proof of L01 Figure1 graph ontology, or G0 qualification.
"""
import argparse
import collections
import hashlib
import importlib.util
import json
import math
import pathlib
import re
import subprocess
import tempfile
import xml.etree.ElementTree as ET

ROOT=pathlib.Path(__file__).resolve().parents[3]
EXTRACTOR=ROOT/'research/woit-lisi-isomorph/lisi/tools/extract_l01_svg_strokes_0_2.py'
PDF_SHA='344cfc45eb505b28f322ccee3de6192703893da7c31260ed384885525d6a9dfe'
SVG_SHA='3e6d5eb7ba8ad6410ac25ae50a4a47ae844e932aad06284684e8c0f9fe183430'
PNG96_SHA='8355664c5dd621e0aaec479db0e13f6bacacaa2b01b9dea517c581edbdf1b4fe'
W_IDS=(249,251,256)
CROP=(270,275,540,495)

def sha(b):return hashlib.sha256(b).hexdigest()
def local(n):return n.tag.rsplit('}',1)[-1]
def exec_binary(cmd,seconds=55):
    return subprocess.run(cmd,stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True,timeout=seconds).stdout

def cross(u,v):return u[0]*v[1]-u[1]*v[0]
def sub(x,y):return (x[0]-y[0],x[1]-y[1])
def area(poly):
    if len(poly)<3:return 0.
    return abs(sum(cross(poly[i],poly[(i+1)%len(poly)]) for i in range(len(poly)))/2)
def signed_area(poly):
    return sum(cross(poly[i],poly[(i+1)%len(poly)]) for i in range(len(poly)))/2 if len(poly)>=3 else 0
def intersection(p,q,a,b):
    r,s=sub(q,p),sub(b,a)
    det=cross(r,s)
    if abs(det)<1e-11:raise ValueError('NEAR_PARALLEL_EDGE_INTERSECTION')
    t=cross(sub(a,p),s)/det
    return (p[0]+t*r[0],p[1]+t*r[1])
def inside(pt,a,b,orientation):
    return orientation*cross(sub(b,a),sub(pt,a))>=-1e-9
def intersect_convex(subject, clip):
    if not subject or not clip:return []
    ori=1 if signed_area(clip)>=0 else -1
    output=list(subject)
    for k in range(len(clip)):
        edge0,edge1=clip[k],clip[(k+1)%len(clip)]
        prior=output;output=[]
        if not prior:return []
        prev=prior[-1]
        for cur in prior:
            inc, inp=inside(cur,edge0,edge1,ori),inside(prev,edge0,edge1,ori)
            if inc!=inp:output.append(intersection(prev,cur,edge0,edge1))
            if inc:output.append(cur)
            prev=cur
    return output
def rect_for_centerline(seg,width):
    p,q=seg
    dx,dy=q[0]-p[0],q[1]-p[1]
    length=math.hypot(dx,dy)
    if length<=0 or width<=0:raise ValueError('DEGENERATE_SEGMENT_OR_WIDTH')
    nx,ny=-dy*width/(2*length),dx*width/(2*length)
    return [(p[0]+nx,p[1]+ny),(q[0]+nx,q[1]+ny),
            (q[0]-nx,q[1]-ny),(p[0]-nx,p[1]-ny)]

def synthetic():
    three=[rect_for_centerline(([0,0],[10,0]),1.0),
           rect_for_centerline(([10,0],[0,8]),1.0),
           rect_for_centerline(([10,0],[0,-8]),1.0)]
    triple=intersect_convex(intersect_convex(three[0],three[1]),three[2])
    if not area(triple)>0:raise AssertionError('SYNTHETIC_THREE_STROKE_CONTACT_EXPECTED')
    away=rect_for_centerline(([13,10],[15,12]),1.0)
    if area(intersect_convex(three[0],away))>1e-10:raise AssertionError('SYNTHETIC_FALSE_CONTACT')
    if area(intersect_convex(three[0],three[0]))<9.9999:raise AssertionError('SELF_OVERLAP')
    print(json.dumps({'source_never_loaded':True,'synthetic_stroke_footprint_checks':'PASS','author_semantic_graph_qualified':False}))

def style_tree(el,parent):
    a={}
    chain=[]
    cur=el
    while cur is not None:
        chain.append(cur);cur=parent.get(cur)
    chain.reverse()
    for node in chain:
        for k in ['stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-dasharray',
                  'vector-effect','clip-path','mask','filter','opacity','stroke-opacity','visibility','display']:
            if k in node.attrib:a[k]=node.attrib[k]
        for field in node.get('style','').split(';'):
            if ':' in field:
                k,v=field.split(':',1);a[k.strip()]=v.strip()
    return a,chain

def source_segments(root, mod):
    x=mod.parse_svg(ET.tostring(root),region=list(CROP))
    segments={}
    for n in W_IDS:
        matched=[s for s in x['stroke_candidates'] if s['node']==f'root/svg[{n}]/path']
        if len(matched)!=1:raise ValueError('SOURCE_PATH_UNIQUE_STROKE_'+str(n)+'='+str(len(matched)))
        segments[n]=matched[0]
    if len(x['stroke_candidates'])!=108:raise ValueError('SOURCE_CROP_CANDIDATE_COUNT_CHANGED')
    return x,segments

def w_paths(root,segments,mod):
    parent={c:p for p in root.iter() for c in p}
    result={}
    widths={}
    for n,s in segments.items():
        raw=root[n]
        if local(raw)!='path':raise ValueError('SOURCE_NODE_NOT_PATH_'+str(n))
        sty,chain=style_tree(raw,parent)
        transforms=[x.get('transform') for x in chain if x.get('transform')]
        transform=mod.IDENTITY
        for tr in transforms:
            m,errs=mod.matrix(tr)
            if errs:raise ValueError('BAD_SOURCE_TRANSFORM_'+str(errs))
            transform=mod.mul(transform,m)
        a,b,c,d,e,f=transform
        sx,sy=math.hypot(a,b),math.hypot(c,d)
        dot=a*c+b*d
        uniform=abs(sx-sy)<1e-7 and abs(dot)<1e-7
        linecap=sty.get('stroke-linecap','butt')
        linejoin=sty.get('stroke-linejoin','miter')
        dashed=sty.get('stroke-dasharray','none') not in ('none','')
        clipped=bool([x for x in chain if x.get('clip-path')])
        clipped=clipped or sty.get('clip-path','none')!='none'
        masked=sty.get('mask','none')!='none' or sty.get('filter','none')!='none'
        vector_effect=sty.get('vector-effect','none')
        width=float(sty.get('stroke-width','1'))*sx if uniform else None
        widths[n]=width
        path_d=raw.get('d','')
        local_segs,bad=mod.path_lines(path_d)
        if bad or len(local_segs)!=1:raise ValueError('W_SOURCE_PATH_NOT_SINGLE_LINEAR_SEGMENT_'+str(n))
        if s['clip_certified'] is False and not clipped:raise ValueError('CLIP_CONTEXT_DIVERGENCE')
        may_butt=bool(uniform and linecap=='butt' and not dashed and not clipped and not masked and vector_effect in ('none','') and width and width>0)
        result[str(n)]={'node':s['node'],'source_path_data':path_d,'raw_attributes':dict(raw.attrib),
           'styles_effective':sty,'parent_transform_chain':transforms,
           'affine':list(transform),'uniform_scale':uniform,'effective_width_pdfpt':width,
           'linecap':linecap,'linejoin':linejoin,'dashed':dashed,'clip_present':clipped,
           'mask_or_filter_present':masked,'vector_effect':vector_effect,
           'segment_pdfpt':s['geometry'],'centerline_length_pdfpt':math.dist(*s['geometry']),
           'butt_footprint_may_be_inferred':may_butt,'semantic_physics_action_qualified':False}
    footprints={}
    for n in W_IDS:
        if result[str(n)]['butt_footprint_may_be_inferred']:
            footprints[n]=rect_for_centerline(segments[n]['geometry'],widths[n])
    pair={}
    triple={}
    if len(footprints)==3:
        for i,n in enumerate(W_IDS):
            for k in W_IDS[i+1:]:
                poly=intersect_convex(footprints[n],footprints[k])
                pair[f'{n}-{k}']={'overlap_area_pdfpt2':area(poly),'vertex_count':len(poly)}
        poly=intersect_convex(intersect_convex(footprints[249],footprints[251]),footprints[256])
        triple={'overlap_area_pdfpt2':area(poly),'overlap_polygon_pdfpt':[[round(p[0],8),round(p[1],8)] for p in poly],
                'all_three_overlap_with_butt_cap_model':area(poly)>1e-8,
                'scope':'SOURCE_SVG_STROKE_GEOMETRY_IF_STYLE_UNIFORM_NO_CLIP_NOT_GRAPH_ONTOLOGY'}
    return {'paths':result,'widths':widths,'pairwise_butt_footprint_overlap':pair,'three_way_butt_footprint':triple}

def clip_definitions(root,mod):
    ids={el.get('id'):el for el in root.iter() if local(el)=='clipPath' and el.get('id')}
    refs=collections.Counter()
    for node in root.iter():
        x=(node.get('clip-path') or '')
        for field in node.get('style','').split(';'):
            if field.strip().startswith('clip-path:'):x=field.split(':',1)[1]
        for k in re.findall(r'url\(\s*[\"\']?#([^\"\')]+)',x):refs[k]+=1
    result=[]
    for key,el in sorted(ids.items()):
        paths=[v for v in el.iter() if local(v)=='path']
        if len(paths)!=1:raise ValueError('CLIP_NOT_SINGLE_PATH_'+key)
        pp=paths[0];raw=pp.get('d','')
        seg,bad=mod.path_lines(raw)
        consecutive=bool(seg) and all(math.dist(seg[i][1],seg[i+1][0])<1e-5 for i in range(len(seg)-1))
        closed=bool(seg) and math.dist(seg[0][0],seg[-1][1])<1e-5
        pts=[seg[0][0]]+[p[1] for p in seg] if seg else []
        x=[q[0] for q in pts];y=[q[1] for q in pts]
        result.append({'clip_id':key,'refs':refs[key],'units':el.get('clipPathUnits','userSpaceOnUse'),
           'raw_path_d':raw[:1100],'path_transform':pp.get('transform'),
           'clipPath_transform':el.get('transform'),'path_fill_rule':pp.get('clip-rule',el.get('clip-rule','nonzero')),
           'segments':len(seg),'source_curve_or_parse_errors':bad,'consecutive':consecutive,'closed':closed,
           'path_bbox_untransformed':([min(x),min(y),max(x),max(y)] if x else None),
           'polygon_signed_area_untransformed':signed_area(pts[:-1]) if len(pts)>2 else None,
           'source_rendered_clip_visibility_proven':False})
    return {'definitions':result,'references':dict(refs),'missing_definitions':sorted(set(refs)-set(ids)),
            'all_linear_closed_chains':all(v['closed'] and v['consecutive'] and not v['source_curve_or_parse_errors'] for v in result),
            'exact_clip_visibility_qualified':False}

def ppm_image(pdf,folder,dpi=384):
    prefix=folder/f'original_{dpi}'
    exec_binary(['pdftoppm','-f','3','-l','3','-r',str(dpi),'-singlefile',str(pdf),str(prefix)])
    raw=(folder/f'original_{dpi}.ppm').read_bytes()
    m=re.match(rb'P6\s+(\d+)\s+(\d+)\s+255\s',raw)
    if not m:raise ValueError('UNSUPPORTED_PPM_FORMAT')
    w,h=int(m.group(1)),int(m.group(2))
    if w!=int(612*dpi/72) or h!=int(792*dpi/72):raise ValueError('ORIGINAL_PAGE_DPI_MISMATCH')
    if len(raw)-m.end()!=w*h*3:raise ValueError('PPM_SIZE_WRONG')
    return (raw,m.end(),w,h,dpi)

def sample_ink(ppm,x,y,radius=2):
    data,off,w,h,dpi=ppm
    cx,cy=int(round(x*dpi/72)),int(round(y*dpi/72))
    total=dark=0
    for yy in range(cy-radius,cy+radius+1):
        for xx in range(cx-radius,cx+radius+1):
            if not 0<=xx<w or not 0<=yy<h:continue
            z=off+3*(yy*w+xx);v=data[z:z+3]
            dark+=int(sum(v)<300)
            total+=1
    return {'dark':dark,'sampled':total}

def raster_contact_samples(pdf,folder,geom):
    pp=ppm_image(pdf,folder,384)
    poly=geom['three_way_butt_footprint'].get('overlap_polygon_pdfpt',[])
    if not poly:return {'triple_overlap_raster':'NOT_APPLICABLE_MODEL_BUTT_UNKNOWN'}
    cx=sum(p[0] for p in poly)/len(poly);cy=sum(p[1] for p in poly)/len(poly)
    probes=[]
    for shiftx,shifty in ((0,0),(-.4,0),(.4,0),(0,-.4),(0,.4),(-3,0),(3,0),(0,-3),(0,3)):
        x,y=cx+shiftx,cy+shifty
        probes.append({'x_pt':round(x,6),'y_pt':round(y,6),'offset_pt':[shiftx,shifty],
            'sample':sample_ink(pp,x,y,radius=2)})
    return {'dpi':384,'pixel_dimensions':[pp[2],pp[3]],'footprint_centroid_pdfpt':[cx,cy],
            'raster_probes':probes,'same_source_renderer_not_cold_independent':True}

def main():
    p=argparse.ArgumentParser()
    p.add_argument('--self-test',action='store_true')
    p.add_argument('--pdf',type=pathlib.Path)
    a=p.parse_args()
    if a.self_test:synthetic();return
    if not a.pdf:p.error('--pdf required except --self-test')
    source=a.pdf.read_bytes()
    if len(source)!=623525 or sha(source)!=PDF_SHA:raise SystemExit('ORIGINAL_PRIMARY_PDF_SHA_MISMATCH')
    spec=importlib.util.spec_from_file_location('original_svg_extractor',EXTRACTOR)
    mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
    with tempfile.TemporaryDirectory(prefix='isograph-L01-ink-') as dd:
        folder=pathlib.Path(dd)
        export=folder/'source_page3.svg'
        exec_binary(['pdftocairo','-f','3','-l','3','-svg',str(a.pdf),str(export)])
        match=list(folder.glob('source_page3*svg'))
        if len(match)!=1:raise ValueError('SVG_NOT_UNIQUE')
        svg=match[0].read_bytes()
        if sha(svg)!=SVG_SHA:raise ValueError('ORIGINAL_SVG_SHA_MISMATCH')
        img=folder/'source_96'
        exec_binary(['pdftoppm','-f','3','-l','3','-r','96','-singlefile','-png',str(a.pdf),str(img)])
        if sha((folder/'source_96.png').read_bytes())!=PNG96_SHA:raise ValueError('96DPI_PNG_SHA_MISMATCH')
        root=ET.fromstring(svg)
        report,segments=source_segments(root,mod)
        clip=clip_definitions(root,mod)
        W=w_paths(root,segments,mod)
        raster=raster_contact_samples(a.pdf,folder,W)
        result={
            'schema':'isograph.exp062.track-L.G0.L01-original-SVG-clipping-and-butt-stroke-overlap.v0.3',
            'track':'L','stage':'G0','source_arxiv_revision':'0711.0770v1',
            'original_source_SHA256':sha(source),'source_SVG_SHA256':sha(svg),
            'source_96dpi_png_sha256':PNG96_SHA,
            'page_shape_expansion':report['expanded_shape_count'],
            'crop_line_segments':len(report['stroke_candidates']),
            'clip_definitions':clip,
            'W_three_path_geometric_stroke_analysis':W,
            'W_384dpi_ink_samples':raster,
            'no_source_semantic_graph_qualified':True,
            'no_source_field_action_qualified':True,
            'source_glyph_meaning_independently_cold_qualified':False,
            'source_figure1_S004_exact_visual_qualified':False,
            'SSC0_96_source_ids_unchanged':191,
            'G0_frozen':False,'G1_authorized':False,
            'W_semantics_imported':False,'cross_track_synthesis_authorized':False,
            'PR70_merge_authorized':False,
            'interpretation_firewall':'SVG path ink geometry including butt-cap overlap cannot establish author graph/physics nodes'}
        print('BEGIN_L01_STROKE_AND_CLIP_JSON')
        print(json.dumps(result,sort_keys=True,indent=2,ensure_ascii=False))
        print('END_L01_STROKE_AND_CLIP_JSON')

if __name__=='__main__':main()
