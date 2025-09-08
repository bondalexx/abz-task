import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";

const PAGE_SIZE = 6;

export function useUsers() {
  return useInfiniteQuery({
    queryKey: ["users", PAGE_SIZE],
    queryFn: ({ pageParam = 1 }) => fetchUsers(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.links.next_url) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    select: (data) => ({
      pages: data.pages,
      hasNext: Boolean(data.pages.at(-1)?.links.next_url),
    }),
  });
}

export function useResetUsersToFirstPage() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["users", 6] });
}
