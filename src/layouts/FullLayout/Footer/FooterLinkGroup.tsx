import { Box, Link, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { LinksKind } from "./data";

interface FooterLinkGroupProps {
  title: string;
  items: LinksKind[];
}
const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, items }) => {
  return (
    <Box
      sx={(theme) => ({
        alignSelf: "flex-start",
        display: "inline-block",
      })}
    >
      <Typography fontWeight="700">{title}</Typography>
      <List
        sx={(theme) => ({
          fontSize: "1rem",
          maxWidth: 100,
          lineHeight: "18.75px",
        })}
      >
        {items.map((link, index) => (
          <ListItem
            key={index + link.text}
            sx={(theme) => ({
              margin: 0,
              padding: 0,
              py: "4px",
            })}
          >
            <Link
              href={link.href}
              underline="none"
              color="white"
              sx={{
                "&:hover": {
                  transform: "translateX(8px)",
                  transition: "transform .2s ease",
                },
              }}
            >
              {link.text}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FooterLinkGroup;
