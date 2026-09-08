import React from 'react';
import { LaparoscopicIcon, StomachRefluxIcon, HerniaIcon } from './ServiceIcons';
import { ChevronRight } from 'lucide-react';

interface QuickServiceCardsProps {
  onSelectService: (serviceName: string) => void;
}

export const QuickServiceCards: React.FC<QuickServiceCardsProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'gallbladder',
      title: 'Gallbladder & Gallstones',
      description: 'Comprehensive care with laparoscopic & robotic solutions for rapid recovery.',
      icon: <LaparoscopicIcon className="w-8 h-8 text-[#0284c7]" />,
    },
    {
      id: 'reflux',
      title: 'Acid Reflux & Heartburn',
      description: 'Advanced robotic LINX and fundoplication treatments for GERD & Hiatus Hernia.',
      icon: <StomachRefluxIcon className="w-8 h-8 text-[#0284c7]" />,
    },
    {
      id: 'hernia',
      title: 'Hernia Repair',
      description: 'Expert repair with minimal invasive keyhole and robotic-assisted techniques.',
      icon: <HerniaIcon className="w-8 h-8 text-[#0284c7]" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-sky-50/25 to-white pt-10 sm:pt-14 pb-20 px-4 sm:px-8 border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.title)}
              className="bg-white border border-slate-200/70 rounded-2xl p-7 sm:p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_35px_rgba(2,132,199,0.1)] hover:border-sky-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between group cursor-pointer"
            >
              <div className="flex flex-col items-center">
                {/* Circular Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-sky-50/80 border border-sky-100 group-hover:bg-[#e0f2fe] group-hover:scale-105 flex items-center justify-center mb-5 transition-all duration-200 shadow-sm">
                  {service.icon}
                </div>

                {/* Title */}
                <h4 className="font-sans font-bold text-base sm:text-[18px] text-slate-900 group-hover:text-[#0284c7] transition mb-2.5">
                  {service.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal max-w-[250px]">
                  {service.description}
                </p>
              </div>

              {/* Clean Learn More Indicator */}
              <div className="mt-5 pt-3 border-t border-slate-100 w-full flex items-center justify-center text-xs font-bold text-[#0284c7] group-hover:text-[#0369a1] transition-colors">
                <span>View Treatment Details</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
