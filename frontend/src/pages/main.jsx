import styles from './main.module.css'
import { Link } from "react-router-dom"

function MainPage() {

    const addToCart = async () => {
        try {
        const res = await fetch("http://localhost:5000/cart/add-apple", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(data);
            alert(data.error || "Failed to add to cart");
            return;
        }

        console.log("Added to cart:", data);
        alert(`Cart updated: ${data.name} qty=${data.quantity} total=${data.totalvalue}`);
        } catch (err) {
        console.error(err);
        alert("Server not reachable");
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