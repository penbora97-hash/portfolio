import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaTelegramPlane,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

/* ─── Edit these ─────────────────────────────────────────────────────────── */
const EMAIL = "penbora97@gmail.com"; // ← replace with your real email
const PHONE = "+855978033088"; // ← replace; used for the tel: link
const PHONE_LABEL = "+855 97 803 3088"; // ← replace; used for display only
const TELEGRAM = "https://t.me/pen_bora";
const LOCATION = "Phnom Penh, Cambodia";


const FORM_ENDPOINT = "";
/* ────────────────────────────────────────────────────────────────────────── */

const INFO = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: <FaEnvelope />,
    color: "#6ee7b7",
  },
  {
    label: "Phone",
    value: PHONE_LABEL,
    href: `tel:${PHONE}`,
    icon: <FaPhoneAlt />,
    color: "#a78bfa",
  },
  {
    label: "Telegram",
    value: "@pen_bora",
    href: TELEGRAM,
    icon: <FaTelegramPlane />,
    color: "#38bdf8",
    external: true,
  },
  {
    label: "Location",
    value: LOCATION,
    icon: <FaMapMarkerAlt />,
    color: "#f472b6",
  },
];

const MESSAGES = {
  success: "សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ!",
  mailto: "កំពុងបើកកម្មវិធីអ៊ីមែលរបស់អ្នក ដើម្បីផ្ញើសារ...",
  error: "ផ្ញើមិនបានសម្រេច។ សូមព្យាយាមម្តងទៀត ឬទាក់ទងតាម Telegram។",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "mailto" | "error" | null

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    // Honeypot: real visitors never fill this hidden field
    if (e.target.elements._gotcha?.value) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus("success");
      } else {
        const subject = encodeURIComponent(
          `Portfolio message from ${data.name}`,
        );
        const body = encodeURIComponent(
          `${data.message}\n\n— ${data.name} (${data.email})`,
        );
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setStatus("mailto");
      }
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#f8fafc",
        padding: "6rem clamp(1.5rem, 7vw, 7rem) 5rem",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <style>{`
        .ct-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          display: flex; align-items: center; gap: 1rem;
          transition: border-color .3s;
        }
        .ct-card:hover { border-color: color-mix(in srgb, var(--c) 35%, transparent); }
        .ct-link { color:#f8fafc; text-decoration:none; font-weight:500; word-break:break-word; }
        .ct-link:hover { color: var(--c); }
        .ct-link:focus-visible, .ct-btn:focus-visible { outline:2px solid #6ee7b7; outline-offset:3px; border-radius:4px; }

        .ct-label { font-size:.85rem; color:rgba(148,163,184,.9); }
        .ct-input {
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 12px 16px;
          color: #f8fafc;
          font: inherit; font-size: .9rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .ct-input::placeholder { color: rgba(148,163,184,.5); }
        .ct-input:focus { border-color:#6ee7b7; box-shadow:0 0 0 3px rgba(110,231,183,.15); }

        .ct-btn {
          padding: 1rem; border-radius: 10px; cursor: pointer;
          border: 1px solid rgba(110,231,183,0.3);
          background: linear-gradient(135deg, rgba(110,231,183,.15), rgba(167,139,250,.15));
          color: #f1f5f9; font: inherit; font-size: .95rem; font-weight: 600;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background .3s, border-color .3s;
        }
        .ct-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(110,231,183,.25), rgba(167,139,250,.25));
          border-color: rgba(110,231,183,.5);
        }
        .ct-btn:disabled { cursor:not-allowed; background:rgba(110,231,183,.05); }
      `}</style>

      {/* background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          maxWidth: "100%",
          background:
            "radial-gradient(circle, rgba(110,231,183,0.05) 0%, rgba(167,139,250,0.05) 50%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "3.5rem",
          maxWidth: "600px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            margin: "0 0 1rem",
          }}
        >
          ទំនាក់ទំនង{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6ee7b7 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            មកខ្ញុំ
          </span>
        </h2>
        <p
          style={{
            color: "rgba(148,163,184,0.85)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          ប្រសិនបើអ្នកមានគម្រោង ឬចង់សហការការងារ សូមទាក់ទងមកខ្ញុំតាមរយៈ Form
          ខាងក្រោម ឬ Social Media។ ខ្ញុំនឹងឆ្លើយតបឱ្យបានឆាប់បំផុត។
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          width: "100%",
          maxWidth: "1000px",
          justifyContent: "center",
        }}
      >
        {/* contact info */}
        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {INFO.map((item) => (
            <div
              key={item.label}
              className="ct-card"
              style={{ "--c": item.color }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "40px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "10px",
                  background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.1rem",
                  color: item.color,
                }}
              >
                {item.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(148,163,184,0.7)",
                    marginBottom: "4px",
                  }}
                >
                  {item.label}
                </div>
                {item.href ? (
                  <a
                    className="ct-link"
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span style={{ fontWeight: 500 }}>{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          style={{
            flex: "1 1 400px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* honeypot (hidden from people, bots fill it in) */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              opacity: 0,
              height: 0,
            }}
          />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label className="ct-label" htmlFor="ct-name">
              ឈ្មោះ (Name)
            </label>
            <input
              id="ct-name"
              className="ct-input"
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="បញ្ចូលឈ្មោះរបស់អ្នក..."
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label className="ct-label" htmlFor="ct-email">
              អ៊ីមែល (Email)
            </label>
            <input
              id="ct-email"
              className="ct-input"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក..."
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label className="ct-label" htmlFor="ct-message">
              សារ (Message)
            </label>
            <textarea
              id="ct-message"
              className="ct-input"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="សរសេរសាររបស់អ្នកនៅទីនេះ..."
              style={{ resize: "vertical" }}
            />
          </div>

          <button type="submit" className="ct-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              "កំពុងផ្ញើ..."
            ) : (
              <>
                ផ្ញើសារ <FaPaperPlane aria-hidden="true" />
              </>
            )}
          </button>

          {/* inline status instead of alert() */}
          <p
            role="status"
            aria-live="polite"
            style={{
              margin: 0,
              minHeight: "1.2em",
              fontSize: ".88rem",
              color: status === "error" ? "#f87171" : "#6ee7b7",
            }}
          >
            {status ? MESSAGES[status] : ""}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Contact;
