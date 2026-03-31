import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { languageMap, callGemini } from '../utils';

export function MinistryMatcher({ t, lang }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState(null);

  async function findMatch() {
    if (!input.trim()) return;
    setLoading(true);
    const fullLang = languageMap[lang] || "English";
    const prompt = `Skills: "${input}". Suggest Choir, Liturgical, or Warden. Reason in ${fullLang}.`;
    const system = `Return JSON only: { "ministry": "Name", "reason": "1-sentence why in ${fullLang}" }`;
    try {
      const res = await callGemini(prompt, system);
      setMatch(res);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }

  return (
    <div className="bg-[#F5F5F7] rounded-[3rem] p-8 md:p-12 mt-16 border border-black/5">
        <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
                <h3 className="text-3xl font-bold tracking-tight mb-4">{t.matcher.title} ✨</h3>
                <p className="text-[#86868B] text-lg mb-8">{t.matcher.sub}</p>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.matcher.placeholder} className="w-full bg-white border border-black/10 rounded-2xl p-5 mb-4 h-32 focus:ring-2 focus:ring-[#9E804E] focus:outline-none transition-all" />
                <button onClick={findMatch} disabled={loading || !input.trim()} className="bg-[#1D1D1F] text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.matcher.btn}
                </button>
            </div>
            <div className="md:w-1/2 w-full flex items-center justify-center">
                {match ? (
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm w-full border border-black/5 animate-[fadeIn_0.5s_ease-out_forwards]">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9E804E] mb-2">{t.matcher.suggestion}</p>
                        <h4 className="text-3xl font-bold text-[#1D1D1F] mb-4">{match.ministry}</h4>
                        <p className="text-[#86868B] text-lg leading-relaxed italic">"{match.reason}"</p>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-black/5 rounded-[2.5rem] p-12 text-center w-full text-black/20 font-medium">Ready to match...</div>
                )}
            </div>
        </div>
    </div>
  );
}
