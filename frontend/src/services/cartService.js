export async function fetchCart() {
  const res = await fetch("http://localhost:5000/cart");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to load cart");
  }

  return data;
}

export async function addAppleToCart() {
  const res = await fetch("http://localhost:5000/cart/add-apple", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to add to cart");
  }

  return data;
}