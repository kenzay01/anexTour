"use client";

import { useState, useEffect } from "react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { name: string; phone: string }) => void;
}) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  // Block scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newErrors = {
      name: "",
      phone: "",
    };

    // Валідація
    if (formData.name.trim() === "") {
      newErrors.name = "Поле Ваше ім'я є обов'язковим для заповнення.";
    }

    if (formData.phone.trim() === "") {
      newErrors.phone = "Поле Ваш телефон є обов'язковим для заповнення.";
    }

    setErrors(newErrors);

    // Якщо є помилки, не відправляємо форму
    if (newErrors.name || newErrors.phone) {
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({ name: "", phone: "" });
    setErrors({ name: "", phone: "" });
    router.push(`/${currentLocale}/send-request`);
  };

  const handleInputChange = (field: "name" | "phone", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Очищуємо помилку при введенні тексту
    if (field === "name" || field === "phone") {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
      onClick={handleOverlayClick}
    >
      <div className="bg-blue-900 rounded-lg p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-gray-300 transition-colors p-1 bg-gray-400 rounded-full"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-white text-2xl font-medium leading-tight">
            {dict?.modal.title || "Заповніть форму, щоб замовити дзвінок"}
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder={dict?.banner.form.namePlaceholder || "Ваше ім'я*"}
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 bg-white border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder={dict?.banner.form.phonePlaceholder || "Ваш телефон*"}
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full px-4 py-3 bg-white border-0 rounded text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded transition-colors mt-6"
          >
            {dict?.modal.submit || "Надіслати"}
          </button>
        </div>
      </div>
    </div>
  );
}
