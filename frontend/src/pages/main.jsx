import styles from './main.module.css';
import { Link } from "react-router-dom";
import { addAppleToCart } from "../services/cartService";

function MainPage() {
  const addToCart = async () => {
    try {
      const data = await addAppleToCart();
      alert(`Cart updated: ${data.name} qty=${data.quantity} total=${data.totalvalue}`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Server not reachable");
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <button>LogOut</button>
          <Link to="/signup">
            <button>SignUp</button>
          </Link>
        </div>

        <div className={styles.container}>
          <button onClick={addToCart}>Add To Cart</button>
          <Link to="/cart">
            <button>View Cart</button>
          </Link>
        </div>

        <div className={styles.footer}>
          <p>FOOTER</p>
        </div>
      </div>
    </>
  );
}

export default MainPage;
