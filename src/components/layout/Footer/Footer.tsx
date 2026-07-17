import whatsapp from "@/assets/images/social/whatsapp.png";
import telegram from "@/assets/images/social/tg.png";
import max from "@/assets/images/social/Max_logo-32x32.png";
import phone from "@/assets/images/social/phone.png";

import styles from "./Footer.module.scss";

const Footer = () => {
  const phoneNumber = "+79013544854";
  const whatsappNumber = "+79013544854";
  const telegramUsername = "ChePopit";
  const maxmUsername = "ChePopit";

  return (
    <footer className={styles.footer}>
      <div className={styles.empty}></div>
      <div className={styles.est}>
        ЛИТЬЕВОЙ МАРМОР<sup>®</sup>
      </div>
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

        {/* MAX */}
        <a
          href={`https://web.max.ru/${maxmUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <img className={styles.socialIcon} src={max} alt="telegram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
