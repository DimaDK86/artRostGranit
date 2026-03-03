import { Link } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'detailed';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  // Форматируем цену
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <Link to={`/product/${product.id}`} className={styles.link}>
        
        {/* Блок с фото */}
        <div className={styles.imageWrapper}>
          <img 
            src={product.image} 
            alt={product.name}
            className={styles.image}
            loading="lazy"
          />
          {product.material && (
            <span className={styles.material}>{product.material}</span>
          )}
        </div>
        
        {/* Информация о товаре */}
        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          
          {product.description && variant === 'detailed' && (
            <p className={styles.description}>{product.description}</p>
          )}
          
          {product.sizes && variant !== 'compact' && (
            <p className={styles.sizes}>{product.sizes}</p>
          )}
          
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{formattedPrice}</span>
            <button 
              className={styles.buyBtn}
              onClick={(e) => {
                e.preventDefault(); // Предотвращаем переход по ссылке
                // Здесь будет логика добавления в корзину
                console.log('Добавить в корзину:', product.id);
              }}
            >
              Заказать
            </button>
          </div>
        </div>
        
      </Link>
    </div>
  );
}