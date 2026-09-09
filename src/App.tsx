import React, { useEffect, useState } from 'react';
import { TopHeader } from './components/TopHeader';
import { NavBar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsCounterBar } from './components/StatsCounterBar';
import { CredibilityLogoTicker } from './components/CredibilityLogoTicker';
import { TreatmentsCarousel } from './components/TreatmentsCarousel';
import { TreatmentDetailsPage } from './components/TreatmentDetailsPage';
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
import {
  getTreatmentBreadcrumbs,
  getTreatmentCategoryById,
  getTreatmentPageByPath,
  getTreatmentRouteSeo,
  isKnownTreatmentPath,
} from './data/treatmentHierarchy';

type PagePath = string;

const HOME_PATH: PagePath = '/';
const TREATMENTS_PATH: PagePath = '/treatments';
const ROBOTIC_SURGERY_PATH: PagePath = '/robotic-surgery';
const ROBOTIC_COMPARISON_PATH: PagePath = '/robotic-surgery/compare';
const SUBMIT_TESTIMONIAL_PATH: PagePath = '/submit-testimonial';
const SITE_TITLE =
  'Prof. Hemant Sheth | Consultant Upper GI, Laparoscopic & Robotic Surgeon London & Hertfordshire';
const SITE_ORIGIN = 'https://www.keyholesurgeon.co.uk';
const DEFAULT_DESCRIPTION =
  'Prof. Hemant Sheth is a Consultant Upper GI, Laparoscopic and Robotic Surgeon providing private care across London and Hertfordshire.';

const getCanonicalUrl = (path: string) => `${SITE_ORIGIN}${path === HOME_PATH ? '/' : path}`;

const setMetaContent = (selector: string, content: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) {
    element.setAttribute('content', content);
  }
};

const setRouteCanonical = (canonicalUrl: string) => {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = canonicalUrl;
};

const setRouteStructuredData = (path: string, title: string, description: string) => {
  const scriptId = 'route-structured-data';
  const existingScript = document.getElementById(scriptId);

  if (!path.startsWith(TREATMENTS_PATH)) {
    existingScript?.remove();
    return;
  }

  const canonicalUrl = getCanonicalUrl(path);
  const breadcrumbs = getTreatmentBreadcrumbs(path);
  const treatment = getTreatmentPageByPath(path);
  const category = treatment ? getTreatmentCategoryById(treatment.categoryId) : null;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.label,
        item: getCanonicalUrl(breadcrumb.path),
      })),
    },
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: 'Prof. Hemant Sheth',
        url: `${SITE_ORIGIN}/`,
      },
    },
  ];

  if (treatment) {
    graph.push({
      '@type': 'MedicalProcedure',
      '@id': `${canonicalUrl}#procedure`,
      name: treatment.title,
      description: treatment.answerFirst,
      bodyLocation: category?.title,
      url: canonicalUrl,
    });
  }

  const jsonLd = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': graph,
    },
    null,
    2
  );

  const script =
    existingScript instanceof HTMLScriptElement
      ? existingScript
      : document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';
  script.textContent = jsonLd;

  if (!existingScript) {
    document.head.appendChild(script);
  }
};

const isTreatmentPath = (path: string) =>
  path === TREATMENTS_PATH || path.startsWith(`${TREATMENTS_PATH}/`);

const getCurrentPath = (): PagePath => {
  const path = window.location.pathname.replace(/\/+$/, '') || HOME_PATH;

  if (path === TREATMENTS_PATH || isKnownTreatmentPath(path)) return path;
  if (path.startsWith(`${TREATMENTS_PATH}/`)) return TREATMENTS_PATH;
  if (path === ROBOTIC_SURGERY_PATH) return ROBOTIC_SURGERY_PATH;
  if (path === ROBOTIC_COMPARISON_PATH) return ROBOTIC_COMPARISON_PATH;
  if (path === SUBMIT_TESTIMONIAL_PATH) return SUBMIT_TESTIMONIAL_PATH;

  return HOME_PATH;
};

const getActiveTabForPath = (path: PagePath) => (
  isTreatmentPath(path)
    ? 'TREATMENTS'
    : path === SUBMIT_TESTIMONIAL_PATH
      ? 'PATIENT_INFO'
      : path === ROBOTIC_SURGERY_PATH || path === ROBOTIC_COMPARISON_PATH
        ? 'ROBOTIC'
        : 'HOME'
);

const getActiveTabForLocation = () => {
  const path = getCurrentPath();
  const hash = window.location.hash.replace(/^#/, '');

  if (path === HOME_PATH) {
    if (hash === 'about') return 'ABOUT';
    if (hash === 'clinics') return 'LOCATIONS';
    if (hash === 'faqs') return 'PATIENT_INFO';
  }

  return getActiveTabForPath(path);
};

const shouldUseNativeLink = (event: React.MouseEvent<HTMLAnchorElement>) =>
  event.defaultPrevented ||
  event.button !== 0 ||
  event.metaKey ||
  event.altKey ||
  event.ctrlKey ||
  event.shiftKey;

const getRouteFromHref = (href: string): { path: PagePath; hash?: string } | null => {
  const [pathPart, hashPart] = href.split('#');
  const normalizedPath = (pathPart || HOME_PATH).replace(/\/+$/, '') || HOME_PATH;

  if (normalizedPath === HOME_PATH) {
    return { path: HOME_PATH, hash: hashPart || undefined };
  }

  if (normalizedPath === TREATMENTS_PATH || isKnownTreatmentPath(normalizedPath)) {
    return { path: normalizedPath, hash: hashPart || undefined };
  }

  if (normalizedPath === ROBOTIC_SURGERY_PATH) {
    return { path: ROBOTIC_SURGERY_PATH, hash: hashPart || undefined };
  }

  if (normalizedPath === ROBOTIC_COMPARISON_PATH) {
    return { path: ROBOTIC_COMPARISON_PATH, hash: hashPart || undefined };
  }

  if (normalizedPath === SUBMIT_TESTIMONIAL_PATH) {
    return { path: SUBMIT_TESTIMONIAL_PATH, hash: hashPart || undefined };
  }

  return null;
};

export function App() {
  const [currentPath, setCurrentPath] = useState<PagePath>(() => getCurrentPath());
  const [activeTab, setActiveTab] = useState<string>(() => getActiveTabForLocation());
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [selectedProcedure, setSelectedProcedure] = useState<string>('');
  const [selectedClinicId, setSelectedClinicId] = useState<string | undefined>();
  const [focusedClinicId, setFocusedClinicId] = useState<string | undefined>();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getCurrentPath());
      setActiveTab(getActiveTabForLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    setActiveTab(getActiveTabForLocation());

    const treatmentSeo = getTreatmentRouteSeo(currentPath);
    const routeMeta = treatmentSeo
      ? {
          title: treatmentSeo.title,
          description: treatmentSeo.description,
          canonicalUrl: getCanonicalUrl(treatmentSeo.canonicalPath),
        }
      : currentPath === ROBOTIC_SURGERY_PATH
        ? {
            title: `Robotic Surgery | ${SITE_TITLE}`,
            description:
              'Robotic surgery information from Prof. Hemant Sheth, including how robotic-assisted procedures may support selected upper GI and laparoscopic surgery.',
            canonicalUrl: getCanonicalUrl(ROBOTIC_SURGERY_PATH),
          }
        : currentPath === ROBOTIC_COMPARISON_PATH
          ? {
              title: `Compare Surgical Approaches | ${SITE_TITLE}`,
              description:
                'Compare open, laparoscopic and robotic-assisted surgical approaches with patient-focused information from Prof. Hemant Sheth.',
              canonicalUrl: getCanonicalUrl(ROBOTIC_COMPARISON_PATH),
            }
          : currentPath === SUBMIT_TESTIMONIAL_PATH
            ? {
                title: `Submit Your Testimonial | ${SITE_TITLE}`,
                description:
                  'Submit patient feedback for Prof. Hemant Sheth through the website testimonial page.',
                canonicalUrl: getCanonicalUrl(SUBMIT_TESTIMONIAL_PATH),
              }
            : {
                title: SITE_TITLE,
                description: DEFAULT_DESCRIPTION,
                canonicalUrl: getCanonicalUrl(HOME_PATH),
              };

    document.title = routeMeta.title;
    setMetaContent('meta[name="title"]', routeMeta.title);
    setMetaContent('meta[name="description"]', routeMeta.description);
    setMetaContent('meta[property="og:title"]', routeMeta.title);
    setMetaContent('meta[property="og:description"]', routeMeta.description);
    setMetaContent('meta[property="og:url"]', routeMeta.canonicalUrl);
    setMetaContent('meta[property="twitter:title"]', routeMeta.title);
    setMetaContent('meta[property="twitter:description"]', routeMeta.description);
    setMetaContent('meta[property="twitter:url"]', routeMeta.canonicalUrl);
    setRouteCanonical(routeMeta.canonicalUrl);
    setRouteStructuredData(currentPath, routeMeta.title, routeMeta.description);
  }, [currentPath]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;

    let attempts = 0;
    let timer: number | undefined;

    const scrollToHashTarget = () => {
      const target = document.getElementById(hash);

      if (target) {
        target.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        });
        return;
      }

      attempts += 1;
      if (attempts < 20) {
        timer = window.setTimeout(scrollToHashTarget, 100);
      }
    };

    timer = window.setTimeout(scrollToHashTarget, 50);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
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

  const handleViewClinic = (clinicId: string) => {
    setProfileModalOpen(false);
    setFocusedClinicId(clinicId);
    goToPage(HOME_PATH, 'clinics');
  };

  const goToPage = (path: PagePath, hash?: string) => {
    window.history.pushState({}, '', `${path}${hash ? `#${hash}` : ''}`);
    setCurrentPath(path);

    window.setTimeout(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  const navigateToPage = (path: PagePath) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldUseNativeLink(event)) return;

    event.preventDefault();
    goToPage(path);
  };

  const handleNavNavigate = (
    href: string,
    tabId: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (shouldUseNativeLink(event)) return;

    if (tabId === 'ABOUT') {
      event.preventDefault();
      setActiveTab(tabId);
      handleViewProfile();
      return;
    }

    const route = getRouteFromHref(href);
    if (!route) return;

    event.preventDefault();
    setActiveTab(tabId);
    goToPage(route.path, route.hash);

    window.setTimeout(() => {
      setActiveTab(tabId);
    }, 0);
  };

  const renderMainContent = () => {
    if (isTreatmentPath(currentPath)) {
      return (
        <TreatmentDetailsPage
          currentPath={currentPath}
          onBackHome={navigateToPage(HOME_PATH)}
          onNavigate={goToPage}
          onOpenBooking={handleOpenBooking}
        />
      );
    }

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

        <TreatmentsCarousel
          onViewAllTreatments={() => goToPage(TREATMENTS_PATH)}
          onViewTreatment={(treatmentPath) => goToPage(treatmentPath)}
        />

        <RoboticSurgerySection
          onOpenBooking={() => handleOpenBooking('Robotic Surgery')}
          onExploreRobotic={navigateToPage(ROBOTIC_SURGERY_PATH)}
        />

        <RoboticTestimonialsSection onSubmitTestimonial={navigateToPage(SUBMIT_TESTIMONIAL_PATH)} />

        <ClinicLocations
          focusedClinicId={focusedClinicId}
          onFocusedClinicHandled={() => setFocusedClinicId(undefined)}
          onOpenBooking={(clinicId) => handleOpenBooking(undefined, clinicId)}
        />

        <AeoFaqSection />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#294363] selection:text-white">
      <TopHeader onOpenBooking={() => handleOpenBooking()} />

      <NavBar
        activeTab={activeTab}
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleNavNavigate}
      />

      <main className="flex-grow min-w-0 w-full overflow-x-hidden bg-[#f8fbfd]">
        {renderMainContent()}
      </main>

      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onViewProfile={handleViewProfile}
      />

      <ConsultationModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        preselectedProcedure={selectedProcedure}
        preselectedClinicId={selectedClinicId}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onOpenBooking={(clinicId) => {
          setProfileModalOpen(false);
          handleOpenBooking(undefined, clinicId);
        }}
        onViewClinic={handleViewClinic}
      />
    </div>
  );
}

export default App;
