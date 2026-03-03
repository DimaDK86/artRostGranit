import { Container } from "@/components/ui/Container/Container";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import styles from "./ContactsPage.module.scss";

import whatsapp from "@/assets/images/social/whatsapp.png";
import telegram from "@/assets/images/social/tg.png";
import phone from "@/assets/images/social/phone.png";

export function ContactsPage() {
  const bp = useBreakpoints();
  const phoneNumber = "+79013544854";
  const whatsappNumber = "+79013544854";
  const telegramUsername = "ChePopit";

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
                  src="https://yandex.ru/map-widget/v1/?ll=37.416580%2C55.601284&mode=search&oid=135224636907&ol=biz&z=16.48"
                  width={mapWidth}
                  height={mapHeight}
                  allowFullScreen
                  style={{ position: "relative", border: "none" }}
                  title="Карта расположения Чё попить"
                ></iframe>
              </div>
              <div className="contact wow animate__backInLeft">
                <div className="address">
                  <h4>Наш адрес</h4>
                  <p>Москва улица Малое Понизовье дом 8 корп. 1</p>
                </div>
                <div className="time">
                  <h4>Время работы</h4>
                  <p>ПН-ВС с 11:00 до 23:00</p>
                  <p>без выходных и перерывов</p>
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
                <img className={styles.socialIcon} src={whatsapp} alt="whatsapp" />
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
                <img className={styles.socialIcon} src={telegram} alt="telegram" />
                @ChePopit
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
