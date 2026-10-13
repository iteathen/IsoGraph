#!/usr/bin/env python3
"""Author-side independent algebra checks on assisted L01 v1 Table1 cells.

NO original PDF retrieval or cold semantic qualification is performed here.
"""
import copy
import json
import pathlib
import sys
from collections import Counter
import sympy as sp

SOURCE = pathlib.Path(__file__).with_name('l01_table1_assisted_source_cells_0_1.json')
I, sqrt = sp.I, sp.sqrt
G1 = sp.Matrix([[0,1,0],[1,0,0],[0,0,0]])
G2 = sp.Matrix([[0,-I,0],[I,0,0],[0,0,0]])
G3 = sp.diag(1,-1,0)
G4 = sp.Matrix([[0,0,1],[0,0,0],[1,0,0]])
G5 = sp.Matrix([[0,0,-I],[0,0,0],[I,0,0]])
G6 = sp.Matrix([[0,0,0],[0,0,1],[0,1,0]])
G7 = sp.Matrix([[0,0,0],[0,0,-I],[0,I,0]])
G8 = sp.diag(1,1,-2)/sqrt(3)
T={k:I*mat/2 for k,mat in enumerate([G1,G2,G3,G4,G5,G6,G7,G8],1)}
V={
 'T2-i*T1':T[2]-I*T[1],
 '-T2-i*T1':-T[2]-I*T[1],
 'T5-i*T4':T[5]-I*T[4],
 '-T5-i*T4':-T[5]-I*T[4],
 '-T7-i*T6':-T[7]-I*T[6],
 'T7-i*T6':T[7]-I*T[6]
}
VAL={
 '1':sp.S.One,'-1':-sp.S.One,'0':sp.S.Zero,
 '1/2':sp.Rational(1,2),'-1/2':-sp.Rational(1,2),
 'sqrt(3)/2':sqrt(3)/2,'-sqrt(3)/2':-sqrt(3)/2,
 '1/(2*sqrt(3))':1/(2*sqrt(3)),'-1/(2*sqrt(3))':-1/(2*sqrt(3)),
 '-1/sqrt(3)':-1/sqrt(3),'1/sqrt(3)':1/sqrt(3)
}

def zero(v):
 if isinstance(v,sp.MatrixBase):return all(sp.simplify(z)==0 for z in v)
 return sp.simplify(v)==0

def check(d):
 errs=[]
 def must(b,detail):
  if not b: errs.append(detail)
 must(d['track']=='L' and d['stage']=='G0' and d['semantic_authority'] is False,'track/stage/authority')
 must(d['source_qualifications']['G0_frozen'] is False and d['source_qualifications']['G1_authorized'] is False and d['source_qualifications']['independent_cold_image_only_read_complete'] is False,'false cold promotion')
 rows=d['rows'];must(len(rows)==12,'12 table rows')
 must(Counter(r['class'] for r in rows)==Counter({'gluon':6,'quark':3,'anti_quark':3}),'6+3+3 category counts')
 must([r['row'] for r in rows]==list(range(1,13)),'row order')
 must(len({r['marker'] for r in rows})==12,'unique source markers')
 a,b=sp.symbols('g3 g8');C=a*T[3]+b*T[8]
 allvectors=[];entrymaps={}
 for r in rows:
  prefix=f"row{r['row']}"
  w=sp.Matrix([VAL.get(r['g3'],sp.Symbol('bad_g3')),VAL.get(r['g8'],sp.Symbol('bad_g8'))]);allvectors.append(w)
  must(r['g3'] in VAL and r['g8'] in VAL,prefix+':unrecognized literal')
  if r['class']=='gluon':
   actual=V.get(r['V_beta']);idx=r.get('matrix_unit')
   must(actual is not None and isinstance(idx,list) and len(idx)==2,prefix+':gluon carrier')
   if actual is None or not isinstance(idx,list) or len(idx)!=2:continue
   e=sp.zeros(3);i,j=idx;must(1<=i<=3 and 1<=j<=3 and i!=j,prefix+':matrix unit indices')
   if not (1<=i<=3 and 1<=j<=3 and i!=j):continue
   e[i-1,j-1]=1
   must(zero(actual-e),prefix+':source V coefficient mapping')
   must(zero(C*actual-actual*C-I*(a*w[0]+b*w[1])*actual),prefix+':source adjoint weights')
   entrymaps[(i,j)]=r['marker']
  else:
   ix=r.get('basis_index');must(isinstance(ix,int) and ix in (1,2,3),prefix+':fundamental index')
   if not isinstance(ix,int) or ix not in (1,2,3):continue
   e=sp.zeros(3,1);e[ix-1]=1
   must(r['V_beta']=='['+','.join(str(int(v)) for v in e)+']',prefix+':basis vector')
   source_action=C if r['class']=='quark' else -C.T
   must(zero(source_action*e-I*(a*w[0]+b*w[1])*e),prefix+':fundamental/dual weights')
 # Rank-two root set is two length shells, exactly closed under Weyl reflections.
 must(len({tuple(sp.simplify(t) for t in v) for v in allvectors})==12,'distinct root coordinates')
 norms=Counter(str(sp.simplify(v.dot(v))) for v in allvectors)
 must(norms=={'1':6,'1/3':6},'two G2 length shells')
 keys={tuple(sp.simplify(x) for x in v) for v in allvectors}
 reflect=0
 for ra in allvectors:
  for rb in allvectors:
   projected=rb-2*sp.simplify(ra.dot(rb)/ra.dot(ra))*ra
   must(tuple(sp.simplify(x) for x in projected) in keys,'Weyl reflection missing')
   reflect+=1
 must(len(entrymaps)==6 and set(entrymaps)=={(1,2),(2,1),(1,3),(3,1),(2,3),(3,2)},'six matrix units')
 # Exact 3x3 Eq2.2 sum independent of root labels, then index mapping.
 g=sp.symbols('g1:9');M=sp.zeros(3)
 for k in range(1,9):M+=g[k-1]*T[k]
 expected=I/sp.Integer(2)*sp.Matrix([
  [g[2]+g[7]/sqrt(3),g[0]-I*g[1],g[3]-I*g[4]],
  [g[0]+I*g[1],-g[2]+g[7]/sqrt(3),g[5]-I*g[6]],
  [g[3]+I*g[4],g[5]+I*g[6],-2*g[7]/sqrt(3)]
 ])
 must(zero(M-expected),'Eq2.2 Gell-Mann matrix reconstruction')
 return errs,{'rows':len(rows),'adversarial_domain':'SOURCE_DERIVED_MATH_NOT_COLD','root_norm_squares':norms,'root_reflections':reflect,'mapped_offdiagonal_positions':len(entrymaps),'Eq2_2_matrix':'EXACT_ALGEBRA_MATCH' if zero(M-expected) else 'FAIL'}

def main():
 d=json.loads(SOURCE.read_text(encoding='utf-8'))
 errors,report=check(d)
 if errors:raise SystemExit('SOURCE_ASSISTED_BASELINE_FAILED '+repr(errors))
 controls=[
  ('swap_gluon_g3_sign',lambda x:x['rows'][0].update(g3='-1')),
  ('invert_rbar_gluon_g8',lambda x:x['rows'][3].update(g8='sqrt(3)/2')),
  ('transcribe_wrong_v_generator',lambda x:x['rows'][2].update(V_beta='T7-i*T6')),
  ('wrong_matrix_unit',lambda x:x['rows'][4].update(matrix_unit=[2,3])),
  ('wrong_antiquark_weight',lambda x:x['rows'][7].update(g3='1/2')),
  ('duplicate_weight',lambda x:x['rows'][11].update(g8='-1/sqrt(3)')),
  ('remove_table_row',lambda x:x['rows'].pop()),
  ('mark_cold_complete',lambda x:x['source_qualifications'].update(independent_cold_image_only_read_complete=True)),
  ('promote_G1',lambda x:x['source_qualifications'].update(G1_authorized=True)),
  ('invent_alternate_marker',lambda x:x['rows'][5].update(marker='g^{r\\bar g}'))
 ]
 results=[]
 for name,change in controls:
  y=copy.deepcopy(d);change(y);e,_=check(y);results.append({'name':name,'rejected':bool(e),'reasons':e[:3]})
 if not all(x['rejected'] for x in results):raise SystemExit('NEGATIVE_CONTROL_ESCAPED '+repr(results))
 out={'schema':'isograph.L01.G0.Table1.local-exact-algebra-verification.v0.1','source_semantic_authority':False,'independent_cold_review':False,'baseline_errors':errors,'direct_computation':report,'adversarial_controls':results,'controls_rejected':len(results),'controls_defined':len(controls)}
 print(json.dumps(out,default=str,indent=2,sort_keys=True))

if __name__=='__main__':main()
