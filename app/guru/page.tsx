"use client"
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, LogOut, ShieldAlert, Activity, 
  RefreshCcw, Search, LayoutDashboard, 
  Brain, Bug, MailWarning, 
  MessageSquare, Send, X, Hexagon, Sparkles, GraduationCap, Terminal,
  ChevronLeft, ChevronRight, Trash2, Database, Radar, Target, Lightbulb, User, Eye, Info, Zap, Globe, Cpu
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
  PieChart, Pie
} from 'recharts'

// --- ASSET GALAXY HD ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// =========================================================================
// 1. CLICK EFFECT (HOLOGRAPHIC PARTICLES)
// =========================================================================
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const handleInteraction = (e: any) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      const numParticles = 12; 
      const newParticles = Array.from({ length: numParticles }).map(() => {
        const angle = Math.random() * Math.PI * 2; 
        const velocity = Math.random() * 60 + 20;  
        const size = Math.random() * 6 + 3;       
        return { id: Math.random(), x, y, dx: Math.cos(angle) * velocity, dy: Math.sin(angle) * velocity, size };
      });

      setParticles((prev) => [...prev, ...newParticles]);
      setTimeout(() => setParticles((p) => p.filter((x) => !newParticles.find((n) => n.id === x.id))), 800);
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  },[]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ top: p.y - p.size / 2, left: p.x - p.size / 2, scale: 0, opacity: 1 }}
            animate={{ top: p.y - p.size / 2 + p.dy, left: p.x - p.size / 2 + p.dx, scale: [0, 1, 0.2], opacity:[1, 0.8, 0] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1),0_0_30px_rgba(217,70,239,0.8)] blur-[1px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// =========================================================================
// 2. COSMIC BACKGROUND ENGINE
// =========================================================================
const CosmicEngine = React.memo(({ bgIdx }: { bgIdx: number }) => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars([...Array(70)].map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + 0.5, duration: Math.random() * 4 + 2
    })));
  }, []);
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-[#020108]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[90vw] h-[80vh] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_70%)] opacity-80 blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.1),transparent_60%)] opacity-50 blur-3xl mix-blend-screen" />
      
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 0.15, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 5, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover mix-blend-screen" />
      </AnimatePresence>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      {stars.map((s) => (
        <motion.div key={s.id} animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }} transition={{ duration: s.duration, repeat: Infinity }} className="absolute bg-fuchsia-100 rounded-full shadow-[0_0_12px_#d946ef]" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }} />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020108_100%)]" />
    </div>
  );
});
CosmicEngine.displayName = 'CosmicEngine';

// --- HELPER: STATUS COLORS ---
const getScoreData = (score: number | null) => {
  if (score === null || score === undefined || isNaN(score)) return { color: "#475569", bg: "bg-slate-800", text: "text-slate-500", glow: "shadow-[0_0_0px_transparent]", label: "NO DATA", border: "border-slate-700/30" };
  if (score >= 80) return { color: "#10b981", bg: "bg-emerald-500", text: "text-emerald-400", glow: "shadow-[0_0_25px_rgba(16,185,129,0.5)]", label: "READY", border: "border-emerald-500/50" };
  if (score >= 50) return { color: "#eab308", bg: "bg-yellow-500", text: "text-yellow-400", glow: "shadow-[0_0_25px_rgba(234,179,8,0.5)]", label: "CAUTION", border: "border-yellow-500/50" };
  return { color: "#ef4444", bg: "bg-red-500", text: "text-red-400", glow: "shadow-[0_0_25px_rgba(239,68,68,0.5)]", label: "DANGER", border: "border-red-500/50" };
};

const portalTransition = { initial: { opacity: 0, scale: 0.98, y: 15 }, animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring", bounce: 0.2 } }, exit: { opacity: 0, scale: 1.02 } };

export default function DashboardGuruZenith() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // States Utama
  const [view, setView] = useState<'dashboard'>('dashboard'); 
  const [reports, setReports] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [bgIdx, setBgIdx] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState({ username: 'INSTRUCTOR' });
  
  // Interaction States
  const [activeClass, setActiveClass] = useState("ALL CLASSES"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackModal, setFeedbackModal] = useState<any>(null); 
  const [feedbackText, setFeedbackText] = useState("");
  const [appFeedbackModal, setAppFeedbackModal] = useState(false);
  const [appFeedbackForm, setAppFeedbackForm] = useState({ category: 'AI ENHANCEMENT', message: '' });
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  // =========================================================================
  // DATA ENGINE
  // =========================================================================
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://cyber-backend-delta.vercel.app/guru/reports');
      const rawData = await res.json();
      const dataArray = Array.isArray(rawData) ? rawData : (rawData.data || rawData.reports || []);

      if (dataArray.length > 0) {
        const studentMap: Record<string, any> = {};
        dataArray.forEach((item: any, i: number) => {
          const keys = Object.keys(item);
          const idKey = keys.find(k => /^(id|_id|id_report|id_log|log_id|id_nilai)$/i.test(k));
          const unameKey = keys.find(k => /name|user|siswa|id_siswa/i.test(k));
          const classKey = keys.find(k => /class|kelas|rombel/i.test(k));
          const scoreKey = keys.find(k => /score|nilai|poin/i.test(k));
          const domainKey = keys.find(k => /domain|kategori|tipe/i.test(k));

          const actualId = idKey ? item[idKey] : null;
          const uname = unameKey ? String(item[unameKey]) : `STUDENT_${i}`;
          const className = (classKey && item[classKey]) ? String(item[classKey]).toUpperCase() : "UNASSIGNED";
          const score = scoreKey ? Number(item[scoreKey]) : 0;
          const dom = domainKey ? String(item[domainKey]).toLowerCase() : 'social engineering';

          if (!studentMap[uname]) {
             studentMap[uname] = { username: uname, class_name: className, scores: { social: null, malware: null, phish: null }, attempts: { social: 0, malware: 0, phish: 0 }, totalScore: 0, testCount: 0, history:[] };
          }

          let parsedDomain = "UNKNOWN DOMAIN";
          if (dom.includes('soc') || dom.includes('eng')) parsedDomain = "SOCIAL ENGINEERING";
          else if (dom.includes('mal')) parsedDomain = "MALWARE ANALYSIS";
          else if (dom.includes('phis')) parsedDomain = "PHISHING DEFENSE";

          studentMap[uname].history.push({ ...item, dbId: actualId, parsedDomain, parsedScore: isNaN(score) ? 0 : score });
          
          if (!isNaN(score)) {
             if (parsedDomain === "SOCIAL ENGINEERING") { studentMap[uname].scores.social = score; studentMap[uname].attempts.social += 1; }
             else if (parsedDomain === "MALWARE ANALYSIS") { studentMap[uname].scores.malware = score; studentMap[uname].attempts.malware += 1; }
             else if (parsedDomain === "PHISHING DEFENSE") { studentMap[uname].scores.phish = score; studentMap[uname].attempts.phish += 1; }
             
             studentMap[uname].totalScore += score;
             studentMap[uname].testCount += 1;
          }
        });
        const formattedReports = Object.values(studentMap).map((s: any) => ({ ...s, avgScore: s.testCount > 0 ? Math.round(s.totalScore / s.testCount) : 0 }));
        setReports(formattedReports);
      } else {
        setReports([]); 
      }
    } catch (e) { 
      setReports([]); 
    } 
    finally { setLoading(false); }
  };

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) { setUser(JSON.parse(saved)); }
    fetchData();
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteLog = async (logId: string | number) => {
    if (!logId) return;
    if (!window.confirm("SYSTEM WARNING: Delete this record permanently?")) return;
    try {
      const res = await fetch(`https://cyber-backend-delta.vercel.app/guru/delete-log/${logId}`, { method: 'DELETE' });
      if (res.ok) { setFeedbackModal(null); fetchData(); } 
    } catch (error) { console.error(error); }
  };

  const submitStudentFeedback = () => {
    if(!feedbackText) return;
    alert(`Transmission successful to: ${feedbackModal.username}`);
    setFeedbackModal(null); setFeedbackText("");
  };

  // =========================================================================
  // 3. FUNGSI FEEDBACK TERKIRIM KE GMAIL KAMU
  // =========================================================================
  const submitAppFeedback = async () => {
    if(!appFeedbackForm.message.trim()) { alert("Please input transmission content."); return; }
    setIsSendingFeedback(true);
    try {
      // TARGET GMAIL: devinedwinsiahaan171105@gmail.com via FormSubmit Gateway
      const response = await fetch("https://formsubmit.co/ajax/devinedwinsiahaan171105@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
           _subject: `💎 CYBER EDU SYSTEM FEEDBACK: ${appFeedbackForm.category}`,
           _captcha: "false",
           Operative: user.username,
           Category: appFeedbackForm.category,
           Message: appFeedbackForm.message,
           Timestamp: new Date().toLocaleString()
        })
      });
      if (response.ok) {
         alert(`TRANSMISSION SUCCESSFUL! Please check your Gmail for activation (first time only) or to view the report.`);
         setAppFeedbackModal(false);
         setAppFeedbackForm({ category: 'AI ENHANCEMENT', message: '' });
      } else { alert("Transmission failed. Cloud gateway busy."); }
    } catch (error) { alert("Link failure. Transmission aborted."); } 
    finally { setIsSendingFeedback(false); }
  };

  // ANALYTICS
  const filteredReports = useMemo(() => {
    let result = reports;
    if (activeClass !== "ALL CLASSES") result = result.filter(r => r.class_name === activeClass);
    if (searchQuery) result = result.filter(r => String(r.username || "").toLowerCase().includes(searchQuery.toLowerCase()));
    return result;
  }, [reports, activeClass, searchQuery]);

  const participationStats = useMemo(() => {
    const total = filteredReports.length;
    const active = filteredReports.filter(r => r.testCount > 0).length;
    return { total, active, percentage: total === 0 ? 0 : Math.round((active / total) * 100) };
  }, [filteredReports]);

  const readinessDistribution = useMemo(() => {
    let r_ok = 0, c_ok = 0, d_ok = 0;
    filteredReports.forEach(r => {
      if(r.testCount === 0) return;
      if (r.avgScore >= 80) r_ok++; else if (r.avgScore >= 50) c_ok++; else d_ok++;
    });
    if(r_ok === 0 && c_ok === 0 && d_ok === 0) return[{ name: 'NO DATA', value: 1, color: '#1e293b' }];
    return[{ name: 'READY', value: r_ok, color: '#10b981' }, { name: 'CAUTION', value: c_ok, color: '#eab308' }, { name: 'DANGER', value: d_ok, color: '#ef4444' }].filter(d => d.value > 0);
  }, [filteredReports]);

  const domainAverages = useMemo(() => {
    if (filteredReports.length === 0) return[{ domain: 'SOC', score: 0, color: '#d946ef' }, { domain: 'MAL', score: 0, color: '#ef4444' }, { domain: 'PHI', score: 0, color: '#3b82f6' }];
    let s=0, m=0, p=0, sc=0, mc=0, pc=0;
    filteredReports.forEach(r => {
      if (r.scores.social !== null) { s += r.scores.social; sc++; }
      if (r.scores.malware !== null) { m += r.scores.malware; mc++; }
      if (r.scores.phish !== null) { p += r.scores.phish; pc++; }
    });
    return[{ domain: 'SOC', score: sc?Math.round(s/sc):0, color: '#d946ef' }, { domain: 'MAL', score: mc?Math.round(m/mc):0, color: '#ef4444' }, { domain: 'PHI', score: pc?Math.round(p/pc):0, color: '#3b82f6' }];
  }, [filteredReports]);

  const dynamicClasses = useMemo(() => ["ALL CLASSES", ...Array.from(new Set(reports.map(r => r.class_name))).sort()], [reports]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 18) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  return (
    <div className="flex h-screen w-full bg-[#020108] text-slate-200 overflow-hidden font-sans selection:bg-fuchsia-500/30 text-sm">
      <CosmicEngine bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      <AnimatePresence>
        {feedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative w-full max-w-4xl bg-[#0a0a0f]/95 border border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden backdrop-blur-xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 via-indigo-500 to-blue-500" />
               <div className="flex justify-between items-start mb-6 shrink-0 relative z-10">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><User size={32} /></div>
                     <div><p className="text-[10px] font-bold text-fuchsia-400 tracking-widest uppercase mb-1">DOSSIER ACCESS</p><h2 className="text-3xl font-black text-white uppercase">{feedbackModal.username}</h2><p className="text-xs font-semibold text-slate-400 mt-1 uppercase">{feedbackModal.class_name} • {feedbackModal.testCount} SESSIONS</p></div>
                  </div>
                  <button onClick={() => setFeedbackModal(null)} className="p-2 bg-white/5 rounded-full hover:bg-red-500/20 text-slate-400"><X size={20} /></button>
               </div>
               <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(feedbackModal.scores).map(([k, v]: any, idx) => (
                       <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center">
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-2 tracking-widest">{k}</p>
                          <p className={`text-4xl font-black ${getScoreData(v).text}`}>{v !== null ? v : '--'}</p>
                       </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2 uppercase tracking-widest"><Database size={16} /> LOGS HISTORY</h3>
                    {feedbackModal.history.map((log: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl group hover:border-white/20 transition-all">
                          <div className="flex flex-col"><p className="text-xs font-bold text-white uppercase">AUDIT {i+1}</p><p className="text-[10px] text-slate-500 uppercase mt-1">{log.parsedDomain} | SCORE: <span className={getScoreData(log.parsedScore).text}>{log.parsedScore}</span></p></div>
                          <button onClick={() => handleDeleteLog(log.dbId)} className="p-2.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14} /></button>
                        </div>
                    ))}
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL SYSTEM FEEDBACK (ULTRA-LUXURY VIOLET THEME) --- */}
      <AnimatePresence>
        {appFeedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[#020108]/95 backdrop-blur-[40px]">
             <div className="absolute w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
             <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ type: 'spring', damping: 20 }} className="w-full max-w-2xl bg-[#0a0a0f]/80 border border-white/10 rounded-[3rem] p-10 shadow-[0_0_60px_rgba(217,70,239,0.15)] relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600" />
                <div className="flex justify-between items-start mb-12 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-[0_0_25px_rgba(217,70,239,0.4)]"><Zap size={30} className="fill-current" /></div>
                      <div><h2 className="text-4xl font-black text-white uppercase tracking-tighter">PREMIUM FEEDBACK</h2><p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">TRANSMITTING SYSTEM OPTIMIZATION DATA</p></div>
                   </div>
                   <button onClick={() => setAppFeedbackModal(false)} className="p-3 bg-white/5 rounded-full text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition-all border border-white/5"><X size={20}/></button>
                </div>
                <div className="space-y-8 relative z-10">
                   <div>
                      <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Hexagon size={12}/> SELECT CATEGORY</label>
                      <select value={appFeedbackForm.category} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, category: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl p-5 text-xs font-black text-white uppercase outline-none focus:border-fuchsia-500 transition-all appearance-none cursor-pointer">
                         <option value="AI ENHANCEMENT">🤖 AI SYSTEM ENHANCEMENT</option>
                         <option value="UI/UX MODERNIZATION">🎨 UI / UX MODERNIZATION</option>
                         <option value="SECURITY EXPANSION">🛡️ NEW SECURITY DOMAINS</option>
                         <option value="REAL-TIME ANALYTICS">📊 ADVANCED ANALYTICS</option>
                         <option value="SYSTEM PERFORMANCE">⚡ PERFORMANCE OPTIMIZATION</option>
                         <option value="MOBILE INTEGRATION">📱 MOBILE APP SUGGESTION</option>
                         <option value="BUG REPORT">⚠️ CRITICAL BUG / ERROR</option>
                         <option value="OTHER">🌐 OTHER / MISCELLANEOUS</option>
                      </select>
                   </div>
                   <textarea value={appFeedbackForm.message} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, message: e.target.value})} placeholder="INPUT SYSTEM RECOMMENDATIONS HERE..." className="w-full h-44 bg-black/60 border border-white/10 rounded-3xl p-6 text-xs font-bold text-white focus:border-fuchsia-500 outline-none resize-none placeholder:text-slate-800 transition-all" />
                   <button onClick={submitAppFeedback} disabled={isSendingFeedback} className="w-full py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-[1.5rem] font-black text-[11px] tracking-[0.5em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-5 shadow-2xl">{isSendingFeedback ? "TRANSMITTING..." : "EXECUTE TRANSMISSION"} <Send size={18}/></button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="h-screen bg-[#05050A]/80 backdrop-blur-3xl border-r border-white/5 flex flex-col z-[100] shadow-2xl transition-all duration-500 w-72">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg"><LayoutDashboard size={20} className="text-white" /></div><span className="font-black text-white uppercase tracking-widest text-[11px]">INSTRUCTOR</span></div>
        </div>
        <nav className="flex-1 px-4 py-10 space-y-4">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center p-4 rounded-2xl transition-all gap-4 ${view === 'dashboard' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}><Activity size={22} /><span className="font-black text-[10px] tracking-widest uppercase">DASHBOARD</span></button>
          <button onClick={() => setAppFeedbackModal(true)} className="w-full flex items-center p-4 rounded-2xl text-slate-500 hover:text-fuchsia-400 hover:bg-fuchsia-600/10 transition-all gap-4 group"><Lightbulb size={22} className="group-hover:animate-pulse" /><span className="font-black text-[10px] tracking-widest uppercase">SYSTEM FEEDBACK</span></button>
        </nav>
        <div className="p-6 border-t border-white/5"><button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="w-full flex items-center justify-center p-4 bg-red-500/10 text-red-400 rounded-2xl gap-3 font-black text-[10px] tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all"><LogOut size={18} /> SHUTDOWN</button></div>
      </aside>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-black/30 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-inner"><div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_#34d399]" /><span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">NETWORK: SECURE</span></div>
            <div className="flex items-center gap-6"><div className="text-right hidden sm:block"><p className="text-[11px] font-black text-white tracking-widest uppercase">{user.username}</p><p className="text-[9px] font-bold text-fuchsia-400 uppercase tracking-[0.3em] mt-1">MASTER OPERATIVE</p></div><div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(217,70,239,0.3)]"><User size={22} /></div></div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-10 lg:px-14 py-12" ref={scrollRef}>
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div key="analytics" {...(portalTransition as any)} className="max-w-[1450px] w-full mx-auto space-y-12 pb-24">
                
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                  <div className="space-y-4"><div className="text-fuchsia-400 font-black text-[12px] tracking-[0.4em] uppercase flex items-center gap-3"><Globe size={16} className="animate-spin-slow" /> PLANETARY MONITORING</div><h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-tight">GREETINGS, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400">{user.username}</span>.</h1><p className="text-slate-500 font-medium text-[13px] tracking-wide max-w-2xl">Accessing encrypted dossiers and fleet readiness metrics from the secure distributed cloud network.</p></div>
                  <button onClick={fetchData} className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-black text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center gap-4 uppercase shadow-2xl"><RefreshCcw size={16} className={loading ? "animate-spin text-fuchsia-400" : ""}/> REFRESH DATASET</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 auto-rows-[minmax(200px,auto)]">
                   <motion.div whileHover={{ y: -6 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 border border-white/10 rounded-[3rem] p-10 shadow-2xl flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden group"><p className="text-[11px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6 flex items-center gap-2"><Target size={14}/> PARTICIPATION</p><div className="space-y-2"><p className="text-7xl font-black text-white tracking-tighter">{participationStats.percentage}%</p><p className="text-[10px] font-black text-fuchsia-400 tracking-[0.2em] uppercase">SYSTEM UPTIME REACHED</p></div><div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/5 mt-10"><motion.div initial={{ width: 0 }} animate={{ width: `${participationStats.percentage}%` }} transition={{ duration: 1.8 }} className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_15px_#d946ef]" /></div></motion.div>
                   <motion.div whileHover={{ y: -6 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center shadow-2xl backdrop-blur-2xl relative overflow-hidden group"><p className="text-[11px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6 w-full text-left flex items-center gap-2"><ShieldAlert size={14}/> FLEET STATUS</p><div className="relative w-full h-[220px]"><ResponsiveContainer><PieChart><Pie data={readinessDistribution} innerRadius={75} outerRadius={95} dataKey="value" stroke="none" paddingAngle={8}>{readinessDistribution.map((e, i) => (<Cell key={i} fill={e.color} style={{filter:`drop-shadow(0 0 10px ${e.color}50)`}} />))}</Pie></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-5xl font-black text-white">{participationStats.active}</span><span className="text-[9px] font-black text-slate-500 tracking-widest uppercase">ACTIVE</span></div></div><div className="flex gap-6 mt-6">{readinessDistribution.map((item, idx) => (<div key={idx} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color, boxShadow:`0 0 10px ${item.color}` }} /><span className="text-[10px] font-black text-slate-300 uppercase">{item.name}</span></div>))}</div></motion.div>
                   <motion.div whileHover={{ y: -6 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 border border-white/10 rounded-[3rem] p-10 shadow-2xl h-[320px] backdrop-blur-2xl relative overflow-hidden group"><p className="text-[11px] font-black text-slate-500 tracking-[0.3em] uppercase mb-8 flex items-center gap-2"><Cpu size={14}/> DOMAIN MASTERY</p><ResponsiveContainer><BarChart data={domainAverages} margin={{ left: -35 }}><CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.03)" /><XAxis dataKey="domain" tick={{ fontSize: 10, fontWeight: '900', fill: '#94a3b8' }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize: 10, fill: '#475569' }} domain={[0, 100]} axisLine={false} tickLine={false}/><Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={50}>{domainAverages.map((e, i) => (<Cell key={i} fill={`url(#barGradient-${i})`} />))}<defs>{domainAverages.map((e, i) => (<linearGradient id={`barGradient-${i}`} key={i} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={e.color} /><stop offset="100%" stopColor={e.color} stopOpacity={0.1} /></linearGradient>))}</defs></Bar></BarChart></ResponsiveContainer></motion.div>
                </div>

                <div className="mt-20 space-y-10 pb-32">
                   <div className="flex flex-col xl:flex-row justify-between items-end gap-10">
                      <div className="space-y-3"><h2 className="text-4xl font-black text-white tracking-tighter uppercase flex items-center gap-5">OPERATIVE DOSSIERS <Database className="text-fuchsia-500 animate-pulse" size={28} /></h2><p className="text-slate-600 font-black text-[11px] tracking-[0.4em] uppercase">ACCESSING SECURE PERSONNEL RECORD LOGS</p></div>
                      <div className="flex gap-6 w-full xl:w-auto">
                         <div className="relative flex-1 xl:w-[400px] group"><Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-fuchsia-500 transition-all" /><input type="text" placeholder="INPUT IDENTITY HASH..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black/80 border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-[12px] font-black text-white outline-none focus:border-fuchsia-500 transition-all placeholder:text-slate-800" /></div>
                         <select value={activeClass} onChange={(e) => setActiveClass(e.target.value)} className="bg-black/80 border border-white/10 rounded-[2rem] px-10 text-[11px] font-black text-white outline-none cursor-pointer uppercase hover:border-fuchsia-500 transition-all">{dynamicClasses.map(c => <option key={c} value={c} className="bg-[#05050A]">{c}</option>)}</select>
                      </div>
                   </div>

                   <div className="flex flex-col gap-6">
                      <AnimatePresence>
                         {filteredReports.map((r, idx) => {
                            const status = getScoreData(r.avgScore);
                            return (
                               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} key={idx} className="flex items-center justify-between bg-[#07070B]/60 backdrop-blur-[50px] p-8 rounded-[3.5rem] border border-white/5 hover:border-fuchsia-500/30 transition-all group shadow-2xl relative overflow-hidden">
                                  <div className="absolute left-0 top-0 w-2 h-full opacity-40" style={{ backgroundColor: status.color, boxShadow:`0 0 20px ${status.color}` }} />
                                  <div className="flex items-center gap-10 relative z-10"><div className="w-20 h-20 rounded-[2rem] bg-black border border-white/10 flex items-center justify-center relative shadow-2xl group-hover:rotate-6 transition-all"><User size={30} className="text-slate-600 group-hover:text-white transition-all" /><div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full border-[3px] border-[#07070B] ${status.bg}`} style={{ color: status.color }} /></div><div><p className="font-black text-2xl text-white tracking-tighter uppercase group-hover:text-fuchsia-400 transition-all">{r.username}</p><p className="text-[11px] text-slate-500 font-black tracking-[0.3em] uppercase mt-2 flex items-center gap-2"><Terminal size={12}/> {r.class_name}</p></div></div>
                                  <div className="flex items-center gap-14 relative z-10">
                                     <div className="hidden lg:grid grid-cols-3 gap-10">
                                        <div className="text-center group/score"><p className="text-[10px] font-black text-slate-600 uppercase mb-2 tracking-widest">SOC</p><p className="text-2xl font-black text-fuchsia-400" style={{textShadow:'0 0 15px #d946ef60'}}>{r.scores.social ?? '--'}</p></div>
                                        <div className="text-center group/score"><p className="text-[10px] font-black text-slate-600 uppercase mb-2 tracking-widest">MAL</p><p className="text-2xl font-black text-red-500" style={{textShadow:'0 0 15px #ef444460'}}>{r.scores.malware ?? '--'}</p></div>
                                        <div className="text-center group/score"><p className="text-[10px] font-black text-slate-600 uppercase mb-2 tracking-widest">PHI</p><p className="text-2xl font-black text-blue-500" style={{textShadow:'0 0 15px #3b82f660'}}>{r.scores.phish ?? '--'}</p></div>
                                     </div>
                                     <div className="flex items-center justify-center w-24 h-24 rounded-full border-[3px] border-white/5 relative ml-6 transform group-hover:scale-110 transition-all"><svg className="w-full h-full absolute -rotate-90"><circle cx="50%" cy="50%" r="44%" stroke={status.color} strokeWidth="5" fill="transparent" strokeDasharray={`${r.avgScore * 2.8} 1000`} className="opacity-80" style={{transition:'stroke-dasharray 1s ease-out'}}/></svg><span className={`text-3xl font-black ${status.text}`} style={{textShadow:`0 0 20px ${status.color}80`}}>{r.avgScore}</span></div>
                                     <button onClick={() => setFeedbackModal(r)} className="px-10 py-5 bg-white/5 border border-white/10 rounded-[1.8rem] hover:bg-white text-slate-300 hover:text-black font-black text-[11px] tracking-[0.3em] uppercase transition-all flex items-center gap-4 group/btn shadow-xl"><Eye size={18} /> VIEW DOSSIER</button>
                                  </div>
                               </motion.div>
                            )
                         })}
                      </AnimatePresence>
                      {filteredReports.length === 0 && (
                         <div className="p-40 text-center border-[3px] border-dashed border-white/5 rounded-[4rem] bg-black/50 backdrop-blur-3xl"><Info size={60} className="mx-auto text-slate-800 mb-8 animate-pulse" /><h3 className="text-3xl font-black text-white uppercase tracking-tighter">DATABASE STATUS: VOID</h3><p className="text-slate-700 font-black uppercase text-sm tracking-[0.4em] mt-4">NO COMPATIBLE OPERATIVE DATA DETECTED IN THE CURRENT SECTOR.</p></div>
                      )}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.4); border-radius: 10px; }
        ::selection { background: #d946ef; color: white; }
        input, select, textarea { caret-color: #d946ef; }
        option { background-color: #020108; color: white; }
      `}} />
    </div>
  );
}