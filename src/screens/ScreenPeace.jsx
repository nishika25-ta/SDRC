import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { languageMap, callGemini } from '../utils';

export function ScreenPeace({ t, lang }) {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
  
    async function generateReflection() {
      if (!input.trim()) return;
      setLoading(true); setError(''); setResult(null);
      const fullLang = languageMap[lang] || "English";
      const prompt = `Feeling: "${input}". Provide comfort, scripture, and short prayer in ${fullLang}.`;
      const system = `Return JSON: { "message": "comfort", "verse": "ref", "verseText": "text", "prayer": "prayer" }`;
      try {
        const res = await callGemini(prompt, system);
        setResult(res);
      } catch (e) { setError(t.companion.error); } finally { setLoading(false); }
    }

    return (
        <div className="pt-24 pb-32 px-4 max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="text-center mb-16"><div className="w-16 h-16 rounded-3xl bg-[#9E804E]/10 text-[#9E804E] flex items-center justify-center mx-auto mb-6"><Sparkles className="w-8 h-8" /></div><h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">{t.companion.title}</h2><p className="text-xl text-[#86868B] max-w-2xl mx-auto">{t.companion.sub}</p></div>
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-black/5 relative">
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.companion.placeholder} className="w-full bg-[#F5F5F7] border-none rounded-2xl p-6 text-xl mb-6 h-48 focus:ring-2 focus:ring-[#9E804E] transition-all resize-none shadow-inner" />
                <button onClick={generateReflection} disabled={loading || !input.trim()} className="w-full bg-[#1D1D1F] text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg hover:bg-black transition-colors disabled:opacity-50">{loading ? <Loader2 className="w-6 h-6 animate-spin" /> : t.companion.btn}</button>
                {error && <p className="mt-6 text-red-500 text-center font-medium">{error}</p>}
                {result && (<div className="mt-12 pt-12 border-t border-black/5 animate-[fadeIn_0.5s_ease-out_forwards]"><p className="text-2xl font-medium mb-8 text-[#1D1D1F] leading-tight">{result.message}</p><div className="bg-[#F5F5F7] p-8 rounded-[2rem] border-l-8 border-[#9E804E] mb-8"><p className="text-2xl font-serif italic text-[#333336]" style={{ fontFamily: 'Georgia, serif' }}>"{result.verseText}"</p><p className="text-right font-bold text-[#9E804E] mt-6 tracking-widest uppercase text-sm">— {result.verse}</p></div><div className="px-4"><p className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-4">{t.companion.prayerLabel}</p><p className="text-2xl font-serif leading-relaxed text-[#1D1D1F]" style={{ fontFamily: 'Georgia, serif' }}>{result.prayer}</p><p className="mt-6 font-serif italic text-xl text-[#1D1D1F]">Amen.</p></div></div>)}
            </div>
        </div>
    );
}
