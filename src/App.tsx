import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersSection from "./components/Users/UsersSection";
import RegisterSection from "./components/Form/RegisterSection";
import "./styles/globals.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import styles from "./styles/App.module.scss";

const qc = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Hero />
          <UsersSection />
          <RegisterSection />
        </main>
      </div>
    </QueryClientProvider>
  );
}
