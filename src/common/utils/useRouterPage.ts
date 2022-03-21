import { useRouter } from "next/router";

export function useRouterPage() {
  const router = useRouter();
  const pageQuery = router.query.page ?? "1";
  let page;
  if (pageQuery instanceof Array) {
    page = parseInt(pageQuery[0]);
  } else {
    page = parseInt(pageQuery);
  }

  return page;
}
