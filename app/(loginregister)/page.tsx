"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, School, Network, Server 
} from 'lucide-react'

const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. EFEK KLIK PARTIKEL (TEMA BIRU/CYAN) ---
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

// --- 2. BACKGROUND SEKOLAH DIGITAL (CERAH & BERSIH) ---
const AcademicTechBackground = React.memo(() => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50">
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
      
      {/* Grid Infrastruktur Digital (Garis tipis abu-abu) */}
      <div className="absolute inset-0 bg-grid-light opacity-[0.4] pointer-events-none" />
      
      {/* Gradien pemudar bawah agar tidak terlalu ramai */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-100 pointer-events-none" />
    </div>
  );
});
AcademicTechBackground.displayName = 'AcademicTechBackground';

export default function CyberLoginGateway() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ====================================================================
  // LOGIKA 3D HOVER (TETAP ADA AGAR KEREN)
  // ====================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 800, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 800, damping: 40 });

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

  // ====================================================================
  // FUNGSI OTENTIKASI
  // ====================================================================
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
    <div className="flex items-center justify-center min-h-screen w-full bg-slate-50 text-slate-800 overflow-hidden font-sans selection:bg-blue-500/30 relative perspective-[1200px]">
      
      {/* KOMPONEN BACKGROUND TERANG */}
      <AcademicTechBackground />
      
      {/* EFEK KLIK */}
      <ParticleBurstClickEffect />

      {/* ORNAMEN KIRI BAWAH (TEMA AKADEMIK) */}
      <div className="absolute bottom-8 left-8 z-10 hidden md:flex items-center gap-4 pointer-events-none">
        <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg">
           <School className="text-blue-600" size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase">INFRASTRUKTUR DIGITAL SEKOLAH</p>
          <p className="text-[11px] font-bold text-slate-500 tracking-[0.1em] mt-1">Portal Evaluasi Ketahanan Siber</p>
        </div>
      </div>

      {/* ORNAMEN KANAN BAWAH (STATUS KONEKSI) */}
      <div className="absolute bottom-8 right-8 text-right z-10 hidden md:block pointer-events-none">
        <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase flex items-center justify-end gap-2"><Network size={14} className="text-emerald-500"/> KONEKSI JARINGAN: AMAN</p>
        <p className="text-[9px] font-bold text-slate-400 tracking-[0.3em] uppercase mt-1">ENKRIPSI DATA: AES-256 GCM</p>
      </div>

      {/* KOTAK LOGIN (TEMA PUTIH BERSIH) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative z-30 w-full ${activeTab === 'REGISTER' ? 'max-w-[500px]' : 'max-w-md'} mx-4 bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] p-10 lg:p-12 shadow-[0_20px_60px_rgba(59,130,246,0.15)]`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" style={{ transform: "translateZ(-50px)" }} />

        {/* Logo Icon */}
        <div className="mx-auto w-16 h-16 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-center mb-6 shadow-inner" style={{ transform: "translateZ(60px)" }}>
          <ShieldCheck className="text-blue-600" size={32} />
        </div>

        {/* Judul Teks */}
        <div style={{ transform: "translateZ(50px)" }} className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-black text-center text-slate-800 tracking-tight leading-tight mb-2">
            CYBER<span className="text-blue-600">READINESS</span> INDEX
          </h1>
          <p className="text-[11px] font-bold text-slate-500 text-center leading-relaxed px-4">
            Mengkaji Tingkat Ketahanan Siber Lingkungan Sekolah Melalui Infrastruktur Digital.
          </p>
        </div>

        {/* Tab Switcher (Masuk / Daftar) */}
        <div className="flex border-b border-slate-200 mb-8 relative" style={{ transform: "translateZ(30px)" }}>
          <button 
            type="button"
            onClick={() => { setActiveTab('LOGIN'); setErrorMessage(''); }} 
            className={`flex-1 pb-4 text-[11px] font-black tracking-[0.2em] uppercase transition-colors ${activeTab === 'LOGIN' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            MASUK PORTAL
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

        {/* Form Inputs */}
        <form onSubmit={handleAuthenticate} className="space-y-5" style={{ transform: "translateZ(40px)" }}>
          
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
              className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-[1.2rem] py-4 pl-14 pr-4 text-[13px] font-bold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50" 
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
              className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-[1.2rem] py-4 pl-14 pr-4 text-[13px] font-bold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50" 
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
                      className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-[1.2rem] py-4 pl-11 pr-3 text-[12px] font-bold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50 uppercase" 
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
                      className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-[1.2rem] py-4 pl-11 pr-3 text-[12px] font-bold text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50 uppercase" 
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
                    className="w-full relative z-20 bg-slate-50 border border-slate-200 rounded-[1.2rem] py-4 pl-14 pr-4 text-[13px] font-bold text-slate-800 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none cursor-pointer uppercase"
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
            className={`w-full relative z-20 mt-6 py-5 rounded-[1.2rem] font-black text-[11px] tracking-[0.2em] text-white transition-all flex items-center justify-center gap-3 uppercase overflow-hidden shadow-lg ${status === 'success' ? 'bg-emerald-500 shadow-emerald-500/40' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'}`}
          >
             {status === 'loading' && <span className="animate-pulse">Memverifikasi Data...</span>}
             {status === 'success' && <><CheckCircle2 size={18} /> Akses Diberikan</>}
             {status !== 'loading' && status !== 'success' && (
               <>Login Ke Sistem <ScanLine size={16} /></>
             )}
          </button>
        </form>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* CSS Untuk background jaring tipis khas institusi */
        .bg-grid-light {
          background-image: 
            linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        /* Pewarnaan seleksi teks */
        ::selection { background: #3b82f6; color: white; }
        
        .perspective-\\[1200px\\] {
          perspective: 1200px;
        }

        /* Styling spesifik untuk autofill di mode terang */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #f8fafc inset !important;
            -webkit-text-fill-color: #1e293b !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        /* Kursor kalender agar warna pas */
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