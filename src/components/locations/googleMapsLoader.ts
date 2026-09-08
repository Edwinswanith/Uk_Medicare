import { MAP_SCRIPT_VERSION } from './mapConfig';

type GoogleMapsWindow = Window & {
  google?: any;
  [key: string]: any;
};

let loadPromise: Promise<any> | null = null;

export const loadGoogleMaps = (apiKey: string) => {
  const browserWindow = window as GoogleMapsWindow;

  if (browserWindow.google?.maps?.importLibrary) {
    return Promise.resolve(browserWindow.google);
  }

  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const callbackName = `__initGoogleMaps${Date.now()}`;
    const params = new URLSearchParams({
      key: apiKey,
      loading: 'async',
      v: MAP_SCRIPT_VERSION,
      callback: callbackName,
    });

    browserWindow[callbackName] = () => {
      delete browserWindow[callbackName];
      resolve(browserWindow.google);
    };

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.onerror = () => {
      delete browserWindow[callbackName];
      loadPromise = null;
      reject(new Error('Google Maps JavaScript API could not load.'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};
