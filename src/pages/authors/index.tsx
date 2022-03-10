import { listAuthors } from "@/api/author";
import FullLayout from "@/layouts/FullLayout";
import { ListItem } from "@mui/material";
import List from "@mui/material/List";
import { Authors } from "@tryghost/content-api";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";

interface WriterListPageProps {
  authors: Authors;
}

const WriterListPage: NextPage<WriterListPageProps> = ({ authors }) => {
  return (
    <FullLayout>
      <List>
        {authors.map((author) => (
          <ListItem key={author.id}>
            <Link href={`authors/${author.slug}`}>{author.name}</Link>
          </ListItem>
        ))}
      </List>
    </FullLayout>
  );
};

export default WriterListPage;

export const getServerSideProps: GetServerSideProps<
  WriterListPageProps
> = async (context) => {
  const page = parseInt((context.params?.page as string) ?? "1");
  const authors = await listAuthors(page);
  return {
    props: {
      authors,
    },
  };
};
