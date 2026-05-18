"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const currentYear = new Date().getFullYear();

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  const footerStyle: React.CSSProperties = {
    backgroundColor: "#0d0e0f",
    borderTop: "1px solid #343535",
    color: "#e3e2e2",
    fontFamily: "Inter, sans-serif",
    marginTop: "auto",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "64px 20px 32px",
  };

  const topGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "48px",
    marginBottom: "56px",
  };

  const brandColStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 700,
    fontSize: "28px",
    letterSpacing: "-0.02em",
    color: "#e3e2e2",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
  };

  const taglineStyle: React.CSSProperties = {
    fontSize: "14px",
    lineHeight: 1.7,
    color: "#767575",
    maxWidth: "260px",
    fontStyle: "italic",
    letterSpacing: "0.01em",
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#c6c6c6",
    marginBottom: "20px",
  };

  const linkStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    color: "#767575",
    textDecoration: "none",
    background: "none",
    border: "none",
    padding: "5px 0",
    cursor: "pointer",
    textAlign: "left",
    transition: "color 0.2s ease",
    letterSpacing: "0.01em",
  };

  const dividerStyle: React.CSSProperties = {
    borderTop: "1px solid #1f2020",
    marginTop: "0",
    marginBottom: "32px",
  };

  const bottomRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
  };

  const copyrightStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#4c4546",
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.01em",
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: "0",
    backgroundColor: "#1f2020",
    border: emailFocused ? "1px solid #767575" : "1px solid #343535",
    borderRadius: "4px 0 0 4px",
    padding: "10px 14px",
    color: "#e3e2e2",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const subscribeBtnStyle: React.CSSProperties = {
    backgroundColor: "#c6c6c6",
    color: "#121414",
    border: "none",
    borderRadius: "0 4px 4px 0",
    padding: "10px 18px",
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "13px",
    letterSpacing: "0.05em",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    transition: "background-color 0.2s ease",
  };

  const socialRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
    marginTop: "4px",
  };

  const socialBtnStyle: React.CSSProperties = {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "1px solid #343535",
    backgroundColor: "#1f2020",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
    fontSize: "17px",
    textDecoration: "none",
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Top Grid */}
        <div style={topGridStyle}>
          {/* Brand Column */}
          <div style={brandColStyle}>
            <button style={logoStyle} onClick={() => router.push("/")}>
              ESTATE
            </button>
            <p style={taglineStyle}>
              The Art of Essentialism. Premium black leather minimalist wallets
              crafted for the modern man.
            </p>
            {/* Social Icons */}
            <div style={socialRowStyle}>
              <SocialLink
                href="https://instagram.com"
                label="Instagram"
                style={socialBtnStyle}
              >
                <InstagramSVG />
              </SocialLink>
              <SocialLink
                href="https://twitter.com"
                label="Twitter / X"
                style={socialBtnStyle}
              >
                <TwitterSVG />
              </SocialLink>
              <SocialLink
                href="https://wa.me/"
                label="WhatsApp"
                style={socialBtnStyle}
              >
                <WhatsAppSVG />
              </SocialLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p style={sectionHeadingStyle}>Quick Links</p>
            <FooterLink
              onClick={() => router.push("/")}
              style={linkStyle}
            >
              Home
            </FooterLink>
            <FooterLink
              onClick={() => router.push("/shop")}
              style={linkStyle}
            >
              Shop
            </FooterLink>
            <FooterLink
              onClick={() => router.push("/our-story")}
              style={linkStyle}
            >
              Our Story
            </FooterLink>
            <FooterLink
              onClick={() => router.push("/contact")}
              style={linkStyle}
            >
              Contact
            </FooterLink>
            <FooterLink
              onClick={() => router.push("/checkout")}
              style={linkStyle}
            >
              Cart
            </FooterLink>
          </div>

          {/* Newsletter */}
          <div>
            <p style={sectionHeadingStyle}>Stay in the Know</p>
            <p
              style={{
                fontSize: "14px",
                color: "#767575",
                marginBottom: "16px",
                lineHeight: 1.6,
                letterSpacing: "0.01em",
              }}
            >
              New drops, craft stories, and exclusive offers — delivered
              sparingly.
            </p>
            {subscribed ? (
              <p
                style={{
                  fontSize: "14px",
                  color: "#c6c6c6",
                  fontWeight: 500,
                  padding: "10px 0",
                  letterSpacing: "0.01em",
                }}
              >
                ✓ You're on the list. Thank you.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                style={{ display: "flex", width: "100%", maxWidth: "340px" }}
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  style={inputStyle}
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  style={subscribeBtnStyle}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "#e3e2e2";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "#c6c6c6";
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={dividerStyle} />

        {/* Bottom Row */}
        <div style={bottomRowStyle}>
          <p style={copyrightStyle}>
            © {currentYear} ESTATE. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <FooterLink
              onClick={() => router.push("/privacy")}
              style={{ ...linkStyle, fontSize: "12px", color: "#4c4546" }}
            >
              Privacy Policy
            </FooterLink>
            <FooterLink
              onClick={() => router.push("/terms")}
              style={{ ...linkStyle, fontSize: "12px", color: "#4c4546" }}
            >
              Terms of Service
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- Internal helpers ---- */

function FooterLink({
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
      style={{ ...style, color: hovered ? "#c6c6c6" : style.color }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

function SocialLink({
  children,
  href,
  label,
  style,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  style: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        ...style,
        borderColor: hovered ? "#767575" : "#343535",
        backgroundColor: hovered ? "#292a2a" : "#1f2020",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

function InstagramSVG() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#767575"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="#767575" stroke="none" />
    </svg>
  );
}

function TwitterSVG() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="#767575"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.018 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function WhatsAppSVG() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="#767575"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}