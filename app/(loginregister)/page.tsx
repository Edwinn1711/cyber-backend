"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, MapPin, Calendar, CheckCircle2, XCircle, Database, Server } from 'lucide-react'

// --- ASSET GALAXY HD ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- BACKGROUND BERSIH ELEGAN & STABIL (TANPA GOYANG/ZOOM) ---
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
  
  // State Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isInjecting, setIsInjecting] = useState(false);

  // ====================================================================
  // LOGIKA 3D PARALLAX TILT (KARTU BERGOYANG MENGIKUTI KURSOR/TOUCH)
  // ====================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX / window.innerWidth - 0.5;
      const y = e.touches[0].clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  // ====================================================================
  // FUNGSI RAHASIA: INJECT 50 AKUN KE DATABASE MYSQL SUNGGUHAN
  // ====================================================================
  const handleInjectDatabase = async () => {
    if (!window.confirm("DEVELOPER MODE: Apakah Anda yakin ingin meng-inject 50 akun (ce325001-050) ke database MySQL?")) return;
    
    setIsInjecting(true);
    let successCount = 0;

    for (let i = 1; i <= 50; i++) {
      const uname = `ce325${i.toString().padStart(3, '0')}`;
      const cls = AVAILABLE_CLASSES[i % AVAILABLE_CLASSES.length];

      try {
        const res = await fetch('https://cyber-backend-delta.vercel.app/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: uname,
            password: "123",
            role: "siswa",
            class_name: cls,
            asal: "SISTEM INJEKSI",
            tanggal_lahir: "2005-01-01"
          })
        });
        
        if (res.ok) {
          successCount++;
          console.log(`Akun ${uname} berhasil disimpan ke MySQL.`);
        }
      } catch (error) {
        console.error(`Gagal menyimpan akun ${uname}. Server mati?`);
      }
    }

    setIsInjecting(false);
    alert(`INJEKSI SELESAI! Berhasil menyimpan ${successCount} dari 50 akun ke Database MySQL. Silakan cek phpMyAdmin Anda.`);
  };

  // ====================================================================
  // FUNGSI LOGIN / REGISTER NORMAL
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
    const uname = username.trim(); // Dibiarkan apa adanya (tidak dipaksa uppercase) agar case-sensitive aman

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
      
      if (res.ok && (data.success || data.username)) {
        const role = data.role || data.user?.role || 'siswa';
        const userObj = { username: uname, class_name: className, role: role };
        localStorage.setItem('user', JSON.stringify(userObj));
        
        setStatus('success');
        setTimeout(() => router.push(role === 'guru' ? '/guru' : '/siswa'), 1500);
      } else {
        setErrorMessage(data.message || data.detail || "Autentikasi gagal. Akses ditolak.");
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setErrorMessage("Koneksi ke peladen (Backend) terputus.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black text-slate-200 overflow-hidden font-sans selection:bg-fuchsia-500/30 relative perspective-[1200px]">
      <PersistentUniverse bgIdx={bgIdx} />

      {/* --- TOMBOL RAHASIA DEVELOPER UNTUK INJECT DATABASE --- */}
      <div className="absolute top-8 right-8 z-50">
        <button 
          onClick={handleInjectDatabase}
          disabled={isInjecting}
          className="flex items-center gap-3 px-4 py-2 bg-black/80 border border-fuchsia-500/30 rounded-full hover:bg-fuchsia-500/20 hover:border-fuchsia-500 transition-all backdrop-blur-md group"
          title="Klik untuk membuat 50 akun otomatis ke database MySQL"
        >
          {isInjecting ? (
            <Server size={16} className="text-fuchsia-400 animate-pulse" />
          ) : (
            <Database size={16} className="text-slate-400 group-hover:text-fuchsia-400" />
          )}
          <span className="text-[9px] font-black tracking-widest text-slate-400 group-hover:text-white uppercase hidden md:block">
            {isInjecting ? "MENYUNTIKKAN KE MYSQL..." : "INJECT 50 AKUN KE DB"}
          </span>
        </button>
      </div>

      {/* Ornamen Teks Kiri Bawah */}
      <div className="absolute bottom-8 left-8 z-0 hidden md:flex items-center gap-4">
        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-md">
           <span className="font-bold text-white text-xs">N</span>
        </div>
        <div>
          <p className="text-[9px] font-black text-fuchsia-500 tracking-[0.4em] uppercase">KONEKSI AMAN AKTIF</p>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">CYBER EDU V2.1</p>
        </div>
      </div>

      {/* Ornamen Teks Kanan Bawah */}
      <div className="absolute bottom-8 right-8 text-right z-0 hidden md:block">
        <p className="text-[9px] font-bold text-slate-500 tracking-[0.3em] uppercase">CLIENT IP: https://cyber-backend-delta.vercel.app</p>
        <p className="text-[9px] font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">CONNECTION: SECURE (AES 256)</p>
      </div>

      {/* KARTU LOGIN UTAMA - 3D PARALLAX EFFECT */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-sm mx-4 bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.9)] my-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 blur-[100px] rounded-full pointer-events-none" style={{ transform: "translateZ(-50px)" }} />

        <div className="mx-auto w-12 h-12 bg-transparent border border-fuchsia-500/50 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(217,70,239,0.15)]" style={{ transform: "translateZ(30px)" }}>
          <ShieldCheck className="text-fuchsia-400" size={24} />
        </div>

        <div style={{ transform: "translateZ(40px)" }}>
          <h1 className="text-3xl font-black text-center text-white tracking-widest uppercase mb-2">
            CYBER<span className="text-fuchsia-500">EDU</span>
          </h1>
          <p className="text-[8px] font-bold text-slate-500 tracking-[0.4em] uppercase text-center mb-10">
            Sistem Evaluasi & Pembelajaran Siber
          </p>
        </div>

        <div className="flex border-b border-white/10 mb-8 relative" style={{ transform: "translateZ(20px)" }}>
          <button 
            type="button"
            onClick={() => { setActiveTab('LOGIN'); setErrorMessage(''); }} 
            className={`flex-1 pb-3 text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${activeTab === 'LOGIN' ? 'text-fuchsia-400' : 'text-slate-600 hover:text-slate-400'}`}
          >
            MASUK
          </button>
          <button 
            type="button"
            onClick={() => { setActiveTab('REGISTER'); setErrorMessage(''); }} 
            className={`flex-1 pb-3 text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${activeTab === 'REGISTER' ? 'text-fuchsia-400' : 'text-slate-600 hover:text-slate-400'}`}
          >
            DAFTAR BARU
          </button>
          <div className={`absolute bottom-0 h-[2px] w-1/2 bg-fuchsia-500 transition-transform duration-300 shadow-[0_0_10px_#d946ef] ${activeTab === 'LOGIN' ? 'translate-x-0' : 'translate-x-full'}`} />
        </div>

        <form onSubmit={handleAuthenticate} className="space-y-4" style={{ transform: "translateZ(30px)" }}>
          
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors">
               <User size={16} />
            </div>
            <input 
              type="text" 
              placeholder="NAMA PENGGUNA" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={status === 'loading' || status === 'success' || isInjecting}
              className="w-full bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-all disabled:opacity-50 shadow-inner" 
            />
          </div>

          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors">
               <Lock size={16} />
            </div>
            <input 
              type="password" 
              placeholder="KATA SANDI" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={status === 'loading' || status === 'success' || isInjecting}
              className="w-full bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-all disabled:opacity-50 shadow-inner" 
            />
          </div>

          <AnimatePresence>
            {activeTab === 'REGISTER' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }} 
                className="space-y-4 overflow-hidden"
              >
                <div className="relative group mt-4">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10">
                     <MapPin size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="ASAL / KOTA" 
                    value={asal}
                    onChange={(e) => setAsal(e.target.value)}
                    disabled={status === 'loading' || status === 'success' || isInjecting}
                    className="w-full bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-all disabled:opacity-50 shadow-inner uppercase" 
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10">
                     <Calendar size={16} />
                  </div>
                  <input 
                    type="date" 
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    disabled={status === 'loading' || status === 'success' || isInjecting}
                    style={{ colorScheme: 'dark' }}
                    className="w-full bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-all disabled:opacity-50 shadow-inner uppercase" 
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                     <Fingerprint size={16} />
                  </div>
                  <select 
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    disabled={status === 'loading' || status === 'success' || isInjecting}
                    className="w-full bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-slate-300 tracking-widest focus:border-fuchsia-500 outline-none transition-all appearance-none disabled:opacity-50 cursor-pointer uppercase shadow-inner"
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
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tracking-widest uppercase">
                 <AlertTriangle size={14} className="shrink-0" /> {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={status === 'loading' || status === 'success' || isInjecting}
            className={`w-full mt-4 py-4 rounded-[1.2rem] font-black text-[10px] tracking-[0.4em] text-white transition-all flex items-center justify-center gap-3 uppercase overflow-hidden relative ${status === 'success' ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-fuchsia-600 hover:bg-fuchsia-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] disabled:opacity-50 disabled:cursor-not-allowed'}`}
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