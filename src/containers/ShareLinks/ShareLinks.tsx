import { usePostUrl } from "#/hooks/usePostUrl";
import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";

interface ShareLinksProps {
  post: Post;
}

function useFacebookShareLink(post: Post): string | undefined {
  const pageUrl = usePostUrl(post);
  return useMemo(() => {
    if (pageUrl) {
      const url = new URL("https://www.facebook.com/sharer/sharer.php");
      url.searchParams.set("u", pageUrl);
      return url.toString();
    }
  }, [pageUrl]);
}

function useTwitterShareLink(post: Post): string | undefined {
  const pageUrl = usePostUrl(post);
  return useMemo(() => {
    if (pageUrl) {
      const url = new URL("https://twitter.com/intent/tweet");
      url.searchParams.set("text", "Check out this post on KryptosNews");
      url.searchParams.set("url", pageUrl);
      return url.toString();
    }
  }, [pageUrl]);
}

function useTelegramShareLink(post: Post): string | undefined {
  const pageUrl = usePostUrl(post);
  return useMemo(() => {
    if (pageUrl) {
      const url = new URL("https://telegram.me/share/url");
      url.searchParams.set("text", "Check out this post on KryptosNews");
      url.searchParams.set("url", pageUrl);
      return url.toString();
    }
  }, [pageUrl]);
}

const ShareLinks: React.FC<ShareLinksProps> = ({ post }) => {
  const facebookShareLink = useFacebookShareLink(post);
  const twitterShareLink = useTwitterShareLink(post);
  const telegramShareLink = useTelegramShareLink(post);
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
        href={facebookShareLink}
        compact={isDesktop}
      >
        <FacebookRoundedIcon />
      </SocialShareLink>
      <SocialShareLink
        title={t("Share on Twitter")}
        href={twitterShareLink}
        compact={isDesktop}
      >
        <TwitterIcon />
      </SocialShareLink>
      <SocialShareLink
        title={t("Share on Telegram")}
        href={telegramShareLink}
        compact={isDesktop}
      >
        <TelegramIcon />
      </SocialShareLink>
    </Stack>
  );
};

interface SocialShareLinkProps {
  title: string;
  href: string | undefined;
  compact?: boolean;
}
const SocialShareLink: React.FC<SocialShareLinkProps> = ({
  title,
  href,
  compact,
  children,
}) => {
  if (!href) {
    return null;
  }
  return compact ? (
    <Tooltip title={title}>
      <IconButton
        color="primary"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      href={href}
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
