"use client";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

import partner1 from "@/public/partners/partner1.jpg";
import partner2 from "@/public/partners/partner2.jpg";
import partner3 from "@/public/partners/partner3.png";
import partner4 from "@/public/partners/partner4.png";
import partner5 from "@/public/partners/partner5.webp";
import Image from "next/image";
export default function PartnersContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  const partners = [
    {
      id: 1,
      name: "Partner 1",
      image: partner1,
      width: "w-26",
    },
    {
      id: 2,
      name: "Partner 2",
      image: partner2,
      width: "w-26",
    },
    {
      id: 3,
      name: "Partner 3",
      image: partner3,
      width: "w-12",
    },
    {
      id: 4,
      name: "Partner 4",
      image: partner4,
      width: "w-23",
    },
    {
      id: 5,
      name: "Partner 5",
      image: partner5,
      width: "w-32",
    },
  ];
  return (
    <section className="bg-white flex items-center justify-center pt-12 pb-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl text-center mb-12">{dict?.partners.title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
          {partners.map((partner) => (
            <div
              className="flex flex-col items-center gap-2 mb-8"
              key={partner.id}
            >
              <Image
                src={partner.image}
                alt={partner.name}
                className={`h-auto ${partner.width}`}
                key={partner.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
