import React from 'react';
import { Phone, Calendar } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-900/95 backdrop-blur-md border-t border-slate-700/80 p-3 shadow-2xl">
      <div className="flex items-center space-x-3 max-w-md mx-auto">
        <a
          href="tel:+447716835261"
          className="flex-1 bg-white/10 hover:bg-white/15 text-white font-medium py-3 rounded-xl border border-white/20 flex items-center justify-center space-x-2 text-xs transition"
        >
          <Phone className="w-4 h-4 text-teal-400" />
          <span>Call Secretary</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-[1.5] bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center space-x-2 text-xs transition"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Consultation</span>
        </button>
      </div>
    </div>
  );
};
