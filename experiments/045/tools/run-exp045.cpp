#include <algorithm>
#include <array>
#include <cstdint>
#include <fstream>
#include <iostream>
#include <numeric>
#include <random>
#include <string>
#include <vector>

using namespace std;

static void gen_words_rec(int L, int pos, int prev, vector<uint8_t>& cur, vector<uint8_t>& flat) {
    if (pos == L) {
        flat.insert(flat.end(), cur.begin(), cur.end());
        return;
    }
    for (int a = 0; a < 3; ++a) {
        if (pos > 0 && a == prev) continue;
        cur[pos] = static_cast<uint8_t>(a);
        gen_words_rec(L, pos + 1, a, cur, flat);
    }
}

static vector<uint8_t> gen_words(int L) {
    vector<uint8_t> flat;
    const size_t count = (L == 0) ? 1 : static_cast<size_t>(3) << (L - 1);
    flat.reserve(count * static_cast<size_t>(L));
    vector<uint8_t> cur(L);
    if (L == 0) return flat;
    gen_words_rec(L, 0, -1, cur, flat);
    return flat;
}

static bool subseq(const uint8_t* p, int plen, const uint8_t* w, int wlen) {
    int i = 0;
    for (int j = 0; j < wlen && i < plen; ++j) {
        if (p[i] == w[j]) ++i;
    }
    return i == plen;
}

struct XorShift32 {
    uint32_t x;
    explicit XorShift32(uint32_t seed): x(seed) {}
    uint32_t next() {
        x ^= x << 13;
        x ^= x >> 17;
        x ^= x << 5;
        return x;
    }
};

static string word_string(const uint8_t* p, int n) {
    string s;
    s.reserve(n);
    for (int i=0;i<n;++i) s.push_back(static_cast<char>('0'+p[i]));
    return s;
}

int main() {
    const int PL = 8;
    const int WL = 16;
    const int TRIALS = 128;

    auto paths = gen_words(PL);
    auto words = gen_words(WL);
    const int P = static_cast<int>(paths.size() / PL);
    const int U = static_cast<int>(words.size() / WL);

    if (P != 384 || U != 98304) {
        cerr << "unexpected dimensions P=" << P << " U=" << U << "\n";
        return 2;
    }

    vector<vector<uint32_t>> forbidden(P);
    vector<uint16_t> baseCount(U, 0);
    vector<uint16_t> baseXor(U, 0);

    for (int p=0;p<P;++p) {
        auto& f = forbidden[p];
        f.reserve(U/2);
        const uint8_t* pp = &paths[static_cast<size_t>(p)*PL];
        for (int u=0;u<U;++u) {
            const uint8_t* ww = &words[static_cast<size_t>(u)*WL];
            if (!subseq(pp,PL,ww,WL)) {
                f.push_back(static_cast<uint32_t>(u));
                ++baseCount[u];
                baseXor[u] ^= static_cast<uint16_t>(p+1);
            }
        }
    }

    for (int u=0;u<U;++u) {
        if (baseCount[u]==0) {
            cerr << "all-path family does not cover threshold word " << u << "\n";
            return 3;
        }
    }

    XorShift32 rng(0x04512026u);
    vector<int> order(P);
    iota(order.begin(), order.end(), 0);

    int bestSize = -1;
    int bestTrial = -1;
    vector<uint8_t> bestSelected;
    vector<int> histogram(P+1,0);

    vector<uint16_t> counts(U);
    vector<uint16_t> xors(U);
    vector<uint32_t> privateCount(P);
    vector<uint8_t> selected(P);

    for (int trial=0;trial<TRIALS;++trial) {
        counts = baseCount;
        xors = baseXor;
        fill(privateCount.begin(), privateCount.end(), 0u);
        fill(selected.begin(), selected.end(), 1u);
        int size=P;

        for (int u=0;u<U;++u) {
            if (counts[u]==1) {
                int owner = static_cast<int>(xors[u]) - 1;
                if (owner>=0 && owner<P) ++privateCount[owner];
            }
        }

        iota(order.begin(), order.end(), 0);
        for (int i=P-1;i>0;--i) {
            int j = static_cast<int>(rng.next() % static_cast<uint32_t>(i+1));
            swap(order[i],order[j]);
        }

        for (int p: order) {
            if (!selected[p]) continue;
            if (privateCount[p] != 0) continue;

            bool safe=true;
            for (uint32_t u: forbidden[p]) {
                if (counts[u]==1) { safe=false; break; }
            }
            if (!safe) continue;

            selected[p]=0;
            --size;
            const uint16_t enc = static_cast<uint16_t>(p+1);
            for (uint32_t u: forbidden[p]) {
                const uint16_t c = counts[u];
                if (c==2) {
                    const uint16_t remaining = static_cast<uint16_t>(xors[u] ^ enc);
                    if (remaining==0 || remaining>P) {
                        cerr << "bad xor owner\n";
                        return 4;
                    }
                    ++privateCount[remaining-1];
                }
                --counts[u];
                xors[u] ^= enc;
            }
        }

        ++histogram[size];
        if (size > bestSize) {
            bestSize=size;
            bestTrial=trial;
            bestSelected=selected;
        }
    }

    // Exact verification of retained best cover.
    vector<uint16_t> verifyCount(U,0);
    for (int p=0;p<P;++p) if (bestSelected[p]) {
        for (uint32_t u: forbidden[p]) ++verifyCount[u];
    }

    int uncovered=0;
    for (int u=0;u<U;++u) if (verifyCount[u]==0) ++uncovered;

    vector<int> selectedIds;
    vector<int> privateWord(P,-1);
    for (int p=0;p<P;++p) if (bestSelected[p]) {
        selectedIds.push_back(p);
        for (uint32_t u: forbidden[p]) {
            if (verifyCount[u]==1) { privateWord[p]=static_cast<int>(u); break; }
        }
    }

    int missingPrivate=0;
    for (int p: selectedIds) if (privateWord[p]<0) ++missingPrivate;

    const bool pass = uncovered==0 && missingPrivate==0 && static_cast<int>(selectedIds.size())==bestSize;

    system("mkdir -p out/exp045");
    ofstream out("out/exp045/RESULT.json");
    out << "{\n";
    out << "  \"experiment\": \"045\",\n";
    out << "  \"disposition\": \"" << (pass?"PASS":"FAIL") << "\",\n";
    out << "  \"alphabet_size\": 3,\n";
    out << "  \"candidate_path_length\": " << PL << ",\n";
    out << "  \"candidate_path_count\": " << P << ",\n";
    out << "  \"threshold_length\": " << WL << ",\n";
    out << "  \"threshold_universe_size\": " << U << ",\n";
    out << "  \"randomized_trials\": " << TRIALS << ",\n";
    out << "  \"best_trial\": " << bestTrial << ",\n";
    out << "  \"best_cover_size\": " << bestSize << ",\n";
    out << "  \"threshold_uncovered_words\": " << uncovered << ",\n";
    out << "  \"missing_private_witnesses\": " << missingPrivate << ",\n";
    out << "  \"exact_witness_width\": " << (pass?bestSize:-1) << ",\n";
    out << "  \"total_glycan_non_target_nodes\": " << (pass?bestSize*PL:0) << ",\n";

    out << "  \"cover_size_histogram\": {";
    bool first=true;
    for (int s=0;s<=P;++s) if (histogram[s]) {
        if (!first) out << ",";
        out << "\n    \"" << s << "\": " << histogram[s];
        first=false;
    }
    if (!first) out << "\n  ";
    out << "},\n";

    out << "  \"selected_paths\": [";
    for (size_t k=0;k<selectedIds.size();++k) {
        if (k) out << ",";
        int p=selectedIds[k];
        out << "\n    \"" << word_string(&paths[static_cast<size_t>(p)*PL],PL) << "\"";
    }
    if (!selectedIds.empty()) out << "\n  ";
    out << "],\n";

    out << "  \"private_witnesses\": [";
    for (size_t k=0;k<selectedIds.size();++k) {
        if (k) out << ",";
        int p=selectedIds[k], u=privateWord[p];
        out << "\n    {\"path\":\""
            << word_string(&paths[static_cast<size_t>(p)*PL],PL)
            << "\",\"word\":\""
            << (u>=0?word_string(&words[static_cast<size_t>(u)*WL],WL):string(""))
            << "\"}";
    }
    if (!selectedIds.empty()) out << "\n  ";
    out << "]\n";
    out << "}\n";
    out.close();

    cout << "{\n"
         << "  \"experiment\": \"045\",\n"
         << "  \"disposition\": \"" << (pass?"PASS":"FAIL") << "\",\n"
         << "  \"candidate_paths\": " << P << ",\n"
         << "  \"threshold_words\": " << U << ",\n"
         << "  \"trials\": " << TRIALS << ",\n"
         << "  \"best_cover_size\": " << bestSize << ",\n"
         << "  \"uncovered\": " << uncovered << ",\n"
         << "  \"missing_private\": " << missingPrivate << "\n"
         << "}\n";

    return pass?0:1;
}
