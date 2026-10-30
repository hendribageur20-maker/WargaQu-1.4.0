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
  Inbox
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
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
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
    accentColor: 'text-teal-700 bg-teal-50 border-teal-200',
  },
  muamalahqu: {
    id: 'muamalahqu',
    title: 'MuamalahQu',
    subtitle: 'Kas Sosial, ZISWAF & Donasi Warga',
    icon: HandHeart,
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
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
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  qris: {
    id: 'qris',
    title: 'QRIS WargaPay',
    subtitle: 'Pemindai & Pembayaran Digital',
    icon: QrCode,
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  untukmu: {
    id: 'untukmu',
    title: 'Untukmu',
    subtitle: 'Rekomendasi, Promo & Program Khusus',
    icon: Sparkles,
    accentColor: 'text-amber-500 bg-amber-50 border-amber-200',
  },
  akun: {
    id: 'akun',
    title: 'Akun Saya',
    subtitle: 'Profil Warga & Keamanan Akun',
    icon: UserCheck,
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  riwayat_iuran: {
    id: 'riwayat_iuran',
    title: 'Riwayat Iuran',
    subtitle: 'Pencatatan Pembayaran Iuran Warga',
    icon: Receipt,
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  kabar_rt: {
    id: 'kabar_rt',
    title: 'Kabar RT 03',
    subtitle: 'Informasi & Pengumuman Resmi Pengurus',
    icon: Newspaper,
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  wargapay: {
    id: 'wargapay',
    title: 'WargaPay',
    subtitle: 'Dompet Digital & Pembayaran Cepat',
    icon: QrCode,
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
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
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  bantuan: {
    id: 'bantuan',
    title: 'Pusat Bantuan',
    subtitle: 'Bantuan & Layanan Pengaduan',
    icon: Headphones,
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  profil: {
    id: 'profil',
    title: 'Profil Warga',
    subtitle: 'Data Pribadi & Keluarga Terdaftar',
    icon: User,
    accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
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
    <div className="min-h-screen bg-slate-100/90 flex justify-center text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Real Mobile App Container - Clean, No fake device frame / notch */}
      <div
        id="app-container"
        className="w-full max-w-md min-h-screen bg-[#F0FDF4] shadow-xl flex flex-col relative overflow-hidden"
      >
        {/* OFFLINE INDICATOR */}
        <OfflineIndicator />

        {/* TOAST NOTIFICATION CONTAINER */}
        <div
          id="toast"
          className={`fixed sm:absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300 shadow-xl z-50 flex items-center gap-2 max-w-[90%] text-center ${
            toast.show
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <Info className="w-4 h-4 text-[#34D399] shrink-0" />
          <span id="toastMsg" className="truncate">
            {toast.message}
          </span>
        </div>

        {currentScreen === 'home' ? (
          /* ======================================================== */
          /* BERANDA SCREEN (Emerald & Mint Green Theme)              */
          /* ======================================================== */
          <>
            {/* TOP APP BAR & HEADER CONTAINER (Emerald Green Gradient) */}
            <header className="bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#059669] pt-6 px-5 pb-16 rounded-b-[32px] relative text-white shadow-sm">
              {/* Top Header Row */}
              <div className="flex justify-between items-center mb-4">
                {/* Logo / Title */}
                <div
                  className="flex items-center gap-1.5 cursor-pointer"
                  onClick={() => showToast('WargaQu - Sistem Digital RT 03')}
                >
                  <span className="text-2xl font-extrabold italic tracking-tight text-white">
                    warga<span className="text-[#34D399] font-black">Qu</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/30 border border-emerald-300/40 px-2 py-0.5 rounded-full font-semibold text-[#6EE7B7]">
                    RT 03
                  </span>
                </div>

                {/* Right Quick Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* PWA Install Button */}
                  <PWAInstallButton variant="header" onInstalledToast={showToast} />

                  <button
                    aria-label="Notifikasi"
                    className="relative p-2 rounded-full hover:bg-white/15 transition active:scale-95 cursor-pointer"
                    onClick={() => navigateTo('notifikasi', 'Membuka Notifikasi')}
                  >
                    <Bell className="w-5 h-5 text-white" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button
                    aria-label="Pusat Bantuan"
                    className="p-2 rounded-full hover:bg-white/15 transition active:scale-95 cursor-pointer"
                    onClick={() => navigateTo('bantuan', 'Pusat Bantuan WargaQu')}
                  >
                    <Headphones className="w-5 h-5 text-white" />
                  </button>
                  <button
                    aria-label="Pengaturan Profil"
                    className="p-2 rounded-full hover:bg-white/15 transition active:scale-95 cursor-pointer"
                    onClick={() => navigateTo('profil', 'Pengaturan Profil')}
                  >
                    <User className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Greeting User */}
              <div className="mt-1 mb-2">
                <p className="text-xs text-emerald-200 tracking-wider uppercase font-medium">Halo,</p>
                <h1 className="text-lg font-bold text-white tracking-wide">HENDRIANA</h1>
              </div>
            </header>

            {/* SCROLLABLE MAIN CONTENT AREA */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 -mt-12 pb-24 space-y-4">
              {/* MAIN CARD WIDGET: TOTAL IURAN */}
              <div className="bg-white rounded-2xl p-4 shadow-md border border-emerald-100/60 relative overflow-hidden">
                {/* Top ID Badge Row */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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
                      className="text-emerald-600 hover:text-emerald-800 transition p-1 cursor-pointer"
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
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-emerald-700">
                  <button
                    onClick={() => navigateTo('riwayat_iuran', 'Membuka Riwayat Iuran...')}
                    className="flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>Lihat Riwayat Pembayaran</span>
                  </button>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* ANNOUNCEMENT / BANNER CAROUSEL (Emerald & Mint Aesthetic) */}
              <div
                className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-xl p-3.5 text-white shadow-md flex items-center justify-between cursor-pointer hover:opacity-95 transition active:scale-[0.99]"
                onClick={() => navigateTo('kabar_rt', 'Detail Kegiatan Gotong Royong')}
              >
                <div className="space-y-0.5">
                  <div className="inline-block bg-yellow-400 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                    Kegiatan Warga
                  </div>
                  <h4 className="text-xs font-bold leading-tight">Gotong Royong Minggu Ini!</h4>
                  <p className="text-[11px] text-emerald-100">Dapatkan Poin Keaktifan Warga &gt;</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </div>
              </div>

              {/* MENU UTAMA (MODULE GRID) */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100/50">
                {/* Section Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 text-sm">Menu Utama</h3>
                  <button
                    onClick={() => navigateTo('atur_menu', 'Mode Atur Menu Utama')}
                    className="text-xs font-bold text-emerald-700 flex items-center gap-1 hover:underline cursor-pointer"
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
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 active:scale-95 transition shadow-xs">
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
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 group-hover:scale-105 active:scale-95 transition shadow-xs">
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
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 active:scale-95 transition shadow-xs">
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

                {/* Indicator dots (Pagination indicator style) */}
                <div className="flex justify-center items-center gap-1.5 mt-5">
                  <span className="w-5 h-1.5 bg-emerald-600 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                </div>
              </div>

              {/* EXTRA FEATURE STRIP (NFC / QUICK BAYAR BANNER) */}
              <div
                className="bg-white rounded-xl p-3 border border-emerald-100/60 flex items-center justify-between shadow-xs cursor-pointer hover:bg-emerald-50/40 transition active:scale-[0.99]"
                onClick={() => navigateTo('wargapay', 'Fitur Bayar Cepat')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-700">
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
                className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100/50 space-y-3 cursor-pointer hover:bg-slate-50/80 transition"
                onClick={() => navigateTo('kabar_rt', 'Membuka Berita Kabar RT 03')}
              >
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Kabar RT 03
                </h3>
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg shrink-0 flex items-center justify-center text-emerald-600">
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
          /* EMPTY MODULE / MENU SCREEN (Emerald Theme)               */
          /* ======================================================== */
          activeModule && (
            <div className="flex-1 flex flex-col bg-[#F0FDF4] text-slate-800">
              {/* Module Top Bar */}
              <header className="bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#059669] pt-6 px-4 pb-4 text-white shadow-md">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateTo('home')}
                    className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:scale-95 transition flex items-center gap-1.5 text-xs font-medium cursor-pointer"
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
              </header>

              {/* Module Empty Content Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-5 flex flex-col items-center justify-center text-center pb-24">
                <div className="w-full max-w-[320px] bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col items-center space-y-4">
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
                  <div className="w-full bg-[#F0FDF4] border border-dashed border-emerald-200 rounded-xl p-4 flex flex-col items-center text-slate-400 space-y-1.5">
                    <Inbox className="w-7 h-7 text-emerald-400" />
                    <p className="text-xs font-semibold text-emerald-800">Modul Kosong</p>
                    <p className="text-[11px] text-slate-500 leading-snug">
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
                    className="w-full py-2.5 px-4 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold rounded-xl shadow-xs transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
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
        <nav className="fixed sm:absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-emerald-100 px-3 py-2 flex justify-around items-end z-40 shadow-lg">
          {/* Beranda */}
          <button
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center gap-0.5 transition cursor-pointer ${
              currentScreen === 'home' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
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
              currentScreen === 'aktivitas' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
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
              className="w-14 h-14 bg-gradient-to-tr from-[#047857] via-[#059669] to-[#34D399] rounded-full p-0.5 shadow-lg flex items-center justify-center text-white border-4 border-[#F0FDF4] pulse-animation cursor-pointer active:scale-95 transition"
            >
              <div className="w-full h-full rounded-full flex flex-col items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
            </button>
            <span className="text-[10px] font-extrabold text-emerald-700 mt-0.5">QRIS</span>
          </div>

          {/* Untukmu */}
          <button
            onClick={() => navigateTo('untukmu', 'Membuka Menu Untukmu')}
            className={`flex flex-col items-center gap-0.5 relative transition cursor-pointer ${
              currentScreen === 'untukmu' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
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
              currentScreen === 'akun' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span className={`text-[10px] ${currentScreen === 'akun' ? 'font-bold' : 'font-medium'}`}>
              Akun Saya
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}
