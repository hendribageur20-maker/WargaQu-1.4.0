import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-3.5 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-lg z-50 flex items-center gap-2 max-w-[85%] animate-bounce">
      <WifiOff className="w-3.5 h-3.5 shrink-0" />
      <span>Mode Offline — Cache aktif</span>
    </div>
  );
};
