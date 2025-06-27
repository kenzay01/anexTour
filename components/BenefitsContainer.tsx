"use client";
import { MapPin } from "lucide-react";
import { SquareParking } from "lucide-react";
import { CalendarSync } from "lucide-react";
import { Headset } from "lucide-react";
import { House } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function BenefitsContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  type BenefitKey =
    | "pochainaCenter"
    | "parking"
    | "roundTheClock"
    | "alwaysConnected"
    | "freeManagerCall"
    | "homeService";

  const benefits = [
    { id: 1, textKey: "pochainaCenter", img: MapPin },
    { id: 2, textKey: "parking", img: SquareParking },
    { id: 3, textKey: "roundTheClock", img: CalendarSync },
    { id: 4, textKey: "alwaysConnected", img: Headset },
    { id: 5, textKey: "freeManagerCall", img: BriefcaseBusiness },
    { id: 6, textKey: "homeService", img: House },
  ] as {
    id: number;
    textKey: BenefitKey;
    img: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-blue-900 flex items-center justify-center py-12 text-white">
      <div className="max-w-4xl ">
        <h1 className="text-3xl text-center mb-8">
          {dict?.benefits?.title ||
            "Ваші переваги відпочинку з турагенцією ANEX Tour"}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center gap-2 mb-8"
            >
              <benefit.img className="w-32 h-32" />
              <p className="text-center ">
                {dict?.benefits?.[benefit.textKey] || benefit.textKey}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
