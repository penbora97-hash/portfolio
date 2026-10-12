import React from "react";
import {
  FaTelegramPlane,
  FaGithub,
  FaFacebookF,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

/* ─── Edit these ─────────────────────────────────────────────────────────── */
const NAME = "Pen Bora";
const EMAIL = "penbora97@gmail.com"; // ← replace with your real email
const PHONE = "+855978033088"; // ← replace; used for the tel: link

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    label: "Telegram",
    href: "https://t.me/pen_bora",
    icon: <FaTelegramPlane />,
    color: "#38bdf8",
  },
  {
    label: "GitHub",
    href: "https://github.com/penbora97-hash",
    icon: <FaGithub />,
    color: "#f8fafc",
  }, // ← replace
  {
    label: "Facebook",
    href: "https://web.facebook.com/1i3pq168y7",
    icon: <FaFacebookF />,
    color: "#3b82f6",
  }, // ← replace
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    icon: <FaEnvelope />,
    color: "#6ee7b7",
  },
];
/* ────────────────────────────────────────────────────────────────────────── */

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        fontFamily: "'Inter', sans-serif",
        background: "rgba(8,10,20,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(110,231,183,0.08)",
        padding: "3rem clamp(1.5rem, 5vw, 5rem) 1.5rem",
      }}
    >
      <style>{`
        .ft-link {
          color: rgba(148,163,184,.85);
          text-decoration: none;
          font-size: .85rem;
          font-weight: 500;
          transition: color .2s;
        }
        .ft-link:hover { color: #6ee7b7; }
        .ft-link:focus-visible, .ft-social:focus-visible, .ft-top:focus-visible {
          outline: 2px solid #6ee7b7; outline-offset: 3px; border-radius: 6px;
        }
        .ft-social {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; text-decoration: none;
          color: rgba(148,163,184,.9);
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.08);
          transition: color .2s, border-color .2s, transform .2s, background .2s;
        }
        .ft-social:hover {
          color: var(--c);
          border-color: color-mix(in srgb, var(--c) 45%, transparent);
          background: color-mix(in srgb, var(--c) 10%, transparent);
          transform: translateY(-3px);
        }
        .ft-top {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(148,163,184,.85); text-decoration: none;
          font-size: .8rem; font-weight: 500; transition: color .2s;
        }
        .ft-top:hover { color: #6ee7b7; }
        @media (prefers-reduced-motion: reduce) { .ft-social { transition: none; } }
      `}</style>

      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2.5rem",
        }}
      >
        {/* brand */}
        <div style={{ maxWidth: "320px" }}>
          <a
            href="#home"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1rem",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, rgba(110,231,183,0.2), rgba(167,139,250,0.2))",
                border: "1px solid rgba(110,231,183,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Fira Code', monospace",
                color: "#6ee7b7",
                fontSize: "0.7rem",
              }}
            >
              {"/>"}
            </span>
            <span
              style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#f1f5f9",
                letterSpacing: "-0.01em",
              }}
            >
              My<span style={{ color: "#6ee7b7" }}>.</span>portfolio
            </span>
          </a>
          <p
            style={{
              margin: 0,
              color: "rgba(148,163,184,.75)",
              lineHeight: 1.7,
              fontSize: ".88rem",
            }}
          >
            Software engineer building fast, clean web apps with React, Tailwind
            and Laravel.
          </p>
        </div>

        {/* quick links */}
        <nav aria-label="Footer">
          <h2
            style={{
              margin: "0 0 1rem",
              fontSize: ".75rem",
              fontWeight: 600,
              color: "rgba(248,250,252,.9)",
              letterSpacing: ".08em",
            }}
          >
            Quick links
          </h2>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: ".7rem",
            }}
          >
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a className="ft-link" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* socials */}
        <div>
          <h2
            style={{
              margin: "0 0 1rem",
              fontSize: ".75rem",
              fontWeight: 600,
              color: "rgba(248,250,252,.9)",
              letterSpacing: ".08em",
            }}
          >
            Find me on
          </h2>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                className="ft-social"
                style={{ "--c": s.color }}
                href={s.href}
                aria-label={s.label}
                title={s.label}
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "2.5rem auto 0",
          paddingTop: "1.25rem",
          borderTop: "1px solid rgba(255,255,255,.06)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: ".8rem",
            color: "rgba(148,163,184,.65)",
          }}
        >
          © {year} {NAME}. All rights reserved.
        </p>
        <a className="ft-top" href="#home">
          Back to top <FaArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
