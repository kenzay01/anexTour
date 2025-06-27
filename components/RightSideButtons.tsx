"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Smartphone } from "lucide-react";
import { CircleChevronUp } from "lucide-react";
export default function RightSideButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`z-[80] fixed right-4 bottom-8 transform transition-all duration-300 flex flex-col space-y-4 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <Smartphone
          className="w-14 h-14 md:w-16 md:h-16 text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-gray-300/60 transition-colors"
          onClick={() => setIsModalOpen(true)}
        />
        <CircleChevronUp
          className="w-14 h-14 md:w-16 md:h-16 text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-gray-300/60 transition-colors"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
