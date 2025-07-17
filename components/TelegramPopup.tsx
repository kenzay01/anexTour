"use client";

import { useState, useEffect } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import trip_vibe from "@/public/trip_vibe.svg";
import { Locale } from "@/i18n/config";

export default function TelegramPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastClosedTime, setLastClosedTime] = useState<number | null>(null);

  const currentLocale = useCurrentLanguage() as Locale;
  const { dict, loading } = useDictionary(currentLocale);

  useEffect(() => {
    // Show popup immediately on page load
    setIsOpen(true);
  }, []);

  useEffect(() => {
    // Set up timer to show popup again after 60 seconds from last close
    if (lastClosedTime) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 60000); // 60 seconds

      return () => clearTimeout(timer);
    }
  }, [lastClosedTime]);

  const handleClose = () => {
    setIsOpen(false);
    setLastClosedTime(Date.now());
  };

  if (!isOpen || loading) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 z-[75]"
        onClick={handleClose}
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[76] bg-white shadow-lg rounded-lg p-4 w-64 md:w-80 border border-gray-200 animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label={currentLocale === "uk" ? "Закрити" : "Закрыть"}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-semibold bg-yellow-400 text-black py-2 mb-3 rounded-t">
            {dict?.telegramPopup?.title || "Давай до нас в Telegram!"}
          </h3>
          <p className="text-sm md:text-base text-gray-700 mb-4">
            {dict?.telegramPopup?.description
              .split("<br/>")
              .map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              )) ||
              "Гарячі тури, знижки та актуальні новини поринуться в нашій спільноті"}
          </p>
          <p className="text-sm md:text-base text-gray-500 gap-2 mb-2 flex items-center justify-center">
            <img src={trip_vibe.src} className="w-32 h-auto" alt="" />
            {dict?.telegramPopup?.crossedText || "телеграм"}
          </p>
          <a
            href="https://t.me/tripvibeua"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors w-full"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            {dict?.telegramPopup?.buttonText || "Вступити!"}
          </a>
        </div>
      </div>
    </>
  );
}
