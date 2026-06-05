"use client";

import React, { useState } from 'react';
import { 
  Shield, Zap, CheckCircle, ArrowRight, Lock, 
  Mail, User, Globe, Cpu, BookOpen, Activity, 
  Lightbulb, ShieldCheck, Headphones
} from 'lucide-react';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- SISI KIRI: LANDING CONTENT (SCROLLABLE) --- */}
      <div className="lg:w-3/5 w-full bg-white order-2 lg:order-1 overflow-y-auto">
        
        {/* HEADER NAVIGATION (Di dalam scroll area) */}
        <header className="px-8 lg:px-16 py-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Shield className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">CyberSchool Hub</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-semibold text-slate-500">
            <a href="#about" className="hover:text-blue-600 transition">Tentang Kami</a>
            <a href="#layanan" className="hover:text-blue-600 transition">Layanan</a>
            <a href="#energy" className="hover:text-blue-600 transition">Infrastruktur</a>
          </nav>
        </header>

        {/* 7 SECTIONS CONTENT */}
        <div className="px-8 lg:px-16 pb-20 space-y-32">
          
          {/* Section 1: Hero */}
          <section className="pt-12 min-h-[60vh] flex flex-col justify-center">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
              Platform Ketahanan Siber Sekolah
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              Membangun Keamanan Digital <span className="text-blue-600">Masa Depan.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mb-10">
              Integrasi kajian ketahanan siber sekolah dengan sistem monitoring energi hibrida terbarukan untuk ekosistem pendidikan yang tangguh.
            </p>
            <div className="flex gap-4">
              <a href="#layanan" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition flex items-center gap-2">
                Eksplorasi Layanan <ArrowRight size={18} />
              </a>
            </div>
          </section>

          {/* Section 2: About Us (Tentang Kita) */}
          <section id="about" className="scroll-mt-24">
            <h2 className="text-3xl font-extrabold mb-6">Misi Kita</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <p className="text-slate-600 leading-relaxed">
                Kami berkomitmen menciptakan lingkungan sekolah yang aman dari ancaman digital. Melalui penyediaan infrastruktur digital yang modern, kami mengkaji tingkat ketahanan siber siswa dan staf sekolah.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Selain keamanan, kami juga mengintegrasikan sistem catu daya hibrida untuk memastikan operasional sekolah seperti mesin tetas dan pencahayaan otomatis tetap berjalan optimal.
              </p>
            </div>
          </section>

          {/* Section 3: Layanan Kami */}
          <section id="layanan" className="scroll-mt-24">
            <h2 className="text-3xl font-extrabold mb-12">Layanan Utama</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Asesmen Siber', desc: 'Simulasi serangan malware, phishing, dan social engineering.', icon: <ShieldCheck className="text-blue-600"/> },
                { title: 'Monitoring Energi', desc: 'Pantau status panel surya dan baterai cadangan secara real-time.', icon: <Activity className="text-emerald-600"/> },
                { title: 'Otomasi ATS', desc: 'Sistem otomatisasi perpindahan daya untuk fasilitas sekolah.', icon: <Zap className="text-orange-600"/> },
                { title: 'Edukasi Digital', desc: 'Modul pembelajaran keamanan siber tingkat SMA/SMK.', icon: <BookOpen className="text-indigo-600"/> },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition duration-300">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Sistem Catu Daya Hibrida */}
          <section id="energy">
            <div className="bg-blue-600 rounded-[2.5rem] p-10 lg:p-16 text-white overflow-hidden relative">
              <div className="relative z-10 max-w-lg">
                <h2 className="text-3xl font-bold mb-6">Sistem Catu Daya Terintegrasi</h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Implementasi Sistem Catu Daya Hibrida Energi Terbarukan dengan ATS (Automatic Transfer Switch) untuk Mesin Tetas dan Pencahayaan Otomatis sekolah.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-blue-200" />
                    <span>Efisiensi Energi Terjamin</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-blue-200" />
                    <span>Otomasi Pencahayaan LDR</span>
                  </div>
                </div>
              </div>
              <Cpu className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-blue-500 opacity-20" />
            </div>
          </section>

          {/* Section 5: Ketahanan Siber Sekolah */}
          <section>
             <h2 className="text-3xl font-extrabold mb-12">Ketahanan Siber</h2>
             <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0"><Globe className="text-slate-600"/></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Infrastruktur Digital Aman</h4>
                    <p className="text-slate-500 text-sm">Penyediaan infrastruktur digital yang telah diaudit secara berkala untuk menghadapi ancaman modern.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0"><Lock className="text-slate-600"/></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Perlindungan Data Siswa</h4>
                    <p className="text-slate-500 text-sm">Enkripsi tingkat tinggi untuk seluruh data hasil asesmen dan profil personal akademik.</p>
                  </div>
                </div>
             </div>
          </section>

          {/* Section 6: Kenapa Harus Kami? */}
          <section>
            <h2 className="text-3xl font-extrabold text-center mb-16">Mengapa Memilih Platform Kami?</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <div>
                <h5 className="text-4xl font-black text-blue-600 mb-2 italic">100%</h5>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Real-time Monitoring</p>
              </div>
              <div>
                <h5 className="text-4xl font-black text-blue-600 mb-2 italic">24/7</h5>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">System Resilience</p>
              </div>
              <div>
                <h5 className="text-4xl font-black text-blue-600 mb-2 italic">Safe</h5>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Data Encryption</p>
              </div>
            </div>
          </section>

          {/* Section 7: Dukungan Teknis */}
          <section className="text-center">
            <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100">
              <Headphones className="mx-auto mb-6 text-slate-400" size={48} />
              <h2 className="text-2xl font-bold mb-4">Butuh Bantuan?</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">Tim teknis IT kami siap membantu integrasi sistem di sekolah Anda kapan saja.</p>
              <button className="text-blue-600 font-bold hover:underline">Hubungi Helpdesk Sekolah</button>
            </div>
          </section>

          {/* 8. FOOTER */}
          <footer className="pt-20 border-t border-slate-100">
            <div className="flex flex-col md:flex-row justify-between gap-10 text-sm">
              <div className="max-w-xs">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="text-blue-600 w-5 h-5" />
                  <span className="font-bold text-lg">CyberSchool</span>
                </div>
                <p className="text-slate-500 leading-relaxed italic">Mengkaji Ketahanan Siber & Infrastruktur Digital Lingkungan Sekolah.</p>
              </div>
              <div className="flex gap-16">
                <div className="space-y-4">
                  <h5 className="font-bold">Legal</h5>
                  <ul className="text-slate-500 space-y-2">
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h5 className="font-bold">Media</h5>
                  <ul className="text-slate-500 space-y-2">
                    <li>Instagram</li>
                    <li>LinkedIn</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mt-20 text-slate-400 text-xs">© 2024 Platform Ketahanan Siber Sekolah. All Rights Reserved.</p>
          </footer>

        </div>
      </div>

      {/* --- SISI KANAN: AUTH PORTAL (FIXED) --- */}
      <div className="lg:w-2/5 w-full bg-slate-50 lg:h-screen lg:sticky lg:top-0 flex items-center justify-center p-8 border-l border-slate-200 order-1 lg:order-2">
        <div className="w-full max-w-md">
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200">
            {/* TOGGLE TAB */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-10">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Masuk
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${!isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Daftar
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800">{isLogin ? 'Selamat Datang' : 'Buat Akun Baru'}</h2>
              <p className="text-slate-500 text-sm mt-1">{isLogin ? 'Masukkan kredensial Anda untuk akses.' : 'Lengkapi data diri untuk pendaftaran.'}</p>
            </div>

            <form className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-slate-300" size={18} />
                    <input className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition outline-none text-sm" placeholder="Ahmad Edwin" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Sekolah</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-300" size={18} />
                  <input className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition outline-none text-sm" placeholder="name@school.id" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-300" size={18} />
                  <input type="password" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition outline-none text-sm" placeholder="••••••••" />
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition shadow-lg shadow-blue-100 mt-6 active:scale-[0.98]">
                {isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'}
              </button>
            </form>

            <div className="mt-8 text-center">
               <p className="text-xs text-slate-400 italic">Penyediaan Infrastruktur Digital Sekolah yang Aman & Terpercaya.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginRegister;