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
  Facebook, Twitter, Youtube, Instagram, Send, Phone, Globe2
} from 'lucide-react'

// =========================================================================
// 1. KONSTANTA & ASSETS
// =========================================================================
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

const TECH_ICONS = [
  { id: "c1", icon: CreditCard, label: "CARD SEC", col: "text-cyan-400" },
  { id: "c2", icon: ShieldAlert, label: "PHISH HOOK", col: "text-red-400" },
  { id: "c3", icon: Cpu, label: "SHIELD CHIP", col: "text-emerald-400" },
  { id: "c4", icon: Globe, label: "GLOBE LCK", col: "text-blue-400" },
  { id: "c5", icon: Key, label: "KEY VAULT", col: "text-fuchsia-400" },
  { id: "c6", icon: Bug, label: "ANTIVIRUS", col: "text-amber-400" },
  { id: "c7", icon: Terminal, label: "WARN WIN", col: "text-orange-400" },
  { id: "c8", icon: Mail, label: "SECURE MAIL", col: "text-cyan-300" },
];

// =========================================================================
// 2. KOMPONEN PENUNJANG (MODULAR)
// =========================================================================

const UltraGodTierParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let elements: any[] = [];
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);
    resize();
    const explode = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        elements.push({ x: x - rect.left, y: y - rect.top, vx: Math.cos(angle) * 4, vy: Math.sin(angle) * 4, life: 1 });
      }
    };
    const handlePointerDown = (e: PointerEvent) => explode(e.clientX, e.clientY);
    window.addEventListener('pointerdown', handlePointerDown);
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = elements.length - 1; i >= 0; i--) {
        let el = elements[i];
        el.life -= 0.03;
        if (el.life <= 0) { elements.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(el.x += el.vx, el.y += el.vy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 70, 239, ${el.life})`;
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener('pointerdown', handlePointerDown); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none w-full h-full" />;
};

const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#020108]">
    <AnimatePresence mode="wait">
      <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} className="absolute inset-0 w-full h-full object-cover mix-blend-lighten" />
    </AnimatePresence>
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)]" />
  </div>
));
PersistentUniverse.displayName = 'PersistentUniverse';

const CyberDecoration = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none select-none opacity-10 lg:opacity-20 ${className}`}>
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 border border-cyan-500/30 rounded-full animate-pulse" />
      <div className="absolute inset-[40%] bg-cyan-500/10 blur-2xl rounded-full" />
    </div>
  </div>
);

const SectionDivider = () => (
  <div className="relative w-full h-[2px] z-50 overflow-visible">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />
    <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
  </div>
);

const CyberHiveMarquee = () => (
  <div className="relative w-full h-[100px] lg:h-[130px] overflow-hidden select-none bg-transparent mt-2">
    <div className="absolute inset-y-0 left-0 w-6 lg:w-32 bg-gradient-to-r from-[#020108] to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-6 lg:w-32 bg-gradient-to-l from-[#020108] to-transparent z-10 pointer-events-none" />
    <div className="flex items-center h-full">
      <motion.div className="flex gap-12 lg:gap-20 px-10" animate={{ x: [0, -1800] }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}>
        {[...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS].map((node, i) => (
          <motion.div key={i} animate={{ y: [0, Math.sin(i) * 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="group relative flex-shrink-0 flex flex-col items-center">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
              <node.icon size={22} className={`${node.col} drop-shadow-[0_0_8px_currentColor] opacity-60 group-hover:opacity-100`} />
            </div>
            <p className="mt-2 text-[7px] lg:text-[8px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">{node.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

const CyberModal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 lg:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-5xl max-h-[85vh] bg-[#050811]/90 border border-cyan-500/20 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
          <div className="absolute top-0 w-full h-1 bg-cyan-400/30 animate-scanner z-50" />
          <div className="flex justify-between items-center p-8 border-b border-white/5 bg-black/20">
            <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-widest">{title}</h2>
            <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white"><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">{children}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// =========================================================================
// 3. SECTIONS
// =========================================================================

const VisiMisiSection = ({ bgIdx }: { bgIdx: number }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const data = [
    { id: "visi", icon: Star, title: "Visi Kami", desc: "Menjadi ekosistem pendidikan menengah yang tangguh siber, unggul dalam inovasi digital, serta mampu menjadi pelopor keamanan data." },
    { id: "misi", icon: Target, title: "Misi Kami", desc: "Menyelenggarakan infrastruktur digital yang terproteksi, membekali siswa dengan kompetensi siber, dan menanamkan budaya kewaspadaan digital." }
  ];
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 bg-[#020108] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} animate={{ opacity: 0.35 }} transition={{ duration: 1.5 }} className="w-full h-full object-cover mix-blend-lighten" />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <CyberDecoration className="-bottom-20 -right-20" />
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-16 w-full text-center">
        <div className="mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">MEMBANGUN KEDAULATAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 animate-gradient-x">DIGITAL SEKOLAH</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm lg:text-base font-medium opacity-80 leading-relaxed">Mengokohkan kedaulatan digital sekolah melalui integrasi infrastruktur siber yang aman.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" onMouseLeave={() => setHovered(null)}>
          {data.map((item) => (
            <div key={item.id} onMouseEnter={() => setHovered(item.id)} className={`bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 p-10 lg:p-14 rounded-[2.5rem] text-left transition-all duration-500 ${hovered && hovered !== item.id ? 'blur-sm opacity-50' : 'scale-100'}`}>
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 flex items-center justify-center rounded-2xl mb-6 shadow-xl"><item.icon size={28} /></div>
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 uppercase">{item.title}</h3>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed font-medium">{item.desc}</p>
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
    { label: "Uptime Sistem", value: "24/7", color: "text-cyan-400" }
  ];
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 bg-[#030208] border-b border-white/5 overflow-hidden text-center px-10">
      <h2 className="text-3xl lg:text-5xl font-black text-white uppercase mb-20 tracking-tighter">METRIK KETAHANAN <span className="text-fuchsia-500">DIGITAL</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1600px] mx-auto">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#0a0a0f]/60 backdrop-blur-xl p-10 lg:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <div className={`text-4xl lg:text-6xl font-black mb-2 ${s.color}`}>{s.value}</div>
            <div className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CyberInfrastructureSection = () => {
  const sectors = [
    { title: "Firewall", icon: ShieldAlert, desc: "Filtering trafik jaringan sekolah." },
    { title: "Monitoring", icon: Network, desc: "Pemantauan beban bandwidth tiap kelas." },
    { title: "Server", icon: Server, desc: "Manajemen data akademik terenkripsi." },
    { title: "IDS", icon: ScanLine, desc: "Mendeteksi akses ilegal atau upaya peretasan." },
    { title: "Auth", icon: Fingerprint, desc: "Sistem login identitas digital aman." },
    { title: "Backup", icon: Cpu, desc: "Redundansi data mingguan lokal." }
  ];
  return (
    <section id="infra" className="relative w-full min-h-screen flex items-center justify-center py-24 bg-black overflow-hidden border-b border-cyan-500/20">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-100"><source src="/bg/hacking-bg.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] opacity-80" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 w-full text-center">
        <h2 className="text-4xl lg:text-6xl font-black text-white uppercase mb-16 drop-shadow-2xl">MODUL <span className="text-cyan-400">PERTAHANAN</span> SIBER</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((s, i) => (
            <div key={i} className="group relative bg-[#050811]/40 backdrop-blur-2xl border border-cyan-500/10 p-10 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 shadow-2xl">
               <div className="w-14 h-14 bg-cyan-950/30 text-cyan-400 rounded-xl flex items-center justify-center mb-8 mx-auto"><s.icon size={26} /></div>
               <h3 className="text-xl font-black text-white mb-4 uppercase tracking-widest">{s.title}</h3>
               <p className="text-cyan-100/40 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReadinessProtocolSection = () => {
  const protocols = [
    { num: "01", title: "IDENTIFIKASI", icon: ScanLine, col: "text-cyan-400", desc: "Pemetaan risiko jaringan Wi-Fi." },
    { num: "02", title: "PROTEKSI", icon: ShieldCheck, col: "text-blue-400", desc: "Enkripsi data warga sekolah." },
    { num: "03", title: "DETEKSI", icon: Search, col: "text-emerald-400", desc: "Monitoring malware & phishing." },
    { num: "04", title: "RESPON", icon: ShieldAlert, col: "text-red-400", desc: "Mitigasi insiden siber cepat." },
    { num: "05", title: "PEMULIHAN", icon: Cpu, col: "text-fuchsia-400", desc: "Restorasi layanan via backup." },
    { num: "06", title: "EDUKASI", icon: BrainCircuit, col: "text-violet-400", desc: "Pelatihan literasi siber siswa." },
    { num: "07", title: "KEBIJAKAN", icon: FileText, col: "text-indigo-400", desc: "Aturan perlindungan privasi." },
    { num: "08", title: "EVALUASI", icon: Activity, col: "text-orange-400", desc: "Audit sistem berkala." }
  ];
  return (
    <section id="protocol" className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 bg-[#030208]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full text-center">
        <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-20">PROTOKOL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">KESIAPAN SIBER</span> SMA</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {protocols.map((p, i) => (
            <div key={i} className="group relative bg-[#0a0a0f]/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] hover:border-white/20 transition-all shadow-2xl flex flex-col items-start text-left">
              <div className="w-full flex justify-between items-center mb-6">
                <span className="text-2xl font-mono font-black text-white/10">{p.num}</span>
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${p.col}`}><p.icon size={20} /></div>
              </div>
              <h3 className="text-sm font-black text-white mb-2 uppercase tracking-widest">{p.title}</h3>
              <p className="text-slate-500 text-[11px] font-medium leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CyberClosingSection = () => (
  <section className="relative w-full min-h-[70vh] flex items-center justify-center py-20 bg-black overflow-hidden border-b border-white/5 text-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />
    <div className="relative z-10 max-w-[1400px] mx-auto px-6">
      <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"><Globe2 size={32} className="text-cyan-400 animate-pulse" /></div>
      <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">MASA DEPAN SIBER <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 animate-gradient-x">DIMULAI HARI INI.</span></h2>
      <p className="text-slate-400 max-w-xl mx-auto text-sm font-medium opacity-80 mb-10">Lindungi integritas akademik dan kedaulatan data sekolah dengan teknologi pertahanan tingkat tinggi.</p>
      <button className="px-10 py-4 bg-white text-black rounded-full font-black text-[10px] tracking-[0.3em] uppercase transition-all shadow-xl">AMANKAN SEKOLAH SEKARANG</button>
    </div>
  </section>
);

const CyberFooterLuxury = ({ onScroll }: { onScroll: (id: string, label: string) => void }) => (
  <footer className="relative w-full bg-[#020108] pt-20 pb-10 overflow-hidden border-t border-white/5">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2 md:col-span-1 space-y-6">
          <div className="flex items-center gap-3"><ShieldCheck size={28} className="text-fuchsia-500" /><h3 className="font-black text-white text-xl tracking-tighter uppercase leading-none">CYBER<br/>READINESS</h3></div>
          <p className="text-slate-500 text-[11px] font-medium leading-relaxed">Sistem Pertahanan Digital Sekolah Terintegrasi. Laguboti, Indonesia.</p>
        </div>
        <div className="space-y-6">
          <h5 className="text-white font-black text-[10px] tracking-[0.4em] uppercase opacity-40 flex items-center gap-2"><Globe size={12}/> QUICK LINKS</h5>
          <ul className="space-y-3">
            {[{n: "BERANDA", i: "hero"}, {n: "PROFIL", i: "pilar"}, {n: "LAYANAN", i: "infra"}].map((link, j) => (<li key={j} onClick={() => onScroll(link.i, link.n)} className="text-slate-500 text-[10px] font-bold hover:text-cyan-400 cursor-pointer transition-colors tracking-widest uppercase">{link.n}</li>))}
          </ul>
        </div>
        <div className="space-y-6">
          <h5 className="text-white font-black text-[10px] tracking-[0.4em] uppercase opacity-40 flex items-center gap-2"><Phone size={12}/> CONTACT</h5>
          <ul className="space-y-3 text-slate-500 text-[10px] font-bold">
            <li className="hover:text-cyan-400 cursor-pointer">devinedwinsiahaan171105@gmail.com</li>
            <li>08887537736</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h5 className="text-white font-black text-[10px] tracking-[0.4em] uppercase opacity-40 flex items-center gap-2"><MapPin size={12}/> LOCATION</h5>
          <ul className="space-y-2 text-slate-500 text-[10px] font-bold uppercase">
            <li>INSTITUT TEKNOLOGI DEL</li>
            <li className="opacity-60 text-[8px]">LAGUBOTI, INDONESIA</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-6">{[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (<Icon key={i} size={16} className="text-slate-600 hover:text-cyan-400 cursor-pointer transition-all" />))}</div>
        <p className="text-slate-700 text-[8px] font-mono tracking-[0.5em] uppercase">© 2026 CYBER READINESS // DEFENDING DIGITAL EDUCATION</p>
      </div>
    </div>
  </footer>
);

// =========================================================================
// 4. MAIN COMPONENT (EXPORT DEFAULT)
// =========================================================================

export default function CyberLandingDark() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Beranda');
  const [activeModal, setActiveModal] = useState<'PROFIL' | 'LAYANAN' | null>(null);

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
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
    }
  };

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setStatus('error'); setErrorMessage("Data tidak lengkap."); return; }
    setStatus('loading');
    try {
      const res = await fetch(activeTab === 'LOGIN' ? 'https://cyber-backend-delta.vercel.app/login' : 'https://cyber-backend-delta.vercel.app/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeTab === 'LOGIN' ? { username, password } : { username, password, role: 'siswa', class_name: className, asal, tanggal_lahir: tanggalLahir })
      });
      const data = await res.json();
      if (res.ok) { localStorage.setItem('user', JSON.stringify(data)); setStatus('success'); setTimeout(() => router.push(data.role === 'siswa' ? '/siswa' : '/guru'), 1500); }
      else { setStatus('error'); setErrorMessage(data.detail || "Otentikasi gagal."); }
    } catch (e) { setStatus('error'); setErrorMessage("Koneksi terputus."); }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-slate-200 overflow-x-hidden selection:bg-cyan-500/30 relative">
      <PersistentUniverse bgIdx={bgIdx} />
      <UltraGodTierParticleSystem />

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/5 bg-[#05050a]/80 backdrop-blur-xl h-20 lg:h-24 flex items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-3 lg:gap-4"><ShieldCheck size={24} className="text-fuchsia-400" /><div className="whitespace-nowrap"><h1 className="font-black text-white tracking-widest text-sm lg:text-lg uppercase leading-none">CYBER<span className="text-fuchsia-500">READINESS</span></h1><p className="text-[8px] lg:text-[10px] text-slate-400 font-bold tracking-[0.3em] uppercase mt-1">Cyber Security</p></div></div>
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-12 h-full">
          <button onClick={() => scrollToSection('hero', 'Beranda')} className={`relative flex items-center gap-2 text-[11px] font-black uppercase transition-all ${activeSection === 'Beranda' ? 'text-fuchsia-400' : 'text-slate-500 hover:text-white'}`}><Home size={16} /> Beranda {activeSection === 'Beranda' && <motion.div layoutId="nav-underline" className="absolute -bottom-8 left-0 right-0 h-[3px] bg-fuchsia-500 rounded-t-full shadow-[0_0_10px_#d946ef]" />}</button>
          <button onClick={() => setActiveModal('PROFIL')} className="text-[11px] font-black uppercase text-slate-500 hover:text-white transition-all">Profil</button>
          <button onClick={() => setActiveModal('LAYANAN')} className="text-[11px] font-black uppercase text-slate-500 hover:text-white transition-all">Layanan</button>
        </nav>
        <div className="flex gap-4"><button onClick={() => setIsLoginOpen(true)} className="px-5 py-2.5 bg-fuchsia-600 rounded-full font-black text-[10px] uppercase shadow-lg">LOGIN</button><button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 bg-white/5 rounded-xl transition-all active:scale-95"><LayoutGrid size={24} /></button></div>
        <AnimatePresence>{isMobileMenuOpen && (<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 w-full bg-[#05050a]/98 backdrop-blur-3xl py-10 px-6 lg:hidden flex flex-col gap-6 shadow-2xl">{[{ icon: Home, label: 'Beranda', id: 'hero' }, { icon: Info, label: 'Profil', id: 'pilar' }, { icon: HelpCircle, label: 'Layanan', id: 'infra' }].map((item, idx) => (<div key={idx} onClick={() => { if (idx === 0) scrollToSection('hero', 'Beranda'); else setActiveModal(idx === 1 ? 'PROFIL' : 'LAYANAN'); }} className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 text-slate-300 font-bold text-xs uppercase hover:text-fuchsia-400"><item.icon size={20} />{item.label}</div>))}</motion.div>)}</AnimatePresence>
      </header>

      {/* --- CONTENT --- */}
      <main className="relative z-10 w-full pt-24 lg:pt-44">
        <section id="hero" className="relative min-h-screen lg:min-h-[calc(100vh-120px)] flex items-center justify-center w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-12 lg:py-0">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-24 items-center w-full text-center">
            <div className="relative w-full flex flex-col items-center justify-center order-1 lg:order-2 lg:pt-0 gap-1 lg:gap-6">
              <div className="relative" style={{ perspective: 2000 }}><motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] lg:w-[350px] lg:h-[440px] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-[2.5rem] p-1 shadow-2xl border border-white/10 flex flex-col items-center justify-center group/card"><div className="relative flex items-center justify-center mb-6 lg:mb-8" style={{ transform: "translateZ(60px)" }}><div className="absolute w-32 h-32 lg:w-44 lg:h-44 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" /><div className="w-16 h-16 lg:w-24 lg:h-24 bg-black border border-cyan-500/30 rounded-3xl flex items-center justify-center"><ShieldCheck size={36} className="text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]" /></div></div><div className="text-center" style={{ transform: "translateZ(40px)" }}><h3 className="text-lg lg:text-xl font-black text-white uppercase">Security System</h3></div><div className="absolute -bottom-4 lg:-bottom-6 px-8 py-3 bg-black border border-white/5 text-white rounded-xl text-[7px] lg:text-[9px] font-black" style={{ transform: "translateZ(70px)" }}>ENCRYPTED 2026</div></motion.div></div>
              <div className="w-full max-w-[100vw]"><CyberHiveMarquee /></div>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-10 w-full order-2 lg:order-1 pt-2 lg:pt-0">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-[9px] font-black uppercase backdrop-blur-md">SECURE PROTOCOL ACTIVE</div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] uppercase">Kesiapan Siber <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-500 to-cyan-400 animate-gradient-x">Sekolah 2026.</span></h2>
              <p className="text-sm lg:text-lg font-medium text-slate-400 opacity-80">Platform kesiapan digital sekolah terintegrasi dengan infrastruktur modern.</p>
              <button onClick={() => setIsLoginOpen(true)} className="px-10 py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase shadow-xl flex items-center gap-3">MULAI EVALUASI <ArrowRight size={18} /></button>
            </div>
          </div>
        </section>

        <SectionDivider />
        <section id="pilar" className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 bg-[#030208] border-b border-white/5 overflow-hidden text-center px-10"><div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full"><h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-20"><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Pilar Strategis</span> Kami</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">{[ { t: "Infrastruktur", i: Server, c: "text-cyan-400", d: "Arsitektur jaringan sekolah terpusat." }, { t: "Keamanan", i: ShieldAlert, c: "text-fuchsia-400", d: "Protokol enkripsi real-time." }, { t: "Literasi", i: BrainCircuit, c: "text-emerald-400", d: "Kesadaran keamanan data pribadi." } ].map((item, i) => (<div key={i} className="group bg-[#08070d]/80 border border-white/5 p-12 lg:p-16 rounded-[3rem] hover:border-white/20 transition-all duration-700 hover:-translate-y-2 shadow-2xl flex flex-col items-center"><div className="w-16 h-16 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8 mx-auto"><item.i size={32} className={`${item.c}`} /></div><h3 className="text-xl lg:text-2xl font-black text-white mb-4 uppercase">{item.t}</h3><p className="text-sm text-slate-400">{item.d}</p></div>))}</div></div></section>
        <SectionDivider /><VisiMisiSection bgIdx={bgIdx} />
        <SectionDivider /><SecurityStatsSection />
        <SectionDivider /><section id="infra"><CyberInfrastructureSection /></section>
        <SectionDivider /><section id="protocol"><ReadinessProtocolSection /></section>
        <SectionDivider /><CyberClosingSection />
        <CyberFooterLuxury onScroll={scrollToSection} />
      </main>

      {/* --- MODALS --- */}
      <CyberModal isOpen={activeModal === 'PROFIL'} onClose={() => setActiveModal(null)} title="Identity // Profil Sekolah">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-left items-center"><div className="space-y-6"><h3 className="text-2xl font-black text-cyan-400 uppercase">Visi Kedaulatan Digital</h3><p className="text-slate-400 font-medium">Membangun ekosistem pendidikan yang tangguh siber melalui integrasi teknologi pertahanan terkini.</p><div className="p-6 bg-white/5 border border-white/10 rounded-3xl"><h4 className="text-fuchsia-400 font-bold mb-3 uppercase text-xs">Misi Operasional</h4><ul className="text-xs text-slate-500 space-y-3 font-mono"><li>[PROTECT] Database warga sekolah end-to-end.</li><li>[MONITOR] Implementasi firewall perbatasan 24/7.</li></ul></div></div><div className="rounded-[2.5rem] overflow-hidden border border-cyan-500/20 bg-black/40 relative aspect-video flex items-center justify-center"><BrainCircuit size={100} className="text-cyan-400 opacity-10 absolute" /><img src="/bg/cyber1.jpg" className="w-full h-full object-cover opacity-40 mix-blend-overlay" /></div></div>
      </CyberModal>
      <CyberModal isOpen={activeModal === 'LAYANAN'} onClose={() => setActiveModal(null)} title="Services // Protokol Layanan">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 text-left">{[ { t: "Traffic Filter", i: ShieldAlert, d: "Monitoring masuk-keluar data" }, { t: "IDS / IPS", i: Activity, d: "Deteksi intrusi otomatis" }, { t: "Data Backup", i: Cpu, d: "Redundansi mingguan" }, { t: "Encryption", i: Lock, d: "AES-256 Bit Data Lock" }, { t: "Auth 2FA", i: Fingerprint, d: "Identitas digital ganda" }, { t: "Audit", i: ScanLine, d: "Pengecekan sistem berkala" } ].map((item, i) => (<div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-cyan-400/40 transition-all group"><item.i className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform" size={24} /><h4 className="text-white font-black text-xs uppercase mb-2">{item.t}</h4><p className="text-[10px] text-slate-500">{item.d}</p></div>))}</div>
      </CyberModal>

      {/* --- MODAL LOGIN --- */}
      <AnimatePresence>{isLoginOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"><motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-sm bg-[#0a0a0f]/95 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"><div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" /><button onClick={() => setIsLoginOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-all"><X size={16} /></button><div className="mx-auto w-12 h-12 border border-fuchsia-500/50 rounded-2xl flex items-center justify-center mb-6 shadow-xl"><ShieldCheck className="text-fuchsia-400" size={24} /></div><div className="mb-8 text-center"><h2 className="text-2xl font-black text-white uppercase mb-1">PORTAL <span className="text-fuchsia-500">AKSES</span></h2></div><form onSubmit={handleAuthenticate} className="space-y-4 pt-4"><input type="text" placeholder="USER" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white outline-none focus:border-fuchsia-500" /><input type="password" placeholder="PASS" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white outline-none focus:border-fuchsia-500" /><button type="submit" disabled={status === 'loading'} className={`w-full py-4 rounded-2xl font-black text-xs uppercase shadow-lg transition-all ${status === 'success' ? 'bg-emerald-500' : 'bg-fuchsia-600 hover:bg-fuchsia-500'}`}>{status === 'loading' ? 'VERIFIKASI...' : status === 'success' ? 'BERHASIL' : 'OTENTIKASI'} <Zap size={14} className="inline ml-2" /></button></form></motion.div></motion.div>)}</AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 5s ease infinite; }
        @keyframes scanner { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scanner { animation: scanner 3s linear infinite; }
        .bg-grid-static { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 60px 60px; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020108; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #22d3ee, #d946ef); border-radius: 10px; }
      `}} />

    </div>
  );
}