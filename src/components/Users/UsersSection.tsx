import { useUsers } from "../../hooks/useUsers";
import UserCard from "./UserCard";
import styles from "./UsersSection.module.scss";

export default function UsersSection() {
  const { data, fetchNextPage, isFetchingNextPage } = useUsers();

  const pages = data?.pages ?? [];
  const users = pages.flatMap((p) => p.users);
  const hasNext = pages.at(-1)?.links.next_url != null;

  return (
    <section className={styles.wrapper} id="users">
      <h2 className={styles.title}>Working with GET request</h2>
      <div className={styles.grid}>
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
      {hasNext && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles.more}
        >
          {isFetchingNextPage ? "Loading…" : "Show more"}
        </button>
      )}
    </section>
  );
}
