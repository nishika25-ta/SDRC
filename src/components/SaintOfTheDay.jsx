import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { languageMap, callGemini } from '../utils';
import {
  getSaintCacheKey,
  getSaintHalfDayPeriod,
  readSaintCache,
  writeSaintCache,
  getNextHalfDayChangeMs,
} from '../utils/saintOfTheDayCache';

export function SaintOfTheDay({ t, lang }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  /** Bumps at each noon/midnight so we reload for the new half-day slot. */
  const [halfDayTick, setHalfDayTick] = useState(0);

  useEffect(() => {
    const ms = getNextHalfDayChangeMs();
    const id = window.setTimeout(() => setHalfDayTick((n) => n + 1), ms);
    return () => window.clearTimeout(id);
  }, [halfDayTick]);

  useEffect(() => {
    async function loadSaint() {
      const cacheKey = getSaintCacheKey(lang);
      const cached = readSaintCache(cacheKey);
      if (cached) {
        setData(cached);
        setFetchError(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setFetchError(false);
      const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
      const period = getSaintHalfDayPeriod();
      const periodPhrase =
        period === 'am'
          ? 'the morning (first half of this calendar day)'
          : 'the afternoon and evening (second half of this calendar day)';
      const fullLang = languageMap[lang] || 'English';
      const prompt = `Identify the Catholic Saint or Feast Day for ${today}. This reflection is for ${periodPhrase}—you may focus on a different angle, a related saint, or the same feast with fresh wording compared to another time of day. Provide response in ${fullLang}.`;
      const system = `Return JSON only: { "name": "Saint Name", "bio": "2-sentence biography in ${fullLang}", "lesson": "1-sentence takeaway in ${fullLang}" }`;
      try {
        const res = await callGemini(prompt, system);
        setData(res);
        writeSaintCache(cacheKey, res);
      } catch (e) {
        console.error(e);
        setData(null);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }
    loadSaint();
  }, [lang, halfDayTick]);

  if (loading) return <div className="max-w-4xl mx-auto px-4 pb-16 animate-pulse"><div className="bg-white rounded-[2.5rem] p-8 border border-black/5 h-48"></div></div>;

  if (fetchError) {
    return (
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/5 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#9E804E]/10 flex items-center justify-center text-[#9E804E]"><Lightbulb className="w-6 h-6" /></div>
            <h3 className="text-2xl font-bold tracking-tight">{t.saint.title}</h3>
          </div>
          <p className="text-[#86868B] leading-relaxed">{t.saint.error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/5 shadow-sm relative overflow-hidden group transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9E804E]/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500"></div>
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#9E804E]/10 flex items-center justify-center text-[#9E804E]"><Lightbulb className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold tracking-tight">{t.saint.title}</h3>
            </div>
            <h4 className="text-3xl font-serif font-bold text-[#1D1D1F] mb-6">{data?.name}</h4>
            <div className="grid md:grid-cols-2 gap-8">
                <div><p className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-2">{t.saint.bio}</p><p className="text-[#333336] leading-relaxed">{data?.bio}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-2">{t.saint.lesson}</p><p className="text-[#333336] italic leading-relaxed">"{data?.lesson}"</p></div>
            </div>
        </div>
    </section>
  );
}
