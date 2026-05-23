"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, School, Network, Server,
  Home, Info, FileText, LayoutGrid, Megaphone, HelpCircle, X, ArrowRight, Shield
} from 'lucide-react'

// --- ASSET GALAXY HD (Akan ditampilkan secara samar di background) ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. EFEK KLIK PARTIKEL (TEMA BIRU) ---
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
        velocity: Math.random() * 40 + 20
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
            className="absolute rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" 
            style={{ width: '6px', height: '6px', top: '-3px', left: '-3px' }} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. BACKGROUND SEKOLAH DIGITAL DENGAN GAMBAR ROTASI ---
const AcademicTechBackground = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50">
      {/* Gambar berotasi yang smooth */}
      <AnimatePresence mode="wait">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.05 }} 
          animate={{ opacity: 0.15, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 2, ease: "easeInOut" }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale-[30%]" 
        />
      </AnimatePresence>
      
      {/* Overlay Putih Kaca (Glassmorphism) agar teks jelas */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-slate-50/95 pointer-events-none" />
      
      {/* Efek Cahaya / Blob Biru Terang */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vh] bg-cyan-400/20 blur-[140px] rounded-full pointer-events-none" 
      />
      
      {/* Grid Infrastruktur Digital */}
      <div className="absolute inset-0 bg-grid-light opacity-[0.3] pointer-events-none" />
    </div>
  );
});
AcademicTechBackground.displayName = 'AcademicTechBackground';

export default function LandingPage() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // STATE UNTUK BUKA/TUTUP MODAL LOGIN
  
  // States Modal Login
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // 3D Tilt Effect
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
      setErrorMessage("Nama pengguna dan kata sandi wajib diisi.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    if (activeTab === 'REGISTER' && (!asal || !tanggalLahir)) {
      setErrorMessage("Data Asal dan Tanggal Lahir wajib diisi.");
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
        setErrorMessage(data.detail || "Autentikasi gagal.");
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
    <div className="flex flex-col min-h-screen w-full bg-slate-50 text-slate-800 overflow-hidden font-sans selection:bg-blue-500/30 relative perspective-[1200px]">
      
      <AcademicTechBackground bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* --- NAVBAR (HEADER) --- */}
      <header className="relative z-20 w-full border-b border-slate-200/60 bg-white/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo Kiri */}
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                <ShieldCheck size={24} className="text-white" />
             </div>
             <div>
                <h1 className="font-black text-lg text-slate-800 leading-none tracking-tight">CYBER<span className="text-blue-600">READINESS</span></h1>
                <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Infrastruktur Sekolah</p>
             </div>
          </div>

          {/* Menu Navigasi Tengah (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
             {[ 
               { icon: Home, label: 'Beranda' }, 
               { icon: Info, label: 'Profil' }, 
               { icon: LayoutGrid, label: 'Organisasi' }, 
               { icon: FileText, label: 'Berita' }, 
               { icon: Megaphone, label: 'Pengumuman' }, 
               { icon: HelpCircle, label: 'Layanan' } 
             ].map((item, idx) => (
               <a key={idx} href="#" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors group">
                  <item.icon size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" /> {item.label}
               </a>
             ))}
          </nav>

          {/* Tombol Login Kanan */}
          <button 
             onClick={() => setIsLoginOpen(true)}
             className="flex items-center gap-3 px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5"
          >
             <User size={16} /> Login Portal
          </button>
        </div>
      </header>

      {/* --- HERO SECTION (KONTEN UTAMA) --- */}
      <main className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-0">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            
            {/* Teks Kiri */}
            <div className="space-y-8 text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black tracking-widest uppercase shadow-sm border border-blue-200">
                 Selamat Datang di Portal Evaluasi
               </div>
               
               <h2 className="text-5xl lg:text-7xl font-black text-slate-800 tracking-tighter leading-[1.1]">
                 Kesiapan Siber <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Sekolah 2026.</span>
               </h2>
               
               <p className="text-base lg:text-lg font-medium text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                 Platform ini dirancang khusus untuk mengkaji dan mengevaluasi tingkat ketahanan siber di lingkungan institusi pendidikan melalui penyediaan infrastruktur digital yang aman dan terintegrasi.
               </p>

               {/* Tombol Aksi */}
               <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                 <button onClick={() => setIsLoginOpen(true)} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                    Mulai Evaluasi <ArrowRight size={18}/>
                 </button>
                 <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm tracking-wide shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-3">
                    Pelajari Modul
                 </button>
               </div>

               {/* Ikon Fitur (Mirip Logo Organisasi di Gambar) */}
               <div className="pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-5">
                  {[ 
                    { icon: Shield, color: 'bg-indigo-100 text-indigo-600' }, 
                    { icon: Server, color: 'bg-blue-100 text-blue-600' }, 
                    { icon: Network, color: 'bg-cyan-100 text-cyan-600' }, 
                    { icon: Fingerprint, color: 'bg-emerald-100 text-emerald-600' } 
                  ].map((feat, i) => (
                    <div key={i} className={`w-14 h-14 rounded-full flex items-center justify-center ${feat.color} shadow-sm border border-white`}>
                       <feat.icon size={24} />
                    </div>
                  ))}
               </div>
            </div>

            {/* Grafis Kanan (Gambar 3D / Logo) */}
            <motion.div 
               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
               className="hidden lg:flex items-center justify-center"
            >
               <div className="relative w-full max-w-md aspect-square bg-white rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(59,130,246,0.15)] border border-slate-100 flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-[3rem] opacity-50" />
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-8 relative z-10 transform translate-z-12" style={{ transform: "translateZ(40px)" }}>
                     <ShieldCheck size={64} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight text-center relative z-10" style={{ transform: "translateZ(30px)" }}>
                    Sistem Keamanan
                  </h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] text-center mt-2 relative z-10" style={{ transform: "translateZ(20px)" }}>
                    Infrastruktur Del
                  </p>
                  
                  {/* Pita dekorasi mirip gambar */}
                  <div className="absolute -bottom-6 bg-slate-800 text-white px-8 py-3 rounded-full text-xs font-black tracking-widest shadow-xl" style={{ transform: "translateZ(50px)" }}>
                    TERINTEGRASI 2026
                  </div>
               </div>
            </motion.div>

         </div>
      </main>

      {/* --- MODAL LOGIN / REGISTER --- */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full ${activeTab === 'REGISTER' ? 'max-w-[500px]' : 'max-w-md'} bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.2)]`}
            >
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-6 right-6 p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-all"
              >
                <X size={20} />
              </button>

              <div className="mx-auto w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <ShieldCheck className="text-blue-600" size={28} />
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-black text-center text-slate-800 tracking-tight leading-tight mb-2">
                  Portal Autentikasi
                </h2>
                <p className="text-xs font-bold text-slate-500 text-center px-4">
                  Masuk ke Sistem Evaluasi Ketahanan Siber
                </p>
              </div>

              <div className="flex border-b border-slate-200 mb-8 relative">
                <button 
                  type="button"
                  onClick={() => { setActiveTab('LOGIN'); setErrorMessage(''); }} 
                  className={`flex-1 pb-4 text-[11px] font-black tracking-[0.2em] uppercase transition-colors ${activeTab === 'LOGIN' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  MASUK
                </button>
                <button 
                  type="button"
                  onClick={() => { setActiveTab('REGISTER'); setErrorMessage(''); }} 
                  className={`flex-1 pb-4 text-[11px] font-black tracking-[0.2em] uppercase transition-colors ${activeTab === 'REGISTER' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  DAFTAR BARU
                </button>
                <div className={`absolute bottom-0 h-[3px] w-1/2 bg-blue-600 rounded-t-md transition-transform duration-300 ${activeTab === 'LOGIN' ? 'translate-x-0' : 'translate-x-full'}`} />
              </div>

              <form onSubmit={handleAuthenticate} className="space-y-5">
                
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none">
                     <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Nama Pengguna" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-[13px] font-bold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50" 
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none">
                     <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="Kata Sandi" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-[13px] font-bold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50" 
                  />
                </div>

                <AnimatePresence>
                  {activeTab === 'REGISTER' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      className="space-y-5 pt-2 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none">
                             <MapPin size={16} />
                          </div>
                          <input 
                            type="text" 
                            placeholder="Asal / Kota" 
                            value={asal}
                            onChange={(e) => setAsal(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-11 pr-3 text-[12px] font-bold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50 uppercase" 
                          />
                        </div>

                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none">
                             <Calendar size={16} />
                          </div>
                          <input 
                            type="date" 
                            value={tanggalLahir}
                            onChange={(e) => setTanggalLahir(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-11 pr-3 text-[12px] font-bold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50 uppercase" 
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10 pointer-events-none">
                           <Server size={18} />
                        </div>
                        <select 
                          value={className}
                          onChange={(e) => setClassName(e.target.value)}
                          disabled={status === 'loading' || status === 'success'}
                          className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-[13px] font-bold text-slate-800 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none cursor-pointer uppercase"
                        >
                          {AVAILABLE_CLASSES.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[11px] font-bold tracking-widest uppercase relative z-20">
                       <AlertTriangle size={16} className="shrink-0" /> {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full relative z-20 mt-6 py-4 rounded-2xl font-black text-[12px] tracking-wide text-white transition-all flex items-center justify-center gap-3 uppercase overflow-hidden shadow-lg ${status === 'success' ? 'bg-emerald-500 shadow-emerald-500/40' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'}`}
                >
                   {status === 'loading' && <span className="animate-pulse">Memverifikasi Data...</span>}
                   {status === 'success' && <><CheckCircle2 size={18} /> Akses Diberikan</>}
                   {status !== 'loading' && status !== 'success' && (
                     <>Masuk Ke Portal <ScanLine size={16} /></>
                   )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-light {
          background-image: 
            linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        ::selection { background: #3b82f6; color: white; }
        .perspective-\\[1200px\\] { perspective: 1200px; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #f8fafc inset !important;
            -webkit-text-fill-color: #1e293b !important;
            transition: background-color 5000s ease-in-out 0s;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: 0.5;
            cursor: pointer;
            filter: none;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
            opacity: 0.8;
        }
      `}} />
    </div>
  );
}