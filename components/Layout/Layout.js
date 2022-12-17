import { useAuth } from "../../context/AuthContext";
import styles from "./style.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(
    window.innerWidth >= 700 ? true : false
  );
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  return (
    <div>
      {user ? (
        <nav className={styles.navContainer}>
          <h2 className={styles.navHeader}>ims</h2>
          {windowSize <= 700 ? (
            <FontAwesomeIcon
              icon={faBars}
              className={styles.menuIcon}
              onClick={() => setShowMenu(!showMenu)}
            />
          ) : null}
          <ul className={showMenu === true ? styles.navList : styles.hidden}>
            <li className={styles.navItem}>
              <Link href={"/inventory"}>Inventory</Link>
            </li>
            <li className={styles.navItem}>
              <Link href={"/process"}>Process</Link>
            </li>
            <li className={styles.navItem}>
              <Link href={"/salary"}>Salary</Link>
            </li>
            <li className={styles.navBtnWrapper}>
              <button className={styles.navBtn} onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
      {children}
    </div>
  );
}
