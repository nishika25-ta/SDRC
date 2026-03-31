import React from 'react';
import { MapPin, Phone, Facebook, ExternalLink } from 'lucide-react';

export function ScreenLocation({ t }) {
  return (
    <div className="pt-24 pb-32 px-4 max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="text-center mb-16"><h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">{t.connect.title}</h2><p className="text-xl text-[#86868B]">{t.connect.sub}</p></div>
      <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm"><h3 className="font-bold text-3xl mb-8">{t.connect.office}</h3><div className="space-y-6"><div className="flex gap-4"><MapPin className="text-[#9E804E]" /><div><h4 className="font-bold">{t.connect.address}</h4><p className="text-[#86868B]">Taman Tunku, Miri, Sarawak</p></div></div><div className="flex gap-4"><Phone className="text-[#9E804E]" /><div><h4 className="font-bold">{t.connect.phone}</h4><p className="text-[#86868B]">+60 85-123 456</p></div></div></div></div>
              <div className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden flex flex-col"><div className="p-6 border-b border-black/5 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><Facebook className="w-5 h-5 fill-current" /></div><h3 className="font-bold text-lg leading-none">{t.connect.facebookTitle}</h3></div><a href="https://www.facebook.com/SDRCTamanTunku" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full text-xs font-bold hover:bg-[#E5E5E7] transition-colors">{t.connect.facebookBtn} <ExternalLink className="w-3 h-3" /></a></div><div className="w-full bg-[#F5F5F7] h-96 shadow-inner overflow-hidden"><iframe title="fb" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSDRCTamanTunku&tabs=timeline&width=500&height=470&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId" className="-mt-[70px]" width="100%" height="470" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowFullScreen={true}></iframe></div></div>
          </div>
          <div className="lg:col-span-7 h-[600px] rounded-[3rem] overflow-hidden shadow-sm"><iframe title="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19561.57812544885!2d113.98933145!3d4.292611249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x321f37cf689ac539%3A0x3c0a18be5f856ae2!2sSt.%20Dominic%20and%20the%20Rosary%20Catholic%20Church!5e1!3m2!1sen!2smy!4v1774898787535!5m2!1sen!2smy" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </div>
  );
}
