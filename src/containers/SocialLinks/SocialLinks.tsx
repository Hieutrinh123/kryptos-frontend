import { DISCORD_LINK, FACEBOOK_LINK, TWITTER_LINK } from "#/config/social";
import DiscordIcon from "@/components/DiscordIcon";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface SocialLinksProps {
  color?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ color }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <SingleSocialLink href={FACEBOOK_LINK} color={color}>
        <FacebookRoundedIcon />
      </SingleSocialLink>

      <SingleSocialLink href={TWITTER_LINK} color={color}>
        <TwitterIcon />
      </SingleSocialLink>

      <SingleSocialLink href={DISCORD_LINK} color={color}>
        <DiscordIcon />
      </SingleSocialLink>
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
