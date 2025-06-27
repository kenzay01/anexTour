"use client";
import beach from "@/public/offers/beach.jpg";
import exсurse from "@/public/offers/excurse.jpg";
import island from "@/public/offers/island.jpg";
import skis from "@/public/offers/skis.jpg";
import Image, { StaticImageData } from "next/image";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function OffersContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  if (loading || !dict) {
    return <div className="h-96 bg-gray-100"></div>;
  }

  type OfferKey = "beach" | "excursion" | "skiResorts" | "islands";

  const offers = [
    {
      id: 1,
      titleKey: "beach",
      descriptionKey: "beachDescription",
      image: beach,
    },
    {
      id: 2,
      titleKey: "excursion",
      descriptionKey: "excursionDescription",
      image: exсurse,
    },
    {
      id: 3,
      titleKey: "skiResorts",
      descriptionKey: "skiResortsDescription",
      image: skis,
    },
    {
      id: 4,
      titleKey: "islands",
      descriptionKey: "islandsDescription",
      image: island,
    },
  ] as {
    id: number;
    titleKey: OfferKey;
    descriptionKey: `${OfferKey}Description`;
    image: StaticImageData;
  }[];

  return (
    <section className="bg-white md:bg-blue-900 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold text-white text-center mb-12">
          {dict?.offers?.title || "Турагенція ANEX Tour пропонує"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={offer.image}
                  alt={dict?.offers?.[offer.titleKey] || offer.titleKey}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {dict?.offers?.[offer.titleKey] || offer.titleKey}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {dict?.offers?.[offer.descriptionKey] || offer.descriptionKey}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
