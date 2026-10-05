# Woit Native Compilation 0.1

**Status:** AUTHORITATIVE ROUTING COMPILATION / PRE-CLOSURE  
**Date:** 2026-10-04  
**Frozen source census:** `SOURCE_SEMANTIC_CENSUS_0_1.json`  
**Native routing graph:** `WOIT_NATIVE_COMPILATION_0_1.isg`  
**Machine manifest:** `WOIT_NATIVE_COMPILATION_MANIFEST_0_1.json`

## Purpose

This is the first authoritative native compilation after the W census freeze. It gives every one of the 127 frozen census items a stable native item atom and an authoritative semantic-body root, preserves source ownership, and registers all existing W-local native source instances as reusable components.

It intentionally does **not** classify an unreduced source body as a primitive leaf.

Current disposition for all 127 body roots is `INCOMPLETE_UNEXPANDED`. Primitive/schema reduction will replace those dispositions only when the body, support, dependencies, and reconstruction path satisfy Core 0.21.

## Namespace

The 930000-series is W-track-local for this compilation revision.

- 930000-series: compilation metadata relations and markers
- 930100-series: frozen W source-unit atoms
- 931001–931127: census-item atoms
- 932001–932127: authoritative semantic-body roots
- 933000-series: registered existing W-local .isg components

These metadata relations are compilation/routing structure, not new Core semantic primitives.

## Component rule

Existing W02, W01/BT01, and W05 source-instance files are registered as candidate reusable subgraphs. Registration does not automatically close any census item. Each component must be attached through an exact source reconstruction path during primitive closure.

## Cross-track firewall

No Lisi artifact or historical bridge/unification candidate is present in this bundle. Cross-author semantics remain unavailable.

## Next operation

Reduce body roots in source-independent order, reusing exact W-local source instances where they match the frozen semantic obligation. Each replacement must preserve the census identity and reconstruction path.

DP remains blocked.
