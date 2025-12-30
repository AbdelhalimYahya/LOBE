/**
 * Environment variable type definitions
 * Add your environment variables here for type safety
 */

declare namespace NodeJS {
  interface ProcessEnv {
    // متغيّر الـ API اللي نستخدمه في الفرونت
    NEXT_PUBLIC_API_BASE_URL?: string;

    // مثال لو حبيتي تضيفين أشياء ثانية بعدين:
    // DATABASE_URL?: string;
  }
  
}

