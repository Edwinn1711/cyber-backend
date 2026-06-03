"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Server, Network, Shield,
  Home, Info, FileText, LayoutGrid, Megaphone, HelpCircle, X, ArrowRight, Zap,
  BrainCircuit, ShieldAlert, Cpu, Star, Target, Activity,
  CreditCard, Globe, Key, Bug, Mail, Cloud, Search, Terminal, Eye,
  Facebook, Twitter, Youtube, Instagram, Send, Phone, Globe2,
  Radar, ChevronDown 
} from 'lucide-react'

const CyberIntelligenceHUD = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true); // DEFAULT: Sembunyi (Mewah)

  const triggerGlobalScan = () => {
    setIsScanning(true);
    setProgress(0);
    const fastLogs = [
      "SEARCHING_FOR_MALWARE...", "ANALYZING_PACKET_HEADERS...",
      "DECRYPTING_SSL_HANDSHAKE...", "FIREWALL_STRENGTHENED...",
      "CLEANING_CACHE_BUFFERS...", "UPLINK_STABLE_NODE_DEL"
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < fastLogs.length) {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${fastLogs[i]}`, ...prev].slice(0, 5));
        setProgress(p => p + 20);
        i++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 500);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[10000] hidden lg:block">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* --- MODE SEMBUNYI (HANYA ICON RADAR) --- */
          <motion.button
            key="minimized"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            onClick={() => setIsMinimized(false)}
            className="group relative w-16 h-16 bg-[#050811]/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:border-cyan-400 transition-all"
          >
            <Radar size={24} className="text-cyan-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-ping" />
            {/* Label Tooltip */}
            <div className="absolute left-20 px-4 py-2 bg-black border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
               <p className="text-[10px] font-black text-white tracking-widest">OPEN COMMAND CENTER</p>
            </div>
          </motion.button>
        ) : (
          /* --- MODE FULL HUD (DASHBOARD) --- */
          <motion.div
            key="maximized"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="relative p-6 bg-[#050811]/90 backdrop-blur-2xl border border-cyan-500/30 rounded-[2.5rem] w-[350px] shadow-2xl overflow-hidden"
          >
            {/* Tombol Minimize */}
            <button 
              onClick={() => setIsMinimized(true)}
              className="absolute top-5 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <ChevronDown size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
               <Terminal size={16} className="text-cyan-400" />
               <span className="text-[10px] font-black text-white tracking-[0.4em] uppercase">Intelligence Terminal</span>
            </div>

            <div className="h-[100px] space-y-2 font-mono overflow-hidden mb-6">
              {logs.length === 0 && <p className="text-slate-700 text-[9px] text-center mt-8 uppercase tracking-widest">Waiting for Uplink...</p>}
              {logs.map((log, i) => (
                <p key={i} className={`text-[8px] tracking-tighter ${i === 0 ? 'text-cyan-400' : 'text-slate-600'}`}>{log}</p>
              ))}
            </div>

            <button 
              onClick={triggerGlobalScan}
              disabled={isScanning}
              className={`w-full py-4 rounded-2xl font-black text-[9px] tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-3 ${isScanning ? 'bg-white/5 text-slate-600' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black shadow-xl'}`}
            >
              {isScanning ? 'SYSTEM SCANNING...' : 'Run Diagnostics'} 
              <Zap size={14} className={isScanning ? 'animate-spin' : ''} />
            </button>

            {/* Efek Garis Scanner saat Scan Aktif */}
            {isScanning && <div className="absolute inset-0 bg-cyan-400/5 animate-pulse"><div className="absolute top-0 w-full h-1 bg-cyan-400/50 blur-sm animate-scanner" /></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const CyberMouseHUD = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => (
  <motion.div style={{ x: mouseX, y: mouseY, translateX: 20, translateY: 20 }} className="fixed top-0 left-0 z-[10000] pointer-events-none hidden lg:block">
    <div className="relative">
      <div className="absolute -top-5 -left-5 w-10 h-10 border border-cyan-500/30 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
      <div className="bg-black/40 backdrop-blur-sm border-l-2 border-cyan-500 p-2 ml-6 space-y-1 min-w-[100px] text-left">
         <div className="flex justify-between items-center"><span className="text-[6px] font-mono text-cyan-400 uppercase tracking-tighter">Target_Lock</span><div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" /></div>
         <div className="text-[7px] font-mono text-white/50 leading-none"><p>ID: <span className="text-cyan-400 uppercase">Operative_02</span></p><p>SEC: <span className="text-emerald-500">SAFE</span></p></div>
      </div>
    </div>
  </motion.div>
);

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
    <section id="visi-misi" className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 bg-[#020108] border-t border-white/5 overflow-hidden">      
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

// --- SECTION 6: READYNESS PROTOCOLS (8 GRID) ---
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
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 w-full">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            PROTOKOL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">KESIAPAN SIBER</span> SMA
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm lg:text-base font-medium">Standar operasional perlindungan data sekolah untuk ekosistem belajar yang aman.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {protocols.map((p, i) => (
            <div key={i} className="group relative bg-[#0a0a0f]/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] hover:border-white/20 transition-all duration-500 flex flex-col items-start shadow-2xl">
              <div className="w-full flex justify-between items-center mb-8">
                <span className="text-2xl font-mono font-black text-white/10">{p.num}</span>
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 ${p.col}`}><p.icon size={24} /></div>
              </div>
              <h3 className="text-lg font-black text-white mb-4 uppercase tracking-widest">{p.title}</h3>
              <p className="text-slate-500 text-xs lg:text-[13px] leading-relaxed font-medium">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SECTION 7: CYBER COMMAND FINALE (PENUTUP) ---
const CyberClosingSection = () => (
  <section className="relative w-full min-h-[60vh] flex items-center justify-center py-20 bg-black overflow-hidden border-b border-white/5">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-500/10 rounded-full animate-[ping_10s_linear_infinite] opacity-20" />
    </div>
    <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
      <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
        <Globe2 size={32} className="text-cyan-400 animate-pulse" />
      </div>
      <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-6">
        PERTAHANAN SIBER <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 animate-gradient-x">DI TANGAN ANDA.</span>
      </h2>
      <p className="text-slate-400 max-w-xl mx-auto text-sm font-medium opacity-80 mb-10">Membangun masa depan digital sekolah yang cerdas dan tak tertembus.</p>
      <button className="px-10 py-4 bg-white text-black rounded-full font-black text-[10px] tracking-[0.3em] uppercase hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">AMANKAN SEKOLAH SEKARANG</button>
    </div>
  </section>
);


const CyberFooterLuxury = ({ onScroll }: { onScroll: (id: string, label: string) => void }) => {
  const quickLinks = [
    { name: "BERANDA", id: "hero" },
    { name: "PROFIL", id: "pilar" },
    { name: "SOP SIBER", id: "protocol" },
    { name: "LAYANAN", id: "infra" }
  ];

  return (
    <footer className="relative w-full bg-[#020108] pt-20 pb-10 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        
        {/* --- 1. NEWSLETTER HUD SECTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center pb-16 mb-16 border-b border-white/5 gap-8">
          <div className="text-left">
            <h4 className="text-white font-black text-xs tracking-[0.3em] uppercase mb-2">SYSTEM UPDATE SUBSCRIBE</h4>
            <p className="text-slate-500 text-[10px] font-medium flex items-center gap-2">
              <Mail size={12} className="text-cyan-400" /> Dapatkan laporan intelijen siber terbaru langsung ke email Anda.
            </p>
          </div>
          <div className="relative w-full lg:w-[400px]">
            <input 
              type="email" 
              placeholder="ENTER EMAIL ADDRESS..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-16 text-[10px] font-mono text-cyan-400 focus:border-cyan-500/50 outline-none transition-all"
            />
            <button className="absolute right-2 top-2 bottom-2 px-4 bg-cyan-500 text-black rounded-lg hover:bg-white transition-all">
              <Send size={14} />
            </button>
          </div>
        </div>

        {/* --- 2. MAIN FOOTER CONTENT --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 text-left">
          
          {/* Branding Area */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck size={28} className="text-fuchsia-500" />
              <h3 className="font-black text-white text-xl tracking-tighter uppercase leading-none">CYBER<span className="text-fuchsia-500">READINESS</span></h3>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed font-medium">Pusat pertahanan digital sekolah terintegrasi. Mengamankan kedaulatan digital pendidikan Indonesia.</p>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[9px] tracking-widest uppercase">
              <Activity size={12} /> ALL SYSTEMS OPERATIONAL
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h5 className="text-white font-black text-[10px] tracking-[0.4em] uppercase opacity-40 flex items-center gap-2"><Globe size={12}/> QUICK LINKS</h5>
            <ul className="space-y-3">
              {quickLinks.map((link, j) => (
                <li 
                  key={j} 
                  onClick={() => onScroll(link.id, link.name)}
                  className="text-slate-500 text-[10px] font-bold hover:text-cyan-400 cursor-pointer transition-colors tracking-widest uppercase"
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-6">
            <h5 className="text-white font-black text-[10px] tracking-[0.4em] uppercase opacity-40 flex items-center gap-2"><Phone size={12}/> CONTACT US</h5>
            <ul className="space-y-3">
              <li className="text-slate-500 text-[10px] font-bold hover:text-cyan-400 cursor-pointer transition-colors break-all">devinedwinsiahaan171105@gmail.com</li>
              <li className="text-slate-500 text-[10px] font-bold hover:text-cyan-400 cursor-pointer transition-colors">08887537736</li>
              <li className="text-slate-500 text-[10px] font-bold hover:text-cyan-400 cursor-pointer transition-colors uppercase">HELP CENTER</li>
            </ul>
          </div>

          {/* Location (CLICKABLE MAPS) */}
          <div className="space-y-6">
            <h5 className="text-white font-black text-[10px] tracking-[0.4em] uppercase opacity-40 flex items-center gap-2">
              <MapPin size={12}/> LOCATION
            </h5>
            <div className="relative group">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Institut+Teknologi+Del+Laguboti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block space-y-2 outline-none"
              >
                <div className="text-slate-500 text-[10px] font-bold hover:text-cyan-400 transition-all duration-300 tracking-widest uppercase flex flex-col gap-1">
                  <span className="group-hover:translate-x-1 transition-transform duration-500">INSTITUT TEKNOLOGI DEL</span>
                  <span className="text-slate-600 text-[9px] group-hover:text-cyan-500/70 group-hover:translate-x-2 transition-all duration-700">LAGUBOTI, INDONESIA</span>
                </div>
                <div className="w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-cyan-500/50 via-cyan-500/10 to-transparent transition-all duration-500" />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                   <span className="text-[7px] font-mono text-cyan-600 tracking-widest uppercase">Open in maps</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* --- 3. BOTTOM BAR (SOCIALS & COPYRIGHT) --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6">
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
              <Icon key={i} size={16} className="text-slate-600 hover:text-cyan-400 cursor-pointer transition-all hover:scale-125" />
            ))}
          </div>
          <p className="text-slate-700 text-[8px] font-mono tracking-[0.5em] uppercase">
            © 2026 CYBER READINESS DEFENDING DIGITAL EDUCATION
          </p>
        </div>

      </div>
    </footer>
  );
};

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
    // h-[90px] agar tetap ramping di HP
    <div className="relative w-full h-[90px] lg:h-[130px] overflow-hidden select-none bg-transparent mt-2">
      
      {/* --- MASKING GRADIENT SUPER TIPIS (KHUSUS HP) --- */}
      {/* SISI KIRI: w-6 (24px) di HP agar area tengah luas | w-32 di Laptop */}
      <div className="absolute inset-y-0 left-0 w-6 lg:w-32 bg-gradient-to-r from-[#020108] to-transparent z-10 pointer-events-none" />
      
      {/* SISI KANAN: w-6 di HP | w-32 di Laptop */}
      <div className="absolute inset-y-0 right-0 w-6 lg:w-32 bg-gradient-to-l from-[#020108] to-transparent z-10 pointer-events-none" />
      
      <div className="flex items-center h-full">
        <motion.div 
          className="flex gap-8 lg:gap-20 px-4"
          animate={{ x: [0, -1800] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS].map((node, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, Math.sin(i) * 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="group relative flex-shrink-0 flex flex-col items-center justify-center bg-transparent"
            >
              {/* Orb Lingkaran Ikon Mini */}
              <div className="relative w-9 h-9 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                <div className={`absolute inset-0 rounded-full blur-xl opacity-5 group-hover:opacity-20 ${node.col.replace('text', 'bg')}`} />
                <node.icon 
                  size={20} 
                  className={`${node.col} lg:size-6 drop-shadow-[0_0_8px_currentColor] opacity-70 group-hover:opacity-100 transition-all`} 
                />
              </div>

              {/* Label Teks HUD */}
              <div className="mt-2 text-center pointer-events-none">
                <p className="text-[6px] lg:text-[8px] font-black text-white/30 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
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

const CyberModal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 lg:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl max-h-[85vh] bg-[#050811]/90 border border-cyan-500/20 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)] flex flex-col"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/30 animate-scanner z-50" />
          <div className="flex justify-between items-center p-8 border-b border-white/5 relative z-10 bg-black/20">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-widest">{title}</h2>
            </div>
            <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all"><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 lg:p-12 relative z-10 custom-scrollbar">{children}</div>
          <div className="p-6 border-t border-white/5 text-center bg-black/20">
          <p className="text-[10px] font-mono text-slate-500 tracking-[0.5em] uppercase">Security Protocol Access Authorized</p>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function CyberLandingDark() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [activeSection, setActiveSection] = useState('Beranda');
  const [activeModal, setActiveModal] = useState<'TENTANG KAMI' | 'LAYANAN' | null>(null); // State Modal Baru

  // State Form & Mouse (Sama seperti sebelumnya)
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [inspectedArchitect, setInspectedArchitect] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { mouseX.set((e.clientX / window.innerWidth) - 0.5); mouseY.set((e.clientY / window.innerHeight) - 0.5); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string, label: string) => {
    setActiveSection(label);
    const element = document.getElementById(id);
    if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
  };

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
    <div className="flex flex-col min-h-screen w-full bg-black text-slate-200 overflow-x-hidden selection:bg-cyan-500/30 relative">
      
      {/* 1. LAYER VISUAL GLOBAL */}
      <PersistentUniverse bgIdx={bgIdx} />
      <UltraGodTierParticleSystem />

      {/* 2. HEADER NAVBAR (DENGAN LOGIKA MODAL & SCROLL) */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/5 bg-[#05050a]/80 backdrop-blur-xl shadow-md">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 lg:h-24 flex items-center justify-between">
          
          {/* LOGO AREA */}
          <div className="flex items-center gap-3 lg:gap-4 shrink-0 relative z-[110]">
             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                <ShieldCheck size={24} className="text-fuchsia-400" />
             </div>
             <div className="whitespace-nowrap">
                <h1 className="font-black text-white tracking-widest text-sm lg:text-lg leading-tight uppercase">CYBER<span className="text-fuchsia-500">READINESS</span></h1>
                <p className="text-[8px] lg:text-[10px] text-slate-400 font-bold tracking-[0.3em] uppercase">Cyber Security</p>
             </div>
          </div>

          {/* DESKTOP MENU (KOMBINASI SCROLL & MODAL) */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-12 h-full">
             <button 
                onClick={() => scrollToSection('hero', 'Beranda')}
                className={`relative flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black transition-all ${activeSection === 'Beranda' ? 'text-fuchsia-400' : 'text-slate-500 hover:text-white'}`}
             >
                <Home size={16} /> Beranda
                {activeSection === 'Beranda' && <motion.div layoutId="nav-underline" className="absolute -bottom-8 left-0 right-0 h-[3px] bg-fuchsia-500 rounded-t-full shadow-[0_-2px_10px_#d946ef]" />}
             </button>

             <button 
                onClick={() => setActiveModal('TENTANG KAMI')}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black text-slate-500 hover:text-white transition-all"
             >
                <Info size={16} /> TENTANG KAMI
             </button>

             <button 
                onClick={() => setActiveModal('LAYANAN')}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black text-slate-500 hover:text-white transition-all"
             >
                <HelpCircle size={16} /> Layanan
             </button>
          </nav>

          <div className="flex items-center gap-4 relative z-[110]">
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 px-5 py-2.5 lg:px-8 lg:py-3.5 bg-fuchsia-600 text-white rounded-full font-black text-[10px] lg:text-[11px] tracking-[0.2em] uppercase hover:bg-fuchsia-500 transition-all shadow-lg">
               <User size={16} /> <span className="hidden sm:inline">LOGIN</span>
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl text-white">
              {isMobileMenuOpen ? <X size={24} /> : <LayoutGrid size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 w-full bg-[#05050a]/98 backdrop-blur-2xl border-b border-white/10 py-10 px-6 lg:hidden flex flex-col gap-6 shadow-2xl">
               <div onClick={() => { scrollToSection('hero', 'Beranda'); setIsMobileMenuOpen(false); }} className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 text-slate-300 font-bold text-xs uppercase hover:text-fuchsia-400 transition-all"><Home size={20} /> Beranda</div>
               <div onClick={() => { setActiveModal('TENTANG KAMI'); setIsMobileMenuOpen(false); }} className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 text-slate-300 font-bold text-xs uppercase hover:text-fuchsia-400 transition-all"><Info size={20} /> Tentang Kami</div>
               <div onClick={() => { setActiveModal('LAYANAN'); setIsMobileMenuOpen(false); }} className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 text-slate-300 font-bold text-xs uppercase hover:text-fuchsia-400 transition-all"><HelpCircle size={20} /> Layanan</div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. KONTEN UTAMA */}
      <main className="relative z-10 w-full pt-24 lg:pt-44">
        
        {/* --- HALAMAN 1: HERO --- */}
        <section id="hero" className="relative min-h-[90vh] lg:min-h-[calc(100vh-120px)] flex items-center justify-center w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-12 lg:py-0">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-24 items-center w-full">
            
            {/* Widget Area (Atas di HP) */}
            <div className="relative w-full flex flex-col items-center justify-center order-1 lg:order-2 lg:pt-0 gap-1 lg:gap-6">
              <div className="relative" style={{ perspective: 2000 }}>
                <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] lg:w-[350px] lg:h-[440px] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-[2.5rem] lg:rounded-[3.5rem] p-1 shadow-2xl border border-white/10 flex flex-col items-center justify-center group/card">
                  <div className="relative flex items-center justify-center mb-6 lg:mb-8" style={{ transform: "translateZ(60px)" }}>
                    <div className="absolute w-32 h-32 lg:w-44 lg:h-44 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="w-16 h-16 lg:w-24 lg:h-24 bg-black border border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-xl">
                      <ShieldCheck size={36} className="text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]" />
                    </div>
                  </div>
                  <div className="text-center" style={{ transform: "translateZ(40px)" }}>
                    <h3 className="text-lg lg:text-xl font-black text-white uppercase tracking-[0.1em]">Security <span className="text-cyan-400">System</span></h3>
                    <p className="text-[8px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-1">Cyber Security Active</p>
                  </div>
                  <div className="absolute -bottom-4 lg:-bottom-6 px-8 py-3 bg-black border border-white/5 text-white rounded-xl text-[7px] lg:text-[9px] font-black tracking-[0.4em]" style={{ transform: "translateZ(70px)" }}>ENCRYPTED 2026</div>
                </motion.div>
              </div>
              <div className="w-full max-w-[100vw]"><CyberHiveMarquee /></div>
            </div>

            {/* Teks Area (Bawah di HP) */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-10 w-full order-2 lg:order-1 pt-2 lg:pt-0">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-[9px] lg:text-[10px] font-black tracking-[0.4em] uppercase backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]"/> SECURE PROTOCOL ACTIVE
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] uppercase">KESIAPAN SIBER <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-500 to-cyan-400 animate-gradient-x">Sekolah 2026.</span></h2>
              <p className="text-sm lg:text-lg font-medium text-slate-400 leading-relaxed max-w-xl opacity-80">Platform kesiapan digital sekolah yang mengintegrasikan keamanan tingkat tinggi dengan infrastruktur modern.</p>
              <div className="w-full flex justify-center lg:justify-start">
                <button onClick={() => setIsLoginOpen(true)} className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase transition-all hover:bg-cyan-400 hover:text-white shadow-xl flex items-center justify-center gap-3">
                  Mulai Evaluasi <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
                </button>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* --- HALAMAN LAINNYA --- */}
        <VisiMisiSection bgIdx={bgIdx} />
        <SectionDivider />
        <SecurityStatsSection />
        <SectionDivider />
        <CyberInfrastructureSection />
        <SectionDivider />
        <ReadinessProtocolSection />
        <SectionDivider />
        <CyberClosingSection />
        <CyberMouseHUD mouseX={mouseX} mouseY={mouseY} />
      <CyberIntelligenceHUD />

        {/* FOOTER (DENGAN LOGIKA MODAL) */}
        <CyberFooterLuxury onScroll={(id, label) => {
           if (label === 'TENTANG KAMI') setActiveModal('TENTANG KAMI');
           else if (label === 'LAYANAN') setActiveModal('LAYANAN');
           else scrollToSection(id, label);
        }} />
      </main>

{/* --- MODAL TENTANG KAMI (REVISI TOTAL: DEWA VERSION) --- */}
<CyberModal 
        isOpen={activeModal === 'TENTANG KAMI'} 
        onClose={() => { setActiveModal(null); setInspectedArchitect(null); }} 
        title="COMMAND CENTRE TENTANG KAMI"
      >
        <div className="space-y-12 text-left">
          
          {/* --- PENJELASAN MENDALAM PLATFORM --- */}
          <div className="relative p-8 lg:p-12 rounded-[3rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 border border-white/10 overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-1000 rotate-12">
              <ShieldCheck size={200} />
            </div>
            
            <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-4 mb-2">
                  <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-400 to-fuchsia-500 rounded-full shadow-[0_0_15px_#22d3ee]" />
                  <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter">
                    Mengenal Platform <span className="text-cyan-400">Cyber Readiness</span>
                  </h3>
               </div>

               <div className="space-y-6 text-slate-300 text-sm lg:text-base leading-relaxed font-medium">
                  <p>
                    <span className="text-cyan-400 font-bold">Cyber Readiness</span> adalah platform keamanan siber komprehensif yang dirancang khusus untuk memperkuat ekosistem digital di lingkungan pendidikan sekolah menengah. Platform ini hadir sebagai solusi cerdas atas pesatnya transformasi digital di dunia pendidikan yang seringkali tidak dibarengi dengan sistem perlindungan data yang mumpuni, membuat sekolah rentan terhadap eksploitasi pihak luar.
                  </p>
                  
                  <p>
                    Platform ini dikembangkan karena adanya kesadaran akan meningkatnya ancaman serangan siber global seperti pencurian identitas, peretasan database akademik, serta serangan ransomware yang dapat melumpuhkan seluruh kegiatan belajar mengajar. Kami melihat bahwa sekolah menyimpan aset yang sangat berharga yaitu data generasi masa depan, dan aset tersebut harus dilindungi dengan standar keamanan setara industri militer.
                  </p>

                  <p>
                    Tujuan utama kami adalah membangun kedaulatan digital sekolah yang mandiri, tangguh, dan tak tertembus. Kami berkomitmen untuk memastikan bahwa setiap data pribadi siswa, guru, dan staf tersimpan dalam lingkungan terenkripsi tingkat tinggi. Selain menyediakan alat pemantauan infrastruktur secara real time, platform ini juga berfungsi sebagai pusat edukasi untuk menanamkan budaya kewaspadaan digital bagi seluruh warga sekolah demi terciptanya lingkungan belajar yang cerdas, aman, dan terlindungi.
                  </p>
               </div>
            </div>
          </div>

          {/* --- TIM PENGEMBANG (THE ARCHITECT TRIO) --- */}
          <div className="space-y-10">
            <div className="flex items-center gap-6 justify-center">
               <div className="h-px w-full max-w-[150px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
               <span className="text-[10px] font-black tracking-[0.8em] text-fuchsia-500 uppercase whitespace-nowrap">Authorized Personnel</span>
               <div className="h-px w-full max-w-[150px] bg-gradient-to-l from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  id: "001", 
                  name: "Ester Sinaga", 
                  role: "Project Manager", 
                  image: "/bg/ester.jpeg", 
                  bio: "Lead Project Manager. Bertanggung jawab atas manajemen strategis, koordinasi sumber daya, dan memastikan setiap protokol operasional berjalan sesuai standar keamanan tertinggi.", 
                  col: "fuchsia", 
                  details: { 
                    "Nama Lengkap": "Ester Satia Sinaga",
                    "NIK": "1201036906060001",
                    "NISN": "0069362666",
                    "Lahir": "Sibolga, 29 Jun 2006",
                    "Gol Darah": "Tipe O",
                    "Email": "estersinaga2906@gmail.com"
                  } 
                },
                { 
                  id: "002", 
                  name: "Devin Siahaan", 
                  role: "Web Developer", 
                  image: "/bg/devin.jpeg", // Path ke foto Devin
                  bio: "Lead Developer dan Arsitek Infrastruktur. Spesialis dalam pengembangan sistem enkripsi database dan integrasi kontrol panel siber.", 
                  col: "cyan", 
                  details: { 
                    "Nama Lengkap": "Devin Edwin Frederico Siahaan",
                    "NISN": "9015005904",
                    "Asal": "Medan, 17 Nov 2005",
                    "Gol Darah": "Tipe O",
                    "Email": "devin1711edwin@gmail.com"
                  } 
                },
                { 
                  id: "003", 
                  name: "Iren Sitinjak", 
                  role: "Intelligence Architect", 
                  image: "/bg/iren.jpeg", // Path ke foto Iren
                  bio: "Ahli dalam analisis data intelijen dan perancangan antarmuka pengguna untuk memastikan pengalaman navigasi yang intuitif dan aman.", 
                  col: "violet", 
                  details: { "ID Personel": "IRN 7712", "Status": "Chief Analyst", "Sektor": "User Intelligence" } 
                }
              ].map((member, i) => (
                <motion.div 
                  key={i}
                  layout
                  onClick={() => setInspectedArchitect(inspectedArchitect === member.id ? null : member.id)}
                  className={`group relative cursor-pointer p-1 rounded-[2.5rem] transition-all duration-500 ${inspectedArchitect === member.id ? 'ring-2 ring-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'hover:scale-105'}`}
                >
                  <div className="relative bg-[#08070d] border border-white/5 p-8 rounded-[2.5rem] h-full flex flex-col items-center text-center overflow-hidden shadow-inner">
                    
                    {/* HOLOGRAPHIC AVATAR ENGINE */}
                    <div className="relative w-28 h-28 mb-6">
                      <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${member.col === 'cyan' ? 'bg-cyan-400' : member.col === 'fuchsia' ? 'bg-fuchsia-400' : 'bg-violet-400'}`} />
                      <div className="relative w-full h-full rounded-full border-2 border-white/10 p-1 bg-black/50 overflow-hidden flex items-center justify-center">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-90 group-hover:brightness-110 transition-all duration-700 scale-[1.4] group-hover:scale-[1.2]" 
                            alt={member.name}
                          />
                        ) : (
                          <User size={40} className={member.col === 'cyan' ? 'text-cyan-400' : member.col === 'fuchsia' ? 'text-fuchsia-400' : 'text-violet-400'} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-6 w-full animate-scanner pointer-events-none" />
                      </div>
                      <div className={`absolute inset-[-8px] rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite] ${member.col === 'cyan' ? 'group-hover:border-cyan-500/50' : member.col === 'fuchsia' ? 'group-hover:border-fuchsia-500/50' : 'group-hover:border-violet-500/50'}`} />
                    </div>

                    <h4 className="text-xl font-black text-white uppercase tracking-widest">{member.name}</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${member.col === 'cyan' ? 'text-cyan-400' : member.col === 'fuchsia' ? 'text-fuchsia-400' : 'text-violet-400'}`}>{member.role}</p>

                    <AnimatePresence>
                      {inspectedArchitect === member.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-6 pt-6 border-t border-white/10 w-full text-left">
                          <p className="text-[11px] text-slate-400 leading-relaxed font-medium mb-6 italic">"{member.bio}"</p>
                          <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/5 font-mono text-[9px]">
                             {Object.entries(member.details).map(([key, val], idx) => (
                               <div key={idx} className="flex justify-between border-b border-white/5 pb-2">
                                  <span className="text-slate-500 uppercase">{key}:</span>
                                  <span className="text-white font-bold">{val}</span>
                               </div>
                             ))}
                          </div>
                          <div className="mt-6 flex justify-between items-center px-1">
                             <span className="text-[8px] font-black text-emerald-500 tracking-widest uppercase">Verified Personnel</span>
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- FOOTER MODAL --- */}
          <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-6 text-center">
             <p className="text-[9px] font-mono text-slate-600 tracking-[0.5em] uppercase">Protokol Keamanan Platform Transmisi Data Terenkripsi</p>
             <div className="flex gap-8">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <Icon key={i} size={18} className="text-slate-700 hover:text-cyan-400 transition-all cursor-pointer hover:scale-125" />
                ))}
             </div>
          </div>
        </div>
      </CyberModal>

{/* --- MODAL LAYANAN (REVISI TOTAL: CYBER OPS CENTRE) --- */}
<CyberModal 
        isOpen={activeModal === 'LAYANAN'} 
        onClose={() => setActiveModal(null)} 
        title="PLATFORM CORE CAPABILITIES"
      >
        <div className="space-y-10 text-left">
          
          {/* --- CENTRAL MONITORING HUD --- */}
          <div className="relative p-8 lg:p-12 rounded-[3.5rem] bg-[#050811] border border-cyan-500/20 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.1)] group">
            {/* Laser Scan Animation */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanner z-20" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                   <h3 className="text-2xl lg:text-4xl font-black text-white uppercase tracking-tighter">Command Centre Readiness</h3>
                </div>
                <p className="text-slate-400 text-sm lg:text-base max-w-2xl font-medium leading-relaxed">
                  Platform ini beroperasi sebagai pusat validasi keamanan digital sekolah. Mengintegrasikan audit berkala dengan visualisasi intelijen untuk memastikan kedaulatan data institusi tetap terjaga.
                </p>
              </div>
              <div className="bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-3xl text-right">
                 <p className="text-[10px] font-black text-cyan-400 tracking-[0.4em] uppercase mb-1">Network Status</p>
                 <span className="text-xl font-mono text-white font-bold tracking-tighter">SECURED_UPLINK</span>
              </div>
            </div>
          </div>

          {/* --- GRID 6 PILAR LAYANAN (SANGAT MEWAH) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { t: "Assessment Center", i: Target, d: "Uji kesiapan personil melalui simulasi serangan siber nyata.", col: "cyan" },
              { t: "Intelligence Hub", i: BrainCircuit, d: "Pusat informasi ancaman terbaru untuk literasi siber sekolah.", col: "fuchsia" },
              { t: "Credential Guard", i: ShieldCheck, d: "Audit keamanan akun dan validasi identitas digital ganda.", col: "blue" },
              { t: "Compliance Audit", i: FileText, d: "Penyusunan laporan standar operasional keamanan digital.", col: "emerald" },
              { t: "Infrastructure Monitor", i: Server, d: "Pemantauan visual terhadap stabilitas node jaringan sekolah.", col: "indigo" },
              { t: "Incident Response", i: ShieldAlert, d: "Protokol pelaporan dan mitigasi instan terhadap anomali data.", col: "rose" }
            ].map((item, i) => (
              <div 
                key={i} 
                className="group relative bg-gradient-to-br from-[#0a0c1a] to-[#020108] border border-white/5 p-10 rounded-[3rem] transition-all duration-700 hover:border-cyan-500/40 hover:-translate-y-2 shadow-2xl overflow-hidden"
              >
                {/* HUD Corner Accents */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Ikon dengan Aura Neon */}
                <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-2xl bg-white/5 border border-white/10 group-hover:rotate-45 group-hover:border-cyan-500/30 transition-all duration-700`} />
                  <item.i className={item.col === 'cyan' ? 'text-cyan-400' : item.col === 'fuchsia' ? 'text-fuchsia-400' : item.col === 'blue' ? 'text-blue-400' : item.col === 'emerald' ? 'text-emerald-400' : item.col === 'indigo' ? 'text-indigo-400' : 'text-rose-400'} size={32} />
                </div>

                <div className="space-y-4 relative z-10">
                  <h4 className="text-xl font-black text-white uppercase tracking-widest leading-tight group-hover:text-cyan-400 transition-colors">{item.t}</h4>
                  <p className="text-slate-500 text-[12px] leading-relaxed font-medium">
                    {item.d}
                  </p>
                </div>

                {/* Progress Bar Simulasi */}
                <div className="mt-10 h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                   <motion.div 
                     initial={{ x: "-100%" }}
                     animate={{ x: "100%" }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                     className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
                   />
                </div>
              </div>
            ))}
          </div>

          {/* --- FOOTER MODAL --- */}
          <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-3">
             <p className="text-[10px] font-mono text-slate-600 tracking-[0.5em] uppercase">Authorized Command Interface // No Unauthorized Access</p>
             <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                   <div key={i} className="w-1 h-1 rounded-full bg-cyan-500/20" />
                ))}
             </div>
          </div>
        </div>
      </CyberModal>

{/* --- ULTRA-SMOOTH HOLOGRAPHIC PORTAL (DEWA VERSION) --- */}
<AnimatePresence>
        {isLoginOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              layout // Kunci untuk animasi perubahan ukuran kontainer yang smooth
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-sm bg-[#0a0a0f]/80 border border-white/10 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(217,70,239,0.1)] overflow-hidden"
            >
              {/* Top Scanner Line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_15px_#d946ef]" />

              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-6 right-6 p-2 bg-white/5 text-slate-400 rounded-full hover:bg-white/10 hover:text-white transition-all z-50"
              >
                <X size={18} />
              </button>

              <div className="mx-auto w-14 h-14 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                <ShieldCheck className="text-fuchsia-400" size={28} />
              </div>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">
                  PORTAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-violet-500 animate-gradient-x">AKSES</span>
                </h2>
                <p className="text-[9px] font-bold text-slate-500 tracking-[0.4em] uppercase mt-1">Otentikasi Identitas Jaringan</p>
              </div>

              {/* TABS DENGAN ANIMASI GESER HALUS */}
              <div className="flex border-b border-white/5 mb-8 relative">
                <button 
                  type="button" 
                  onClick={() => { setActiveTab('LOGIN'); setErrorMessage(''); }} 
                  className={`flex-1 pb-3 text-[10px] font-black tracking-widest transition-colors z-10 ${activeTab === 'LOGIN' ? 'text-fuchsia-400' : 'text-slate-600'}`}
                >
                  MASUK
                </button>
                <button 
                  type="button" 
                  onClick={() => { setActiveTab('REGISTER'); setErrorMessage(''); }} 
                  className={`flex-1 pb-3 text-[10px] font-black tracking-widest transition-colors z-10 ${activeTab === 'REGISTER' ? 'text-fuchsia-400' : 'text-slate-600'}`}
                >
                  DAFTAR
                </button>
                {/* Indikator geser (Shared Layout) */}
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 h-[2px] w-1/2 bg-fuchsia-500 shadow-[0_0_10px_#d946ef]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ left: activeTab === 'LOGIN' ? '0%' : '50%' }}
                />
              </div>

              <form onSubmit={handleAuthenticate} className="space-y-5">
                {/* Field yang selalu ada (Username & Password) */}
                <div className="space-y-4">
                  <div className="relative group">
                    <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="NAMA PENGGUNA" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-xs text-white outline-none focus:border-cyan-500/50 transition-all" 
                    />
                  </div>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" />
                    <input 
                      type="password" 
                      placeholder="KATA SANDI" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-xs text-white outline-none focus:border-fuchsia-500/50 transition-all" 
                    />
                  </div>
                </div>

                {/* ANIMASI PEMUNCULAN FIELD REGISTER (SANGAT SMOOTH) */}
                <AnimatePresence initial={false}>
                  {activeTab === 'REGISTER' && (
                    <motion.div 
                      key="register-fields"
                      initial={{ height: 0, opacity: 0, y: -10 }} 
                      animate={{ height: 'auto', opacity: 1, y: 0 }} 
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="overflow-hidden space-y-4"
                    >
                      <div className="relative group">
                        <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
                        <input type="text" placeholder="ASAL / KOTA" value={asal} onChange={(e) => setAsal(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] text-white outline-none focus:border-cyan-500/30" />
                      </div>
                      <div className="relative group">
                        <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
                        <input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} style={{ colorScheme: 'dark' }} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] text-white outline-none focus:border-cyan-500/30" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {status === 'error' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">
                    <AlertTriangle size={14} /> {errorMessage}
                  </motion.div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`w-full py-4 rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${status === 'success' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-500/20'}`}
                >
                   {status === 'loading' ? 'MENYINKRONKAN...' : status === 'success' ? 'BERHASIL' : 'OTENTIKASI SISTEM'} 
                   <Zap size={14} className={status === 'loading' ? 'animate-spin' : ''} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x { 
          0% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; } 
        }
        .animate-gradient-x { 
          background-size: 200% 200%; 
          animation: gradient-x 8s ease-in-out infinite; 
        }


        @keyframes scanner { 
          0% { top: -10%; opacity: 0; } 
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; } 
        }
        .animate-scanner { 
          position: absolute;
          animation: scanner 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; 
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.5) drop-shadow(0 0 10px #22d3ee); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .bg-grid-static { 
          background-image: 
            linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px); 
          background-size: 60px 60px; 
        }

        .scanline-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.1) 50%
          );
          background-size: 100% 4px;
          z-index: 9998;
          pointer-events: none;
          opacity: 0.3;
        }

        ::-webkit-scrollbar { 
          width: 5px; 
        }
        ::-webkit-scrollbar-track { 
          background: #020108; 
        }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(to bottom, #22d3ee, #d946ef); 
          border-radius: 20px; 
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #22d3ee;
        }

        ::selection { 
          background: rgba(34, 211, 238, 0.3); 
          color: #ffffff; 
        }

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px #050505 inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #22d3ee;
          border-radius: 10px;
        }

        .perspective-2000 {
          perspective: 2000px;
        }
      `}} />

    </div>
  );
} 