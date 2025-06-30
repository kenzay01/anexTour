"use client";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { useState, useEffect } from "react";

export default function IndividualComponent() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

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

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const targetId = href.split("#")[1];

    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          50;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }, 50); // або 100
  };

  return (
    <section className="bg-blue-900 flex items-center justify-center py-12 px-2">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
        <div className="text-white">
          <h1 className="text-lg md:text-3xl text-center">
            {dict?.individual?.title1 ||
              "У Вас індивідуальні вимоги до відпочинку?"}
          </h1>
          <h1 className="text-lg md:text-3xl text-center">
            {dict?.individual?.title2 ||
              "Ми з радістю підберемо тур, який підійде саме Вам!"}
          </h1>
        </div>
        <div className="flex-shrink-0">
          <a
            href="#form"
            onClick={(e) => handleSmoothScroll(e, "#form")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 transition-colors duration-300 text-xl"
          >
            {dict?.banner?.form?.submitButton || "Підібрати тур"}
          </a>
        </div>
      </div>
    </section>
  );
}
