// src/pages/Contacts/ContactsPage.tsx
import { useState } from "react";
import { Container } from "@/components/ui/Container/Container";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import styles from "./ContactsPage.module.scss";

import whatsapp from "@/assets/images/social/whatsapp.png";
import telegram from "@/assets/images/social/tg.png";
import phone from "@/assets/images/social/phone.png";
import max from "@/assets/images/social/Max_logo-32x32.png";

import { socialContacts } from "@/utils/constants.ts";
import { OrderCallModal } from "@/components/ui/OrderCallModal/OrderCallModal.tsx";

type TabType = "retail" | "production";

const ContactsPage = () => {
  const bp = useBreakpoints();
  const [activeTab, setActiveTab] = useState<TabType>("retail");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const { phoneNumber, whatsappNumber, telegramUsername, maxUsername } =
    socialContacts;

  // Разные размеры карты для разных экранов
  const mapHeight = bp.isMobile ? 300 : bp.isTablet ? 400 : 500;
  const mapWidth = "100%";

  // Данные для табов
  const tabs = {
    production: {
      title: "Производство",
      address: "Донецк, Ростовская область",
      workHours: "ПН-ПТ с 09:00 до 17:00",
      mapUrl:
        // "https://yandex.ru/map-widget/v1/?ll=39.961188%2C48.354488&mode=search&sll=39.961360%2C48.355303&text=48.355303%2C39.961360&utm_source=ntp_chrome&z=16.73",
        "https://yandex.ru/map-widget/v1/?ll=39.972003%2C48.319496&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE2MjIyNhI_0KDQvtGB0YHQuNGPLCDQoNC-0YHRgtC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0JTQvtC90LXRhtC6IgoNh8cfQhU3WUFC&z=12.82",
    },
    retail: {
      title: "Розничное представительство в МО",
      address: "Одинцово, Московская область",
      workHours: "ПН-ПТ с 09:00 до 17:00",
      mapUrl:
        "https://yandex.ru/map-widget/v1/?ll=37.266059%2C55.679915&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzA2MzUwMxJD0KDQvtGB0YHQuNGPLCDQnNC-0YHQutC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0J7QtNC40L3RhtC-0LLQviIKDf0NFUIVcLdeQg%2C%2C&z=15.32",
    },
  };

  const currentTab = tabs[activeTab];

  return (
    <div className={styles.contactsPage}>
      <Container size="normal">
        <div className={styles.contactsItems}>
          <h2>КОНТАКТЫ</h2>
          <p className={styles.contactsSubtitle}>
            по вопросам сотрудничества, оптовых закупок,
          </p>
          <p className={styles.contactsSubtitle}>
            будем рады Вам ответить любым удобным способом,
          </p>

          <OrderCallModal
            isOpen={isCallModalOpen}
            onClose={() => setIsCallModalOpen(false)}
          />

          <div className={styles.orderCallModal}>
            <button
              className={styles.callbackBtn}
              onClick={() => setIsCallModalOpen(true)}
            >
              или закажите обратный звонок
            </button>{" "}
            :
          </div>
          <div className={styles.contactsItem}>
            <div>
              <a href={`tel:${phoneNumber}`} className={styles.socialLink}>
                <img className={styles.socialIcon} src={phone} alt="phone" />
                <span>+7 (901) 354-48-54</span>
              </a>
            </div>

            <div>
              <a
                href={`https://wa.me/${whatsappNumber.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img
                  className={styles.socialIcon}
                  src={whatsapp}
                  alt="whatsapp"
                />
                <span>+7 (901) 354-48-54</span>
              </a>
            </div>

            <div>
              <a
                href={`https://t.me/${telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img
                  className={styles.socialIcon}
                  src={telegram}
                  alt="telegram"
                />
                <span>@ChePopit</span>
              </a>
            </div>

            <div>
              <a
                href={`https://web.max.ru/${maxUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <img className={styles.socialIcon} src={max} alt="max" />
                <span>@ChePopit</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.title}>
          <h3>КАК НАС НАЙТИ | ЯндексКарты</h3>

          {/* Табы */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${activeTab === "retail" ? styles.active : ""}`}
              onClick={() => setActiveTab("retail")}
            >
              Розничное представительство в МО
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "production" ? styles.active : ""}`}
              onClick={() => setActiveTab("production")}
            >
              Производство
            </button>
          </div>

          <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
              <iframe
                src={currentTab.mapUrl}
                width={mapWidth}
                height={mapHeight}
                allowFullScreen
                style={{ position: "relative", border: "none" }}
                title={`Карта - ${currentTab.title}`}
              />
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.address}>
                <h4>Адрес</h4>
                <p>{currentTab.address}</p>
              </div>
              <div className={styles.time}>
                <h4>Режим работы</h4>
                <p>{currentTab.workHours}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactsPage;
