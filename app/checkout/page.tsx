"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, removeItem, clearCart, totalItems, totalPrice } = useCart();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const shippingCost = totalPrice > 500 ? 0 : 99;
  const finalTotal = totalPrice + shippingCost;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.zip.trim()) newErrors.zip = "PIN code is required";
    else if (!/^\d{6}$/.test(form.zip)) newErrors.zip = "Enter a valid 6-digit PIN code";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "phone" && !/^\d*$/.test(value)) return;
    if (id === "zip" && !/^\d*$/.test(value)) return;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal }),
      });
      const order = await res.json();
      if (order && order.amount) {
        const options = {
          key: "rzp_test_",
          amount: order.amount,
          currency: "INR",
          name: "Minimalist Wallets",
          description: "Order Payment",
          handler: function (response: any) {
            clearCart();
            router.push("/");
          },
          prefill: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            contact: form.phone,
          },
          theme: { color: "#c6c6c6" },
        };
        const win = window as any;
        if (win.Razorpay) {
          const rzp = new win.Razorpay(options);
          rzp.open();
        } else {
          clearCart();
          router.push("/");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    background: "transparent",
    border: "none",
    borderBottom: errors[field]
      ? "1px solid #ffb4ab"
      : "1px solid rgba(249, 249, 249, 0.3)",
    borderRadius: 0,
    color: "#e3e2e2",
    padding: "8px 0",
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    width: "100%",
    outline: "none",
  });

  if (items.length === 0) {
    return (
      <div
        className="page-enter bg-[#121414] text-[#e3e2e2] min-h-screen flex flex-col"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Montserrat:wght@600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
          .page-enter { animation: fadeIn 0.5s ease forwards; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
          .btn-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
          .btn-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
          input:focus { border-bottom: 1px solid rgba(249,249,249,1) !important; }
        `}</style>
        <header className="bg-[#121414] border-b border-[#343535] w-full sticky top-0 z-50">
          <div className="flex justify-between items-center w-full px-5 md:px-16 h-20 max-w-[1440px] mx-auto">
            <div
              className="text-[40px] md:text-[64px] font-bold tracking-tighter text-[#e3e2e2] cursor-pointer"
              style={{ fontFamily: "'Montserrat', sans-serif", lineHeight: 1.1 }}
              onClick={() => router.push("/")}
            >
              ESTATE
            </div>
            <div className="flex items-center space-x-2 text-[#cfc4c5]" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>lock</span>
              <span>SECURE CHECKOUT</span>
            </div>
          </div>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center text-center px-5">
          <span className="material-symbols-outlined text-[#988e90] mb-6" style={{ fontSize: "64px" }}>shopping_bag</span>
          <h2 className="text-[#e3e2e2] mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "24px", fontWeight: 600, letterSpacing: "0.05em" }}>Your cart is empty</h2>
          <p className="text-[#cfc4c5] mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}>Add some items to your cart before checking out.</p>
          <button
            className="btn-lift bg-[#c6c6c6] text-[#303030] px-8 py-4 font-semibold"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.2em" }}
            onClick={() => router.push("/shop")}
          >
            START SHOPPING
          </button>
        </main>
      </div>
    );
  }

  return (
    <div
      className="page-enter bg-[#121414] text-[#e3e2e2] min-h-screen flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Montserrat:wght@600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .page-enter { animation: fadeIn 0.5s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .btn-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .btn-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        .card-hover { transition: border-color 0.2s ease; }
        .card-hover:hover { border-color: #343535 !important; }
        input[type="radio"] {
          appearance: none;
          background-color: transparent;
          margin: 0;
          color: currentColor;
          width: 1.15em;
          height: 1.15em;
          border: 1px solid #988e90;
          border-radius: 50%;
          display: grid;
          place-content: center;
        }
        input[type="radio"]::before {
          content: "";
          width: 0.65em;
          height: 0.65em;
          border-radius: 50%;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em #c6c6c6;
        }
        input[type="radio"]:checked::before { transform: scale(1); }
        input[type="radio"]:focus { outline: max(2px, 0.15em) solid #c6c6c6; outline-offset: max(2px, 0.15em); }
        .checkout-input:focus { border-bottom: 1px solid rgba(249,249,249,1) !important; outline: none !important; box-shadow: none !important; }
        .checkout-input::placeholder { color: #767575; }
      `}</style>

      {/* Header */}
      <header className="bg-[#121414] border-b border-[#343535] w-full sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-5 md:px-16 h-20 max-w-[1440px] mx-auto">
          <div
            className="text-[40px] md:text-[64px] font-bold tracking-tighter text-[#e3e2e2] cursor-pointer"
            style={{ fontFamily: "'Montserrat', sans-serif", lineHeight: 1.1 }}
            onClick={() => router.push("/")}
          >
            ESTATE
          </div>
          <div className="flex items-center space-x-2 text-[#cfc4c5]" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>lock</span>
            <span>SECURE CHECKOUT</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-16 py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-12">

            {/* Contact Information */}
            <section>
              <h2 className="text-[#e3e2e2] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "24px", fontWeight: 600, letterSpacing: "0.05em", lineHeight: 1.4 }}>
                Contact Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[#cfc4c5] mb-2" htmlFor="email" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    className="checkout-input"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle("email")}
                  />
                  {errors.email && <p style={{ color: "#ffb4ab", fontSize: "12px", marginTop: "4px", fontFamily: "'Inter', sans-serif" }}>{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-[#cfc4c5] mb-2" htmlFor="phone" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                    PHONE NUMBER
                  </label>
                  <input
                    className="checkout-input"
                    id="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                    style={inputStyle("phone")}
                  />
                  {errors.phone && <p style={{ color: "#ffb4ab", fontSize: "12px", marginTop: "4px", fontFamily: "'Inter', sans-serif" }}>{errors.phone}</p>}
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-[#e3e2e2] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "24px", fontWeight: 600, letterSpacing: "0.05em", lineHeight: 1.4 }}>
                Shipping Address
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#cfc4c5] mb-2" htmlFor="firstName" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                      FIRST NAME
                    </label>
                    <input
                      className="checkout-input"
                      id="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      style={inputStyle("firstName")}
                    />
                    {errors.firstName && <p style={{ color: "#ffb4ab", fontSize: "12px", marginTop: "4px", fontFamily: "'Inter', sans-serif" }}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-[#cfc4c5] mb-2" htmlFor="lastName" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                      LAST NAME
                    </label>
                    <input
                      className="checkout-input"
                      id="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      style={inputStyle("lastName")}
                    />
                    {errors.lastName && <p style={{ color: "#ffb4ab", fontSize: "12px", marginTop: "4px", fontFamily: "'Inter', sans-serif" }}>{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[#cfc4c5] mb-2" htmlFor="address" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                    ADDRESS
                  </label>
                  <input
                    className="checkout-input"
                    id="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    style={inputStyle("address")}
                  />
                  {errors.address && <p style={{ color: "#ffb4ab", fontSize: "12px", marginTop: "4px", fontFamily: "'Inter', sans-serif" }}>{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block text-[#cfc4c5] mb-2" htmlFor="city" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                      CITY
                    </label>
                    <input
                      className="checkout-input"
                      id="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      style={inputStyle("city")}
                    />
                    {errors.city && <p style={{ color: "#ffb4ab", fontSize: "12px", marginTop: "4px", fontFamily: "'Inter', sans-serif" }}>{errors.city}</p>}
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[#cfc4c5] mb-2" htmlFor="state" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                      STATE / PROVINCE
                    </label>
                    <input
                      className="checkout-input"
                      id="state"
                      type="text"
                      value={form.state}
                      onChange={handleChange}
                      style={inputStyle("state")}
                    />
                    {errors.state && <p style={{ color: "#ffb4ab", fontSize: "12px", marginTop: "4px", fontFamily: "'Inter', sans-serif" }}>{errors.state}</p>}
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-[#cfc4c5] mb-2" htmlFor="zip" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                      ZIP / POSTAL CODE
                    </label>
                    <input
                      className="checkout-input"
                      id="zip"
                      type="text"
                      placeholder="6-digit PIN"
                      value={form.zip}
                      onChange={handleChange}
                      maxLength={6}
                      style={inputStyle("zip")}
                    />
                    {errors.zip && <p style={{ color: "#ffb4ab", fontSize: "12px", marginTop: "4px", fontFamily: "'Inter', sans-serif" }}>{errors.zip}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-[#e3e2e2] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "24px", fontWeight: 600, letterSpacing: "0.05em", lineHeight: 1.4 }}>
                Payment
              </h2>
              <div className="space-y-4">
                {/* Razorpay Option */}
                <div
                  className="card-hover p-6 border border-transparent cursor-pointer"
                  style={{ backgroundColor: "#1A1A1A", transition: "border-color 0.2s" }}
                  onClick={() => setPaymentMethod("razorpay")}
                >
                  <label className="flex items-center w-full cursor-pointer">
                    <input
                      className="mr-4"
                      name="paymentMethod"
                      type="radio"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                    />
                    <span className="text-[#e3e2e2] font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}>
                      Pay via Razorpay
                    </span>
                    <div className="ml-auto flex space-x-2">
                      <span className="material-symbols-outlined text-[#cfc4c5]">payments</span>
                    </div>
                  </label>
                  {paymentMethod === "razorpay" && (
                    <div className="mt-4">
                      <p className="text-[#988e90]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
                        You will be redirected to Razorpay's secure payment gateway to complete your purchase.
                      </p>
                    </div>
                  )}
                </div>

                {/* Credit Card Option */}
                <div
                  className="card-hover p-6 border border-transparent cursor-pointer"
                  style={{ backgroundColor: "#1A1A1A", transition: "border-color 0.2s", opacity: 0.7 }}
                  onClick={() => setPaymentMethod("creditCard")}
                >
                  <label className="flex items-center w-full cursor-pointer">
                    <input
                      className="mr-4"
                      name="paymentMethod"
                      type="radio"
                      value="creditCard"
                      checked={paymentMethod === "creditCard"}
                      onChange={() => setPaymentMethod("creditCard")}
                    />
                    <span className="text-[#e3e2e2] font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}>
                      Credit Card
                    </span>
                    <div className="ml-auto flex space-x-2">
                      <span className="material-symbols-outlined text-[#cfc4c5]">credit_card</span>
                    </div>
                  </label>
                  {paymentMethod === "creditCard" && (
                    <div className="mt-6 space-y-6">
                      <div>
                        <label className="block text-[#cfc4c5] mb-2" htmlFor="cardNumber" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                          CARD NUMBER
                        </label>
                        <input
                          className="checkout-input"
                          id="cardNumber"
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          style={inputStyle("cardNumber")}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[#cfc4c5] mb-2" htmlFor="expDate" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                            EXPIRATION (MM/YY)
                          </label>
                          <input
                            className="checkout-input"
                            id="expDate"
                            type="text"
                            placeholder="MM/YY"
                            style={inputStyle("expDate")}
                          />
                        </div>
                        <div>
                          <label className="block text-[#cfc4c5] mb-2" htmlFor="cvc" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                            SECURITY CODE
                          </label>
                          <input
                            className="checkout-input"
                            id="cvc"
                            type="text"
                            placeholder="CVC"
                            style={inputStyle("cvc")}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[#cfc4c5] mb-2" htmlFor="cardName" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em", fontFamily: "'Inter', sans-serif" }}>
                          NAME ON CARD
                        </label>
                        <input
                          className="checkout-input"
                          id="cardName"
                          type="text"
                          style={inputStyle("cardName")}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="p-8 sticky top-[100px]" style={{ backgroundColor: "#1A1A1A" }}>
              <h2 className="text-[#e3e2e2] mb-8" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "24px", fontWeight: 600, letterSpacing: "0.05em", lineHeight: 1.4 }}>
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border-b border-[#343535] pb-6">
                    <div className="w-20 h-24 bg-black flex-shrink-0 relative overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover opacity-90"
                        />
                      ) : (
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCX0bK8JN834SF1qgsicuma7_d4c15KE7I5uxXj5GeWnUHitZLSuZ0IsrLdt66mAnqAHc2jM2y0uLJH8J8Ib_sqtgvzPB-1oRt8UyV-2I4lSM7E_s9TUnpBEGFfoGLMHoGtKVdzOQH7Ugd6pOewgE26LBlhvn9s3fcHviMVqYurhtH2ovrUTSbPkex1EIE4CQNSm8BxtrrRHJdCqAIDt2r9Mj_NwrsjwpdkahGpBveQwmASd3TUaDR4skZ7Sh6rp8JNZ92lVacUR2C"
                          alt={item.name}
                          className="w-full h-full object-cover opacity-90"
                        />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-[#e3e2e2]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", lineHeight: 1.6 }}>
                        {item.name}
                      </h3>
                      {item.color && (
                        <p className="text-[#cfc4c5] mt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
                          {item.color}
                        </p>
                      )}
                      <div className="mt-2 inline-block px-2 py-1 text-[#F9F9F9] bg-[#262626]" style={{ fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-[#e3e2e2]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 border-b border-[#343535] pb-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#cfc4c5]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}>Subtotal</span>
                  <span className="text-[#e3e2e2] font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#cfc4c5]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}>Shipping</span>
                  <span className="text-[#e3e2e2] font-semibold" style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px" }}>
                    {shippingCost === 0 ? (
                      <span style={{ color: "#c6c6c6" }}>FREE</span>
                    ) : (
                      `₹${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shippingCost === 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[#c6c6c6]" style={{ fontSize: "16px" }}>check_circle</span>
                    <span className="text-[#988e90]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.05em" }}>Free shipping on orders over ₹500</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-[#e3e2e2]" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "24px", fontWeight: 600, letterSpacing: "0.05em" }}>Total</span>
                <span className="text-[#e3e2e2]" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "24px", fontWeight: 600 }}>₹{finalTotal.toFixed(2)}</span>
              </div>

              {/* Place Order Button */}
              <button
                className="btn-lift w-full bg-[#c6c6c6] text-[#303030] py-4 font-semibold"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.2em", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1 }}
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? "PROCESSING..." : "PLACE ORDER / PAY NOW"}
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center space-x-2 mt-6">
                <span className="material-symbols-outlined text-[#988e90]" style={{ fontSize: "16px" }}>lock</span>
                <span className="text-[#988e90]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.1em" }}>
                  Secured by 256-bit SSL encryption
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#343535] py-8 px-5 md:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div
            className="text-[#e3e2e2] text-xl font-bold tracking-tighter cursor-pointer"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            onClick={() => router.push("/")}
          >
            ESTATE
          </div>
          <div className="flex space-x-6">
            <span
              className="text-[#988e90] cursor-pointer hover:text-[#e3e2e2] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.15em" }}
              onClick={() => router.push("/")}
            >
              PRIVACY POLICY
            </span>
            <span
              className="text-[#988e90] cursor-pointer hover:text-[#e3e2e2] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.15em" }}
              onClick={() => router.push("/")}
            >
              TERMS OF SERVICE
            </span>
            <span
              className="text-[#988e90] cursor-pointer hover:text-[#e3e2e2] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.15em" }}
              onClick={() => router.push("/shop")}
            >
              RETURNS
            </span>
          </div>
          <p className="text-[#4c4546]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px" }}>
            © 2024 ESTATE LEATHER. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}