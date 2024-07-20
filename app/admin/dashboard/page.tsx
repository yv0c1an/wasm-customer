"use client";

import React, { useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  Cog8ToothIcon,
  ClipboardDocumentListIcon,
  ClipboardIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

import TopNavBar from "@/app/components/TopNavBar";
import GeneralPanel from "@/app/components/GeneralPanel";
import MessagingPanel from "@/app/components/MessagingPanel";
import Web3ModalPanel from "@/app/components/Web3ModalPanel";
import LoaderTextsPanel from "@/app/components/LoaderTextsPanel";
import { useTranslations } from "next-intl";

const commonTabStyles =
  "rounded-md py-2.5 text-sm font-bold leading-5 h-10 inline-flex items-center justify-center mx-3 px-3 w-auto transition-all duration-200 ease-in-out";
const selectedTabStyles = "bg-[#162136] text-blue-600 shadow-lg";
const unselectedTabStyles = "text-gray-400 hover:bg-gray-700 hover:text-white";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/main", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[rgb(36, 44, 70)] text-white">
      <TopNavBar />
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <TabGroup>
            <TabList className="flex justify-between rounded-xl bg-[#131722] p-1 mb-8 h-20 items-center">
              <Tab
                className={({ selected }) =>
                  `${commonTabStyles} ${
                    selected ? selectedTabStyles : unselectedTabStyles
                  } flex items-center space-x-2`
                }
              >
                <Cog8ToothIcon className="w-5 h-5" aria-hidden="true" />
                <span className="border-0">{t("General")}</span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  `${commonTabStyles} ${
                    selected ? selectedTabStyles : unselectedTabStyles
                  } flex items-center space-x-2`
                }
              >
                <ClipboardDocumentListIcon
                  className="w-5 h-5"
                  aria-hidden="true"
                />
                <span className="border-0">{t("loader_texts")}</span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  `${commonTabStyles} ${
                    selected ? selectedTabStyles : unselectedTabStyles
                  } flex items-center space-x-2`
                }
              >
                <ClipboardIcon className="w-5 h-5" aria-hidden="true" />
                <span className="border-0">{t("messaging")}</span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  `${commonTabStyles} ${
                    selected ? selectedTabStyles : unselectedTabStyles
                  } flex items-center space-x-2`
                }
              >
                <BuildingOffice2Icon className="w-5 h-5" aria-hidden="true" />
                <span className="border-0">{t("web3Modal")}</span>
              </Tab>
            </TabList>
            <TabPanels>
              <div className="bg-[#131722] rounded-xl p-6 shadow-lg">
                <GeneralPanel />
                <LoaderTextsPanel />
                <MessagingPanel />
                <Web3ModalPanel />
              </div>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
