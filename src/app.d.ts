declare global {
  namespace App {
    interface PageData {
      meta?: {
        title: string;
        description: string;
        canonical?: string;
        jsonLd?: Record<string, unknown> | Record<string, unknown>[];
      };
    }
  }
}

export {};
