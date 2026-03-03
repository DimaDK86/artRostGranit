import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.scss";

export function Nav() {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Главная" },
    { path: "/catalog", label: "Каталог" },
    { path: "/gallery", label: "Наши работы" },
    { path: "/about", label: "О компании" },
    { path: "/contacts", label: "Контакты" },
  ];
  
  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={location.pathname === item.path ? styles.active : ""}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}