import fs from 'node:fs';

const targets=[
  'README.md',
  'DESIGN_NOTES.md',
  'research/navier-stokes-proof/STANDARD_PHYSICAL_EQUIVALENCE_0_1.md',
  'research/navier-stokes-proof/STANDARD_PHYSICAL_EQUIVALENCE_0_1_VALIDATION.md',
  'research/navier-stokes-proof/REDUCED_FORMULA_0_2.md',
  'research/navier-stokes-proof/FRESH_SYNTHESIS_S0_3_PROOF.md',
  'research/navier-stokes-proof/S0_5_GENERATOR_CLOSURE_NORMAL_FORM.md',
  'research/navier-stokes-proof/S0_4_ATOMIC_MINIMALITY_AUDIT.md',
  'research/navier-stokes-proof/REDUCED_FORMULA_EQUIVALENCE_0_2.md',
  'research/navier-stokes-proof/FRESH_SYNTHESIS_S0_3.md',
  'research/navier-stokes-proof/S0_5_GENERATOR_CLOSURE_VALIDATION.md',
  'research/navier-stokes-proof/S0_4_ATOMIC_MINIMALITY_VALIDATION.md'
];

function fixText(text){
  const parts=text.split(/(\r?\n)/);
  let inFence=false, fenceChar=null;
  const counts={display_open:0,display_close:0,inline_open:0,inline_close:0};
  for(let i=0;i<parts.length;i+=2){
    let line=parts[i];
    const trimmed=line.trim();
    const fence=trimmed.match(/^(\x60\x60\x60+|~~~+)/);
    if(fence){
      const ch=fence[1][0];
      if(!inFence){inFence=true;fenceChar=ch;}
      else if(ch===fenceChar){inFence=false;fenceChar=null;}
      continue;
    }
    if(inFence) continue;
    const replace=(needle,repl,key)=>{
      const n=line.split(needle).length-1;
      if(n){counts[key]+=n;line=line.split(needle).join(repl);}
    };
    replace('\\[','$$','display_open');
    replace('\\]','$$','display_close');
    replace('\\(','$','inline_open');
    replace('\\)','$','inline_close');
    parts[i]=line;
  }
  return {text:parts.join(''),counts};
}

let changed=0;
for(const file of targets){
  const before=fs.readFileSync(file,'utf8');
  const {text:after,counts}=fixText(before);
  const total=Object.values(counts).reduce((a,b)=>a+b,0);
  if(!total) throw new Error('expected at least one rendering delimiter in '+file);
  if(before===after) throw new Error('no change for '+file);
  fs.writeFileSync(file,after);
  changed++;
  console.log(file+' '+JSON.stringify(counts));
}
if(changed!==targets.length) throw new Error('target count mismatch');
