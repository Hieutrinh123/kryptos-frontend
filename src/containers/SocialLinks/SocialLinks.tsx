import { FACEBOOK_LINK, TWITTER_LINK } from "#/config/social";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import React from "react";

interface SocialLinksProps {
  color?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ color }) => {
  return (
    <Stack direction="row" spacing={2}>
      <NextLink href={FACEBOOK_LINK} passHref>
        <a>
          <Typography color={color}>
            <FacebookRoundedIcon />
          </Typography>
        </a>
      </NextLink>
      <NextLink href={TWITTER_LINK} passHref>
        <a>
          <Typography color={color}>
            <TwitterIcon />
          </Typography>
        </a>
      </NextLink>
    </Stack>
  );
};

export default SocialLinks;
