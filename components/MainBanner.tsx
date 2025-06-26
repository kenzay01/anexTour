"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import homeBanner from "@/public/home_banner.jpg";

export default function MainBanner() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    wishes: "",
  });

  // Стани для управління текстом
  const [currentManagersIndex, setCurrentManagersIndex] = useState(0);
  const [currentMainTitleIndex, setCurrentMainTitleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Масиви текстів для перемикання (оновлені з картинок)
  const managersTexts = [
    "Досвідчені менеджери", // "Досвідчені менеджери" / "Опытные менеджеры"
    "Особистий менеджер", // "Личный менеджер"
    "Зручно", // "Удобно"
    "Виліт з Молдови Кишинів, Польші Краків Варшава Жешув, Литва Вільнюс",
  ];

  const mainTitleTexts = [
    "Повний супровід під час поїздки", // "Полное сопровождение во время поездки"
    "Виїзд менеджера в офіс / додому", // "Выезд менеджера в офис / домой" // "Выезд из Молдовы Кишинев, Польши Краков Варшава Жешув, Литва Вильнюс"
    "5 агентств в різних частинах міста", // "5 агентств в разных частях города"
    "45 країн світу", // "45 стран мира"
  ];

  // Російські переклади для текстів
  const managersTextsRu = [
    "Опытные менеджеры",
    "Личный менеджер",
    "Удобно",
    "Выезд из Молдовы Кишинев, Польши Краков Варшава Жешув, Литва Вильнюс",
  ];

  const mainTitleTextsRu = [
    "Полное сопровождение во время поездки",
    "Выезд менеджера в офис / домой",
    "5 агентств в разных частях города",
    "45 стран мира",
  ];

  // Вибір правильного масиву в залежності від мови
  const getCurrentManagersTexts = () => {
    return currentLocale === "ru" ? managersTextsRu : managersTexts;
  };

  const getCurrentMainTitleTexts = () => {
    return currentLocale === "ru" ? mainTitleTextsRu : mainTitleTexts;
  };

  // Плавний перехід з затримкою
  const smoothTransition = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    maxIndex: number
  ) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setter((prev) => (prev + 1) % maxIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  // Ефект для зміни тексту кожні 4 секунди з плавними переходами
  useEffect(() => {
    const managersInterval = setInterval(() => {
      smoothTransition(
        setCurrentManagersIndex,
        getCurrentManagersTexts().length
      );
    }, 4000);

    const mainTitleInterval = setInterval(() => {
      smoothTransition(
        setCurrentMainTitleIndex,
        getCurrentMainTitleTexts().length
      );
    }, 4000);

    return () => {
      clearInterval(managersInterval);
      clearInterval(mainTitleInterval);
    };
  }, [currentLocale]);

  if (loading || !dict) {
    return <div className="h-96 bg-gray-100"></div>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={homeBanner}
          alt="Ancient ruins background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
        {/* Top badge */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white/90 px-6 py-2 rounded-full">
            <span
              className={`text-gray-700 font-medium transition-all duration-700 ease-in-out ${
                isTransitioning
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
            >
              {getCurrentManagersTexts()[currentManagersIndex]}
            </span>
          </div>
        </div>
        <hr className="border-1 border-amber-400 w-[200px]" />
        {/* Main heading */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-700 ease-in-out ${
              isTransitioning
                ? "opacity-0 transform translate-y-4"
                : "opacity-100 transform translate-y-0"
            }`}
          >
            {getCurrentMainTitleTexts()[currentMainTitleIndex]}
          </h1>
        </div>

        {/* Two columns layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start justify-center">
          {/* Left side - Red banner with clip-path */}
          <div
            className="bg-red-600 p-4 text-white relative rounded-lg"
            style={{
              clipPath: "polygon(75% 0%, 100% 51%, 76% 100%, 0% 100%, 0% 0%)",
            }}
          >
            <h2 className="text-2xl font-bold my-2 max-w-[400px]">
              {dict.banner.offer.title}
            </h2>
            <p className="text-blue-700 text-2xl mb-4 max-w-[500px]">
              {dict.banner.offer.subtitle}
            </p>

            <div className="space-y-3 mb-6">
              <p className="text-sm">{dict.banner.offer.gift}</p>
              <p className="text-sm">{dict.banner.offer.form}</p>
              <p className="text-sm font-bold">{dict.banner.offer.limited}</p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white/50 p-8 rounded-lg border-4 border-red-600 max-w-sm">
            <h3 className="text-3xl font-bold text-red-600 mb-2 text-center">
              {dict.banner.form.title}
            </h3>
            <p className="text-gray-600 mb-6">{dict.banner.form.subtitle}</p>

            <div onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder={dict.banner.form.namePlaceholder}
                value={formData.name}
                onChange={handleInputChange}
                className="bg-white w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder={dict.banner.form.phonePlaceholder}
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-white w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />

              <textarea
                name="wishes"
                placeholder={dict.banner.form.wishesPlaceholder}
                value={formData.wishes}
                onChange={handleInputChange}
                rows={4}
                className="bg-white w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
              />

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-red-600 hover:bg-red-600 text-white font-bold py-4 rounded-md transition-colors"
              >
                {dict.banner.form.submitButton}
              </button>
            </div>

            <p className="text-gray-800 text-sm text-center mt-4">
              {dict.banner.form.contactInfo}
            </p>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-16 text-center ">
          <div className="bg-black/50 inline-block px-8 py-4 rounded-lg">
            <p className="text-white mb-4 font-medium">
              {dict.banner.payment.title}
            </p>
            <div className="flex items-center justify-center space-x-4">
              {/* MasterCard */}
              {/* <div className="bg-white rounded px-3 py-2 flex items-center">
                <div className="flex">
                  <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                  <div className="w-6 h-6 bg-yellow-600 rounded-full -ml-2"></div>
                </div>
                <span className="ml-2 text-sm font-bold text-gray-800">
                  MasterCard
                </span>
              </div> */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                alt=""
                className="w-16 h-10 rounded-sm"
              />

              {/* VISA */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png"
                alt=""
                className="w-16 h-10 rounded-sm"
              />

              {/* Another payment method */}
              <img
                src="https://play-lh.googleusercontent.com/VciK8VupOQM4EcOwr0M0nOVN34kao52yVxwlKkF3OFim3i4QNVpzAKHrJEDvVwD4QVNn"
                alt=""
                className="w-11 h-11 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
