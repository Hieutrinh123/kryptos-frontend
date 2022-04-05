import { usePageSettings } from "@/api";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface SocialLinksProps {
  color?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ color }) => {
  const pageSettings = usePageSettings();
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {pageSettings.facebook_url && (
        <SingleSocialLink href={pageSettings.facebook_url} color={color}>
          <FacebookRoundedIcon />
        </SingleSocialLink>
      )}

      {pageSettings.twitter_url && (
        <SingleSocialLink href={pageSettings.twitter_url} color={color}>
          <TwitterIcon />
        </SingleSocialLink>
      )}

      {pageSettings.telegram_url && (
        <SingleSocialLink href={pageSettings.telegram_url} color={color}>
          <TelegramIcon />
        </SingleSocialLink>
      )}
    </Stack>
  );
};

export default SocialLinks;

interface SingleSocialLinkProps {
  color?: string;
  href: string;
}

const SingleSocialLink: React.FC<SingleSocialLinkProps> = ({
  color,
  href,
  children,
}) => {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      <Typography color={color} alignItems="center" display="flex">
        {children}
      </Typography>
    </a>
  );
};
