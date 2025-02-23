
// async function fetchUsers() {
//   const res = await fetch("http://localhost:3000/api/users", { cache: "no-store" });
//   return res.json();
// }
import { redirect } from "next/navigation";

export default function HomePage() {
  const isLoggedIn = false; // Replace with actual auth check (e.g., session)

  if (isLoggedIn) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
