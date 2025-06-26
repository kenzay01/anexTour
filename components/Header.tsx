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

export default function Header() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

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

  return (
    <header className="bg-white/90 shadow-sm sticky top-0 z-50 backdrop-blur-md">
      {/* Main header */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-32 w-32">
        <Image src={sign} alt="Sign" className="object-contain w-full h-full" />
      </div>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center space-x-4 flex-2">
            {/* Satisfaction guarantee badge */}
            {/* <div className="relative">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center border-4 border-red-600">
                <div className="text-center">
                  <div className="text-white text-xs font-bold leading-tight">
                    {dict.header.guarantee.split(" ")[0]}
                    <br />
                    {dict.header.guarantee.split(" ")[1]}
                  </div>
                  <div className="text-white text-lg font-bold">100%</div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div> */}
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
                <div className="text-[12px] flex-1 text-blue-950">
                  {dict.header.address}
                </div>
              </div>
              <div className="font-light text-red-500 text-sm">
                {dict.header.phone}
              </div>
            </div>
            <hr className="border-2 border-red-500" />
            {/* Navigation */}
            <nav className="hidden lg:flex items-center justify-end space-x-8 my-2">
              {headerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-red-500 font-bold uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Call to action */}
            <div className="flex items-end justify-end space-x-4">
              <button className="text-red-600 border-b-2 border-dashed font-medium transition-colors">
                {dict.header.cta.callBack}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
