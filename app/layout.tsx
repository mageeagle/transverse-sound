import { Noto_Sans_HK } from "next/font/google";
import "./globals.css";

const inter = Noto_Sans_HK({ subsets: ["latin"] });

import type { Metadata, Viewport } from "next";

const APP_NAME = "Demo: Transverse";
const APP_DEFAULT_TITLE = "Demo: Transverse: Interactive Audio Walk 測試：狹縫穿梭：互動聲音漫遊導航";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Interactive Audio Experience";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  manifest: "/manifest.json",
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
