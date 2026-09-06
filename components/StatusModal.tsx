"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type StatusModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  variant?: "success" | "error";
};

export default function StatusModal({
  isOpen,
  onClose,
  title,
  message,
  buttonText = "OK",
  variant = "success",
}: StatusModalProps) {
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen]);

  if (!isOpen) return null;

  const accentClass =
    variant === "success" ? "bg-green-500" : "bg-red-600";

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-blue-900 rounded-lg p-8 max-w-md w-full mx-4 relative text-center shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-gray-300 transition-colors p-1 bg-gray-400 rounded-full"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div
          className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${accentClass} text-white text-2xl font-bold`}
        >
          {variant === "success" ? "✓" : "!"}
        </div>

        <h2 className="text-white text-2xl font-medium leading-tight mb-3">
          {title}
        </h2>
        <p className="text-white/90 text-base leading-relaxed mb-8">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
