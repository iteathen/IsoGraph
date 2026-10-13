#!/usr/bin/env python3
"""L01 G0 original Figure 1: clipped table outline versus W ink source paths.

This mechanical report is CONDITIONAL on unresolved SVG clip application. It
does not infer graph vertices, field action, or independent cold semantics.
"""
import argparse
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
AUDIT=ROOT/'experiments/062/tools/audit-l-g0-l01-clip-and-stroke-footprint-0-3.py'
EXTRACTOR=ROOT/'research/woit-lisi-isomorph/lisi/tools/extract_l01_svg_strokes_0_2.py'
PDF_SHA='344cfc45eb505b28f322ccee3de6192703893da7c31260ed384885525d6a9dfe'
SVG_SHA='3e6d5eb7ba8ad6410ac25ae50a4a47ae844e932aad06284684e8c0f9fe183430'
FIG_REGION=(270,275,540,495)
def sha(data):return hashlib.sha256(data).hexdigest()
def module(path,label):
    s=importlib.util.spec_from_file_location(label,path)
    o=importlib.util.module_from_spec(s);s.loader.exec_module(o);return o
def tag(el):return el.tag.rsplit('}',1)[-1]
def path_chain(node,parents):
    path=[]
    while node is not None:path.append(node);node=parents.get(node)
    return list(reversed(path))
def affine(chain,helper):
    cur=helper.IDENTITY
    for el in chain:
        local,errors=helper.matrix(el.get('transform'))
        if errors:raise ValueError('UNSUPPORTED_AFFINE:'+repr(errors))
        cur=helper.mul(cur,local)
    return cur
def styles(chain):
    r={}
    for el in chain:
        for k in ['stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-dasharray','vector-effect','clip-path','mask','filter','opacity','visibility']:
            if k in el.attrib:r[k]=el.attrib[k]
        for item in el.get('style','').split(';'):
            if ':' in item:
                k,v=item.split(':',1);r[k.strip()]=v.strip()
    return r
def path_linework(node,parents,helper):
    chain=path_chain(node,parents)
    m=affine(chain,helper);style=styles(chain)
    source,err=helper.path_lines(node.get('d',''))
    seg=[(helper.at(m,*x),helper.at(m,*y)) for x,y in source]
    scale_x,scale_y=math.hypot(m[0],m[1]),math.hypot(m[2],m[3])
    uniform=abs(scale_x-scale_y)<1e-7 and abs(m[0]*m[2]+m[1]*m[3])<1e-7
    clip_anc=[el.get('clip-path') or (el.get('style','').split('clip-path:',1)[-1].split(';')[0] if 'clip-path:' in el.get('style','') else None) for el in chain]
    return {'source_segments':len(source),'bad_path_commands':err,
        'source_segments_pdfpt':seg[:20], 'style_inherited':style,'transform':list(m),
        'uniform_affine':uniform,'source_pen_width_pagept':(float(style.get('stroke-width','1'))*scale_x if uniform else None),
        'cap':style.get('stroke-linecap','butt'),
        'clip_ancestor_values':[x for x in clip_anc if x and x!='none'],
        'node_D_prefix':node.get('d','')[:330],
        'semantics_qualified':False}

def clip_groups(root,parents,helper):
    clips={el.get('id'):el for el in root.iter() if tag(el)=='clipPath' and el.get('id')}
    out=[]
    for i,group in enumerate(root):
        st=styles(path_chain(group,parents))
        attr=st.get('clip-path','')
        if not attr or attr=='none':continue
        refs=re.findall(r'url\(\s*["\']?#([^"\')]+)',attr)
        if len(refs)!=1:raise ValueError('AMBIGUOUS_CLIP_REF_'+str(i))
        cid=refs[0]
        if cid not in clips:raise ValueError('MISSING_SOURCE_CLIP_DEFINITION_'+cid)
        cp=clips[cid]
        child_paths=[x for x in cp.iter() if tag(x)=='path']
        if len(child_paths)!=1:raise ValueError('NOT_SINGLE_SOURCE_CLIP_PATH_'+cid)
        ds,err=helper.path_lines(child_paths[0].get('d',''))
        pts=[ds[0][0]]+[v[1] for v in ds] if ds else []
        xs=[v[0] for v in pts];ys=[v[1] for v in pts]
        bbox=([min(xs),min(ys),max(xs),max(ys)] if xs else None)
        corners=set((round(x,6),round(y,6)) for x,y in pts[:-1]) if pts else set()
        target=set((round(x,6),round(y,6)) for x in (bbox[0],bbox[2]) for y in (bbox[1],bbox[3])) if bbox else set()
        aligned=bool(len(ds)==4 and len(corners)==4 and corners==target and
          all(abs(a[0]-b[0])<1e-8 or abs(a[1]-b[1])<1e-8 for a,b in ds))
        source_paths=[x for x in group.iter() if tag(x)=='path']
        gtransform=affine(path_chain(group,parents),helper)
        clip_transform=child_paths[0].get('transform')
        info={'root_child_index':i,'clip_id':cid,'referencing_group_transform':group.get('transform'),
              'page_affine_for_group':list(gtransform),
              'clipPathUnits':cp.get('clipPathUnits','userSpaceOnUse'),
              'clipPath_transform':cp.get('transform'),
              'clip_path_transform':clip_transform,
              'clip_polygon_raw_bbox':bbox,
              'clip_polygon_raw_vertices':pts,
              'axis_aligned_four_corner_rectangle':aligned,
              'clip_rule':child_paths[0].get('clip-rule',cp.get('clip-rule','nonzero')),
              'clip_linear_closed':not err and len(ds)>=3 and math.dist(ds[0][0],ds[-1][1])<1e-8,
              'clip_path_segment_count':len(ds),'clipped_subtree_source_path_count':len(source_paths),
              'clipped_group_path_example_count':min(len(source_paths),5),
              'source_semantic_visibility_qualified':False}
        out.append(info)
    return out

def selftest(audit,helper):
    c=ET.fromstring('<svg xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="a"><path d="M0 0H10V10H0Z"/></clipPath></defs><g clip-path="url(#a)"><path d="M0 0L10 0"/></g></svg>')
    parent={x:p for p in c.iter() for x in p}
    d=clip_groups(c,parent,helper)
    assert len(d)==1 and d[0]['clip_linear_closed'] and d[0]['clip_path_segment_count']==4 and d[0]['axis_aligned_four_corner_rectangle']
    p=path_linework(c[-1][0],parent,helper)
    assert p['source_segments']==1 and p['clip_ancestor_values']==['url(#a)']
    assert abs(audit.area(audit.intersect_convex(
            audit.rect_for_centerline(([0,0],[10,0]),1),
            audit.rect_for_centerline(([5,-5],[5,5]),1)))-1.0)<1e-8
    print(json.dumps({'synthetic_clip_path_ancestor_and_footprint_crossing':'PASS',
                      'original_source_tested':False,'G0_semantics_qualified':False}))

def main():
    p=argparse.ArgumentParser()
    p.add_argument('--pdf',type=pathlib.Path)
    p.add_argument('--self-test',action='store_true')
    a=p.parse_args()
    audit=module(AUDIT,'source_original_stroke_audit')
    helper=module(EXTRACTOR,'source_candidate_extractor')
    if a.self_test:selftest(audit,helper);return
    if not a.pdf:p.error('--pdf required')
    pdf=a.pdf.read_bytes()
    if len(pdf)!=623525 or sha(pdf)!=PDF_SHA:raise SystemExit('WRONG_FROZEN_L01_PRIMARY')
    with tempfile.TemporaryDirectory(prefix='L01-clipped-outline-') as dd:
        output=pathlib.Path(dd)/'original_page3.svg'
        subprocess.run(['pdftocairo','-f','3','-l','3','-svg',str(a.pdf),str(output)],check=True,timeout=50)
        possible=list(pathlib.Path(dd).glob('original_page3*svg'))
        if len(possible)!=1:raise ValueError('ORIGINAL_VECTOR_NOT_UNIQUE')
        svg=possible[0].read_bytes()
        if sha(svg)!=SVG_SHA:raise ValueError('FROZEN_VECTOR_MISMATCH')
        root=ET.fromstring(svg)
        parents={x:p for p in root.iter() for x in p}
        clipped=clip_groups(root,parents,helper)
        if len(clipped)!=11:raise ValueError('SOURCE_CLIP_GROUP_COUNT_CHANGED')
        if len(root)<258:raise ValueError('SOURCE_SVG_ROOT_TOO_SHORT')
        # The root[216] source occurrence was already pinned as a clipped
        # rectangular black outline; here we reconstruct its whole linear path.
        target=root[216]
        if tag(target)!='g' or len(target)!=1 or tag(target[0])!='path':
            raise ValueError('SOURCE_216_BORDER_OCCURRENCE_CHANGED')
        info=path_linework(target[0],parents,helper)
        if info['bad_path_commands']:raise ValueError('SOURCE_TABLE_BORDER_NONLINEAR_PATH')
        if len(info['clip_ancestor_values'])!=1:raise ValueError('SOURCE_TABLE_BORDER_CLIP_UNKNOWN')
        if info['source_segments']<4:raise ValueError('SOURCE_TABLE_BORDER_TOO_FEW_SEGMENTS')
        full,source_strokes=audit.source_segments(root,helper)
        W=audit.w_paths(root,source_strokes,helper)
        rectangles={}
        for n in (249,251,256):
            p=W['paths'][str(n)]
            if p['butt_footprint_may_be_inferred']:
                rectangles[n]=audit.rect_for_centerline(p['segment_pdfpt'],p['effective_width_pdfpt'])
        clip1=next(x for x in clipped if x['clip_id']=='clip-1')
        # The group has identity outer affine; userSpaceOnUse clip-1 is an
        # axis-aligned rectangle. Certify visibility only of the *left-side*
        # butt footprint, away from the rectangle's round-stroke corners.
        left=info['source_segments_pdfpt'][3]
        leftpen=audit.rect_for_centerline(left,info['source_pen_width_pagept'])
        bb=clip1['clip_polygon_raw_bbox']
        left_under_clip=bool(
            clip1['axis_aligned_four_corner_rectangle'] and
            clip1['clip_linear_closed'] and clip1['clip_rule'] in ('nonzero','evenodd') and
            clip1['clipPathUnits']=='userSpaceOnUse' and
            clip1['clipPath_transform'] is None and clip1['clip_path_transform'] is None and
            clip1['page_affine_for_group']==[1,0,0,1,0,0] and
            all(bb[0]-1e-7<=pt[0]<=bb[2]+1e-7 and bb[1]-1e-7<=pt[1]<=bb[3]+1e-7 for pt in leftpen))
        if not left_under_clip:raise ValueError('TABLE_LEFT_SIDE_NOT_CERTIFIED_WITHIN_CLIP1')
        border_ink=[]
        eligible=bool(info['uniform_affine'] and info['source_pen_width_pagept']
                      and info['cap']=='butt' and info['source_segments'])
        for i,(p,q) in enumerate(info['source_segments_pdfpt']):
            entry={'border_segment_index':i,'p':p,'q':q,'length_pdfpt':math.dist(p,q)}
            if eligible:
                polygon=audit.rect_for_centerline((p,q),info['source_pen_width_pagept'])
                entry['conditional_W_ink_overlap_area_pdfpt2']={
                    str(n):audit.area(audit.intersect_convex(polygon,rectangles[n]))
                    for n in rectangles}
                entry['clip_qualified']=bool(left_under_clip and i==3)
            border_ink.append(entry)
        result={
           'schema':'isograph.exp062.track-L.G0.L01-clipped-original-table-outline-ink-audit.v0.2',
           'track':'L','stage':'G0','source_pdf_sha256':sha(pdf),'source_svg_sha256':sha(svg),
           'all_original_clip_groups':clipped,'clipped_groups_count':len(clipped),
           'table_outline_SVG_address':'root/svg[216]/g[0]/path',
           'table_outline_source_path':info,
           'table_border_segments_conditional_unclipped_intersection':border_ink,
           'source_w_triple_ink_overlap_pdfpt2':W['three_way_butt_footprint'].get('overlap_area_pdfpt2'),
           'source_full_fig1_viewport_crop_pdfpt':FIG_REGION,
           'source_fig1_linear_candidate_count':len(full['stroke_candidates']),
           'table_clip1_literal_axis_aligned_rectangle_verified':clip1['axis_aligned_four_corner_rectangle'],
           'table_left_border_ink_fully_contained_by_literal_clip1':left_under_clip,
           'table_left_border_stroke_graphical_clip_verified':left_under_clip,
           'figure_border_final_clipped_visibility_qualified':False,
           'W_to_table_semantic_relation_qualified':False,
           'source_graph_ontology_qualified':False,
           'L01_S004_semantic_cold_complete':False,'G0_frozen':False,'G1_authorized':False,
           'W_imported':False,'cross_track_synthesis_authorized':False,'PR70_merge_authorized':False}
        print('BEGIN_L01_TABLE_BORDER_CLIP1_EXACT_JSON')
        print(json.dumps(result,indent=2,sort_keys=True))
        print('END_L01_TABLE_BORDER_CLIP1_EXACT_JSON')
if __name__=='__main__':main()
