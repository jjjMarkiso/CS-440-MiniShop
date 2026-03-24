import { useEffect, useState } from "react";
import { fetchCart } from "../services/cartService";

function Cart() {
  const [appleQty, setAppleQty] = useState(0);
  const [appleTotal, setAppleTotal] = useState(0);
  const [error, setError] = useState("");

  const loadCart = async () => {
    setError("");
    try {
      const data = await fetchCart();

      const appleRow = data.find(
        (row) => String(row.name).toLowerCase() === "apple"
      );

      setAppleQty(appleRow ? Number(appleRow.quantity) : 0);
      setAppleTotal(appleRow ? Number(appleRow.totalvalue) : 0);
    } catch (err) {
      console.error(err);
      setError(err.message || "Server not reachable");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Cart</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Apples in cart: <strong>{appleQty}</strong></p>
      <p>Total cost: <strong>{appleTotal}</strong></p>
      <button onClick={loadCart}>Refresh</button>
    </div>
  );
}

export default Cart;
