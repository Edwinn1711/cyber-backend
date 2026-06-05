import React, { useState } from 'react';
import { Shield, Zap, Info, Lock, User, Menu, X } from 'lucide-react';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-blue-600 w-8 h-8" />
            <span className="font-bold text-xl tracking-tight text-slate-800">CYBER-GEN</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600">Tentang Kami</a>
            <a href="#services" className="hover:text-blue-600">Layanan</a>
            <a href="#hybrid" className="hover:text-blue-600">Sistem Energi</a>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">Mulai Sekarang</button>
          </nav>
        </div>
      </header>

      {/* MAIN SECTION: SPLIT LOGIN & HERO */}
      <section className="pt-24 flex flex-col lg:flex-row min-h-[90vh]">
        {/* KIRI: Penjelasan & Hero */}
        <div className="lg:w-1/2 p-12 flex flex-col justify-center bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Mengkaji Ketahanan Siber & <span className="text-cyan-400">Infrastruktur Digital Terbarukan</span>
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-lg">
            Platform edukasi dan monitoring terintegrasi untuk masa depan sekolah cerdas. Menggabungkan keamanan siber dengan efisiensi energi hibrida.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <Zap className="mb-2 text-yellow-400" />
              <h3 className="font-bold">ATS System</h3>
              <p className="text-xs text-blue-200">Otomasi daya mesin tetas & lampu.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <Shield className="mb-2 text-green-400" />
              <h3 className="font-bold">Cyber Security</h3>
              <p className="text-xs text-blue-200">Asesmen Social Engineering & Malware.</p>
            </div>
          </div>
        </div>

        {/* KANAN: Form Login/Register */}
        <div className="lg:w-1/2 p-12 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8 flex gap-4 border-b">
              <button onClick={() => setIsLogin(true)} className={`pb-2 font-semibold transition ${isLogin ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>Masuk</button>
              <button onClick={() => setIsLogin(false)} className={`pb-2 font-semibold transition ${!isLogin ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-400'}`}>Daftar Akun</button>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email Sekolah</label>
                <input type="email" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="name@school.id" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input type="password" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition">
                {isLogin ? 'Login ke Platform' : 'Daftar Sekarang'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTIONS LAINNYA (About, Services, dsb) - Diringkas */}
      <section id="about" className="py-20 bg-white text-center px-6">
        <h2 className="text-3xl font-bold mb-12">7 Pilar Keunggulan Platform</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1,2,3,4,5,6,7].map(i => (
            <div key={i} className="p-6 border rounded-2xl hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold">{i}</div>
              <h3 className="font-bold mb-2">Layanan Unggulan {i}</h3>
              <p className="text-slate-500 text-sm">Penjelasan detail mengenai fitur platform yang mendukung infrastruktur sekolah.</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <Shield className="w-6 h-6" />
              <span className="font-bold">CYBER-GEN</span>
            </div>
            <p className="text-sm max-w-xs">Mengkaji Ketahanan Siber dan Sistem Energi Hibrida Terintegrasi Sekolah.</p>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;