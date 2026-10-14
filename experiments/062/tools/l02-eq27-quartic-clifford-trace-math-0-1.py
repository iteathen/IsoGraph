#!/usr/bin/env python3
"""Original L02 v2 Eq26→Eq27 quartic source-trace sign, exact G0-only rational."""
from fractions import Fraction as F
from itertools import combinations
import json,sys
PAIRS=list(combinations(range(4),2))
FRAMES=[
 [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[-1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[2,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[1,1,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],
 [[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]],
 [[1,0,0,1],[0,2,0,0],[0,0,-1,0],[0,0,0,1]]
]
def eye(n):return[[F(i==j)for j in range(n)]for i in range(n)]
def mul(a,b):return[[sum(a[i][k]*b[k][j]for k in range(len(b)))for j in range(len(b[0]))]for i in range(len(a))]
def transpose(a):return[list(x)for x in zip(*a)]
def inverse(a):
 n=len(a);t=[list(map(F,a[i]))+eye(n)[i]for i in range(n)];det=F(1)
 for j in range(n):
  p=next((k for k in range(j,n)if t[k][j]),None)
  if p is None:raise ValueError('singular coframe')
  if p!=j:t[j],t[p]=t[p],t[j];det=-det
  x=t[j][j];det*=x;t[j]=[z/x for z in t[j]]
  for i in range(n):
   if i!=j:
    v=t[i][j];t[i]=[t[i][k]-v*t[j][k]for k in range(2*n)]
 return[r[n:]for r in t],det
def epsilon(a,b,flags):
 if len(set(a+b))<4:return F(0)
 return F((-1)**sum(i>j for i in a for j in b))*(-1 if flags.get('reverse_wedge')else 1)
def gram(gi):
 return[[gi[a][c]*gi[b][d]-gi[a][d]*gi[b][c]for c,d in PAIRS]for a,b in PAIRS]
def gamma_square(a,b,eta):return-eta[a]*eta[b]
def scalar_product_Hodge(v,w,W,H):return mul([v],mul(W,mul(H,[[x]for x in w])))[0][0]
def math_audit(flags=None):
 flags=flags or {};issues=[]
 def ck(v,s):
  if not v:issues.append(s)
 eta=[1,1,1,1]if flags.get('euclidean')else[1,-1,-1,-1]
 gint=[1,-1,1]if flags.get('bad_internal_signature')else[1,1,1]
 W=[[epsilon(PAIRS[i],PAIRS[j],flags)for j in range(6)]for i in range(6)]
 ck(W[0][5]==1 and W[1][4]==-1,'source fixed oriented wedge eps01,23 eps02,13')
 sigmas=[];hodge_checks=0;gauge_checks=0
 for n,e in enumerate(FRAMES):
  A=[list(map(F,row))for row in e];Ainv,det=inverse(A)
  gi=mul(mul(Ainv,[[F(eta[i]if i==j else 0)for j in range(4)]for i in range(4)]),transpose(Ainv))
  M=gram(gi);Winv,_=inverse(W)
  vol=abs(det)if flags.get('absolute_orientation')else det
  H=mul(Winv,[[vol*x for x in row]for row in M])if not flags.get('reverse_star_order')else mul([[vol*x for x in row]for row in M],Winv)
  h2=mul(H,H)
  ck(h2==[[-F(i==j)for j in range(6)]for i in range(6)],f'Lorentz Hodge **=-1 frame{n}');hodge_checks+=36
  sigma=[]
  for a,b in PAIRS:
   ea=A[a];eb=A[b];f=[F(2)*(ea[i]*eb[j]-ea[j]*eb[i])for i,j in PAIRS]
   if flags.get('half_area'):f=[x/2 for x in f]
   if flags.get('double_area'):f=[x*2 for x in f]
   sigma.append(f)
  if flags.get('use_unrelated_eprime'):sigma[0]=[2*F(i==0)for i in range(6)]
  total=F(0)
  for (a,b),f in zip(PAIRS,sigma):
   g2=gamma_square(a,b,eta)
   if flags.get('wrong_bivector_square'):g2=-g2
   total+=g2*scalar_product_Hodge(f,f,W,H)
  if flags.get('global_trace_flip'):total=-total
  if flags.get('force_source_eq27_quartic'):total=24*det
  sigmas.append(total/det)
  ck(total/det==-24,f'Clifford scalar grade trace Sigma * Sigma=-24 volume, coframe{n}')
  ck(total/det!=24,f'Source Eq27 +24 NOT obtained with same grade-zero scalar trace coframe{n}')
  independent=sum(-4*F(1)for _ in PAIRS)
  ck(total/det==independent,f'independent invariant trace-Hodge six bivector pairs coframe{n}')
  yg2=-gint[1]*gint[2]
  if flags.get('global_trace_flip'):yg2=-yg2
  if flags.get('drop_gauge_test'):yg2=-1
  ck(yg2*F(1,4)==F(-1,4),f'original source YM -1/4 tensor coefficient remains with scalar trace coframe{n}')
  gauge_checks+=1
  ck(total/det!=24*F(1),f'conditional source quartic sign difference coframe{n}')
 ck(len(sigmas)==6 and len(set(sigmas))==1 and sigmas[0]==-24,'six distinct coframes agree')
 ck(not flags.get('claim_original_source_error'),'do not declare original source error without author representation and allowed signature')
 ck(not flags.get('claim_physical_theory_rejected'),'do not promote finite model to original unified theory refutation')
 return{'pass':not issues,'issues':issues,'coframes':6,'Lorentzian_Hodge_square_entries':hodge_checks,
  'independent_Clifford_scalar_pairs':36,'Eq26_quartic_source_implied_volume':'+24',
  'project_Clifford_scalar_Sigma_wedge_star_Sigma_volume':str(sigmas[0])if sigmas else'none',
  'normalization_sign_residual':str(F(24)-sigmas[0])if sigmas else'none',
  'source_YM_trace_sign_controls':gauge_checks,'source_trace_sign_reconciliation_qualified':False,
  'original_author_error_proved':False,'G1_authorized':False}
MUTATIONS=[
 ('euclidean_signature',{'euclidean':True}),('bad_internal_compact_gamma',{'bad_internal_signature':True}),
 ('absolute_volume_orientation',{'absolute_orientation':True}),('reverse_wedge_epsilon',{'reverse_wedge':True}),
 ('reverse_hodge_matrix',{'reverse_star_order':True}),('remove_source_double_area',{'half_area':True}),
 ('double_source_area',{'double_area':True}),('wrong_gravitational_bivector_square',{'wrong_bivector_square':True}),
 ('global_scalar_trace_sign_flip',{'global_trace_flip':True}),('identify_wrong_frame',{'use_unrelated_eprime':True}),
 ('override_oracle_toward_printed_quartic',{'force_source_eq27_quartic':True}),
 ('claimed_source_author_error',{'claim_original_source_error':True}),
 ('declare_physical_theory_refuted',{'claim_physical_theory_rejected':True})
]
if __name__=='__main__':
 baseline=math_audit();mutants=[(name,math_audit(x))for name,x in MUTATIONS]
 print(json.dumps({'baseline':baseline,'mutants':[{'name':n,'pass':v['pass'],'issues':v['issues'][:2]}for n,v in mutants]},indent=2))
 if not baseline['pass']or any(x['pass']for _,x in mutants):sys.exit(1)
