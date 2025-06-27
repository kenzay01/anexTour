"use client";
import commentImg1 from "@/public/comments/rev-img-1.jpg";
import commentImg2 from "@/public/comments/rev-img-2.jpg";
import commentImg3 from "@/public/comments/rev-img-3.jpg";
import commentImg4 from "@/public/comments/rev-img-4.jpg";
import commentImg5 from "@/public/comments/rev-img-5.jpg";
import commentImg6 from "@/public/comments/rev-img-6.jpg";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import CommentItem from "./CommentItem";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CommentsContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  const [currentIndex, setCurrentIndex] = useState(0);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  const comments = [
    {
      id: 1,
      name: dict?.comments?.comment1?.name || "Любченко Іван",
      image: commentImg1,
      comment:
        dict?.comments?.comment1?.text ||
        "Я об'їздив практично пів земної кулі...",
    },
    {
      id: 2,
      name: dict?.comments?.comment2?.name || "Конанов Артем",
      image: commentImg2,
      comment:
        dict?.comments?.comment2?.text ||
        "У минулому році брали тур в Аланію...",
    },
    {
      id: 3,
      name: dict?.comments?.comment3?.name || "Грицько Валерій",
      image: commentImg3,
      comment:
        dict?.comments?.comment3?.text || "У мене був досвід покупки туру...",
    },
    {
      id: 4,
      name: dict?.comments?.comment4?.name || "Панасова Наталя",
      image: commentImg4,
      comment:
        dict?.comments?.comment4?.text ||
        "Ми їздили з цим оператором в Австрію...",
    },
    {
      id: 5,
      name: dict?.comments?.comment5?.name || "Коваленко Анастасія",
      image: commentImg5,
      comment:
        dict?.comments?.comment5?.text || "Anex відмінний тур-оператор...",
    },
    {
      id: 6,
      name: dict?.comments?.comment6?.name || "Чорничний Олег",
      image: commentImg6,
      comment:
        dict?.comments?.comment6?.text ||
        "Ми замовляли свій тур до Тайланду...",
    },
  ];

  const scrollToIndex = (index: number) => {
    if (commentsContainerRef.current) {
      const container = commentsContainerRef.current;
      const commentWidth =
        container.children[0]?.clientWidth || container.clientWidth;
      const scrollAmount = index * commentWidth;

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    let newIndex;
    if (direction === "left") {
      newIndex = currentIndex === 0 ? comments.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === comments.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex =
        currentIndex === comments.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }, 5000); // Автопрокрутка кожні 5 секунд

    return () => clearInterval(interval);
  }, [currentIndex, comments.length]);

  if (loading || !dict) {
    return <div className="h-96 bg-gray-100"></div>;
  }

  return (
    <section className="bg-white flex items-center justify-center py-6 sm:py-12">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-6 sm:gap-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          {dict?.comments?.title || "Відгуки наших клієнтів"}
        </h2>
        <div className="relative w-full">
          <button
            onClick={() => scroll("left")}
            className="hidden sm:block absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors z-10 shadow-lg"
          >
            <ChevronLeft className="w-12 h-12 text-black" />
          </button>

          <div
            ref={commentsContainerRef}
            className="overflow-hidden w-full"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <div className="flex">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <CommentItem
                    name={comment.name}
                    image={comment.image}
                    comment={comment.comment}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden sm:block absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors z-10 shadow-lg"
          >
            <ChevronRight className="w-12 h-12 text-black" />
          </button>
        </div>

        <div className="flex space-x-2">
          {comments.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                scrollToIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-blue-900"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
