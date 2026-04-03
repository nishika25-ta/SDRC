import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { callGeminiChat, languageMap } from '../utils';
import { buildEdenAiSystemInstruction } from '../utils/edenAiContext';

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
    const historyForApi = [...messages, { role: 'user', text: userMsg }];
    setIsLoading(true);

    try {
      const system = buildEdenAiSystemInstruction(languageMap[lang] || 'English');
      const res = await callGeminiChat(historyForApi, system);
      let reply = typeof res.reply === 'string' ? res.reply.trim() : '';
      if (!reply) {
        if (lang === 'ib') {
          reply =
            'Ampunka aku, aku enda ulih nyaut nya diatu. Nuan ulih nanya pasal Misa, lokasi, tauka hubungi opis paroki ba 085-613960.';
        } else if (lang === 'bm') {
          reply =
            'Maaf, saya tidak dapat menjawab buat masa ini. Sila hubungi pejabat paroki di 085-613960 atau cuba lagi.';
        } else {
          reply =
            "I'm sorry, I couldn't form a reply just now. Try again, or call the parish office at 085-613960.";
        }
      }
      setMessages([...historyForApi, { role: 'assistant', text: reply }]);
    } catch (error) {
      console.error(error);
      const errText =
        lang === 'ib'
          ? 'Minta ampun, bisi penusah nyambung. Jaku baru.'
          : lang === 'bm'
            ? 'Maaf, terdapat masalah sambungan. Sila cuba lagi.'
            : 'I apologize, but I am having trouble connecting right now.';
      setMessages([...historyForApi, { role: 'assistant', text: errText }]);
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
