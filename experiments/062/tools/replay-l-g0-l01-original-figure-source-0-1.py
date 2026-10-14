#!/usr/bin/env python3
"""L-only G0 frozen-original Figure 1 vector/raster geometry preflight.

Produces a bounded diagnostic, not a field-action graph or cold visual qualification.
The original PDF binary MUST match the pinned SHA before any source-based result.
"""
import argparse
import collections
import hashlib
import importlib.util
import json
import os
import pathlib
import subprocess
import tempfile

SOURCE_SHA = '344cfc45eb505b28f322ccee3de6192703893da7c31260ed384885525d6a9dfe'
PAGE_TEXT_SHA = '5fb73737e292efe76f68ee31e1857132896d5c290a64c94c4c71cc51f47f5de7'
PNG_SHA = '8355664c5dd621e0aaec479db0e13f6bacacaa2b01b9dea517c581edbdf1b4fe'
SVG_SHA_PREDECESSOR = '3e6d5eb7ba8ad6410ac25ae50a4a47ae844e932aad06284684e8c0f9fe183430'
ROOT = pathlib.Path(__file__).resolve().parents[3]
L = ROOT / 'research/woit-lisi-isomorph/lisi'
TOOL = L / 'tools/extract_l01_svg_strokes_0_2.py'
PINS = {
 'research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_96.json':'40bdc793bce2fa8187665bc9aeda2a01a615025d',
 'research/woit-lisi-isomorph/lisi/LISI_L01_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json':'24163965af4d1e13e75371638fcfd70b793db2ac',
 'research/woit-lisi-isomorph/lisi/LISI_L01_ORIGINAL_FIG1_SM_PERIODIC_TABLE_SOURCE_CANDIDATE_G0_0_2.json':'2f38cc22709cfd9c92d0aca2997390da03a06767',
 'experiments/062/L_CURRENT_STAGE_GATE_0_191.json':'6211130c2ade9859018e992b075f1648cf096ec4',
 'research/woit-lisi-isomorph/lisi/tools/extract_l01_svg_strokes_0_2.py':'f0f144e06dc17992a8b3ea2bae9e32299ed848b5',
}

def sha(raw): return hashlib.sha256(raw).hexdigest()

def run(argv, timeout=40):
    return subprocess.run(argv, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                          check=True, timeout=timeout).stdout

def source_gate():
    got={}
    for p,h in PINS.items():
        actual=run(['git','hash-object',p]).decode().strip()
        if actual != h: raise ValueError('PIN_MISMATCH:'+p+':'+actual)
        got[p]=actual
    s=json.loads((L/'SOURCE_SEMANTIC_CENSUS_0_96.json').read_text())
    v=json.loads((L/'LISI_L01_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json').read_text())
    a=json.loads((L/'LISI_L01_ORIGINAL_FIG1_SM_PERIODIC_TABLE_SOURCE_CANDIDATE_G0_0_2.json').read_text())
    g=json.loads((ROOT/'experiments/062/L_CURRENT_STAGE_GATE_0_191.json').read_text())
    if s['item_count'] != 191 or len(s['items']) != 191:raise ValueError('SSC_191_MISMATCH')
    if len(v['original_source_first_locations']) != 98:raise ValueError('L01_INVERSE_98_MISMATCH')
    item=next((x for x in v['original_source_first_locations'] if x['original_source_location_id']=='L01-S004'),None)
    if item is None or item['disposition'] != 'ORIGINAL_TABLE_FIGURE_OR_MATRIX_EXACT_CELLS_UNVERIFIED':
        raise ValueError('SOURCE_S004_NOT_OPEN')
    cells=a['grid']['source_cells']
    if len(cells)!=16 or sum(len(x['generation_glyphs_top_to_bottom']) for x in cells)!=48:
        raise ValueError('FIG1_CENSUS_16_48_MISMATCH')
    if sum(x['printed_Y_count_for_cell'] for x in cells)!=16:raise ValueError('Y_16_MISMATCH')
    flags=g['current_lawful_state']
    for k in ('G0_frozen','G1_authorized','W_semantics_imported','cross_track_synthesis_authorized','PR70_merge_authorized'):
        if flags[k]:raise ValueError('UNEXPECTED_GATE_OPEN:'+k)
    return {'exact_blob_pins':got,'SSC_items':191,'original_L01_groups':98,'Figure1_cells':16,'Figure1_role_glyphs':48,'Figure1_Y_numerals':16,'L01_S004_open':True}

def test_source_pdf(path):
    data=pathlib.Path(path).read_bytes()
    if len(data)!=623525 or sha(data)!=SOURCE_SHA:raise ValueError('FROZEN_ORIGINAL_PDF_BYTES_OR_SHA_MISMATCH')
    return sha(data)

def png_dimensions(png):
    if not png.startswith(b'\x89PNG\r\n\x1a\n'):
        raise ValueError('BAD_PNG_SIGNATURE')
    return [int.from_bytes(png[16:20],'big'),int.from_bytes(png[20:24],'big')]

def maybe_sample(seg):
    # A long, linear stroke remains *only* a geometric candidate, not a source-field edge.
    p,q=seg['geometry']; length=((p[0]-q[0])**2+(p[1]-q[1])**2)**0.5
    return {'len_pt_approx':round(length,4), 'p':p, 'q':q,
            'source_node':seg['node'][-180:], 'stroke':seg.get('stroke','unknown'),
            'clip_certified':seg.get('clip_certified',False)}

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--pdf',type=pathlib.Path)
    ap.add_argument('--self-test',action='store_true')
    args=ap.parse_args()
    if args.self_test:
        try:test_source_pdf(__file__)
        except ValueError as e:assert str(e)=='FROZEN_ORIGINAL_PDF_BYTES_OR_SHA_MISMATCH'
        else:raise AssertionError('SHA guard accepted a non-PDF')
        assert png_dimensions(b'\x89PNG\r\n\x1a\n'+b'\x00'*8+(816).to_bytes(4,'big')+(1056).to_bytes(4,'big'))==[816,1056]
        print(json.dumps({'synthetic_preflight':'PASS','negative_pdf_sha_guard':'PASS','external_source_downloaded':False,'G0_qualified':False}))
        return
    if not args.pdf:ap.error('--pdf required except --self-test')
    repo=source_gate()
    original_sha=test_source_pdf(args.pdf)
    doc=run(['pdfinfo',str(args.pdf)],timeout=20).decode('utf-8','replace')
    if 'Pages:          31' not in doc and not any(line.split(':',1)[-1].strip()=='31' for line in doc.splitlines() if line.startswith('Pages:')):
        raise ValueError('FROZEN_31_PAGE_COUNT_MISMATCH')
    page_text=run(['pdftotext','-f','3','-l','3','-layout','-enc','UTF-8',str(args.pdf),'-'],timeout=20)
    if b'Figure 1: A periodic table of the standard model.' not in page_text:
        raise ValueError('FROZEN_SOURCE_CAPTION_MISSING')
    with tempfile.TemporaryDirectory(prefix='l01-fig1-svg-') as d:
        out=pathlib.Path(d)
        png_prefix=out/'page3_96dpi'
        run(['pdftoppm','-f','3','-l','3','-r','96','-singlefile','-png',str(args.pdf),str(png_prefix)],timeout=40)
        png=(pathlib.Path(str(png_prefix)+'.png')).read_bytes()
        if png_dimensions(png)!=[816,1056]:raise ValueError('PDF_PAGE_PIXEL_DIMENSIONS_CHANGED')
        svg_prefix=out/'page3_vector.svg'
        run(['pdftocairo','-f','3','-l','3','-svg',str(args.pdf),str(svg_prefix)],timeout=40)
        svgs=sorted(out.glob('page3_vector*svg'))
        if len(svgs)!=1:raise ValueError('SVG_NOT_UNIQUELY_EXPORTED:'+str(len(svgs)))
        svg=svgs[0].read_bytes()
        if not svg.startswith(b'<?xml') and b'<svg' not in svg[:2000]:raise ValueError('SVG_BAD_FORMAT')
        spec=importlib.util.spec_from_file_location('l01_geometric_candidate',TOOL)
        mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
        geom=mod.parse_svg(svg,region=[270,275,540,495])
        if geom['qualifies_source_graph'] or not geom['stroke_candidate_not_semantic_connector']:
            raise ValueError('STROKE_CANDIDATES_PROMOTED_AS_SEMANTIC_GRAPH')
        incomplete=collections.Counter(reason for x in geom['incomplete_items'] for reason in x['reason'])
        segments=geom['stroke_candidates']
        sample=sorted((maybe_sample(x) for x in segments),key=lambda y:-y['len_pt_approx'])[:16]
        report={
          'schema':'isograph.exp062.L.G0.L01-original-Figure1-source-vector-replay.v0.1',
          'track':'L','stage':'G0','evidence_type':'PROJECT_CONTROLLED_SOURCE_BINARY_AND_CANDIDATE_GEOMETRY_ONLY',
          'source_id':'L01','arxiv_revision':'0711.0770v1',
          'original_PDF_SHA256':original_sha,'original_PDF_bytes':args.pdf.stat().st_size,
          'original_PDF_page_count':31,'source_caption_present':True,
          'source_page3_text_SHA256':sha(page_text),'page3_text_matches_previous_CI':sha(page_text)==PAGE_TEXT_SHA,
          'page3_96dpi_PNG_SHA256':sha(png),'page3_96dpi_matches_previous_CI':sha(png)==PNG_SHA,
          'page3_svg_SHA256':sha(svg),'page3_svg_matches_previous_CI':sha(svg)==SVG_SHA_PREDECESSOR,
          'page3_svg_bytes':len(svg),'source_vector_canvas':geom['canvas'],
          'source_vector_raw_counts':{k:geom['raw_tag_counts'].get(k,0) for k in ('path','use','symbol','g','style','clipPath')},
          'source_vector_expanded_shapes':geom['expanded_shape_count'],
          'figure_crop_coordinates_PDF_points':[270,275,540,495],
          'figure_crop_candidate_line_segments':len(segments),
          'geometry_incomplete':geom['geometry_incomplete'],'unresolved_total':len(geom['incomplete_items']),
          'unresolved_reason_counts':dict(incomplete.most_common(24)),
          'line_segment_samples':sample,
          'source_graph_incidence_qualified':False,'independent_raster_glyph_decode_qualified':False,
          'author_physics_relations_qualified':False,'SSC0_96_items_unchanged':repo['SSC_items'],
          'L01_S004_still_open':repo['L01_S004_open'],
          'whole_L_sources_cold_complete':0,'G0_frozen':False,'G1_authorized':False,
          'W_semantics_imported':False,'cross_track_synthesis_authorized':False,'PR70_merge_authorized':False,
          'status':'PASS_SOURCE_BINARY_PINNED_AND_GEOMETRY_INVENTORIED_NOT_SEMANTICALLY_CLOSED'
        }
        print('BEGIN_L01_FIG1_SOURCE_REPLAY_JSON')
        print(json.dumps(report,sort_keys=True,indent=2,ensure_ascii=False))
        print('END_L01_FIG1_SOURCE_REPLAY_JSON')

if __name__=='__main__':main()
