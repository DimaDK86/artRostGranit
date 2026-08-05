import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MobileNav.module.scss";
import { OrderCallModal } from "@/components/ui/OrderCallModal/OrderCallModal.tsx";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Главная" },
    { path: "/catalog", label: "Каталог" },
    { path: "/gallery", label: "Наши работы" },
    // { path: "/about", label: "О компании" },
    { path: "/contacts", label: "Контакты" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        className={`${styles.burger} ${isOpen ? styles.open : ""}`}
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
                className={location.pathname === item.path ? styles.active : ""}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.mobileContacts}>
            <a href="tel:+79013544854" className={styles.phone}>
              +7 (901) 354-48-54
            </a>
            <button
              className={styles.callbackBtn}
              onClick={() => setIsCallModalOpen(true)}
            >
              Заказать звонок
            </button>
            <OrderCallModal
              isOpen={isCallModalOpen}
              onClose={() => setIsCallModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
