import React, { useState } from 'react';
import { Sun, CalendarDays, Clock, BookOpen } from 'lucide-react';
import { SegmentedControl } from '../components/SegmentedControl';

export function ScreenMassTimes({ t, lang }) {
  const [tab, setTab] = useState('weekend');
  const massData = {
    weekend: [
      { id: 1, day: t.massTimes.daySat, time: "6:00 PM", lang: "English", type: t.massTimes.typeSunset, icon: <Sun className="w-5 h-5 text-orange-500" /> },
      { id: 2, day: t.massTimes.daySat, time: "8:00 PM", lang: "Mandarin", type: t.massTimes.typeSunset, icon: <Sun className="w-5 h-5 text-orange-400" /> },
      { id: 3, day: t.massTimes.daySun, time: "7:00 AM", lang: "English", type: t.massTimes.typeMorning, icon: <CalendarDays className="w-5 h-5 text-blue-500" /> },
      { id: 4, day: t.massTimes.daySun, time: "9:00 AM", lang: "Bahasa Malaysia", type: t.massTimes.typeMorning, icon: <CalendarDays className="w-5 h-5 text-blue-600" /> },
      { id: 5, day: t.massTimes.daySun, time: "11:00 AM", lang: "Bahasa Iban", type: t.massTimes.typeMorning, icon: <CalendarDays className="w-5 h-5 text-indigo-500" /> },
    ],
    weekday: [
      { id: 6, day: t.massTimes.dayWeekday, time: "6:30 AM", lang: "English", type: t.massTimes.typeDaily, icon: <Clock className="w-5 h-5 text-green-500" /> },
      { id: 7, day: t.massTimes.dayWed, time: "7:30 PM", lang: "English", type: t.massTimes.typeNovena, icon: <BookOpen className="w-5 h-5 text-purple-500" /> },
    ]
  };

  return (
    <div className="pt-24 pb-32 px-4 max-w-6xl mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="text-center mb-16"><h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">{t.massTimes.title}</h2><p className="text-xl text-[#86868B] max-w-2xl mx-auto">{t.massTimes.sub}</p></div>
      <SegmentedControl options={[{ id: 'weekend', label: t.massTimes.weekend }, { id: 'weekday', label: t.massTimes.weekday }]} active={tab} onChange={setTab} />
      <div className="mt-12 space-y-4">
        {massData[tab].map((mass) => (
          <div key={mass.id} className="relative group bg-white rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8">
            <div className="flex items-center gap-6 md:w-1/3">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 bg-[#F5F5F7] text-[#1D1D1F]">{mass.icon}</div>
              <div><h4 className="text-3xl font-bold tracking-tighter text-[#1D1D1F]">{mass.time}</h4><p className="text-[#86868B] font-medium tracking-tight uppercase text-xs">{mass.day}</p></div>
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-3">
              <span className="px-5 py-2 bg-[#F5F5F7] text-[#1D1D1F] rounded-full text-sm font-bold border border-black/5">{mass.lang}</span>
              <span className="px-5 py-2 rounded-full text-sm font-bold border bg-transparent border-black/5 text-[#86868B]">{mass.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
