import { Link, useLocation } from "react-router-dom"; // ← импортируем
import styles from "./Nav.module.scss";

export function Nav() {
    const location = useLocation();
    return (
        <nav className={styles.nav}>
            <ul className={styles.navItems}>
                <li className={styles.navItem}>
                    <Link 
                        to="/" 
                        className={location.pathname === '/' ? styles.active : ''}
                    >
                        Главная
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link to="/catalog"
                        className={location.pathname === '/catalog' ? styles.active : ''}
                    >
                        Каталог
                        
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link to="/contacts"
                        className={location.pathname === '/contacts' ? styles.active : ''}
                    >
                        Контакты
                        
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
