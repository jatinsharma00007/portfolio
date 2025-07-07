/// <reference types="vite/client" />

interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

interface ImportMetaEnv {
  readonly VITE_GA_TRACKING_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
