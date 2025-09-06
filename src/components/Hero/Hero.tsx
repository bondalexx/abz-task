import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} />
      <div className={styles.inner}>
        <p className={styles.title}>
          Test assignment for
          <br />
          front-end developer
        </p>
        <p className={styles.description}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they’ll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <a href="#register" className={styles.cta}>
          Sign up
        </a>
      </div>
    </section>
  );
}
