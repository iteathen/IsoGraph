import fs from 'node:fs';

const path='research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg';
const s=fs.readFileSync(path,'utf8');
const out='out/exp032';
fs.mkdirSync(out,{recursive:true});

function tokens(str){
  return str.match(/\[|\]|\(|\)|[^\s\[\]\(\)]+/g)||[];
}

function parse(str){
  const root={type:'root',children:[]};
  const stack=[root];
  for(const tok of tokens(str)){
    if(tok==='('||tok==='['){
      const n={type:tok==='('?'paren':'bracket',children:[]};
      stack[stack.length-1].children.push(n);
      stack.push(n);
    }else if(tok===')'||tok===']'){
      const want=tok===')'?'paren':'bracket';
      if(stack.length===1||stack[stack.length-1].type!==want){
        throw new Error('delimiter mismatch at '+tok);
      }
      stack.pop();
    }else{
      stack[stack.length-1].children.push(tok);
    }
  }
  if(stack.length!==1) throw new Error('unclosed delimiters');
  return root;
}

const ast=parse(s);
const free=[];

function walk(n,bound=new Set(),p='root'){
  if(typeof n==='string'){
    if(n.startsWith('?')&&!bound.has(n)) free.push({variable:n,path:p});
    return;
  }
  if(n.type==='paren'&&(n.children[0]==='^150006'||n.children[0]==='^150007')){
    if(n.children.length<4) throw new Error('malformed quantifier at '+p);
    const variable=n.children[1];
    walk(n.children[2],bound,p+'/domain');
    const next=new Set(bound);
    if(typeof variable==='string'&&variable.startsWith('?')) next.add(variable);
    for(let i=3;i<n.children.length;i++) walk(n.children[i],next,p+'/'+i);
    return;
  }
  n.children.forEach((c,i)=>walk(c,bound,p+'/'+i));
}

walk(ast);
if(free.length) throw new Error('free variables '+JSON.stringify(free));

const forbidden=['glycan','residue','enzyme','terminal','cleavage','treatment','trajectory','optimal','linkage','anomer'];
const forbiddenHits=forbidden.filter(function(w){
  return new RegExp('\\b'+w+'\\b','i').test(s);
});
if(forbiddenHits.length) throw new Error('domain labels in native payload '+forbiddenHits.join(','));

const declared=new Set(Array.from(s.matchAll(/\(\^1500(?:13|14|15|16)\s+(1810\d+)/g),m=>m[1]));
const uses=new Set(Array.from(s.matchAll(/\(\^150010\s+(1810\d+)/g),m=>m[1]));
const iff=new Set(Array.from(s.matchAll(/\(\^150005\s+\(\^150010\s+(1810\d+)/g),m=>m[1]));
const expectedDeclared=Array.from({length:20},function(_,i){return String(181000+i);});
const expectedIff=['181001','181002','181003','181004','181005','181006','181007','181008','181009','181015','181016','181017','181018','181019'];
const missingDeclared=expectedDeclared.filter(x=>!declared.has(x));
const undeclaredUses=Array.from(uses).filter(x=>!declared.has(x));
const missingIff=expectedIff.filter(x=>!iff.has(x));
if(missingDeclared.length||undeclaredUses.length||missingIff.length){
  throw new Error(JSON.stringify({missingDeclared,undeclaredUses,missingIff}));
}

function literalCount(value){
  return s.split(value).length-1;
}

const topLevelBlocks=ast.children.filter(x=>x.type==='bracket').length;
if(topLevelBlocks!==17) throw new Error('top-level block count '+topLevelBlocks);
if(literalCount('^150020')!==1) throw new Error('unexpected DERIVED_VIEW_OF semantic use');
if(literalCount('^150021')!==1) throw new Error('unexpected QU_UNEXPANDED semantic use');

const report={
  experiment:'032',
  parse:'PASS',
  top_level_blocks:topLevelBlocks,
  free_native_variables:0,
  forbidden_domain_label_hits:[],
  declared_local_ids:Array.from(declared).sort(),
  used_local_predicate_ids:Array.from(uses).sort(),
  expected_iff_definitions_present:true,
  semantic_derived_view_role_uses:0,
  semantic_qu_unexpanded_role_uses:0
};

fs.writeFileSync(out+'/MECHANICAL.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
