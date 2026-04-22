import { useEffect, useState } from "react";

function Cart() {
  const [appleQty, setAppleQty] = useState(0);
  const [appleTotal, setAppleTotal] = useState(0);
  const [bananaQty, setBananaQty] = useState(0);
  const [bananaTotal, setBananaTotal] = useState(0);
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

      // Find the Apple row
      const appleRow = data.find(
        (row) => String(row.name).toLowerCase() === "apple"
      );
      // Find the Banana row
      const bananaRow = data.find(
        (row) => String(row.name).toLowerCase() === "banana"
      );

      setAppleQty(appleRow ? Number(appleRow.quantity) : 0);
      setAppleTotal(appleRow ? Number(appleRow.totalvalue) : 0);
      setBananaQty(bananaRow ? Number(bananaRow.quantity) : 0);
      setBananaTotal(bananaRow ? Number(bananaRow.totalvalue) : 0);
    } catch (err) {
      console.error(err);
      setError("Server not reachable");
    }
  };

  const addApple = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: "Apple" })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add apple");
        return;
      }

      loadCart();
    } catch (err) {
      console.error(err);
      setError("Server not reachable");
    }
  };

  const addBanana = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: "Banana" })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add banana");
        return;
      }

      loadCart();
    } catch (err) {
      console.error(err);
      setError("Server not reachable");
    }
  };

  const removeApple = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/cart/Apple", {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to remove apple");
        return;
      }

      loadCart();
    } catch (err) {
      console.error(err);
      setError("Server not reachable");
    }
  };

  const removeBanana = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/cart/Banana", {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to remove apple");
        return;
      }

      loadCart();
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

      <p>Apples in cart: <strong>{appleQty}</strong> Cost: <strong>1</strong></p>
      <p>Bananas in cart: <strong>{bananaQty}</strong> Cost: <strong>2</strong></p>
      <p>Total cost: <strong>{appleTotal+bananaTotal}</strong></p>

      <button onClick={loadCart}>Refresh</button>
      <button onClick={addApple} style={{ marginLeft: 10}}>Add Apple</button>
      <button onClick={removeApple} style={{ marginleft: 10}}>Remove Apple</button>
      <button onClick={addBanana} style={{ marginLeft: 10 }}>Add Banana</button>
      <button onClick={removeBanana} style={{ marginleft: 10}}>Remove Banana</button>
    </div>
  );
}

export default Cart;