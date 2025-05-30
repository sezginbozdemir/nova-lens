// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEDUSA_ADMIN_BACKEND_URL: string;
  readonly VITE_MEDUSA_STOREFRONT_URL: string;
  readonly VITE_MEDUSA_V2: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly hot: {
    accept: () => void;
  };
}

declare const __BACKEND_URL__: string | undefined;
declare const __STOREFRONT_URL__: string | undefined;
declare const __BASE__: string;

declare module "*.png" {
  const value: string;
  export default value;
}
