import _ from "lodash";
import { AuthorListingResult } from "./authorTypes";
import { useEffect, useState } from "react";
import { listAuthors } from "./authorAPI";

export function useListAuthorsWithIds(
  ids: string[],
  page: number,
  limit: number
) {
  const [authors, setAuthors] = useState<AuthorListingResult>();
  const [loading, setLoading] = useState(false);

  console.log(ids);

  useEffect(() => {
    const filteredIds = ids.filter((id) => !_.isNil(id));

    if (filteredIds.length) {
      setLoading(true);
      listAuthors(page, limit, {
        filter: {
          id: {
            _in: filteredIds,
          },
        },
      }).then((fetchedAuthors) => {
        setAuthors(fetchedAuthors);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ids), limit, page]);

  return { authors, loading };
}
