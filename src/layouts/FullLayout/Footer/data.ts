export type LinksKind = {
  text: string;
  href: string;
};

type FooterLinks = {
  title: string;
  links: LinksKind[];
};

export const footerLink: FooterLinks[] = [
  {
    title: "Giới thiệu",
    links: [
      {
        text: "Về Kryptos",
        href: "#",
      },
      {
        text: "Việc làm",
        href: "#",
      },
      {
        text: "Sản phẩm",
        href: "#",
      },
    ],
  },
  {
    title: "Phân tích dự án",
    links: [
      {
        text: "Binance Smart Chain",
        href: "#",
      },
      {
        text: "Phân tích kỹ thuật",
        href: "#",
      },
      {
        text: "Solana",
        href: "#",
      },
    ],
  },
  {
    title: "Cập nhật",
    links: [
      {
        text: "Phân tích On-chain",
        href: "#",
      },
      {
        text: "Phân tích kỹ thuật",
        href: "#",
      },
    ],
  },
  {
    title: "Hệ sinh thái",
    links: [
      {
        text: "Binance Smart Chain",
        href: "#",
      },
      {
        text: "Phân tích kỹ thuật",
        href: "#",
      },
      {
        text: "Solana",
        href: "#",
      },
      {
        text: "Avalanche",
        href: "#",
      },
      {
        text: "Polygon",
        href: "#",
      },
      {
        text: "Fantom",
        href: "#",
      },
      {
        text: "Near",
        href: "#",
      },
      {
        text: "Others",
        href: "#",
      },
    ],
  },
  {
    title: "Phân tích chuyên sâu",
    links: [
      {
        text: "DeFi",
        href: "#",
      },
      {
        text: "NFT",
        href: "#",
      },
      {
        text: "Web3",
        href: "#",
      },
      {
        text: "Cơ sở hạ tầng",
        href: "#",
      },
      {
        text: "Tình hình vĩ mô",
        href: "#",
      },
    ],
  },
];
