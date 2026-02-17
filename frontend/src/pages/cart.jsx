import { useEffect, useState } from "react";

function Cart() {
  const [appleQty, setAppleQty] = useState(0);
  const [appleTotal, setAppleTotal] = useState(0);
  const [error, setError] = useState("");

  const loadCart = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/cart");
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load cart");
        return;
      }

      // Find the Apple row (case-insensitive)
      const appleRow = data.find(
        (row) => String(row.name).toLowerCase() === "apple"
      );

      setAppleQty(appleRow ? Number(appleRow.quantity) : 0);
      setAppleTotal(appleRow ? Number(appleRow.totalvalue) : 0);
    } catch (err) {
      console.error(err);
      setError("Server not reachable");
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