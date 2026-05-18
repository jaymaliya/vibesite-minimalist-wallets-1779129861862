"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef } from "react";

const products = [
  {
    id: "core-wallet",
    name: "The Core Wallet",
    subtitle: "Obsidian Leather",
    price: 125,
    tag: "BESTSELLER",
    color: "Obsidian",
    material: "Leather",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCReklqRufNVrjUaMQYSUSDrUc11NQItCZ3H3jpBIMJEpOMycZCTBos9v5eldQ551OdyvZSPC9hS0QRVC29WaEwMOzVlvp4CGuZKkWZ4pLSMe9bxkgy68IPanD5DPNrQy7HDMyWkLwHUzVXnkxawJOAstTF-NpvxO1jrhzXDCsm-q-iLX2pAUK7qf2yz4gh-MkccxVyEDZDYpI6tkMTcZgNyhsZp3JJ1bkTW4AifbKKIGa2fb5SVE_yK07asM_7F3QQO3NZ99W0oJS3",
    imageHover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZCRwD_kg3e-0dkEcI4s5WY0kWV9JHicGlOJ-lxC3bYs_nKztO5RglzbfSjzR7IH6G7dwva1TRiwLQ8c8lVx73VufQpcAJHLDLvQC2iu1lqqOAUKNQQtepZKKgzZ1EoFOcyEsQt9bK9ic-bgzE7z7wlIgixPhCWJMYKaX6XPH6rmjpjCDWs2uj297196nKah8Vzl82ziV3muUL667nkj_FOD_mOeL093t8AhqEck8rmx5NBRplpzsImilUTL-91BqddHukEJ6_CFzN",
  },
  {
    id: "shield-wallet",
    name: "The Shield Wallet",
    subtitle: "Charcoal Leather",
    price: 145,
    tag: "RFID BLOCKING",
    color: "Charcoal",
    material: "Metal",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxd2mIDP755SUG3R9lrHv6cLKk52-qJSwFelrkErpy1KzYJVkgHgUx01eCLnRCvyu3ITBd0zGlV1TUA3Nszyuw_B4gjVTGVigvIMt2WT8nSImOaO2XQWDjsj9BR_zbVcr77WOdU_QFinPUKQ32fxlHdteR0KhIm2G9kD7S4Y1vENjHaiV6rl-7yxtFHmFkwS3mBphtt2UJPhOi6nejcMnZu7EKp-RMW318I0_suy7ShenZKMznDu8GM5KiEBouXUzpI_liyRLIBWM9",
    imageHover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxd2mIDP755SUG3R9lrHv6cLKk52-qJSwFelrkErpy1KzYJVkgHgUx01eCLnRCvyu3ITBd0zGlV1TUA3Nszyuw_B4gjVTGVigvIMt2WT8nSImOaO2XQWDjsj9BR_zbVcr77WOdU_QFinPUKQ32fxlHdteR0KhIm2G9kD7S4Y1vENjHaiV6rl-7yxtFHmFkwS3mBphtt2UJPhOi6nejcMnZu7EKp-RMW318I0_suy7ShenZKMznDu8GM5KiEBouXUzpI_liyRLIBWM9",
  },
  {
    id: "card-carrier",
    name: "The Card Carrier",
    subtitle: "Slate Leather",
    price: 95,
    tag: "NEW",
    color: "Slate",
    material: "Leather",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCReklqRufNVrjUaMQYSUSDrUc11NQItCZ3H3jpBIMJEpOMycZCTBos9v5eldQ551OdyvZSPC9hS0QRVC29WaEwMOzVlvp4CGuZKkWZ4pLSMe9bxkgy68IPanD5DPNrQy7HDMyWkLwHUzVXnkxawJOAstTF-NpvxO1jrhzXDCsm-q-iLX2pAUK7qf2yz4gh-MkccxVyEDZDYpI6tkMTcZgNyhsZp3JJ1bkTW4AifbKKIGa2fb5SVE_yK07asM_7F3QQO3NZ99W0oJS3",
    imageHover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZCRwD_kg3e-0dkEcI4s5WY0kWV9JHicGlOJ-lxC3bYs_nKztO5RglzbfSjzR7IH6G7dwva1TRiwLQ8c8lVx73VufQpcAJHLDLvQC2iu1lqqOAUKNQQtepZKKgzZ1EoFOcyEsQt9bK9ic-bgzE7z7wlIgixPhCWJMYKaX6XPH6rmjpjCDWs2uj297196nKah8Vzl82ziV3muUL667nkj_FOD_mOeL093t8AhqEck8rmx5NBRplpzsImilUTL-91BqddHukEJ6_CFzN",
  },
  {
    id: "slim-bifold",
    name: "The Slim Bifold",
    subtitle: "Obsidian Leather",
    price: 115,
    tag: "BESTSELLER",
    color: "Obsidian",
    material: "Leather",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZCRwD_kg3e-0dkEcI4s5WY0kWV9JHicGlOJ-lxC3bYs_nKztO5RglzbfSjzR7IH6G7dwva1TRiwLQ8c8lVx73VufQpcAJHLDLvQC2iu1lqqOAUKNQQtepZKKgzZ1EoFOcyEsQt9bK9ic-bgzE7z7wlIgixPhCWJMYKaX6XPH6rmjpjCDWs2uj297196nKah8Vzl82ziV3muUL667nkj_FOD_mOeL093t8AhqEck8rmx5NBRplpzsImilUTL-91BqddHukEJ6_CFzN",
    imageHover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCReklqRufNVrjUaMQYSUSDrUc11NQItCZ3H3jpBIMJEpOMycZCTBos9v5eldQ551OdyvZSPC9hS0QRVC29WaEwMOzVlvp4CGuZKkWZ4pLSMe9bxkgy68IPanD5DPNrQy7HDMyWkLwHUzVXnkxawJOAstTF-NpvxO1jrhzXDCsm-q-iLX2pAUK7qf2yz4gh-MkccxVyEDZDYpI6tkMTcZgNyhsZp3JJ1bkTW4AifbKKIGa2fb5SVE_yK07asM_7F3QQO3NZ99W0oJS3",
  },
  {
    id: "metal-clip",
    name: "The Metal Clip",
    subtitle: "Gunmetal",
    price: 135,
    tag: "RFID BLOCKING",
    color: "Charcoal",
    material: "Metal",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxd2mIDP755SUG3R9lrHv6cLKk52-qJSwFelrkErpy1KzYJVkgHgUx01eCLnRCvyu3ITBd0zGlV1TUA3Nszyuw_B4gjVTGVigvIMt2WT8nSImOaO2XQWDjsj9BR_zbVcr77WOdU_QFinPUKQ32fxlHdteR0KhIm2G9kD7S4Y1vENjHaiV6rl-7yxtFHmFkwS3mBphtt2UJPhOi6nejcMnZu7EKp-RMW318I0_suy7ShenZKMznDu8GM5KiEBouXUzpI_liyRLIBWM9",
    imageHover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCReklqRufNVrjUaMQYSUSDrUc11NQItCZ3H3jpBIMJEpOMycZCTBos9v5eldQ551OdyvZSPC9hS0QRVC29WaEwMOzVlvp4CGuZKkWZ4pLSMe9bxkgy68IPanD5DPNrQy7HDMyWkLwHUzVXnkxawJOAstTF-NpvxO1jrhzXDCsm-q-iLX2pAUK7qf2yz4gh-MkccxVyEDZDYpI6tkMTcZgNyhsZp3JJ1bkTW4AifbKKIGa2fb5SVE_yK07asM_7F3QQO3NZ99W0oJS3",
  },
  {
    id: "note-holder",
    name: "The Note Holder",
    subtitle: "Slate Leather",
    price: 105,
    tag: "NEW",
    color: "Slate",
    material: "Leather",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCReklqRufNVrjUaMQYSUSDrUc11NQItCZ3H3jpBIMJEpOMycZCTBos9v5eldQ551OdyvZSPC9hS0QRVC29WaEwMOzVlvp4CGuZKkWZ4pLSMe9bxkgy68IPanD5DPNrQy7HDMyWkLwHUzVXnkxawJOAstTF-NpvxO1jrhzXDCsm-q-iLX2pAUK7qf2yz4gh-MkccxVyEDZDYpI6tkMTcZgNyhsZp3JJ1bkTW4AifbKKIGa2fb5SVE_yK07asM_7F3QQO3NZ99W0oJS3",
    imageHover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZCRwD_kg3e-0dkEcI4s5WY0kWV9JHicGlOJ-lxC3bYs_nKztO5RglzbfSjzR7IH6G7dwva1TRiwLQ8c8lVx73VufQpcAJHLDLvQC2iu1lqqOAUKNQQtepZKKgzZ1EoFOcyEsQt9bK9ic-bgzE7z7wlIgixPhCWJMYKaX6XPH6rmjpjCDWs2uj297196nKah8Vzl82ziV3muUL667nkj_FOD_mOeL093t8AhqEck8rmx5NBRplpzsImilUTL-91BqddHukEJ6_CFzN",
  },
];

const ALL_MATERIALS = ["All", "Leather", "Metal"];
const ALL_COLORS = ["All", "Obsidian", "Charcoal", "Slate"];

export default function ShopPage() {
  const router = useRouter();
  const { addItem, totalItems } = useCart();
  const [activeMaterial, setActiveMaterial] = useState("All");
  const [activeColor, setActiveColor] = useState("All");
  const [addedStates, setAddedStates] = useState<Record<string, boolean>>({});
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const filteredProducts = products.filter((p) => {
    const materialMatch = activeMaterial === "All" || p.material === activeMaterial;
    const colorMatch = activeColor === "All" || p.color === activeColor;
    return materialMatch && colorMatch;
  });

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      color: product.color,
      image: product.image,
    });
    setAddedStates((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedStates((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Montserrat:wght@600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .page-enter {
          animation: pageEnter 0.6s ease forwards;
        }
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-enter {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .card-enter.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
        }
        .btn-lift {
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .btn-lift:hover {
          transform: translateY(-2px);
        }
        .hover-show { opacity: 0; transition: opacity 0.3s ease; }
        .hover-hide { transition: opacity 0.3s ease; }
        .product-img-wrapper:hover .hover-show { opacity: 1; }
        .product-img-wrapper:hover .hover-hide { opacity: 0; }
        .product-img-wrapper:hover .img-zoom { transform: scale(1.06); }
        .img-zoom { transition: transform 0.5s ease; }
        .quick-add-overlay {
          transform: translateY(100%);
          transition: transform 0.3s ease-in-out;
        }
        .product-img-wrapper:hover .quick-add-overlay {
          transform: translateY(0);
        }
        .filter-btn {
          transition: all 0.2s ease;
        }
        input[type="checkbox"]:checked {
          accent-color: #c6c6c6;
        }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          display: inline-block;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          font-feature-settings: 'liga';
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
      <div
        className="page-enter bg-[#121414] text-[#e3e2e2] min-h-screen flex flex-col antialiased"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Nav */}
        <nav
          className="w-full sticky top-0 z-50 bg-[#121414] border-b border-[#343535] h-20"
        >
          <div className="flex justify-between items-center w-full px-5 md:px-16 h-full max-w-[1440px] mx-auto">
            <div className="flex items-center gap-8">
              <button
                onClick={() => router.push("/")}
                className="font-bold tracking-tighter text-[#e3e2e2] text-3xl md:text-5xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.02em" }}
              >
                ESTATE
              </button>
              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => router.push("/shop")}
                  className="text-[#c6c6c6] font-bold border-b-2 border-[#c6c6c6] pb-1 hover:text-[#c6c6c6] transition-colors duration-300 text-base"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Shop
                </button>
                <button
                  className="text-[#cfc4c5] font-medium hover:text-[#c6c6c6] transition-colors duration-300 text-base"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  onClick={() => router.push("/")}
                >
                  Our Story
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/checkout")}
                className="text-[#e3e2e2] hover:text-[#c6c6c6] transition-colors relative"
                aria-label="Cart"
              >
                <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: "24px" }}>
                  shopping_bag
                </span>
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-[#c6c6c6] text-[#121414] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Main */}
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-16 py-12 md:py-[120px]">
          {/* Header */}
          <header className="mb-16">
            <h1
              className="text-[40px] md:text-[64px] text-[#e3e2e2] mb-4 font-bold"
              style={{ fontFamily: "Montserrat, sans-serif", lineHeight: "1.1", letterSpacing: "-0.02em" }}
            >
              The Collection.
            </h1>
            <p
              className="text-[18px] text-[#cfc4c5] max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6", letterSpacing: "0.01em" }}
            >
              Essential forms, engineered for endurance. Explore our curated selection of minimalist carry goods.
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0 mb-12 md:mb-0">
              <div className="md:sticky md:top-28 space-y-10">
                {/* Material Filter */}
                <div>
                  <h3
                    className="text-[#e3e2e2] mb-6 tracking-widest text-[12px] font-semibold"
                    style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.2em" }}
                  >
                    MATERIAL
                  </h3>
                  <ul className="space-y-4">
                    {["All", "Leather", "Metal"].map((mat) => (
                      <li key={mat}>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={activeMaterial === mat}
                            onChange={() => setActiveMaterial(mat)}
                            className="w-4 h-4 bg-transparent border-[#988e90] rounded-none cursor-pointer"
                            style={{ accentColor: "#c6c6c6" }}
                          />
                          <span
                            className={`text-[16px] group-hover:text-[#c6c6c6] transition-colors ${
                              activeMaterial === mat ? "text-[#e3e2e2]" : "text-[#cfc4c5]"
                            }`}
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {mat}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-px w-full bg-[#343535]"></div>
                {/* Color Filter */}
                <div>
                  <h3
                    className="text-[#e3e2e2] mb-6 tracking-widest text-[12px] font-semibold"
                    style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.2em" }}
                  >
                    COLOR
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { label: "All", bg: "transparent", border: "#988e90" },
                      { label: "Obsidian", bg: "#000000", border: "#343535" },
                      { label: "Charcoal", bg: "#1A1A1A", border: "#343535" },
                      { label: "Slate", bg: "#262626", border: "#343535" },
                    ].map((c) => (
                      <li key={c.label}>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={activeColor === c.label}
                            onChange={() => setActiveColor(c.label)}
                            className="w-4 h-4 bg-transparent rounded-none cursor-pointer"
                            style={{ accentColor: "#c6c6c6" }}
                          />
                          {c.label !== "All" && (
                            <span
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
                            ></span>
                          )}
                          <span
                            className={`text-[16px] group-hover:text-[#c6c6c6] transition-colors ${
                              activeColor === c.label ? "text-[#e3e2e2]" : "text-[#cfc4c5]"
                            }`}
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {c.label}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Filter Buttons */}
                <div>
                  <h3
                    className="text-[#e3e2e2] mb-6 tracking-widest text-[12px] font-semibold"
                    style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.2em" }}
                  >
                    QUICK FILTER
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Leather", "Metal"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveMaterial(f)}
                        className="filter-btn px-3 py-2 text-[12px] font-semibold tracking-widest border transition-all"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          letterSpacing: "0.2em",
                          backgroundColor: activeMaterial === f ? "#c6c6c6" : "transparent",
                          color: activeMaterial === f ? "#121414" : "#cfc4c5",
                          borderColor: activeMaterial === f ? "#c6c6c6" : "#343535",
                        }}
                      >
                        {f.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <p
                    className="text-[#cfc4c5] text-[18px] mb-6"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    No products match your filters.
                  </p>
                  <button
                    onClick={() => {
                      setActiveMaterial("All");
                      setActiveColor("All");
                    }}
                    className="btn-lift px-6 py-3 border border-[#c6c6c6] text-[#c6c6c6] text-[12px] font-semibold tracking-widest hover:bg-[#c6c6c6] hover:text-[#121414] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.2em" }}
                  >
                    CLEAR FILTERS
                  </button>
                </div>
              ) : (
                <div
                  className="grid gap-x-6 gap-y-16"
                  style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  }}
                >
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      ref={(el) => { cardRefs.current[index] = el; }}
                      className={`card-hover card-enter group relative flex flex-col ${visibleCards.has(index) ? "visible" : ""}`}
                      style={{ transitionDelay: `${index * 80}ms` }}
                    >
                      {/* Image Container */}
                      <div
                        className="product-img-wrapper relative w-full bg-[#1A1A1A] overflow-hidden mb-6 cursor-pointer"
                        style={{ aspectRatio: "4/5" }}
                        onClick={() => router.push("/product")}
                      >
                        {/* Tag */}
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                          <span
                            className="bg-[#262626] text-[#F9F9F9] px-2 py-1 text-[10px] font-semibold tracking-widest"
                            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.2em" }}
                          >
                            {product.tag}
                          </span>
                        </div>

                        {/* Exterior image */}
                        <img
                          alt={`${product.name} - Exterior`}
                          className="img-zoom absolute inset-0 w-full h-full object-cover hover-hide"
                          src={product.image}
                        />
                        {/* Interior / hover image */}
                        <img
                          alt={`${product.name} - Interior`}
                          className="img-zoom absolute inset-0 w-full h-full object-cover hover-show"
                          src={product.imageHover}
                        />

                        {/* Quick Add Overlay */}
                        <div className="quick-add-overlay absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <button
                            className="btn-lift w-full bg-[#F9F9F9] text-black text-[12px] font-semibold py-4 tracking-widest hover:bg-white transition-colors"
                            style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.2em" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          >
                            {addedStates[product.id] ? "ADDED ✓" : `ADD TO CART — $${product.price}`}
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h2
                            className="text-[24px] font-semibold text-[#e3e2e2] mb-1"
                            style={{ fontFamily: "Montserrat, sans-serif", lineHeight: "1.4", letterSpacing: "0.05em" }}
                          >
                            {product.name}
                          </h2>
                          <p
                            className="text-[16px] text-[#cfc4c5]"
                            style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
                          >
                            {product.subtitle}
                          </p>
                        </div>
                        <span
                          className="text-[18px] text-[#e3e2e2]"
                          style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6", letterSpacing: "0.01em" }}
                        >
                          ${product.price}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="btn-lift flex-1 py-3 border border-[#343535] text-[12px] font-semibold tracking-widest hover:border-[#c6c6c6] hover:text-[#c6c6c6] transition-colors"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            letterSpacing: "0.2em",
                            backgroundColor: addedStates[product.id] ? "#c6c6c6" : "transparent",
                            color: addedStates[product.id] ? "#121414" : "#cfc4c5",
                            borderColor: addedStates[product.id] ? "#c6c6c6" : "#343535",
                          }}
                        >
                          {addedStates[product.id] ? "ADDED ✓" : "ADD TO CART"}
                        </button>
                        <button
                          onClick={() => router.push("/product")}
                          className="btn-lift px-4 py-3 border border-[#343535] text-[12px] font-semibold tracking-widest hover:border-[#c6c6c6] hover:text-[#c6c6c6] transition-colors text-[#cfc4c5]"
                          style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.2em" }}
                        >
                          VIEW
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#343535] py-12 px-5 md:px-16">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <button
              onClick={() => router.push("/")}
              className="font-bold text-[#e3e2e2] text-2xl tracking-tighter hover:opacity-80 transition-opacity"
              style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.02em" }}
            >
              ESTATE
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <button
                onClick={() => router.push("/shop")}
                className="text-[14px] text-[#cfc4c5] hover:text-[#c6c6c6] transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Shop
              </button>
              <button
                onClick={() => router.push("/")}
                className="text-[14px] text-[#cfc4c5] hover:text-[#c6c6c6] transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Our Story
              </button>
              <button
                onClick={() => router.push("/checkout")}
                className="text-[14px] text-[#cfc4c5] hover:text-[#c6c6c6] transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Cart
              </button>
            </div>
            <p
              className="text-[12px] text-[#988e90]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              © 2024 Estate Leather. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}