# MIPLIB recurrence 0.3 — second holdout

**Disposition:** PARTIAL
**Admitted:** 14/20

| Instance | Raw | Post-HiGHS | Candidate classes | Exact swaps | Signal |
| --- | ---: | ---: | ---: | ---: | --- |
| mc11 | 1920x3040 | 1920x3040 | 0 | 0 | NO_SIGNAL |
| mcsched | 2107x1747 | 1852x1494 | 45 | 0 | LEAD_ONLY |
| mik-250-20-75-4 | 195x270 | 75x253 | 0 | 0 | NO_SIGNAL |
| neos-1171737 | 4179x2340 | 4179x2340 | 78 | 0 | LEAD_ONLY |
| neos-2657525-crna | 342x524 | 129x309 | 0 | 0 | NO_SIGNAL |
| neos-3024952-loue | 3705x3255 | 3705x3255 | 0 | 0 | NO_SIGNAL |
| neos-3046615-murg | 498x274 | 129x145 | 0 | 0 | NO_SIGNAL |
| neos-3381206-awhea | 479x2375 | 479x2375 | 5 | 0 | LEAD_ONLY |
| neos-3627168-kasai | 1655x1462 | 1206x1400 | 93 | 0 | LEAD_ONLY |
| neos-3754480-nidda | 402x253 | 402x253 | 0 | 0 | NO_SIGNAL |
| neos-4338804-snowy | 1701x1344 | 1470x1323 | 0 | 0 | NO_SIGNAL |
| neos-4387871-tavua | 4554x4004 | 4261x3986 | 3 | 0 | LEAD_ONLY |
| neos-4954672-berkel | 1848x1533 | 609x885 | 25 | 0 | LEAD_ONLY |
| neos-860300 | 850x1385 | 568x1219 | 0 | 0 | NO_SIGNAL |

## Counts

~~~json
{
  "EXACT_GENERAL_SWAP": 0,
  "LEAD_ONLY": 6,
  "NO_SIGNAL": 8
}
~~~

## Size-cap skips

- milo-v12-6-r2-40-1: 5628x2688
- momentum1: 42680x5174
- mushroom-best: 8580x8468
- mzzv11: 9499x10240
- mzzv42z: 10460x11717
- n2seq36q: 2565x22480
- n3div36: 4484x22120
- neos-1122047: 57791x5100
- neos-1171448: 13206x4914
- neos-1354092: 3135x13702
- neos-1445765: 2147x20617
- neos-1456979: 6770x4605
- neos-1582420: 10180x10100
- neos-2075418-temuka: 349602x122304
- neos-2746589-doon: 31530x50936
- neos-2978193-inde: 396x20800
- neos-2987310-joes: 29015x27837
- neos-3004026-krka: 12545x17030
- neos-3083819-nubu: 4725x8644
- neos-3216931-puriri: 5989x3555
- neos-3402294-bobin: 591076x2904
- neos-3402454-bohle: 2897380x2904
- neos-3555904-turama: 146493x37461
- neos-3656078-kumeu: 17656x14870
- neos-3988577-wolgan: 44662x25870
- neos-4300652-rahue: 76992x33003
- neos-4413714-turia: 2303x190402
- neos-4532248-waihi: 167322x86842
- neos-4647030-tutaki: 8382x12600
- neos-4722843-widden: 113555x77723
- neos-4738912-atrato: 1947x6216
- neos-4763324-toguru: 106954x53593
- neos-5049753-cuanza: 322248x242736
- neos-5052403-cygnet: 38268x32868
- neos-5093327-huahum: 51840x40640
- neos-5104907-jarama: 489818x345856
- neos-5107597-kakapo: 6498x3114
- neos-5114902-kasavu: 961170x710164
- neos-5188808-nattai: 29452x14544
- neos-5195221-niemur: 42256x14546
- neos-631710: 169576x167056
- neos-662469: 1085x18235
- neos-787933: 1897x236376
- neos-827175: 14187x32504
- neos-848589: 1484x550539
