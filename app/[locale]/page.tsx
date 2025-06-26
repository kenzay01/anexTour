"use client";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import MainBanner from "@/components/MainBanner";
import FormContainer from "@/components/FormContainer";
import SliderContainer from "@/components/SliderContainer";
import BenefitsContainer from "@/components/BenefitsContainer";
import BookOnlineContainer from "@/components/BookOnlineContainer";
import OffersContainer from "@/components/OffersContainer";
export default function HomePage() {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  return (
    <div>
      <MainBanner />
      <FormContainer type={1} />
      <SliderContainer title={dict?.slider?.hotTour || "Гарячий Тур"} />
      <SliderContainer
        title={dict?.slider?.earlyReg || "Раннє бронювання"}
        styles={"pb-2"}
      />
      <BenefitsContainer />
      <BookOnlineContainer />
      <OffersContainer />
      <FormContainer type={2} />
    </div>
  );
}
