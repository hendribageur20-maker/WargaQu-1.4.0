import React, { useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'banner' | 'card';
  onInstalledToast?: (msg: string) => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  onInstalledToast,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // If already running inside standalone app, don't show prompt
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success && onInstalledToast) {
        onInstalledToast('Aplikasi WargaQu berhasil diinstall!');
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowInfoModal(true);
    }
  };

  if (variant === 'header') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="relative p-2 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition text-white flex items-center justify-center cursor-pointer"
          title="Install WargaQu ke Layar Utama"
          aria-label="Install WargaQu ke Layar Utama"
        >
          <Download className="w-5 h-5 text-[#34D399]" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34D399]"></span>
          </span>
        </button>

        {/* iOS Install Guide Modal */}
        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl text-slate-800">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#047857] flex items-center justify-center text-white">
                    <Download className="w-4 h-4 text-[#34D399]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Install di iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                  <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                    <Share className="w-4 h-4" />
                  </div>
                  <p>
                    1. Buka di <strong>Safari</strong> lalu ketuk tombol <strong>Share</strong> (Bagikan) di bagian bawah layar.
                  </p>
                </div>
                <div className="flex items-start gap-3 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                  <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <p>
                    2. Gulir ke bawah dan pilih <strong>Tambahkan ke Layar Utama</strong> (<em>Add to Home Screen</em>).
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-[#059669] hover:bg-[#047857] py-2.5 text-xs font-semibold text-white shadow-xs transition cursor-pointer"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}

        {/* General Info Modal when prompt is not immediately triggered */}
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl text-slate-800">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#047857] flex items-center justify-center text-white">
                    <Download className="w-4 h-4 text-[#34D399]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Install Aplikasi WargaQu</h3>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 text-xs text-slate-600 space-y-2">
                <p>
                  Aplikasi ini sudah berstandar <strong>Progressive Web App (PWA)</strong>.
                </p>
                <p className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-slate-700">
                  Buka menu peramban Anda (titik tiga di Chrome atau ikon bagikan di Safari/Edge), lalu pilih <strong>&quot;Install Aplikasi&quot;</strong> atau <strong>&quot;Tambahkan ke Layar Utama&quot;</strong>.
                </p>
              </div>

              <button
                onClick={() => setShowInfoModal(false)}
                className="mt-4 w-full rounded-xl bg-[#059669] hover:bg-[#047857] py-2.5 text-xs font-semibold text-white shadow-xs transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Variant banner
  return (
    <div className="bg-gradient-to-r from-[#047857] to-[#059669] text-white p-3 rounded-xl shadow-xs flex items-center justify-between border border-[#34D399]/30">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
          <Download className="w-4 h-4 text-[#34D399]" />
        </div>
        <div>
          <p className="text-xs font-bold leading-tight">Install WargaQu</p>
          <p className="text-[10px] text-emerald-100">Akses cepat dari layar utama HP</p>
        </div>
      </div>
      <button
        onClick={handleInstallClick}
        className="px-3 py-1.5 bg-[#34D399] hover:bg-[#6EE7B7] text-[#064E3B] font-bold text-[11px] rounded-lg shadow-xs transition active:scale-95 cursor-pointer"
      >
        Install
      </button>
    </div>
  );
};
