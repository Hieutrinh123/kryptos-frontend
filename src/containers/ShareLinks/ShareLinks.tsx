import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

interface ShareLinksProps {
  post: Post;
}
function useFacebookShareLink(post: Post) {
  const [result, setResult] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pageLink = `${location.protocol}//${location.host}/posts/${post.slug}`;

      const url = new URL("https://www.facebook.com/sharer/sharer.php");
      url.searchParams.set("u", pageLink);

      setResult(url.toString());
    }
  }, [post.slug]);
  return result;
}

function useTwitterShareLink(post: Post) {
  const [result, setResult] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pageLink = `${location.protocol}//${location.host}/posts/${post.slug}`;

      const url = new URL("https://telegram.me/share/url");
      url.searchParams.set("text", "Check out this post on KryptosNews");
      url.searchParams.set("url", pageLink);

      setResult(url.toString());
    }
  }, [post.slug]);
  return result;
}

const ShareLinks: React.FC<ShareLinksProps> = ({ post }) => {
  const facebookShareLink = useFacebookShareLink(post);
  const twitterShareLink = useTwitterShareLink(post);
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  return (
    <Stack
      direction={{ mobile: "column", desktop: "row" }}
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <SocialShareLink
        title={t("Share on Facebook")}
        link={facebookShareLink}
        compact={isDesktop}
      >
        <FacebookRoundedIcon />
      </SocialShareLink>
      <SocialShareLink
        title={t("Share on Twitter")}
        link={twitterShareLink}
        compact={isDesktop}
      >
        <TwitterIcon />
      </SocialShareLink>
      <SocialShareLink
        title={t("Share on Telegram")}
        link={twitterShareLink}
        compact={isDesktop}
      >
        <TelegramIcon />
      </SocialShareLink>
    </Stack>
  );
};

interface SocialShareLinkProps {
  title: string;
  link: string;
  compact?: boolean;
}
const SocialShareLink: React.FC<SocialShareLinkProps> = ({
  title,
  link,
  compact,
  children,
}) => {
  return compact ? (
    <Tooltip title={title}>
      <IconButton
        color="primary"
        href={link}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      variant="contained"
      color="primary"
    >
      <Stack direction="row" spacing={3}>
        {children}
        <span style={{ width: 200 }}>{title}</span>
      </Stack>
    </Button>
  );
};

export default ShareLinks;
