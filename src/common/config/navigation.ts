export interface Category {
  slug: string;
  title: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  slug: string;
  title: string;
}

export const PROJECT_ANALYSIS_CATEGORY = {
  slug: "project-analysis",
  title: "Phân tích dự án",
};

export const UPDATE_CATEGORY = {
  title: "Cập nhật",
  slug: "update",
  subcategories: [
    {
      slug: "on-chain-analysis",
      title: "Phân tích On-chain",
    },
    {
      slug: "technical-analysis",
      title: "Phân tích kỹ thuật",
    },
  ],
};

export const ECOSYSTEM_CATEGORY = {
  title: "Hệ sinh thái",
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
      title: "Khác",
    },
  ],
};

export const INDEPTH_ANALYSIS_CATEGORY = {
  title: "Phân tích chuyên sâu",
  slug: "indepth-analysis",
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
      title: "Cơ sở hạ tầng",
    },
    {
      slug: "macro-economy",
      title: "Tình hình vĩ mô",
    },
  ],
};

export const categories: Category[] = [
  PROJECT_ANALYSIS_CATEGORY,
  UPDATE_CATEGORY,
  ECOSYSTEM_CATEGORY,
  INDEPTH_ANALYSIS_CATEGORY,
];

export function getAllLeafCategories() {
  return categories.flatMap(
    (category) =>
      category.subcategories?.map((subcategory) => subcategory.slug) ?? [
        category.slug,
      ]
  );
}
