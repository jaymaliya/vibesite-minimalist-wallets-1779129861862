"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [badgePop, setBadgePop] = useState(false);
  const prevTotalRef = useRef(totalItems);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (totalItems !== prevTotalRef.current) {
      setBadgePop(true);
      const t = setTimeout(() => setBadgePop(false), 350);
      prevTotalRef.current = totalItems;
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    width: "100%",
    backgroundColor: "rgba(18, 20, 20, 0.92)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid #343535",
    transition: "box-shadow 0.3s ease",
    boxShadow: scrolled
      ? "0 4px 24px 0 rgba(0,0,0,0.55)"
      : "none",
  };

  const innerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "0 20px",
    height: "80px",
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(22px, 4vw, 40px)",
    letterSpacing: "-0.02em",
    color: "#e3e2e2",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    lineHeight: 1,
    textDecoration: "none",
  };

  const linkBaseStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    color: "#cfc4c5",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 0",
    letterSpacing: "0.01em",
    textDecoration: "none",
    transition: "color 0.25s ease",
  };

  const desktopLinksStyle: React.CSSProperties = {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  };

  const cartBtnStyle: React.CSSProperties = {
    position: "relative",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#e3e2e2",
    display: "flex",
    alignItems: "center",
    padding: "4px",
    transition: "color 0.25s ease",
  };

  const badgeStyle: React.CSSProperties = {
    position: "absolute",
    top: "-4px",
    right: "-6px",
    minWidth: "18px",
    height: "18px",
    borderRadius: "9999px",
    backgroundColor: "#ffb4ab",
    color: "#121414",
    fontSize: "10px",
    fontWeight: 700,
    fontFamily: "Inter, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 3px",
    transform: badgePop ? "scale(1.4)" : "scale(1)",
    transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    pointerEvents: "none",
  };

  const hamburgerStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#e3e2e2",
    fontSize: "26px",
    lineHeight: 1,
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const mobileMenuStyle: React.CSSProperties = {
    overflow: "hidden",
    maxHeight: menuOpen ? "320px" : "0px",
    transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
    backgroundColor: "rgba(18, 20, 20, 0.97)",
    borderBottom: menuOpen ? "1px solid #343535" : "none",
  };

  const mobileLinkStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    color: "#cfc4c5",
    padding: "14px 20px",
    textDecoration: "none",
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    letterSpacing: "0.01em",
    transition: "color 0.2s ease, background 0.2s ease",
    borderBottom: "1px solid #1f2020",
  };

  const mobileViewCartStyle: React.CSSProperties = {
    ...mobileLinkStyle,
    color: "#c6c6c6",
    fontWeight: 600,
    borderBottom: "none",
  };

  function handleLogoClick() {
    setMenuOpen(false);
    router.push("/");
  }

  function handleShopClick() {
    setMenuOpen(false);
    router.push("/shop");
  }

  function handleStoryClick() {
    setMenuOpen(false);
    router.push("/our-story");
  }

  function handleCartClick() {
    setMenuOpen(false);
    router.push("/checkout");
  }

  return (
    <nav style={navStyle} role="navigation" aria-label="Main navigation">
      <div style={innerStyle}>
        {/* Logo */}
        <button
          style={logoStyle}
          onClick={handleLogoClick}
          aria-label="ESTATE home"
        >
          ESTATE
        </button>

        {/* Desktop Links */}
        <div
          style={desktopLinksStyle}
          className="hidden md:flex"
        >
          <NavLink style={linkBaseStyle} onClick={handleShopClick}>
            Shop
          </NavLink>
          <NavLink style={linkBaseStyle} onClick={handleStoryClick}>
            Our Story
          </NavLink>
        </div>

        {/* Right: Cart + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Cart Icon */}
          <button
            style={cartBtnStyle}
            onClick={handleCartClick}
            aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          >
            <CartSVG />
            {totalItems > 0 && (
              <span style={badgeStyle} aria-hidden="true">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            style={hamburgerStyle}
            className="flex md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle} aria-hidden={!menuOpen}>
        <div style={{ padding: "4px 0 8px" }}>
          <button style={mobileLinkStyle} onClick={handleShopClick}>
            Shop
          </button>
          <button style={mobileLinkStyle} onClick={handleStoryClick}>
            Our Story
          </button>
          <button style={mobileViewCartStyle} onClick={handleCartClick}>
            View Cart
            {totalItems > 0 && (
              <span
                style={{
                  marginLeft: "10px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "20px",
                  height: "20px",
                  borderRadius: "9999px",
                  backgroundColor: "#ffb4ab",
                  color: "#121414",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "0 4px",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ---- Internal helper components ---- */

function NavLink({
  children,
  onClick,
  style,
}: {
  children: React.ReactNode;
  onClick: () => void;
  style: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{
        ...style,
        color: hovered ? "#c6c6c6" : "#cfc4c5",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

function CartSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}