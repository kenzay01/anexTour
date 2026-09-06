"use client";
import { useState } from "react";
import Link from "next/link";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import StatusModal from "@/components/StatusModal";
import { GOOGLE_MAPS_LINK, MAP_EMBED_URL } from "@/utils/map";

export default function SendRequestPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [status, setStatus] = useState<{
    open: boolean;
    variant: "success" | "error";
    title: string;
    message: string;
  }>({ open: false, variant: "success", title: "", message: "" });

  const handleToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) {
      setStatus({
        open: true,
        variant: "error",
        title: dict?.modal?.errorTitle || "Сталася помилка",
        message:
          dict?.sendRequestPage.noOptionSelected ||
          "Оберіть хоча б одну опцію для замовлення.",
      });
      return;
    }

    console.log("Замовлено додатково:", selectedOptions);
    setStatus({
      open: true,
      variant: "success",
      title: dict?.modal?.successTitle || "Заявка успішно відправлена!",
      message: dict?.sendRequestPage.saved || "Ваші побажання збережено!",
    });
  };

  return (
    <>
    <div className="flex flex-col relative">
      <div className="fixed hidden xl:flex left-10 top-10 bg-white rounded-full items-center justify-center h-32 w-32 z-20">
        <img
          src="/sign.png"
          alt="Sign"
          className="object-contain w-full h-full"
        />
      </div>
      <section className="min-h-screen relative flex items-center justify-center text-white text-center px-4">
        <div className="absolute inset-0">
          <img
            src="/home_banner.jpg"
            alt="Ancient ruins background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 max-w-2xl w-full">
          <Link className="mb-4" href={`/${currentLocale}`}>
            <img
              src="/logotip.png"
              alt="Logo"
              className="mx-auto w-40 h-40 object-contain"
            />
          </Link>

          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            {dict?.sendRequestPage.title}
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            {dict?.sendRequestPage.subtitle}
          </p>

          <div className="bg-red-600 text-white px-4 md:px-2 py-1 font-bold animate-pulse text-4xl mb-4">
            {dict?.sendRequestPage.orderTitle}
          </div>

          <div className="border border-yellow-500 p-4 bg-black/40 mb-6 text-left space-y-3 mx-4">
            {dict?.sendRequestPage.options.map(
              (option: string, index: number) => (
                <label key={index} className="block">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleToggle(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              )
            )}

            <p className="text-yellow-300 text-sm mt-4 italic">
              {dict?.sendRequestPage.notice}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-lg font-bold py-3 px-6 w-full max-w-xs mx-auto block rounded"
          >
            {dict?.sendRequestPage.submit}
          </button>
        </div>
      </section>

      <div className="relative h-[300px]">
        <iframe
          title="Anex Tour on Google Maps"
          src={MAP_EMBED_URL}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label={
            currentLocale === "ru"
              ? "Открыть в Google Maps"
              : "Відкрити в Google Maps"
          }
        />
        <span className="pointer-events-none absolute bottom-3 left-3 z-20 rounded bg-white px-3 py-1.5 text-sm font-medium text-blue-900 shadow">
          {currentLocale === "ru"
            ? "Открыть в Google Maps"
            : "Відкрити в Google Maps"}
        </span>
      </div>

      <div className="flex justify-center items-center bg-white">
        <img
          src="/logotip.png"
          alt="ANEX Tour Logo"
          className="w-[220px] h-[120px] object-contain"
        />
      </div>
    </div>
    <StatusModal
      isOpen={status.open}
      onClose={() => setStatus((prev) => ({ ...prev, open: false }))}
      variant={status.variant}
      title={status.title}
      message={status.message}
      buttonText={dict?.modal?.ok || "OK"}
    />
    </>
  );
}
