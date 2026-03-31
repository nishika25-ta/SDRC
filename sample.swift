import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Clock, Video, Users, Heart, MapPin, Music, BookOpen, 
  Shield, Bell, Play, CalendarDays, Sun, ArrowDown, Phone, 
  Mail, Facebook, Sparkles, Loader2, Globe, Calendar, 
  ChevronDown, QrCode, TrendingUp, Target, Landmark, 
  ExternalLink, Lightbulb, CheckCircle2, Info, ChevronRight
} from 'lucide-react';

// --- UTILS & CONSTANTS ---

const languageMap = {
  en: "English",
  bm: "Bahasa Malaysia",
  ib: "Bahasa Iban"
};

const weeklyCollectionData = [
  { week: "Mar 22", amount: 4250.50, trend: "+12%" },
  { week: "Mar 15", amount: 3800.00, trend: "-2%" }
];

const calendarEventsData = [
  { 
    id: 1, 
    day: "29", 
    month: "MAR", 
    season: { en: "Season of Lent", bm: "Musim Pra-Paskah", ib: "Musim Lent" },
    title: { en: "Palm Sunday", bm: "Ahad Palma", ib: "Ahad Palma" }, 
    color: "bg-red-600", 
    desc: { en: "Commemoration of the Lord's Entrance into Jerusalem.", bm: "Memperingati Kemasukan Tuhan ke Yerusalem.", ib: "Memperingati Tuhan Tama Jerusalem." },
    significance: { en: "The beginning of Holy Week.", bm: "Permulaan Minggu Kudus.", ib: "Pun Minggu Kudus." }
  },
  { 
    id: 2, 
    day: "02", 
    month: "APR", 
    season: { en: "The Paschal Triduum", bm: "Triduum Paskah", ib: "Tiga Hari Kudus" },
    title: { en: "Holy Thursday", bm: "Khamis Putih", ib: "Hari Empat Kudus" }, 
    color: "bg-white", 
    textColor: "text-[#1D1D1F]",
    border: true, 
    desc: { en: "The Last Supper and Washing of the Feet.", bm: "Makan Malam Terakhir dan Pembasuhan Kaki.", ib: "Makan Malam Terakhir enggau Basu Kaki." },
    significance: { en: "Institution of the Eucharist.", bm: "Penetapan Sakramen Ekaristi.", ib: "Tuhan nengkebang Ekaristi." }
  },
  { 
    id: 3, 
    day: "03", 
    month: "APR", 
    season: { en: "The Paschal Triduum", bm: "Triduum Paskah", ib: "Tiga Hari Kudus" },
    title: { en: "Good Friday", bm: "Jumaat Agung", ib: "Hari Lima Kudus" }, 
    color: "bg-red-700", 
    desc: { en: "Passion of the Lord. Day of fasting.", bm: "Kesengsaraan Tuhan. Hari berpuasa.", ib: "Pemerinsa Tuhan Yesus Kristus." },
    significance: { en: "The Sacrifice of the Cross.", bm: "Pengorbanan di Kayu Salib.", ib: "Pemerinsa ba Kayu Regang." }
  },
  { 
    id: 4, 
    day: "04", 
    month: "APR", 
    season: { en: "The Paschal Triduum", bm: "Triduum Paskah", ib: "Malam Paskah" },
    title: { en: "Easter Vigil", bm: "Malam Paskah", ib: "Malam Paskah" }, 
    color: "bg-white", 
    textColor: "text-[#1D1D1F]",
    border: true, 
    desc: { en: "Service of Light and Resurrection.", bm: "Ibadat Cahaya dan Kebangkitan.", ib: "Sembiang Penampak enggau Pengangkat Baru." },
    significance: { en: "The greatest night of the year.", bm: "Malam yang paling agung.", ib: "Malam ti pemadu besai." }
  },
  { 
    id: 5, 
    day: "05", 
    month: "APR", 
    season: { en: "Easter Season", bm: "Musim Paskah", ib: "Musim Paskah" },
    title: { en: "Easter Sunday", bm: "Hari Raya Paskah", ib: "Gawai Paskah" }, 
    color: "bg-white", 
    textColor: "text-[#1D1D1F]",
    border: true, 
    desc: { en: "He is Risen! Hallelujah!", bm: "Dia telah bangkit! Haleluya!", ib: "Tuhan udah angkat baru! Haleluya!" },
    significance: { en: "Victory over death.", bm: "Kemenangan atas maut.", ib: "Menang ngelaban pemati." }
  },
];

const translations = {
  en: {
    nav: { home: "Home", calendar: "Calendar", peace: "Peace", mass: "Mass", team: "Team", location: "Location", donate: "Donate" },
    hero: { welcome: "Welcome to", churchName: "St Dominic & The Rosary Church.", subtitle: "A community of faith in the heart of Miri.", btn: "View Mass Times" },
    announcement: { title: "Parish Gotong-Royong", text: "Join us this Saturday at 8:00 AM. All parishioners are welcome.", btn: "Learn more" },
    updates: { title: "Weekly Updates.", sub: "Latest news and reflections.", news: "Parish News", read: "Read article", moreNews: "View All News" },
    calendar: { title: "Liturgical Calendar.", sub: "Sacred feasts and seasons of the Church.", labelSeason: "Current Season", labelSignificance: "Spiritual Meaning" },
    liturgy: { title: "Daily Liturgy", color: "Color", readings: "Readings", loading: "Retrieving Word...", error: "Unavailable." },
    saint: { title: "Saint of the Day", loading: "Finding today's Saint...", bio: "Biography", lesson: "Lesson for us" },
    matcher: { title: "Ministry Matcher", sub: "Not sure where to serve? Tell us your talents and we'll suggest a group.", placeholder: "E.g., I like to sing and can play the guitar...", btn: "Get Suggestion", suggestion: "Your Suggested Ministry" },
    companion: { title: "A Moment of Peace.", sub: "Share what's on your heart, and receive personalized scripture and prayer.", placeholder: "E.g., I'm feeling anxious today...", btn: "Find Peace", btnLoading: "Reflecting...", prayerLabel: "Your Prayer", error: "Connection error. Please try again." },
    chronicle: { 
      kicker: "The Parish Chronicle", title: "A Legacy of Faith in Miri.", sub: "From a shop lot to a beacon of community.",
      p1: "In the early 2000s, our community began in a humble shop lot in Pasar Taman Tunku. A small group of faithful gathered, united by a spiritual hunger.",
      p2: "As Miri boomed, the shop lot became too small. We transitioned to the public dewan, transforming a civic space into a sanctuary every weekend.",
      p3: "Through fundraising and prayer, the dream materialized. We built our own sanctuary that now serves northern Sarawak.",
      p4: "Today, as you walk through our doors, you are not just entering a building; you are stepping into a living, breathing history of resilience.",
      quote: "A church is made of the living stones of its people.",
      factsTitle: "Parish Facts",
      facts: [
        { label: "Founded", value: "Early 2000s", desc: "Started in a shop lot." },
        { label: "Congregation", value: "3,000+", desc: "Diverse backgrounds." },
        { label: "Languages", value: "Four", desc: "English, BM, Mandarin, Iban." },
        { label: "Patron", value: "St. Dominic", desc: "Patron of astronomers." }
      ]
    },
    massTimes: { 
      title: "Mass Timetable.", 
      sub: "Worship with us in your preferred language.", 
      weekend: "Weekend Schedule", 
      weekday: "Weekday Service", 
      nextMass: "Coming Up Next", 
      typeSunset: "Sunset Mass", 
      typeMorning: "Morning Mass", 
      typeDaily: "Daily Mass", 
      typeNovena: "Novena & Mass",
      daySat: "Saturday",
      daySun: "Sunday",
      dayWeekday: "Mon - Fri",
      dayWed: "Wednesday"
    },
    team: { title: "Parish Team.", sub: "Dedicated leadership.", serveTitle: "Serve with Us.", join: "Join Ministry" },
    ministries: {
      choir: { title: "Parish Choir", desc: "Lead the congregation in praise through song. We welcome all singers and musicians." },
      liturgy: { title: "Liturgical Ministry", desc: "Serve at the center of spiritual life as Lectors, Altar Servers, and Ministers." },
      warden: { title: "Wardens", desc: "The welcoming face of our parish, ensuring a peaceful environment for worship." }
    },
    connect: { title: "Connect.", sub: "Visit us or reach out.", office: "Parish Office", address: "Address", phone: "Phone", email: "Email", facebookTitle: "Community", facebookSub: "Latest from Facebook.", facebookBtn: "Follow Us" },
    donate: { 
      title: "Mission & Stewardship.", 
      sub: "Support the ongoing mission of St Dominic & The Rosary Church.", 
      qrTitle: "Digital Offering", 
      qrSub: "Scan using SarawakPay, DuitNow, or your preferred banking app.", 
      bankTitle: "Parish Bank Account", 
      bankName: "Public Bank Berhad", 
      bankAcc: "123-456789-0", 
      bankLabel: "Account Number",
      bankHolder: "St Dominic & The Rosary Church",
      dashTitle: "Fruit of Our Mission", 
      dashSub: "Transparency in our weekly offerings and maintenance goals.", 
      currentProgress: "Monthly Progress",
      collected: "Collected for Mission", 
      of: "of",
      target: "Monthly Target"
    },
    footer: "All Rights Reserved."
  },
  bm: {
    nav: { home: "Utama", calendar: "Kalendar", peace: "Ketenangan", mass: "Misa", team: "Pasukan", location: "Lokasi", donate: "Derma" },
    hero: { welcome: "Selamat Datang ke", churchName: "Gereja St Dominic & The Rosary.", subtitle: "Komuniti iman di bandar Miri.", btn: "Jadual Misa" },
    announcement: { title: "Gotong-Royong", text: "Sertai kami Sabtu ini pada jam 8:00 pagi.", btn: "Lanjut" },
    updates: { title: "Berita Mingguan.", sub: "Berita dan renungan terkini.", news: "Berita Paroki", read: "Baca", moreNews: "Lihat Semua Berita" },
    calendar: { title: "Kalendar Liturgi.", sub: "Pesta kudus dan musim Gereja.", labelSeason: "Musim Semasa", labelSignificance: "Makna Rohani" },
    liturgy: { title: "Liturgi Harian", color: "Warna", readings: "Bacaan", loading: "Mengambil Sabda...", error: "Tidak tersedia." },
    saint: { title: "Santu Hari Ini", loading: "Mencari Santu hari ini...", bio: "Biografi", lesson: "Pengajaran untuk kita" },
    matcher: { title: "Padanan Pelayanan", sub: "Tidak pasti mahu berkhidmat di mana? Beritahu bakat anda.", placeholder: "Cth: Saya suka menyanyi dan boleh bermain gitar...", btn: "Dapatkan Cadangan", suggestion: "Pelayanan Cadangan Anda" },
    companion: { title: "Masa Ketenangan.", sub: "Kongsi apa yang ada di hati anda, dan terima doa peribadi.", placeholder: "Cth: Saya merasa bimbang hari ini...", btn: "Cari Ketenangan", btnLoading: "Merenung...", prayerLabel: "Doa Anda", error: "Ralat sambungan. Sila cuba lagi." },
    chronicle: { 
      kicker: "Kronikel Paroki", title: "Warisan Iman di Miri.", sub: "Dari lot kedai ke mercu tanda komuniti.",
      p1: "Pada awal 2000-an, komuniti kami bermula di lot kedai di Pasar Taman Tunku. Kumpulan kecil umat berkumpul dalam iman.",
      p2: "Apabila Miri berkembang, lot kedai menjadi kecil. Kami berpindah ke dewan awam, menukar ruang sivik menjadi tempat ibadat.",
      p3: "Melalui usaha dan doa, impian menjadi kenyataan. Kami membina gereja sendiri untuk Sarawak utara.",
      p4: "Hari ini, anda melangkah ke dalam sejarah ketabahan yang hidup.",
      quote: "Gereja dibina daripada batu-batu hidup iaitu umatnya.",
      factsTitle: "Fakta Paroki",
      facts: [
        { label: "Ditubuhkan", value: "Awal 2000-an", desc: "Bermula di lot kedai." },
        { label: "Jemaah", value: "3,000+", desc: "Pelbagai latar belakang." },
        { label: "Bahasa", value: "Empat", desc: "Inggeris, BM, Mandarin, Iban." },
        { label: "Penaung", value: "St. Dominic", desc: "Santu penaung ahli astronomi." }
      ]
    },
    massTimes: { 
      title: "Jadual Misa.", 
      sub: "Sertai kami mengikut bahasa pilihan anda.", 
      weekend: "Jadual Hujung Minggu", 
      weekday: "Perkhidmatan Hari Biasa", 
      nextMass: "Seterusnya", 
      typeSunset: "Misa Senja", 
      typeMorning: "Misa Pagi", 
      typeDaily: "Misa Harian", 
      typeNovena: "Novena & Misa",
      daySat: "Sabtu",
      daySun: "Ahad",
      dayWeekday: "Isn - Jumaat",
      dayWed: "Rabu"
    },
    team: { title: "Pasukan Paroki.", sub: "Kepimpinan berdedikasi.", serveTitle: "Berkhidmat Bersama", join: "Sertai Pelayanan" },
    ministries: {
      choir: { title: "Koir Paroki", desc: "Memimpin umat dalam pujian melalui nyanyian dan muzik. Koir kami menyokong liturgi Ahad dan hari-hari perayaan besar. Kami mengalu-alukan penyanyi dan pemuzik dari pelbagai tahap kemahiran untuk berkongsi bakat mereka melalui muzik suci." },
      liturgy: { title: "Pelayanan Liturgi", desc: "Berkhidmat di pusat kehidupan rohani kami. Kumpulan ini termasuk Lektor yang mewartakan Sabda Tuhan, Pelayan Altar yang membantu imam semasa Ekaristi, dan Pelayan Luar Biasa Komuni Kudus. Peranan yang penuh hormat dan dedikasi kepada altar." },
      warden: { title: "Warden & Hospitaliti", desc: "Wajah keramahan St Dominic. Warden memastikan persekitaran yang tenang dan teratur untuk ibadat. Mereka menyambut umat, menguruskan tempat duduk, membantu dalam kutipan, dan menyokong keselamatan komuniti semasa semua perkhidmatan." }
    },
    connect: { title: "Hubungi.", sub: "Lawati atau hubungi kami.", office: "Pejabat Paroki", address: "Alamat", phone: "Telefon", email: "Emel", facebookTitle: "Komuniti", facebookSub: "Berita Facebook.", facebookBtn: "Ikuti Kami" },
    donate: { 
      title: "Misi & Kepimpinan.", 
      sub: "Sokong misi berterusan Gereja St Dominic & The Rosary.", 
      qrTitle: "Persembahan Digital", 
      qrSub: "Imbas menggunakan SarawakPay, DuitNow, atau aplikasi bank pilihan anda.", 
      bankTitle: "Akaun Bank Paroki", 
      bankName: "Public Bank Berhad", 
      bankAcc: "123-456789-0", 
      bankLabel: "Nombor Akaun",
      bankHolder: "Gereja St Dominic & The Rosary",
      dashTitle: "Hasil Misi Kami", 
      dashSub: "Ketelusan dalam kutipan mingguan dan matlamat penyelenggaraan.", 
      currentProgress: "Kemajuan Bulanan",
      collected: "Dikutip untuk Misi", 
      of: "daripada",
      target: "Sasaran Bulanan"
    },
    footer: "Hak Cipta Terpelihara."
  },
  ib: {
    nav: { home: "Laman", calendar: "Kalendar", peace: "Pengelantang", mass: "Misa", team: "Raban", location: "Alai", donate: "Pemeri" },
    hero: { welcome: "Selamat Datai ngagai", churchName: "Gereja St Dominic & The Rosary.", subtitle: "Komuniti pengarap ba Miri.", btn: "Jadual Misa" },
    announcement: { title: "Gotong-Royong", text: "Sama meh kitai datai kena hari Saptu tu.", btn: "Macha" },
    updates: { title: "Berita Minggu Tu.", sub: "Berita enggau penemu baru.", news: "Berita Paroki", read: "Macha", moreNews: "Peda Semua Berita" },
    calendar: { title: "Kalendar Liturgi.", sub: "Bala pengerami kudus.", labelSeason: "Musim diatu", labelSignificance: "Reti ba Ati" },
    liturgy: { title: "Liturgi Seharitu", color: "Chura", readings: "Bacha", loading: "Ngambil Sabda...", error: "Enda ulih dipeda." },
    saint: { title: "Santu Seharitu", loading: "Ngiga Santu seharitu...", bio: "Cherita Pengidup", lesson: "Sangka ke kitai" },
    matcher: { title: "Padanan Pelayanan", sub: "Enda tentu nemu dini deka gawa? Padahka pengelandik nuan.", placeholder: "Chunto: Aku rindu belagu lalu ulih nyagu gitar...", btn: "Giga Cadangan", suggestion: "Pelayanan ke Dikandalka" },
    companion: { title: "Maya Pengelantang.", sub: "Padahka utai ba ati nuan, lalu terima bacha enggau sampi.", placeholder: "Chunto: Aku berasai nangi seharitu...", btn: "Giga Pengelantang", btnLoading: "Merenung...", prayerLabel: "Sampi Nuan", error: "Salah sambung. Cuba baru." },
    chronicle: { 
      kicker: "Cherita Paroki", title: "Pesaka Pengarap ba Miri.", sub: "Ari kedai mit ngagai gereja besai.",
      p1: "Ba pun taun 2000-an, raban kitai berengkah ari kedai ba Pasar Taman Tunku. Kami begempung dalam pengarap.",
      p2: "Lebuh Miri majak mansang, kedai nya nyadi mit. Kami mindah ngagai dewan, nukar alai nya nyadi alai sembiang.",
      p3: "Berkat saup enggau sampi, juluk ati nyadi nyata. Kami nirika gereja kena neruska pengawa ba Sarawak.",
      p4: "Seharitu, nuan tama ngagai cherita pengarap kami ti bisi pengering.",
      quote: "Gereja digaga ari raban mensia ke bisi pengarap.",
      factsTitle: "Fakta Paroki",
      facts: [
        { label: "Ditubuhka", value: "Pun taun 2000", desc: "Berengkah ari kedai." },
        { label: "Raban", value: "3,000+", desc: "Mayuh macham bansa." },
        { label: "Jaku", value: "Empat", desc: "Inggeris, BM, Mandarin, Iban." },
        { label: "Penaung", value: "St. Dominic", desc: "Penaung raban astronomi." }
      ]
    },
    massTimes: { 
      title: "Jadual Misa.", 
      sub: "Sembiang sama enggau kami ngena jaku nuan.", 
      weekend: "Hujung Minggu", 
      weekday: "Hari Biasa", 
      typeSunset: "Misa Lemai", 
      typeMorning: "Misa Pagi", 
      typeDaily: "Misa Harian", 
      typeNovena: "Novena & Misa",
      daySat: "Hari Saptu",
      daySun: "Hari Minggu",
      dayWeekday: "Hari Satu - Lima",
      dayWed: "Hari Tiga"
    },
    team: { title: "Raban Paroki.", sub: "Bala ketuai.", serveTitle: "Gawa Sama", join: "Masuk Pelayanan" },
    ministries: {
      choir: { title: "Koir Paroki", desc: "Ngiring jemaah ngena lagu. Kami nyambut penyanyi enggau pemain muzik baru." },
      liturgy: { title: "Raban Liturgi", desc: "Gawa ba Altar nyadi Lektor, Pelayan Altar, enggau Raban Komuni." },
      warden: { title: "Warden", desc: "Nyambut penemuai sereta nentuka kandang gereja lantang maya sembiang." }
    },
    connect: { title: "Hubungi.", sub: "Datai tauka talipun kami.", office: "Opis", address: "Alamat", phone: "Talipun", email: "Emel", facebookTitle: "Komuniti", facebookSub: "Berita Facebook.", facebookBtn: "Peda Kami" },
    donate: { 
      title: "Misi & Pemeri.", 
      sub: "Sukung pengawa Gereja St Dominic & The Rosary ti meruan agi.", 
      qrTitle: "Pemeri Digital", 
      qrSub: "Imbas ngena SarawakPay, DuitNow, tauka aplikasi bank bukai.", 
      bankTitle: "Akaun Bank Paroki", 
      bankName: "Public Bank Berhad", 
      bankAcc: "123-456789-0", 
      bankLabel: "Lumut Akaun",
      bankHolder: "Gereja St Dominic & The Rosary",
      dashTitle: "Hasil Misi Kitai", 
      dashSub: "Peda pemeri kitai ninting minggu enggau juluk paroki.", 
      currentProgress: "Penyampau Pemeri",
      collected: "Udah Dikumpul", 
      of: "ari",
      target: "Juluk Sebulan"
    },
    footer: "Semua Hak Diempu."
  }
};

// --- API HELPER ---

async function callGemini(prompt, systemInstruction, retries = 3) {
  const apiKey = "";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: { 
      responseMimeType: "application/json",
      temperature: 0.5 
    }
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      let text = data.candidates[0].content.parts[0].text;
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(text);
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
}

// --- SUB-COMPONENTS ---

function BlurText({ text, delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  const words = text ? text.split(" ") : [];
  return (
    <div ref={textRef} className={`flex flex-wrap justify-center gap-[0.25em] ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? 'blur(0px)' : 'blur(12px)',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: `${delay + (index * 100)}ms`
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function SegmentedControl({ options, active, onChange }) {
  return (
    <div className="flex bg-[#E5E5EA] p-1.5 rounded-2xl mx-auto max-w-md w-full relative">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`flex-1 py-3 px-4 text-lg font-medium rounded-xl transition-all duration-300 z-10 ${
            active === option.id ? 'text-[#1D1D1F] shadow-sm' : 'text-[#86868B] hover:text-[#1D1D1F]'
          }`}
          style={{ backgroundColor: active === option.id ? '#FFFFFF' : 'transparent' }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function SaintOfTheDay({ t, lang }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSaint() {
      setLoading(true);
      const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
      const fullLang = languageMap[lang] || "English";
      const prompt = `Identify the Catholic Saint or Feast Day for ${today}. Provide response in ${fullLang}.`;
      const system = `Return JSON only: { "name": "Saint Name", "bio": "2-sentence biography in ${fullLang}", "lesson": "1-sentence takeaway in ${fullLang}" }`;
      try {
        const res = await callGemini(prompt, system);
        setData(res);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchSaint();
  }, [lang]);

  if (loading) return <div className="max-w-4xl mx-auto px-4 pb-16 animate-pulse"><div className="bg-white rounded-[2.5rem] p-8 border border-black/5 h-48"></div></div>;

  return (
    <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/5 shadow-sm relative overflow-hidden group transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9E804E]/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500"></div>
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#9E804E]/10 flex items-center justify-center text-[#9E804E]"><Lightbulb className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold tracking-tight">{t.saint.title}</h3>
            </div>
            <h4 className="text-3xl font-serif font-bold text-[#1D1D1F] mb-6">{data?.name}</h4>
            <div className="grid md:grid-cols-2 gap-8">
                <div><p className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-2">{t.saint.bio}</p><p className="text-[#333336] leading-relaxed">{data?.bio}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-2">{t.saint.lesson}</p><p className="text-[#333336] italic leading-relaxed">"{data?.lesson}"</p></div>
            </div>
        </div>
    </section>
  );
}

function DailyLiturgy({ t, lang }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodayLiturgy() {
      setLoading(true);
      const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const fullLang = languageMap[lang] || "English";
      const systemPrompt = `Liturgical assistant for ${today}. Lang: ${fullLang}. Return JSON: { "title": "Day Name", "color": "purple/white/red/green", "ref": "Bible Reference", "text": "Summary" }`;
      try {
        const res = await callGemini("liturgy", systemPrompt);
        setData(res);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchTodayLiturgy();
  }, [lang]);

  return (
    <section className="max-w-7xl mx-auto px-4 relative z-20 pb-32">
      <div className="bg-[#1D1D1F] rounded-[3rem] p-8 md:p-12 lg:p-16 text-white shadow-xl overflow-hidden relative flex flex-col lg:flex-row gap-12 transition-all">
          <div className="lg:w-1/3 relative z-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md"><BookOpen className="w-5 h-5 text-white/70" /></div>
                    <span className="text-sm font-bold tracking-widest uppercase text-white/70">{t.liturgy.title}</span>
                </div>
                {loading ? <div className="h-10 bg-white/10 rounded w-3/4 animate-pulse"></div> : <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-tight">{data?.title}</h2>}
              </div>
          </div>
          <div className="lg:w-2/3 relative z-10">
              {loading ? <div className="h-48 bg-white/5 rounded-[2.5rem] animate-pulse"></div> : (
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md">
                      <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
                          <h3 className="text-2xl font-bold text-white">{t.liturgy.readings}</h3>
                          <span className="text-[#9E804E] font-bold text-xl">{data?.ref}</span>
                      </div>
                      <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-serif italic">"{data?.text}"</p>
                  </div>
              )}
          </div>
      </div>
    </section>
  );
}

function MinistryMatcher({ t, lang }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState(null);

  async function findMatch() {
    if (!input.trim()) return;
    setLoading(true);
    const fullLang = languageMap[lang] || "English";
    const prompt = `Skills: "${input}". Suggest Choir, Liturgical, or Warden. Reason in ${fullLang}.`;
    const system = `Return JSON only: { "ministry": "Name", "reason": "1-sentence why in ${fullLang}" }`;
    try {
      const res = await callGemini(prompt, system);
      setMatch(res);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }

  return (
    <div className="bg-[#F5F5F7] rounded-[3rem] p-8 md:p-12 mt-16 border border-black/5">
        <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
                <h3 className="text-3xl font-bold tracking-tight mb-4">{t.matcher.title} ✨</h3>
                <p className="text-[#86868B] text-lg mb-8">{t.matcher.sub}</p>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.matcher.placeholder} className="w-full bg-white border border-black/10 rounded-2xl p-5 mb-4 h-32 focus:ring-2 focus:ring-[#9E804E] focus:outline-none transition-all" />
                <button onClick={findMatch} disabled={loading || !input.trim()} className="bg-[#1D1D1F] text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.matcher.btn}
                </button>
            </div>
            <div className="md:w-1/2 w-full flex items-center justify-center">
                {match ? (
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm w-full border border-black/5 animate-[fadeIn_0.5s_ease-out_forwards]">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9E804E] mb-2">{t.matcher.suggestion}</p>
                        <h4 className="text-3xl font-bold text-[#1D1D1F] mb-4">{match.ministry}</h4>
                        <p className="text-[#86868B] text-lg leading-relaxed italic">"{match.reason}"</p>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-black/5 rounded-[2.5rem] p-12 text-center w-full text-black/20 font-medium">Ready to match...</div>
                )}
            </div>
        </div>
    </div>
  );
}

// --- SCREENS ---

function ScreenHome({ setScreen, lang, t }) {
  const weeklyPosts = [
    { id: 1, category: lang === 'en' ? "Community" : "Komuniti", date: "Mar 28, 2026", title: t.updates.title, excerpt: t.announcement.text, image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="animate-[fadeIn_0.5s_ease-out_forwards]">
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-b-[3rem] shadow-sm mb-12 mx-4 mt-4">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url('hero_upscayl_4x_ultrasharp-4x.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
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

      <section className="max-w-4xl mx-auto px-4 relative z-20 pb-32">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-black/5 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">{t.updates.news}</h2>
            </div>
            <div className="space-y-6">
                {[1, 2].map(i => (
                    <div key={i} className="p-6 rounded-3xl bg-[#F5F5F7]/50 hover:bg-[#F5F5F7] transition-all cursor-pointer group border border-transparent hover:border-black/5">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#9E804E]">{i === 1 ? 'Sunday School' : 'Feast Day'}</span>
                            <span className="w-1 h-1 rounded-full bg-black/10"></span>
                            <span className="text-xs font-medium text-[#86868B]">Mar 2026</span>
                        </div>
                        <h4 className="font-bold text-2xl group-hover:text-[#0066CC] transition-colors">
                            {i === 1 ? 'Registration for 2027' : 'Feast Day Committee Meeting'}
                        </h4>
                        <p className="text-[#86868B] mt-2 leading-relaxed">
                            {i === 1 ? 'Parents are reminded to register their children before the end of the month.' : 'Join the committee as we prepare for our upcoming parish celebrations.'}
                        </p>
                    </div>
                ))}
            </div>
            <button className="w-full mt-10 py-4 bg-[#1D1D1F] text-white rounded-2xl font-bold text-lg hover:bg-black transition-colors shadow-lg">
                {t.updates.moreNews} &rsaquo;
            </button>
        </div>
      </section>

      <DailyLiturgy t={t} lang={lang} />
    </div>
  );
}

function ScreenMassTimes({ t, lang }) {
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

function ScreenCalendar({ t, lang }) {
    return (
        <div className="pt-24 pb-32 px-4 max-w-6xl mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-[#1D1D1F]">{t.calendar.title}</h2>
                <p className="text-xl text-[#86868B] max-w-2xl mx-auto tracking-tight">{t.calendar.sub}</p>
            </div>
            <div className="space-y-12">
                {['Season of Lent', 'The Paschal Triduum', 'Easter Season'].map((seasonKey) => {
                    const seasonEvents = calendarEventsData.filter(e => e.season.en === seasonKey);
                    if (seasonEvents.length === 0) return null;
                    return (
                        <div key={seasonKey} className="reveal">
                            <div className="flex items-center gap-4 mb-8">
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#86868B] whitespace-nowrap">{seasonEvents[0].season[lang]}</h3>
                                <div className="h-px w-full bg-black/5"></div>
                            </div>
                            <div className="grid gap-6">
                                {seasonEvents.map((event) => (
                                    <div key={event.id} className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row group">
                                        <div className={`md:w-48 shrink-0 flex flex-col items-center justify-center p-8 transition-colors ${event.color} ${event.textColor || 'text-white'} ${event.border ? 'border-r border-black/5' : ''}`}>
                                            <span className="text-sm font-bold tracking-widest uppercase opacity-70 mb-1">{event.month}</span>
                                            <span className="text-6xl font-bold tracking-tighter">{event.day}</span>
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col justify-center">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="text-3xl font-bold text-[#1D1D1F] tracking-tight group-hover:text-[#0066CC] transition-colors">{event.title[lang]}</h4>
                                                <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="w-5 h-5 text-[#1D1D1F]" /></div>
                                            </div>
                                            <p className="text-xl text-[#1D1D1F] leading-relaxed mb-6">{event.desc[lang]}</p>
                                            <div className="flex items-center gap-3 bg-[#F5F5F7] w-max px-4 py-2 rounded-xl">
                                                <Sparkles className="w-4 h-4 text-[#9E804E]" />
                                                <span className="text-sm font-bold text-[#86868B]">{t.calendar.labelSignificance}: <span className="text-[#1D1D1F]">{event.significance[lang]}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ScreenPeace({ t, lang }) {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
  
    async function generateReflection() {
      if (!input.trim()) return;
      setLoading(true); setError(''); setResult(null);
      const fullLang = languageMap[lang] || "English";
      const prompt = `Feeling: "${input}". Provide comfort, scripture, and short prayer in ${fullLang}.`;
      const system = `Return JSON: { "message": "comfort", "verse": "ref", "verseText": "text", "prayer": "prayer" }`;
      try {
        const res = await callGemini(prompt, system);
        setResult(res);
      } catch (e) { setError(t.companion.error); } finally { setLoading(false); }
    }

    return (
        <div className="pt-24 pb-32 px-4 max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className="text-center mb-16"><div className="w-16 h-16 rounded-3xl bg-[#9E804E]/10 text-[#9E804E] flex items-center justify-center mx-auto mb-6"><Sparkles className="w-8 h-8" /></div><h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">{t.companion.title}</h2><p className="text-xl text-[#86868B] max-w-2xl mx-auto">{t.companion.sub}</p></div>
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-black/5 relative">
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.companion.placeholder} className="w-full bg-[#F5F5F7] border-none rounded-2xl p-6 text-xl mb-6 h-48 focus:ring-2 focus:ring-[#9E804E] transition-all resize-none shadow-inner" />
                <button onClick={generateReflection} disabled={loading || !input.trim()} className="w-full bg-[#1D1D1F] text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-lg hover:bg-black transition-colors disabled:opacity-50">{loading ? <Loader2 className="w-6 h-6 animate-spin" /> : t.companion.btn}</button>
                {error && <p className="mt-6 text-red-500 text-center font-medium">{error}</p>}
                {result && (<div className="mt-12 pt-12 border-t border-black/5 animate-[fadeIn_0.5s_ease-out_forwards]"><p className="text-2xl font-medium mb-8 text-[#1D1D1F] leading-tight">{result.message}</p><div className="bg-[#F5F5F7] p-8 rounded-[2rem] border-l-8 border-[#9E804E] mb-8"><p className="text-2xl font-serif italic text-[#333336]" style={{ fontFamily: 'Georgia, serif' }}>"{result.verseText}"</p><p className="text-right font-bold text-[#9E804E] mt-6 tracking-widest uppercase text-sm">— {result.verse}</p></div><div className="px-4"><p className="text-xs font-bold uppercase tracking-widest text-[#86868B] mb-4">{t.companion.prayerLabel}</p><p className="text-2xl font-serif leading-relaxed text-[#1D1D1F]" style={{ fontFamily: 'Georgia, serif' }}>{result.prayer}</p><p className="mt-6 font-serif italic text-xl text-[#1D1D1F]">Amen.</p></div></div>)}
            </div>
        </div>
    );
}

function ScreenOrganization({ t, lang }) {
  return (
    <div className="pt-24 pb-32 px-4 max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="text-center mb-20"><h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">{t.team.title}</h2><p className="text-xl text-[#86868B]">{t.team.sub}</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">{[
            { name: "Rev. Fr. Andy Lee", role: "Rector", img: "https://images.unsplash.com/photo-1544168190-79c15427015f" },
            { name: "Rev. Fr. Francis Kuleh Usat", role: "Assistant Rector", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a" },
            { name: "Anthony Lawai Lutang", role: "PPC Chairman", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
            { name: "Sr. Mary", role: "Parish Admin", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" }
          ].map((p, i) => (<div key={i} className="text-center group"><div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden mb-6 relative bg-[#F5F5F7]"><img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={p.name} /></div><h3 className="text-xl md:text-2xl font-bold tracking-tight">{p.name}</h3><p className="text-[#86868B] text-lg mt-1">{p.role}</p></div>))}</div>
      <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold tracking-tighter">{t.team.serveTitle}</h2></div>
      <div className="grid md:grid-cols-3 gap-8">{['choir', 'liturgy', 'warden'].map((k) => (<div key={k} className="bg-white border border-black/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"><div className="h-64 relative overflow-hidden bg-[#F5F5F7]"><img src={k === 'choir' ? "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7" : k === 'liturgy' ? "https://images.unsplash.com/photo-1542157585-ef20bbcce178" : "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca"} className="w-full h-full object-cover" alt="" /><div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div><div className="absolute bottom-6 left-6 text-white"><h3 className="text-3xl font-bold tracking-tight">{t.ministries[k].title}</h3></div></div><div className="p-8 flex flex-col flex-1"><p className="text-[#86868B] text-lg leading-relaxed mb-10 flex-1">{t.ministries[k].desc}</p><button className="text-[#0066CC] font-bold text-lg hover:underline w-max">{t.team.join} &rsaquo;</button></div></div>))}</div>
      <MinistryMatcher t={t} lang={lang} />
    </div>
  );
}

function ScreenLocation({ t }) {
  return (
    <div className="pt-24 pb-32 px-4 max-w-7xl mx-auto animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="text-center mb-16"><h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">{t.connect.title}</h2><p className="text-xl text-[#86868B]">{t.connect.sub}</p></div>
      <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm"><h3 className="font-bold text-3xl mb-8">{t.connect.office}</h3><div className="space-y-6"><div className="flex gap-4"><MapPin className="text-[#9E804E]" /><div><h4 className="font-bold">{t.connect.address}</h4><p className="text-[#86868B]">Taman Tunku, Miri, Sarawak</p></div></div><div className="flex gap-4"><Phone className="text-[#9E804E]" /><div><h4 className="font-bold">{t.connect.phone}</h4><p className="text-[#86868B]">+60 85-123 456</p></div></div></div></div>
              <div className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden flex flex-col"><div className="p-6 border-b border-black/5 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><Facebook className="w-5 h-5 fill-current" /></div><h3 className="font-bold text-lg leading-none">{t.connect.facebookTitle}</h3></div><a href="#" className="flex items-center gap-2 bg-[#F5F5F7] px-4 py-2 rounded-full text-xs font-bold">{t.connect.facebookBtn} <ExternalLink className="w-3 h-3" /></a></div><div className="w-full bg-[#F5F5F7] h-96 shadow-inner"><iframe title="fb" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=500&height=400&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId" width="100%" height="400" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowFullScreen={true}></iframe></div></div>
          </div>
          <div className="lg:col-span-7 h-[600px] rounded-[3rem] overflow-hidden shadow-sm"><iframe title="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.3213068019013!2d113.99965301525381!3d4.340989096841775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x321f4bc20d3f283d%3A0xb36a3f91689dfbb8!2sSt.%20Dominic%20and%20The%20Rosary%20Church!5e0!3m2!1sen!2smy!4v1680000000000!5m2!1sen!2smy" width="100%" height="100%" style={{border:0}}></iframe></div>
      </div>
    </div>
  );
}

function ScreenDonate({ t }) {
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

// --- MAIN APPLICATION ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [splashState, setSplashState] = useState('loading'); 
  const [isAppReady, setIsAppReady] = useState(false);
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

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
    { id: 'home', icon: <Home />, label: t.nav.home },
    { id: 'calendar', icon: <Calendar />, label: t.nav.calendar },
    { id: 'peace', icon: <Sparkles />, label: t.nav.peace },
    { id: 'mass-times', icon: <Clock />, label: t.nav.mass },
    { id: 'organization', icon: <Users />, label: t.nav.team },
    { id: 'location', icon: <MapPin />, label: t.nav.location },
    { id: 'donate', icon: <Heart className="text-[#9E804E]" />, label: t.nav.donate, isDivider: true }
  ];

  return (
    <div className="min-h-screen text-[#1D1D1F] font-sans antialiased relative" style={{ fontFamily: '"SF Pro Display", sans-serif' }}>
      <div className="fixed inset-0 z-[-2] bg-[#F5F5F7]" />
      
      {isAppReady && (
        <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[60] animate-[fadeIn_1s_ease-out_forwards]" ref={langMenuRef}>
          <div className="relative">
            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className={`flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-sm transition-all backdrop-blur-xl font-bold text-sm ${isLangMenuOpen ? 'bg-white border-[#1D1D1F]/10' : 'bg-white/60 border-white/40'}`}><Globe className="w-4 h-4" /> {lang.toUpperCase()} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} /></button>
            {isLangMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white/90 backdrop-blur-2xl border border-black/5 rounded-2xl p-2 shadow-2xl flex flex-col min-w-[180px] animate-[slideDown_0.3s_ease-out_forwards] z-[70]">{Object.keys(translations).map(l => (<button key={l} onClick={() => { setLang(l); setIsLangMenuOpen(false); }} className={`text-left px-4 py-3 rounded-xl font-bold text-sm ${lang === l ? 'bg-[#F5F5F7] text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]/50'}`}>{languageMap[l]}</button>))}</div>
            )}
          </div>
        </div>
      )}

      {splashState !== 'hidden' && (
        <div className={`fixed inset-0 z-[100] bg-[#F5F5F7] flex flex-col items-center justify-center transition-all duration-1000 ${splashState === 'exiting' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}><Heart className="w-14 h-14 bg-[#1D1D1F] p-3 text-white rounded-full mb-8 shadow-lg" /><BlurText text="St Dominic & The Rosary." className="text-3xl font-bold tracking-tighter" delay={200} /><div className="w-56 h-[2px] bg-black/5 rounded-full overflow-hidden mt-12"><div className="h-full bg-[#1D1D1F] rounded-full animate-loader"></div></div></div>
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOpacity { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes loadingProgress { 0% { width: 0%; } 100% { width: 100%; } }
        .animate-loader { animation: loadingProgress 2s cubic-bezier(0.16,1,0.3,1) 1s forwards; animation-fill-mode: both; }
      `}} />
    </div>
  );
}