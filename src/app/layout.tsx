import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";
import Script from "next/script";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PropTradX-Trading Platform",
  description: "An innovative platform for modern solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
         <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5355978764450307"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gray-50 text-gray-950 dark:bg-gray-900 dark:text-white min-h-screen">
       <SessionProviderWrapper>
        <LayoutWrapper>{children}</LayoutWrapper>
        </SessionProviderWrapper>
        {/* Google Analytics Script */}
         <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W9F5DFXMSV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W9F5DFXMSV');
          `}
        </Script>
      </body>
    </html>
  );
}
