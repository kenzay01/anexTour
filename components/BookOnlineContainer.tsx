import Image from "next/image";
import bookOnline from "@/public/book.jpg";
import { Earth } from "lucide-react";
import { Hotel } from "lucide-react";
import { FaMonument } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import { useDictionary } from "@/hooks/getDictionary";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { Locale } from "@/i18n/config";

export default function BookOnlineContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  type BookOnlineKey = "countries" | "beach" | "hotels" | "monuments";

  const items = [
    {
      id: 1,
      textKey: "countries",
      img: <Earth className="w-20 h-20" />,
      numbers: 45,
    },
    {
      id: 2,
      textKey: "beach",
      img: <FaUmbrellaBeach className="w-20 h-20" />,
      numbers: 2000,
    },
    {
      id: 3,
      textKey: "hotels",
      img: <Hotel className="w-20 h-20" />,
      numbers: 9000,
    },
    {
      id: 4,
      textKey: "monuments",
      img: <FaMonument className="w-20 h-20" />,
      numbers: 7000,
    },
  ] as {
    id: number;
    textKey: BookOnlineKey;
    img: React.ReactNode;
    numbers: number;
  }[];

  return (
    <section className="relative py-18 hidden md:block">
      <div className="absolute inset-0">
        <Image
          src={bookOnline}
          alt="Book online"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="z-10 flex flex-col items-center justify-center  text-white text-center relative">
        <h1 className="text-4xl mb-16">
          {dict?.bookOnline?.title || "З ким ми працюємо"}
        </h1>
        <div className="flex gap-16 flex-wrap justify-center mt-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center flex-col">
              <div className="mr-2 p-4 border-2 border-red-600 rounded-full">
                {item.img}
              </div>
              <div className="text-6xl text-orange-400">{item.numbers}</div>
              <div className="text-2xl">
                {dict?.bookOnline?.[item.textKey] || item.textKey}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
