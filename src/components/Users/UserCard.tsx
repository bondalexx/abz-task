import type { User } from "../../types/api";
import styles from "./UsersSection.module.scss";

export default function UserCard({ user }: { user: User }) {
  return (
    <article className={styles.card} title={user.email}>
      <img src={user.photo} alt={user.name} loading="lazy" />
      <h3 className={styles.name}>{user.name}</h3>
      <div className={styles.meta}>
        <span className={styles.email} title={user.email}>
          {user.email}
        </span>
        <span className={styles.phone}>{user.phone}</span>
      </div>
    </article>
  );
}
