import { StaticImageData } from "next/image";
import Image from "next/image";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function SliderItem({
  destination,
  image,
  isActive,
  onClick,
}: {
  destination: string;
  image: StaticImageData;
  isActive: boolean;
  onClick: () => void;
}) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  return (
    <div
      className={`relative flex-shrink-0 cursor-pointer transition-all duration-500 ${
        isActive ? "w-80" : "w-64"
      }`}
      onClick={onClick}
    >
      <div className="h-60 overflow-hidden ">
        <Image
          src={image}
          alt={destination}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="bg-slate-700 text-white p-6  text-center">
        <h3 className="text-xl font-bold mb-4">{destination}</h3>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 transition-colors duration-300">
          {dict?.slider?.selectTour || "Підібрати тур"}
        </button>
      </div>
    </div>
  );
}
