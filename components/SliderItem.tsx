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
        isActive ? "md:w-80 w-full" : "md:w-64 w-full"
      }`}
      onClick={onClick}
    >
      <div className="md:h-60 h-40 overflow-hidden">
        <Image
          src={image}
          alt={destination}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="bg-slate-700 text-white md:p-6 p-4 text-center">
        <h3 className="md:text-xl text-lg font-bold md:mb-4 mb-2">
          {destination}
        </h3>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold md:py-3 py-2 md:px-6 px-4 md:text-base text-sm transition-colors duration-300">
          {dict?.slider?.selectTour || "Підібрати тур"}
        </button>
      </div>
    </div>
  );
}
