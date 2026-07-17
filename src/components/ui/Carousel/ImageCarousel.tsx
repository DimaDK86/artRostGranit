// src/components/ui/ImageCarousel/ImageCarousel.tsx
import { Carousel } from "antd";
import notImage from "@/assets/images/product/not_image.jpg";
// import styles from "./ImageCarousel.module.scss";

interface ImageCarouselProps {
  images: string[];
  height?: number;
}

const ImageCarousel = ({ images, height = 500 }: ImageCarouselProps) => {
  // Если нет изображений, используем заглушку
  const imageList = images?.length > 0 ? images : [notImage];

  return (
    <Carousel
      style={{ width: "500px", height: "500px" }}
      autoplay={{ dotDuration: true }}
      autoplaySpeed={5000}
      arrows={true}
    >
      {imageList.map((image, index) => (
        <div key={index}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={image || notImage}
              alt={`Фото ${index + 1}`}
              style={{
                width: "100%",
                height: `${height}px`,
                objectFit: "contain",
                // background: "#f5f5f5",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
