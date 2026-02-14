import LogoText from "@/assets/images/nameLogo.png";
import styles from './LogoText.module.scss'

const LogoName = () => {
  return (
    <div className={styles.LogoText}>
      <img  src={LogoText} alt="Логотип" />
    </div>
  );
};

export default LogoName;
