#!/usr/bin/env python3
"""Exact source-derived Eq2.4/Table2 weight projection; distinguish root map from Lie algebra map."""
import copy,json,pathlib
import sympy as S
I, sqrt = S.I, S.sqrt
ROOT=pathlib.Path(__file__).parent
A=S.Matrix([[-1/sqrt(3),-1/sqrt(3),-1/sqrt(3)],[-1/sqrt(2),1/sqrt(2),0],[-1/sqrt(6),-1/sqrt(6),sqrt(2)/sqrt(3)]])/sqrt(2)

def check(data):
 errs=[]
 def claim(test,name):
  if not test:errs.append(name)
 source=json.loads((ROOT/'l01_table1_assisted_source_cells_0_1.json').read_text())
 rows=source['rows']
 claim(len(data['gluon_xyz'])==6 and len(data['first_series_xyz'])==6,'twelve source pairs')
 claim(S.simplify(A*A.T-S.eye(3)/2)==S.zeros(3),'scaled orthogonality')
 claim(A.rank()==3 and S.Matrix(A[1:3,:]).nullspace()==[S.Matrix([1,1,1])],'2D projection kernel')
 d=[S.Rational(x) for x in data['expected_scaled_B2']]
 for k,x in enumerate(data['gluon_xyz']+data['first_series_xyz']):
  v=S.Matrix([S.Rational(y) for y in x]); projected=A*v
  table=rows[k] if k<6 else rows[6+k-6]
  value=lambda txt:S.sympify(txt,locals={'sqrt':sqrt})
  expected=[value(table['g3']),value(table['g8'])]
  for n in (0,1):claim(S.simplify(projected[n+1]-expected[n])==0,f'projection mismatch row={k} axis={n}')
  if k<6:claim(projected[0]==0,f'gluon B2 not zero row={k}')
  else:claim(S.simplify(sqrt(S.Rational(2,3))*projected[0]-d[k-6])==0,f'q_I B2 grade mismatch row={k}')
 # Source Eq2.5 has an arrow; check whether reading the root projection as a Lie quotient is lawful.
 E=lambda i,j:S.eye(4)[:,i]*S.eye(4)[j,:]
 H=I*S.diag(1,1,1,-3)
 X=E(0,3)-E(3,0)
 Y=I*(E(0,3)+E(3,0))
 comm=X*Y-Y*X
 projection_H_coeff=S.simplify(S.trace(comm*H)/S.trace(H*H))
 claim(all(Q+Q.conjugate().T==S.zeros(4) and S.trace(Q)==0 for Q in [H,X,Y,comm]),'not in compact su4')
 claim(projection_H_coeff==S.Rational(2,3),'missing u1 Cartan component')
 claim(H*X-X*H!=S.zeros(4),'u1 falsely ideal')
 claim(S.simplify(S.det(A))!=0,'source Eq2.4 scaled rotation singular')
 return errs,{'gluon_2D_projection_equal_Table1':6,'first_series_q_I_projection_equal_Table1':6,'B2_gluon_grade':0,'B2_q_I_grades':data['expected_scaled_B2'],
  'Eq2_4_scaled_rotation_AAt':str(A*A.T),'projection_kernel':'span(1,1,1)',
  'su4_nonclosure_witness':{'X':'E14-E41','Y':'i(E14+E41)','bracket':'2i(E11-E44)','u1_H':'i diag(1,1,1,-3)','bracket_H_component':str(projection_H_coeff), 'u1_not_Lie_ideal':True},
  'conclusion':'ROOT_WEIGHT_PROJECTION_MATCHES_12_SOURCE_ROWS_BUT_NO_SO6_TO_G2_LIE_ALGEBRA_QUOTIENT_PROVED',
  'original_source_semantic_cold_qualified':False}

def main():
 d=json.loads((ROOT/'l01_eq24_table2_source_12row_pilot.json').read_text())
 failures,report=check(d)
 if failures:raise SystemExit('BASELINE_FAIL:'+str(failures))
 tests=[('reverse_gluon_row',lambda x:x['gluon_xyz'][0].reverse()),
        ('alter_qI_first_coordinate',lambda x:x['first_series_xyz'][0].__setitem__(0,'1/2')),
        ('drop_gluon_source_row',lambda x:x['gluon_xyz'].pop()),
        ('forge_first_B2_grade',lambda x:x['expected_scaled_B2'].__setitem__(0,'1/6'))]
 rejected=[]
 for name,change in tests:
  f=copy.deepcopy(d);change(f);errors,_=check(f);rejected.append({'name':name,'rejected':bool(errors),'reasons':errors[:3]})
 if not all(x['rejected'] for x in rejected):raise SystemExit('NEGATIVE_CONTROL_ESCAPED')
 print(json.dumps({'schema':'isograph.L01.G0.Eq2.4.Table2.local-source-algebra-scoped.v0.1','baseline':'PASS','math':report,'negative_controls':rejected,'mutants_rejected':len(rejected),'G0_frozen':False,'cold_source_review_complete':False},indent=2,sort_keys=True))
if __name__=='__main__':main()
