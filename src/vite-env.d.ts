/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LIQPAY_PUBLIC_KEY: string
  readonly VITE_LIQPAY_PRIVATE_KEY: string
  readonly VITE_LIQPAY_SANDBOX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}