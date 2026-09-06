"use client";

import { useState } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import Modal from "@/components/Modal";
import { GOOGLE_MAPS_LINK, MAP_EMBED_URL } from "@/utils/map";

export default function MapContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="flex flex-col md:flex-row md:h-[300px] bg-white"
      id="destinations"
    >
      <div className="md:flex-1 relative hidden md:block h-[300px]">
        <img
          src="/map_img.jpg"
          alt="Anex Tour Office"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="md:flex-1 flex flex-col items-center justify-center text-white bg-blue-900 p-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          {dict?.mapContainer.title}
        </h2>
        <p className="mb-2">{dict?.header.address}</p>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-transparent text-yellow-400 text-lg border-b-2 border-dashed hover:text-yellow-300 transition-colors cursor-pointer"
        >
          {dict?.header.cta.callBack}
        </button>
      </div>

      <div className="md:flex-1 relative h-[300px] md:h-auto">
        <iframe
          title="Anex Tour on map"
          src={MAP_EMBED_URL}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 left-3 z-10 rounded bg-white px-3 py-1.5 text-sm font-medium text-blue-900 shadow hover:bg-gray-100"
        >
          {currentLocale === "ru" ? "Открыть в Google Maps" : "Відкрити в Google Maps"}
        </a>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
