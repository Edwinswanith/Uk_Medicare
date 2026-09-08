import React from 'react';
import { contactInfo, getVerifiedContact } from '../data/contactInfo';

interface TopHeaderProps {
  onOpenBooking: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenBooking }) => {
  const verifiedPhone = getVerifiedContact(contactInfo.generalPhone);

  return (
    <header className="bg-white border-b border-slate-100 py-3.5 sm:py-4 px-4 sm:px-8 sticky top-0 z-50 shadow-[0_2px_15px_rgba(0,0,0,0.03)] backdrop-blur-md bg-white/98">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        
        {/* Left: Official Surgeon Logo (Emblem Badge + Professional Credentials) */}
        <a href="/" className="flex w-full min-w-0 items-center justify-center space-x-3.5 sm:space-x-4 group cursor-pointer md:w-auto md:justify-start">
          {/* Official Caduceus & Primum Non Nocere Emblem */}
          <img
            src="/sheth_caduceus_emblem.png"
            alt="Prof. Hemant Sheth Medical Crest"
            className="h-12 sm:h-16 md:h-18 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-200 drop-shadow-sm"
          />

          {/* Thin Vertical Divider */}
          <div className="hidden sm:block h-12 w-[1.5px] bg-slate-200/90 self-center" />

          {/* Surgeon Titles & Specialization (Spacious, Crisp & Uncongested) */}
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-xl sm:text-2xl md:text-[27px] font-serif font-bold text-slate-900 tracking-tight leading-tight group-hover:text-[#0284c7] transition-colors">
              Prof. Hemant Sheth
            </p>
            <p className="max-w-[260px] text-[12px] sm:max-w-none sm:text-[13px] font-extrabold tracking-[0.08em] text-[#0284c7] uppercase mt-0.5 leading-snug">
              UGI &amp; Hepatobiliary Laparoscopic &amp; Robotic Surgeon
            </p>
            <p className="text-[12px] sm:text-[13px] text-slate-500 font-medium leading-snug">
              Specialist in Upper GI &amp; HPB Surgery
            </p>
          </div>
        </a>

        {/* Right: Book Consultation Button + Click To Call Phone */}
        <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6 shrink-0">
          <button
            onClick={onOpenBooking}
            className="text-button w-full bg-[#17293e] hover:bg-[#0284c7] text-white font-bold uppercase tracking-[0.08em] px-5 sm:w-auto sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Book A Consultation
          </button>

          {verifiedPhone && (
            <div className="text-center sm:text-right">
              <span className="block text-caption font-bold uppercase tracking-[0.12em] text-slate-500">
                Click To Call
              </span>
              <a
                href={verifiedPhone.href}
                className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#0284c7] transition flex items-center justify-center sm:justify-end"
              >
                {verifiedPhone.display}
              </a>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
