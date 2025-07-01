"use client";
import Image from "next/image";
import { useState, useCallback } from "react";
import homeBanner from "@/public/home_banner.jpg";
import logo from "@/public/logotip.png";
import sign from "@/public/sign.png";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 50.49177962447067,
  lng: 30.491855918214025,
};

export default function SendRequestPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  const handleToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) {
      alert(dict?.sendRequestPage.noOptionSelected);
      return;
    }

    console.log("Замовлено додатково:", selectedOptions);
    alert(dict?.sendRequestPage.saved);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  return (
    <div className="flex flex-col relative">
      <div className="fixed hidden xl:flex left-10 top-10 bg-white rounded-full items-center justify-center h-32 w-32 z-20">
        <Image src={sign} alt="Sign" className="object-contain w-full h-full" />
      </div>
      <section className="min-h-screen relative flex items-center justify-center text-white text-center px-4">
        <div className="absolute inset-0">
          <Image
            src={homeBanner}
            alt="Ancient ruins background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 max-w-2xl w-full">
          <Link className="mb-4" href={`/${currentLocale}`}>
            <Image src={logo} alt="Logo" width={160} className="mx-auto" />
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
            {dict?.sendRequestPage.mapLoading}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center bg-white">
        <Image src={logo} alt="ANEX Tour Logo" width={220} height={120} />
      </div>
    </div>
  );
}
