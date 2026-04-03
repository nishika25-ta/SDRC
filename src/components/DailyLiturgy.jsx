import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronRight, Sun, Moon, Calendar as CalIcon } from 'lucide-react';
import { languageMap, callGemini, normalizeLiturgicalColor } from '../utils';
import { gsap } from 'gsap';

const LITURGICAL_COLORS = {
  purple: {
    gradient: 'from-violet-600 via-purple-700 to-indigo-800',
    glow: 'shadow-[0_0_120px_40px_rgba(139,92,246,0.15)]',
    badge: 'bg-violet-500/20 text-violet-300 border-violet-400/30',
    accent: 'text-violet-400',
    dot: 'bg-violet-400',
    strip: 'from-violet-500 to-indigo-600',
  },
  red: {
    gradient: 'from-rose-600 via-red-700 to-red-900',
    glow: 'shadow-[0_0_120px_40px_rgba(239,68,68,0.15)]',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
    accent: 'text-rose-400',
    dot: 'bg-rose-400',
    strip: 'from-rose-500 to-red-600',
  },
  green: {
    gradient: 'from-emerald-600 via-green-700 to-teal-800',
    glow: 'shadow-[0_0_120px_40px_rgba(16,185,129,0.15)]',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    accent: 'text-emerald-400',
    dot: 'bg-emerald-400',
    strip: 'from-emerald-500 to-teal-600',
  },
  white: {
    gradient: 'from-slate-700 via-gray-800 to-zinc-900',
    glow: 'shadow-[0_0_120px_40px_rgba(255,255,255,0.08)]',
    badge: 'bg-white/10 text-white/80 border-white/20',
    accent: 'text-amber-300',
    dot: 'bg-amber-300',
    strip: 'from-amber-400 to-yellow-500',
  },
};

export function DailyLiturgy({ t, lang, setScreen }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchTodayLiturgy() {
      setLoading(true);
      setFetchError(false);
      const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const fullLang = languageMap[lang] || "English";
      const systemPrompt = `Liturgical assistant for ${today}. Lang: ${fullLang}. Return JSON: { "title": "Day Name", "color": "purple/white/red/green", "ref": "Bible Reference", "text": "Summary" }`;
      try {
        const res = await callGemini("liturgy", systemPrompt);
        setData(res);
      } catch (e) {
        console.error(e);
        setData(null);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTodayLiturgy();
  }, [lang]);

  useEffect(() => {
    if (!loading && data && sectionRef.current) {
      const els = sectionRef.current.querySelectorAll('.rv');
      gsap.fromTo(els,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }
      );
    }
  }, [loading, data]);

  const theme = LITURGICAL_COLORS[normalizeLiturgicalColor(data?.color)] || LITURGICAL_COLORS.white;

  const now = new Date();
  const todayDate = now.toLocaleDateString(
    lang === 'en' ? 'en-US' : lang === 'bm' ? 'ms-MY' : 'en-GB',
    { weekday: 'long', day: 'numeric', month: 'long' }
  );
  const dayNum = now.getDate();
  const monthAbbr = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const isEvening = now.getHours() >= 17;

  // Build the readings list
  const readings = data?.ref ? data.ref.split(' / ') : [];

  return (
    <section className="max-w-7xl mx-auto px-4 relative z-20 pb-32" ref={sectionRef}>
      {/* Outer wrapper with liturgical gradient */}
      <div className={`relative overflow-hidden rounded-[3rem] bg-gradient-to-br ${theme.gradient} ${theme.glow} transition-all duration-1000`}>
        
        {/* Subtle noise/texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}></div>
        
        {/* Top edge color strip */}
        <div className={`h-1 w-full bg-gradient-to-r ${theme.strip}`}></div>

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          
          {/* ─── Row 1: Section Label + Today Badge ─── */}
          <div className="rv flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-white/50" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50">{t.calendar.title}</span>
            </div>
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-sm ${theme.badge}`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme.dot}`}></div>
              <span className="text-xs font-bold tracking-wide">
                {t.liturgy.today}
              </span>
              <span className="text-white/30">·</span>
              <span className="text-xs font-medium text-white/50">{todayDate}</span>
            </div>
          </div>

          {/* ─── Row 2: Main Hero — Date Block + Title ─── */}
          <div className="rv flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end mb-14">
            {/* Date Block */}
            <div className="shrink-0 text-center md:text-left">
              <div className="inline-flex flex-col items-center bg-white/[0.06] border border-white/10 rounded-3xl px-8 py-6 backdrop-blur-sm">
                <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase mb-1">{monthAbbr}</span>
                <span className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white leading-none">{dayNum}</span>
                <div className="flex items-center gap-1.5 mt-2">
                  {isEvening ? <Moon className="w-3 h-3 text-white/30" /> : <Sun className="w-3 h-3 text-white/30" />}
                  <span className="text-[10px] font-medium text-white/30">{isEvening ? t.liturgy.evening : t.liturgy.morning}</span>
                </div>
              </div>
            </div>
            
            {/* Title */}
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-12 bg-white/10 rounded-2xl w-3/4 animate-pulse"></div>
                  <div className="h-6 bg-white/5 rounded-xl w-1/2 animate-pulse"></div>
                </div>
              ) : fetchError ? (
                <p className="text-lg text-white/80">{t.liturgy.error}</p>
              ) : (
                <>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-4">
                    {data?.title}
                  </h2>
                  {data?.color && (
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${theme.dot}`}></div>
                      <span className={`text-sm font-bold uppercase tracking-widest ${theme.accent}`}>
                        {t.liturgy.color}: {data.color}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ─── Row 3: Scripture Quote Card ─── */}
          <div className="rv">
            <div className="bg-black/20 border border-white/[0.06] rounded-[2.5rem] p-8 md:p-12 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-white/80 tracking-tight">{t.liturgy.readings}</h3>
                {!loading && readings.length > 0 && (
                  <span className="text-xs font-bold text-white/30 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{readings[0]}</span>
                )}
              </div>

              {loading ? (
                <div className="space-y-4">
                  <div className="h-8 bg-white/5 rounded w-full animate-pulse"></div>
                  <div className="h-8 bg-white/5 rounded w-5/6 animate-pulse"></div>
                  <div className="h-8 bg-white/5 rounded w-3/5 animate-pulse"></div>
                </div>
              ) : fetchError ? (
                <p className="text-white/70">{t.liturgy.error}</p>
              ) : (
                <>
                  <blockquote className="mb-10">
                    <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-snug font-serif italic tracking-tight">
                      "{data?.text}"
                    </p>
                  </blockquote>

                  {/* Reading references as chips */}
                  {readings.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {readings.map((ref, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] rounded-xl border border-white/[0.06] hover:bg-white/[0.08] transition-colors cursor-pointer">
                          <BookOpen className="w-3.5 h-3.5 text-white/25" />
                          <span className="text-xs font-bold text-white/50 uppercase tracking-wider">{ref}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ─── Row 4: Current Season Card + CTA ─── */}
          <div className="rv mt-8 grid md:grid-cols-3 gap-5">
            
            {/* Current Season Card */}
            <div className="md:col-span-2 bg-black/20 border border-white/[0.06] rounded-[2rem] p-7 md:p-8 backdrop-blur-sm relative overflow-hidden group/season">
              {/* Accent gradient stripe on left edge */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${theme.strip} rounded-l`}></div>
              
              <div className="pl-4">
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${theme.strip} flex items-center justify-center shadow-lg`}>
                      <CalIcon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-white/35 uppercase">{t.calendar.labelSeason}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-[9px] font-bold tracking-widest uppercase ${theme.badge}`}>
                    {t.liturgy.active}
                  </div>
                </div>

                {/* Season Name */}
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                  {loading ? <span className="inline-block h-7 bg-white/10 rounded-lg w-48 animate-pulse"></span> : fetchError ? (
                    <span className="text-white/60 text-lg font-medium">{t.liturgy.error}</span>
                  ) : (
                    data?.title?.toLowerCase().includes('lent') || data?.title?.toLowerCase().includes('holy')
                      ? t.calendar.seasonLent
                      : data?.title?.toLowerCase().includes('easter')
                        ? t.calendar.seasonEaster
                        : (lang === 'en' ? 'Ordinary Time' : lang === 'bm' ? 'Masa Biasa' : 'Maya Biasa')
                  )}
                </h3>
                <p className="text-sm text-white/40 mb-6">
                  {!fetchError && !loading && (data?.title?.toLowerCase().includes('lent') || data?.title?.toLowerCase().includes('holy')
                    ? t.liturgy.prepLent
                    : data?.title?.toLowerCase().includes('easter')
                      ? t.liturgy.prepEaster
                      : t.liturgy.prepOrdinary)}
                </p>

                {/* Season Progress */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${theme.strip} transition-all duration-1000`} style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white/30 shrink-0 tabular-nums">85%</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{t.calendar.start}</span>
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{t.calendar.end}</span>
                </div>
              </div>
            </div>

            {/* CTA Button — full height card */}
            <button 
              onClick={() => setScreen?.('calendar')}
              className="group flex flex-col items-center justify-center gap-4 bg-white text-[#1D1D1F] rounded-[2rem] p-8 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_15px_40px_-10px_rgba(255,255,255,0.25)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F5F5F7] flex items-center justify-center group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors">
                <ChevronRight className="w-7 h-7" />
              </div>
              <span className="text-base">
                {t.calendar.fullCalendar}
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
