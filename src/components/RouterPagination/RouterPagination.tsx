import { useRouterPage } from "#/utils/useRouterPage";
import Box from "@mui/material/Box";
import Pagination, {
  PaginationRenderItemParams,
} from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import NextLink from "next/link";
import React from "react";
import styles from "./RouterPagination.module.scss";

interface RouterPaginationProps {
  count: number;
  basePath: string;
}

const RouterPagination: React.FC<RouterPaginationProps> = ({
  count,
  basePath,
}) => {
  const page = useRouterPage();
  return (
    <Pagination
      count={count}
      page={page}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      renderItem={(item) => {
        const pageQueryString = item.page === 1 ? "" : `?page=${item.page}`;
        return (
          <Box padding={1}>
            <PaginationItem
              component={PaginationLink}
              href={basePath + pageQueryString}
              item={item}
              {...item}
            />
          </Box>
        );
      }}
    />
  );
};

export default RouterPagination;

interface PaginationLinkProps {
  href: string;
  item: PaginationRenderItemParams;
}

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ href, item, children }, ref) => {
    if (item.disabled) {
      return (
        <a
          ref={ref}
          className={`${styles.paginationLink} ${styles.paginationLinkDisabled}`}
        >
          {children}
        </a>
      );
    }
    return (
      <NextLink href={href} passHref>
        <a
          ref={ref}
          className={`${styles.paginationLink} ${
            item.selected ? styles.paginationLinkSelected : ""
          }`}
        >
          {children}
        </a>
      </NextLink>
    );
  }
);
PaginationLink.displayName = "PaginationLink";
