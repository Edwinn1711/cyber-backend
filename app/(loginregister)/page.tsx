"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Server, Network, Shield,
  Home, Info, FileText, LayoutGrid, Megaphone, HelpCircle, X, ArrowRight, Zap,
  BrainCircuit, ShieldAlert, Cpu
} from 'lucide-react'

// --- ASSET BACKGROUND ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. EFEK KLIK PARTIKEL ULTRA GOD-TIER (PRESISI 100%) ---
const UltraGodTierParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let elements: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);
    resize();

    const explode = (x: number, y: number) => {
      elements.push({ type: 'core', x, y, radius: 0, alpha: 1, speed: 2 });
      elements.push({ type: 'shockwave', x, y, radius: 0, alpha: 0.8, speed: 6, width: 2, color: '56, 189, 248' }); 
      elements.push({ type: 'shockwave', x, y, radius: 0, alpha: 0.5, speed: 3, width: 1, color: '217, 70, 239' }); 

      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        const velocity = Math.random() * 5 + 3;
        elements.push({
          type: 'spark', x, y,
          vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity,
          life: 1, color: Math.random() > 0.5 ? '217, 70, 239' : '56, 189, 248'
        });
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      explode(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = 'screen'; 

      for (let i = elements.length - 1; i >= 0; i--) {
        let el = elements[i];
        if (el.type === 'core') {
          el.radius += el.speed; el.alpha -= 0.1;
          if (el.alpha <= 0) { elements.splice(i, 1); continue; }
          ctx.beginPath(); ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${el.alpha})`; ctx.fill();
        } 
        else if (el.type === 'shockwave') {
          el.radius += el.speed; el.alpha -= 0.04;
          if (el.alpha <= 0) { elements.splice(i, 1); continue; }
          ctx.beginPath(); ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${el.color}, ${el.alpha})`; ctx.lineWidth = el.width * el.alpha; ctx.stroke();
        } 
        else if (el.type === 'spark') {
          el.x += el.vx; el.y += el.vy; el.life -= 0.05;
          if (el.life <= 0) { elements.splice(i, 1); continue; }
          ctx.beginPath(); ctx.moveTo(el.x, el.y);
          ctx.lineTo(el.x - el.vx * 1.5, el.y - el.vy * 1.5);
          ctx.strokeStyle = `rgba(${el.color}, ${el.life})`; ctx.lineWidth = 2; ctx.stroke();
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none" />;
};

// --- 2. BACKGROUND CYBER (TRANSISI SMOOTH & JELAS) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.02 }} 
          animate={{ opacity: 0.4, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 2.5, ease: "easeInOut" }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten" 
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-static opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

export default function CyberLandingFinal() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 400, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Input tidak valid."); setStatus('error');
      setTimeout(() => setStatus('idle'), 3000); return;
    }
    setStatus('loading');
    try {
      const endpoint = activeTab === 'LOGIN' ? 'https://cyber-backend-delta.vercel.app/login' : 'https://cyber-backend-delta.vercel.app/register';
      const bodyData = activeTab === 'LOGIN' 
        ? { username: username.trim(), password } 
        : { username: username.trim(), password, role: 'siswa', class_name: className, asal, tanggal_lahir: tanggalLahir };
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyData) });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data)); setStatus('success');
        const role = data.role || 'siswa';
        setTimeout(() => router.push(role === 'guru' || role === 'admin' ? '/guru' : '/siswa'), 1500);
      } else {
        setErrorMessage(data.detail || "Gagal."); setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (e) { setErrorMessage("Koneksi gagal."); setStatus('error'); setTimeout(() => setStatus('idle'), 3000); }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-slate-200 overflow-x-hidden selection:bg-fuchsia-500/30 relative">
      
      <PersistentUniverse bgIdx={bgIdx} />
      <UltraGodTierParticleSystem />

      {/* ========================================================================= */}
      {/* NAVBAR (FIXED LAYOUT: LOGO KIRI, MENU TENGAH, LOGIN KANAN)                */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl h-24">
        <div className="w-full h-full flex items-center px-10 lg:px-20">
          
          {/* SISI KIRI: LOGO (Diberi flex-1 agar mendorong menu ke tengah) */}
          <div className="flex-1 flex items-center gap-5">
             <div className="w-12 h-12 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.3)] shrink-0">
                <ShieldCheck size={28} className="text-fuchsia-400" />
             </div>
             <div className="hidden sm:block">
                <h1 className="font-black text-white tracking-widest text-lg leading-none uppercase">CYBER<span className="text-fuchsia-500">READINESS</span></h1>
                <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase mt-1">Infrastruktur Del</p>
             </div>
          </div>

          {/* SISI TENGAH: MENU (Diberi gap lebar agar tidak rapat) */}
          <nav className="hidden lg:flex items-center justify-center gap-12">
             {[ 
               { icon: Home, label: 'Beranda', active: true }, { icon: Info, label: 'Profil' }, 
               { icon: LayoutGrid, label: 'Organisasi' }, { icon: FileText, label: 'Berita' }, 
               { icon: Megaphone, label: 'Pengumuman' }, { icon: HelpCircle, label: 'Layanan' } 
             ].map((item, idx) => (
               <div key={idx} className="relative flex flex-col items-center justify-center group cursor-pointer h-24 whitespace-nowrap">
                  <div className={`flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] font-black transition-all ${item.active ? 'text-fuchsia-400' : 'text-slate-500 group-hover:text-white'}`}>
                    <item.icon size={15} className={item.active ? "text-fuchsia-500" : "text-slate-600 group-hover:text-fuchsia-400"} />
                    {item.label}
                  </div>
                  {item.active && <div className="absolute bottom-0 w-full h-[3px] bg-fuchsia-500 rounded-t-md shadow-[0_0_15px_#d946ef]" />}
               </div>
             ))}
          </nav>

          {/* SISI KANAN: LOGIN (Diberi flex-1 agar mendorong menu ke tengah) */}
          <div className="flex-1 flex justify-end">
            <button 
               onClick={() => setIsLoginOpen(true)}
               className="flex items-center gap-3 px-10 py-3.5 bg-fuchsia-600 text-white rounded-full font-black text-[12px] tracking-[0.2em] uppercase hover:bg-fuchsia-500 transition-all shadow-[0_0_25px_rgba(217,70,239,0.4)] hover:-translate-y-1"
            >
               <User size={18} /> LOGIN
            </button>
          </div>
          
        </div>
      </header>

      {/* ========================================================================= */}
      {/* KONTEN UTAMA (Diberi pt-44 agar sangat lega dari Navbar)                   */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full pt-44">
        
        <section className="min-h-[calc(100vh-96px)] w-full max-w-[1440px] mx-auto px-10 lg:px-20">
           
           {/* BADGE "SECURE CONNECTION" (Sangat Lega & Keren) */}
           <div className="mb-16 flex justify-center lg:justify-start">
             <div className="inline-flex items-center gap-3 px-8 py-3.5 bg-white/5 border border-white/10 text-slate-300 rounded-full text-[9px] font-black tracking-[0.5em] uppercase shadow-lg backdrop-blur-md">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#34d399]"/> SECURE CONNECTION ACTIVE
             </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10 text-center lg:text-left">
                 <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[1] uppercase drop-shadow-2xl">
                   Kesiapan Siber <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400">Sekolah 2026.</span>
                 </h2>
                 <p className="text-base lg:text-lg font-bold text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                   Sistem evaluasi ketahanan digital terpadu untuk lingkungan Institut Teknologi Del melalui infrastruktur yang aman.
                 </p>
                 <button onClick={() => setIsLoginOpen(true)} className="px-14 py-5 bg-fuchsia-600 text-white rounded-2xl font-black text-[12px] tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:bg-fuchsia-500 transition-all flex items-center justify-center gap-3 mx-auto lg:mx-0">MULAI EVALUASI <ArrowRight size={20}/></button>
              </div>

              {/* Card 3D Terpusat Rapi */}
              <div className="hidden lg:flex items-center justify-center" style={{ perspective: 1500 }}>
                 <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-full max-w-[420px] aspect-square bg-[#05050a]/90 backdrop-blur-3xl rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-white/10 flex flex-col items-center justify-center">
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/20 blur-[100px] rounded-full" />
                       <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500 shadow-[0_0_30px_#d946ef] animate-hologram-scan opacity-60" />
                    </div>
                    <div className="relative flex items-center justify-center mb-10">
                       <div className="absolute w-52 h-52 border-[2.5px] border-dashed border-fuchsia-500/30 rounded-full animate-[spin_15s_linear_infinite]" />
                       <div className="w-36 h-36 bg-black border-2 border-fuchsia-500/50 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(217,70,239,0.4)] relative z-10">
                          <ShieldCheck size={72} className="text-fuchsia-400 drop-shadow-[0_0_20px_#d946ef]" />
                       </div>
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-widest uppercase text-center relative z-10" style={{ transform: "translateZ(50px)" }}>Sistem<br/>Keamanan</h3>
                    <div className="absolute -bottom-6 w-[90%] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white py-4 rounded-full text-[11px] font-black tracking-[0.5em] text-center shadow-2xl border border-white/20" style={{ transform: "translateZ(100px)" }}>TERINTEGRASI 2026</div>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* SECTION 2: PILAR STRATEGIS (LEBIH BESAR & BERJARAK) */}
        <div className="relative w-full bg-[#030208] border-t border-white/10 z-20 pb-44 pt-32 mt-32">
           <section className="max-w-[1440px] mx-auto px-10 lg:px-20 relative z-10">
               <div className="text-center mb-28">
                 <h2 className="text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-8"><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">Pilar Strategis</span> Kami</h2>
                 <p className="text-slate-400 max-w-3xl mx-auto font-medium text-lg leading-relaxed">Membangun ekosistem digital yang tangguh dan terproteksi secara berlapis.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
                  {[ 
                    { icon: Server, title: "Infrastruktur", color: "text-cyan-400", desc: "Arsitektur jaringan sekolah terpusat dan aman." },
                    { icon: ShieldAlert, title: "Keamanan", color: "text-fuchsia-400", desc: "Pemantauan real-time dan deteksi ancaman instan." },
                    { icon: BrainCircuit, title: "Literasi", color: "text-emerald-400", desc: "Edukasi siber berkelanjutan bagi seluruh sivitas." }
                  ].map((p, i) => (
                    <div key={i} className="bg-[#08070d]/80 border border-white/5 rounded-[3rem] p-12 text-center shadow-2xl hover:border-white/20 transition-all duration-500 hover:-translate-y-3">
                       <div className="w-24 h-24 bg-black border border-white/10 rounded-full flex items-center justify-center mb-10 mx-auto"><p.icon size={44} className={p.color} /></div>
                       <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">{p.title}</h3>
                       <p className="text-slate-400 text-sm leading-relaxed font-medium">{p.desc}</p>
                    </div>
                  ))}
               </div>
           </section>
        </div>
      </div>

      {/* --- MODAL LOGIN POPUP --- */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`relative w-full ${activeTab === 'REGISTER' ? 'max-w-[450px]' : 'max-w-sm'} bg-[#0a0a0f]/95 border border-white/10 rounded-[3rem] p-12 shadow-2xl overflow-hidden`}>
              <button onClick={() => setIsLoginOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-all"><X size={24} /></button>
              <div className="mx-auto w-16 h-16 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-2xl flex items-center justify-center mb-8 shadow-inner"><ShieldCheck className="text-fuchsia-400" size={32} /></div>
              <h2 className="text-2xl font-black text-white text-center uppercase mb-10 tracking-widest">PORTAL <span className="text-fuchsia-500">LOGIN</span></h2>
              <form onSubmit={handleAuthenticate} className="space-y-6">
                <input type="text" placeholder="NAMA PENGGUNA" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black border border-white/5 rounded-2xl py-4.5 px-7 text-[13px] font-bold text-white outline-none focus:border-fuchsia-500 transition-all shadow-inner" />
                <input type="password" placeholder="KATA SANDI" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-white/5 rounded-2xl py-4.5 px-7 text-[13px] font-bold text-white outline-none focus:border-fuchsia-500 transition-all shadow-inner" />
                <button type="submit" className="w-full py-4.5 bg-fuchsia-600 text-white rounded-2xl font-black text-[13px] tracking-[0.3em] uppercase hover:bg-fuchsia-500 shadow-2xl transition-all mt-4">MASUK SISTEM</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hologram-scan { 0% { top: -10%; opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.6; } 100% { top: 110%; opacity: 0; } }
        .animate-hologram-scan { animation: hologram-scan 4s ease-in-out infinite; }
        .bg-grid-static { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 60px 60px; }
      `}} />
    </div>
  );
}