"use client";
import React, { useState } from "react";
import { TabPanel } from "@headlessui/react";
import { Checkbox, Field, Label } from "@headlessui/react";
import CustomSelect from "@/app/components/CustomSelect";
import { useTranslations } from "next-intl";

export default function MessagingPanel() {
  const t = useTranslations('MessagingPanel');

  const [formData, setFormData] = useState({
    messageBot: "",
    messageGroup: "",
    withdrawalGroup: "",
    language: "en",
    checkboxes: {
      linkRequest: false,
      withdrawalRequest: false,
      enterSite: false,
      connectionSuccess: false,
      withdrawalRejected: false,
      exitSite: false,
      connectionRejected: false
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        checkboxes: {
          ...prev.checkboxes,
          [name]: (e.target as HTMLInputElement).checked
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
          <div className="col-span-2">
            <label className="block text-xs font-medium mb-2">
              {t('messageBot')}
            </label>
            <input
              type="text"
              name="messageBot"
              value={formData.messageBot}
              placeholder={t('enterMessageBotId')}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div>
            <div className="relative">
              <CustomSelect
                label={t('messageLanguage')}
                options={langOptions}
                value={formData.language}
                onChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
                name="language"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <label className="block text-xs font-medium mb-2">
              {t('messageGroup')}
            </label>
            <input
              type="text"
              name="messageGroup"
              value={formData.messageGroup}
              placeholder={t('enterMessageGroupId')}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div></div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <label className="block text-xs font-medium mb-2">
              {t('withdrawalGroup')}
            </label>
            <input
              type="text"
              name="withdrawalGroup"
              value={formData.withdrawalGroup}
              placeholder={t('enterWithdrawalGroupId')}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div></div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {Object.entries(formData.checkboxes).map(([key, value]) => (
            <Field key={key} className="flex items-center gap-2">
              <Checkbox 
                checked={value}
                onChange={(checked) => setFormData(prev => ({
                  ...prev,
                  checkboxes: { ...prev.checkboxes, [key]: checked }
                }))}
                className="group block size-4 rounded border data-[checked]:bg-blue-500"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="text-xs">{t(key)}</Label>
            </Field>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        >
          {t('saveChanges')}
        </button>
      </form>
    </TabPanel>
  );
}