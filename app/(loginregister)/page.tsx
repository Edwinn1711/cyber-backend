"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Server, Network, Shield,
  Home, Info, FileText, LayoutGrid, Megaphone, HelpCircle, X, ArrowRight, Zap,
  BrainCircuit, ShieldAlert, Cpu, Star, Target
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

const VisiMisiSection = ({ bgIdx }: { bgIdx: number }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const data = [
    { id: "visi", icon: Star, title: "Visi Kami", desc: "Menjadi ekosistem pendidikan menengah yang tangguh siber, unggul dalam inovasi digital, serta mampu menjadi pelopor keamanan data." },
    { id: "misi", icon: Target, title: "Misi Kami", desc: "Menyelenggarakan infrastruktur digital yang terproteksi, membekali siswa dengan kompetensi siber, dan menanamkan budaya kewaspadaan digital." }
  ];

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img 
          key={bgIdx} src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }} className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <div className="mb-20">
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">
            Membangun Kedaulatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Digital Sekolah</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" onMouseLeave={() => setHovered(null)}>
          {data.map((item) => (
            <div 
              key={item.id} onMouseEnter={() => setHovered(item.id)}
              className={`bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] text-left transition-all duration-500 ${hovered && hovered !== item.id ? 'blur-sm opacity-50' : ''} ${hovered === item.id ? '-translate-y-4 border-blue-500/50' : ''}`}
            >
              <div className="w-14 h-14 bg-blue-500/10 text-blue-400 flex items-center justify-center rounded-2xl mb-8"><item.icon size={28} /></div>
              <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
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
    <section className="relative w-full min-h-[80vh] flex items-center justify-center py-24 bg-[#030208]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        <h2 className="text-6xl font-black text-white uppercase mb-20 tracking-tighter">METRIK KETAHANAN <span className="text-fuchsia-500">DIGITAL</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#08070d] p-14 rounded-[3rem] border border-white/5 hover:border-fuchsia-500/30 transition-all group">
              <div className={`text-7xl font-black mb-4 transition-transform group-hover:scale-110 ${s.color}`}>{s.value}</div>
              <div className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CyberInfrastructureSection = () => {
  const sectors = [
    { title: "Firewall", icon: ShieldAlert, desc: "Filtering trafik masuk-keluar jaringan." },
    { title: "Monitoring", icon: Network, desc: "Pemantauan beban bandwidth tiap kelas." },
    { title: "Server", icon: Server, desc: "Manajemen data akademik terenkripsi." },
    { title: "IDS", icon: ScanLine, desc: "Mendeteksi upaya peretasan sistem." },
    { title: "Auth", icon: Fingerprint, desc: "Sistem login identitas digital." },
    { title: "Backup", icon: Cpu, desc: "Redundansi data mingguan lokal." }
  ];
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-24 bg-black overflow-hidden border-b border-cyan-500/20">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-100"><source src="/bg/hacking-bg.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] opacity-80" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full text-center">
        <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-16 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">MODUL <span className="text-cyan-400">PERTAHANAN</span> SIBER</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((s, i) => (
            <div key={i} className="group relative bg-[#050811]/40 backdrop-blur-2xl border border-cyan-500/10 p-10 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 shadow-2xl">
              <div className="w-14 h-14 bg-cyan-950/30 text-cyan-400 rounded-xl flex items-center justify-center mb-8 mx-auto"><s.icon size={26} /></div>
              <h3 className="text-xl font-black text-white mb-4 uppercase">{s.title}</h3>
              <p className="text-cyan-100/40 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function CyberLandingDark() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  
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

      

{/* AREA HEADER DIPERBAIKI */}
<header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-[#05050a]/80 backdrop-blur-xl shadow-md">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
    
    {/* AREA KIRI: LOGO */}
<div className="flex items-center gap-4 relative z-10 shrink-0">
   <div className="w-12 h-12 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)]">
      <ShieldCheck size={28} className="text-fuchsia-400" />
   </div>
   <div className="whitespace-nowrap">
      <h1 className="font-black text-white tracking-widest text-lg leading-tight">CYBER<span className="text-fuchsia-500">READINESS</span></h1>
      {/* UBAH BARIS DI BAWAH INI */}
      <p className="text-[10px] text-slate-400 font-bold tracking-[0.3em] uppercase mt-1">CYBER SECURITY</p>
   </div>
</div>

    {/* AREA TENGAH: NAVIGASI (Menggunakan flex-1 dan justify-center) */}
    <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-12 h-full">
        {[ 
          { icon: Home, label: 'Beranda', active: true }, 
          { icon: Info, label: 'Profil', active: false }, 
          { icon: LayoutGrid, label: 'Organisasi', active: false }, 
          { icon: FileText, label: 'Berita', active: false }, 
          { icon: Megaphone, label: 'Pengumuman', active: false }, 
          { icon: HelpCircle, label: 'Layanan', active: false } 
        ].map((item, idx) => (
          <div key={idx} className="relative flex flex-col items-center justify-center group cursor-pointer h-24">
            <div className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black transition-colors ${item.active ? 'text-fuchsia-400' : 'text-slate-500 group-hover:text-white'}`}>
              <item.icon size={15} className={item.active ? "text-fuchsia-500" : "text-slate-600 group-hover:text-fuchsia-400"} />
              {item.label}
            </div>
            {item.active && <div className="absolute bottom-0 w-full h-[2px] bg-fuchsia-500 rounded-t-md shadow-[0_0_10px_#d946ef]" />}
          </div>
        ))}
    </nav>

    {/* AREA KANAN: LOGIN (Tetap stabil) */}
    <div className="shrink-0">
      <button 
          onClick={() => setIsLoginOpen(true)}
          className="flex items-center gap-3 px-6 py-3 bg-fuchsia-600 text-white rounded-full font-black text-[11px] tracking-[0.2em] uppercase hover:bg-fuchsia-500 transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)]"
      >
          <User size={16} /> <span className="hidden sm:inline">LOGIN</span>
      </button>
    </div>

  </div>
</header>

      {/* ========================================================================= */}
      {/* KONTEN UTAMA (SISTEM 5 HALAMAN DENGAN PEMISAH BERCAHAYA)                   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full pt-36 lg:pt-44">
        
        {/* --- HALAMAN 1: HERO --- */}
        <section className="min-h-[calc(100vh-96px)] flex items-center w-full max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-0">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
              {/* Teks Kiri */}
              <div className="space-y-8 text-center lg:text-left">
                 <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-full text-[9px] font-black tracking-[0.5em] uppercase shadow-lg backdrop-blur-md">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#34d399]"/> SECURE CONNECTION ACTIVE
                 </div>
                 <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight uppercase drop-shadow-2xl">
                   Kesiapan Siber <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400">Sekolah 2026.</span>
                 </h2>
                 <p className="text-sm lg:text-base font-bold text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                   Platform ini dirancang untuk mengkaji tingkat ketahanan siber sekolah melalui penyediaan infrastruktur digital yang aman dan terintegrasi secara penuh.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                   <button onClick={() => setIsLoginOpen(true)} className="w-full sm:w-auto px-10 py-4 bg-fuchsia-600 text-white rounded-[1.2rem] font-black text-[11px] tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:bg-fuchsia-500 transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
                      Mulai Evaluasi <ArrowRight size={16}/>
                   </button>
                 </div>
                 <div className="pt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                    {[ { icon: Shield, col: 'text-indigo-400' }, { icon: Server, col: 'text-fuchsia-400' }, { icon: Network, col: 'text-cyan-400' }, { icon: Fingerprint, col: 'text-emerald-400' } ].map((feat, i) => (
                      <div key={i} className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md transition-all hover:-translate-y-1 cursor-pointer ${feat.col}`}>
                         <feat.icon size={24} />
                      </div>
                    ))}
                 </div>
              </div>

              {/* Grafis 3D Kanan */}
              <div className="hidden lg:flex items-center justify-center relative w-full" style={{ perspective: 1500 }}>
                 <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-full max-w-[400px] aspect-square bg-[#05050a]/80 backdrop-blur-3xl rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center mb-8" style={{ transform: "translateZ(70px)" }}>
                       <div className="w-32 h-32 bg-black border-[2px] border-fuchsia-500/50 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.3)]">
                          <ShieldCheck size={64} className="text-fuchsia-400" />
                       </div>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-widest uppercase text-center" style={{ transform: "translateZ(50px)" }}>Sistem<br/>Keamanan</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-3" style={{ transform: "translateZ(30px)" }}>Cyber Security</p>
                    <div className="absolute -bottom-5 w-[85%] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white px-8 py-3.5 rounded-full text-[10px] font-black tracking-[0.4em] text-center shadow-2xl" style={{ transform: "translateZ(80px)" }}>TERINTEGRASI 2026</div>
                 </motion.div>
              </div>
           </div>
        </section>

        <SectionDivider />

        {/* --- HALAMAN 2: PILAR STRATEGIS --- */}
        <div className="relative w-full bg-[#030208] z-20 pb-32 pt-24 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
           <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-900/10 via-fuchsia-900/5 to-transparent blur-[120px] pointer-events-none" />
           <section className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
               <div className="text-center mb-20">
                 <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-6">
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">Pilar Strategis</span> Kami
                 </h2>
                 <p className="text-slate-400 max-w-3xl mx-auto font-medium text-sm leading-relaxed">
                   Berkomitmen untuk menciptakan lingkungan akademik yang tangguh terhadap ancaman digital melalui penguatan infrastruktur dan sistem keamanan proaktif.
                 </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-[#08070d]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 text-center hover:border-cyan-500/40 transition-all duration-500">
                     <div className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8 mx-auto"><Server size={32} className="text-cyan-400" /></div>
                     <h3 className="text-2xl font-black text-white mb-4 uppercase">Infrastruktur</h3>
                     <p className="text-[13px] text-slate-400 leading-relaxed">Membangun arsitektur jaringan sekolah yang terpusat dan tahan terhadap serangan siber.</p>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-[#08070d]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 text-center hover:border-fuchsia-500/40 transition-all duration-500">
                     <div className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8 mx-auto"><ShieldAlert size={32} className="text-fuchsia-400" /></div>
                     <h3 className="text-2xl font-black text-white mb-4 uppercase">Keamanan</h3>
                     <p className="text-[13px] text-slate-400 leading-relaxed">Menerapkan protokol enkripsi dan pemantauan real-time untuk mendeteksi ancaman.</p>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-[#08070d]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 text-center hover:border-emerald-500/40 transition-all duration-500">
                     <div className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8 mx-auto"><BrainCircuit size={32} className="text-emerald-400" /></div>
                     <h3 className="text-2xl font-black text-white mb-4 uppercase">Literasi</h3>
                     <p className="text-[13px] text-slate-400 leading-relaxed">Meningkatkan kesadaran sivitas akademika dalam menjaga keamanan data pribadi.</p>
                  </div>
               </div>
           </section>
        </div>

        <SectionDivider />

        {/* --- HALAMAN 3: VISI MISI (DENGAN BACKGROUND CYBER SINKRON) --- */}
        <VisiMisiSection bgIdx={bgIdx} />

        <SectionDivider />

        {/* --- HALAMAN 4: STATISTIK (UKURAN FULL & MEGA TYPOGRAPHY) --- */}
        <SecurityStatsSection />

        <SectionDivider />

        {/* --- HALAMAN 5: INFRASTRUKTUR (FULL VIDEO BG HACKING) --- */}
        <CyberInfrastructureSection />

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hologram-scan {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-hologram-scan {
          animation: hologram-scan 3s ease-in-out infinite;
        }
        .bg-grid-static {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        ::selection { background: #d946ef; color: white; }
        .perspective-\\[1500px\\] { perspective: 1500px; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #050505 inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; cursor: pointer; }
        input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 0.8; }
      `}} />
    </div>
  );
}