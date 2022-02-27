import FacebookImg from "public/images/facebook.png";
import Twitter from "public/images/twitter.png";

type SocialKind = {
  href: string;
  title: string;
  image: StaticImageData;
};

type LinksKind = {
  text: string;
  href: string;
};

type FooterLinkKind = {
  title: string;
  links: LinksKind[];
};

const footerLink: FooterLinkKind[] = [
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

const social: SocialKind[] = [
  {
    href: "#",
    title: "facebook",
    image: FacebookImg,
  },
  {
    href: "#",
    title: "twitter",
    image: Twitter,
  },
  {
    href: "#",
    title: "facebook",
    image: FacebookImg,
  },
  {
    href: "#",
    title: "twitter",
    image: Twitter,
  },
];

export { footerLink, social };
export type { LinksKind };
