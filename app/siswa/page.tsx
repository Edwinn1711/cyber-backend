"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, Zap, Lightbulb, Activity, Users, CheckCircle2, 
  ArrowRight, Globe, Lock, Mail, UserPlus, LogIn, ChevronDown, 
  Cpu, Leaf, ShieldCheck, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Efek scroll untuk header transparan ke solid
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Varian animasi Framer Motion
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* 1. HEADER (Navigation) */}
      <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              CYBER-GREEN
            </span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {['Tentang Kami', 'Layanan', 'Energi Hibrida', 'Keamanan Siber', 'Infrastruktur', 'Manfaat'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all active:scale-95">
              Portal Akses
            </button>
          </nav>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row">
        
        {/* SISI KIRI: CONTENT SHOWCASE (Long Scroll) */}
        <div className="lg:w-[60%] w-full bg-white relative">
          
          {/* SECTION 1: HERO */}
          <section id="hero" className="min-h-screen flex flex-col justify-center px-12 lg:px-24 bg-[radial-gradient(circle_at_top_left,_#f0f7ff_0%,_#ffffff_50%)]">
            <motion.div {...fadeIn}>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-100 rounded-full">
                The Future of School Infrastructure
              </span>
              <h1 className="text-6xl font-black leading-[1.1] mb-8 text-slate-800">
                Mengkaji Ketahanan <span className="text-blue-600">Siber</span> & Energi <span className="text-green-500">Hibrida</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl mb-10">
                Platform terintegrasi untuk memantau keamanan digital sekolah sekaligus mengoptimalkan sistem energi terbarukan untuk masa depan pendidikan yang berkelanjutan.
              </p>
              <div className="flex gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 border-2 border-white rounded-full bg-slate-200" />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold">500+ Siswa & Guru</p>
                  <p className="text-slate-400">Telah bergabung dalam ekosistem ini</p>
                </div>
              </div>
            </motion.div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <ChevronDown className="text-slate-300" />
            </div>
          </section>

          {/* SECTION 2: ABOUT US (Tentang Kami) */}
          <section id="tentang-kami" className="py-24 px-12 lg:px-24 border-t border-slate-100">
            <h2 className="text-3xl font-bold mb-12">Visi & Misi Kami</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>Kami percaya bahwa infrastruktur digital sekolah tidak hanya soal internet cepat, tetapi juga ketahanan terhadap ancaman siber dan kemandirian energi.</p>
                <p>Melalui riset mendalam, kami menghadirkan solusi yang menggabungkan audit keamanan siber dengan sistem catu daya pintar.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <Globe className="text-blue-600" />
                  <h4 className="font-bold">Dampak Digital</h4>
                </div>
                <p className="text-sm text-slate-500 italic">"Membangun kesadaran siber sejak dini di lingkungan pendidikan adalah investasi keamanan nasional."</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: CORE SERVICES (Layanan) */}
          <section id="layanan" className="py-24 px-12 lg:px-24 bg-slate-50">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Asesmen Siber', desc: 'Pengujian kerentanan melalui simulasi phishing dan malware.', icon: <ShieldCheck className="text-blue-600" /> },
                { title: 'Monitoring Energi', desc: 'Pantau status panel surya dan baterai secara real-time.', icon: <Activity className="text-green-600" /> },
                { title: 'Otomasi ATS', desc: 'Perpindahan daya otomatis tanpa jeda untuk mesin tetas.', icon: <Zap className="text-orange-600" /> },
                { title: 'Data Analytics', desc: 'Analisis nilai ketahanan siber siswa secara komprehensif.', icon: <Database className="text-indigo-600" /> }
              ].map((s, idx) => (
                <div key={idx} className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition">
                  <div className="mb-4">{s.icon}</div>
                  <h3 className="font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: HYBRID ENERGY (Sistem Energi) */}
          <section id="energi-hibrida" className="py-24 px-12 lg:px-24">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Leaf className="text-green-400" /> Energi Terbarukan
                </h2>
                <p className="text-slate-400 mb-8 max-w-md">Sistem Catu Daya Hibrida kami dilengkapi ATS (Automatic Transfer Switch) untuk menjamin kestabilan daya Mesin Tetas dan Pencahayaan Otomatis.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-400 w-5 h-5" /> Efisiensi Daya Hingga 40%</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-400 w-5 h-5" /> Monitoring Baterai Real-time</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-green-400 w-5 h-5" /> Kontrol Lampu Berbasis LDR</li>
                </ul>
              </div>
              <Zap className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white/5" />
            </div>
          </section>

          {/* SECTION 5: CYBER FRAMEWORK */}
          <section id="keamanan-siber" className="py-24 px-12 lg:px-24">
            <h2 className="text-3xl font-bold mb-4 italic text-slate-400">Core Security Domains</h2>
            <h3 className="text-5xl font-black mb-12">Tiga Pilar <span className="text-blue-600 underline">Asesmen.</span></h3>
            <div className="space-y-8">
              {[
                { label: 'Social Engineering', color: 'bg-red-500', text: 'Menguji ketahanan terhadap manipulasi psikologis.' },
                { label: 'Malware Awareness', color: 'bg-orange-500', text: 'Deteksi dini serangan perangkat lunak berbahaya.' },
                { label: 'Anti-Phishing', color: 'bg-blue-500', text: 'Identifikasi situs dan komunikasi palsu.' }
              ].map((domain, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className={`w-2 h-12 rounded-full ${domain.color} group-hover:scale-y-125 transition`}></div>
                  <div>
                    <h4 className="font-bold text-xl">{domain.label}</h4>
                    <p className="text-slate-500">{domain.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: INFRASTRUCTURE (Infrastruktur) */}
          <section id="infrastruktur" className="py-24 px-12 lg:px-24 bg-blue-600 text-white">
            <h2 className="text-4xl font-bold mb-8 leading-tight">Infrastruktur Digital yang Tangguh.</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-6xl font-black mb-2 italic">99.9%</h4>
                <p className="text-blue-100 font-medium">Uptime Sistem ATS</p>
              </div>
              <div>
                <h4 className="text-6xl font-black mb-2 italic">ZERO</h4>
                <p className="text-blue-100 font-medium">Data Breach</p>
              </div>
            </div>
          </section>

          {/* SECTION 7: MANFAAT (Impact) */}
          <section id="manfaat" className="py-24 px-12 lg:px-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Kenapa Sekolah Anda Membutuhkan Ini?</h2>
              <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-3 gap-8">
               <div className="text-center">
                  <Users className="mx-auto mb-4 text-blue-600" size={40} />
                  <h5 className="font-bold">Siswa Cerdas</h5>
                  <p className="text-xs text-slate-400 mt-2">Membentuk generasi sadar keamanan digital.</p>
               </div>
               <div className="text-center">
                  <Cpu className="mx-auto mb-4 text-green-600" size={40} />
                  <h5 className="font-bold">Teknologi IOT</h5>
                  <p className="text-xs text-slate-400 mt-2">Implementasi teknologi terbaru di sekolah.</p>
               </div>
               <div className="text-center">
                  <Lightbulb className="mx-auto mb-4 text-orange-600" size={40} />
                  <h5 className="font-bold">Eco-School</h5>
                  <p className="text-xs text-slate-400 mt-2">Menuju sekolah ramah lingkungan.</p>
               </div>
            </div>
          </section>

          {/* 8. FOOTER */}
          <footer className="bg-slate-50 border-t border-slate-200 py-16 px-12 lg:px-24">
            <div className="grid md:grid-cols-3 gap-12 mb-12 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="text-blue-600 w-5 h-5" />
                  <span className="font-bold text-lg">CYBER-GREEN</span>
                </div>
                <p className="text-slate-500 leading-relaxed">Platform Pengkajian Ketahanan Siber dan Sistem Energi Hibrida Lingkungan Sekolah.</p>
              </div>
              <div>
                <h5 className="font-bold mb-6">Navigasi Cepat</h5>
                <ul className="space-y-3 text-slate-500">
                  <li><a href="#hero">Beranda</a></li>
                  <li><a href="#layanan">Layanan Kami</a></li>
                  <li><a href="#keamanan-siber">Materi Siber</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-6">Kontak & Dukungan</h5>
                <ul className="space-y-3 text-slate-500">
                  <li>lab-it@sekolah.id</li>
                  <li>Gedung Lab Teknologi, Jakarta</li>
                  <li>(021) 8888-9999</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-200 flex justify-between text-xs font-medium text-slate-400">
              <p>© 2024 Cyber-Green Infrastructure. All Rights Reserved.</p>
              <div className="flex gap-6 italic">
                <span>Privacy Policy</span>
                <span>Terms of Digital Service</span>
              </div>
            </div>
          </footer>
        </div>

        {/* SISI KANAN: AUTH PORTAL (Sticky & Fixed) */}
        <div className="lg:w-[40%] w-full h-screen sticky top-0 flex items-center justify-center p-8 lg:p-12 bg-slate-50 overflow-hidden">
          
          {/* Elemen Dekoratif di Background Kanan */}
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-green-100 rounded-full blur-[120px] opacity-60"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-white relative z-10"
          >
            {/* Toggle Login/Register */}
            <div className="flex bg-slate-100/50 p-1.5 rounded-2xl mb-10 border border-slate-200">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${isLogin ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Masuk
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${!isLogin ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Daftar
              </button>
            </div>

            <AnimatePresence mode='wait'>
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl font-black text-slate-800">Selamat Datang.</h2>
                    <p className="text-slate-500 mt-2 text-sm font-medium">Silahkan masuk ke sistem ketahanan siber Anda.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block ml-4">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition" size={18} />
                        <input className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/20 transition outline-none text-sm font-medium" placeholder="admin@sekolah.id" />
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block ml-4">Password Key</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition" size={18} />
                        <input type="password" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/20 transition outline-none text-sm font-medium" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 flex items-center justify-center gap-2 transition group active:scale-[0.98]">
                    <span>Akses Dashboard</span>
                    <LogIn size={18} className="group-hover:translate-x-1 transition" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-3xl font-black text-slate-800">Buat Akun Baru.</h2>
                    <p className="text-slate-500 mt-2 text-sm font-medium">Bergabung dalam ekosistem riset digital sekolah.</p>
                  </div>

                  <div className="space-y-4">
                    <input className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600/20 transition outline-none text-sm font-medium" placeholder="Nama Lengkap" />
                    <input className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600/20 transition outline-none text-sm font-medium" placeholder="Nomor Induk Siswa/Guru" />
                    <input className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600/20 transition outline-none text-sm font-medium" placeholder="Email Sekolah" />
                    <input type="password" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600/20 transition outline-none text-sm font-medium" placeholder="Buat Password" />
                  </div>

                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 transition group active:scale-[0.98]">
                    <span>Daftar Akun</span>
                    <UserPlus size={18} className="group-hover:scale-110 transition" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center">
              <p className="text-xs text-slate-400 font-medium">Butuh bantuan teknis? <span className="text-blue-600 cursor-pointer hover:underline">Hubungi Admin Lab IT</span></p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;