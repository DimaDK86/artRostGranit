import { Container } from "@/components/ui/Container/Container";
import { Nav } from "@/components/ui/Nav/Nav";
import styles from "./Header.module.scss";
import Logo from "@/components/ui/Logo/Logo";
import LogoNameColumn from "@/components/ui/Logo/LogoTextColumn";
import LogoName from "@/components/ui/Logo/LogoText";

export function Header() {
  return (
    <header className={styles.header}>
      <Container size="normal" className={styles.headerContainer}>
        <div className={styles.logoBlock}>
          <Logo />
          <LogoNameColumn />
        </div>
        <Nav />
        <LogoName />
      </Container>
    </header>
  );
}
