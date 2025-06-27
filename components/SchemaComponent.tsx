"use client";
import Image from "next/image";
import schemaImgBg from "@/public/schema.jpg";
import { Plane } from "lucide-react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

export default function SchemaComponent() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  if (loading || !dict) {
    return <div className="h-96 bg-gray-100"></div>;
  }

  return (
    <section className="hidden md:block relative py-20 overflow-hidden">
      {/* Фонове зображення */}
      <div className="absolute inset-0">
        <Image
          src={schemaImgBg}
          alt={dict?.schema?.imageAlt || "Готель у вечірньому освітленні"}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Заголовок */}
        <h2 className="text-white text-4xl font-bold text-center mb-20">
          {dict?.schema?.title || "Схема роботи"}
        </h2>

        {/* Схема кроків */}
        <div className="relative max-w-3xl mx-auto flex flex-col gap-8">
          <div className="flex flex-row justify-start items-center h-full">
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex justify-center items-center flex-col h-48 w-48">
              <h1 className="text-4xl">1</h1>
              <p className="text-sm text-center">
                {dict?.schema?.step1 || "Залишаєте заявку або телефонуйте"}
              </p>
            </div>
            <div className="w-48 border-2 border-dashed border-white"></div>
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex justify-center items-center flex-col h-48 w-48">
              <h1 className="text-4xl">2</h1>
              <p className="text-sm text-center">
                {dict?.schema?.step2 ||
                  "Зв'язуємося з Вами, підбираємо тур або до Вас виїжджає менеджер"}
              </p>
            </div>
          </div>
          <div className="w-32 border-2 border-dashed border-white self-center -rotate-45"></div>
          <div className="flex flex-row justify-end items-center h-full relative">
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex justify-center items-center flex-col h-48 w-48">
              <h1 className="text-4xl">3</h1>
              <p className="text-sm text-center">
                {dict?.schema?.step3 || "Готуємо документи / доставляємо Вам"}
              </p>
            </div>
            <div className="w-48 border-2 border-dashed border-white"></div>
            <div className="p-4 bg-white/70 backdrop-blur-md rounded-full shadow-lg flex justify-center items-center flex-col h-48 w-48">
              <h1 className="text-4xl">4</h1>
              <p className="text-sm text-center">
                {dict?.schema?.step4 || "Ви насолоджуєтеся відпусткою"}
              </p>
            </div>
            <div className="absolute -right-24 top-0 w-32 border-2 border-dashed border-white self-center -rotate-45"></div>
            <Plane className="w-12 h-12 text-white absolute -right-28 -top-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
