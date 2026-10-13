#!/usr/bin/env python3
"""L01 G0 source SVG *stroke candidates*, not qualified connector topology.

Usage:
  python3 extract_l01_svg_strokes.py --self-test
  python3 extract_l01_svg_strokes.py --svg original-page3.svg --pdf frozen-L01-v1.pdf \
    --expect-pdf-sha 344cfc45eb505b28f322ccee3de6192703893da7c31260ed384885525d6a9dfe \
    --region 270 275 540 495 --out strokes.json

Original PDF/SVG must be acquired independently from the frozen source. If a
transform, path command, style, or clipping cannot be resolved, record the debt;
never promote a candidate segment to a field-to-fermion semantic relation.
"""
import argparse
import hashlib
import json
import math
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

NUM = r'[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[Ee][-+]?\d+)?'
TRANSFORM = re.compile(r'([A-Za-z]+)\s*\(([^)]*)\)')
TOKENS = re.compile(r'[A-Za-z]|' + NUM)
IDENTITY = (1., 0., 0., 1., 0., 0.)
SHAPE = {'path', 'line', 'polyline', 'polygon', 'rect', 'circle', 'ellipse', 'text'}
STYLE_KEYS = ('fill', 'stroke', 'stroke-width', 'stroke-opacity', 'fill-opacity',
              'display', 'visibility', 'opacity', 'clip-path', 'mask', 'filter')

def tag(el):
    return el.tag.rsplit('}', 1)[-1]

def mul(m, n):
    a,b,c,d,e,f = m
    g,h,i,j,k,l = n
    return (a*g+c*h, b*g+d*h, a*i+c*j, b*i+d*j, a*k+c*l+e, b*k+d*l+f)

def at(m, x, y):
    a,b,c,d,e,f = m
    return [round(a*x+c*y+e, 7), round(b*x+d*y+f, 7)]

def matrix(value):
    if not value:
        return IDENTITY, []
    out, unsupported = IDENTITY, []
    pos = 0
    for m in TRANSFORM.finditer(value):
        if value[pos:m.start()].strip(' ,\t\r\n'):
            unsupported.append('transform-junk')
        name, vals = m.group(1), [float(v) for v in re.findall(NUM, m.group(2))]
        if name == 'matrix' and len(vals) == 6:
            x = tuple(vals)
        elif name == 'translate' and len(vals) in (1, 2):
            x = (1.,0.,0.,1.,vals[0],vals[1] if len(vals)>1 else 0.)
        elif name == 'scale' and len(vals) in (1, 2):
            x = (vals[0],0.,0.,vals[1] if len(vals)>1 else vals[0],0.,0.)
        elif name == 'rotate' and len(vals) in (1, 3):
            radians = math.radians(vals[0]); cs, sn = math.cos(radians), math.sin(radians)
            rot = (cs,sn,-sn,cs,0.,0.)
            if len(vals)==3:
                x = mul(mul((1,0,0,1,vals[1],vals[2]),rot),(1,0,0,1,-vals[1],-vals[2]))
            else: x = rot
        elif name == 'skewX' and len(vals)==1:
            x = (1.,0.,math.tan(math.radians(vals[0])),1.,0.,0.)
        elif name == 'skewY' and len(vals)==1:
            x = (1.,math.tan(math.radians(vals[0])),0.,1.,0.,0.)
        else:
            unsupported.append('transform-'+name+'-arity')
            continue
        out = mul(out, x)
        pos = m.end()
    if value[pos:].strip(' ,\t\r\n'):
        unsupported.append('transform-tail')
    return out, unsupported

def style(el, old):
    st = dict(old)
    for k in STYLE_KEYS:
        if k in el.attrib: st[k] = el.attrib[k]
    for raw in el.get('style', '').split(';'):
        if ':' in raw:
            k,v = raw.split(':', 1)
            if k.strip() in STYLE_KEYS: st[k.strip()] = v.strip()
    return st

def path_lines(data):
    """Retain ONLY all-linear M,L,H,V,Z path programs; fail closed on curves."""
    if not data: return [], ['empty-path']
    t = TOKENS.findall(data)
    if not t or re.sub(r'[A-Za-z]|'+NUM+r'|[\s,]', '', data):
        return [], ['unparsed-path-text']
    if any(c in t for c in 'CcSsQqTtAa'):
        return [], ['curved-path-unresolved']
    segments, current, start, i, cmd = [], None, None, 0, None
    try:
        while i < len(t):
            if re.fullmatch('[A-Za-z]', t[i]):
                cmd=t[i];i+=1
                if cmd in 'Zz':
                    if current is None or start is None: raise ValueError('closing without point')
                    if current != start:segments.append((current, start))
                    current=start
                    cmd=None
                    continue
            if cmd is None or cmd not in 'MmLlHhVv':raise ValueError('unsupported cmd or missing cmd')
            if i >= len(t) or re.fullmatch('[A-Za-z]', t[i]): raise ValueError('missing operands')
            if cmd in 'MmLl':
                if i+1>=len(t) or re.fullmatch('[A-Za-z]', t[i+1]): raise ValueError('missing y')
                q=(float(t[i]),float(t[i+1])); i+=2
                new=(current[0]+q[0],current[1]+q[1]) if cmd.islower() and current is not None else q
                if cmd in 'Mm':
                    current=new; start=new; cmd='l' if cmd=='m' else 'L'
                else:
                    if current is None: raise ValueError('line without move')
                    if current!=new:segments.append((current,new))
                    current=new
            elif cmd in 'Hh':
                if current is None:raise ValueError('horizontal without point')
                v=float(t[i]);i+=1
                new=(current[0]+v if cmd=='h' else v,current[1])
                if current!=new:segments.append((current,new))
                current=new
            elif cmd in 'Vv':
                if current is None:raise ValueError('vertical without point')
                v=float(t[i]);i+=1
                new=(current[0],current[1]+v if cmd=='v' else v)
                if current!=new:segments.append((current,new))
                current=new
    except (ValueError, IndexError) as ex:
        return [], ['path-syntax-'+str(ex)]
    return segments, []

def region_overlap(p, q, bbox, eps=1e-10):
    """Inclusive Liang-Barsky segment-rectangle intersection.

    The v0.1 envelope-overlap retrieval hint was not an exact geometry test:
    a diagonal could have a bounding box crossing the crop without entering.
    This predicate tests the actual segment. It remains *nonsemantic*.
    """
    if bbox is None:
        return True
    x0,y0,x1,y1=bbox
    if x0>x1 or y0>y1 or not all(map(math.isfinite,bbox)):
        raise ValueError('invalid-region')
    dx,dy=q[0]-p[0],q[1]-p[1]
    bounds=[(-dx,p[0]-x0),(dx,x1-p[0]),(-dy,p[1]-y0),(dy,y1-p[1])]
    enter,leave=0.,1.
    for a,b in bounds:
        if abs(a)<eps:
            if b < -eps:
                return False
        else:
            t=b/a
            if a<0:
                enter=max(enter,t)
            else:
                leave=min(leave,t)
            if enter>leave+eps:
                return False
    return enter<=leave+eps

def parse_svg(svg_bytes, region=None):
    root=ET.fromstring(svg_bytes)
    ids={e.get('id'):e for e in root.iter() if e.get('id')}
    report={'schema':'isograph.lisi.G0.L01.svg-stroke-candidates.v0.2',
      'qualifies_source_graph':False,'source_svg_sha256':hashlib.sha256(svg_bytes).hexdigest(),
      'canvas':{'viewBox':root.get('viewBox'),'width':root.get('width'),'height':root.get('height')},
      'region':region,'raw_tag_counts':{},'expanded_shape_count':0,
      'incomplete_items':[],'stroke_candidates':[],
      'geometry_incomplete':False,'svg_css_rules_present':False,
      'stroke_candidate_not_semantic_connector':True}
    for node in root.iter():
        k=tag(node);report['raw_tag_counts'][k]=report['raw_tag_counts'].get(k,0)+1
    report['svg_css_rules_present']=bool(report['raw_tag_counts'].get('style'))
    # Keep explicit IDs and use chains. Reused path outlines are not connectors.
    def walk(el, base, prior, addr, ancestors, use_chain=()):
        kind=tag(el)
        if kind in ('defs','clipPath','mask','pattern','marker','filter') and not use_chain:return
        if kind=='symbol' and not use_chain:return
        st=style(el,prior)
        mat, issues=matrix(el.get('transform'))
        m=mul(base,mat)
        errs=list(issues)
        if el.get('class'):errs.append('unresolved-CSS-class')
        for key in ('clip-path','mask','filter'):
            if st.get(key) and st[key]!='none':errs.append('unresolved-'+key)
        if kind=='symbol' and el.get('viewBox'):errs.append('symbol-viewbox-viewport-unresolved')
        if st.get('display')=='none' or st.get('visibility')=='hidden':return
        this_addr=addr+'/'+kind+(':'+el.get('id') if el.get('id') else '')
        next_anc=ancestors+errs
        if kind=='use':
            href=el.get('href') or el.get('{http://www.w3.org/1999/xlink}href')
            if not href or not href.startswith('#') or href[1:] not in ids:
                report['incomplete_items'].append({'node':this_addr,'reason':['unresolved-use-target']});return
            if href in use_chain:
                report['incomplete_items'].append({'node':this_addr,'reason':['cyclic-use']});return
            x,y=float(el.get('x','0')),float(el.get('y','0'))
            mm=mul(m,(1,0,0,1,x,y))
            walk(ids[href[1:]],mm,st,this_addr,next_anc,use_chain+(href,))
            return
        if kind in SHAPE:
            report['expanded_shape_count']+=1
            local, bad=[],list(next_anc)
            try:
                if kind=='path':local, newbad=path_lines(el.get('d'));bad+=newbad
                elif kind=='line':local=[((float(el.get('x1','0')),float(el.get('y1','0'))),(float(el.get('x2','0')),float(el.get('y2','0'))))]
                elif kind in ('polygon','polyline'):
                    nums=[float(x) for x in re.findall(NUM,el.get('points',''))]
                    if len(nums)%2 or len(nums)<4:bad.append('invalid-points')
                    else:
                        pts=list(zip(nums[::2],nums[1::2]));local=list(zip(pts,pts[1:]))
                        if kind=='polygon':local.append((pts[-1],pts[0]))
                elif kind=='rect':
                    if el.get('rx') or el.get('ry'):bad.append('rounded-rect-unresolved')
                    else:
                        x,y,w,h=[float(el.get(k,'0')) for k in ('x','y','width','height')]
                        pts=[(x,y),(x+w,y),(x+w,y+h),(x,y+h),(x,y)]
                        local=list(zip(pts,pts[1:]))
                else:bad.append('nonlinear-or-text-shape-unresolved')
            except ValueError:bad.append('bad-shape-coordinates')
            if bad:
                report['incomplete_items'].append({'node':this_addr,'use_chain':use_chain,'reason':sorted(set(bad))})
            stroke=st.get('stroke','none')
            if not bad and stroke not in ('none','transparent','') and st.get('stroke-opacity','1')!='0' and st.get('opacity','1')!='0':
                for p,q in local:
                    a,c=at(m,*p),at(m,*q)
                    if region_overlap(a,c,region):
                        report['stroke_candidates'].append({'node':this_addr,'use_chain':list(use_chain),
                            'geometry':[a,c],'stroke':stroke,'stroke_width':st.get('stroke-width','unknown'),
                            'clip_certified':False if any('clip-path' in e for e in bad) else ('unresolved-clip-path' not in next_anc),
                            'semantic_field_edge':False})
        for n,child in enumerate(el):
            # Ref targets are recursively rendered through <use> only.
            if kind=='symbol' and not use_chain:continue
            walk(child,m,st,this_addr+f'[{n}]',next_anc,use_chain)
    walk(root,IDENTITY,{},'root',[])
    report['geometry_incomplete']=bool(report['incomplete_items'])
    report['qualifies_source_graph']=False
    return report

def touch_cells(x,y,rows=4,cols=4):
    """Pure synthetic grid incidence: touching a grid seam is not field action."""
    return [[r,c] for r in range(rows) for c in range(cols)
            if c <= x <= c+1 and r <= y <= r+1]

def selftest():
    svg=b'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
      <defs><path id="seed" d="M0 0H5v5" style="fill:none;stroke:#111;stroke-width:2"/></defs>
      <use xlink:href="#seed" transform="translate(20,30)"/>
      <g transform="translate(10 10)" style="fill:none;stroke:black"><path d="M0 0h10v10"/></g>
      <path d="M0 0 C1 2 3 4 5 6" style="stroke:black;fill:none"/>
      <path d="M10 10 L20 20" style="fill:black"/>
      <g clip-path="url(#cp)"><line x1="0" y1="0" x2="1" y2="2" style="stroke:green"/></g>
      <use xlink:href="#unknown"/>
    </svg>'''
    r=parse_svg(svg)
    segs=r['stroke_candidates']
    assert len(segs)==4, ('count',segs)
    assert segs[0]['geometry']==[[20,30],[25,30]],segs[0]
    assert segs[1]['geometry']==[[25,30],[25,35]],segs[1]
    assert segs[2]['geometry']==[[10,10],[20,10]],segs[2]
    assert segs[3]['geometry']==[[20,10],[20,20]],segs[3]
    assert not any(x['clip_certified']==False for x in segs) # clipped shapes fail closed
    assert {'curved-path-unresolved','unresolved-use-target','unresolved-clip-path'}.issubset(
      {z for item in r['incomplete_items'] for z in item['reason']})
    assert touch_cells(0,1)==[[0,0],[1,0]]
    assert touch_cells(1,1)==[[0,0],[0,1],[1,0],[1,1]]
    assert touch_cells(-1,1)==[]
    assert len(touch_cells(0,1))==2 and (2**2-1)==3
    assert len(touch_cells(1,1))==4 and (2**4-1)==15
    # v0.1 bbox-retrieval false-positive cannot become an exact region stroke.
    assert not region_overlap([0,10],[10,0],[0,0,2,2])
    assert region_overlap([0,0],[10,10],[1,1,2,2])
    assert region_overlap([-1,1],[3,1],[0,0,2,2])
    assert not region_overlap([-1,3],[3,3],[0,0,2,2])
    assert not r['qualifies_source_graph']
    # Adversarial failure: clipping and curved geometry cannot be called complete.
    assert r['geometry_incomplete']
    # Nested transformed use count is occurrence-derived, not raw-tag count.
    assert r['raw_tag_counts']['path']==4 and r['expanded_shape_count']>r['raw_tag_counts']['path']
    print(json.dumps({'self_test':'PASS','synthetic_svg_stroke_candidates':len(segs),
      'synthetic_unresolved_item_count':len(r['incomplete_items']),
      'source_PDF_fidelity_tested':False,'source_svg_fidelity_tested':False,
      'left_boundary_seam_candidate_subsets':3,'interior_grid_cross_candidate_subsets':15}))

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--svg')
    ap.add_argument('--pdf')
    ap.add_argument('--expect-pdf-sha')
    ap.add_argument('--region',type=float,nargs=4)
    ap.add_argument('--out')
    ap.add_argument('--self-test',action='store_true')
    a=ap.parse_args()
    if a.self_test:
        selftest();return
    if not a.svg or not a.out:ap.error('--svg and --out required')
    data=Path(a.svg).read_bytes();r=parse_svg(data,a.region)
    r['original_pdf_binary_verified']=False
    if a.pdf:
        h=hashlib.sha256(Path(a.pdf).read_bytes()).hexdigest()
        if a.expect_pdf_sha and h!=a.expect_pdf_sha:raise SystemExit('PDF SHA mismatch: fail closed')
        r['original_pdf_sha256']=h
        r['original_pdf_binary_verified']=bool(a.expect_pdf_sha)
    r['source_specific_semantic_endpoint_review_complete']=False
    Path(a.out).write_text(json.dumps(r,indent=2,ensure_ascii=False)+'\n')
    print(json.dumps({'svg_sha256':r['source_svg_sha256'],
      'raw_path_count':r['raw_tag_counts'].get('path',0),
      'raw_use_count':r['raw_tag_counts'].get('use',0),
      'stroke_candidates':len(r['stroke_candidates']),
      'unresolved_items':len(r['incomplete_items']),
      'qualifies_source_graph':False}))

if __name__=='__main__':main()
