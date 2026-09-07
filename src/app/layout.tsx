import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";

export const metadata: Metadata = {
  title: "wicstore | Growtopia Legacy Account Store",
  description: "wicstore - The premier Growtopia Legacy account marketplace. Providing the best Log Legacy (GrowID + Pass) accounts. Safe transactions via QRIS, All Banks, & Official Middleman (GTMART & GTID).",
  keywords: ["wicstore", "Akun Growtopia", "Jual Akun GT", "Log Legacy Growtopia", "Ringmaster GT", "Rekber GTID", "Rekber GTMART", "Akun Old 2015"],
  authors: [{ name: "wicstore" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' rx='4' fill='%23f59e0b'/><path d='M7 10h10v8H7z' fill='%23111827'/><path d='M9 6h6v4H9z' fill='%23fef08a'/></svg>",
  }
};

export const viewport: Viewport = {
  themeColor: "#080c14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen transition-colors antialiased selection:bg-amber-500 selection:text-black">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
