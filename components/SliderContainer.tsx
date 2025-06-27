"use client";
import { useState, useEffect, useRef } from "react";
import SliderItem from "./SliderItem";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import indiaImg from "@/public/countries/india.jpg";
import thailandImg from "@/public/countries/tailand.jpg";
import thailand2Img from "@/public/countries/tailand2.jpg";
import israelImg from "@/public/countries/israel.jpg";
import oaeImg from "@/public/countries/oae.jpg";
import oae2Img from "@/public/countries/oae2.jpg";
import tanzaniaImg from "@/public/countries/tanzania.jpg";
import turkeyImg from "@/public/countries/turkey.jpg";

export default function SliderContainer({
  title,
  styles,
}: {
  title: string;
  styles?: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  // Визначення мобільного пристрою
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Дані для слайдів з локалізацією
  const slides = [
    {
      id: 1,
      destination: dict?.slider?.destinations?.tanzania || "Танзанія",
      image: tanzaniaImg,
    },
    {
      id: 2,
      destination: dict?.slider?.destinations?.thailand || "Таїланд",
      image: thailandImg,
    },
    {
      id: 3,
      destination: dict?.slider?.destinations?.israel || "Ізраїль",
      image: israelImg,
    },
    {
      id: 4,
      destination: dict?.slider?.destinations?.uae || "ОАЕ",
      image: oaeImg,
    },
    {
      id: 5,
      destination: dict?.slider?.destinations?.uae || "ОАЕ",
      image: oae2Img,
    },
    {
      id: 6,
      destination: dict?.slider?.destinations?.india || "Індія",
      image: indiaImg,
    },
    {
      id: 7,
      destination: dict?.slider?.destinations?.thailand || "Таїланд",
      image: thailand2Img,
    },
    {
      id: 8,
      destination: dict?.slider?.destinations?.turkey || "Туреччина",
      image: turkeyImg,
    },
  ];

  // Максимальні слайди для мобільної версії (показуємо по 2)
  const maxSlides = isMobile ? Math.ceil(slides.length / 2) : slides.length;

  // Автоматичне прокручування
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % maxSlides);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxSlides]);

  // Сенсорне прокручування
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX: number;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      setIsAutoPlaying(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      if (diff > 50) {
        nextSlide();
        isDragging = false;
      } else if (diff < -50) {
        prevSlide();
        isDragging = false;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Переходи до наступного/попереднього слайду
  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  // Обробка кліку на слайд
  const handleSlideClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  // Функція для отримання трансформації
  const getTransform = () => {
    if (isMobile) {
      // На мобільних показуємо по 2 слайди, зсув на повну ширину контейнера
      return `translateX(-${currentSlide * 106}%)`;
    } else {
      // На десктопі залишаємо оригінальну логіку
      return `translateX(-${currentSlide * 280}px)`;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={`py-8 bg-gray-50 ${styles}`}>
      <div className="max-w-8xl mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12 relative">
          <h2 className="text-4xl md:text-5xl font-semibold text-blue-900 mb-4">
            {title}
          </h2>
        </div>

        {/* Слайдер */}
        <div className="relative">
          {/* Кнопка "Назад" */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg md:left-0 -left-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Контейнер слайдів */}
          <div ref={sliderRef} className="overflow-hidden md:mx-12 mx-6">
            <div
              className={`flex gap-6 transition-transform duration-500 ease-in-out ${
                isMobile ? "md:flex-nowrap" : ""
              }`}
              style={{
                transform: getTransform(),
              }}
            >
              {isMobile
                ? // Мобільна версія - групуємо по 2 слайди
                  Array.from(
                    { length: Math.ceil(slides.length / 2) },
                    (_, groupIndex) => (
                      <div
                        key={groupIndex}
                        className="flex gap-4 w-full flex-shrink-0"
                      >
                        {slides
                          .slice(groupIndex * 2, groupIndex * 2 + 2)
                          .map((slide) => (
                            <div key={slide.id} className="w-1/2">
                              <SliderItem
                                destination={slide.destination}
                                image={slide.image}
                                isActive={false}
                                onClick={() => {
                                  console.log(
                                    `Clicked on slide: ${slide.destination}`
                                  );
                                }}
                              />
                            </div>
                          ))}
                      </div>
                    )
                  )
                : // Десктопна версія - оригінальна логіка
                  [...slides, ...slides].map((slide, index) => (
                    <SliderItem
                      key={"id=" + slide.id + "," + index}
                      destination={slide.destination}
                      image={slide.image}
                      isActive={slides.indexOf(slide) === currentSlide}
                      onClick={() => {
                        console.log(`Clicked on slide: ${slide.destination}`);
                      }}
                    />
                  ))}
            </div>
          </div>

          {/* Кнопка "Вперед" */}
          <button
            onClick={nextSlide}
            className="absolute  top-1/2 -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg md:right-0 -right-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Індикатори */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => handleSlideClick(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
