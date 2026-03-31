import React, { useState, useEffect, useRef } from 'react';
import { Church, CalendarDays, Flame, Clock, UsersRound, Compass, Heart, Globe, ChevronDown } from 'lucide-react';

import { translations, languageMap } from './utils';
import { BlurText } from './components/BlurText';
import SplitText from './components/SplitText';
import { Chatbot } from './components/Chatbot';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { ScreenHome } from './screens/ScreenHome';
import { ScreenCalendar } from './screens/ScreenCalendar';
import { ScreenPeace } from './screens/ScreenPeace';
import { ScreenMassTimes } from './screens/ScreenMassTimes';
import { ScreenOrganization } from './screens/ScreenOrganization';
import { ScreenLocation } from './screens/ScreenLocation';
import { ScreenDonate } from './screens/ScreenDonate';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [splashState, setSplashState] = useState('loading');
  const [isAppReady, setIsAppReady] = useState(false);
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);
  const [hasSeenLangHint, setHasSeenLangHint] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => { if (langMenuRef.current && !langMenuRef.current.contains(e.target)) setIsLangMenuOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { setSplashState('exiting'); setIsAppReady(true); }, 3000);
    const hide = setTimeout(() => setSplashState('hidden'), 4000);
    return () => { clearTimeout(timer); clearTimeout(hide); };
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [currentScreen]);

  const navItems = [
    { id: 'home', icon: <Church strokeWidth={1.5} />, label: t.nav.home },
    { id: 'calendar', icon: <CalendarDays strokeWidth={1.5} />, label: t.nav.calendar },
    { id: 'peace', icon: <Flame strokeWidth={1.5} />, label: t.nav.peace },
    { id: 'mass-times', icon: <Clock strokeWidth={1.5} />, label: t.nav.mass },
    { id: 'organization', icon: <UsersRound strokeWidth={1.5} />, label: t.nav.team },
    { id: 'location', icon: <Compass strokeWidth={1.5} />, label: t.nav.location },
    { id: 'donate', icon: <Heart strokeWidth={1.5} className="text-[#9E804E]" />, label: t.nav.donate, isDivider: true }
  ];

  return (
    <div className="min-h-screen text-[#1D1D1F] font-sans antialiased relative" style={{ fontFamily: '"SF Pro Display", sans-serif' }}>
      <div className="fixed inset-0 z-[-2] bg-[#F5F5F7]" />

      {isAppReady && (
        <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[60] animate-[fadeIn_1s_ease-out_forwards]" ref={langMenuRef}>
          <div className="relative flex flex-col items-end">
            <button
              onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); setHasSeenLangHint(true); }}
              className={`relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-sm transition-all backdrop-blur-xl font-bold text-sm ${isLangMenuOpen ? 'bg-white border-[#1D1D1F]/10' : 'bg-white/60 border-white/40'}`}
            >
              <Globe className="w-4 h-4" /> {lang.toUpperCase()} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`absolute top-full right-0 mt-3 bg-white/95 backdrop-blur-xl border border-black/10 shadow-2xl px-5 py-4 rounded-2xl w-max min-w-[140px] text-center transition-all duration-500 origin-top-right ${!hasSeenLangHint && !isLangMenuOpen ? 'opacity-100 scale-100 animate-[bounce_2s_infinite]' : 'opacity-0 scale-95 pointer-events-none delay-100'}`}>
              <div className="absolute -top-1.5 right-6 w-3.5 h-3.5 bg-white border-t border-l border-black/10 rotate-45 rounded-[2px]"></div>
              <div className="flex flex-col gap-0.5">
                <p className="font-bold text-[#1D1D1F] text-sm tracking-tight text-center">Tukar Bahasa</p>
                <p className="font-semibold text-[#86868B] text-xs text-center">Nukar Jaku</p>
              </div>
            </div>

            {isLangMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white/90 backdrop-blur-2xl border border-black/5 rounded-2xl p-2 shadow-2xl flex flex-col min-w-[180px] animate-[slideDown_0.3s_ease-out_forwards] z-[70]">{Object.keys(translations).map(l => (<button key={l} onClick={() => { setLang(l); setIsLangMenuOpen(false); setHasSeenLangHint(true); }} className={`text-left px-4 py-3 rounded-xl font-bold text-sm ${lang === l ? 'bg-[#F5F5F7] text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]/50'}`}>{languageMap[l]}</button>))}</div>
            )}
          </div>
        </div>
      )}

      {splashState !== 'hidden' && (
        <div className={`fixed inset-0 z-[100] bg-[#F5F5F7] flex flex-col items-center justify-center transition-all duration-1000 ${splashState === 'exiting' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}><img src="/logo.jpg" alt="Parish Logo" className="w-24 h-24 object-cover rounded-3xl mb-8 shadow-xl border border-black/5" /><SplitText text="St Dominic & The Rosary" className="text-4xl md:text-5xl font-bold tracking-tighter" delay={30} duration={1.5} ease="back.out(1.5)" splitType="chars" from={{ opacity: 0, y: 50, rotateX: -90 }} to={{ opacity: 1, y: 0, rotateX: 0 }} threshold={0.1} textAlign="center" /><div className="w-56 h-[2px] bg-black/5 rounded-full overflow-hidden mt-12"><div className="h-full bg-[#1D1D1F] rounded-full animate-loader"></div></div></div>
      )}

      {isAppReady && (
        <>
          <div className="animate-[fadeIn_1s_ease-out_forwards] flex flex-col min-h-[100dvh]">
            <main className="flex-1 min-h-[85vh]">
              {currentScreen === 'home' && <ScreenHome setScreen={setCurrentScreen} lang={lang} t={t} />}
              {currentScreen === 'calendar' && <ScreenCalendar t={t} lang={lang} />}
              {currentScreen === 'peace' && <ScreenPeace t={t} lang={lang} />}
              {currentScreen === 'mass-times' && <ScreenMassTimes t={t} lang={lang} />}
              {currentScreen === 'organization' && <ScreenOrganization t={t} lang={lang} />}
              {currentScreen === 'location' && <ScreenLocation t={t} lang={lang} />}
              {currentScreen === 'donate' && <ScreenDonate t={t} lang={lang} />}
            </main>
            <footer className="text-[#86868B] py-16 pb-32 text-center text-lg relative z-10 font-bold"><p>&copy; 2026 St Dominic & The Rosary. {t.footer}</p></footer>
          </div>
          <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-[96%] md:w-auto flex justify-center opacity-0 animate-[fadeOpacity_1s_ease-out_0.5s_forwards]">
            <div className="flex items-end gap-1 md:gap-2 p-2 md:p-3 bg-white/70 backdrop-blur-2xl rounded-3xl md:rounded-[2rem] border border-white/50 shadow-xl pointer-events-auto">
              {navItems.map((item) => (
                <React.Fragment key={item.id}>
                  {item.isDivider && <div className="w-[1px] h-8 md:h-10 bg-black/10 mx-0.5 md:mx-1 self-center" />}
                  <button onClick={() => setCurrentScreen(item.id)} className="group relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2">
                    <div className={`transition-colors ${currentScreen === item.id ? 'text-[#1D1D1F]' : 'text-[#86868B]'}`}>{React.cloneElement(item.icon, { className: 'w-6 h-6 md:w-7 md:h-7' })}</div>
                    <span className="absolute bottom-[130%] left-1/2 -translate-x-1/2 px-4 py-2 bg-black/90 backdrop-blur text-white text-[10px] md:text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
                    <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#1D1D1F] transition-opacity ${currentScreen === item.id ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}

      {isAppReady && <Chatbot t={t} lang={lang} />}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOpacity { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes loadingProgress { 0% { width: 0%; } 100% { width: 100%; } }
        .animate-loader { animation: loadingProgress 2s cubic-bezier(0.16,1,0.3,1) 1s forwards; animation-fill-mode: both; }
      `}} />
    </div>
  );
}
