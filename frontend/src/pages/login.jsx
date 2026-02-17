import { useState } from "react";
import styles from "./signup.module.css"

function LoginPage() {
  // Local state for the two fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page refresh
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;