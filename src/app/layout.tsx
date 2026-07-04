import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import TrafficTracker from "@/components/TrafficTracker";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TPQ Al Manshurin — Taman Pendidikan Qur'an Cikarang",
  description:
    "TPQ Al Manshurin Cikarang — Mencetak generasi Alim Faqih, Berakhlaqul Karimah dan Mandiri. Pembelajaran Al-Qur'an dengan metode Manqul & Talaqqi di Grand Cikarang City, Bekasi.",
  keywords: [
    "TPQ Al Manshurin",
    "Taman Pendidikan Quran",
    "Cikarang",
    "Bekasi",
    "Belajar Quran",
    "Manqul",
    "Talaqqi",
  ],
  openGraph: {
    title: "TPQ Al Manshurin — Taman Pendidikan Qur'an Cikarang",
    description:
      "Mencetak generasi Alim Faqih, Berakhlaqul Karimah dan Mandiri.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <TrafficTracker />
        {children}
      </body>
    </html>
  );
}
