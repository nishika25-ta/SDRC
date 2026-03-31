import React from 'react';
import { TrendingUp, QrCode, Heart, Landmark, Calendar } from 'lucide-react';
import { weeklyCollectionData } from '../utils';

export function ScreenDonate({ t }) {
    const currentMonthTarget = 20000;
    const currentMonthCollected = 14230.70;
    const percentage = Math.round((currentMonthCollected / currentMonthTarget) * 100);
    return (
        <div className="pt-24 pb-32 px-4 max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="text-center mb-16"><h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 text-[#1D1D1F]">{t.donate.title}</h2><p className="text-xl text-[#86868B] max-w-2xl mx-auto">{t.donate.sub}</p></div>
            <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-8">
                    <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm">
                        <div className="flex items-center justify-between mb-10"><div><h3 className="text-3xl font-bold tracking-tight text-[#1D1D1F]">{t.donate.dashTitle}</h3><p className="text-[#86868B] mt-1">{t.donate.dashSub}</p></div><div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600"><TrendingUp className="w-7 h-7" /></div></div>
                        <div className="mb-12"><div className="flex justify-between items-end mb-4"><span className="text-sm font-bold uppercase tracking-widest text-[#86868B]">{t.donate.currentProgress}</span><span className="text-2xl font-bold text-[#1D1D1F]">{percentage}%</span></div><div className="h-4 bg-[#F5F5F7] rounded-full overflow-hidden border border-black/5"><div className="h-full bg-[#1D1D1F] rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}></div></div><p className="mt-4 text-lg text-[#1D1D1F] font-medium">RM {currentMonthCollected.toLocaleString()} <span className="text-[#86868B] font-normal">{t.donate.of} RM {currentMonthTarget.toLocaleString()} {t.donate.collected}</span></p></div>
                        <div className="space-y-4">{weeklyCollectionData.map((w, i) => (<div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-[#F5F5F7]/50"><div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-[#86868B]" /><span className="font-bold text-[#1D1D1F]">{w.week}</span></div><div className="text-right"><p className="font-bold text-[#1D1D1F]">RM {w.amount.toLocaleString()}</p><span className="text-xs font-bold text-green-600">{w.trend}</span></div></div>))}</div>
                    </div>
                </div>
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-[#1D1D1F] p-10 rounded-[3rem] text-white shadow-2xl text-center"><div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center mx-auto mb-6"><QrCode className="w-8 h-8 text-[#9E804E]" /></div><h3 className="text-3xl font-bold tracking-tight mb-2">{t.donate.qrTitle}</h3><p className="text-white/60 mb-8">{t.donate.qrSub}</p><div className="bg-white p-6 rounded-[2rem] max-w-[240px] mx-auto mb-8 shadow-inner relative group"><img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=StDominicOffering" className="w-full opacity-90 group-hover:scale-105 transition-transform duration-500" alt="Offering QR" /><div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="bg-white p-2 rounded-full shadow-md"><Heart className="w-5 h-5 text-[#9E804E]" /></div></div></div><div className="flex flex-wrap justify-center gap-2"><span className="bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">SarawakPay</span><span className="bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">DuitNow</span></div></div>
                    <div className="bg-white p-10 rounded-[3rem] border border-black/5 shadow-sm"><div className="flex items-center gap-4 mb-8"><div className="w-12 h-12 rounded-2xl bg-[#9E804E]/10 flex items-center justify-center text-[#9E804E]"><Landmark className="w-6 h-6" /></div><h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">{t.donate.bankTitle}</h3></div><div className="space-y-6"><div><p className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-1">{t.donate.bankName}</p><p className="text-xl font-bold text-[#1D1D1F]">{t.donate.bankHolder}</p></div><div><p className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-1">{t.donate.bankLabel}</p><p className="text-2xl font-bold text-[#1D1D1F] tracking-tighter">{t.donate.bankAcc}</p></div></div></div>
                </div>
            </div>
        </div>
    );
}
