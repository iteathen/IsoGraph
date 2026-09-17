#!/usr/bin/env bash
set -euo pipefail

root="experiments/004/cold-results/gemini/raw"
rm -rf "$root"
mkdir -p "$root"

cat > /tmp/evidence.tsv <<'EOF'
RUN-S07	10484600723	58b6d5774826840e125b5b2667ada3f4f22a1388b53eb342271ea4cf90d55c32	392b347e6408f9a28cf84e6a1a495300afc6e4a20d866b8398260389fbd804d9
RUN-S04	10484606048	3fa2891359d9b337f9e73bef1f380e93a1dcd351cf846a2d777b40d269efac20	1fa583edb221891cc51df1277e16f2538b131e7c38495021abbfd2613293e659
RUN-S05	10484526430	4753d468d3ed9a73cb4c3364cca5046fe4dfe3904b0ce68be640f8fdee8ccab2	e2e72799572c27e40d345f9b7653d7da93226c351243f0d811bf01a10d8784bd
RUN-S08	10484392444	84bf3c18e0d1cce933d69f3c42011ff17125eabf2d4f6a84777eb6ad44dde18c	1f0b37955de77f02cfcedfc613256400f549198288d0481a7ae29d63ce2c7435
RUN-B	10483674973	a001cbb8510fffeb034c98dce1cef955651066de537bdb6c0dbb799befa058f0	a85e33fdc3db43cd6703005935cd829b1c0a91fd3754b36b72e92d0b4b826c03
RUN-C1	10484393260	144088f50e173602025e1e42b16f438ad01ad1c4893e2b68e1978b6cfffd1c54	0d206629f1a2a222e00b23fa4328f2dec55dac79ec35a198638054a8da52f174
RUN-C2	10485205542	03e9bbd45bc8e72c2cd519836b40c9242d4062c05b1a244d97c46866bccd6db3	0873765681240166606356bdd0effaa5305ae98d4d3c4e718b3ddcafe3062b43
RUN-D09	10484856912	11156699afbb21309c94950320aa5bab27e77009137978678c0270d6209e440a	1a10a14224562c03c33f5e3c2495384711d9640cc463dda7d60c243c39e138a9
RUN-D10	10485345166	8cb238c1e0cd0e506d0bbbd5314bbea48e4ca8f5104cb86c953dcb9cb6907e78	fc36c868ad9ca5e1ff0250d1f46415b2ac5968375203f524a3f7d9090d3a5eaa
RUN-D16	10484189545	693d28a05653f0e894d71f01315eac042d47315abcb55dc4353c00cb8043091b	76ea6e1da9e496158b088b1d0e19eb4af11b06afd8d362d83754b265818be1a9
RUN-D17	10484826388	b53a63b6430167052b8a0e2bb1ec077047199513a2635d7d729ff2eba06929ba	937b7d3ba71416f98ba8c9be08dcd34ae56f7f14a8e55ffefe5c51cec926e4d8
RUN-D17B	10484992470	4389c7fdd5371ef6dccf75b3fb930830c06d3bd7e6d42511deb87808372bd25e	26ca9382abe06ceb053dedc76423943f6be85cf6d67b1d5e479572c2d4843d1b
RUN-D18	10485126728	e1605cadb6bbb7c1aa19e57b589cab5fe88a2668d27cef446dc3c3146ceb6fee	a7383271d635e4246d49818f6e63973e81edb6d069c78b71ddfde6e5f15f2d23
RUN-D19	10484988097	a4de33a06b902997111b2505a7ca3b576396fa71dcb020143a57aad500e1a437	a71139ed0cc8eea872e871e11b9b273205d9ddaf6f555d491e1926424eba997c
RUN-D20S	10485500302	30bb9bdee2e2ad34c7754f851e254d1d7d40833de039741e81430cc1480ebc63	e9e5bdd92dde474ae5aa584ba3e1bc45b39c680a2cc0e26e91fb339b4cf4411d
RUN-D20L	10484813667	af2c35098f2c4e9d82325fc9f2771557dbbc486bf3c6a2b91dafdbabcd0e6515	90fa10ca58079b63f8c552eb53efdc830ecc267c88857156d7a93d57fd32cc4a
EOF

cat > "$root/MANIFEST.md" <<'EOF'
# Experiment 004 — Gemini V3 raw-evidence manifest

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Harness source:** `91ca09b65bebe8e9058ed69aa12e22b2e6716211`  
**Workflow run:** `35191919970`  
**Model:** `gemini-3.5-flash`

| Run | Artifact | Report SHA-256 | Artifact ZIP SHA-256 |
|---|---:|---|---|
EOF

while IFS=$'\t' read -r run artifact report_sha artifact_sha; do
  work="$(mktemp -d)"
  zip="$work/artifact.zip"
  curl -fsSL \
    -H "Authorization: Bearer ${GH_TOKEN:?GH_TOKEN is required}" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}/actions/artifacts/${artifact}/zip" \
    -o "$zip"
  actual_zip="$(sha256sum "$zip" | cut -d' ' -f1)"
  test "$actual_zip" = "$artifact_sha" || { echo "$run artifact hash mismatch: $actual_zip"; exit 1; }
  unzip -q "$zip" -d "$work/unpacked"
  report="$work/unpacked/${run}_COLD_REPORT.txt"
  meta="$work/unpacked/${run}_METADATA.json"
  test -f "$report"
  test -f "$meta"
  actual_report="$(sha256sum "$report" | cut -d' ' -f1)"
  test "$actual_report" = "$report_sha" || { echo "$run report hash mismatch: $actual_report"; exit 1; }
  mkdir -p "$root/$run"
  cp "$report" "$root/$run/COLD_REPORT.txt"
  cp "$meta" "$root/$run/METADATA.json"
  printf '| `%s` | `%s` | `%s` | `%s` |\n' "$run" "$artifact" "$report_sha" "$artifact_sha" >> "$root/MANIFEST.md"
  rm -rf "$work"
done < /tmp/evidence.tsv

cat >> "$root/MANIFEST.md" <<'EOF'

## D17B transport failure retained separately

The first `RUN-D17B` attempt, job `105106212633`, artifact `10484942945`, ended before a Gemini response with `UND_ERR_HEADERS_TIMEOUT`. It produced no cold report and is not scored. Artifact ZIP SHA-256: `f5fc866c1a7d61463ec61d1c9f69cc3af33149ad71655e919b1a8f9da1691fe3`.

The successful rerun is the `RUN-D17B` artifact listed in the table above.
EOF
