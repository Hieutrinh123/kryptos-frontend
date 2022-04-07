export interface Navigation {
  slug?: string;
  title: string;
  subnavigations?: SubNavigation[];
}

export interface SubNavigation {
  slug: string;
  title: string;
}

export const NEWS_CATEGORY = {
  slug: "news",
  title: "News",
};

export const PROJECT_ANALYSIS_CATEGORY = {
  slug: "project-analysis",
  title: "Project Analysis",
};

export const ECOSYSTEM_CATEGORY = {
  title: "Ecosystem",
  slug: "ecosystem",
  subnavigations: [
    {
      slug: "binance-smart-chain",
      title: "Binance Smart Chain",
    },
    {
      slug: "solana",
      title: "Solana",
    },
    {
      slug: "avalanche",
      title: "Avalanche",
    },
    {
      slug: "polygon",
      title: "Polygon",
    },
    {
      slug: "fantom",
      title: "Fantom",
    },
    {
      slug: "near",
      title: "NEAR",
    },
    {
      slug: "others",
      title: "Others",
    },
  ],
};

export const IN_DEPTH_ANALYSIS_CATEGORY = {
  title: "In-depth Analysis",
  slug: "in-depth-analysis",
  subnavigations: [
    {
      slug: "de-fi",
      title: "De-Fi",
    },
    {
      slug: "nft",
      title: "NFT",
    },
    {
      slug: "web3",
      title: "Web3",
    },
    {
      slug: "infrastructure",
      title: "Infrastructure",
    },
    {
      slug: "macro-economy",
      title: "Macro-economy",
    },
  ],
};

export const NAVIGATIONS: Navigation[] = [
  NEWS_CATEGORY,
  PROJECT_ANALYSIS_CATEGORY,
  ECOSYSTEM_CATEGORY,
  IN_DEPTH_ANALYSIS_CATEGORY,
];

export const OVERVIEW_NAVIGATION: Navigation = {
  title: "Overview",
  subnavigations: [
    { slug: "about-kryptos", title: "About Kryptos" },
  ],
};

export function getAllLeafCategories() {
  return NAVIGATIONS.flatMap(
    (category) =>
      category.subnavigations?.map((subcategory) => subcategory.slug) ?? [
        category.slug,
      ]
  );
}
