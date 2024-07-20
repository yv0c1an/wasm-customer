"use client";
import React, { useState } from "react";
import { TabPanel } from "@headlessui/react";
import CustomSelect from "@/app/components/CustomSelect";
import { useTranslations } from "next-intl";

export default function Web3ModalPanel() {
  const t = useTranslations('Web3ModalPanel');

  const [formData, setFormData] = useState({
    backgroundLink: "",
    logoLink: "",
    language: "en"
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the settings to your backend
  };

  const langOptions = [
    { value: "en", label: t('english') },
    { value: "ru", label: t('russian') },
    { value: "zh", label: t('chinese') }
  ];

  const inputClassName =
    "mt-1 block w-full border border-white rounded-md shadow-sm py-2 px-3 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <TabPanel className="bg-[#131722] rounded-xl p-6 shadow-lg">
      <h2 className="text-sm font-semibold text-white mb-4">{t('title')}</h2>
      <div className="w-full h-px bg-white opacity-20 mb-6"></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3">
            <label className="block text-xs font-medium mb-2">{t('backgroundLink')}</label>
            <input
              type="text"
              name="backgroundLink"
              value={formData.backgroundLink}
              placeholder={t('enterBackgroundLink')}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3">
            <label className="block text-xs font-medium mb-2">{t('logoLink')}</label>
            <input
              type="text"
              name="logoLink"
              value={formData.logoLink}
              placeholder={t('enterLogoLink')}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div></div>
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