"use client";

import Link from "next/link";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { MapPin } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logotip.png"; // Adjust the path as necessary
import sign from "@/public/sign.png"; // Adjust the path as necessary
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";

export default function Header() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Calculate header height on mount and resize
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);

    return () => window.removeEventListener("resize", calculateHeaderHeight);
  }, []);

  // Smooth scroll function
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const targetId = href.split("#")[1];
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - headerHeight - 50;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  if (loading || !dict) {
    return <header className="h-24 bg-gray-100"></header>;
  }

  const headerLinks = [
    { href: `/${currentLocale}#offers`, label: dict.header.nav.offers },
    { href: `/${currentLocale}#hot-tours`, label: dict.header.nav.hotTours },
    {
      href: `/${currentLocale}#destinations`,
      label: dict.header.nav.destinations,
    },
  ];

  // Extract phone number for tel: link (remove spaces, dashes, etc.)
  const phoneNumber = dict.header.phone.replace(/[^\d+]/g, "");

  return (
    <>
      <header className="bg-white/90 shadow-sm sticky top-0 z-50 backdrop-blur-md">
        {/* Main header */}
        <div className="absolute hidden xl:flex left-10 top-1/2 transform -translate-y-1/2 items-center justify-center h-32 w-32">
          <Image
            src={sign}
            alt="Sign"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="hidden md:block max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-2">
              <Link href={`/${currentLocale}`} className="flex flex-col">
                <div className="flex items-center justify-center w-64 h-36">
                  <Image
                    src={logo}
                    alt="Anex Tour Logo"
                    className="object-contain w-full h-full"
                    //   width={150}
                    //   height={150}
                  />
                </div>
              </Link>
            </div>

            <div className="flex flex-col w-full flex-4">
              <div className="flex flex-col items-end mb-2">
                <LanguageSwitcher currentLocale={currentLocale} />
                <div className="flex justify-between items-center space-x-10">
                  <div className="flex items-center space-x-2 ">
                    <MapPin className="w-4 h-4" />
                    <div className="text-sm ">{dict.header.location}</div>
                  </div>
                  <div className="text-[12px] flex-1 text-blue-950 lowercase">
                    {dict.header.address}
                  </div>
                </div>
                <a
                  href={`tel:${phoneNumber}`}
                  className="font-light text-red-500 text-sm hover:underline"
                >
                  {dict.header.phone}
                </a>
              </div>
              <hr className="border-2 border-red-500" />
              {/* Navigation */}
              <nav className="flex items-center justify-end space-x-8 my-2">
                {headerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-gray-700 hover:text-red-500 font-bold uppercase cursor-pointer transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Call to action */}
              <div className="flex items-end justify-end space-x-4">
                <button
                  className="text-red-600 border-b-2 border-dashed font-medium transition-colors"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  {dict.header.cta.callBack}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile header */}
        <div className="md:hidden bg-white shadow-sm mx-auto px-1">
          <div className="flex items-center justify-between py-2">
            <Link href={`/${currentLocale}`} className="flex flex-col">
              <div className="flex items-center justify-center">
                <Image
                  src={logo}
                  alt="Anex Tour Logo"
                  className="object-contain w-full h-full"
                  width={65}
                  height={65}
                />
              </div>
            </Link>
            <LanguageSwitcher currentLocale={currentLocale} />
            <div className="flex flex-col items-end">
              <a
                href={`tel:${phoneNumber}`}
                className="font-light bg-red-600 text-white animate-pulse text-[12px] hover:underline"
              >
                {dict.header.phone}
              </a>
              <button
                className="text-red-600 border-b-2 border-dashed font-medium text-sm transition-colors p-2 "
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                {dict.header.cta.callBack}
              </button>
            </div>
          </div>
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
