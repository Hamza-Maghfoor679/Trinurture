import type { Metadata } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://trinurture.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TriNurture — Screen-Free Child Development for Ages 1–8",
    template: "%s | TriNurture",
  },
  description:
    "Give your child a real childhood beyond screens. TriNurture helps parents nurture Mind & Curiosity, Body & Grit, and Heart & Social — get your free 3-Pillar Research Blueprint on WhatsApp.",
  keywords: [
    "TriNurture",
    "screen-free parenting",
    "child development",
    "parenting guide",
    "ages 1-8",
    "WhatsApp parenting",
  ],
  authors: [{ name: "TriNurture" }],
  creator: "TriNurture",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TriNurture",
    title: "TriNurture — A childhood screens can't steal",
    description:
      "Screen-free child development for parents of kids ages 1–8. Claim your free 3-Pillar Research Blueprint, delivered on WhatsApp.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "TriNurture — Mind, Body, and Heart for growing kids",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TriNurture — Screen-Free Child Development",
    description:
      "Nurture Mind, Body, and Heart at home. Free Blueprint for parents worldwide.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-text">
        {children}
      </body>
    </html>
  );
}
