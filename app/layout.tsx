import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "ZYQXA Protocol — Institutional Real World Asset (RWA) Platform",
  description: "Institutional-grade infrastructure for borderless financial markets and onchain liquidity.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "ZYQXA Protocol — Institutional Real World Asset (RWA) Platform",
    description: "Institutional-grade infrastructure for borderless financial markets and onchain liquidity.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZYQXA Protocol — Institutional Real World Asset (RWA) Platform",
    description: "Institutional-grade infrastructure for borderless financial markets and onchain liquidity.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Masukkan variabel jakarta ke tag <html>
    <html lang="en" className={jakarta.variable}>
      <body className="bg-background text-foreground antialiased">
        {/* Render halaman utama */}
        {children}
      </body>
    </html>
  );
}