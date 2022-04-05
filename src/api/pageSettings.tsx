import { Omit } from "@directus/sdk";
import React, { useContext } from "react";
import {
  joinSubfield,
  LanguageCode,
  languageCodeFields,
  Locale,
} from "./commonTypes";
import { directusGetFirstItem } from "./directus";
import {
  flattenPostTranslation,
  postTranslationFields,
  Post,
  PostTranslation,
} from "./posts";

export interface RootPageSettings {
  telegram_url?: string;
  twitter_url?: string;
  facebook_url?: string;
}

export interface PageSettingTranslation {
  page_settings_id: RootPageSettings;
  languages_code: LanguageCode;
  introduction: string;
  featured_posts?: { posts_translations_id: PostTranslation }[];
}

const pageSettingsFields = [
  ...joinSubfield("languages_code", languageCodeFields),
  "introduction",
  ...joinSubfield("featured_posts.posts_translations_id", postTranslationFields),
  ...joinSubfield("page_settings_id", [
    "telegram_url",
    "twitter_url",
    "facebook_url",
  ]),
];

export type PageSettings = Omit<
  PageSettingTranslation,
  "page_settings_id" | "featured_posts"
> &
  RootPageSettings & {
    featured_posts?: Post[];
  };

export async function getPageSettings(locale: Locale): Promise<PageSettings> {
  const settings = await directusGetFirstItem("page_settings_translations", {
    filter: {
      languages_code: {
        code: {
          _eq: locale,
        },
      },
    },
    fields: pageSettingsFields,
  });
  return {
    ...settings.page_settings_id,
    ...settings,
    featured_posts: settings.featured_posts?.map((link) => {
      return flattenPostTranslation(link.posts_translations_id);
    }),
  };
}

const PageSettingsContext = React.createContext<PageSettings>({
  languages_code: {
    code: "en",
  },
  featured_posts: [],
  introduction: "",
});

export const PageSettingsProvider: React.FC<{
  settings: PageSettings;
}> = ({ settings, children }) => {
  return (
    <PageSettingsContext.Provider value={settings}>
      {children}
    </PageSettingsContext.Provider>
  );
};

export function usePageSettings() {
  return useContext(PageSettingsContext);
}
