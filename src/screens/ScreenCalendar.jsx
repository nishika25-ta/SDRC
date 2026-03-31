import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Calendar as CalIcon, ArrowUpRight, BookOpen, Sun } from 'lucide-react';
import { calendarEventsData, languageMap, callGemini } from '../utils';
import { gsap } from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';

const LITURGICAL_COLORS = {
  purple: { gradient: 'from-violet-600 to-indigo-800', dot: 'bg-violet-400', text: 'text-violet-400', badge: 'bg-violet-500/15 text-violet-300 border-violet-400/20' },
  red:    { gradient: 'from-rose-600 to-red-900',      dot: 'bg-rose-400',   text: 'text-rose-400',   badge: 'bg-rose-500/15 text-rose-300 border-rose-400/20' },
  green:  { gradient: 'from-emerald-600 to-teal-800',  dot: 'bg-emerald-400',text: 'text-emerald-400',badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20' },
  white:  { gradient: 'from-slate-700 to-zinc-900',    dot: 'bg-amber-300',  text: 'text-amber-300',  badge: 'bg-amber-500/15 text-amber-200 border-amber-400/20' },
};

export function ScreenCalendar({ t, lang }) {
    const containerRef = useRef(null);
    const [liturgy, setLiturgy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchToday() {
            setLoading(true);
            const todayStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
            try {
                const res = await callGemini("liturgy", `Liturgical context for ${todayStr} in ${languageMap[lang]}. Return JSON: { "title": "Day Name", "color": "purple/white/red/green", "season": "Current Season" }`);
                setLiturgy(res);
            } catch (e) { console.error(e); } finally { setLoading(false); }
        }
        fetchToday();
    }, [lang]);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(".cal-reveal", { opacity: 0, y: 40, duration: 1, stagger: 0.12, ease: "power4.out" });
            
            const cards = gsap.utils.toArray('.cal-card');
            cards.forEach((card) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, [loading]);

    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const todayDateStr = today.toLocaleDateString(
        lang === 'en' ? 'en-US' : lang === 'bm' ? 'ms-MY' : 'en-GB',
        { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    );

    const theme = LITURGICAL_COLORS[liturgy?.color?.toLowerCase()] || LITURGICAL_COLORS.white;

    // Determine current season text
    const seasonText = loading ? '...' : (liturgy?.season || t.liturgy.ordinary);

    return (
        <div className="pt-24 pb-32 px-4 max-w-7xl mx-auto" ref={containerRef}>
            
            {/* ─── Hero Header ─── */}
            <div className="cal-reveal mb-20">
                {/* Clean white header card */}
                <div className="text-center mb-16 px-4">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <CalIcon className="w-5 h-5 text-[#86868B]" />
                        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#86868B]">{t.calendar.title}</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter text-[#1D1D1F] leading-[1.05] mb-6">
                        {t.calendar.sub.split('.')[0]}.
                    </h1>
                    <p className="text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed">
                        {t.calendar.sub.split('.').slice(1).join('.').trim() || t.calendar.sub}
                    </p>
                </div>

                {/* Today's Context — Horizontal card */}
                <div className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${theme.gradient} shadow-2xl`}>
                    {/* Top color strip */}
                    <div className={`h-1 w-full bg-gradient-to-r ${theme.dot === 'bg-violet-400' ? 'from-violet-400 to-indigo-500' : theme.dot === 'bg-rose-400' ? 'from-rose-400 to-red-500' : theme.dot === 'bg-emerald-400' ? 'from-emerald-400 to-teal-500' : 'from-amber-400 to-yellow-500'}`}></div>
                    
                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Date Block */}
                        <div className="shrink-0 bg-white/[0.06] border border-white/10 rounded-3xl px-8 py-6 text-center backdrop-blur-sm">
                            <span className="text-[9px] font-bold tracking-[0.4em] text-white/40 uppercase block mb-1">{todayMonth}</span>
                            <span className="text-5xl sm:text-6xl font-bold tracking-tighter text-white leading-none block">{todayDay}</span>
                            <div className="flex items-center justify-center gap-1.5 mt-2">
                                <Sun className="w-3 h-3 text-white/30" />
                                <span className="text-[9px] font-medium text-white/30">{t.liturgy.today}</span>
                            </div>
                        </div>

                        {/* Title + Season */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                                {loading ? <div className="h-8 bg-white/10 rounded-xl w-48 animate-pulse mx-auto md:mx-0"></div> : liturgy?.title}
                            </h2>
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${theme.dot}`}></div>
                                <span className={`text-sm font-bold uppercase tracking-widest ${theme.text}`}>{seasonText}</span>
                            </div>
                        </div>

                        {/* Date string */}
                        <div className="shrink-0 hidden lg:block text-right">
                            <p className="text-xs font-bold text-white/30 uppercase tracking-widest">{todayDateStr}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Liturgical Seasons ─── */}
            <div className="space-y-8 max-w-5xl mx-auto">
                {['Season of Lent', 'The Paschal Triduum', 'Easter Season'].map((seasonKey) => {
                    const seasonEvents = calendarEventsData.filter(e => e.season.en === seasonKey);
                    if (seasonEvents.length === 0) return null;

                    // Pick a season accent
                    const seasonAccent = seasonKey === 'Season of Lent' 
                        ? { bg: 'bg-purple-600', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100', dot: 'bg-purple-400', line: 'bg-purple-200' }
                        : seasonKey === 'The Paschal Triduum'
                        ? { bg: 'bg-red-600', light: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', dot: 'bg-red-400', line: 'bg-red-200' }
                        : { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', dot: 'bg-amber-400', line: 'bg-amber-200' };

                    return (
                        <div key={seasonKey} className="cal-card bg-white rounded-[2.5rem] border border-black/[0.04] shadow-sm overflow-hidden">
                            
                            {/* Season Header */}
                            <div className={`px-8 md:px-10 py-6 md:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.04] ${seasonAccent.light}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl ${seasonAccent.bg} flex items-center justify-center shadow-md`}>
                                        <CalIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] tracking-tight">{seasonEvents[0].season[lang]}</h2>
                                    </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full ${seasonAccent.light} border ${seasonAccent.border} ${seasonAccent.text} text-xs font-bold tracking-wider`}>
                                    {seasonEvents.length} {seasonEvents.length === 1 ? t.calendar.feast : t.calendar.feasts}
                                </div>
                            </div>

                            {/* Events Timeline */}
                            <div className="px-8 md:px-10 py-6">
                                {seasonEvents.map((event, idx) => {
                                    const isLast = idx === seasonEvents.length - 1;
                                    return (
                                        <div key={event.id} className="flex gap-6 group">
                                            {/* Timeline spine */}
                                            <div className="flex flex-col items-center pt-2 shrink-0">
                                                <div className={`w-3 h-3 rounded-full ${seasonAccent.dot} ring-4 ring-white shadow-sm z-10`}></div>
                                                {!isLast && <div className={`w-0.5 flex-1 ${seasonAccent.line} -mt-0.5`}></div>}
                                            </div>

                                            {/* Event Content */}
                                            <div className={`flex-1 ${!isLast ? 'pb-8 mb-2' : 'pb-2'}`}>
                                                <div className="bg-[#F5F5F7] rounded-2xl p-6 md:p-7 hover:bg-[#ECECEE] transition-colors group-hover:shadow-md border border-transparent group-hover:border-black/[0.03]">
                                                    {/* Top row: Date + Title */}
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4">
                                                        {/* Date chip */}
                                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${event.color} ${event.textColor || 'text-white'} ${event.border ? 'border border-black/5' : ''} shrink-0 shadow-sm`}>
                                                            <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-60">{event.month}</span>
                                                            <span className="text-2xl font-bold tracking-tighter leading-none">{event.day}</span>
                                                        </div>
                                                        <h4 className="text-xl md:text-2xl font-bold text-[#1D1D1F] tracking-tight group-hover:text-[#0066CC] transition-colors">{event.title[lang]}</h4>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-[15px] text-[#1D1D1F]/60 leading-relaxed font-serif italic mb-4">"{event.desc[lang]}"</p>

                                                    {/* Significance */}
                                                    <div className="flex items-center gap-2.5">
                                                        <Sparkles className="w-3.5 h-3.5 text-[#9E804E]" />
                                                        <span className="text-sm font-semibold text-[#1D1D1F]/80">{event.significance[lang]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
