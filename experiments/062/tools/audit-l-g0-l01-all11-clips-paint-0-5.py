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


# G0 successor: source roles remain opaque; report only exact SVG paint geometry.
_DASH_NUMBER = re.compile(r'^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$')
_DASH_PROPERTIES = ('fill','stroke','stroke-width','stroke-dasharray','stroke-dashoffset',
                    'stroke-linecap','stroke-opacity','opacity','visibility','display',
                    'vector-effect','mask','filter','clip-path')
def dash_declarations(node, parents):
    values,ancestors,unsupported={},[],[]
    for el in path_chain(node,parents):
        attrs={k:v for k,v in el.attrib.items() if k in _DASH_PROPERTIES or k in ('class','pathLength','transform')}
        if 'class' in el.attrib:unsupported.append('CSS_CLASS_UNRESOLVED')
        local={k:v for k,v in attrs.items() if k in _DASH_PROPERTIES}
        for decl in el.get('style','').split(';'):
            if not decl.strip():continue
            if decl.count(':')!=1:unsupported.append('INLINE_STYLE_SYNTAX_UNRESOLVED');continue
            k,v=map(str.strip,decl.split(':',1));local[k]=v
        values.update(local)
        ancestors.append({'svg_tag':tag(el),'raw_style':el.get('style'),'raw_properties':attrs})
    return values,ancestors,unsupported
def dash_pattern(style):
    raw=style.get('stroke-dasharray','none').strip()
    if raw in ('','none'):return None
    words=re.split(r'[\s,]+',raw)
    if not all(_DASH_NUMBER.fullmatch(w) for w in words):raise ValueError('NONNUMERIC_DASH_ARRAY')
    arr=[float(w) for w in words]
    if min(arr)<0 or not all(math.isfinite(q) for q in arr) or sum(arr)<=0:raise ValueError('INVALID_DASH_PATTERN')
    if len(arr)%2:arr*=2
    phase=style.get('stroke-dashoffset','0')
    if not _DASH_NUMBER.fullmatch(phase.strip()):raise ValueError('NONNUMERIC_DASH_OFFSET')
    offset=float(phase)
    if not math.isfinite(offset):raise ValueError('INVALID_DASH_OFFSET')
    return arr,offset
def dash_intervals(length,pattern):
    if not math.isfinite(length) or length<0:raise ValueError('INVALID_SEGMENT_LENGTH')
    if pattern is None:return [[0.0,length]] if length else []
    arr,phase=pattern;shift=phase%sum(arr);idx=0
    for _ in range(len(arr)+1):
        if shift<arr[idx] and arr[idx]>0:break
        shift-=arr[idx];idx=(idx+1)%len(arr)
    else:raise ValueError('UNRESOLVED_DASH_PHASE')
    pos=0.0;remaining=arr[idx]-shift;output=[];count=0
    while pos<length-1e-12:
        count+=1
        if count>20000:raise ValueError('DASH_EXPANSION_EXCEEDED')
        if remaining<=1e-12:
            idx=(idx+1)%len(arr);remaining=arr[idx];continue
        advance=min(remaining,length-pos)
        if idx%2==0 and advance>1e-12:output.append([pos,pos+advance])
        pos+=advance;remaining-=advance
    return output
def dash_controls():
    candidates=[([3,2],0,[[0,3],[5,8]]),([3,2],2,[[0,1],[3,6],[8,10]]),
                ([3,2],3,[[2,5],[7,10]]),([3,2],-2,[[2,5],[7,10]])]
    checked=0
    for arr,phase,expected in candidates:
        assert dash_intervals(10,(arr,phase))==expected;checked+=1
    assert dash_intervals(10,None)==[[0,10]];checked+=1
    assert dash_pattern({'stroke-dasharray':'108 18'})==([108,18],0.0);checked+=1
    assert dash_pattern({'stroke-dasharray':'3 1 2'})==([3,1,2,3,1,2],0.0);checked+=1
    for raw in ('-1 2','0 0','2px 3','2e999 3','5% 3'):
        try:dash_pattern({'stroke-dasharray':raw})
        except ValueError:checked+=1
        else:raise AssertionError('BAD_DASH_WAS_ACCEPTED:'+raw)
    for offset in ('1px','20%','nan'):
        try:dash_pattern({'stroke-dasharray':'3 2','stroke-dashoffset':offset})
        except ValueError:checked+=1
        else:raise AssertionError('BAD_PHASE_WAS_ACCEPTED:'+offset)
    fixture=ET.fromstring('<svg><g stroke-dasharray="3 2" stroke-dashoffset="2"><path style="stroke-dashoffset:0;stroke:black"/></g></svg>')
    parents={x:p for p in fixture.iter() for x in p}
    style,origin,err=dash_declarations(fixture[0][0],parents)
    assert not err and len(origin)==3 and dash_pattern(style)==([3,2],0.0);checked+=1
    print(json.dumps({'dash_hostile_and_positive_controls':'PASS','synthetic_checks':checked,
                      'original_pdf_read':False,'source_graph_qualified':False}))
def paint_inventory(root,parents,clips,helper,audit,table_left,Wrect):
    out=[]
    has_css=any(tag(x)=='style' for x in root.iter())
    for clip in clips:
        i=clip['root_child_index'];group=root[i]
        candidates=[x for x in group.iter() if tag(x)=='path']
        if tag(group)!='g' or len(candidates)!=1:
            raise ValueError('SOURCE_CLIP_NOT_UNIQUE_PATH_'+str(i))
        el=candidates[0];info=path_linework(el,parents,helper)
        style,origin,unsupported=dash_declarations(el,parents)
        reasons=unsupported[:]
        if has_css:reasons.append('EXTERNAL_STYLESHEET_RULES_UNRESOLVED')
        if el.get('pathLength') is not None:reasons.append('PATHLENGTH_DASH_CALIBRATION_UNRESOLVED')
        if clip['clipPathUnits']!='userSpaceOnUse' or not clip['axis_aligned_four_corner_rectangle']:
            reasons.append('NONRECTANGULAR_OR_OBJECT_BBOX_CLIPPING')
        if clip['clipPath_transform'] or clip['clip_path_transform'] or clip['page_affine_for_group']!=[1,0,0,1,0,0]:
            reasons.append('CLIP_AFFINE_FRAME_UNRESOLVED')
        if info['source_segments']!=1 or info['bad_path_commands']:reasons.append('NON_SINGLE_LINEAR_PATH')
        if not info['uniform_affine']:reasons.append('NONUNIFORM_AFFINE')
        if style.get('stroke','none')=='none':reasons.append('NO_EXPLICIT_STROKE')
        if info['cap']!='butt':reasons.append('NON_BUTT_STROKE')
        if style.get('vector-effect','none') not in ('none',''):reasons.append('VECTOR_EFFECT_UNRESOLVED')
        if style.get('mask','none') not in ('none','') or style.get('filter','none') not in ('none',''):
            reasons.append('MASK_OR_FILTER_UNRESOLVED')
        if style.get('opacity','1') not in ('1','1.0') or style.get('stroke-opacity','1') not in ('1','1.0'):
            reasons.append('ALPHA_COMPOSITING_UNRESOLVED')
        if style.get('display','inline')=='none' or style.get('visibility','visible')!='visible':
            reasons.append('VISIBILITY_UNRESOLVED')
        pattern=None
        try:pattern=dash_pattern(style)
        except ValueError as e:reasons.append(str(e))
        stroke=None
        if not reasons:
            p,q=info['source_segments_pdfpt'][0];length=math.dist(p,q)
            m=info['transform'];scale=math.hypot(m[0],m[1])
            if pattern is not None:pattern=([x*scale for x in pattern[0]],pattern[1]*scale)
            intervals=dash_intervals(length,pattern)
            bound=clip['clip_polygon_raw_bbox']
            clip_poly=[[bound[0],bound[1]],[bound[2],bound[1]],
                       [bound[2],bound[3]],[bound[0],bound[3]]]
            records=[]
            for a,b in intervals:
                pa=[p[j]+(q[j]-p[j])*a/length for j in (0,1)]
                pb=[p[j]+(q[j]-p[j])*b/length for j in (0,1)]
                ink=audit.intersect_convex(audit.rect_for_centerline((pa,pb),info['source_pen_width_pagept']),clip_poly)
                if audit.area(ink)>1e-12:records.append({'distance_from_start_pt':[a,b],
                    'clipped_stroke_footprint_polygon_pdfpt':ink,
                    'clipped_stroke_area_pdfpt2':audit.area(ink)})
            overlap=lambda target:sum(audit.area(audit.intersect_convex(x['clipped_stroke_footprint_polygon_pdfpt'],target)) for x in records)
            stroke={'source_phase':style.get('stroke-dashoffset','IMPLICIT_DEFAULT_0'),
                    'source_dasharray':style.get('stroke-dasharray','IMPLICIT_NONE'),
                    'single_path_length_pt':length,'positive_footprint_pieces_before_overdraw':len(records),
                    'painted_ranges_before_clip':len(intervals),
                    'stroke_footprint_area_sum_pdfpt2':sum(x['clipped_stroke_area_pdfpt2'] for x in records),
                    'table_left_border_stroke_overlap_pdfpt2':overlap(table_left),
                    'W_source_stroke_overlaps_pdfpt2':{str(k):overlap(v) for k,v in Wrect.items()},
                    'source_exact_stroke_parts':records}
        out.append({'clip_id':clip['clip_id'],'source_occurrence':f'root/svg[{i}]/g[0]/path',
                    'literal_clip_polygon_pdfpt':clip['clip_polygon_raw_vertices'],
                    'raw_path_attributes':dict(el.attrib),'raw_original_d':el.get('d',''),
                    'raw_d_sha256':sha(el.get('d','').encode()),'inherited_style':style,
                    'style_ancestry':origin,'linear_path_report':info,
                    'conditional_stroke_ink':stroke,'unresolved_stroke_reasons':reasons,
                    'glyph_or_field_role_qualified':False,'composited_raster_visibility_qualified':False})
    return out

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
        # Separate source row-rule clip10: the first division in the table
        # is aligned to the W-side junction height near y=322pt.
        source_row=root[274]
        if tag(source_row)!='g' or len(source_row)!=1 or tag(source_row[0])!='path':
            raise ValueError('SOURCE_ROOT_274_ROW_CLIP_OCCURRENCE_CHANGED')
        row=path_linework(source_row[0],parents,helper)
        clip10=next(x for x in clipped if x['clip_id']=='clip-10')
        rows=[(i,p,q) for i,(p,q) in enumerate(row['source_segments_pdfpt'])
              if math.dist(p,q)>=100 and abs(p[1]-q[1])<=1]
        row_ink=[]
        for i,p,q in rows:
            pen=audit.rect_for_centerline((p,q),row['source_pen_width_pagept'])
            lim=clip10['clip_polygon_raw_bbox']
            within=bool(clip10['axis_aligned_four_corner_rectangle'] and
                clip10['clipPathUnits']=='userSpaceOnUse' and
                clip10['page_affine_for_group']==[1,0,0,1,0,0] and
                all(lim[0]-1e-7<=z[0]<=lim[2]+1e-7 and lim[1]-1e-7<=z[1]<=lim[3]+1e-7 for z in pen))
            left=audit.rect_for_centerline(info['source_segments_pdfpt'][3],
                                           info['source_pen_width_pagept'])
            area=audit.area(audit.intersect_convex(pen,left))
            row_ink.append({'source_segment_index':i,'p':p,'q':q,'width':row['source_pen_width_pagept'],
                'rectangle_inside_literal_clip10':within,
                'source_left_border_ink_overlap_pdfpt2':area,
                'W_ink_overlap_pdfpt2':{
                    str(n):audit.area(audit.intersect_convex(pen,rectangles[n]))
                    for n in rectangles}})
        if not rows:raise ValueError('NO_LONG_SOURCE_ROW_SEPARATOR')
        result={
           'schema':'isograph.exp062.track-L.G0.L01-clipped-original-table-outline-ink-audit.v0.3',
           'track':'L','stage':'G0','source_pdf_sha256':sha(pdf),'source_svg_sha256':sha(svg),
           'all_original_clip_groups':clipped,'clipped_groups_count':len(clipped),
           'table_outline_SVG_address':'root/svg[216]/g[0]/path',
           'row_rule_SVG_address':'root/svg[274]/g[0]/path',
           'row_rule_clip10_literal_source':clip10,
           'row_rule_source_path':row,
           'row_rule_long_horizontal_source_ink_footprints':row_ink,
           'row_seam_field_action_semantics_qualified':False,
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
        print('BEGIN_L01_TABLE_ROW_CLIP10_JSON')
        print(json.dumps(result,indent=2,sort_keys=True))
        print('END_L01_TABLE_ROW_CLIP10_JSON')
if __name__=='__main__':main()
