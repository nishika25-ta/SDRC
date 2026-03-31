import React, { useState, useRef } from 'react';
import { MinistryMatcher } from '../components/MinistryMatcher';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export function ScreenOrganization({ t, lang }) {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', age: '', phone: '', ministry: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const handleJoinClick = (ministryKey) => {
    setFormData(prev => ({ ...prev, ministry: t.ministries[ministryKey].title }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate network delay
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({ name: '', age: '', phone: '', ministry: '', message: '' });
      }, 5000);
    }, 1200);
  };

  const teamMembers = [
    { name: "Rev. Fr. Andy Lee", role: "Rector", img: "andy.png" },
    { name: "Rev. Fr. Francis Kuleh Usat", role: "Assistant Rector", img: "francis.png" },
    { name: "Anthony Lawai Lutang", role: "PPC Chairman", img: "ant.png" }
  ];

  const ministries = ['choir', 'liturgy', 'warden'];

  return (
    <div className="pt-24 pb-32 px-4 max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
      
      {/* Leadership Section */}
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">{t.team.title}</h2>
        <p className="text-xl text-[#86868B]">{t.team.sub}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-32">
        {teamMembers.map((p, i) => (
          <div key={i} className="text-center group">
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden mb-6 relative bg-[#F5F5F7]">
              <img src={p.img} className="w-full h-full object-cover transition-all duration-500" alt={p.name} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{p.name}</h3>
            <p className="text-[#86868B] text-lg mt-1">{p.role}</p>
          </div>
        ))}
      </div>
      
      {/* Ministries Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">{t.team.serveTitle}</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-32">
        {ministries.map((k) => (
          <div key={k} className="bg-white border border-black/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group">
            <div className="h-64 relative overflow-hidden bg-[#F5F5F7]">
              <img 
                src={k === 'choir' ? "chior.jpg" : k === 'liturgy' ? "litu.jpg" : "warden.jpg"} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt={t.ministries[k].title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold tracking-tight">{t.ministries[k].title}</h3>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <p className="text-[#86868B] text-lg leading-relaxed mb-10 flex-1">{t.ministries[k].desc}</p>
              <button 
                onClick={() => handleJoinClick(k)}
                className="text-[#0066CC] font-bold text-lg hover:underline flex items-center gap-2 w-max"
              >
                {t.team.join} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <MinistryMatcher t={t} lang={lang} />

      {/* Join Request Form Section */}
      <div ref={formRef} className="mt-20 md:mt-32 max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-3 md:mb-4">
              {lang === 'ib' ? 'Mansang Dalam Pengarap.' : lang === 'bm' ? 'Melangkah Dalam Iman.' : 'Step Forward in Faith.'}
            </h2>
            <p className="text-lg md:text-xl text-[#86868B] max-w-lg mx-auto">
              {lang === 'ib' ? 'Tinggalka butiran nuan ba baruh lalu ketuai raban deka betalipun ngagai nuan.' 
               : lang === 'bm' ? 'Tinggalkan butiran anda di bawah dan ketua pelayan akan menghubungi anda.' 
               : 'Leave your details below and a ministry leader will reach out to welcome you.'}
            </p>
          </div>

          {formStatus === 'success' ? (
            <div className="py-16 text-center animate-[fadeIn_0.5s_ease-out]">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-[#1D1D1F] mb-4">
                {lang === 'ib' ? 'Peminta Mujur Diberi' : lang === 'bm' ? 'Permohonan Berjaya Dihantar' : 'Request Sent Successfully'}
              </h3>
              <p className="text-lg text-[#86868B] max-w-md mx-auto">
                {lang === 'ib' ? 'Terima kasih laban deka mansang! Kami udah nerima peminta nuan sereta deka betalipon enda lama agi.' 
                 : lang === 'bm' ? 'Terima kasih kerana melangkah ke hadapan! Kami telah menerima permohonan anda dan akan hubungi sedikit masa lagi.' 
                 : 'Thank you for stepping forward! We\'ve received your application and will be in touch shortly.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#86868B] uppercase tracking-wider ml-1">
                    {lang === 'ib' ? 'Nama Penuh' : lang === 'bm' ? 'Nama Penuh' : 'Full Name'}
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0066CC] focus:bg-white focus:ring-4 focus:ring-[#0066CC]/10 rounded-2xl p-4 text-lg outline-none transition-all placeholder:text-black/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#86868B] uppercase tracking-wider ml-1">
                      {lang === 'ib' ? 'Umur' : lang === 'bm' ? 'Umur' : 'Age'}
                    </label>
                    <input 
                      required 
                      type="number" 
                      min="1"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      placeholder="e.g. 25" 
                      className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0066CC] focus:bg-white focus:ring-4 focus:ring-[#0066CC]/10 rounded-2xl p-4 text-lg outline-none transition-all placeholder:text-black/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#86868B] uppercase tracking-wider ml-1">
                      {lang === 'ib' ? 'Lumbur Talipon' : lang === 'bm' ? 'Nombor Telefon' : 'Phone'}
                    </label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="012-345 6789" 
                      className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0066CC] focus:bg-white focus:ring-4 focus:ring-[#0066CC]/10 rounded-2xl p-4 text-lg outline-none transition-all placeholder:text-black/20"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#86868B] uppercase tracking-wider ml-1">
                  {lang === 'ib' ? 'Raban Ti Disereta' : lang === 'bm' ? 'Pelayanan Pilihan' : 'Ministry of Interest'}
                </label>
                <div className="relative">
                  <select 
                    required 
                    value={formData.ministry}
                    onChange={(e) => setFormData({...formData, ministry: e.target.value})}
                    className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0066CC] focus:bg-white focus:ring-4 focus:ring-[#0066CC]/10 rounded-2xl p-4 text-lg outline-none transition-all appearance-none text-[#1D1D1F]"
                  >
                    <option value="" disabled>{lang === 'ib' ? 'Pilih Raban' : lang === 'bm' ? 'Pilih Kumpulan' : 'Select a Ministry Group'}</option>
                    <option value={t.ministries.choir.title}>{t.ministries.choir.title}</option>
                    <option value={t.ministries.liturgy.title}>{t.ministries.liturgy.title}</option>
                    <option value={t.ministries.warden.title}>{t.ministries.warden.title}</option>
                    <option value="Sunday School / Catechism">Sunday School / Catechism</option>
                    <option value="Youth Group (Belia)">Youth Group (Belia)</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronRight className="w-5 h-5 text-[#86868B] rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#86868B] uppercase tracking-wider ml-1">
                  {lang === 'ib' ? 'Pengerindu, Tuju, tauka Tanya' : lang === 'bm' ? 'Kemahiran, Niat, atau Soalan' : 'Skills, Intentions, or Questions'}
                </label>
                <textarea 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4} 
                  placeholder={lang === 'ib' ? "Tusui kemula pasal diri nuan sereta kebuah deka sama nyereta raban tu..." 
                   : lang === 'bm' ? "Ceritakan sedikit tentang diri anda dan sebab utama anda ingin menyertai..." 
                   : "Tell us a little bit about yourself and why you'd like to join..."} 
                  className="w-full bg-[#F5F5F7] border border-transparent focus:border-[#0066CC] focus:bg-white focus:ring-4 focus:ring-[#0066CC]/10 rounded-2xl p-4 text-lg outline-none transition-all resize-none placeholder:text-black/20"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="w-full py-5 bg-[#0066CC] hover:bg-[#0055AA] text-white rounded-2xl font-bold text-lg tracking-wide transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {formStatus === 'submitting' ? (
                  <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    {lang === 'ib' ? 'Beri Peminta' : lang === 'bm' ? 'Hantar Permohonan' : 'Submit Application'} 
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
