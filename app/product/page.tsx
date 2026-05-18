"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../components/CartContext";

const DEFAULT_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCReklqRufNVrjUaMQYSUSDrUc11NQItCZ3H3jpBIMJEpOMycZCTBos9v5eldQ551OdyvZSPC9hS0QRVC29WaEwMOzVlvp4CGuZKkWZ4pLSMe9bxkgy68IPanD5DPNrQy7HDMyWkLwHUzVXnkxawJOAstTF-NpvxO1jrhzXDCsm-q-iLX2pAUK7qf2yz4gh-MkccxVyEDZDYpI6tkMTcZgNyhsZp3JJ1bkTW4AifbKKIGa2fb5SVE_yK07asM_7F3QQO3NZ99W0oJS3",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAZCRwD_kg3e-0dkEcI4s5WY0kWV9JHicGlOJ-lxC3bYs_nKztO5RglzbfSjzR7IH6G7dwva1TRiwLQ8c8lVx73VufQpcAJHLDLvQC2iu1lqqOAUKNQQtepZKKgzZ1EoFOcyEsQt9bK9ic-bgzE7z7wlIgixPhCWJMYKaX6XPH6rmjpjCDWs2uj297196nKah8Vzl82ziV3muUL667nkj_FOD_mOeL093t8AhqEck8rmx5NBRplpzsImilUTL-91BqddHukEJ6_CFzN",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAxd2mIDP755SUG3R9lrHv6cLKk52-qJSwFelrkErpy1KzYJVkgHgUx01eCLnRCvyu3ITBd0zGlV1TUA3Nszyuw_B4gjVTGVigvIMt2WT8nSImOaO2XQWDjsj9BR_zbVcr77WOdU_QFinPUKQ32fxlHdteR0KhIm2G9kD7S4Y1vENjHaiV6rl-7yxtFHmFkwS3mBphtt2UJPhOi6nejcMnZu7EKp-RMW318I0_suy7ShenZKMznDu8GM5KiEBouXUzpI_liyRLIBWM9",
];

const COLORS = [
  { name: "Obsidian", hex: "#0a0a0a" },
  { name: "Charcoal", hex: "#2a2a2a" },
  { name: "Slate", hex: "#3a3a3a" },
];

const REVIEWS = [
  { name: "Arjun M.", rating: 5, text: "Exceptional quality. The leather is buttery smooth and the minimalist design is exactly what I was looking for. Been using it for 6 months and it only gets better.", date: "March 2024" },
  { name: "Priya K.", rating: 5, text: "Gifted this to my husband and he hasn't stopped raving about it. The slim profile fits perfectly in any pocket. Worth every rupee.", date: "February 2024" },
  { name: "Rahul S.", rating: 5, text: "The RFID blocking works perfectly. Sleek, premium, and incredibly durable. This is my third ESTATE purchase.", date: "January 2024" },
];

function Stars({ n }: { n: number }) {
  return <span style={{ color: "#c6c6c6", letterSpacing: "2px" }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

function ProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem, totalItems } = useCart();

  const paramName = searchParams.get("name") ? decodeURIComponent(searchParams.get("name")!) : null;
  const paramPrice = searchParams.get("price") ? Number(searchParams.get("price")) : null;
  const paramImg = searchParams.get("img") ? decodeURIComponent(searchParams.get("img")!) : null;

  const images = paramImg ? [paramImg, ...DEFAULT_IMAGES.filter(i => i !== paramImg)] : DEFAULT_IMAGES;
  const productName = paramName || "The Core Wallet";
  const price = paramPrice || 125;

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  function handleAdd() {
    addItem({ id: "product-" + productName.toLowerCase().replace(/\s+/g, "-"), name: productName, price, quantity: qty, color: COLORS[selectedColor].name, image: images[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    handleAdd();
    setTimeout(() => router.push("/checkout"), 100);
  }

  const styles: Record<string, React.CSSProperties> = {
    page: { minHeight: "100vh", background: "#121414", color: "#e3e2e2", fontFamily: "Inter, sans-serif" },
    nav: { position: "sticky", top: 0, zIndex: 50, background: "#121414", borderBottom: "1px solid #343535", height: "80px", display: "flex", alignItems: "center", padding: "0 48px" },
    navInner: { maxWidth: "1440px", width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" },
    navLeft: { display: "flex", alignItems: "center", gap: "40px" },
    logo: { fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "32px", letterSpacing: "-0.02em", color: "#e3e2e2", background: "none", border: "none", cursor: "pointer" },
    navLinks: { display: "flex", gap: "28px" },
    navLink: { color: "#cfc4c5", fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontSize: "15px", fontFamily: "Inter, sans-serif" },
    cartBtn: { position: "relative", background: "none", border: "none", cursor: "pointer", color: "#e3e2e2" },
    cartBadge: { position: "absolute", top: "-6px", right: "-6px", background: "#c6c6c6", color: "#121414", fontSize: "10px", fontWeight: 700, borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center" },
    main: { maxWidth: "1440px", margin: "0 auto", padding: "40px 48px 120px" },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "start" },
    mainImg: { background: "#1a1a1a", aspectRatio: "4/5", overflow: "hidden", marginBottom: "16px" },
    thumbRow: { display: "flex", gap: "10px" },
    divider: { height: "1px", background: "#1f2020", margin: "28px 0" },
    label: { fontSize: "12px", letterSpacing: "0.2em", fontWeight: 600, color: "#767575", marginBottom: "12px", textTransform: "uppercase" as const, display: "block" },
    priceText: { fontFamily: "Montserrat, sans-serif", fontSize: "32px", fontWeight: 700, color: "#e3e2e2", marginBottom: "6px" },
    btnPrimary: { width: "100%", padding: "18px 32px", fontSize: "13px", fontFamily: "Inter, sans-serif", background: "#c6c6c6", color: "#121414", border: "none", fontWeight: 700, cursor: "pointer", letterSpacing: "0.15em", transition: "all 0.2s" },
    btnOutline: { width: "100%", padding: "18px 32px", fontSize: "13px", fontFamily: "Inter, sans-serif", background: "transparent", color: "#c6c6c6", border: "1.5px solid #343535", fontWeight: 600, cursor: "pointer", letterSpacing: "0.15em", transition: "all 0.2s" },
    benefitRow: { display: "flex", alignItems: "flex-start", gap: "14px", padding: "18px 0", borderBottom: "1px solid #1f2020" },
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap');
        .thumb-active { border-color: #c6c6c6 !important; opacity: 1 !important; }
        .thumb-btn { opacity: 0.5; transition: opacity 0.2s, border-color 0.2s; }
        .thumb-btn:hover { opacity: 1; }
        .color-swatch { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s, transform 0.2s; }
        .color-swatch.active-swatch { border-color: #c6c6c6; transform: scale(1.12); }
        .review-card { border: 1px solid #1f2020; padding: 28px; background: #0d0e0f; }
        .btn-primary-hover:hover { background: #e3e2e2 !important; transform: translateY(-2px); }
        .btn-outline-hover:hover { border-color: #c6c6c6 !important; color: #e3e2e2 !important; transform: translateY(-2px); }
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; }
          .mobile-sticky { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: #121414; border-top: 1px solid #343535; padding: 16px 20px; display: flex !important; gap: 12px; }
        }
        @media (min-width: 769px) { .mobile-sticky { display: none !important; } }
      `}</style>

      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.navLeft}>
            <button style={styles.logo} onClick={() => router.push("/")}>ESTATE</button>
            <div style={styles.navLinks}>
              <button style={styles.navLink} onClick={() => router.push("/shop")}>Shop</button>
              <button style={styles.navLink} onClick={() => router.push("/")}>Our Story</button>
            </div>
          </div>
          <button style={styles.cartBtn} onClick={() => router.push("/checkout")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && <span style={styles.cartBadge}>{totalItems}</span>}
          </button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "20px 48px 0" }}>
        <p style={{ color: "#767575", fontSize: "13px" }}>
          <button onClick={() => router.push("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "#767575", fontFamily: "Inter, sans-serif" }}>Home</button>
          {" / "}
          <button onClick={() => router.push("/shop")} style={{ background: "none", border: "none", cursor: "pointer", color: "#767575", fontFamily: "Inter, sans-serif" }}>Shop</button>
          {" / "}
          <span style={{ color: "#c6c6c6" }}>{productName}</span>
        </p>
      </div>

      <main style={styles.main}>
        <div className="product-grid" style={styles.grid}>
          {/* Gallery */}
          <div>
            <div style={styles.mainImg}>
              <img src={images[selectedImg]} alt={productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={styles.thumbRow}>
              {images.slice(0, 4).map((img, i) => (
                <button key={i} className={`thumb-btn${selectedImg === i ? " thumb-active" : ""}`}
                  onClick={() => setSelectedImg(i)}
                  style={{ flex: 1, aspectRatio: "1", background: "#1a1a1a", overflow: "hidden", border: selectedImg === i ? "1.5px solid #c6c6c6" : "1.5px solid #343535", padding: 0, cursor: "pointer" }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div style={{ paddingTop: "8px" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", fontWeight: 600, color: "#767575", textTransform: "uppercase" }}>ESTATE — LEATHER GOODS</span>

            <h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "12px 0 16px", color: "#e3e2e2" }}>
              {productName}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <Stars n={5} />
              <span style={{ fontSize: "13px", color: "#767575" }}>4.9 (128 reviews)</span>
            </div>

            <p style={styles.priceText}>${price}</p>
            <p style={{ fontSize: "13px", color: "#767575", marginBottom: "28px" }}>Free shipping · 30-day returns · Lifetime warranty</p>

            <div style={styles.divider} />

            {/* Color */}
            <div style={{ marginBottom: "24px" }}>
              <span style={styles.label}>COLOR — <span style={{ color: "#c6c6c6" }}>{COLORS[selectedColor].name}</span></span>
              <div style={{ display: "flex", gap: "12px" }}>
                {COLORS.map((c, i) => (
                  <button key={i} className={`color-swatch${selectedColor === i ? " active-swatch" : ""}`}
                    onClick={() => setSelectedColor(i)} style={{ backgroundColor: c.hex, border: selectedColor === i ? "2px solid #c6c6c6" : "2px solid #343535" }} title={c.name} />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: "28px" }}>
              <span style={styles.label}>QUANTITY</span>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: "36px", height: "36px", border: "1.5px solid #343535", background: "transparent", color: "#c6c6c6", fontSize: "18px", cursor: "pointer", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>−</button>
                <span style={{ fontSize: "18px", fontWeight: 600, minWidth: "24px", textAlign: "center" }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  style={{ width: "36px", height: "36px", border: "1.5px solid #343535", background: "transparent", color: "#c6c6c6", fontSize: "18px", cursor: "pointer", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>+</button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              <button className="btn-primary-hover" style={styles.btnPrimary} onClick={handleAdd}>
                {added ? "ADDED TO CART ✓" : "ADD TO CART"}
              </button>
              <button className="btn-outline-hover" style={styles.btnOutline} onClick={handleBuyNow}>
                BUY NOW
              </button>
            </div>

            {/* Benefits */}
            <div>
              {[
                { icon: "🔒", title: "RFID Blocking Protection", desc: "Military-grade shielding for your cards" },
                { icon: "🇮🇳", title: "Handcrafted in India", desc: "Full-grain vegetable-tanned leather" },
                { icon: "✦", title: "Lifetime Guarantee", desc: "We repair or replace, no questions asked" },
              ].map((b, i) => (
                <div key={i} style={{ ...styles.benefitRow, borderBottom: i < 2 ? "1px solid #1f2020" : "none" }}>
                  <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "2px" }}>{b.icon}</span>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", color: "#c6c6c6", marginBottom: "4px" }}>{b.title}</p>
                    <p style={{ fontSize: "14px", color: "#767575" }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section style={{ marginTop: "100px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Customer Reviews</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Stars n={5} />
              <span style={{ fontSize: "15px", color: "#767575" }}>4.9 / 5</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <Stars n={r.rating} />
                  <span style={{ fontSize: "12px", color: "#767575" }}>{r.date}</span>
                </div>
                <p style={{ color: "#cfc4c5", lineHeight: 1.7, marginBottom: "16px", fontSize: "15px" }}>{r.text}</p>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#767575", letterSpacing: "0.1em" }}>— {r.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile sticky bar */}
      <div className="mobile-sticky" style={{ display: "none" }}>
        <button className="btn-primary-hover" onClick={handleAdd} style={{ flex: 1, padding: "14px", fontSize: "12px", fontFamily: "Inter, sans-serif", background: "#c6c6c6", color: "#121414", border: "none", fontWeight: 700, cursor: "pointer", letterSpacing: "0.15em" }}>
          {added ? "ADDED ✓" : `ADD TO CART · $${price}`}
        </button>
        <button className="btn-outline-hover" onClick={handleBuyNow} style={{ flex: 1, padding: "14px", fontSize: "12px", fontFamily: "Inter, sans-serif", background: "transparent", color: "#c6c6c6", border: "1.5px solid #343535", fontWeight: 600, cursor: "pointer", letterSpacing: "0.15em" }}>
          BUY NOW
        </button>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#121414" }} />}>
      <ProductContent />
    </Suspense>
  );
}
