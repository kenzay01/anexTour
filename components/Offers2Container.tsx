"use client";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { FolderLock } from "lucide-react";
import { Percent } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Phone } from "lucide-react";
import { JSX } from "react/jsx-dev-runtime";

export default function Offers2Container() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  if (loading || !dict) {
    return <div className="h-96 bg-gray-100"></div>;
  }
  type OfferKey =
    | "confidentiality"
    | "bestOffers"
    | "qualityConfidence"
    | "vacationSupport";

  const offers: Array<{
    id: number;
    titleKey: OfferKey;
    contentKey: `${OfferKey}Content`;
    img: JSX.Element;
  }> = [
    {
      id: 1,
      titleKey: "confidentiality",
      contentKey: "confidentialityContent",
      img: <FolderLock className="w-26 h-26 text-blue-950" />,
    },
    {
      id: 2,
      titleKey: "bestOffers",
      contentKey: "bestOffersContent",
      img: <Percent className="w-26 h-26 text-blue-950" />,
    },
    {
      id: 3,
      titleKey: "qualityConfidence",
      contentKey: "qualityConfidenceContent",
      img: <ThumbsUp className="w-26 h-26 text-blue-950" />,
    },
    {
      id: 4,
      titleKey: "vacationSupport",
      contentKey: "vacationSupportContent",
      img: <Phone className="w-26 h-26 text-blue-950" />,
    },
  ];

  return (
    <section className="bg-white flex items-center justify-center py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl text-center mb-12">
          {dict?.offers2?.title || "Ми пропонуємо нашим клієнтам"}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="flex flex-col items-center gap-2 mb-8 text-center"
            >
              {offer.img}
              <h2 className="text-lg">
                {dict?.offers2?.[offer.titleKey] || offer.titleKey}
              </h2>
              <p className="text-lg">
                {dict?.offers2?.[offer.contentKey] || offer.contentKey}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
