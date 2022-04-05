import { useIsDesktop } from "#/styles/responsive";
import { Post } from "@/api";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
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

      const url = new URL("https://twitter.com/intent/tweet");
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
  const isDesktop = useIsDesktop();
  const { t } = useTranslation();

  // Todo: refactor this mess
  return (
    <Stack direction={{ mobile: "column", desktop: "row" }} spacing={2}>
      {isDesktop ? (
        <IconButton
          href={facebookShareLink}
          color="primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FacebookRoundedIcon />
        </IconButton>
      ) : (
        <Button
          href={facebookShareLink}
          target="_blank"
          rel="noreferrer noopener"
          variant="contained"
          color="primary"
        >
          <Stack direction="row" spacing={3}>
            <FacebookRoundedIcon />
            <span style={{ width: 200 }}>{t("Share on Facebook")}</span>
          </Stack>
        </Button>
      )}

      {isDesktop ? (
        <IconButton
          color="primary"
          href={twitterShareLink}
          target="_blank"
          rel="noreferrer noopener"
        >
          <TwitterIcon />
        </IconButton>
      ) : (
        <Button
          href={twitterShareLink}
          target="_blank"
          rel="noreferrer noopener"
          variant="contained"
          color="primary"
        >
          <Stack direction="row" spacing={3}>
            <TwitterIcon />
            <span style={{ width: 200 }}>{t("Share on Twitter")}</span>
          </Stack>
        </Button>
      )}
    </Stack>
  );
};

export default ShareLinks;
