"use client";

import { useTranslations } from "next-intl";
import { useI18n } from "../i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const t = useTranslations();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "zh" : "en");
  };

  return <button onClick={toggleLanguage}>{t("switchLanguage")}</button>;
}
