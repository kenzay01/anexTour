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
import Offers2Container from "@/components/Offers2Container";
import SchemaComponent from "@/components/SchemaComponent";
import PartnersContainer from "@/components/PartnersContainer";
import IndividualComponent from "@/components/IndividualComponent";
import CommentsContainer from "@/components/CommentsContainer";
import MapContainer from "@/components/MapContainer";
import logoImg from "@/public/logotip.png";
import Image from "next/image";
import RightSideButtons from "@/components/RightSideButtons";
import TelegramPopup from "@/components/TelegramPopup";
import CallSection from "@/components/CallSection";
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
      <Offers2Container />
      <SchemaComponent />
      <PartnersContainer />
      <IndividualComponent />
      <CommentsContainer />
      <CallSection />
      <MapContainer />
      <div className="flex justify-center items-center bg-white">
        <Image src={logoImg} alt="ANEX Tour Logo" width={220} height={120} />
      </div>
      <RightSideButtons />
      <TelegramPopup />
    </div>
  );
}
