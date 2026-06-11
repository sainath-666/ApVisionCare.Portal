import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AP Vision Care — Andhra Pradesh Digital Vision Care Platform",
  description:
    "Government of Andhra Pradesh statewide digital eye-care and public health intelligence platform",
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/images/apvision.png",
    shortcut: "/assets/images/apvision.png",
    apple: "/assets/images/apvision.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#004990",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
