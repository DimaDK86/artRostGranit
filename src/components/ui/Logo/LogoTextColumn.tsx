import LogoTextColumn from "@/assets/images/nameLogoCol.png"
import styles from './LogoTextColumn.module.scss';

const LogoNameColumn = () => {
  return (
    <div className={styles.logoTextColumn} >
      <img src={LogoTextColumn} alt="Логотип" />
    </div>
  );
};

export default LogoNameColumn;