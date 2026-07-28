import { Link } from "react-router-dom";
import cartIcon from "@/assets/images/cart.png";
import { useCart } from "@/context/CartContext.tsx";

import styles from "./CartIcon.module.scss";

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className={styles.cartLink}>
      <div className={styles.cart}>
        <img src={cartIcon} alt="Корзина" className={styles.cartIcon} />
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
