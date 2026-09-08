import React, { useEffect, useState } from 'react';
import { TopHeader } from './components/TopHeader';
import { NavBar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsCounterBar } from './components/StatsCounterBar';
import { CredibilityLogoTicker } from './components/CredibilityLogoTicker';
import { TreatmentsCarousel } from './components/TreatmentsCarousel';
import { RoboticSurgerySection } from './components/RoboticSurgerySection';
import { RoboticTestimonialsSection } from './components/RoboticTestimonialsSection';
import { RoboticSurgeryExplainerSection } from './components/RoboticSurgeryExplainerSection';
import { RoboticComparisonSection } from './components/RoboticComparisonSection';
import { ClinicLocations } from './components/ClinicLocations';
import { AeoFaqSection } from './components/AeoFaqSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { ProfileModal } from './components/ProfileModal';
import { SubmitTestimonialPage } from './components/SubmitTestimonialPage';

type PagePath = '/' | '/robotic-surgery' | '/robotic-surgery/compare' | '/submit-testimonial';

const HOME_PATH: PagePath = '/';
const ROBOTIC_SURGERY_PATH: PagePath = '/robotic-surgery';
const ROBOTIC_COMPARISON_PATH: PagePath = '/robotic-surgery/compare';
const SUBMIT_TESTIMONIAL_PATH: PagePath = '/submit-testimonial';
const SITE_TITLE =
  'Prof. Hemant Sheth | Consultant Upper GI, Laparoscopic & Robotic Surgeon London & Hertfordshire';

const getCurrentPath = (): PagePath => {
  const path = window.location.pathname.replace(/\/+$/, '') || HOME_PATH;

  if (path === ROBOTIC_SURGERY_PATH) return ROBOTIC_SURGERY_PATH;
  if (path === ROBOTIC_COMPARISON_PATH) return ROBOTIC_COMPARISON_PATH;
  if (path === SUBMIT_TESTIMONIAL_PATH) return SUBMIT_TESTIMONIAL_PATH;

  return HOME_PATH;
};

const getActiveTabForPath = (path: PagePath) => (
  path === HOME_PATH ? 'HOME' : path === SUBMIT_TESTIMONIAL_PATH ? 'PATIENT_INFO' : 'ROBOTIC'
);

const shouldUseNativeLink = (event: React.MouseEvent<HTMLAnchorElement>) =>
  event.defaultPrevented ||
  event.button !== 0 ||
  event.metaKey ||
  event.altKey ||
  event.ctrlKey ||
  event.shiftKey;

export function App() {
  const [currentPath, setCurrentPath] = useState<PagePath>(() => getCurrentPath());
  const [activeTab, setActiveTab] = useState<string>(() => getActiveTabForPath(getCurrentPath()));
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [selectedProcedure, setSelectedProcedure] = useState<string>('');
  const [selectedClinicId, setSelectedClinicId] = useState<string | undefined>();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    setActiveTab(getActiveTabForPath(currentPath));

    document.title =
      currentPath === ROBOTIC_SURGERY_PATH
        ? `Robotic Surgery | ${SITE_TITLE}`
        : currentPath === ROBOTIC_COMPARISON_PATH
          ? `Compare Surgical Approaches | ${SITE_TITLE}`
          : currentPath === SUBMIT_TESTIMONIAL_PATH
            ? `Submit Your Testimonial | ${SITE_TITLE}`
          : SITE_TITLE;
  }, [currentPath]);

  const handleOpenBooking = (procedureName?: string, clinicId?: string) => {
    setSelectedProcedure(procedureName ?? '');
    setSelectedClinicId(clinicId);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  const handleViewProfile = () => {
    setProfileModalOpen(true);
  };

  const navigateToPage = (path: PagePath) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldUseNativeLink(event)) return;

    event.preventDefault();
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderMainContent = () => {
    if (currentPath === ROBOTIC_SURGERY_PATH) {
      return (
        <>
          <RoboticSurgeryExplainerSection
            onOpenBooking={() => handleOpenBooking('Robotic Surgery')}
            onCompareApproaches={navigateToPage(ROBOTIC_COMPARISON_PATH)}
          />
          <RoboticTestimonialsSection onSubmitTestimonial={navigateToPage(SUBMIT_TESTIMONIAL_PATH)} />
          <RoboticComparisonSection onOpenBooking={() => handleOpenBooking('Robotic Surgery')} />
        </>
      );
    }

    if (currentPath === ROBOTIC_COMPARISON_PATH) {
      return (
        <>
          <RoboticComparisonSection onOpenBooking={() => handleOpenBooking('Robotic Surgery')} />
          <RoboticTestimonialsSection onSubmitTestimonial={navigateToPage(SUBMIT_TESTIMONIAL_PATH)} />
        </>
      );
    }

    if (currentPath === SUBMIT_TESTIMONIAL_PATH) {
      return (
        <SubmitTestimonialPage
          onOpenBooking={() => handleOpenBooking()}
          onViewProfile={handleViewProfile}
        />
      );
    }

    return (
      <>
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onViewProfile={handleViewProfile}
        />

        <StatsCounterBar />
        <CredibilityLogoTicker />

        <TreatmentsCarousel onSelectTreatment={handleOpenBooking} />

        <RoboticSurgerySection
          onOpenBooking={() => handleOpenBooking('Robotic Surgery')}
          onExploreRobotic={navigateToPage(ROBOTIC_SURGERY_PATH)}
        />

        <RoboticTestimonialsSection onSubmitTestimonial={navigateToPage(SUBMIT_TESTIMONIAL_PATH)} />

        <ClinicLocations onOpenBooking={(clinicId) => handleOpenBooking(undefined, clinicId)} />

        <AeoFaqSection />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#294363] selection:text-white">
      <TopHeader onOpenBooking={() => handleOpenBooking()} />

      <NavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      <main className="flex-grow min-w-0 w-full overflow-x-hidden">
        {renderMainContent()}
      </main>

      <Footer onOpenBooking={() => handleOpenBooking()} />

      <ConsultationModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        preselectedProcedure={selectedProcedure}
        preselectedClinicId={selectedClinicId}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onOpenBooking={() => {
          setProfileModalOpen(false);
          handleOpenBooking();
        }}
      />
    </div>
  );
}

export default App;
