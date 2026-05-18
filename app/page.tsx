"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const { items, addItem, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Montserrat:wght@600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        font-family: 'Material Symbols Outlined';
      }

      .page-enter {
        animation: pageEnter 0.7s ease forwards;
      }
      @keyframes pageEnter {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .reveal {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      .reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .btn-lift {
        transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s;
      }
      .btn-lift:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      }

      .card-hover {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .card-hover:hover {
        transform: scale(1.03);
        box-shadow: 0 12px 40px rgba(0,0,0,0.6);
      }

      .nav-link {
        transition: color 0.3s;
      }
      .nav-link:hover {
        color: #c6c6c6;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: "signature-bifold-001",
      name: "The Signature Bifold",
      price: 145.0,
      quantity: 1,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBV_i3ej2D_DnOZs_MWe_-6lKVaizw5-Taaqh5JyHf0QmCbY3E2FlSLUcwfW4TnJmMYRDYHTW5DkXTkJ9Cc67uQE5vKlJHKwHCSe1gOvGghm6A1ddyQmptRvpuxJNc-OWV61lRzi2Tex7FiDV7J6UF2xDagLgIjWmNzoJ8_9Z9j_eJ3zqqvyz-o0Pi9vAbTF58SMshXkSH4jO2fZTkKayDK05mzs4KWue1VtnuK_5tIV1arPnO_Cb4NX3lxt7_1XZ3-G9l9K4cbltDK",
    });
  };

  return (
    <div
      className="page-enter"
      style={{
        backgroundColor: "#121414",
        color: "#e3e2e2",
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Material Symbols Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Montserrat:wght@600;700&display=swap"
        rel="stylesheet"
      />

      {/* TOP NAV BAR */}
      <nav
        style={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#121414",
          borderBottom: "1px solid #343535",
          transition: "opacity 0.2s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0 20px",
            height: "80px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          {/* Brand */}
          <button
            onClick={() => router.push("/")}
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#e3e2e2",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            ESTATE
          </button>

          {/* Desktop Links */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
            }}
            className="hidden-mobile"
          >
            <button
              onClick={() => router.push("/shop")}
              className="nav-link"
              style={{
                color: "#cfc4c5",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Shop
            </button>
            <button
              onClick={() => router.push("/")}
              className="nav-link"
              style={{
                color: "#cfc4c5",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Our Story
            </button>
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "#e3e2e2",
              background: "none",
              border: "none",
              transition: "color 0.3s",
              position: "relative",
            }}
            onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = "#c6c6c6")}
            onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = "#e3e2e2")}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontFamily: "Material Symbols Outlined" }}
            >
              shopping_bag
            </span>
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "#c6c6c6",
                  color: "#121414",
                  borderRadius: "9999px",
                  fontSize: "11px",
                  fontWeight: 700,
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Responsive nav styles */}
        <style>{`
          @media (max-width: 767px) {
            .hidden-mobile { display: none !important; }
          }
          @media (min-width: 768px) {
            .hidden-mobile { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "360px",
            maxWidth: "100vw",
            height: "100vh",
            backgroundColor: "#1f2020",
            borderLeft: "1px solid #343535",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            padding: "24px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#e3e2e2",
              }}
            >
              Your Bag ({totalItems})
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#cfc4c5",
                cursor: "pointer",
                fontSize: "24px",
              }}
            >
              ✕
            </button>
          </div>

          {items.length === 0 ? (
            <p style={{ color: "#cfc4c5", fontSize: "16px" }}>
              Your bag is empty.
            </p>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #343535",
                  }}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "72px",
                        height: "72px",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        color: "#e3e2e2",
                        fontWeight: 600,
                        marginBottom: "4px",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {item.name}
                    </p>
                    <p style={{ color: "#cfc4c5", fontSize: "14px" }}>
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#988e90",
                        cursor: "pointer",
                        fontSize: "12px",
                        marginTop: "6px",
                        padding: 0,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "24px",
                  borderTop: "1px solid #343535",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ color: "#e3e2e2", fontWeight: 600 }}>
                    Total
                  </span>
                  <span style={{ color: "#e3e2e2", fontWeight: 700 }}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  className="btn-lift"
                  onClick={() => {
                    setCartOpen(false);
                    router.push("/checkout");
                  }}
                  style={{
                    width: "100%",
                    backgroundColor: "#e3e2e2",
                    color: "#121414",
                    padding: "14px 0",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Cart Overlay */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 199,
          }}
        />
      )}

      <main style={{ flexGrow: 1 }}>
        {/* HERO SECTION */}
        <section
          style={{
            position: "relative",
            width: "100%",
            height: "819px",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          {/* Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundColor: "#0d0e0f",
            }}
          >
            <img
              alt="Cinematic macro shot of a sleek black leather wallet resting on a dark brushed metal surface."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfGAXkXqj5fMT5E-SZ6lIl0Mu0HKUdnRLp4DfFEi9zwvoTqYuwSuwPmljX7XeKSTAB7WLMO0UMjGAuCmf_w2-aDEDlchXVob1Fn1MJPd9MEuFDV9ZM_GupViVSANo91-QtaAJ2JEwQme8pdDvqQOXN8KVn4iWSt9xEjxdjeHlXU3WLMxJvz5TpEuKJvo4RyIOtBKwz0MME2kPqueBMj7hTE5qPlpLrUe1nKk5pBvBJDNQQMtKss-cWDrrAAgVWyTWY_OQHsepBz5zQ"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, #121414 0%, rgba(18,20,20,0.8) 50%, transparent 100%)",
              }}
            />
          </div>

          {/* Hero Content */}
          <div style={{ position: "relative", zIndex: 10, maxWidth: "672px" }}>
            <h1
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                color: "#e3e2e2",
                marginBottom: "8px",
              }}
            >
              The Art of Essentialism.
            </h1>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "18px",
                lineHeight: 1.6,
                letterSpacing: "0.01em",
                color: "#cfc4c5",
                marginBottom: "24px",
                maxWidth: "512px",
              }}
            >
              Redefining everyday carry through uncompromising craftsmanship
              and minimalist design. Experience the quiet luxury of curated
              utility.
            </p>
            <button
              className="btn-lift"
              onClick={() => router.push("/shop")}
              style={{
                backgroundColor: "#e3e2e2",
                color: "#121414",
                padding: "16px 32px",
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.2em",
                fontWeight: 600,
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                borderRadius: 0,
              }}
            >
              Explore Collection
            </button>
          </div>
        </section>

        {/* FEATURED PRODUCT SHOWCASE */}
        <section
          className="reveal"
          style={{
            padding: "120px 20px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "24px",
              alignItems: "center",
            }}
          >
            {/* Product Image */}
            <div
              className="card-hover"
              style={{
                gridColumn: "span 7",
                backgroundColor: "#000000",
                position: "relative",
                aspectRatio: "4/5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                alt="A high-contrast editorial photograph of an ultra-slim black bifold wallet shown slightly open."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV_i3ej2D_DnOZs_MWe_-6lKVaizw5-Taaqh5JyHf0QmCbY3E2FlSLUcwfW4TnJmMYRDYHTW5DkXTkJ9Cc67uQE5vKlJHKwHCSe1gOvGghm6A1ddyQmptRvpuxJNc-OWV61lRzi2Tex7FiDV7J6UF2xDagLgIjWmNzoJ8_9Z9j_eJ3zqqvyz-o0Pi9vAbTF58SMshXkSH4jO2fZTkKayDK05mzs4KWue1VtnuK_5tIV1arPnO_Cb4NX3lxt7_1XZ3-G9l9K4cbltDK"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  mixBlendMode: "luminosity",
                  opacity: 0.8,
                  transition: "transform 0.7s ease-out",
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform =
                    "scale(1.05)")
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform =
                    "scale(1)")
                }
              />
            </div>

            {/* Product Info */}
            <div
              style={{
                gridColumn: "span 5",
                paddingLeft: "48px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingTop: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "#988e90",
                  marginBottom: "16px",
                }}
              >
                Featured Carry
              </span>
              <h2
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  lineHeight: 1.3,
                  letterSpacing: "0.05em",
                  fontWeight: 600,
                  color: "#e3e2e2",
                  marginBottom: "8px",
                }}
              >
                The Signature Bifold
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  lineHeight: 1.6,
                  color: "#cfc4c5",
                  marginBottom: "24px",
                }}
              >
                $145.00
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  letterSpacing: "0.01em",
                  color: "#cfc4c5",
                  marginBottom: "32px",
                  maxWidth: "448px",
                }}
              >
                Stripped of excess, engineered for longevity. The Signature
                Bifold holds exactly what you need in an impossibly slim
                profile, crafted from single-source Italian full-grain leather.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button
                  onClick={() => router.push("/product")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    color: "#e3e2e2",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    textDecoration: "underline",
                    textDecorationColor: "rgba(227,226,226,0.5)",
                    textUnderlineOffset: "4px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "text-decoration-color 0.3s",
                    padding: 0,
                  }}
                  onMouseOver={(e) =>
                    ((e.currentTarget as HTMLElement).style.textDecorationColor =
                      "#e3e2e2")
                  }
                  onMouseOut={(e) =>
                    ((e.currentTarget as HTMLElement).style.textDecorationColor =
                      "rgba(227,226,226,0.5)")
                  }
                >
                  View Details
                </button>

                <button
                  className="btn-lift"
                  onClick={() => {
                    handleAddToCart();
                    setCartOpen(true);
                  }}
                  style={{
                    backgroundColor: "#e3e2e2",
                    color: "#121414",
                    padding: "12px 24px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>

          {/* Mobile layout override */}
          <style>{`
            @media (max-width: 767px) {
              .featured-grid {
                display: flex !important;
                flex-direction: column !important;
              }
              .featured-image-col {
                width: 100% !important;
              }
              .featured-info-col {
                padding-left: 0 !important;
                padding-top: 32px !important;
              }
            }
          `}</style>
        </section>

        {/* FEATURES / TECHNICAL SPECS */}
        <section
          className="reveal"
          style={{
            padding: "120px 20px",
            backgroundColor: "#1b1c1c",
            borderTop: "1px solid #343535",
            borderBottom: "1px solid #343535",
          }}
        >
          <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
            <div style={{ marginBottom: "64px" }}>
              <h3
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "24px",
                  lineHeight: 1.4,
                  letterSpacing: "0.05em",
                  fontWeight: 600,
                  color: "#e3e2e2",
                  marginBottom: "16px",
                }}
              >
                Engineered Constraints
              </h3>
              <div
                style={{
                  width: "48px",
                  height: "1px",
                  backgroundColor: "#cfc4c5",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Feature 1 */}
              <div
                className="card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "24px",
                  backgroundColor: "#1f2020",
                  border: "1px solid #343535",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#343535",
                    color: "#e3e2e2",
                    padding: "4px 12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: "24px",
                    borderRadius: "4px",
                    border: "1px solid #343535",
                  }}
                >
                  Full-Grain Leather
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    letterSpacing: "0.01em",
                    color: "#cfc4c5",
                  }}
                >
                  Sourced from premium tanneries, our leather develops a unique
                  patina over time. It is selected for its uncompromised
                  durability and natural grain structure, ensuring no two pieces
                  are identical.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className="card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "24px",
                  backgroundColor: "#1f2020",
                  border: "1px solid #343535",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#343535",
                    color: "#e3e2e2",
                    padding: "4px 12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: "24px",
                    borderRadius: "4px",
                    border: "1px solid #343535",
                  }}
                >
                  RFID Protection
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    letterSpacing: "0.01em",
                    color: "#cfc4c5",
                  }}
                >
                  Integrated silently within the leather layers, our
                  aerospace-grade blocking mesh secures your data against
                  unauthorized scanning without adding perceptible bulk or
                  compromising the sleek silhouette.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className="card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "24px",
                  backgroundColor: "#1f2020",
                  border: "1px solid #343535",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#343535",
                    color: "#e3e2e2",
                    padding: "4px 12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: "24px",
                    borderRadius: "4px",
                    border: "1px solid #343535",
                  }}
                >
                  Ultra-Slim Profile
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    letterSpacing: "0.01em",
                    color: "#cfc4c5",
                  }}
                >
                  Designed to disappear into your pocket. We utilize advanced
                  precision-skiving techniques to thin the leather at the seams,
                  reducing overall thickness by 40% compared to traditional
                  wallets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          className="reveal"
          style={{
            padding: "120px 20px",
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.2em",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#988e90",
              marginBottom: "16px",
            }}
          >
            What They Say
          </span>
          <h3
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(24px, 3vw, 32px)",
              lineHeight: 1.3,
              letterSpacing: "0.05em",
              fontWeight: 600,
              color: "#e3e2e2",
              marginBottom: "64px",
            }}
          >
            Built to Last. Loved for Life.
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              width: "100%",
              maxWidth: "1100px",
              textAlign: "left",
            }}
          >
            {[
              {
                quote:
                  "The most refined wallet I've ever owned. Three years in and it still looks perfect — the leather has just grown more character.",
                name: "Marcus T.",
                title: "Architect, New York",
              },
              {
                quote:
                  "Impossibly thin. I genuinely forget it's there until I need it. The RFID protection is seamless — no awkward bulk or visible layers.",
                name: "James R.",
                title: "Creative Director, London",
              },
              {
                quote:
                  "I've had cheaper wallets fall apart in six months. This one feels like an heirloom. The craftsmanship is in a completely different league.",
                name: "David K.",
                title: "Product Designer, Berlin",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  backgroundColor: "#1f2020",
                  border: "1px solid #343535",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    color: "#c6c6c6",
                  }}
                >
                  {[...Array(5)].map((_, si) => (
                    <span key={si} style={{ fontSize: "14px" }}>★</span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: "#cfc4c5",
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#e3e2e2",
                      marginBottom: "2px",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      color: "#988e90",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {t.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section
          className="reveal"
          style={{
            backgroundColor: "#0d0e0f",
            borderTop: "1px solid #343535",
            padding: "120px 20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.2em",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#988e90",
              marginBottom: "16px",
            }}
          >
            The Collection
          </span>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              color: "#e3e2e2",
              marginBottom: "24px",
              maxWidth: "700px",
            }}
          >
            Carry Less. Live More.
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#cfc4c5",
              marginBottom: "40px",
              maxWidth: "480px",
            }}
          >
            Discover the complete ESTATE range — each piece designed with
            singular purpose and uncompromising precision.
          </p>
          <button
            className="btn-lift"
            onClick={() => router.push("/shop")}
            style={{
              backgroundColor: "#e3e2e2",
              color: "#121414",
              padding: "16px 48px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.2em",
              fontWeight: 600,
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            Shop All Wallets
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#0d0e0f",
          borderTop: "1px solid #343535",
          padding: "48px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            <div>
              <button
                onClick={() => router.push("/")}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "24px",
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                  color: "#e3e2e2",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginBottom: "12px",
                  display: "block",
                }}
              >
                ESTATE
              </button>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#988e90",
                  maxWidth: "280px",
                  lineHeight: 1.6,
                }}
              >
                The art of essentialism. Premium leather goods for the
                discerning modern man.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "48px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#e3e2e2",
                    marginBottom: "16px",
                  }}
                >
                  Shop
                </p>
                {["All Wallets", "Bifolds", "Card Holders", "New Arrivals"].map(
                  (link) => (
                    <button
                      key={link}
                      onClick={() => router.push("/shop")}
                      style={{
                        display: "block",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        color: "#988e90",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0 0 8px 0",
                        textAlign: "left",
                        transition: "color 0.3s",
                      }}
                      onMouseOver={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "#c6c6c6")
                      }
                      onMouseOut={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "#988e90")
                      }
                    >
                      {link}
                    </button>
                  )
                )}
              </div>

              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#e3e2e2",
                    marginBottom: "16px",
                  }}
                >
                  Company
                </p>
                {["Our Story", "Craftsmanship", "Sustainability", "Contact"].map(
                  (link) => (
                    <button
                      key={link}
                      onClick={() => router.push("/")}
                      style={{
                        display: "block",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        color: "#988e90",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0 0 8px 0",
                        textAlign: "left",
                        transition: "color 0.3s",
                      }}
                      onMouseOver={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "#c6c6c6")
                      }
                      onMouseOut={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "#988e90")
                      }
                    >
                      {link}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #343535",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: "#988e90",
                letterSpacing: "0.05em",
              }}
            >
              © 2024 ESTATE. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: "#4c4546",
                letterSpacing: "0.05em",
              }}
            >
              Crafted with precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}