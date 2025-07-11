"use client";

import Image from "next/image";
import leftImage from "@/public/map_img.jpg";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 50.50760087095094,
  lng: 30.498426694487343,
};

export default function MapContainer() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  return (
    <section
      className="flex flex-col md:flex-row md:h-[300px] bg-white"
      id="destinations"
    >
      {/* Зображення - тільки на десктопі */}
      <div className="md:flex-1 relative hidden md:block">
        <Image
          src={leftImage}
          alt="Anex Tour Office"
          fill
          className="object-cover"
        />
      </div>

      {/* Текстовий блок */}
      <div className="md:flex-1 flex flex-col items-center justify-center text-white bg-blue-900 p-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          {dict?.mapContainer.title}
        </h2>
        <p className="mb-2 lowercase">{dict?.header.address}</p>
        <button className="bg-transparent text-yellow-400 text-lg border-b-2 border-dashed">
          {dict?.header.cta.callBack}
        </button>
      </div>

      {/* Карта з фіксованою висотою */}
      <div className="md:flex-1 relative h-[300px] md:h-auto">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
            Завантаження карти...
          </div>
        )}
      </div>
    </section>
  );
}
