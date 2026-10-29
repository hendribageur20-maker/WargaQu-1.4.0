/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Bell,
  Headphones,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  Receipt,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  Home,
  Siren,
  ShoppingBag,
  MapPin,
  HandHeart,
  MessageSquare,
  Settings,
  QrCode,
  Newspaper,
  History,
  UserCheck,
  Info,
  ArrowLeft,
  Inbox,
  Download
} from 'lucide-react';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';

interface ToastState {
  show: boolean;
  message: string;
}

type ScreenType =
  | 'home'
  | 'rtqu'
  | 'siagaqu'
  | 'usahaqu'
  | 'areaqu'
  | 'muamalahqu'
  | 'chatqu'
  | 'setting'
  | 'aktivitas'
  | 'qris'
  | 'untukmu'
  | 'akun'
  | 'riwayat_iuran'
  | 'kabar_rt'
  | 'wargapay'
  | 'atur_menu'
  | 'notifikasi'
  | 'bantuan'
  | 'profil';

interface ModuleConfig {
  id: ScreenType;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badge?: string;
}

const MODULE_CONFIGS: Record<Exclude<ScreenType, 'home'>, ModuleConfig> = {
  rtqu: {
    id: 'rtqu',
    title: 'RtQu',
    subtitle: 'Administrasi & Layanan RT Digital',
    icon: Home,
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  siagaqu: {
    id: 'siagaqu',
    title: 'SiagaQu',
    subtitle: 'Layanan Darurat & Keamanan Terpadu',
    icon: Siren,
    accentColor: 'text-red-500 bg-red-50 border-red-200',
    badge: 'SOS',
  },
  usahaqu: {
    id: 'usahaqu',
    title: 'UsahaQu',
    subtitle: 'Direktori & Pasar UMKM Warga',
    icon: ShoppingBag,
    accentColor: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  areaqu: {
    id: 'areaqu',
    title: 'AreaQu',
    subtitle: 'Fasilitas & Pemetaan Lingkungan RT',
    icon: MapPin,
    accentColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  muamalahqu: {
    id: 'muamalahqu',
    title: 'MuamalahQu',
    subtitle: 'Kas Sosial, ZISWAF & Donasi Warga',
    icon: HandHeart,
    accentColor: 'text-teal-600 bg-teal-50 border-teal-200',
  },
  chatqu: {
    id: 'chatqu',
    title: 'ChatQu',
    subtitle: 'Ruang Komunikasi & Forum Komunitas',
    icon: MessageSquare,
    accentColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    badge: '3',
  },
  setting: {
    id: 'setting',
    title: 'Setting',
    subtitle: 'Pengaturan & Preferensi Aplikasi',
    icon: Settings,
    accentColor: 'text-slate-600 bg-slate-100 border-slate-200',
  },
  aktivitas: {
    id: 'aktivitas',
    title: 'Aktivitas',
    subtitle: 'Riwayat Transaksi & Catatan Kegiatan',
    icon: History,
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  qris: {
    id: 'qris',
    title: 'QRIS WargaPay',
    subtitle: 'Pemindai & Pembayaran Digital',
    icon: QrCode,
    accentColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
  },
  untukmu: {
    id: 'untukmu',
    title: 'Untukmu',
    subtitle: 'Rekomendasi, Promo & Program Khusus',
    icon: Sparkles,
    accentColor: 'text-orange-500 bg-orange-50 border-orange-200',
  },
  akun: {
    id: 'akun',
    title: 'Akun Saya',
    subtitle: 'Profil Warga & Keamanan Akun',
    icon: UserCheck,
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  riwayat_iuran: {
    id: 'riwayat_iuran',
    title: 'Riwayat Iuran',
    subtitle: 'Pencatatan Pembayaran Iuran Warga',
    icon: Receipt,
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  kabar_rt: {
    id: 'kabar_rt',
    title: 'Kabar RT 03',
    subtitle: 'Informasi & Pengumuman Resmi Pengurus',
    icon: Newspaper,
    accentColor: 'text-sky-600 bg-sky-50 border-sky-200',
  },
  wargapay: {
    id: 'wargapay',
    title: 'WargaPay',
    subtitle: 'Dompet Digital & Pembayaran Cepat',
    icon: QrCode,
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  atur_menu: {
    id: 'atur_menu',
    title: 'Atur Menu',
    subtitle: 'Kustomisasi Tampilan Modul Utama',
    icon: SlidersHorizontal,
    accentColor: 'text-slate-600 bg-slate-100 border-slate-200',
  },
  notifikasi: {
    id: 'notifikasi',
    title: 'Notifikasi',
    subtitle: 'Pemberitahuan & Pesan Masuk',
    icon: Bell,
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  bantuan: {
    id: 'bantuan',
    title: 'Pusat Bantuan',
    subtitle: 'Bantuan & Layanan Pengaduan',
    icon: Headphones,
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  profil: {
    id: 'profil',
    title: 'Profil Warga',
    subtitle: 'Data Pribadi & Keluarga Terdaftar',
    icon: User,
    accentColor: 'text-blue-600 bg-blue-50 border-blue-200',
  },
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isBalanceHidden, setIsBalanceHidden] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '' });
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  const realBalance = '2.450.000';
  const maskedBalance = '••••••••';

  const showToast = (message: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ show: true, message });
    const timer = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2500);
    setToastTimer(timer);
  };

  const toggleBalance = () => {
    setIsBalanceHidden((prev) => !prev);
  };

  const navigateTo = (screen: ScreenType, toastMsg?: string) => {
    setCurrentScreen(screen);
    if (toastMsg) {
      showToast(toastMsg);
    }
  };

  const activeModule = currentScreen !== 'home' ? MODULE_CONFIGS[currentScreen] : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-slate-900 selection:bg-sky-500 selection:text-white">
      {/* Mobile Device Frame Outer */}
      <div className="relative w-full max-w-[412px] h-[870px] max-h-[96vh] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 flex flex-col justify-between overflow-hidden">
        
        {/* Screen Notch / Camera Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
          <div className="absolute right-4 w-3 h-3 bg-slate-900 rounded-full border border-slate-800"></div>
        </div>

        {/* Phone Inner Screen */}
        <div
          id="screen"
          className="w-full h-full bg-[#F2F5F9] rounded-[38px] overflow-hidden flex flex-col relative no-scrollbar"
        >
          {/* OFFLINE INDICATOR */}
          <OfflineIndicator />

          {/* TOAST NOTIFICATION CONTAINER */}
          <div
            id="toast"
            className={`absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300 shadow-xl z-50 flex items-center gap-2 max-w-[90%] text-center ${
              toast.show
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <Info className="w-4 h-4 text-[#00C4FF] shrink-0" />
            <span id="toastMsg" className="truncate">
              {toast.message}
            </span>
          </div>

          {currentScreen === 'home' ? (
            /* ======================================================== */
            /* BERANDA SCREEN (Sesuai Desain Asli WargaQu)              */
            /* ======================================================== */
            <>
              {/* TOP APP BAR & HEADER CONTAINER (Dark Blue Background) */}
              <div className="bg-gradient-to-b from-[#003366] via-[#0055A5] to-[#0055A5] pt-8 px-5 pb-16 rounded-b-[32px] relative text-white">
                {/* Top Header Row */}
                <div className="flex justify-between items-center mb-4">
                  {/* Logo / Title */}
                  <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => showToast('WargaQu - Sistem Digital RT 03')}>
                    <span className="text-2xl font-extrabold italic tracking-tight text-white">
                      warga<span className="text-[#00C4FF] font-black">Qu</span>
                    </span>
                    <span className="text-[10px] bg-[#00A3E0]/30 border border-[#00A3E0]/50 px-1.5 py-0.5 rounded-full font-semibold text-[#00C4FF]">
                      RT 03
                    </span>
                  </div>

                  {/* Right Quick Actions */}
                  <div className="flex items-center gap-2">
                    {/* PWA Install Button */}
                    <PWAInstallButton variant="header" onInstalledToast={showToast} />

                    <button
                      aria-label="Notifikasi"
                      className="relative p-2 rounded-full hover:bg-white/10 transition active:scale-95"
                      onClick={() => navigateTo('notifikasi', 'Membuka Notifikasi')}
                    >
                      <Bell className="w-5 h-5 text-white" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button
                      aria-label="Pusat Bantuan"
                      className="p-2 rounded-full hover:bg-white/10 transition active:scale-95"
                      onClick={() => navigateTo('bantuan', 'Pusat Bantuan WargaQu')}
                    >
                      <Headphones className="w-5 h-5 text-white" />
                    </button>
                    <button
                      aria-label="Pengaturan Profil"
                      className="p-2 rounded-full hover:bg-white/10 transition active:scale-95"
                      onClick={() => navigateTo('profil', 'Pengaturan Profil')}
                    >
                      <User className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Greeting User */}
                <div className="mt-1 mb-2">
                  <p className="text-xs text-blue-200 tracking-wider uppercase font-medium">Halo,</p>
                  <h1 className="text-lg font-bold text-white tracking-wide">HENDRIANA</h1>
                </div>
              </div>

              {/* SCROLLABLE MAIN CONTENT AREA */}
              <div className="flex-1 overflow-y-auto no-scrollbar px-4 -mt-12 pb-24 space-y-4">
                {/* MAIN CARD WIDGET: TOTAL IURAN (Replaces Account Balance) */}
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 relative overflow-hidden">
                  {/* Top ID Badge Row */}
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <div className="inline-flex items-center gap-1.5 bg-[#F2F5F9] text-[#003366] px-2.5 py-1 rounded-lg text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0055A5]" />
                      <span>ID WARGA: RT 03 / RW 05</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Blok A No. 12</span>
                  </div>

                  {/* Primary Metric Display */}
                  <div className="pt-3 pb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-500">
                        Total Iuran Masuk (Awal - Sekarang)
                      </span>
                      <button
                        id="toggleBalanceBtn"
                        onClick={toggleBalance}
                        className="text-[#0055A5] hover:text-[#003366] transition p-1"
                        aria-label="Sembunyikan atau tampilkan saldo"
                      >
                        {isBalanceHidden ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-slate-700">IDR</span>
                      <span
                        id="balanceText"
                        className="text-2xl font-extrabold text-slate-800 tracking-tight"
                      >
                        {isBalanceHidden ? maskedBalance : realBalance}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-[#0055A5]">
                    <button
                      onClick={() => navigateTo('riwayat_iuran', 'Membuka Riwayat Iuran...')}
                      className="flex items-center gap-1.5 hover:underline"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>Lihat Riwayat Pembayaran</span>
                    </button>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* ANNOUNCEMENT / BANNER CAROUSEL */}
                <div
                  className="bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl p-3.5 text-white shadow-md flex items-center justify-between cursor-pointer hover:opacity-95 transition active:scale-[0.99]"
                  onClick={() => navigateTo('kabar_rt', 'Detail Kegiatan Gotong Royong')}
                >
                  <div className="space-y-0.5">
                    <div className="inline-block bg-yellow-400 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                      Kegiatan Warga
                    </div>
                    <h4 className="text-xs font-bold leading-tight">Gotong Royong Minggu Ini!</h4>
                    <p className="text-[11px] text-sky-100">Dapatkan Poin Keaktifan Warga &gt;</p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </div>
                </div>

                {/* MENU UTAMA (MODULE GRID) */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  {/* Section Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 text-sm">Menu Utama</h3>
                    <button
                      onClick={() => navigateTo('atur_menu', 'Mode Atur Menu Utama')}
                      className="text-xs font-bold text-[#0055A5] flex items-center gap-1 hover:underline"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      Atur
                    </button>
                  </div>

                  {/* Grid Items (7 Requested Modules) */}
                  <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                    {/* 1. RtQu */}
                    <button
                      onClick={() => navigateTo('rtqu', 'Membuka Modul RtQu')}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0055A5] group-hover:scale-105 active:scale-95 transition shadow-xs">
                        <Home className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 mt-1.5 text-center leading-tight">
                        RtQu
                      </span>
                    </button>

                    {/* 2. SiagaQu */}
                    <button
                      onClick={() => navigateTo('siagaqu', 'Membuka Modul SiagaQu (Darurat)')}
                      className="flex flex-col items-center group relative cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 group-hover:scale-105 active:scale-95 transition shadow-xs">
                        <Siren className="w-6 h-6" />
                      </div>
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-extrabold px-1 rounded-full">
                        SOS
                      </span>
                      <span className="text-[11px] font-medium text-slate-700 mt-1.5 text-center leading-tight">
                        SiagaQu
                      </span>
                    </button>

                    {/* 3. UsahaQu */}
                    <button
                      onClick={() => navigateTo('usahaqu', 'Membuka Modul UsahaQu (UMKM Warga)')}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 active:scale-95 transition shadow-xs">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 mt-1.5 text-center leading-tight">
                        UsahaQu
                      </span>
                    </button>

                    {/* 4. AreaQu */}
                    <button
                      onClick={() => navigateTo('areaqu', 'Membuka Modul AreaQu (Fasilitas)')}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 active:scale-95 transition shadow-xs">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 mt-1.5 text-center leading-tight">
                        AreaQu
                      </span>
                    </button>

                    {/* 5. MuamalahQu */}
                    <button
                      onClick={() => navigateTo('muamalahqu', 'Membuka Modul MuamalahQu (Kas & Donasi)')}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 group-hover:scale-105 active:scale-95 transition shadow-xs">
                        <HandHeart className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 mt-1.5 text-center leading-tight">
                        MuamalahQu
                      </span>
                    </button>

                    {/* 6. ChatQu */}
                    <button
                      onClick={() => navigateTo('chatqu', 'Membuka Forum ChatQu')}
                      className="flex flex-col items-center group relative cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 active:scale-95 transition shadow-xs">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <span className="absolute -top-1 right-1 bg-indigo-600 text-white text-[9px] font-bold px-1 rounded-full">
                        3
                      </span>
                      <span className="text-[11px] font-medium text-slate-700 mt-1.5 text-center leading-tight">
                        ChatQu
                      </span>
                    </button>

                    {/* 7. Setting */}
                    <button
                      onClick={() => navigateTo('setting', 'Membuka Pengaturan')}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:scale-105 active:scale-95 transition shadow-xs">
                        <Settings className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 mt-1.5 text-center leading-tight">
                        Setting
                      </span>
                    </button>
                  </div>

                  {/* Indicator dots (Pagination indicator style like myBCA) */}
                  <div className="flex justify-center items-center gap-1.5 mt-5">
                    <span className="w-5 h-1.5 bg-[#0055A5] rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                  </div>
                </div>

                {/* EXTRA FEATURE STRIP (NFC / QUICK BAYAR BANNER) */}
                <div
                  className="bg-white rounded-xl p-3 border border-slate-100 flex items-center justify-between shadow-xs cursor-pointer hover:bg-slate-50 transition active:scale-[0.99]"
                  onClick={() => navigateTo('wargapay', 'Fitur Bayar Cepat')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#F2F5F9] rounded-lg flex items-center justify-center text-[#0055A5]">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">Bayar Iuran via WargaPay</h5>
                      <p className="text-[10px] text-slate-500">Scan QRIS atau Transfer Otomatis</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>

                {/* LATEST NEWS / COMMUNITY INFO */}
                <div
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3 cursor-pointer hover:bg-slate-50/80 transition"
                  onClick={() => navigateTo('kabar_rt', 'Membuka Berita Kabar RT 03')}
                >
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                    Kabar RT 03
                  </h3>
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center text-slate-400">
                      <Newspaper className="w-6 h-6" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                        Jadwal Ronda Malam Bulan Ini Telah Diperbarui
                      </p>
                      <p className="text-[10px] text-slate-400">2 Jam yang lalu • Pengurus RT</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* ======================================================== */
            /* EMPTY MODULE / MENU SCREEN (Menu / Modul Kosongkan)      */
            /* ======================================================== */
            activeModule && (
              <div className="flex-1 flex flex-col bg-[#F2F5F9] text-slate-800">
                {/* Module Top Bar */}
                <div className="bg-gradient-to-b from-[#003366] via-[#0055A5] to-[#0055A5] pt-8 px-4 pb-4 text-white shadow-md">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigateTo('home')}
                      className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:scale-95 transition flex items-center gap-1.5 text-xs font-medium"
                      aria-label="Kembali ke Beranda"
                    >
                      <ArrowLeft className="w-5 h-5 text-white" />
                      <span>Kembali</span>
                    </button>
                    <div className="text-center">
                      <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 justify-center">
                        {activeModule.title}
                        {activeModule.badge && (
                          <span className="text-[10px] bg-red-500 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                            {activeModule.badge}
                          </span>
                        )}
                      </h2>
                    </div>
                    <div className="w-12"></div> {/* spacer for symmetry */}
                  </div>
                </div>

                {/* Module Empty Content Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-5 flex flex-col items-center justify-center text-center pb-24">
                  <div className="w-full max-w-[320px] bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center space-y-4">
                    {/* Module Icon Container */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${activeModule.accentColor}`}>
                      <activeModule.icon className="w-8 h-8" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-800">
                        {activeModule.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {activeModule.subtitle}
                      </p>
                    </div>

                    {/* Empty placeholder notice */}
                    <div className="w-full bg-[#F2F5F9] border border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center text-slate-400 space-y-1.5">
                      <Inbox className="w-7 h-7 text-slate-300" />
                      <p className="text-xs font-medium text-slate-500">Modul Kosong</p>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Menu / modul ini dikosongkan sesuai instruksi dan siap diisi fitur selanjutnya.
                      </p>
                    </div>

                    {/* Special PWA banner for Setting module */}
                    {activeModule.id === 'setting' && (
                      <div className="w-full">
                        <PWAInstallButton variant="banner" onInstalledToast={showToast} />
                      </div>
                    )}

                    {/* Back to Home Button */}
                    <button
                      onClick={() => navigateTo('home')}
                      className="w-full py-2.5 px-4 bg-[#0055A5] hover:bg-[#003366] text-white text-xs font-semibold rounded-xl shadow-xs transition active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      <span>Kembali ke Beranda</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          )}

          {/* BOTTOM NAVIGATION BAR WITH FLOATING QRIS BUTTON */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-3 py-2 flex justify-around items-end z-40">
            {/* Beranda */}
            <button
              onClick={() => navigateTo('home')}
              className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${
                currentScreen === 'home' ? 'text-[#0055A5]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className={`text-[10px] ${currentScreen === 'home' ? 'font-bold' : 'font-medium'}`}>
                Beranda
              </span>
            </button>

            {/* Aktivitas */}
            <button
              onClick={() => navigateTo('aktivitas', 'Membuka Aktivitas')}
              className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${
                currentScreen === 'aktivitas' ? 'text-[#0055A5]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <History className="w-5 h-5" />
              <span className={`text-[10px] ${currentScreen === 'aktivitas' ? 'font-bold' : 'font-medium'}`}>
                Aktivitas
              </span>
            </button>

            {/* CENTER FLOATING WargaPay / QRIS BUTTON */}
            <div className="relative -top-5 flex flex-col items-center">
              <button
                onClick={() => navigateTo('qris', 'Scanner QRIS WargaQu')}
                aria-label="Scanner QRIS WargaQu"
                className="w-14 h-14 bg-gradient-to-tr from-[#0055A5] to-[#00C4FF] rounded-full p-0.5 shadow-lg flex items-center justify-center text-white border-4 border-[#F2F5F9] pulse-animation cursor-pointer active:scale-95 transition"
              >
                <div className="w-full h-full rounded-full flex flex-col items-center justify-center">
                  <QrCode className="w-6 h-6" />
                </div>
              </button>
              <span className="text-[10px] font-extrabold text-[#0055A5] mt-0.5">QRIS</span>
            </div>

            {/* Untukmu */}
            <button
              onClick={() => navigateTo('untukmu', 'Membuka Menu Untukmu')}
              className={`flex flex-col items-center gap-0.5 relative transition cursor-pointer ${
                currentScreen === 'untukmu' ? 'text-[#0055A5]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className={`text-[10px] ${currentScreen === 'untukmu' ? 'font-bold' : 'font-medium'}`}>
                Untukmu
              </span>
              <span className="absolute top-0 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            </button>

            {/* Akun Saya */}
            <button
              onClick={() => navigateTo('akun', 'Membuka Akun Saya')}
              className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${
                currentScreen === 'akun' ? 'text-[#0055A5]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <UserCheck className="w-5 h-5" />
              <span className={`text-[10px] ${currentScreen === 'akun' ? 'font-bold' : 'font-medium'}`}>
                Akun Saya
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
