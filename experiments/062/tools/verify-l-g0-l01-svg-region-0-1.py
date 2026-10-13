#!/usr/bin/env python3
"""Independent deterministic rational oracle for L01 candidate SVG region filtering.

This is a synthetic tool check, not a frozen-paper test, cold visual interpretation,
source-connector proof, or G0 qualification.
"""
import argparse
import importlib.util
import itertools
import json
from fractions import Fraction
from pathlib import Path

TOOL=(Path(__file__).resolve().parents[3] /
      'research/woit-lisi-isomorph/lisi/tools/extract_l01_svg_strokes_0_2.py')

def exact(p,q,b):
    ax,ay=p; bx,by=q; x0,y0,x1,y1=b
    lo,hi=Fraction(0),Fraction(1)
    for d,a,limit,lower in (
        (bx-ax,ax,x0,True),(bx-ax,ax,x1,False),
        (by-ay,ay,y0,True),(by-ay,ay,y1,False)):
        if d==0:
            if a<limit if lower else a>limit:
                return False
        else:
            t=Fraction(limit-a,d)
            if (d>0)==lower:lo=max(lo,t)
            else:hi=min(hi,t)
    return lo<=hi

def old_bbox(p,q,b):
    return (max(p[0],q[0])>=b[0] and min(p[0],q[0])<=b[2]
            and max(p[1],q[1])>=b[1] and min(p[1],q[1])<=b[3])

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--tool',type=Path,default=TOOL)
    args=ap.parse_args()
    spec=importlib.util.spec_from_file_location('region_candidate',args.tool)
    mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
    fn=mod.region_overlap
    values=range(-2,3)
    points=list(itertools.product(values,repeat=2))
    intervals=[(x,y) for x in values for y in values if x<=y]
    count=pos=neg=old_excess=0
    for p in points:
        for q in points:
            for xa,xb in intervals:
                for ya,yb in intervals:
                    box=(xa,ya,xb,yb)
                    expected=exact(p,q,box)
                    actual=fn(p,q,box)
                    if actual!=expected:
                        raise AssertionError(('semantic-free-geometry-oracle',p,q,box,expected,actual))
                    count+=1
                    pos+=int(expected);neg+=int(not expected)
                    old_excess+=int(old_bbox(p,q,box) and not expected)
    assert (count,pos,neg)==(140625,60865,79760)
    assert old_excess==14760
    p,q,box=(0,10),(10,0),(0,0,2,2)
    assert old_bbox(p,q,box) and not exact(p,q,box) and not fn(p,q,box)
    rr=mod.parse_svg(
        b'<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="3" y2="3" style="stroke:black"/></svg>',
        [1,1,2,2])
    assert rr['qualifies_source_graph'] is False
    print(json.dumps({
        'status':'PASS','scope':'SYNTHETIC_INTEGER_SEGMENT_RECTANGLE',
        'exact_fraction_cases':count,'positive':pos,'negative':neg,
        'v0_1_bbox_false_positive_cases':old_excess,
        'frozen_L01_pdf_verified':False,
        'source_figure_connector_semantics_verified':False,
        'G0_qualified':False},sort_keys=True))
if __name__=='__main__':
    main()
