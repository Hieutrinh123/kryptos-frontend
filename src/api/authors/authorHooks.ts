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

  useEffect(() => {
    const filteredIds = ids.filter((id) => !_.isNil(id));

    if (filteredIds.length) {
      setLoading(true);
      const slicedIds = filteredIds.slice((page - 1) * limit, page * limit);
      listAuthors(1, limit, {
        filter: {
          id: {
            _in: slicedIds,
          },
        },
      })
        .then((fetchedAuthors) => {
          setAuthors(fetchedAuthors);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ids), limit, page]);

  return { authors, loading };
}
