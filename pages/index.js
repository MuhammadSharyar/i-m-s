import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (user) {
    router.push("/inventory");
  } else {
    router.push("/login");
  }
}
