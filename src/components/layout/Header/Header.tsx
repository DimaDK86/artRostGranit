import { Container } from "@/components/ui/Container/Container";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

// Импортируем разные версии компонентов
import Logo from "@/components/ui/Logo/Logo";
// import LogoText from "@/components/ui/Logo/LogoText";
// import LogoTextColumn from "@/components/ui/Logo/LogoTextColumn";
import { Nav } from "@/components/ui/Nav/Nav";
import { MobileNav } from "@/components/ui/Nav/MobileNav";
import { useCart } from "@/context/CartContext";
import cartIcon from "@/assets/images/cart.png";

export function Header() {
  const bp = useBreakpoints();

  const isMobileAny = bp.isMobileSmall || bp.isMobile;

  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <Container size="full" className={styles.headerContainer}>
        {/* Левая часть - Логотип (разный для разных экранов) */}
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoSection}>
            <Logo />
          </div>
        </Link>

        {/* Навигация - используем стабильную группу */}
        {isMobileAny ? (
          <div className={styles.headerCartMenuTabletMobile}>
            <Link to="/cart" className={styles.cartLink}>
              <div className={styles.cart}>
                <img src={cartIcon} alt="Корзина" className={styles.cartIcon} />
                {totalItems > 0 && (
                  <span className={styles.cartBadge}>{totalItems}</span>
                )}
              </div>
            </Link>
            <MobileNav />
          </div>
        ) : (
          <>
            <Nav />

            <Link to="/cart" className={styles.cartLink}>
              <div className={styles.cart}>
                <img src={cartIcon} alt="Корзина" className={styles.cartIcon} />
                {totalItems > 0 && (
                  <span className={styles.cartBadge}>{totalItems}</span>
                )}
              </div>
            </Link>
          </>
        )}

        {/* Правая часть - Контакты (только на десктопе) */}
        {bp.isDesktop || bp.isDesktopWide ? (
          <>
            <div className={styles.contacts}>
              <a href="tel:+78888888888" className={styles.phone}>
                +7 (888) 888-88-88
              </a>
              <button className={styles.callbackBtn}>Заказать звонок</button>
            </div>
            <Link to="/cart" className={styles.cartLink}>
              <div className={styles.cart}>
                <img src={cartIcon} alt="Корзина" className={styles.cartIcon} />
                {totalItems > 0 && (
                  <span className={styles.cartBadge}>{totalItems}</span>
                )}
              </div>
            </Link>
          </>
        ) : null}
      </Container>
    </header>
  );
}
