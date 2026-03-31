export const languageMap = {
  en: "English",
  bm: "Bahasa Malaysia",
  ib: "Bahasa Iban"
};

export const weeklyCollectionData = [
  { week: "Mar 22", amount: 4250.50, trend: "+12%" },
  { week: "Mar 15", amount: 3800.00, trend: "-2%" }
];

export const calendarEventsData = [
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

export const translations = {
  en: {
    nav: { home: "Home", calendar: "Calendar", peace: "Peace", mass: "Mass", team: "Team", location: "Location", donate: "Donate" },
    hero: { welcome: "Welcome to", churchName: "St Dominic & The Rosary Church.", subtitle: "A community of faith in the heart of Miri.", btn: "View Mass Times" },
    announcement: { title: "Parish Gotong-Royong", text: "Join us this Saturday at 8:00 AM. All parishioners are welcome.", btn: "Learn more" },
    updates: { title: "Weekly Updates.", sub: "Latest news and reflections.", news: "Parish News", read: "Read article", moreNews: "View All News" },
    calendar: { title: "The Rhythm of Faith.", sub: "Journey through the sacred feasts, holydays, and liturgical seasons of the Church.", labelSeason: "Current Season", labelSignificance: "Spiritual Meaning", seasonLent: "Season of Lent", seasonEaster: "Easter Season", start: "Start", end: "End", todayQuote: "A time for reflection and renewal.", fullCalendar: "Full Calendar", feast: "feast", feasts: "feasts" },
    liturgy: { title: "Daily Liturgy", color: "Color", readings: "Readings", loading: "Retrieving Word...", error: "Unavailable.", today: "Today", active: "Active", phase: "Phase", morning: "Morning", evening: "Evening", towardsHolyWeek: "Towards Holy Week", prepLent: "A period of prayer, fasting, and preparation for Easter.", prepEaster: "A time of celebration and joy in the Resurrection.", prepOrdinary: "A journey of growth in the life of Christ.", ordinary: "Ordinary Time" },
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
      title: "Gather in Worship.", 
      sub: "Join our vibrant community for Holy Mass in a language close to your heart.", 
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
    team: { title: "Guided by Faith.", sub: "Meet the dedicated clergy and leaders nurturing our vibrant community.", serveTitle: "Serve with Us.", join: "Join Ministry" },
    ministries: {
      choir: { title: "Parish Choir", desc: "Lead the congregation in praise through song. We welcome all singers and musicians." },
      liturgy: { title: "Liturgical Ministry", desc: "Serve at the center of spiritual life as Lectors, Altar Servers, and Ministers." },
      warden: { title: "Wardens", desc: "The welcoming face of our parish, ensuring a peaceful environment for worship." }
    },
    connect: { title: "Our Doors Are Open.", sub: "Find your way to our parish, or reach out whenever you need us.", office: "Parish Office", address: "Address", phone: "Phone", email: "Email", facebookTitle: "Community", facebookSub: "Latest from Facebook.", facebookBtn: "Follow Us" },
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
    calendar: { title: "Kitaran Musim Rohani.", sub: "Selami perjalanan iman melalui perayaan suci dan peredaran musim liturgi Gereja.", labelSeason: "Musim Semasa", labelSignificance: "Makna Rohani", seasonLent: "Musim Pra-Paskah", seasonEaster: "Musim Paskah", start: "Mula", end: "Tamat", todayQuote: "Masa untuk renungan dan pembaharuan.", fullCalendar: "Kalendar Penuh", feast: "perayaan", feasts: "perayaan" },
    liturgy: { title: "Liturgi Harian", color: "Warna", readings: "Bacaan", loading: "Mengambil Sabda...", error: "Tidak tersedia.", today: "Hari Ini", active: "Aktif", phase: "Fasa", morning: "Pagi", evening: "Petang", towardsHolyWeek: "Menuju Minggu Kudus", prepLent: "Waktu doa, berpuasa, dan persediaan untuk Paskah.", prepEaster: "Masa kegembiraan dan sukacita atas Kebangkitan.", prepOrdinary: "Perjalanan pertumbuhan dalam kehidupan Kristus.", ordinary: "Masa Biasa" },
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
      title: "Berhimpun dalam Tuhan.", 
      sub: "Raikan Misa Kudus bersama komuniti kami dalam bahasa keselesaan anda.", 
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
    team: { title: "Pembimbing Paroki.", sub: "Kenali paderi dan barisan pemimpin yang berdedikasi dalam melayani komuniti kita.", serveTitle: "Berkhidmat Bersama", join: "Sertai Pelayanan" },
    ministries: {
      choir: { title: "Koir Paroki", desc: "Memimpin umat dalam pujian melalui nyanyian dan muzik. Koir kami menyokong liturgi Ahad dan hari-hari perayaan besar. Kami mengalu-alukan penyanyi dan pemuzik dari pelbagai tahap kemahiran untuk berkongsi bakat mereka melalui muzik suci." },
      liturgy: { title: "Pelayanan Liturgi", desc: "Berkhidmat di pusat kehidupan rohani kami. Kumpulan ini termasuk Lektor yang mewartakan Sabda Tuhan, Pelayan Altar yang membantu imam semasa Ekaristi, dan Pelayan Luar Biasa Komuni Kudus. Peranan yang penuh hormat dan dedikasi kepada altar." },
      warden: { title: "Warden & Hospitaliti", desc: "Wajah keramahan St Dominic. Warden memastikan persekitaran yang tenang dan teratur untuk ibadat. Mereka menyambut umat, menguruskan tempat duduk, membantu dalam kutipan, dan menyokong keselamatan komuniti semasa semua perkhidmatan." }
    },
    connect: { title: "Pintu Kami Terbuka.", sub: "Kunjungi paroki kami, atau hubungi kami bila-bila masa anda memerlukan.", office: "Pejabat Paroki", address: "Alamat", phone: "Telefon", email: "Emel", facebookTitle: "Komuniti", facebookSub: "Berita Facebook.", facebookBtn: "Ikuti Kami" },
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
    calendar: { title: "Musim Pengarap Kitai.", sub: "Sama mih kitai nginang rita gawai kudus enggau perenial musim pengarap dalam Gereja.", labelSeason: "Musim diatu", labelSignificance: "Reti ba Ati", seasonLent: "Musim Lent", seasonEaster: "Musim Paskah", start: "Berengkah", end: "Ujung", todayQuote: "Maya ngenang sereta dikemanahka.", fullCalendar: "Kalendar Semua", feast: "gawai", feasts: "bala gawai" },
    liturgy: { title: "Liturgi Seharitu", color: "Chura", readings: "Bacha", loading: "Ngambil Sabda...", error: "Enda ulih dipeda.", today: "Seharitu", active: "Aktif", phase: "Tikas", morning: "Pagi", evening: "Lemai", towardsHolyWeek: "Nuju Minggu Kudus", prepLent: "Maya sampi, bepuasa, sereta nyiapka diri ke Paskah.", prepEaster: "Maya ngerami pengangkat baru Tuhan Yesus.", prepOrdinary: "Bejalai mansang dalam pengidup enggau Kristus.", ordinary: "Maya Biasa" },
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
      title: "Begempung Sembiang.", 
      sub: "Sama mih kitai ngerami Misa Kudus ngena jaku kemerah di ati nuan.", 
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
    team: { title: "Apai Pengarap Paroki.", sub: "Serungkai bala paderi enggau tuai raban ti sayau serta ngiring gerempung kitai.", serveTitle: "Gawa Sama", join: "Masuk Pelayanan" },
    ministries: {
      choir: { title: "Koir Paroki", desc: "Ngiring jemaah ngena lagu. Kami nyambut penyanyi enggau pemain muzik baru." },
      liturgy: { title: "Raban Liturgi", desc: "Gawa ba Altar nyadi Lektor, Pelayan Altar, enggau Raban Komuni." },
      warden: { title: "Warden", desc: "Nyambut penemuai sereta nentuka kandang gereja lantang maya sembiang." }
    },
    connect: { title: "Pintu Kami Seruran Muka.", sub: "Datai mih ngagai paroki kami, tauka giga kami sebarang maya nuan begunaka sukung.", office: "Opis", address: "Alamat", phone: "Talipun", email: "Emel", facebookTitle: "Komuniti", facebookSub: "Berita Facebook.", facebookBtn: "Peda Kami" },
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

export async function callGemini(prompt, systemInstruction, retries = 3) {
  // Use environment variable if provided, else use empty string
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || "";
  
  if (!apiKey) {
    // Simulate network delay for realistic feel
    await new Promise(r => setTimeout(r, 1200)); 
    
    const isBM = systemInstruction.includes("Bahasa Malaysia") || prompt.includes("Bahasa Malaysia");
    const isIB = systemInstruction.includes("Bahasa Iban") || prompt.includes("Bahasa Iban");

    // MOCK: Saint of the Day
    if (systemInstruction.includes("Saint Name")) {
      if (isIB) return { name: "St. John Paul II", bio: "Siku ari bala Pope ke pemadu lama megai pengawa dalam sejarah. Iya dikelala berindik ari pengawa mindah kin kitu sereta pengeransing ngemanahka kaul Gereja Katolik enggau jalai pengarap bukai.", lesson: "Anang nangika diri muka pintu ngagai Kristus dalam pengidup nuan." };
      if (isBM) return { name: "St. John Paul II", bio: "Salah seorang paus yang paling lama berkhidmat dalam sejarah. Beliau terkenal dengan perjalanan luasnya dan usahanya untuk memperbaiki hubungan Gereja Katolik dengan agama lain.", lesson: "Jangan takut untuk membuka luas pintu hatimu kepada Kristus." };
      return {
        name: "St. John Paul II",
        bio: "One of the longest-serving popes in history, he was known for his extensive travels and efforts to improve the Catholic Church's relations with other religions.",
        lesson: "Do not be afraid to open wide the doors to Christ in your life."
      };
    }
    
    // MOCK: Daily Liturgy
    if (systemInstruction.includes("Bible Reference")) {
      if (isIB) return { title: "Hari Dua Minggu Kudus", color: "purple", ref: "Isaiah 49:1-6 / Masmur 71:1-6, 15, 17 / John 13:21-33, 36-38", text: "Aku deka ngaga nuan nyadi penampak bansa, ngambika pengelepas Ku ulih datai ba ujung dunya." };
      if (isBM) return { title: "Selasa Minggu Kudus", color: "purple", ref: "Yesaya 49:1-6 / Mazmur 71:1-6, 15, 17 / Yohanes 13:21-33, 36-38", text: "Aku akan membuat engkau menjadi terang bagi bangsa-bangsa, supaya keselamatan-Ku sampai ke hujung bumi." };
      return {
        title: "Tuesday of Holy Week",
        color: "purple",
        ref: "Isaiah 49:1-6 / Psalms 71:1-6, 15, 17 / John 13:21-33, 36-38",
        text: "I will make you a light to the nations, that my salvation may reach to the ends of the earth."
      };
    }
    
    // MOCK: Ministry Matcher
    if (systemInstruction.includes("ministry")) {
      if (isIB) return { ministry: "Koir Paroki", reason: "Peneleba enggau pengerindu nuan ngam endar dikena ngerembaika sembiang begulai ngena muzik." };
      if (isBM) return { ministry: "Koir Paroki", reason: "Bakat dan minat anda amat bersesuaian dengan pelayanan memimpin nyanyian umat." };
      return {
        ministry: "Parish Choir",
        reason: "Your talents and interests perfectly align with leading the congregation in musical worship."
      };
    }
    
    // MOCK: Chatbot
    if (systemInstruction.includes("compassionate Catholic companion for St Dominic")) {
      return {
        reply: "Shalom! Peace be with you. I am your advanced companion. I noticed the active API key is currently missing from your environment, but I am fully ready to answer any questions and adapt playfully to whatever you need once it is entered!"
      };
    }

    // MOCK: A Moment of Peace
    if (systemInstruction.includes("comfort")) {
      if (isIB) return { message: "Endang utai biasa nyema kitai asai rarat ketegal tating pengidup tiap hari. Ingat mih, nuan enda nanggung nya kediri; Tuhan mai nuan ngelebus dalam peruji Nya.", verse: "Matthew 11:28", verseText: "Datai mih ngagai Aku, semua nuan ke lelak sereta bepenusah, lalu Aku deka meri nuan pengelantang.", prayer: "Tuhan, beri ngagai aku atur ngambika melabaka Diri dalam jalai Nuan, iring singkang aku ngena penampak Nuan ti lemi. Amin." };
      if (isBM) return { message: "Adalah normal untuk merasa terbeban dengan cabaran hidup setiap hari. Ingatlah bahawa anda tidak keseorangan; Tuhan menjemput anda untuk berehat dalam rahmat-Nya.", verse: "Matius 11:28", verseText: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu.", prayer: "Tuhan, berikanlah aku ketenangan untuk percaya kepada rancangan-Mu, tenangkanlah hatiku, dan bimbinglah langkahku dengan cahaya-Mu yang lembut. Amin." };
      return {
        message: "It's completely normal to feel weighed down by the challenges of daily life. Remember that you do not carry this burden alone; God invites you to rest in His grace.",
        verse: "Matthew 11:28",
        verseText: "Come to me, all you who are weary and burdened, and I will give you rest.",
        prayer: "Lord, grant me the serenity to trust in Your plan, ease my troubled heart, and guide my steps with Your gentle light. Amen."
      };
    }
    
    throw new Error("No mock response configured for this prompt.");
  }

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
