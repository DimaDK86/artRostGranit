import { Container } from "@/components/ui/Container/Container";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

// Импортируем разные версии компонентов
import Logo from "@/components/ui/Logo/Logo";
import LogoText from "@/components/ui/Logo/LogoText";
import LogoTextColumn from "@/components/ui/Logo/LogoTextColumn";
import { Nav } from "@/components/ui/Nav/Nav";
import { MobileNav } from "@/components/ui/Nav/MobileNav";

export function Header() {
  const bp = useBreakpoints();

  return (
    <header className={styles.header}>
      <Container size="full" className={styles.headerContainer}>
        {/* Левая часть - Логотип (разный для разных экранов) */}
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoSection}>
            <Logo />

            {/* Разные варианты текста логотипа в зависимости от экрана */}
            {bp.current === "mobile-small" && <LogoTextColumn />}
            {bp.current === "mobile" && <LogoText />}
            {bp.current === "tablet" && <LogoTextColumn />}
            {bp.current === "desktop" && <LogoTextColumn />}
            {bp.current === "desktop-wide" && <LogoTextColumn />}
          </div>
        </Link>

        {/* Центральная часть - Навигация (разная для мобил/десктопа) */}
        {bp.isMobile ? (
          // <div>sdg</div>
          <MobileNav />
        ) : (
          // Гамбургер-меню на мобилках
          <Nav /> // Горизонтальное меню на десктопе
        )}

        {/* Правая часть - Контакты (только на десктопе) */}
        {bp.isDesktop || bp.isDesktopWide ? (
          <div className={styles.contacts}>
            <a href="tel:+78888888888" className={styles.phone}>
              +7 (888) 888-88-88
            </a>
            <button className={styles.callbackBtn}>Заказать звонок</button>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
