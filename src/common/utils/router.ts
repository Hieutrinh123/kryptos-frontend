import { GetServerSidePropsContext } from "next";

export function getServerSidePageNumber(
  context: GetServerSidePropsContext
): number {
  return parseInt((context.query?.page as string) ?? "1");
}
