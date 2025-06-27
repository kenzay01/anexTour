"use client";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function IndividualComponent() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  return (
    <section className="bg-blue-900 flex items-center justify-center py-12">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
        <div className="text-white">
          <h1 className="text-3xl text-center ">
            У Вас індивідуальні вимоги до відпочинку?
          </h1>
          <h1 className="text-3xl text-center">
            Ми з радістю підберемо тур, який підійде саме Вам!
          </h1>
        </div>
        <div className="flex-shrink-0">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 transition-colors duration-300 text-xl"
          >
            {dict?.banner?.form?.submitButton || "Підібрати тур"}
          </button>
        </div>
      </div>
    </section>
  );
}
