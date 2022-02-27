export interface NavOption {
  href: string;
  title: string;
  sublinks?: SubLink[];
}

export interface SubLink {
  href: string;
  title: string;
}

export function getFullSublinkHref(menuHref: string, sublinkHref: string) {
  return "/" + menuHref + "/" + sublinkHref;
}

export const navOptions: NavOption[] = [
  {
    href: "project-analysis",
    title: "Phân tích dự án",
  },
  {
    title: "Cập nhật",
    href: "update",
    sublinks: [
      {
        href: "on-chain-analysis",
        title: "Phân tích On-chain",
      },
      {
        href: "technical-analysis",
        title: "Phân tích kỹ thuật",
      },
    ],
  },
  {
    title: "Hệ sinh thái",
    href: "ecosystem",
    sublinks: [
      {
        href: "binance-smart-chain",
        title: "Binance Smart Chain",
      },
      {
        href: "solana",
        title: "Solana",
      },
      {
        href: "avalanche",
        title: "Avalanche",
      },
      {
        href: "polygon",
        title: "Polygon",
      },
      {
        href: "fantom",
        title: "Fantom",
      },
      {
        href: "near",
        title: "Near",
      },
      {
        href: "others",
        title: "Khác",
      },
    ],
  },
  {
    title: "Phân tích chuyên sâu",
    href: "indepth-analysis",
    sublinks: [
      {
        href: "defi",
        title: "DeFi",
      },
      {
        href: "nft",
        title: "NFT",
      },
      {
        href: "web3",
        title: "Web3",
      },
      {
        href: "infrastructure",
        title: "Cơ sở hạ tầng",
      },
      {
        href: "macro",
        title: "Tình hình vĩ mô",
      },
    ],
  },
];
