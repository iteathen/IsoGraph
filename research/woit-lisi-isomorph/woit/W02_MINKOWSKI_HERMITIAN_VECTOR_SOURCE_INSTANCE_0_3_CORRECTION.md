# W02 Minkowski Hermitian Vector 0.3 correction

**Status:** 0.3 REJECTED AS DOWNSTREAM INTERFACE AUTHORITY / HISTORICAL EVIDENCE PRESERVED

0.3 correctly repaired the source equations but reassigned legacy public ID `204145`, which downstream W02 native files use as `-i`, to a private matrix intermediate.

Affected downstream files include:

- W02_RIGHT_HANDED_EUCLIDEAN_SOURCE_INSTANCE_0_1.isg
- W02_MINKOWSKI_HODGE_COMPLEX_SOURCE_INSTANCE_0_1.isg
- W02_COMPLEX_SELFDUAL_SL2_SYM2_SOURCE_INSTANCE_0_1.isg

Revision 0.4 preserves their intended public interface while retaining all semantic corrections from 0.3.

Current W128 and W131 closure packets/ledgers must be revalidated against 0.4 before remaining current authority.
