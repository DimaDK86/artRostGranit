import { Container } from "@/components/ui/Container/Container";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import styles from "./ContactsPage.module.scss";

import whatsapp from "@/assets/images/social/whatsapp.png";
import telegram from "@/assets/images/social/tg.png";
import phone from "@/assets/images/social/phone.png";
import max from "@/assets/images/social/Max_logo-32x32.png";

import { socialContacts } from "@/utils/constants.ts";

export function ContactsPage() {
  const bp = useBreakpoints();

  const { phoneNumber, whatsappNumber, telegramUsername, maxUsername } =
    socialContacts;

  // Разные размеры карты для разных экранов
  const mapHeight = bp.isMobile ? 300 : bp.isTablet ? 400 : 500;
  const mapWidth = "100%"; // всегда 100%

  return (
    <div className={styles.contactsPage}>
      <Container size="normal">
        <div className={styles.title}>
          <h3>КАК НАС НАЙТИ | ЯндексКарты</h3>

          <div className="maps">
            <div className="map">
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=39.961188%2C48.354488&mode=search&sll=39.961360%2C48.355303&text=48.355303%2C39.961360&utm_source=ntp_chrome&z=16.73"
                  width={mapWidth}
                  height={mapHeight}
                  allowFullScreen
                  style={{ position: "relative", border: "none" }}
                  title="Карта расположения Чё попить"
                ></iframe>
              </div>
              <div className="contact wow animate__backInLeft">
                <div className="address">
                  <h4>адрес производства</h4>
                  <p>
                    2-й Аварийный переулок, 10, Донецк, Ростовская область,
                    346341
                  </p>
                </div>
                <div className="time">
                  <h4>Режим работы</h4>
                  <p>ПН-ПТ с 09:00 до 17:00</p>
                  {/*<p>без перерывов</p>*/}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contactsItems}>
          <h2>КОНТАКТЫ</h2>
          <p>по вопросам сотрудничества, открытых ваканчий и прочим,</p>
          <p>будем рады Вам ответить любым удобным способом:</p>
          <div className={styles.contactsItem}>
            <div>
              <a href={`tel:${phoneNumber}`} className="social-link">
                <img className={styles.socialIcon} src={phone} alt="phone" />
                +7 (901) 354-48-54
              </a>
            </div>

            <div>
              <a
                href={`https://wa.me/${whatsappNumber.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img
                  className={styles.socialIcon}
                  src={whatsapp}
                  alt="whatsapp"
                />
                +7 (901) 354-48-54
              </a>
            </div>

            <div>
              <a
                href={`https://t.me/${telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img
                  className={styles.socialIcon}
                  src={telegram}
                  alt="telegram"
                />
                @ChePopit
              </a>
            </div>

            <div>
              <a
                href={`https://web.max.ru/${maxUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <img className={styles.socialIcon} src={max} alt="telegram" />
                @ChePopit
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
