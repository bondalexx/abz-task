import RegisterForm from "./RegisterForm";
import { useResetUsersToFirstPage } from "../../hooks/useUsers";

export default function RegisterSection() {
  const resetUsers = useResetUsersToFirstPage();

  const handleSuccess = () => {
    resetUsers();
    const el = document.querySelector("#users");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="register">
      <RegisterForm onSuccess={handleSuccess} />
    </section>
  );
}
