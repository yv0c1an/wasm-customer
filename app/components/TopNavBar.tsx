"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useI18n } from "../i18n/I18nProvider";
import { useRouter } from "next/navigation";

const TopNavBar: React.FC = () => {
  const { locale, setLocale } = useI18n();
  const t = useTranslations("TopNavBar");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        router.push("/admin/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocale(event.target.value as "en" | "zh" | "ru");
  };

  return (
    <nav className="mt-5 mr-5 p-2 flex justify-end items-center space-x-4">
      <Link
        href="#docs"
        className="bg-blue-600 px-3 py-1 h-10 rounded-lg text-sm font-semibold flex items-center hover:bg-blue-700 transition-colors"
      >
        {t("docs")}
      </Link>
      <select
        value={locale}
        onChange={handleLanguageChange}
        className="bg-[#131722] text-white font-semibold text-sm rounded-lg px-3 py-1 h-10 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="zh">{t("languageZH")}</option>
        <option value="en">{t("languageEN")}</option>
        <option value="ru">{t("languageRu")}</option>
      </select>
      <button
        className="text-blue-600 bg-[#131722] font-semibold px-3 py-1 h-10 rounded-lg hover:bg-gray-700 transition-colors"
        aria-label={t("logout")}
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
      </button>
    </nav>
  );
};

export default TopNavBar;
