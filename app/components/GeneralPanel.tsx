"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TabPanel } from "@headlessui/react";
import CustomSelect from "@/app/components/CustomSelect";
import CustomInput from "@/app/components/CustomInput";
import { useTranslations } from "next-intl";
import { apiRequest } from "@/utils/api"; // 导入封装的请求函数
import CustomDialog from "@/app/components/CustomDialog"; // 导入自定义的Dialog组件

export default function GeneralPanel() {
  const router = useRouter();
  const t = useTranslations("GeneralPanel");
  const [main, setSettings] = useState({
    name: "",
    coin: "ETH",
    chatLink: "",
    whatsapp: "",
    whitePaperUrl: "",
    forceOpenInviteCode: "0",
    isShowDrawFee: "0",
    isEnableRebate: "0",
    isShowRebate: "0",
    isShowService: "0",
    auditReportUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 管理Dialog的显示状态

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiRequest("/api/main", "GET", router);
        if (result.data) {
          setSettings(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleChange = (name: string, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiRequest("/api/main", "POST", main);
      setIsDialogOpen(true); // 保存成功后显示Dialog
    } catch (error) {
      console.error("Error saving settings:", error.message);
      alert("Failed to save settings.");
    }
  };

  const currencyOptions = [{ value: "ETH", label: "ETH" }];

  const yesNoOptions = [
    { value: "1", label: t("yes") },
    { value: "0", label: t("no") },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TabPanel className="bg-[#131722] rounded-xl p-6 shadow-lg">
      <h2 className="text-sm font-semibold text-white mb-4">{t("title")}</h2>
      <div className="w-full h-px bg-white opacity-20 mb-6"></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <CustomInput
            label={t("websiteName")}
            name="name"
            value={main.name}
            placeholder={t("enterWebsiteName")}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <CustomSelect
            label={t("defaultCurrency")}
            options={currencyOptions}
            value={main.coin}
            onChange={(value) => handleChange("coin", value)}
            name="coin"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <CustomInput
            label={t("customerServiceLink")}
            name="chatLink"
            value={main.chatLink}
            placeholder={t("enterCustomerServiceLink")}
            onChange={(e) => handleChange("chatLink", e.target.value)}
          />
          <CustomInput
            label={t("whatsAppLink")}
            name="whatsapp"
            value={main.whatsapp}
            placeholder={t("enterWhatsAppLink")}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <CustomSelect
            label={t("enableInviteCode")}
            options={yesNoOptions}
            value={main.forceOpenInviteCode}
            onChange={(value) => handleChange("forceOpenInviteCode", value)}
            name="forceOpenInviteCode"
          />
          <CustomSelect
            label={t("showWithdrawalFee")}
            options={yesNoOptions}
            value={main.isShowDrawFee}
            onChange={(value) => handleChange("isShowDrawFee", value)}
            name="isShowDrawFee"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <CustomSelect
            label={t("enableRebate")}
            options={yesNoOptions}
            value={main.isEnableRebate}
            onChange={(value) => handleChange("isEnableRebate", value)}
            name="isEnableRebate"
          />
          <CustomSelect
            label={t("showRebate")}
            options={yesNoOptions}
            value={main.isShowRebate}
            onChange={(value) => handleChange("isShowRebate", value)}
            name="isShowRebate"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <CustomSelect
            label={t("showService")}
            options={yesNoOptions}
            value={main.isShowService}
            onChange={(value) => handleChange("isShowService", value)}
            name="isShowService"
          />
          <CustomInput
            label={t("auditReportUrl")}
            name="auditReportUrl"
            value={main.auditReportUrl}
            placeholder={t("auditReportUrl")}
            onChange={(e) => handleChange("auditReportUrl", e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {t("saveChanges")}
        </button>
      </form>

      <CustomDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
        <p>Settings saved successfully!</p>
      </CustomDialog>
    </TabPanel>
  );
}
