"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, School, Network, Server,
  Home, Info, FileText, LayoutGrid, Megaphone, HelpCircle, X, ArrowRight, Shield, Zap
} from 'lucide-react'

// --- ASSET BACKGROUND ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. EFEK KLIK PARTIKEL (TEMA FUCHSIA/UNGU NEON) ---
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);
  
  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Math.random(), 
        x: clientX, 
        y: clientY, 
        angle: (Math.PI * 2 / 8) * i, 
        velocity: Math.random() * 50 + 20
      }));
      
      setParticles(prev => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 800);
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    
    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div 
            key={p.id} 
            initial={{ scale: 0, opacity: 1, x: p.x, y: p.y }} 
            animate={{ 
              scale: [0, 1.2, 0], 
              opacity: [1, 0.5, 0], 
              x: p.x + Math.cos(p.angle) * p.velocity, 
              y: p.y + Math.sin(p.angle) * p.velocity 
            }} 
            transition={{ duration: 0.8 }} 
            className="absolute rounded-full bg-fuchsia-400 shadow-[0_0_15px_#d946ef]" 
            style={{ width: '4px', height: '4px', top: '-2px', left: '-2px' }} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. BACKGROUND CYBER (GELAP & TRANSISI SMOOTH) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020108]">
      {/* Gambar Latar Belakang (Transisi sangat halus) */}
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
      
      {/* Efek Cahaya Ungu/Indigo Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vh] bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Overlay Hitam & Grid agar UI mudah dibaca */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-static opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

export default function CyberLandingDark() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Kontrol Modal Login
  
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
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 800, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 800, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Rotasi Background Gambar Setiap 5 Detik
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
    <div className="flex flex-col min-h-screen w-full bg-black text-slate-200 overflow-hidden font-sans selection:bg-fuchsia-500/30 relative perspective-[1200px]">
      
      {/* 1. BACKGROUND CYBER */}
      <PersistentUniverse bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* ========================================================================= */}
      {/* 2. NAVBAR (HEADER GELAP ELEGAN)                                           */}
      {/* ========================================================================= */}
      <header className="relative z-20 w-full border-b border-white/5 bg-[#05050a]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Kiri: Logo */}
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                <ShieldCheck size={24} className="text-fuchsia-400" />
             </div>
             <div>
                <h1 className="font-black text-white tracking-widest text-sm lg:text-base leading-tight">CYBER<span className="text-fuchsia-500">READINESS</span></h1>
                <p className="text-[9px] text-slate-400 font-bold tracking-[0.3em] uppercase mt-0.5">Infrastruktur Del</p>
             </div>
          </div>

          {/* Tengah: Menu Navigasi */}
          <nav className="hidden lg:flex items-center gap-8">
             {[ 
               { icon: Home, label: 'Beranda', active: true }, 
               { icon: Info, label: 'Profil', active: false }, 
               { icon: LayoutGrid, label: 'Organisasi', active: false }, 
               { icon: FileText, label: 'Berita', active: false }, 
               { icon: Megaphone, label: 'Pengumuman', active: false }, 
               { icon: HelpCircle, label: 'Layanan', active: false } 
             ].map((item, idx) => (
               <div key={idx} className="relative flex flex-col items-center justify-center group cursor-pointer h-20">
                  <div className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black transition-colors ${item.active ? 'text-fuchsia-400' : 'text-slate-500 group-hover:text-white'}`}>
                    <item.icon size={14} className={item.active ? "text-fuchsia-500" : "text-slate-600 group-hover:text-fuchsia-400"} />
                    {item.label}
                  </div>
                  {/* Garis Bawah Glow */}
                  {item.active && <div className="absolute bottom-0 w-full h-[2px] bg-fuchsia-500 rounded-t-md shadow-[0_0_10px_#d946ef]" />}
               </div>
             ))}
          </nav>

          {/* Kanan: Tombol Login */}
          <button 
             onClick={() => setIsLoginOpen(true)}
             className="flex items-center gap-3 px-6 py-2.5 bg-fuchsia-600 text-white rounded-full font-black text-[10px] tracking-[0.2em] uppercase hover:bg-fuchsia-500 transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] hover:-translate-y-0.5"
          >
             <User size={16} /> Akses Portal
          </button>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO SECTION (KONTEN UTAMA LANDING PAGE)                               */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-0">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            
            {/* Teks Kiri */}
            <div className="space-y-8 text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-lg backdrop-blur-md">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"/> SECURE CONNECTION ACTIVE
               </div>
               
               <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight uppercase drop-shadow-2xl">
                 Kesiapan Siber <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400">Sekolah 2026.</span>
               </h2>
               
               <p className="text-sm lg:text-base font-bold text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                 Platform ini dirancang untuk mengkaji tingkat ketahanan siber di lingkungan Institut Teknologi Del melalui penyediaan infrastruktur digital yang aman dan terintegrasi secara penuh.
               </p>

               {/* Tombol Aksi */}
               <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                 <button onClick={() => setIsLoginOpen(true)} className="w-full sm:w-auto px-10 py-4 bg-fuchsia-600 text-white rounded-[1.2rem] font-black text-[11px] tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:bg-fuchsia-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition-all flex items-center justify-center gap-3">
                    Mulai Evaluasi <ArrowRight size={16}/>
                 </button>
                 <button className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 text-slate-300 rounded-[1.2rem] font-black text-[11px] tracking-[0.3em] uppercase hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-3">
                    Pelajari Modul
                 </button>
               </div>

               {/* Ikon Infrastruktur */}
               <div className="pt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  {[ 
                    { icon: Shield, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' }, 
                    { icon: Server, color: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10 shadow-[0_0_15px_rgba(217,70,239,0.2)]' }, 
                    { icon: Network, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' }, 
                    { icon: Fingerprint, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]' } 
                  ].map((feat, i) => (
                    <div key={i} className={`w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all hover:-translate-y-1 hover:scale-105 cursor-pointer ${feat.color}`}>
                       <feat.icon size={24} />
                    </div>
                  ))}
               </div>
            </div>

            {/* Grafis Kanan (Card 3D Cyber) */}
            <motion.div 
               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
               className="hidden lg:flex items-center justify-center"
            >
               <div className="relative w-full max-w-md aspect-square bg-[#05050a]/80 backdrop-blur-2xl rounded-[3rem] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.9)] border border-white/10 flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none" style={{ transform: "translateZ(-50px)" }} />
                  
                  <div className="w-32 h-32 bg-transparent border border-fuchsia-500/50 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.2)] mb-8 relative z-10" style={{ transform: "translateZ(60px)" }}>
                     <ShieldCheck size={64} className="text-fuchsia-400" />
                  </div>
                  
                  <h3 className="text-3xl font-black text-white tracking-widest uppercase text-center relative z-10" style={{ transform: "translateZ(40px)" }}>
                    Sistem<br/>Keamanan
                  </h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] text-center mt-3 relative z-10" style={{ transform: "translateZ(20px)" }}>
                    Infrastruktur Del
                  </p>
                  
                  <div className="absolute -bottom-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-3 rounded-full text-[10px] font-black tracking-[0.4em] shadow-[0_0_20px_rgba(217,70,239,0.5)] border border-white/10" style={{ transform: "translateZ(50px)" }}>
                    TERINTEGRASI 2026
                  </div>
               </div>
            </motion.div>

         </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. MODAL LOGIN (MUNCUL JIKA TOMBOL LOGIN DITEKAN)                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full ${activeTab === 'REGISTER' ? 'max-w-[450px]' : 'max-w-sm'} bg-[#0a0a0f]/95 border border-white/10 rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,1)] overflow-hidden`}
            >
              {/* Garis gradien di atas card */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" />

              {/* Tombol Close */}
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-6 right-6 p-2 bg-white/5 text-slate-400 rounded-full hover:bg-white/10 hover:text-white transition-all border border-white/5"
              >
                <X size={16} />
              </button>

              <div className="mx-auto w-12 h-12 bg-transparent border border-fuchsia-500/50 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                <ShieldCheck className="text-fuchsia-400" size={24} />
              </div>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">
                  PORTAL <span className="text-fuchsia-500">AKSES</span>
                </h2>
                <p className="text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                  Otentikasi Identitas Jaringan
                </p>
              </div>

              <div className="flex border-b border-white/10 mb-8 relative">
                <button 
                  type="button"
                  onClick={() => { setActiveTab('LOGIN'); setErrorMessage(''); }} 
                  className={`flex-1 pb-3 text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${activeTab === 'LOGIN' ? 'text-fuchsia-400' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  MASUK
                </button>
                <button 
                  type="button"
                  onClick={() => { setActiveTab('REGISTER'); setErrorMessage(''); }} 
                  className={`flex-1 pb-3 text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${activeTab === 'REGISTER' ? 'text-fuchsia-400' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  DAFTAR BARU
                </button>
                <div className={`absolute bottom-0 h-[2px] w-1/2 bg-fuchsia-500 transition-transform duration-300 shadow-[0_0_10px_#d946ef] ${activeTab === 'LOGIN' ? 'translate-x-0' : 'translate-x-full'}`} />
              </div>

              <form onSubmit={handleAuthenticate} className="space-y-4">
                
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                     <User size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="NAMA PENGGUNA" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-colors disabled:opacity-50 shadow-inner" 
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                     <Lock size={16} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="KATA SANDI" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-colors disabled:opacity-50 shadow-inner" 
                  />
                </div>

                <AnimatePresence>
                  {activeTab === 'REGISTER' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      className="space-y-4 pt-2 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                             <MapPin size={14} />
                          </div>
                          <input 
                            type="text" 
                            placeholder="ASAL / KOTA" 
                            value={asal}
                            onChange={(e) => setAsal(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-10 pr-3 text-[10px] md:text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-colors disabled:opacity-50 shadow-inner uppercase" 
                          />
                        </div>

                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                             <Calendar size={14} />
                          </div>
                          <input 
                            type="date" 
                            value={tanggalLahir}
                            onChange={(e) => setTanggalLahir(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            style={{ colorScheme: 'dark' }}
                            className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-10 pr-3 text-[10px] md:text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-colors disabled:opacity-50 shadow-inner uppercase" 
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                           <Server size={16} />
                        </div>
                        <select 
                          value={className}
                          onChange={(e) => setClassName(e.target.value)}
                          disabled={status === 'loading' || status === 'success'}
                          className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-slate-300 tracking-widest focus:border-fuchsia-500 outline-none transition-colors appearance-none cursor-pointer uppercase shadow-inner"
                        >
                          {AVAILABLE_CLASSES.map(cls => (
                            <option key={cls} value={cls} className="bg-black">{cls}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tracking-widest uppercase relative z-20">
                       <AlertTriangle size={14} className="shrink-0" /> {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full relative z-20 mt-4 py-4 rounded-[1.2rem] font-black text-[10px] tracking-[0.4em] text-white transition-colors flex items-center justify-center gap-3 uppercase overflow-hidden shadow-lg ${status === 'success' ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.4)] disabled:opacity-50 disabled:cursor-not-allowed'}`}
                >
                   {status === 'loading' && <span className="animate-pulse">MEMVERIFIKASI...</span>}
                   {status === 'success' && <><CheckCircle2 size={16} /> AKSES DIBERIKAN</>}
                   {status !== 'loading' && status !== 'success' && (
                     <>OTENTIKASI <Zap size={14} /></>
                   )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-static {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        ::selection { background: #d946ef; color: white; }
        .perspective-\\[1200px\\] { perspective: 1200px; }
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