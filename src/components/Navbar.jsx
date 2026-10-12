import { useState, useEffect } from "react";

// `id` must match the section ids in App.jsx
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const CTA_BASE =
  "linear-gradient(135deg, rgba(110,231,183,0.15), rgba(167,139,250,0.15))";
const CTA_HOVER =
  "linear-gradient(135deg, rgba(110,231,183,0.25), rgba(167,139,250,0.25))";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Highlight the link of whichever section is crossing the middle of the screen
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .nl {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(148,163,184,0.85);
          text-decoration: none;
          padding: 6px 0;
          position: relative;
          transition: color 0.2s;
        }
        .nl::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0%; height: 1.5px;
          background: linear-gradient(90deg, #6ee7b7, #a78bfa);
          transition: width 0.25s ease;
          border-radius: 1px;
        }
        .nl:hover { color: #e2e8f0; }
        .nl.active { color: #6ee7b7; }
        .nl.active::after { width: 100%; }

        .mob-nl {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(148,163,184,0.8);
          text-decoration: none;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: block;
          transition: color 0.2s;
          letter-spacing: 0.02em;
        }
        .mob-nl:hover, .mob-nl.active { color: #6ee7b7; }

        .ham { display: none; }
        @media (max-width: 680px) {
          .desk-ul { display: none !important; }
          .ham     { display: flex !important; }
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          background: scrolled ? "rgba(8,10,20,0.85)" : "rgba(8,10,20,0.45)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(110,231,183,0.06)",
          boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.5)" : "none",
          transition: "background 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
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
            }}
          >
            <span
              style={{
                fontFamily: "'Fira Code', monospace",
                color: "#6ee7b7",
                fontWeight: 500,
                fontSize: "0.7rem",
              }}
            >
              {"/>"}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
            }}
          >
            Pen<span style={{ color: "#6ee7b7" }}> </span>Bora
          </span>
        </a>

        {/* Desktop links */}
        <ul
          className="desk-ul"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`nl${active === l.id ? " active" : ""}`}
                aria-current={active === l.id ? "true" : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}

          <li>
            <a
              href="https://t.me/pen_bora"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "inline-block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                padding: "0.5rem 1.25rem",
                borderRadius: "8px",
                background: CTA_BASE,
                border: "1px solid rgba(110,231,183,0.35)",
                color: "#6ee7b7",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = CTA_HOVER;
                e.currentTarget.style.borderColor = "rgba(110,231,183,0.6)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(110,231,183,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = CTA_BASE;
                e.currentTarget.style.borderColor = "rgba(110,231,183,0.35)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Let's Talk
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="ham"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: menuOpen ? "#6ee7b7" : "rgba(148,163,184,0.7)",
                borderRadius: "2px",
                transition: "all 0.25s",
                transform:
                  menuOpen && i === 0
                    ? "translateY(6.5px) rotate(45deg)"
                    : menuOpen && i === 2
                      ? "translateY(-6.5px) rotate(-45deg)"
                      : menuOpen && i === 1
                        ? "scaleX(0)"
                        : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed",
          top: "68px",
          left: 0,
          right: 0,
          zIndex: 99,
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          padding: "0.5rem clamp(1.5rem,5vw,5rem) 1.5rem",
          background: "rgba(8,10,20,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(110,231,183,0.08)",
        }}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`mob-nl${active === l.id ? " active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
