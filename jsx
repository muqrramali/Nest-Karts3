import { useState, useEffect, useRef, useCallback } from "react";

const PRODUCTS = [
  { id: 1, name: "Apple Vision Pro 2", price: 3499, originalPrice: 3999, image: "🥽", category: "Electronics", rating: 4.9, reviews: 2341, viewers: "120-300", sold: "80+", badge: "NEW", description: "Next-gen spatial computing with retina display and neural interface. Experience the future of work and play.", specs: ["M4 Ultra Chip", "4K per eye", "12hr battery", "EyeSight display"] },
  { id: 2, name: "iPhone 15 Pro Max", price: 1299, originalPrice: 1499, image: "📱", category: "Electronics", rating: 4.8, reviews: 5621, viewers: "150-250", sold: "120+", badge: "HOT", description: "Titanium design, 48MP ProRes camera, A17 Pro chip. Photography redefined.", specs: ["A17 Pro Chip", "48MP Main", "Titanium Frame", "USB-C Pro"] },
  { id: 3, name: "Samsung Galaxy S24 Ultra", price: 1199, originalPrice: 1399, image: "📲", category: "Electronics", rating: 4.7, reviews: 3890, viewers: "100-200", sold: "90+", badge: "SALE", description: "200MP camera, integrated S Pen, Galaxy AI features. Power meets precision.", specs: ["Snapdragon 8 Gen 3", "200MP Camera", "S Pen Pro", "5000mAh"] },
  { id: 4, name: "Tesla Cyberquad", price: 1900, originalPrice: 2200, image: "🏍️", category: "Wearables", rating: 4.6, reviews: 892, viewers: "80-150", sold: "40+", badge: "LIMITED", description: "Electric ATV built for adventure. Rugged design with Tesla efficiency.", specs: ["Electric Motor", "250km range", "Fast charge", "Off-road"] },
  { id: 5, name: "MacBook Pro M3", price: 1999, originalPrice: 2299, image: "💻", category: "Electronics", rating: 4.9, reviews: 4120, viewers: "130-280", sold: "110+", badge: "HOT", description: "M3 Max chip with ProRes video acceleration. The world's most powerful laptop.", specs: ["M3 Max Chip", "36GB RAM", "Liquid Retina XDR", "22hr battery"] },
  { id: 6, name: "Sony WH-1000XM5", price: 399, originalPrice: 499, image: "🎧", category: "Electronics", rating: 4.8, reviews: 6234, viewers: "100-220", sold: "60+", badge: "SALE", description: "Industry-leading noise cancellation with 30hr battery. Pure audio bliss.", specs: ["30hr battery", "ANC Pro", "Hi-Res Audio", "Multipoint"] },
  { id: 7, name: "DJI Mavic 3 Pro", price: 2199, originalPrice: 2599, image: "🚁", category: "Electronics", rating: 4.7, reviews: 1456, viewers: "60-120", sold: "35+", badge: "NEW", description: "Triple-camera drone with Hasselblad optics. Cinema in the sky.", specs: ["Hasselblad L", "43min flight", "15km range", "4K/120fps"] },
  { id: 8, name: "Apple Watch Ultra 2", price: 799, originalPrice: 899, image: "⌚", category: "Wearables", rating: 4.9, reviews: 3201, viewers: "90-180", sold: "75+", badge: "HOT", description: "Titanium case, precision GPS, 60hr battery. Built for extremes.", specs: ["S9 SiP", "60hr battery", "Titanium", "3m water"] },
  { id: 9, name: "Dyson V15 Detect", price: 749, originalPrice: 899, image: "🌀", category: "Appliances", rating: 4.6, reviews: 2890, viewers: "70-140", sold: "55+", badge: "SALE", description: "Laser dust detection, HEPA filtration, 60min runtime. Clean smarter.", specs: ["230AW suction", "Laser detect", "HEPA filter", "60min"] },
  { id: 10, name: "PlayStation 5 Pro", price: 699, originalPrice: 799, image: "🎮", category: "Gaming", rating: 4.8, reviews: 7821, viewers: "200-400", sold: "200+", badge: "HOT", description: "8K gaming, ray tracing, DualSense haptics. Play has no limits.", specs: ["AMD Zen 2", "8K gaming", "Ray Tracing", "825GB SSD"] },
  { id: 11, name: "Bose Smart Soundbar 900", price: 899, originalPrice: 1099, image: "🔊", category: "Electronics", rating: 4.7, reviews: 1823, viewers: "50-110", sold: "45+", badge: "NEW", description: "Dolby Atmos, spatial audio, voice control. Surround yourself in sound.", specs: ["Dolby Atmos", "11 channels", "Alexa+Google", "Wi-Fi 6"] },
  { id: 12, name: "Meta Quest 3", price: 499, originalPrice: 599, image: "🕶️", category: "Gaming", rating: 4.5, reviews: 4521, viewers: "80-160", sold: "85+", badge: "SALE", description: "Mixed reality headset with 4K display and hand tracking. Reality, reimagined.", specs: ["Snapdragon XR2", "4K pancake", "Hand track", "2.2hr"] },
];

const FLASH_PRODUCT = { name: "AirPods Max 2", image: "🎧", price: 449, originalPrice: 549, discount: 18, sold: 68 };

const PAKISTANI_ORDERS = [
  { name: "Ali Khan", city: "Islamabad", product: "Mini Chopper Pro", emoji: "🔪" },
  { name: "Sara Malik", city: "Karachi", product: "Juicer 2000W", emoji: "🥤" },
  { name: "Ahmed Raza", city: "Lahore", product: "Sony WH-1000XM5", emoji: "🎧" },
  { name: "Fatima Zahra", city: "Rawalpindi", product: "iPhone 15 Pro Max", emoji: "📱" },
  { name: "Hamza Bashir", city: "Faisalabad", product: "Apple Watch Ultra 2", emoji: "⌚" },
  { name: "Zara Hussain", city: "Peshawar", product: "MacBook Pro M3", emoji: "💻" },
  { name: "Omar Sheikh", city: "Multan", product: "DJI Mavic 3 Pro", emoji: "🚁" },
  { name: "Aisha Siddiqui", city: "Sialkot", product: "PS5 Pro", emoji: "🎮" },
];

const CATEGORIES = [
  { icon: "🏠", name: "Home", sub: "Smart living" },
  { icon: "📱", name: "Electronics", sub: "Cutting edge" },
  { icon: "⌚", name: "Wearables", sub: "On your body" },
  { icon: "🎮", name: "Gaming", sub: "Next level" },
  { icon: "🏠", name: "Appliances", sub: "Power tools" },
  { icon: "💡", name: "Smart Home", sub: "Connected" },
  { icon: "💄", name: "Beauty & Care", sub: "Glow up" },
  { icon: "👜", name: "Accessories", sub: "Style more" },
  { icon: "👗", name: "Fashion", sub: "Wear art" },
  { icon: "⚡", name: "Super Deals", sub: "Save big" },
];

const REVIEWS = [
  { name: "Ahmed Raza", avatar: "AR", rating: 5, text: "Amazing quality! NestKart never disappoints. The packaging is premium, delivery was super fast — literally 2 days!", verified: true, time: "2 days ago" },
  { name: "Sara Khan", avatar: "SK", rating: 5, text: "1000% recommended! Worth every rupee. The product is exactly as described, premium quality.", verified: true, time: "1 week ago" },
  { name: "Bilal Ahmad", avatar: "BA", rating: 5, text: "Best online store in Pakistan! Fast delivery, genuine products, and excellent customer service. 10/10", verified: true, time: "3 days ago" },
];

const LIVE_SHOPPING = [
  { name: "Ayesha from Lahore", product: "iPhone 15 Pro", emoji: "📱", time: "2 min ago" },
  { name: "Hamza from Karachi", product: "Gaming Chair", emoji: "🪑", time: "5 min ago" },
  { name: "Zain from Rawalpindi", product: "Smart Watch", emoji: "⌚", time: "7 min ago" },
  { name: "Nadia from Islamabad", product: "MacBook Pro M3", emoji: "💻", time: "12 min ago" },
];

function AnimatedCounter({ value, suffix = "" }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(v => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(value - 50, Math.min(value + 50, v + delta));
      });
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [value]);
  return <span>{display.toLocaleString()}{suffix}</span>;
}

function FlashSaleTimer() {
  const [time, setTime] = useState(9870);
  useEffect(() => {
    const i = setInterval(() => setTime(t => t > 0 ? t - 1 : 9870), 1000);
    return () => clearInterval(i);
  }, []);
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;
  const pad = n => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[pad(h), pad(m), pad(s)].map((v, i) => (
        <span key={i} style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: 6, padding: "2px 8px", fontFamily: "monospace", fontSize: 16, fontWeight: 700, color: "#06b6d4" }}>
          {v}{i < 2 && <span style={{ marginLeft: 6, color: "#94a3b8" }}>:</span>}
        </span>
      ))}
    </div>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? "6,182,212" : "139,92,246",
    }));
    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(6,182,212,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function StarRating({ rating }) {
  return (
    <span style={{ color: "#f59e0b", fontSize: 14 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

function ProductModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [viewers] = useState(Math.floor(Math.random() * 100) + 80);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(2,6,23,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
        backdropFilter: "blur(40px)",
        border: "1px solid rgba(6,182,212,0.25)",
        borderRadius: 24,
        width: "100%", maxWidth: 900, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 0 80px rgba(6,182,212,0.15), 0 0 40px rgba(139,92,246,0.1)",
        animation: "modalIn 0.3s ease",
      }}>
        <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.95) translateY(20px) } to { opacity:1; transform:scale(1) translateY(0) } }`}</style>
        <div style={{ display: "flex", gap: 32, padding: 32, flexWrap: "wrap" }}>
          {/* Left - Images */}
          <div style={{ flex: "0 0 340px" }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))",
              border: "1px solid rgba(6,182,212,0.2)",
              borderRadius: 20, padding: 40, textAlign: "center", marginBottom: 16,
              fontSize: 120, lineHeight: 1,
            }}>{product.image}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} onClick={() => setActiveImg(i)} style={{
                  flex: 1, background: activeImg === i ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${activeImg === i ? "rgba(6,182,212,0.6)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 10, padding: "8px 4px", textAlign: "center", fontSize: 24, cursor: "pointer",
                  transition: "all 0.2s",
                }}>{product.image}</div>
              ))}
            </div>
          </div>
          {/* Right - Details */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.4)", color: "#06b6d4", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>✓ VERIFIED SELLER</span>
              <span style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)", color: "#10b981", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>📦 FREE DELIVERY</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 8, lineHeight: 1.2 }}>{product.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <StarRating rating={product.rating} />
              <span style={{ color: "#06b6d4", fontSize: 14 }}>{product.rating}</span>
              <span style={{ color: "#64748b", fontSize: 13 }}>({product.reviews.toLocaleString()} reviews)</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: "#06b6d4" }}>Rs. {(product.price * 278).toLocaleString()}</span>
              <span style={{ fontSize: 18, color: "#475569", textDecoration: "line-through" }}>Rs. {(product.originalPrice * 278).toLocaleString()}</span>
              <span style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444", padding: "2px 8px", borderRadius: 6, fontSize: 13, fontWeight: 700 }}>
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>{product.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
              {product.specs.map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#cbd5e1", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#06b6d4" }}>✦</span> {s}
                </div>
              ))}
            </div>
            {/* Live stats */}
            <div style={{ display: "flex", gap: 16, marginBottom: 20, padding: "12px 16px", background: "rgba(6,182,212,0.06)", borderRadius: 12, border: "1px solid rgba(6,182,212,0.15)" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#06b6d4", fontWeight: 700, fontSize: 16 }}>{viewers}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>viewing now</div>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 16 }}>{product.sold}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>sold today</div>
              </div>
              <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#10b981", fontWeight: 700, fontSize: 16 }}>In Stock</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>available</div>
              </div>
            </div>
            {/* Delivery */}
            <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
              <div style={{ color: "#10b981", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>🚚 FREE Delivery · 2-4 Business Days</div>
              <div style={{ color: "#64748b", fontSize: 12 }}>Cash on Delivery available · No extra charges</div>
            </div>
            {/* Qty + buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "rgba(6,182,212,0.1)", border: "none", color: "#06b6d4", width: 36, height: 36, cursor: "pointer", fontSize: 18 }}>−</button>
                <span style={{ color: "#f1f5f9", width: 40, textAlign: "center", fontWeight: 700 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ background: "rgba(6,182,212,0.1)", border: "none", color: "#06b6d4", width: 36, height: 36, cursor: "pointer", fontSize: 18 }}>+</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={handleAdd} style={{
                flex: 1, minWidth: 140, padding: "14px 24px",
                background: added ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))",
                border: "1px solid rgba(6,182,212,0.5)", borderRadius: 14,
                color: "#f1f5f9", fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "all 0.3s",
              }}>{added ? "✓ Added to Cart!" : "🛒 Add to Cart"}</button>
              <button style={{
                flex: 1, minWidth: 140, padding: "14px 24px",
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                border: "none", borderRadius: 14,
                color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
              }}>⚡ Buy Now</button>
            </div>
          </div>
        </div>
        {/* Reviews */}
        <div style={{ padding: "0 32px 32px" }}>
          <h3 style={{ color: "#e2e8f0", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Customer Reviews</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{r.avatar}</div>
                  <div>
                    <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{r.name} {r.verified && <span style={{ color: "#10b981", fontSize: 11 }}>✓ Verified</span>}</div>
                    <div style={{ display: "flex", gap: 8 }}><StarRating rating={r.rating} /><span style={{ color: "#64748b", fontSize: 12 }}>{r.time}</span></div>
                  </div>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: 36, height: 36, color: "#94a3b8", cursor: "pointer", fontSize: 18 }}>×</button>
      </div>
    </div>
  );
}

function OrderPopup({ order, onClose }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 999,
      background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.98))",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(6,182,212,0.3)",
      borderRadius: 16,
      padding: "16px 20px",
      display: "flex", alignItems: "center", gap: 14,
      boxShadow: "0 0 40px rgba(6,182,212,0.2), 0 20px 60px rgba(0,0,0,0.5)",
      maxWidth: 320, minWidth: 280,
      animation: "slideIn 0.4s ease",
    }}>
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(100px) } to { opacity:1; transform:translateX(0) } }`}</style>
      <div style={{ fontSize: 36 }}>{order.emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#10b981", fontSize: 11, fontWeight: 700, marginBottom: 2 }}>✓ ORDER PLACED SUCCESSFULLY</div>
        <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{order.name} from {order.city}</div>
        <div style={{ color: "#94a3b8", fontSize: 12 }}>purchased {order.product}</div>
        <div style={{ color: "#06b6d4", fontSize: 11, marginTop: 2 }}>💳 Cash on Delivery</div>
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 16, padding: 4 }}>×</button>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false);
  const badgeColor = { NEW: "#06b6d4", HOT: "#ef4444", SALE: "#f59e0b", LIMITED: "#8b5cf6" }[product.badge] || "#06b6d4";

  return (
    <div
      onClick={() => onClick(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.06))"
          : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
        border: `1px solid ${hovered ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20,
        padding: 20,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? "0 20px 60px rgba(6,182,212,0.15), 0 0 30px rgba(139,92,246,0.08)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {hovered && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, transparent 60%, rgba(6,182,212,0.05))", pointerEvents: "none" }} />}
      <div style={{ position: "absolute", top: 14, left: 14 }}>
        <span style={{ background: badgeColor, color: "#fff", padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 800 }}>{product.badge}</span>
      </div>
      <div style={{ textAlign: "center", fontSize: 64, marginBottom: 16, marginTop: 8, filter: hovered ? "drop-shadow(0 0 20px rgba(6,182,212,0.5))" : "none", transition: "filter 0.3s" }}>
        {product.image}
      </div>
      <div style={{ marginBottom: 8 }}>
        <h3 style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{product.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <StarRating rating={product.rating} />
          <span style={{ color: "#64748b", fontSize: 11 }}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
          <span style={{ color: "#06b6d4", fontWeight: 800, fontSize: 18 }}>${product.price.toLocaleString()}</span>
          <span style={{ color: "#475569", fontSize: 13, textDecoration: "line-through" }}>${product.originalPrice.toLocaleString()}</span>
        </div>
        <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>👁️ {product.viewers} viewing this</div>
        <div style={{ color: "#10b981", fontSize: 11 }}>📦 {product.sold} sold in last 3 hours</div>
      </div>
      <button style={{
        width: "100%", padding: "10px", marginTop: 12,
        background: hovered ? "linear-gradient(135deg, #06b6d4, #8b5cf6)" : "rgba(6,182,212,0.1)",
        border: "1px solid rgba(6,182,212,0.4)", borderRadius: 12,
        color: hovered ? "#fff" : "#06b6d4", fontWeight: 700, fontSize: 13, cursor: "pointer",
        transition: "all 0.3s",
      }}>View Details →</button>
    </div>
  );
}

export default function NestKart() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPopup, setCurrentPopup] = useState(null);
  const [popupIdx, setPopupIdx] = useState(0);
  const [shoppingCount] = useState(2344);
  const [activeCategory, setActiveCategory] = useState("Electronics");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const show = () => {
      setCurrentPopup(PAKISTANI_ORDERS[popupIdx % PAKISTANI_ORDERS.length]);
      setPopupIdx(i => i + 1);
      setTimeout(() => setCurrentPopup(null), 5000);
    };
    show();
    const i = setInterval(show, 15000);
    return () => clearInterval(i);
  }, []);

  const addToCart = useCallback((product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      if (existing) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1 }];
    });
  }, []);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filteredProducts = PRODUCTS.filter(p =>
    (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeCategory === "All" || !searchQuery)
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #020617 0%, #0a0f1e 30%, #060b18 60%, #02060f 100%)",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#f1f5f9",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient background glows */}
      <div style={{ position: "fixed", top: "10%", left: "20%", width: 600, height: 600, background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "40%", right: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "20%", left: "30%", width: 400, height: 400, background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* NAVBAR */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(2,6,23,0.85)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(6,182,212,0.15)",
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 160 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#fff" }}>N</div>
          <span style={{ fontSize: 20, fontWeight: 900, background: "linear-gradient(135deg, #06b6d4, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NestKart</span>
        </div>
        <div style={{ flex: 1, position: "relative", maxWidth: 480 }}>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for future..."
            style={{
              width: "100%", padding: "10px 20px 10px 44px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(6,182,212,0.25)",
              borderRadius: 24, color: "#e2e8f0", fontSize: 14, outline: "none",
              boxSizing: "border-box",
            }}
          />
          <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#06b6d4", fontSize: 16 }}>🔍</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center", marginLeft: "auto" }}>
          <button style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>📦 Track Order</button>
          <button style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>❤️ Wishlist</button>
          <button onClick={() => setCartOpen(o => !o)} style={{
            background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 12,
            color: "#06b6d4", cursor: "pointer", fontSize: 13, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6, position: "relative",
          }}>
            🛒 Cart
            {cartCount > 0 && <span style={{ position: "absolute", top: -6, right: -6, background: "#ef4444", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</span>}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "6px 14px" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>F</div>
            <div>
              <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>Hi, Farhan</div>
              <div style={{ color: "#06b6d4", fontSize: 10 }}>Premium Member</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Dropdown */}
      {cartOpen && (
        <div style={{ position: "fixed", top: 70, right: 24, zIndex: 200, background: "rgba(10,15,30,0.98)", backdropFilter: "blur(20px)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 20, padding: 24, width: 340, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <h3 style={{ color: "#e2e8f0", marginBottom: 16, fontSize: 16, fontWeight: 700 }}>🛒 Your Cart ({cartCount} items)</h3>
          {cart.length === 0 ? <p style={{ color: "#64748b", textAlign: "center" }}>Cart is empty</p> : (
            <>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 28 }}>{item.image}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: "#06b6d4", fontSize: 12 }}>${item.price} × {item.qty}</div>
                  </div>
                  <div style={{ color: "#06b6d4", fontWeight: 700 }}>${item.price * item.qty}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: "#94a3b8" }}>Total</span>
                  <span style={{ color: "#06b6d4", fontWeight: 800, fontSize: 18 }}>${cartTotal.toLocaleString()}</span>
                </div>
                <button style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Checkout →</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
        {/* SIDEBAR */}
        <aside style={{
          width: 220, flexShrink: 0, padding: "24px 16px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          minHeight: "calc(100vh - 64px)",
          position: "sticky", top: 64, height: "calc(100vh - 64px)", overflowY: "auto",
        }}>
          {CATEGORIES.map(cat => (
            <div
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12,
                marginBottom: 4, cursor: "pointer",
                background: activeCategory === cat.name ? "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.1))" : "transparent",
                border: activeCategory === cat.name ? "1px solid rgba(6,182,212,0.3)" : "1px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 18 }}>{cat.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: activeCategory === cat.name ? 700 : 500, color: activeCategory === cat.name ? "#06b6d4" : "#94a3b8" }}>{cat.name}</div>
                <div style={{ fontSize: 10, color: "#475569" }}>{cat.sub}</div>
              </div>
            </div>
          ))}

          {/* Exclusive Member */}
          <div style={{ marginTop: 20, background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.15))", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 16, padding: 16 }}>
            <div style={{ color: "#06b6d4", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>NestKart</div>
            <div style={{ color: "#a78bfa", fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 4 }}>EXCLUSIVE</div>
            <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>Premium Member</div>
            <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 12 }}>Get up to 10% OFF</div>
            <button style={{ width: "100%", padding: "8px", background: "rgba(6,182,212,0.2)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: 8, color: "#06b6d4", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Explore Now</button>
          </div>

          {/* Reviews widget */}
          <div style={{ marginTop: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 16 }}>
            <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Customer Reviews ⚡</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#f59e0b" }}>4.9</span>
              <div><StarRating rating={4.9} /><div style={{ color: "#64748b", fontSize: 10 }}>(2,345 Reviews)</div></div>
            </div>
            {REVIEWS.slice(0, 1).map((r, i) => (
              <div key={i}>
                <div style={{ color: "#e2e8f0", fontSize: 11, fontWeight: 600 }}>{r.name}</div>
                <div style={{ color: "#64748b", fontSize: 10, marginBottom: 4 }}>{r.time}</div>
                <p style={{ color: "#94a3b8", fontSize: 11, lineHeight: 1.5, margin: 0 }}>{r.text.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: "24px 24px 24px 28px", minWidth: 0 }}>
          {/* HERO */}
          <div style={{
            position: "relative", borderRadius: 28, overflow: "hidden",
            background: "linear-gradient(135deg, rgba(2,6,23,0.9) 0%, rgba(6,15,40,0.95) 100%)",
            border: "1px solid rgba(6,182,212,0.2)",
            marginBottom: 24, minHeight: 440,
            display: "flex", alignItems: "center",
            boxShadow: "0 0 80px rgba(6,182,212,0.08), inset 0 0 60px rgba(139,92,246,0.04)",
          }}>
            <ParticleCanvas />
            {/* Grid overlay */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
            {/* Radial light */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 400, background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />

            {/* Hero Content */}
            <div style={{ padding: "48px 48px", position: "relative", zIndex: 2, maxWidth: 500 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", borderRadius: 20, padding: "6px 14px", width: "fit-content" }}>
                <span style={{ color: "#06b6d4", fontSize: 14 }}>📊</span>
                <span style={{ color: "#06b6d4", fontWeight: 700, fontSize: 13 }}><AnimatedCounter value={shoppingCount} /> people shopping right now</span>
              </div>
              <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
                <span style={{ color: "#f1f5f9" }}>The Future.<br /></span>
                <span style={{ background: "linear-gradient(135deg, #06b6d4, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Now in Your Hands.</span>
              </h1>
              <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>Discover next-gen tech, curated for the future.</p>
              <button style={{
                padding: "16px 36px", borderRadius: 16,
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                border: "none", color: "#fff", fontWeight: 800, fontSize: 16,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 0 40px rgba(6,182,212,0.3)",
              }}>Shop Now <span style={{ fontSize: 20 }}>→</span></button>
            </div>

            {/* Hero Product */}
            <div style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)", textAlign: "center", zIndex: 2 }}>
              <div style={{ fontSize: 160, lineHeight: 1, filter: "drop-shadow(0 0 40px rgba(6,182,212,0.5)) drop-shadow(0 0 80px rgba(139,92,246,0.3))", animation: "float 4s ease-in-out infinite" }}>⌚</div>
              <div style={{ color: "#64748b", fontSize: 13, marginTop: 8 }}>Apple Watch Ultra 2</div>
              <style>{`@keyframes float { 0%,100%{transform:translateY(-50%) translateY(-10px)} 50%{transform:translateY(-50%) translateY(10px)} }`}</style>
              {/* Holographic platform */}
              <div style={{ width: 200, height: 20, background: "radial-gradient(ellipse, rgba(6,182,212,0.3) 0%, transparent 70%)", margin: "8px auto 0", borderRadius: "50%" }} />
            </div>

            {/* Stats strip */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", borderTop: "1px solid rgba(6,182,212,0.1)", background: "rgba(2,6,23,0.6)", backdropFilter: "blur(10px)" }}>
              {[
                { icon: "🛡️", title: "Secure", sub: "SSL Encrypted" },
                { icon: "🚚", title: "Free Shipping", sub: "Orders Over $50" },
                { icon: "🔄", title: "Easy Returns", sub: "30-Day Return" },
                { icon: "💬", title: "24/7 Support", sub: "Always Here" },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <div>
                    <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 700 }}>{s.title}</div>
                    <div style={{ color: "#64748b", fontSize: 11 }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN PANELS - Flash Sale & Live Shopping */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            {/* Flash Sale */}
            <div style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(6,182,212,0.06))", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 20, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>⚡</span>
                  <span style={{ color: "#f1f5f9", fontWeight: 800, fontSize: 16 }}>Flash Sale</span>
                </div>
                <FlashSaleTimer />
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ fontSize: 72, textAlign: "center", flex: "0 0 80px" }}>🎧</div>
                <div>
                  <div style={{ color: "#e2e8f0", fontWeight: 700, marginBottom: 4 }}>{FLASH_PRODUCT.name}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                    <span style={{ color: "#06b6d4", fontWeight: 900, fontSize: 22 }}>${FLASH_PRODUCT.price}</span>
                    <span style={{ color: "#475569", textDecoration: "line-through", fontSize: 14 }}>${FLASH_PRODUCT.originalPrice}</span>
                    <span style={{ background: "#ef4444", color: "#fff", padding: "1px 6px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>-{FLASH_PRODUCT.discount}%</span>
                  </div>
                  <div style={{ background: "rgba(6,182,212,0.1)", borderRadius: 6, height: 6, marginBottom: 4 }}>
                    <div style={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", height: "100%", borderRadius: 6, width: `${FLASH_PRODUCT.sold}%` }} />
                  </div>
                  <div style={{ color: "#64748b", fontSize: 11 }}>{FLASH_PRODUCT.sold}% Sold</div>
                </div>
              </div>
              <button style={{ width: "100%", marginTop: 12, padding: "12px", background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>⚡ Grab Now</button>
            </div>

            {/* Live Shopping */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15 }}>🔴 Live Shopping Activity</span>
                <button style={{ background: "none", border: "none", color: "#06b6d4", fontSize: 12, cursor: "pointer" }}>View All</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {LIVE_SHOPPING.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{item.name}</div>
                      <div style={{ color: "#64748b", fontSize: 11 }}>purchased {item.product}</div>
                    </div>
                    <div style={{ color: "#475569", fontSize: 10 }}>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TRENDING */}
          <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#06b6d4" }}>📈</span> Trending Now
              </h2>
              <p style={{ color: "#64748b", fontSize: 13 }}>Most loved and top-rated futuristic products</p>
            </div>
            <button style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)", color: "#06b6d4", padding: "8px 20px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>View All Products</button>
          </div>

          {/* AI Recommendation Badge */}
          <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.08))", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 12, padding: "10px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>🤖</span>
            <span style={{ color: "#a78bfa", fontSize: 13, fontWeight: 600 }}>AI Powered Recommendations</span>
            <span style={{ color: "#64748b", fontSize: 12 }}>— Based on your browsing history and preferences</span>
          </div>

          {/* PRODUCT GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
            {(searchQuery ? filteredProducts : PRODUCTS).map(product => (
              <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
            ))}
          </div>

          {/* Trust Badges */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 40 }}>
            {[
              { icon: "🔒", title: "100% Secure", sub: "SSL encryption & secure payments" },
              { icon: "🚀", title: "Fast Delivery", sub: "Delivered within 2-4 days" },
              { icon: "✅", title: "Genuine Products", sub: "All items are original & certified" },
              { icon: "🔄", title: "Easy Returns", sub: "30-day hassle-free return policy" },
            ].map((b, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{b.icon}</div>
                <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{b.title}</div>
                <div style={{ color: "#64748b", fontSize: 11, lineHeight: 1.4 }}>{b.sub}</div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32, paddingBottom: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: 32 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#fff" }}>N</div>
                  <span style={{ fontSize: 20, fontWeight: 900, background: "linear-gradient(135deg, #06b6d4, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NestKart</span>
                </div>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>The future of online shopping. Premium products, cinematic experience, unbeatable prices.</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {["📘", "📸", "🐦", "▶️"].map((s, i) => (
                    <div key={i} style={{ width: 34, height: 34, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>{s}</div>
                  ))}
                </div>
              </div>
              {[
                { title: "Quick Links", links: ["Home", "Electronics", "Wearables", "Gaming", "Deals"] },
                { title: "Customer Care", links: ["Track Order", "Returns", "FAQ", "Support"] },
                { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
              ].map((col, i) => (
                <div key={i}>
                  <h4 style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 13, marginBottom: 14 }}>{col.title}</h4>
                  {col.links.map(l => <div key={l} style={{ color: "#64748b", fontSize: 12, marginBottom: 8, cursor: "pointer" }}>{l}</div>)}
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#475569", fontSize: 12 }}>© 2026 NestKart. All rights reserved. Made with ⚡ in Pakistan.</div>
              <div style={{ display: "flex", gap: 16 }}>
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                  <span key={l} style={{ color: "#475569", fontSize: 12, cursor: "pointer" }}>{l}</span>
                ))}
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Order Popup */}
      {currentPopup && (
        <OrderPopup order={currentPopup} onClose={() => setCurrentPopup(null)} />
      )}
    </div>
  );
}
