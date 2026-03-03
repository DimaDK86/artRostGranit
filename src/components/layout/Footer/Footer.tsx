import whatsapp from "@/assets/images/social/whatsapp.png";
import telegram from "@/assets/images/social/tg.png";
import phone from "@/assets/images/social/phone.png";

import styles from "./Footer.module.scss";

const Footer = () => {
  const phoneNumber = "+79013544854";
  const whatsappNumber = "+79013544854";
  const telegramUsername = "ChePopit";

  return (
    <footer className={styles.footer}>
      <div className={styles.empty}></div>
      <div className={styles.est}>est. 2015y</div>
      <div className={styles.social}>
        {/* Телефон */}
        <a href={`tel:${phoneNumber}`} className={styles.socialLink}>
          <img className={styles.socialIcon} src={phone} alt="phone" />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsappNumber.replace("+", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialIcon}
        >
          <img className={styles.socialIcon} src={whatsapp} alt="whatsapp" />
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/${telegramUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <img className={styles.socialIcon} src={telegram} alt="telegram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
