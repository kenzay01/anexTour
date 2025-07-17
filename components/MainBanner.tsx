"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import homeBanner from "@/public/home_banner.jpg";
import { sendToBitrix24 } from "@/utils/sendToBitrix";

export default function MainBanner() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    wishes: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentManagersIndex, setCurrentManagersIndex] = useState(0);
  const [currentMainTitleIndex, setCurrentMainTitleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const managersTexts = [
    "Досвідчені менеджери",
    "Особистий менеджер",
    "Зручно",
    "Виліт з Молдови Кишинів, Польші Краків Варшава Жешув, Литва Вільнюс",
  ];

  const mainTitleTexts = [
    "Повний супровід під час поїздки",
    "Виїзд менеджера в офіс / додому",
    "5 агентств в різних частинах міста",
    "45 країн світу",
  ];

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

  const getCurrentManagersTexts = () => {
    return currentLocale === "ru" ? managersTextsRu : managersTexts;
  };

  const getCurrentMainTitleTexts = () => {
    return currentLocale === "ru" ? mainTitleTextsRu : mainTitleTexts;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    // Автоматично додаємо +380, якщо номер починається з цифри
    if (name === "phone" && value.trim() && !value.startsWith("+380")) {
      if (/^\d/.test(value)) {
        newValue = "+380" + value.replace(/^\d+/, "");
      } else {
        newValue = value.replace(/^\+?38?0?/, "+380");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "name" || name === "phone") {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      phone: "",
    };

    if (formData.name.trim() === "") {
      newErrors.name =
        currentLocale === "ru"
          ? "Поле Имя обязательно для заполнения."
          : "Поле Ваше ім'я є обов'язковим для заповнення.";
    }

    const phoneRegex = /^\+380\d{9}$/;
    if (formData.phone.trim() === "") {
      newErrors.phone =
        currentLocale === "ru"
          ? "Поле Телефон обязательно для заполнения."
          : "Поле Ваш телефон є обов'язковим для заповнення.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone =
        currentLocale === "ru"
          ? "Вы ввели некорректный номер."
          : "Ви ввели некоректний номер.";
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bitrixResult = await sendToBitrix24({
        name: formData.name,
        phone: formData.phone,
        wishes: formData.wishes || "Заявка з головного банеру",
      });

      if (bitrixResult.success) {
        console.log("Форма успішно відправлена до Bitrix24");
        setFormData({ name: "", phone: "", wishes: "" });
        setErrors({ name: "", phone: "" });
        alert(
          currentLocale === "ru"
            ? "Заявка успешно отправлена! Наш менеджер свяжется с вами в ближайшее время."
            : "Заявка успішно відправлена! Наш менеджер зв'яжеться з вами найближчим часом."
        );
      } else {
        console.error("Помилка при відправці до Bitrix24:", bitrixResult.error);
        alert(
          currentLocale === "ru"
            ? "Ошибка при отправке формы. Попробуйте еще раз."
            : "Сталася помилка при відправці форми. Спробуйте ще раз."
        );
      }
    } catch (error) {
      console.error("Загальна помилка:", error);
      alert(
        currentLocale === "ru"
          ? "Произошла ошибка при отправке формы. Попробуйте еще раз."
          : "Сталася помилка при відправці форми. Спробуйте ще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="relative min-h-screen">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="text-center mb-2 md:mb-8">
          <div className="inline-block bg-white/90 px-6 py-2 rounded-full">
            <span
              className={`text-gray-700 font-medium text-sm md:text-md transition-all duration-700 ease-in-out ${
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
        <div className="text-center mb-12">
          <h1
            className={`text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-700 ease-in-out ${
              isTransitioning
                ? "opacity-0 transform translate-y-4"
                : "opacity-100 transform translate-y-0"
            }`}
          >
            {getCurrentMainTitleTexts()[currentMainTitleIndex]}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center md:items-start justify-center">
          <div
            className="hidden lg:block bg-red-600 p-4 text-white relative rounded-lg"
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
          <div
            className="block lg:hidden bg-red-600 p-4 pt-2 text-white relative rounded-lg h-[380px] max-w-[380px] text-center"
            style={{
              clipPath: "polygon(100% 0, 100% 86%, 51% 100%, 0 86%, 0 0)",
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

          <div className="bg-white/50 p-4 md:p-8 rounded-lg border-4 border-red-600 max-w-sm">
            <h3 className="text-3xl font-bold text-red-600 mb-2 text-center">
              {dict.banner.form.title}
            </h3>
            <p className="text-gray-600 mb-6">{dict.banner.form.subtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder={dict.banner.form.namePlaceholder}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-white w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder={dict.banner.form.phonePlaceholder}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-white w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <textarea
                name="wishes"
                placeholder={dict.banner.form.wishesPlaceholder}
                value={formData.wishes}
                onChange={handleInputChange}
                rows={4}
                className="bg-white w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? currentLocale === "ru"
                    ? "Отправляем..."
                    : "Відправляємо..."
                  : dict.banner.form.submitButton}
              </button>
            </form>
            <p className="text-gray-800 text-sm text-center mt-4">
              {dict.banner.form.contactInfo}
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-black/50 inline-block py-2 px-4 md:px-8 md:py-4 rounded-lg">
            <p className="text-white mb-4 font-medium">
              {dict.banner.payment.title}
            </p>
            <div className="flex items-center justify-center space-x-2 md:space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                alt=""
                className="w-16 h-10 rounded-sm"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/2560px-Old_Visa_Logo.svg.png"
                alt=""
                className="w-16 h-10 rounded-sm"
              />
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
