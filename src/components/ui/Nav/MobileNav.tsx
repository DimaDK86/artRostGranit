import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MobileNav.module.scss';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Главная" },
    { path: "/catalog", label: "Каталог" },
    { path: "/gallery", label: "Наши работы" },
    { path: "/about", label: "О компании" },
    { path: "/contacts", label: "Контакты" },
  ];
  
  const closeMenu = () => setIsOpen(false);
  
  return (
    <>
      <button 
        className={`${styles.burger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      {isOpen && (
        <div className={styles.menu}>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? styles.active : ''}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className={styles.mobileContacts}>
            <a href="tel:+78888888888" className={styles.phone}>
              +7 (888) 888-88-88
            </a>
            <button className={styles.callbackBtn}>
              Заказать звонок
            </button>
          </div>
        </div>
      )}
    </>
  );
}