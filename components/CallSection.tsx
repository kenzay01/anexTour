import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
export default function CallSection() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  return (
    <section className="bg-blue-900 text-white flex flex-col gap-2 items-center justify-center py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        {dict?.callSection?.title.split("<br />").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        )) || "Зручніше писати, ніж дзвонити?"}
      </h1>
      <p className="text-lg md:text-xl text-center mb-6">
        {dict?.callSection?.description || "Ми завжди на зв`язку у месенджері!"}
      </p>
      <div className="flex gap-4">
        <a
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xl"
          href="https://t.me/Trip_Vibe_Tour"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </a>
        <a
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xl"
          href="https://wa.me/380997962663"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </section>
  );
}
