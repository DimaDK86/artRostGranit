import { Container } from "@/components/ui/Container/Container";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

import Logo from "@/components/ui/Logo/Logo";
import { Nav } from "@/components/ui/Nav/Nav";
import { MobileNav } from "@/components/ui/Nav/MobileNav";
import CartIcon from "@/components/ui/CartIcon/CartIcon.tsx";

import { socialContacts } from "@/utils/constants.ts";
import { useState } from "react";
// import { CheckoutModal } from "@/components/CheckoutModal/CheckoutModal.tsx";
import { OrderCallModal } from "@/components/ui/OrderCallModal/OrderCallModal.tsx";

export function Header() {
  const bp = useBreakpoints();

  const isMobileAny = bp.isMobileSmall || bp.isMobile;

  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container size="full" className={styles.headerContainer}>
        {/* Левая часть - Логотип (разный для разных экранов) */}
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoSection}>
            <Logo />
          </div>
        </Link>

        {isMobileAny ? (
          <div className={styles.headerCartMenuTabletMobile}>
            <CartIcon />
            <MobileNav />
          </div>
        ) : (
          <>
            <Nav />

            {bp.isTablet ? <CartIcon /> : null}
          </>
        )}

        {bp.isDesktop || bp.isDesktopWide ? (
          <>
            <div className={styles.contacts}>
              <a
                href={`tel:${socialContacts.phoneNumber}`}
                className={styles.phone}
              >
                {socialContacts.phoneNumber}
              </a>
              <button
                className={styles.callbackBtn}
                onClick={() => setIsCallModalOpen(true)}
              >
                Заказать звонок
              </button>
            </div>
            <CartIcon />
          </>
        ) : null}

        <OrderCallModal
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
        />
      </Container>
    </header>
  );
}
