"use client";
import React, { useState } from "react";
import { TabPanel } from "@headlessui/react";
import CustomInput from "@/app/components/CustomInput";
import { useTranslations } from "next-intl";

export default function LoaderTextsPanel() {
  const t = useTranslations('LoaderTextsPanel');

  const [loaderTexts, setLoaderTexts] = useState({
    welcomeMessage: "",
    loadingMessage: "",
    successMessage: "",
    errorMessage: "",
    emptyStateMessage: "",
  });

  const handleChange = (name: string, value: string) => {
    setLoaderTexts(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loaderTexts);
    // Here you would typically send the settings to your backend
  };

  return (
    <TabPanel className="bg-[#131722] rounded-xl p-6 shadow-lg">
      <h2 className="text-sm font-semibold text-white mb-4">{t('title')}</h2>
      <div className="w-full h-px bg-white opacity-20 mb-6"></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <CustomInput
            label={t('welcomeMessage')}
            name="welcomeMessage"
            value={loaderTexts.welcomeMessage}
            placeholder={t('enterWelcomeMessage')}
            onChange={(e) => handleChange("welcomeMessage", e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {t('saveChanges')}
        </button>
      </form>
    </TabPanel>
  );
}