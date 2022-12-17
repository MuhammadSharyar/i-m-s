import { useState } from "react";
import styles from "./style.module.css";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { auth } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const { user, setUser, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorText("");
    await login(email, password).catch(() => {
      if (email === "" || password === "") {
        setErrorText("Please fill all fields");
      } else {
        setErrorText("Email or password is incorrect");
      }
    });
  };

  if (user) {
    router.push("/inventory");
  }

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <h2 className={styles.logo}>ims</h2>
        <input
          className={styles.formInput}
          placeholder="Email"
          type={"email"}
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.formInput}
          placeholder="Password"
          type={"password"}
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorText != "" ? (
          <p className={styles.errorMessage}>{errorText}</p>
        ) : (
          <p></p>
        )}
        <input
          type={"submit"}
          value="LOGIN"
          className={styles.loginBtn}
          onClick={handleLogin}
        />
      </form>
    </div>
  );
}
