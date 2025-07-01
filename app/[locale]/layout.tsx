import { Inter } from "next/font/google";
import { locales } from "@/i18n/config";
import { Metadata } from "next";
// import Header from "@/components/Header";
import ClientHeaderWrapper from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import "../globals.css";
const inter = Inter({ subsets: ["latin", "cyrillic"] });

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// This function generates metadata for the root layout.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AnexTour",
    description: "AnexTour - ваш гід у світі подорожей",
    // Можете додати специфічні для локалі метадані
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <ClientHeaderWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
