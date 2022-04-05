import { getAuthorName } from "@/api";
import AuthorAvatar from "@/containers/AuthorAvatar";
import Chip from "@mui/material/Chip";
import { Author } from "@/api";
import React, { useRef } from "react";
import { useHover } from "usehooks-ts";
import NextLink from "next/link";

interface AuthorChipProps {
  author: Author;
}

const AuthorChip: React.FC<AuthorChipProps> = ({ author }) => {
  const chipRef = useRef(null);

  const isHover = useHover(chipRef);

  return (
    <NextLink href={`/authors/${author.slug}`} passHref>
      <a>
        <Chip
          ref={chipRef}
          label={getAuthorName(author)}
          color={isHover ? "primary" : "default"}
          sx={{
            cursor: "pointer",
          }}
          avatar={
            <AuthorAvatar
              author={author}
              sx={{ height: 20, width: 20, marginLeft: "10px" }}
            />
          }
        />
      </a>
    </NextLink>
  );
};

export default AuthorChip;
