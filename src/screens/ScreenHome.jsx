import React, { useEffect, useRef } from 'react';
import { ArrowDown, Bell, Pin, Megaphone, ShoppingBag, XCircle, MapPin, Clock, CalendarDays, Info } from 'lucide-react';
import { BlurText } from '../components/BlurText';
import { SaintOfTheDay } from '../components/SaintOfTheDay';
import { DailyLiturgy } from '../components/DailyLiturgy';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ScreenHome({ setScreen, lang, t }) {
  const weeklyPosts = [
    { id: 1, category: lang === 'en' ? "Community" : "Komuniti", date: "Mar 28, 2026", title: t.updates.title, excerpt: t.announcement.text, image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ];

  const bgRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current.parentElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="animate-[fadeIn_0.5s_ease-out_forwards]">
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-b-[3rem] shadow-sm mb-12 mx-4 mt-4">
        <div ref={bgRef} className="absolute w-full h-[130%] -top-[15%] left-0 z-0" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url('/hero.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white flex flex-col items-center">
          <span className="text-sm md:text-base font-semibold tracking-widest uppercase mb-4 text-white/90">{t.hero.welcome}</span>
          <BlurText key={lang} text={t.hero.churchName} className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[1.05]" delay={100} />
          <p className="text-xl md:text-3xl text-white/90 font-medium tracking-tight mb-10 max-w-2xl opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">{t.hero.subtitle}</p>
          <button onClick={() => setScreen('mass-times')} className="group flex items-center gap-2 bg-white/20 hover:bg-white text-white hover:text-[#1D1D1F] backdrop-blur-md px-8 py-4 rounded-full font-medium transition-all duration-300 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
            {t.hero.btn} <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 relative z-20 pb-24">
        <div className="bg-white rounded-[3rem] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden p-8 md:p-16">
          <div className="border-b-2 border-[#1D1D1F] pb-8 mb-10">
            <p className="text-[#86868B] tracking-[0.2em] uppercase text-sm font-bold mb-4">{t.chronicle.kicker}</p>
            <h2 className="text-4xl md:text-7xl font-serif tracking-tight text-[#1D1D1F] leading-[1.1] mb-4">{t.chronicle.title}</h2>
            <p className="text-2xl font-serif text-[#86868B] italic">{t.chronicle.sub}</p>
          </div>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 text-lg font-serif text-[#333336] leading-relaxed">
              <div className="columns-1 md:columns-2 gap-8">
                <p className="mb-6 first-letter:text-7xl first-letter:font-bold first-letter:text-[#1D1D1F] first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-line:uppercase first-line:tracking-widest">{t.chronicle.p1}</p>
                <p className="mb-6">{t.chronicle.p2}</p>
                <p className="mb-6">{t.chronicle.p3}</p>
                <p>{t.chronicle.p4}</p>
              </div>
              <blockquote className="mt-12 border-l-4 border-[#9E804E] pl-6 py-2"><p className="text-2xl md:text-3xl italic text-[#1D1D1F] leading-snug">"{t.chronicle.quote}"</p></blockquote>
            </div>
            <div className="lg:col-span-4 space-y-8 lg:border-l border-black/10 pt-8 lg:pt-0 lg:pl-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1D1D1F] mb-6">{t.chronicle.factsTitle}</h3>
              {t.chronicle.facts.map((fact, idx) => (
                <div key={idx}><h4 className="text-4xl font-light tracking-tighter text-[#9E804E]">{fact.value}</h4><p className="font-bold text-[#1D1D1F] mt-1">{fact.label}</p><p className="text-[#86868B] text-sm mt-1 leading-relaxed">{fact.desc}</p>{idx !== 3 && <div className="h-px w-full bg-black/5 mt-6"></div>}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SaintOfTheDay t={t} lang={lang} />

      <section className="max-w-6xl mx-auto px-4 relative z-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Parish News */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-black/5 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <Bell className="w-5 h-5" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">{t.updates.news}</h2>
                </div>
                <div className="space-y-6 flex-1">
                    {[1, 2].map(i => {
                        const isIB = lang === 'ib';
                        const isBM = lang === 'bm';
                        
                        const tag1 = isIB ? 'Sekula Hari Minggu' : isBM ? 'Sekolah Pagi' : 'Sunday School';
                        const tag2 = isIB ? 'Hari Gawai' : isBM ? 'Hari Perayaan' : 'Feast Day';
                        const month = isIB ? 'Mac 2026' : isBM ? 'Mac 2026' : 'Mar 2026';
                        
                        const title1 = isIB ? 'Ngerijista Ungkup 2027' : isBM ? 'Pendaftaran untuk 2027' : 'Registration for 2027';
                        const title2 = isIB ? 'Aum Komiti Gawai' : isBM ? 'Mesyuarat Jawatankuasa Perayaan' : 'Feast Day Committee Meeting';
                        
                        const desc1 = isIB ? 'Apai indai dilalau ngerijista bala anak memanah sebedau ujung bulan tu.' : isBM ? 'Ibu bapa diingatkan untuk mendaftar anak mereka sebelum hujung bulan ini.' : 'Parents are reminded to register their children before the end of the month.';
                        const desc2 = isIB ? 'Sama nyereta komiti ngenataika diri merambu gawai kitai ti deka datai.' : isBM ? 'Sertai jawatankuasa untuk persiapan sambutan paroki kita yang akan datang.' : 'Join the committee as we prepare for our upcoming parish celebrations.';

                        return (
                            <div key={i} className="p-6 rounded-3xl bg-[#F5F5F7]/50 hover:bg-[#F5F5F7] transition-all cursor-pointer group border border-transparent hover:border-black/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#9E804E]">{i === 1 ? tag1 : tag2}</span>
                                    <span className="w-1 h-1 rounded-full bg-black/10"></span>
                                    <span className="text-xs font-medium text-[#86868B]">{month}</span>
                                </div>
                                <h4 className="font-bold text-2xl group-hover:text-[#0066CC] transition-colors">{i === 1 ? title1 : title2}</h4>
                                <p className="text-[#86868B] mt-2 leading-relaxed">{i === 1 ? desc1 : desc2}</p>
                            </div>
                        );
                    })}
                </div>
                <button className="w-full mt-10 py-4 bg-[#F5F5F7] text-[#1D1D1F] rounded-2xl font-bold text-lg hover:bg-[#E5E5EA] transition-colors">
                    {t.updates.moreNews} &rsaquo;
                </button>
            </div>

            {/* Church Notices */}
            <div className="bg-[#1D1D1F] rounded-[3rem] p-8 md:p-12 shadow-2xl text-white flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <Pin className="w-5 h-5 text-[#9E804E]" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {lang === 'ib' ? 'Notis Gereja' : lang === 'bm' ? 'Notis Gereja' : 'Church Notices'}
                    </h2>
                </div>
                <div data-lenis-prevent className="space-y-5 flex-1 relative z-10 overflow-y-auto overscroll-contain pr-2 pb-2">
                    {/* Notice 1 */}
                    <div className="p-6 rounded-3xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#9E804E]/20 text-[#9E804E] flex items-center justify-center shrink-0">
                                <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E804E] mb-1 block">29 Mac 2026</span>
                                <h4 className="font-bold text-xl text-white tracking-tight leading-tight">PANTRY MAKANAN SSV</h4>
                            </div>
                        </div>
                        <p className="text-[15px] text-white/70 leading-relaxed font-normal mb-5">
                            Persatuan St. Vincent de Paul menganjurkan kutipan makanan untuk diedarkan kepada keluarga yang memerlukan.
                        </p>
                        <div className="bg-black/30 rounded-2xl p-4 text-xs text-white/70 space-y-3 border border-white/5">
                            <div className="flex gap-3 items-start"><MapPin className="w-4 h-4 shrink-0 text-[#9E804E] mt-0.5" /> <span className="flex-1 leading-snug"><strong className="text-white font-medium">Tempat:</strong> Katedral St Joseph, Gereja Mater Dei, Pusat St Francis, Gereja St Dominic.</span></div>
                            <div className="flex gap-3 items-start"><Clock className="w-4 h-4 shrink-0 text-[#9E804E]" /> <span className="leading-snug"><strong className="text-white font-medium">Masa:</strong> 7.00 pagi - 12.15 tengah hari.</span></div>
                            <div className="flex gap-3 items-start pt-3 border-t border-white/10"><Info className="w-4 h-4 shrink-0 text-white/40 mt-0.5" /> <span className="italic text-white/50 leading-snug">Sumbangan pukal yang besar, sila hantar terus ke Pusat St. Francis (Carmelite Chapel).</span></div>
                        </div>
                    </div>

                    {/* Notice 2 */}
                    <div className="p-6 rounded-3xl bg-red-950/30 hover:bg-red-900/40 border border-red-500/20 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                                <XCircle className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1 block">1 Apr 2026</span>
                                <h4 className="font-bold text-xl text-white tracking-tight leading-tight">HOLY HOUR DIBATALKAN</h4>
                            </div>
                        </div>
                        <p className="text-[15px] text-red-100/70 leading-relaxed font-normal">
                            Misa Malam Hari Rabu dan acara Holy Hour pada 1 April 2026 di paroki St Dominic adalah dibatalkan. Harap maklum.
                        </p>
                    </div>

                    {/* Notice 3 */}
                    <div className="p-6 rounded-3xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                                <CalendarDays className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1 block">2-5 Apr 2026</span>
                                <h4 className="font-bold text-xl text-white tracking-tight leading-tight">TRIDUUM PASKAH 2026</h4>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                                <h5 className="text-[11px] font-bold tracking-widest uppercase text-white mb-4">Khamis Putih (2 April)</h5>
                                <div className="space-y-3 text-xs text-white/70">
                                    <div className="flex items-center gap-4"><span className="w-16 font-mono font-bold text-[#9E804E]">6.00 ptg</span> <div className="h-px bg-white/10 flex-1"></div> <span className="font-medium text-right text-white/90">Misa Iban (Ave Maria Chapel)</span></div>
                                    <div className="flex items-center gap-4"><span className="w-16 font-mono font-bold text-[#9E804E]">7.00 mlm</span> <div className="h-px bg-white/10 flex-1"></div> <span className="font-medium text-right text-white/90">Misa Iban (SDRC)</span></div>
                                    <div className="flex items-center gap-4"><span className="w-16 font-mono font-bold text-[#9E804E]">9.00 mlm</span> <div className="h-px bg-white/10 flex-1"></div> <span className="font-medium text-right text-white/90">Misa BM & Eng (SDRC)</span></div>
                                </div>
                            </div>
                            <div className="bg-black/30 rounded-2xl p-5 border border-white/5">
                                <h5 className="text-[11px] font-bold tracking-widest uppercase text-white mb-4">Jumaat Agung (3 April)</h5>
                                <div className="space-y-3 text-xs text-white/70">
                                    <div className="flex items-center gap-4"><span className="w-16 font-mono font-bold text-[#9E804E]">8.00 pagi</span> <div className="h-px bg-white/10 flex-1"></div> <span className="font-medium text-right text-white/90">Jalan Salib BM (Luar)</span></div>
                                    <div className="flex items-center gap-4"><span className="w-16 font-mono font-bold text-[#9E804E]">11.30 tgh</span> <div className="h-px bg-white/10 flex-1"></div> <span className="font-medium text-right text-white/90">Jalan Salib Iban</span></div>
                                    <div className="flex items-center gap-4"><span className="w-16 font-mono font-bold text-[#9E804E]">2.30 ptg</span> <div className="h-px bg-white/10 flex-1"></div> <span className="font-medium text-right text-white/90">Servis BM</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="w-full mt-10 py-4 bg-white text-[#1D1D1F] rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg relative z-10 flex flex-center items-center justify-center gap-2">
                    <Megaphone className="w-5 h-5" />
                    {lang === 'ib' ? 'Macham Notis' : lang === 'bm' ? 'Semua Notis' : 'All Notices'}
                </button>
            </div>
        </div>
      </section>

      <DailyLiturgy t={t} lang={lang} setScreen={setScreen} />
    </div>
  );
}
