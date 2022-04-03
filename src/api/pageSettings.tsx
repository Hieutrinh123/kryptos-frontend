import { axiosInstance } from "@/api/api";
import { Post } from "@/api/posts";
import { Locale } from "@/api/strapi";
import React, { useContext } from "react";

export interface PageSettings {
  locale: Locale;
  introduction: string;
  featured_posts?: Post[];
}
export async function getPageSettings(locale: Locale): Promise<PageSettings> {
  const response = await axiosInstance.get<PageSettings>("page-setting", {
    params: {
      locale: locale,
      populate: "featured_posts.thumbnail",
    },
  });
  return response.data;
}

const PageSettingsContext = React.createContext<PageSettings>({
  locale: "en",
  featured_posts: [],
  introduction: "",
});

interface PageSettingsProps {
  settings: PageSettings;
}

export const PageSettingsProvider: React.FC<PageSettingsProps> = ({
  settings,
  children,
}) => {
  return (
    <PageSettingsContext.Provider value={settings}>
      {children}
    </PageSettingsContext.Provider>
  );
};

export function usePageSettings() {
  return useContext(PageSettingsContext);
}
