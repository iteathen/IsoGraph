import fs from "node:fs";

const oldPath="research/woit-lisi-isomorph/lisi/LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_1.isg";
const newPath="research/woit-lisi-isomorph/lisi/LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_2.isg";
const oldText=fs.readFileSync(oldPath,"utf8");
const newText=fs.readFileSync(newPath,"utf8");

const bad=[
  "(^150010 198103 198108 198108 198109)",
  "(^150010 198103 198104 198106 198109)",
  "(^150010 198103 198106 198104 198109)",
  "(^150010 198103 198104 198108 198110)"
];

const required=[
  "(^150010 198100 198108)",
  "(^150010 198100 198109)",
  "(^150010 198100 198110)",
  "(^150010 198102 198108 198108 198109)",
  "(^150010 198103 198106 198109)",
  "(^150010 198103 198108 198110)",
  "(^150010 198104 198108 198110)"
];

const oldDefect=bad.every(x=>oldText.includes(x));
const newRemoved=bad.every(x=>!newText.includes(x));
const newRequired=required.every(x=>newText.includes(x));

const fieldCall="(^150010 182003\n    198100 198101 198102 198103 198104 198105 198106)";
const fieldRolesPreserved=newText.includes(fieldCall);

const result={
  schema:"woit-lisi.lisi-complex-scalar-operation-interface.v0.1",
  old_defect_reproduced:oldDefect,
  malformed_old_198103_ternary_facts:bad.length,
  successor_removes_malformed_facts:newRemoved,
  successor_required_scalar_facts_present:newRequired,
  successor_field_role_assignment_preserved:fieldRolesPreserved,
  operation_roles:{
    add:198101,
    multiply:198102,
    negate:198103,
    inverse:198104,
    zero:198105,
    one:198106,
    real_embedding:198107,
    imaginary_unit:198108,
    negative_one:198109,
    negative_i:198110
  },
  pass:oldDefect&&newRemoved&&newRequired&&fieldRolesPreserved
};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
