"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Server, Network, Shield,
  Home, Info, FileText, LayoutGrid, Megaphone, HelpCircle, X, ArrowRight, Zap,
  BrainCircuit, ShieldAlert, Cpu, Star, Target,
  CreditCard, Globe, Key, Bug, Mail, Cloud, Search, Terminal, Eye,
  Activity
} from 'lucide-react'

// --- ASSET BACKGROUND ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. EFEK KLIK PARTIKEL ULTRA GOD-TIER ---
const UltraGodTierParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let elements: any[] =[];
    let animationFrameId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);
    resize();

    const explode = (x: number, y: number) => {
      // Dapatkan posisi relatif terhadap canvas
      const rect = canvas.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      elements.push({ type: 'core', x: relX, y: relY, radius: 0, alpha: 1, speed: 2 });
      // Spark
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        elements.push({ type: 'spark', x: relX, y: relY, vx: Math.cos(angle) * 4, vy: Math.sin(angle) * 4, life: 1 });
      }
    };

    const handlePointerDown = (e: PointerEvent) => explode(e.clientX, e.clientY);
    window.addEventListener('pointerdown', handlePointerDown);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan dengan ukuran canvas sebenarnya
      ctx.globalCompositeOperation = 'lighter';

      for (let i = elements.length - 1; i >= 0; i--) {
        let el = elements[i];
        el.alpha -= 0.02;
        if (el.alpha <= 0) { elements.splice(i, 1); continue; }

        if (el.type === 'core') {
          el.radius += 2;
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${el.alpha})`; // Ubah ke outline biru muda agar tidak abu-abu
          ctx.stroke();
        } else {
          el.x += el.vx; el.y += el.vy;
          ctx.fillStyle = `rgba(217, 70, 239, ${el.alpha})`;
          ctx.fillRect(el.x, el.y, 3, 3);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => { 
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId); 
    };
  },[]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none w-full h-full" />;
};

// --- 2. BACKGROUND CYBER (TRANSISI SMOOTH) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020108]">
      <AnimatePresence>
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.05 }} 
          animate={{ opacity: 0.35, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 2, ease: "easeInOut" }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten" 
        />
      </AnimatePresence>
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vh] bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-static opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

const SectionDivider = () => (
  <div className="relative w-full h-[2px] flex items-center justify-center z-50 overflow-visible">
    {/* Cahaya Latar Luar (Spread) */}
    <div className="absolute w-[80%] h-[20px] bg-fuchsia-500/10 blur-[20px] pointer-events-none" />
    
    {/* Garis Dasar Bergradasi */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    
    {/* Inti Garis Bercahaya (Neon) */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent shadow-[0_0_15px_#d946ef]" />
    
    {/* Animasi Sinyal Berjalan (Data Pulse) */}
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 w-[30%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
    />
  </div>
);

const CyberDecoration = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none select-none opacity-20 lg:opacity-30 ${className}`}>
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 border border-cyan-500/40 rounded-full animate-pulse" />
      <div className="absolute inset-4 border border-fuchsia-500/30 rounded-full animate-pulse delay-75" />
      <div className="absolute inset-10 border border-cyan-500/20 rounded-full animate-pulse delay-150" />
      <div className="absolute inset-[40%] bg-cyan-500/10 blur-2xl rounded-full" />
    </div>
  </div>
);


const VisiMisiSection = ({ bgIdx }: { bgIdx: number }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const data = [
    { id: "visi", icon: Star, title: "Visi Kami", desc: "Menjadi ekosistem pendidikan menengah yang tangguh siber, unggul dalam inovasi digital, serta mampu menjadi pelopor keamanan data." },
    { id: "misi", icon: Target, title: "Misi Kami", desc: "Menyelenggarakan infrastruktur digital yang terproteksi, membekali siswa dengan kompetensi siber, dan menanamkan budaya kewaspadaan." }
  ];

  return (
    // Penyesuaian: py-16 di mobile, py-24 di desktop. min-h-fit di mobile agar tidak bolong.
    <section className="relative w-full min-h-fit lg:min-h-screen flex flex-col items-center justify-center py-16 lg:py-24 bg-[#020108] border-t border-white/5 overflow-hidden">
      
      {/* BACKGROUND SINKRON */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* --- DEKORASI PENGISI AREA KOSONG (SEPERTI GAMBAR 3) --- */}
      <CyberDecoration className="-bottom-20 -right-20" />
      <CyberDecoration className="-top-20 -left-20 scale-75" />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 w-full text-center">
        <div className="mb-12 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Membangun Kedaulatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 animate-gradient-x">Digital Sekolah</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xs lg:text-base font-medium opacity-80 leading-relaxed">
            Mengokohkan kedaulatan digital sekolah melalui integrasi infrastruktur siber yang aman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12" onMouseLeave={() => setHovered(null)}>
          {data.map((item) => (
            <div 
              key={item.id} onMouseEnter={() => setHovered(item.id)}
              className={`bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 p-8 lg:p-14 rounded-[2.5rem] text-left transition-all duration-500 ${hovered && hovered !== item.id ? 'blur-sm opacity-50' : 'scale-100'}`}
            >
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 flex items-center justify-center rounded-2xl mb-6"><item.icon size={24} /></div>
              <h3 className="text-xl lg:text-3xl font-black text-white mb-4 uppercase">{item.title}</h3>
              <p className="text-slate-400 text-xs lg:text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SecurityStatsSection = () => {
  const stats = [
    { label: "Data Terlindungi", value: "99.9%", color: "text-emerald-400" },
    { label: "Deteksi Ancaman", value: "1,240", color: "text-fuchsia-400" },
    { label: "Siswa Terliterasi", value: "850+", color: "text-blue-400" },
    { label: "Uptime Sistem", value: "24/7", color: "text-cyan-400" },
  ];

  return (
    // Penyesuaian height: min-h-fit di mobile
    <section className="relative w-full min-h-fit lg:min-h-screen flex flex-col items-center justify-center py-16 lg:py-24 bg-[#030208] border-b border-white/5 overflow-hidden">
      
      {/* PENGISI AREA KOSONG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />
      <CyberDecoration className="bottom-0 left-0 scale-50 opacity-10" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 w-full text-center">
        <div className="mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Metrik Ketahanan <span className="text-fuchsia-500">Digital</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-xs lg:text-base font-medium">Monitoring performa infrastruktur siber secara real-time.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#0a0a0f]/60 backdrop-blur-xl p-6 lg:p-12 rounded-[2rem] border border-white/5 group relative overflow-hidden">
              <div className={`text-3xl lg:text-6xl font-black mb-2 ${s.color}`}>{s.value}</div>
              <div className="text-[8px] lg:text-xs font-black text-slate-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const CyberInfrastructureSection = () => {
  const sectors = [
    { title: "Firewall", icon: ShieldAlert, desc: "Filtering trafik masuk-keluar jaringan sekolah." },
    { title: "Monitoring", icon: Network, desc: "Pemantauan beban bandwidth tiap kelas." },
    { title: "Server", icon: Server, desc: "Manajemen data akademik sekolah terenkripsi." },
    { title: "IDS", icon: ScanLine, desc: "Mendeteksi akses ilegal atau upaya peretasan." },
    { title: "Auth", icon: Fingerprint, desc: "Sistem login terintegrasi identitas digital." },
    { title: "Backup", icon: Cpu, desc: "Redundansi data mingguan otomatis lokal." }
  ];

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden border-b border-cyan-500/10">
      
      {/* --- VIDEO BACKGROUND (DIBERSIHKAN) --- */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
          <source src="/bg/hacking-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] opacity-80" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full text-center">
        <div className="mb-16">
          {/* JUDUL DIKECILKAN: text-3xl lg:text-5xl */}
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            MODUL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PERTAHANAN</span> SIBER
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">Sistem pemantauan operasional sekolah terintegrasi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((s, i) => (
            <div 
              key={i} 
              className="group/card relative bg-[#050811]/60 backdrop-blur-2xl border border-cyan-500/10 p-12 rounded-[2.5rem] hover:border-cyan-400/50 transition-all duration-700 hover:-translate-y-4 overflow-hidden shadow-2xl"
            >
              {/* 1. ANIMASI SCANNER (Laser Line) */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scanner opacity-0 group-hover/card:opacity-100" />
              
              {/* 2. DIGITAL PARTICLES (Internal Sparks) */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover/card:opacity-20 pointer-events-none">
                {[...Array(5)].map((_, j) => (
                  <motion.div
                    key={j}
                    animate={{ y: [0, -100], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: j * 0.4 }}
                    className="absolute w-px h-10 bg-cyan-400"
                    style={{ left: `${20 * j}%`, bottom: '-20px' }}
                  />
                ))}
              </div>

              {/* 3. DEKORASI SUDUT (Holographic Corners) */}
              <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-cyan-500/20 group-hover/card:border-cyan-400 transition-colors" />
              <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-cyan-500/20 group-hover/card:border-cyan-400 transition-colors" />
              
              {/* 4. RADAR PULSE ICON CONTAINER */}
              <div className="relative w-20 h-20 mx-auto mb-10">
                {/* Gelombang Radar */}
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping opacity-0 group-hover/card:opacity-100" />
                <div className="absolute inset-0 rounded-full border border-cyan-500/40 animate-pulse" />
                
                <div className="relative w-full h-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 rounded-3xl flex items-center justify-center group-hover/card:shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover/card:scale-110 transition-all duration-500">
                  <s.icon size={36} className="drop-shadow-[0_0_8px_#22d3ee]" />
                </div>
              </div>
              
              <h3 className="relative z-10 text-2xl font-black text-white mb-4 uppercase tracking-[0.2em] group-hover/card:text-cyan-400 transition-colors">{s.title}</h3>
              <p className="relative z-10 text-cyan-100/40 text-sm leading-relaxed font-medium group-hover/card:text-cyan-100/80 transition-all">{s.desc}</p>

              {/* 5. DATA FLOW BAR */}
              <div className="mt-10 h-1.5 w-full bg-cyan-950/50 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanner {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scanner {
          animation: scanner 3s linear infinite;
        }
      `}} />
    </section>
  );
};

const ReadinessProtocolSection = () => {
  const protocols = [
    { num: "01", title: "IDENTIFIKASI", desc: "Pemetaan seluruh perangkat, akun, dan jaringan Wi-Fi sekolah untuk memantau potensi risiko.", icon: ScanLine, col: "text-cyan-400" },
    { num: "02", title: "PROTEKSI", desc: "Penerapan password kuat, autentikasi ganda, firewall, dan enkripsi data warga sekolah.", icon: ShieldCheck, col: "text-blue-400" },
    { num: "03", title: "DETEKSI", desc: "Pemantauan aktif sistem sekolah untuk mendeteksi malware, phishing, atau akses mencurigakan.", icon: Search, col: "text-emerald-400" },
    { num: "04", title: "RESPON", desc: "Tindakan cepat isolasi perangkat terinfeksi dan pemulihan akses saat terjadi insiden siber.", icon: ShieldAlert, col: "text-red-400" },
    { num: "05", title: "PEMULIHAN", desc: "Restorasi layanan sekolah melalui backup rutin agar KBM tetap berjalan normal.", icon: Cpu, col: "text-fuchsia-400" },
    { num: "06", title: "EDUKASI", desc: "Pelatihan literasi digital bagi siswa dan staf untuk membangun budaya waspada siber.", icon: BrainCircuit, col: "text-violet-400" },
    { num: "07", title: "KEBIJAKAN", desc: "Penyusunan aturan penggunaan internet dan perlindungan privasi data pribadi sekolah.", icon: FileText, col: "text-indigo-400" },
    { num: "08", title: "EVALUASI", desc: "Peninjauan berkala sistem keamanan sekolah agar tetap efektif menghadapi ancaman baru.", icon: Activity, col: "text-orange-400" },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 bg-[#030208] border-b border-white/5 overflow-hidden">
      {/* Background Decor (Cyber Lines) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 w-full">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase mb-4">
            Security Operating Procedure
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            PROTOKOL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">KESIAPAN SIBER</span> SMA/SMK
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm lg:text-base font-medium">
            Standar operasional perlindungan data dan aset digital sekolah untuk menciptakan ekosistem belajar yang aman.
          </p>
        </div>

        {/* GRID 8 KOTAK (4 Kolom di Desktop, 2 di Tablet, 1 di Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {protocols.map((p, i) => (
            <div 
              key={i} 
              className="group relative bg-[#0a0a0f]/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] hover:border-white/20 transition-all duration-500 flex flex-col items-start shadow-2xl overflow-hidden"
            >
              {/* Glow Effect saat Hover */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${p.col.replace('text', 'bg')}`} />

              {/* Header Card: Number & Icon */}
              <div className="w-full flex justify-between items-center mb-8">
                <span className="text-2xl font-mono font-black text-white/10 group-hover:text-white/30 transition-colors">
                  {p.num}
                </span>
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 ${p.col} group-hover:scale-110 transition-transform duration-500`}>
                  <p.icon size={24} />
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-black text-white mb-4 tracking-widest uppercase group-hover:text-cyan-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-slate-500 text-xs lg:text-[13px] leading-relaxed font-medium">
                {p.desc}
              </p>

              {/* Footer Decoration */}
              <div className="mt-8 pt-6 border-t border-white/5 w-full flex justify-between items-center opacity-50">
                <span className="text-[8px] font-mono tracking-widest text-slate-600 uppercase">Status: Validated</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION 7: BLOG ---
const CyberBlogSection = () => {
  const articles = [
    { title: "Mencegah Phishing di Lingkungan Sekolah", date: "24 MEI 2026", cat: "Edukasi", icon: ShieldCheck },
    { title: "Update Protokol Keamanan Firewall v.3", date: "20 MEI 2026", cat: "Sistem", icon: Zap },
    { title: "Membangun Budaya Literasi Password Siswa", date: "15 MEI 2026", cat: "Literasi", icon: Fingerprint },
  ];
  return (
    <section className="relative w-full py-24 bg-black border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter mb-4">Intelligence <span className="text-cyan-400">Hub</span></h2>
            <p className="text-slate-500 text-xs lg:text-sm font-medium">Wawasan terbaru mengenai keamanan siber dan teknologi pendidikan.</p>
          </div>
          <button className="px-6 py-3 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Lihat Semua</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((art, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden mb-6 border border-white/5 bg-white/[0.02]">
                <div className="absolute inset-0 flex items-center justify-center"><art.icon size={40} className="text-cyan-500/20 group-hover:text-cyan-400 transition-all group-hover:scale-110" /></div>
                <div className="absolute bottom-6 left-6"><span className="px-3 py-1 rounded-full bg-cyan-500 text-black text-[9px] font-black uppercase">{art.cat}</span></div>
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors uppercase">{art.title}</h3>
              <p className="text-slate-600 text-[10px] font-bold tracking-[0.2em]">{art.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION 8: FOOTER ---
const CyberFooter = () => (
  <footer className="relative w-full pt-20 pb-10 bg-[#020108]">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 space-y-6">
          <div className="flex items-center gap-3">
             <ShieldCheck size={28} className="text-fuchsia-500" />
             <h2 className="font-black text-white text-xl tracking-tighter uppercase leading-none">CYBER<br/><span className="text-fuchsia-500 text-sm">READINESS</span></h2>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed font-medium">Platform Ketahanan Siber Sekolah Terintegrasi. Mengamankan masa depan digital pendidikan.</p>
        </div>
        {[ 
          { t: "Layanan", l: ["Monitoring", "E-Learning", "Lapor Insiden"] },
          { t: "Organisasi", l: ["Profil", "Tim IT", "Kontak"] },
          { t: "Legal", l: ["Privasi", "Syarat", "SOP"] }
        ].map((item, i) => (
          <div key={i} className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-widest">{item.t}</h4>
            <ul className="space-y-3">
              {item.l.map((link, j) => (
                <li key={j} className="text-slate-500 text-xs hover:text-cyan-400 cursor-pointer transition-colors">{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-600 text-[9px] font-bold tracking-widest">© 2026 CYBER READINESS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4">
           {[Info, HelpCircle].map((Icon, i) => (
             <div key={i} className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all cursor-pointer"><Icon size={14}/></div>
           ))}
        </div>
      </div>
    </div>
  </footer>
);

const TECH_ICONS = [
  { id: "c1", icon: CreditCard, label: "CARD SEC", col: "text-cyan-400" },
  { id: "c2", icon: ShieldAlert, label: "PHISH HOOK", col: "text-red-400" },
  { id: "c3", icon: Cpu, label: "SHIELD CHIP", col: "text-emerald-400" },
  { id: "c4", icon: Globe, label: "GLOBE LCK", col: "text-blue-400" },
  { id: "c5", icon: Key, label: "KEY VAULT", col: "text-fuchsia-400" },
  { id: "c6", icon: Bug, label: "ANTIVIRUS", col: "text-amber-400" },
  { id: "c7", icon: Terminal, label: "WARN WIN", col: "text-orange-400" },
  { id: "c8", icon: Mail, label: "SECURE MAIL", col: "text-cyan-300" },
  { id: "c9", icon: Cloud, label: "CLOUD NET", col: "text-indigo-400" },
  { id: "c10", icon: FileText, label: "DOC CRYPT", col: "text-fuchsia-300" },
];

const CyberHiveMarquee = () => {
  return (
    // h-[100px] agar lebih tipis dan elegan
    <div className="relative w-full h-[100px] lg:h-[130px] overflow-hidden select-none bg-transparent">
      {/* Masking Halus - Menggunakan HEX warna background agar blending sempurna */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020108] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020108] to-transparent z-10 pointer-events-none" />
      
      <div className="flex items-center h-full">
        <motion.div 
          className="flex gap-12 lg:gap-20 px-10"
          animate={{ x: [0, -1800] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS].map((node, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, Math.sin(i) * 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="group relative flex-shrink-0 flex flex-col items-center justify-center"
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                {/* Glow Aura - Sangat Tipis */}
                <div className={`absolute inset-0 rounded-full blur-xl opacity-5 group-hover:opacity-20 transition-opacity ${node.col.replace('text', 'bg')}`} />
                <node.icon 
                  size={22} 
                  className={`${node.col} lg:size-6 drop-shadow-[0_0_10px_currentColor] opacity-60 group-hover:opacity-100 transition-all`} 
                />
              </div>

              <div className="mt-2 text-center">
                <p className="text-[7px] lg:text-[8px] font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors">
                  {node.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function CyberLandingDark() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  
  // State Form Login
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  

  // 3D Mouse Hover Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.set((e.touches[0].clientX / window.innerWidth) - 0.5);
        mouseY.set((e.touches[0].clientY / window.innerHeight) - 0.5);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Data otentikasi tidak lengkap.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    if (activeTab === 'REGISTER' && (!asal || !tanggalLahir)) {
      setErrorMessage("Lengkapi form registrasi.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    const uname = username.trim();

    try {
      const endpoint = activeTab === 'LOGIN' ? 'https://cyber-backend-delta.vercel.app/login' : 'https://cyber-backend-delta.vercel.app/register';
      const bodyData = activeTab === 'LOGIN' 
        ? { username: uname, password } 
        : { username: uname, password, role: 'siswa', class_name: className, asal: asal, tanggal_lahir: tanggalLahir };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setStatus('success');
        const role = data.role || 'siswa';
        setTimeout(() => router.push(role === 'guru' || role === 'admin' ? '/guru' : '/siswa'), 1500);
      } else {
        setErrorMessage(data.detail || "Otentikasi gagal.");
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setErrorMessage("Koneksi ke peladen terputus.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-slate-200 overflow-x-hidden selection:bg-fuchsia-500/30 relative">
      <PersistentUniverse bgIdx={bgIdx} />
      <UltraGodTierParticleSystem />

      

      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/5 bg-[#05050a]/80 backdrop-blur-xl shadow-md">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 lg:h-24 flex items-center justify-between">
    
    {/* AREA KIRI: LOGO */}
    <div className="flex items-center gap-3 lg:gap-4 shrink-0 relative z-[110]">
       <div className="w-10 h-10 lg:w-12 lg:h-12 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)]">
          <ShieldCheck size={24} className="text-fuchsia-400" />
       </div>
       <div className="whitespace-nowrap">
          <h1 className="font-black text-white tracking-widest text-sm lg:text-lg leading-tight">CYBER<span className="text-fuchsia-500">READINESS</span></h1>
          <p className="text-[8px] lg:text-[10px] text-slate-400 font-bold tracking-[0.3em] uppercase">CYBER SECURITY</p>
       </div>
    </div>

    {/* AREA TENGAH: NAVIGASI DESKTOP (Tetap Hidden di HP) */}
    <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-12 h-full">
        {[ 
          { icon: Home, label: 'Beranda', active: true }, 
          { icon: Info, label: 'Profil' }, 
          { icon: LayoutGrid, label: 'Organisasi' }, 
          { icon: FileText, label: 'Berita' }, 
          { icon: Megaphone, label: 'Pengumuman' }, 
          { icon: HelpCircle, label: 'Layanan' } 
        ].map((item, idx) => (
          <div key={idx} className="relative flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black cursor-pointer transition-colors text-slate-500 hover:text-white group">
            <item.icon size={15} className="group-hover:text-fuchsia-400" />
            {item.label}
            {item.active && <div className="absolute -bottom-8 w-full h-[2px] bg-fuchsia-500 shadow-[0_0_10px_#d946ef]" />}
          </div>
        ))}
    </nav>

    {/* AREA KANAN: LOGIN + HAMBURGER (Mobile) */}
    <div className="flex items-center gap-4 relative z-[110]">
      <button 
          onClick={() => setIsLoginOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 lg:px-8 lg:py-3.5 bg-fuchsia-600 text-white rounded-full font-black text-[10px] lg:text-[11px] tracking-[0.2em] uppercase hover:bg-fuchsia-500 transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)]"
      >
          <User size={16} /> <span className="hidden sm:inline">LOGIN</span>
      </button>

      {/* Tombol Hamburger - HANYA MUNCUL DI HP */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
      >
        {isMobileMenuOpen ? <X size={24} /> : <LayoutGrid size={24} />}
      </button>
    </div>

  </div>

  {/* ========================================================================= */}
  {/* OVERLAY MENU MOBILE (MUNCUL SAAT KLIK HAMBURGER)                         */}
  {/* ========================================================================= */}
  <AnimatePresence>
    {isMobileMenuOpen && (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-full left-0 w-full bg-[#05050a]/95 backdrop-blur-2xl border-b border-white/10 py-8 px-6 lg:hidden flex flex-col gap-6 shadow-2xl"
      >
        {[ 
          { icon: Home, label: 'Beranda' }, 
          { icon: Info, label: 'Profil' }, 
          { icon: LayoutGrid, label: 'Organisasi' }, 
          { icon: FileText, label: 'Berita' }, 
          { icon: Megaphone, label: 'Pengumuman' }, 
          { icon: HelpCircle, label: 'Layanan' } 
        ].map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-300 font-bold tracking-widest text-xs uppercase hover:bg-fuchsia-600/20 hover:text-fuchsia-400 transition-all"
          >
            <item.icon size={18} />
            {item.label}
          </div>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
</header>

      {/* ========================================================================= */}
      {/* KONTEN UTAMA (SISTEM 5 HALAMAN DENGAN PEMISAH BERCAHAYA)                   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full pt-36 lg:pt-44">
        
{/* ========================================================================= */}
        {/* SECTION 1: HERO (MOBILE: CENTER + STACKED | DESKTOP: LEFT + SIDE-BY-SIDE) */}
        {/* ========================================================================= */}
        <section className="relative min-h-screen lg:min-h-[calc(100vh-120px)] flex items-center justify-center w-full max-w-[1400px] mx-auto px-6 lg:px-10 pt-28 pb-10 lg:py-0">
           <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
              
{/* --- AREA WIDGET & MARQUEE (REVISI: BALANCE & PROPORTIONAL) --- */}
<div className="relative w-full flex flex-col items-center justify-center order-1 lg:order-2 pt-10 lg:pt-0 pb-32 lg:pb-16 gap-12 lg:gap-16">
                 
                 {/* 3D SECURITY CARD */}
                 <div className="relative" style={{ perspective: 2000 }}>
                    <motion.div 
                       style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                       className="relative w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] lg:w-[350px] lg:h-[440px] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-[2.5rem] lg:rounded-[3.5rem] p-1 shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col items-center justify-center group/card"
                    >
                       <div className="relative flex items-center justify-center mb-6 lg:mb-8" style={{ transform: "translateZ(60px)" }}>
                          <div className="absolute w-32 h-32 lg:w-44 lg:h-44 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                          <div className="w-16 h-16 lg:w-24 lg:h-24 bg-black border border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                             <ShieldCheck size={36} className="lg:size-12 text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]" />
                          </div>
                       </div>
                       <div className="text-center" style={{ transform: "translateZ(40px)" }}>
                          <h3 className="text-lg lg:text-xl font-black text-white tracking-[0.1em] uppercase">
                             Security <span className="text-cyan-400">System</span>
                          </h3>
                       </div>
                       <div className="absolute -bottom-4 lg:-bottom-6 px-8 py-3 bg-black border border-white/5 text-white rounded-xl text-[7px] lg:text-[9px] font-black tracking-[0.4em]" style={{ transform: "translateZ(70px)" }}>
                         ENCRYPTED 2026
                       </div>
                    </motion.div>
                 </div>

                 {/* LOGO MARQUEE - Diberi Jarak Pas Melalui Gap Container */}
                 <div className="w-full max-w-[100vw]">
                    <CyberHiveMarquee />
                 </div>

              </div>

              {/* --- AREA TEKS (HP: BAWAH | LAPTOP: KIRI) --- */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-10 w-full order-2 lg:order-1">
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-[9px] lg:text-[10px] font-black tracking-[0.4em] uppercase backdrop-blur-md"
                 >
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]"/> 
                   SECURE PROTOCOL ACTIVE
                 </motion.div>
                 
                 <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] uppercase">
                    Kesiapan Siber <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-500 to-cyan-400 animate-gradient-x">
                       Sekolah 2026.
                    </span>
                 </h2>
                 
                 <p className="text-sm lg:text-lg font-medium text-slate-400 leading-relaxed max-w-xl opacity-80">
                    Platform kesiapan digital sekolah yang mengintegrasikan keamanan tingkat tinggi dengan infrastruktur modern untuk masa depan pendidikan yang terlindungi.
                 </p>

                 <div className="w-full flex justify-center lg:justify-start">
                   <button onClick={() => setIsLoginOpen(true)} className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase transition-all hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] flex items-center justify-center gap-3 shadow-xl">
                      Mulai Evaluasi <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
                   </button>
                 </div>

                 {/* Mini Icons Row (Optional, sesuai seleramu) */}
                 <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 opacity-40">
                    {[ Shield, Server, Network, Fingerprint ].map((Icon, i) => (
                      <div key={i} className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center text-slate-400">
                         <Icon size={18} />
                      </div>
                    ))}
                 </div>
              </div>

           </div>
        </section>

        <SectionDivider />

{/* --- HALAMAN 2: PILAR STRATEGIS (DIBUAT LEBAR) --- */}
<div className="relative w-full bg-[#030208] z-20 pb-32 pt-24 shadow-[0_-30px_60px_rgba(0,0,0,0.8)] border-b border-white/5">
           <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-900/10 via-fuchsia-900/5 to-transparent blur-[120px] pointer-events-none" />
           
           {/* UBAH KE max-w-[1600px] DAN px-16 DISINI JUGA */}
           <section className="max-w-[1600px] mx-auto px-6 lg:px-16 relative z-10">
               <div className="text-center mb-24">
                 <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-6">
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">Pilar Strategis</span> Kami
                 </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
                  {[ 
                    { t: "Infrastruktur", i: Server, c: "text-cyan-400", d: "Membangun arsitektur jaringan sekolah yang terpusat dan tahan terhadap serangan siber." },
                    { t: "Keamanan", i: ShieldAlert, c: "text-fuchsia-400", d: "Menerapkan protokol enkripsi dan pemantauan real-time untuk mendeteksi ancaman." },
                    { t: "Literasi", i: BrainCircuit, c: "text-emerald-400", d: "Meningkatkan kesadaran sivitas akademika dalam menjaga keamanan data pribadi." }
                  ].map((item, i) => (
                    <div key={i} className="bg-[#08070d]/80 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-12 lg:p-14 text-center hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                       <div className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-10 mx-auto shadow-xl"><item.i size={36} className={item.c} /></div>
                       <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-widest">{item.t}</h3>
                       <p className="text-sm text-slate-400 leading-relaxed">{item.d}</p>
                    </div>
                  ))}
               </div>
           </section>
        </div>

        <SectionDivider />

        <SectionDivider />

{/* HALAMAN 3: VISI MISI (SUDAH FULL PAGE SEKARANG) */}
<VisiMisiSection bgIdx={bgIdx} />

<SectionDivider />

{/* HALAMAN 4: METRIK STATISTIK (FULL PAGE) */}
<SecurityStatsSection />

<SectionDivider />

{/* HALAMAN 5: INFRASTRUKTUR (FULL PAGE VIDEO) */}
<CyberInfrastructureSection />

{/* HALAMAN 6 & 7: PROTOKOL & BLOG */}
<SectionDivider />
<ReadinessProtocolSection />
<SectionDivider />
<CyberBlogSection />

<CyberFooter />


      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* 1. Animasi Gradasi Teks Bergerak (Hero & Judul) */
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }

        /* 2. Animasi Laser Scanner pada Card Modul */
        @keyframes scanner {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanner {
          animation: scanner 3s linear infinite;
        }

        /* 3. Animasi Hologram Scan (Lama) */
        @keyframes hologram-scan {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-hologram-scan {
          animation: hologram-scan 3s ease-in-out infinite;
        }

        /* 4. Background Grid Statis */
        .bg-grid-static {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* 5. Custom Selection & Input Fixes */
        ::selection { background: #06b6d4; color: white; }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #050505 inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        input[type="date"]::-webkit-calendar-picker-indicator { 
          filter: invert(1) hue-rotate(180deg) brightness(1.5); 
          opacity: 0.5; 
          cursor: pointer; 
        }

        /* 6. Scrollbar Mewah (Biru ke Ungu) */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #020108;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #22d3ee, #d946ef);
          border-radius: 10px;
        }

        /* 7. Utilitas Tambahan */
        .perspective-[2000px] { perspective: 2000px; }
      `}} />
    </div>
  );
}