import { Container } from "@/components/ui/Container/Container";
import styles from "./GalleryPage.module.scss";
import ImageCarousel from "@/components/ui/Carousel/ImageCarousel.tsx";
import img01 from "../../assets/images/sam/saim_01.jpeg";
import img02 from "../../assets/images/sam/saim_09.jpeg";
import img03 from "../../assets/images/sam/saim_03.jpeg";
import img04 from "../../assets/images/sam/saim_04.jpeg";
import img05 from "../../assets/images/sam/saim_05.jpeg";
import img06 from "../../assets/images/sam/saim_06.jpeg";
import img07 from "../../assets/images/sam/saim_07.jpeg";
import img08 from "../../assets/images/sam/saim_08.jpeg";
import img09 from "../../assets/images/sam/saim_09.jpeg";
import img10 from "../../assets/images/sam/saim_10.jpeg";
import img11 from "../../assets/images/sam/saim_11.jpeg";
import img12 from "../../assets/images/sam/saim_12.jpeg";
import img13 from "../../assets/images/sam/saim_13.jpeg";
import img14 from "../../assets/images/sam/saim_14.jpeg";

const GalleryPage = () => {
  const images: string[] = [
    img01,
    img02,
    img03,
    img04,
    img05,
    img06,
    img07,
    img08,
    img09,
    img10,
    img11,
    img12,
    img13,
    img14,
  ];

  return (
    <div className={styles.galleryPage}>
      <Container size="wide">
        <h1 className={styles.title}>Наши работы</h1>
        <p className={styles.subtitle}>Фотогалерея выполненных проектов</p>
        <div
          className={styles.productCardInfoImage}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px ",
          }}
        >
          <ImageCarousel images={images} height={480} />
        </div>
      </Container>
    </div>
  );
};

export default GalleryPage;
