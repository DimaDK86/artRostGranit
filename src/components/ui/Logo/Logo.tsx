// import logo from "@/assets/images/logo.png";
import logo from "@/assets/images/lit_mramor_2_2.png";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Логотип" />
    </div>
  );
};

export default Logo;
