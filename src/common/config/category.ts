export interface Category {
  slug: string;
  title: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
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

export const UPDATE_CATEGORY = {
  title: "Update",
  slug: "update",
  subcategories: [
    {
      slug: "on-chain-analysis",
      title: "On-Chain Analysis",
    },
    {
      slug: "technical-analysis",
      title: "Technical Analysis",
    },
  ],
};

export const ECOSYSTEM_CATEGORY = {
  title: "Ecosystem",
  slug: "ecosystem",
  subcategories: [
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
  subcategories: [
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

export const CATEGORIES: Category[] = [
  NEWS_CATEGORY,
  PROJECT_ANALYSIS_CATEGORY,
  UPDATE_CATEGORY,
  ECOSYSTEM_CATEGORY,
  IN_DEPTH_ANALYSIS_CATEGORY,
];

export function getAllLeafCategories() {
  return CATEGORIES.flatMap(
    (category) =>
      category.subcategories?.map((subcategory) => subcategory.slug) ?? [
        category.slug,
      ]
  );
}
