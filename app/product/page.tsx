"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
export default function ProductPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = 2999;
  return (
    <div style={{ minHeight: "100vh", padding: "40px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
        <div style={{ background: "#f3f4f6", borderRadius: "16px", height: "400px" }} />
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Minimalist Wallets Pro</h1>
          <p style={{ fontSize: "24px", fontWeight: 600, marginBottom: "24px" }}>₹{price.toLocaleString()}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: "36px", height: "36px", border: "1px solid #e5e7eb", borderRadius: "50%", cursor: "pointer", fontSize: "18px" }}>−</button>
            <span style={{ fontSize: "18px", fontWeight: 600 }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} style={{ width: "36px", height: "36px", border: "1px solid #e5e7eb", borderRadius: "50%", cursor: "pointer", fontSize: "18px" }}>+</button>
          </div>
          <button onClick={() => { addItem({ id: "product-1", name: "Minimalist Wallets Pro", price, quantity: qty }); setAdded(true); setTimeout(() => setAdded(false), 1500); }} style={{ width: "100%", padding: "14px", background: "#111", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600, fontSize: "16px", marginBottom: "12px" }}>
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
          <button onClick={() => router.push("/checkout")} style={{ width: "100%", padding: "14px", background: "#f3f4f6", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600, fontSize: "16px" }}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
