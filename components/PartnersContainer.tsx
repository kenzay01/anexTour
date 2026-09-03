"use client";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";


export default function PartnersContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  const partners = [
    {
      id: 1,
      name: "Partner 1",
      image: "/partners/partner1.jpg",
      width: "w-26",
    },
    {
      id: 2,
      name: "Partner 2",
      image: "/partners/partner2.jpg",
      width: "w-26",
    },
    {
      id: 3,
      name: "Partner 3",
      image: "/partners/partner3.png",
      width: "w-12",
    },
    {
      id: 4,
      name: "Partner 4",
      image: "/partners/partner4.png",
      width: "w-23",
    },
    {
      id: 5,
      name: "Partner 5",
      image: "/partners/partner5.webp",
      width: "w-32",
    },
  ];

  return (
    <section className="bg-white flex items-center justify-center pt-12 pb-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl text-center mb-12">{dict?.partners.title}</h1>

        {/* Десктопна версія - залишається без змін */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
          {partners.map((partner) => (
            <div
              className="flex flex-col items-center gap-2 mb-8"
              key={partner.id}
            >
              <img
                src={partner.image}
                alt={partner.name}
                className={`h-auto ${partner.width}`}
              />
            </div>
          ))}
        </div>

        {/* Мобільна версія з особливою логікою для 5-го елемента */}
        <div className="md:hidden">
          {/* Перші 4 елементи в сітці 2x2 */}
          <div className="grid grid-cols-2 gap-4 items-center mb-8">
            {partners.slice(0, 4).map((partner) => (
              <div
                className="flex flex-col items-center gap-2"
                key={partner.id}
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className={`h-auto ${partner.width}`}
                />
              </div>
            ))}
          </div>

          {/* 5-й елемент окремо по центру */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2 mb-8">
              <img
                src={partners[4].image}
                alt={partners[4].name}
                className={`h-auto ${partners[4].width}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
