import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavBarProps {
  activeTab: string;
  onOpenBooking: () => void;
  onNavigate: (
    href: string,
    tabId: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  activeTab,
  onOpenBooking,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'HOME', label: 'HOME', href: '/' },
    { id: 'ROBOTIC', label: 'ROBOTIC SURGERY', href: '/robotic-surgery' },
    { id: 'TREATMENTS', label: 'TREATMENTS & SPECIALTIES', href: '/treatments' },
    { id: 'LOCATIONS', label: 'LOCATIONS', href: '/#clinics' },
    { id: 'PATIENT_INFO', label: 'FAQS', href: '/#faqs' },
    { id: 'CONTACT', label: 'CONTACT', href: '#' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: typeof navItems[number]
  ) => {
    // No dedicated Contact section exists yet — route straight to the
    // booking/enquiry modal instead of leaving a dead in-page anchor.
    if (item.id === 'CONTACT') {
      e.preventDefault();
      onOpenBooking();
      setMobileMenuOpen(false);
      return;
    }

    onNavigate(item.href, item.id, e);
  };

  return (
    // Not sticky: TopHeader above (which carries the actual appointment
    // CTA and phone number) is the one persistent control once scrolled.
    // TopHeader's height varies by breakpoint (it wraps to two rows on
    // narrow viewports), so a second independently-sticky bar directly
    // below it would need a matching dynamic offset — pinning both at
    // top-0 instead made this nav render fully hidden beneath the header
    // once real stickiness was restored. One persistent control is also
    // what the task's own guidance asks for over stacking several.
    <nav className="bg-white/95 backdrop-blur-md border-y border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Desktop Nav Items
            Note: this switches on at `lg` (1024px), not `md` (768px).
            Measured content width (~793px) doesn't fit an md-width
            container, which clipped the last item at exactly 768px —
            the mobile hamburger pattern below now covers 768-1023px,
            where it already renders correctly with no clipping. */}
        <div className="hidden xl:flex items-center justify-start space-x-1 sm:space-x-2 py-0 text-[15px] font-semibold tracking-[0.06em] text-slate-700">
          {navItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`py-3.5 px-3 transition-colors relative uppercase ${
                  activeTab === item.id
                    ? 'text-[#0284c7] font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#0284c7]'
                    : 'text-slate-600 hover:text-[#0284c7]'
                }`}
              >
                {item.label}
              </a>

              {/* Separator bar `|` between items */}
              {index < navItems.length - 1 && (
                <span className="text-slate-200 font-light select-none px-1">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Header Toggle (covers up to 1023px — see note above) */}
        <div className="xl:hidden flex items-center justify-between py-2.5">
          <span className="text-[15px] font-bold uppercase tracking-[0.08em] text-slate-800">
            Navigation Menu
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-slate-900 rounded focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-slate-200 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item);
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-3 text-base font-bold tracking-[0.05em] rounded ${
                  activeTab === item.id
                    ? 'bg-[#294363] text-white'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

      </div>
    </nav>
  );
};
