import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { callGemini } from '../utils';

export function Chatbot({ t, lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Shalom! Peace be with you. I am your virtual companion. How may I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Simulate natural typing delay (between 0.8s and 1.8s)
      await new Promise(r => setTimeout(r, 800 + Math.random() * 1000));

      const normalized = userMsg.toLowerCase().replace(/[^\w\s]/gi, '');
      let intent = 'unknown';

      // Advanced Regex Intent Matching with Typo Tolerance
      if (normalized.match(/^(hi|hello|hey|hai|helo|hlo|shalom|peace|salam|morning|afternoon|evening)/)) intent = 'greeting';
      else if (normalized.match(/^(ok|okay|alright|sure|yes|ya|aok|baiklah|baek|yep|yup|k|kk)/)) intent = 'ok';
      else if (normalized.match(/(who are you|your name|apa nama|sapa nuan|what can you do|help me|bantu|tolong|siapa awak)/)) intent = 'identity';
      else if (normalized.match(/(mass|misa|mas|msa|time|tim|masa|jadual|jadul|jam|kemaya|schedule|when|pukul)/)) intent = 'mass';
      else if (normalized.match(/(easter|triduum|paskah|khamis putih|jumaat agung|holy thursday|good friday)/)) intent = 'triduum';
      else if (normalized.match(/(holy hour|wednesday|rabu)/)) intent = 'holy_hour';
      else if (normalized.match(/(food|pantry|ssv|ssvp|makanan|vincent|sumbang|derma makan)/)) intent = 'food_drive';
      else if (normalized.match(/(youth|belia|young|remaja|raban|nembiak)/)) intent = 'youth';
      else if (normalized.match(/(sunday school|catechism|katekis|kelas|murid|sekula hari minggu|sekolah pagi)/)) intent = 'sunday_school';
      else if (normalized.match(/(history|sejarah|past|dibangunkan|cerita lama|asal usul)/)) intent = 'history';
      else if (normalized.match(/(where|location|loc|address|find|mana|dini|alamat|lokasi|arah|tempat)/)) intent = 'location';
      else if (normalized.match(/(priest|father|fr|rector|paderi|andy|francis|team|ketua|kaban)/)) intent = 'team';
      else if (normalized.match(/(marry|marriage|wedding|kahwin|nikah|kawin|baptis|baptism|confess|pengakuan)/)) intent = 'sacraments';
      else if (normalized.match(/(donate|donation|give|offer|bank|sarawakpay|duitnow|pay|derma|pemeri|sukung)/)) intent = 'donate';
      else if (normalized.match(/(contact|phone|call|email|office|pejabat|opis|hubungi|talipun)/)) intent = 'contact';
      else if (normalized.match(/(thank|thanks|tq|terima kasih|trimas)/)) intent = 'thanks';
      else if (normalized.match(/(bad|sad|anxious|tired|lelak|sedih|bimbang|susah)/)) intent = 'comfort';

      let reply = "";

      // Language: Bahasa Iban
      if (lang === 'ib') {
        switch (intent) {
          case 'greeting': reply = "Shalom! Selamat datai ulih mantu nuan seharitu?"; break;
          case 'ok': reply = "Aok, bisi utai bukai deka ditanya nuan?"; break;
          case 'identity': reply = "Nama aku EdenAI. Aku tu kaban virtual ke ngarika Gereja St Dominic & The Rosary."; break;
          case 'mass': reply = "Misa ujung minggu kitai bisi ba Hari Saptu jam 6:00 Lemai (Eng) enggau 8:00 Malam (Mandarin). Kena Hari Minggu bisi jam 7:00 Pagi (Eng), 9:00 Pagi (BM), enggau 11:00 Pagi (Iban)."; break;
          case 'triduum': reply = "Jadual Triduum Paskah: Khamis Putih bisi Misa Iban jam 6 ptg (Ave Maria) & 7 mlm (SDRC). Jumaat Agung bisi Jalan Salib Iban jam 11:30 tgi ba SDRC."; break;
          case 'holy_hour': reply = "Notis: Misa Malam Hari Rabu enggau Holy Hour pada 1 April 2026 tu udah DIBATALKAN. Harap maklum."; break;
          case 'food_drive': reply = "Persatuan SSV deka ngaga kutipan makanan kena 29 Mac jam 7 pagi - 12.15 tgh, ulih bai lalu nganjung ke SDRC kitai ditu."; break;
          case 'youth': reply = "Raban nembiak (Youth) paroki kitai suah betugung ujung minggu nyereta aktiviti rohani ti rami."; break;
          case 'sunday_school': reply = "Sekula Hari Minggu dibuka ungkup nembiak mit kitai. Apai indai dilalau ngerijista bala anak memanah."; break;
          case 'history': reply = "Gereja St Dominic udah lama didiri di Taman Tunku, majak nyadi palan sembiang besai ungkup raban Katolik menuatu."; break;
          case 'location': reply = "Gereja kitai bepalan ba Taman Tunku, Miri, Sarawak. Datai mih sembiang sama enggau kami!"; break;
          case 'team': reply = "Rektor gereja kitai nya Rev. Fr. Andy Lee, sereta dibantu Rev. Fr. Francis Kuleh Usat."; break;
          case 'sacraments': reply = "Ungkup pengawa kudus baka Baptis enggau Nikah, nuan dilalau betalipun lalu datai ngagai Opis Paroki ungkup foom enggau taklimat."; break;
          case 'donate': reply = "Pemeri nuan ulih ngena SarawakPay, DuitNow, tauka bank transfer ngagai Public Bank (123-456789-0). Nuan ulih meda ba tab Pemeri."; break;
          case 'contact': reply = "Opis paroki kitai ulih ditalipun ba +60 85-123 456."; break;
          case 'thanks': reply = "Sama-sama! Bisi utai bukai deka ditanya nuan?"; break;
          case 'comfort': reply = "Tuhan nemu penusah nuan. Tesa pesan ba tab Pengelantang kena ngiga sampi pandak ungkup nuan."; break;
          default: reply = "Ampunka aku, aku enda tentu nemu utai ti ditanya nuan nya. Nuan ulih nanya pasal Misa, Jadual Paskah, Opis, tauka macham bukai ngagai aku.";
        }
      }
      // Language: Bahasa Malaysia
      else if (lang === 'bm') {
        switch (intent) {
          case 'greeting': reply = "Shalom! Selamat datang. Ada apa-apa yang boleh saya bantu hari ini?"; break;
          case 'ok': reply = "Baiklah, ada apa-apa soalan lain yang boleh saya bantu?"; break;
          case 'identity': reply = "Saya EdenAI, pembantu maya rasmi untuk Gereja St Dominic & The Rosary. Saya sedia membantu!"; break;
          case 'mass': reply = "Misa hujung minggu kami adalah pada Sabtu jam 6 ptg (Ing) & 8 mlm (Man). Ahad pula jam 7 pg (Ing), 9 pg (BM), dan 11 pg (Iban)."; break;
          case 'triduum': reply = "Jadual Triduum Paskah: Khamis Putih ada Misa BM jam 9.00 mlm di SDRC. Jumaat Agung ada Jalan Salib BM di luar pintu masuk jam 8.00 pagi dan Servis BM jam 2.30 ptg."; break;
          case 'holy_hour': reply = "Notis Penting: Misa Malam Hari Rabu dan Holy Hour pada 1 April 2026 telah DIBATALKAN. Tolong sebarkan kepada rakan-rakan."; break;
          case 'food_drive': reply = "SSV Miri mengadakan kutipan makanan pada 29 Mac untuk keluarga kurang mampu. Penyerahan boleh dilakukan di gereja ini jam 7 pg - 12.15 tghari."; break;
          case 'youth': reply = "Kumpulan Belia kami sangat aktif berkumpul. Kami mengalu-alukan kedatangan belia untuk menyertai persatuan ini!"; break;
          case 'sunday_school': reply = "Sekolah Pagi Katekis dijalankan pada hari Ahad. Sila hubungi Ketekis Puan Magdalene atau Puan Jannet untuk pendaftaran."; break;
          case 'history': reply = "Gereja Paroki St Dominic ditubuhkan untuk memenuhi keperluan komuniti Katolik yang kian berkembang di sekitar kawasan Taman Tunku."; break;
          case 'location': reply = "Gereja kami terletak di Lot 7960, Jalan Lambir 1, Taman Tunku, 98000 Miri, Sarawak."; break;
          case 'team': reply = "Rektor kami ialah Rev. Fr. Andy Lee, dibantu oleh Rev. Fr. Francis Kuleh Usat."; break;
          case 'sacraments': reply = "Untuk urusan sakramen seperti Pembaptisan dan Perkahwinan, sila hubungi Pejabat Paroki untuk jadual taklimat kursus."; break;
          case 'donate': reply = "Anda boleh menggunakan SarawakPay, DuitNow, atau memindahkan derma ke Public Bank. Lawati tab Derma untuk maklumat penuh."; break;
          case 'contact': reply = "Pejabat paroki atau pejabat pengakuan dosa kami boleh dihubungi di talian 085-613960."; break;
          case 'thanks': reply = "Sama-sama! Tuhan memberkati. Ada soalan lain untuk saya?"; break;
          case 'comfort': reply = "Adalah normal berasa terbeban. Sila lawat bahagian Masa Ketenangan di aplikasi ini untuk menerima doa khas dari Alkitab."; break;
          default: reply = "Maafkan saya, soalan anda sedikit kurang jelas. Boleh tanyakan tentang Misa, notis Gereja, Triduum Paskah, lokasi, atau paderi kami?";
        }
      }
      // Language: English
      else {
        switch (intent) {
          case 'greeting': reply = "Shalom! Peace be with you. How may I assist you today?"; break;
          case 'ok': reply = "Okay! Feel free to ask if you need anything else."; break;
          case 'identity': reply = "I am EdenAI, your virtual companion for St Dominic & The Rosary Church. I can help answer questions about the parish!"; break;
          case 'mass': reply = "Our weekend Masses are Saturday 6:00 PM (Eng) & 8:00 PM (Man), and Sunday 7:00 AM (Eng), 9:00 AM (BM), & 11:00 AM (Iban)."; break;
          case 'triduum': reply = "Easter Triduum Schedule: Holy Thursday English Mass is at 9:00 PM. Good Friday Service in English is at 5:00 PM."; break;
          case 'holy_hour': reply = "Important Bulletin: The Wednesday Night Mass and Holy Hour scheduled for April 1, 2026, has been CANCELLED."; break;
          case 'food_drive': reply = "The SSV Food Pantry drive is on Sunday, Mar 29, 2026, from 7 AM to 12.15 PM. You can drop off items right here at SDRC!"; break;
          case 'youth': reply = "Our Parish Youth ministry is extremely welcoming and active! If you're young and looking to strengthen your faith, contact the office."; break;
          case 'sunday_school': reply = "Sunday School catechism classes are essential for children's faith formulation. Registrations open early in the year."; break;
          case 'history': reply = "St Dominic & The Rosary Parish was built to serve the rapidly expanding Catholic community in the beautiful Taman Tunku area of Miri."; break;
          case 'location': reply = "Our beloved church is beautifully located at Lot 7960, Jalan Lambir 1, Taman Tunku, Miri, Sarawak. We would love to see you there!"; break;
          case 'team': reply = "Our Parish Rector is Rev. Fr. Andy Lee, softly assisted by Rev. Fr. Francis Kuleh Usat."; break;
          case 'sacraments': reply = "For Holy Sacraments such as Baptism or Matrimony, please drop by or call the Parish Office to register for the necessary briefings."; break;
          case 'donate': reply = "We accept digital offerings via SarawakPay, DuitNow, or direct Public Bank transfers (123-456789-0). Full details are on the Donate tab!"; break;
          case 'contact': reply = "You can reach our friendly Parish Office via phone at 085-613960."; break;
          case 'thanks': reply = "You are most welcome! God bless you. Anything else I can help with?"; break;
          case 'comfort': reply = "In moments of worry, remember God is near. I encourage you to use the 'Moment of Peace' tab here in the app to receive personalized comfort and scripture."; break;
          default: reply = "I'm sorry, I'm still learning and don't quite understand. You can easily ask me about Mass schedules, Church Notices, Easter Triduum, sacrament registrations, or how to donate!";
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "I apologize, but I am having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* AI Bubble & Indication */}
      <div className={`fixed bottom-[110px] right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-end gap-3 transition-all duration-700 origin-bottom-right ${isOpen ? 'scale-[0.8] opacity-0 pointer-events-none translate-y-8' : 'scale-100 opacity-100 translate-y-0'}`}>
        
        {/* Minimalist Tooltip Indicator */}
        <div 
          onClick={() => setIsOpen(true)}
          className="hidden md:flex items-center justify-center bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full shadow-sm border border-white cursor-pointer hover:bg-white transition-all text-xs font-bold text-[#1D1D1F] tracking-tight group-hover:-translate-x-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
          EdenAI
        </div>

        {/* Floating Action Button (The Bubble) */}
        <div className="relative group">
            {/* Soft Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-indigo-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition duration-700"></div>
            
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white backdrop-blur-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-500 shrink-0"
            >
              <div className="relative w-[90%] h-[90%] rounded-full overflow-hidden">
                  <img src="eden.png" alt="EdenAI" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] pointer-events-none"></div>
              </div>
            </button>
        </div>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-[110px] right-4 left-4 md:left-auto md:bottom-8 md:right-8 z-[100] md:w-[400px] h-[550px] max-h-[75vh] md:max-h-[85vh] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/5 flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>

        {/* Header */}
        <div className="bg-[linear-gradient(to_bottom_right,#1D1D1F,#333336)] text-white p-5 rounded-t-3xl flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-[1.2rem] flex items-center justify-center shadow-inner overflow-hidden p-[2px]">
              <img src="/eden.png" className="w-full h-full object-cover rounded-[1rem]" alt="EdenAI" />
            </div>
            <div>
              <h3 className="font-bold text-[15px]">EdenAI</h3>
              <p className="text-xs text-white/70 tracking-wide">Advance Assistant</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-5 pb-8 space-y-5 bg-[#F5F5F7]/80 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#1D1D1F] text-white rounded-br-sm' : 'bg-white border border-black/5 text-[#333336] rounded-bl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-black/5 shadow-sm p-4 rounded-2xl rounded-bl-sm flex gap-2 w-16 justify-center items-center">
                <div className="w-1.5 h-1.5 bg-black/20 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-black/20 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-black/20 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input */}
        <div className="p-4 bg-white rounded-b-3xl border-t border-black/5 z-10 relative">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-[#F5F5F7] text-[#1D1D1F] outline-none border border-transparent focus:border-black/5 px-5 py-4 rounded-full pr-14 placeholder:text-[#86868B] transition-colors"
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 w-10 h-10 bg-[#1D1D1F] text-white rounded-full flex items-center justify-center hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-sm">
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
