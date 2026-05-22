"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, MapPin, Calendar, CheckCircle2 } from 'lucide-react'

const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. EFEK KLIK (Sama Persis seperti di Dashboard Siswa) ---
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);
  
  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      // Mendapatkan posisi kursor PC atau sentuhan Jari HP
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

    // Deteksi Mouse dan Layar Sentuh (Touchscreen)
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

const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.4 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 2, ease: "easeInOut" }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-static opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

export default function CyberLoginGateway() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ====================================================================
  // LOGIKA 3D SANGAT RESPONSIF (TIDAK DELAY)
  // ====================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 800, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 800, damping: 40 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
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
    <div className="flex items-center justify-center min-h-screen w-full bg-black text-slate-200 overflow-hidden font-sans selection:bg-fuchsia-500/30 relative perspective-[1200px]">
      <PersistentUniverse bgIdx={bgIdx} />
      
      {/* 2. PARTIKEL DI PANGGIL DI SINI */}
      <ParticleBurstClickEffect />

      <div className="absolute bottom-8 left-8 z-10 hidden md:flex items-center gap-4 pointer-events-none">
        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-md">
           <span className="font-bold text-white text-xs">N</span>
        </div>
        <div>
          <p className="text-[9px] font-black text-fuchsia-500 tracking-[0.4em] uppercase">KONEKSI AMAN AKTIF</p>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">CYBER READINESS INDEX</p>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 text-right z-10 hidden md:block pointer-events-none">
        <p className="text-[9px] font-bold text-slate-500 tracking-[0.3em] uppercase">CLIENT IP: DETECTED</p>
        <p className="text-[9px] font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">CONNECTION: SECURE (AES 256)</p>
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative z-30 w-full ${activeTab === 'REGISTER' ? 'max-w-[450px]' : 'max-w-sm'} mx-4 bg-[#050505]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.9)] transition-all duration-300`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 blur-[100px] rounded-full pointer-events-none" style={{ transform: "translateZ(-50px)" }} />

        <div className="mx-auto w-12 h-12 bg-transparent border border-fuchsia-500/50 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(217,70,239,0.15)]" style={{ transform: "translateZ(60px)" }}>
          <ShieldCheck className="text-fuchsia-400" size={24} />
        </div>

        <div style={{ transform: "translateZ(50px)" }}>
          <h1 className="text-3xl font-black text-center text-white tracking-widest uppercase mb-2">
            CYBER<span className="text-fuchsia-500">READINESS</span>
          </h1>
          <p className="text-[8px] font-bold text-slate-500 tracking-[0.4em] uppercase text-center mb-10">
            INDEX PLATFORM
          </p>
        </div>

        <div className="flex border-b border-white/10 mb-8 relative" style={{ transform: "translateZ(30px)" }}>
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
          <div className={`absolute bottom-0 h-[2px] w-1/2 bg-fuchsia-500 transition-transform shadow-[0_0_10px_#d946ef] ${activeTab === 'LOGIN' ? 'translate-x-0' : 'translate-x-full'}`} />
        </div>

        <form onSubmit={handleAuthenticate} className="space-y-4" style={{ transform: "translateZ(40px)" }}>
          
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
                     <Fingerprint size={16} />
                  </div>
                  <select 
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-slate-300 tracking-widest focus:border-fuchsia-500 outline-none transition-colors appearance-none disabled:opacity-50 cursor-pointer uppercase shadow-inner"
                  >
                    {AVAILABLE_CLASSES.map(cls => (
                      <option key={cls} value={cls} className="bg-black text-white">{cls}</option>
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
            className={`w-full relative z-20 mt-4 py-4 rounded-[1.2rem] font-black text-[10px] tracking-[0.4em] text-white transition-colors flex items-center justify-center gap-3 uppercase overflow-hidden ${status === 'success' ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-fuchsia-600 hover:bg-fuchsia-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] disabled:opacity-50 disabled:cursor-not-allowed'}`}
          >
             {status === 'loading' && <span className="animate-pulse">MEMVERIFIKASI...</span>}
             {status === 'success' && <><CheckCircle2 size={14} /> AKSES DIBERIKAN</>}
             {status !== 'loading' && status !== 'success' && (
               <>OTENTIKASI <ScanLine size={14} /></>
             )}
          </button>
        </form>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-static {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        input, select { caret-color: #d946ef; }
        ::selection { background: #d946ef; color: white; }
        .perspective-\\[1200px\\] {
          perspective: 1200px;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #050505 inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            opacity: 0.5;
            cursor: pointer;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
            opacity: 0.8;
        }
      `}} />
    </div>
  );
}