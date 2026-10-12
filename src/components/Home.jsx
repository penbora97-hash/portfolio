import { useState, useEffect, useRef } from "react";
import { FaEye, FaDownload } from "react-icons/fa";
import photo from "../assets/image/photo_2026-03-07_17-05-06.jpg";

/* Put your CV at  public/cv/Pen_Bora_CV.pdf  (Vite serves /public from "/") */
const CV_URL = "/public/cv/penbora_CV (1).pdf";
const CV_FILENAME = "Pen_Bora_CV.pdf"; // name the visitor's download gets

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Problem Solver",
];

const STATS = [
  { v: "3+", l: "Years", c: "#6ee7b7" },
  { v: "2+", l: "Projects", c: "#a78bfa" },
];

/* ─── Typewriter ─────────────────────────────────────────────────────────── */
function useTypewriter(words) {
  const [txt, setTxt] = useState("");
  const st = useRef({ w: 0, c: 0, del: false });

  useEffect(() => {
    // Respect reduced-motion: show the first role, no typing loop
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setTxt(words[0]);
      return;
    }

    let id;
    const tick = () => {
      const { w, c, del } = st.current;
      const word = words[w];
      if (!del && c < word.length) {
        setTxt(word.slice(0, c + 1));
        st.current.c++;
        id = setTimeout(tick, 80);
      } else if (!del) {
        id = setTimeout(() => {
          st.current.del = true;
          tick();
        }, 2200);
      } else if (del && c > 0) {
        setTxt(word.slice(0, c - 1));
        st.current.c--;
        id = setTimeout(tick, 45);
      } else {
        st.current.del = false;
        st.current.w = (w + 1) % words.length;
        id = setTimeout(tick, 400);
      }
    };
    id = setTimeout(tick, 800);
    return () => clearTimeout(id);
  }, [words]);

  return txt;
}

/* ─── Home ───────────────────────────────────────────────────────────────── */
export default function Home() {
  const role = useTypewriter(ROLES);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin360 { to { transform:rotate(360deg); } }
        @keyframes floatUpDown {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-14px); }
        }
        @keyframes scrollDot {
          0%  { opacity:1; transform:translateY(0); }
          100%{ opacity:0; transform:translateY(10px); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes glowPulse { 0%,100%{opacity:.4} 50%{opacity:.75} }
        @keyframes badgePop {
          from { opacity:0; transform:scale(.8) translateY(6px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }

        .hm-in { animation: fadeUp .5s ease both; }

        /* stat cards */
        .hm-stat {
          display:flex; flex-direction:column; align-items:center;
          padding:.85rem 1.4rem; border-radius:14px; min-width:78px;
          position:relative; overflow:hidden; cursor:default;
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.07);
          backdrop-filter:blur(16px);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 4px 24px rgba(0,0,0,.3);
          transition:transform .2s, border-color .2s;
        }
        .hm-stat:hover {
          transform:translateY(-3px);
          border-color:color-mix(in srgb, var(--c) 30%, transparent);
        }

        /* buttons (real <Link>s, no <button> nested in <a>) */
        .hm-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:.78rem 1.25rem; min-height:48px; border-radius:10px;
          font-family:'Inter',sans-serif; font-size:.87rem; font-weight:600;
          text-decoration:none; backdrop-filter:blur(16px);
          transition:all .25s;
        }
        .hm-btn:hover { transform:translateY(-2px); }
        .hm-btn:focus-visible { outline:2px solid #6ee7b7; outline-offset:3px; }
        .hm-btn-primary {
          color:#f1f5f9;
          background:linear-gradient(135deg,rgba(110,231,183,.18),rgba(167,139,250,.18));
          border:1px solid rgba(110,231,183,.28);
        }
        .hm-btn-primary:hover {
          background:linear-gradient(135deg,rgba(110,231,183,.28),rgba(167,139,250,.28));
          border-color:rgba(110,231,183,.5);
          box-shadow:0 0 26px rgba(110,231,183,.2);
        }
        .hm-btn-ghost {
          color:rgba(148,163,184,.8);
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.08);
        }
        .hm-btn-ghost:hover {
          color:#f1f5f9;
          background:rgba(255,255,255,.07);
          border-color:rgba(255,255,255,.15);
        }

        /* Actions: tidy 2-column block, CV pill spans the full width below */
        .hm-actions {
          display:grid; grid-template-columns:1fr 1fr;
          gap:1.1rem 1rem; max-width:440px;
        }
        .hm-actions .hm-btn { justify-content:center; box-sizing:border-box; }

        /* CV: one pill with two actions (view / download) */
        .hm-cv {
          grid-column:1 / -1;
          display:grid; grid-template-columns:1fr 1fr;
          border-radius:10px; overflow:hidden;
          border:1px solid rgba(167,139,250,.35);
          background:rgba(167,139,250,.08);
          backdrop-filter:blur(16px);
          transition:border-color .25s, box-shadow .25s;
        }
        .hm-cv:hover { border-color:rgba(167,139,250,.6); box-shadow:0 0 26px rgba(167,139,250,.18); }
        .hm-cv a {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:.78rem 1.25rem; min-height:48px;
          font-family:'Inter',sans-serif; font-size:.87rem; font-weight:600;
          color:#e9e5ff; text-decoration:none;
          transition:background .2s;
        }
        .hm-cv a + a { border-left:1px solid rgba(167,139,250,.25); }
        .hm-cv a:hover { background:rgba(167,139,250,.18); }
        .hm-cv a:focus-visible { outline:2px solid #a78bfa; outline-offset:-2px; }

        /* floating badges around the photo */
        .hm-badge {
          position:absolute; z-index:4;
          padding:9px 14px; border-radius:12px;
          background:rgba(7,9,15,.8);
          backdrop-filter:blur(20px);
          box-shadow:0 8px 32px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.06);
          animation:badgePop .5s ease both;
        }
        .hm-badge-status { bottom:8px; left:-28px; border:1px solid rgba(110,231,183,.14); animation-delay:1s; }
        .hm-badge-exp    { top:8px; right:-22px; text-align:center; border:1px solid rgba(167,139,250,.14); animation-delay:1.2s; }

        @media (max-width: 680px) {
          .hm-badge-status { left:0; }
          .hm-badge-exp    { right:0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hm-in, .hm-badge, .hm-float, .hm-ring, .hm-glow, .hm-dot { animation:none !important; }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "3rem",
          padding: "100px clamp(2rem, 7vw, 7rem) 5rem",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* soft radial glow behind content */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 55% at 18% 52%, rgba(110,231,183,.05) 0%, transparent 65%)," +
              "radial-gradient(ellipse 55% 65% at 82% 50%, rgba(167,139,250,.05) 0%, transparent 65%)",
          }}
        />

        {/* ═══ LEFT ═══ */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            minWidth: "300px",
            maxWidth: "560px",
          }}
        >
          {/* availability badge */}
          <div
            className="hm-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "100px",
              background: "rgba(110,231,183,.08)",
              border: "1px solid rgba(110,231,183,.22)",
              backdropFilter: "blur(12px)",
              marginBottom: "1.8rem",
            }}
          >
            <span
              className="hm-glow"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#6ee7b7",
                boxShadow: "0 0 8px #6ee7b7",
                animation: "glowPulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Fira Code',monospace",
                fontSize: ".7rem",
                color: "#6ee7b7",
                letterSpacing: ".05em",
              }}
            >
              Available for work
            </span>
          </div>

          {/* greeting + name */}
          <div className="hm-in" style={{ marginBottom: ".9rem", animationDelay: ".1s" }}>
            <p
              style={{
                fontFamily: "'Fira Code',monospace",
                fontSize: ".78rem",
                color: "rgba(148,163,184,.6)",
                margin: "0 0 .45rem",
                letterSpacing: ".04em",
              }}
            >
              Hello, I'm
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(2.5rem,5.2vw,4.4rem)",
                fontWeight: 800,
                letterSpacing: "-.03em",
                lineHeight: 1.08,
                color: "#f8fafc",
              }}
            >
              PEN BORA
              <span
                style={{
                  display: "block",
                  background:
                    "linear-gradient(135deg,#6ee7b7 0%,#a78bfa 55%,#f472b6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: "clamp(1.6rem,3.2vw,2.6rem)",
                  fontWeight: 700,
                  marginTop: ".2rem",
                  letterSpacing: "-.02em",
                }}
              >
                Software Engineer
              </span>
            </h1>
          </div>

          {/* typewriter */}
          <div
            className="hm-in"
            aria-label={`Role: ${ROLES.join(", ")}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              height: "2rem",
              marginBottom: "1.5rem",
              animationDelay: ".2s",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: "'Fira Code',monospace",
                color: "rgba(148,163,184,.5)",
                fontSize: ".82rem",
              }}
            >
              ~/dev $
            </span>
            <span
              aria-hidden="true"
              style={{
                fontFamily: "'Fira Code',monospace",
                fontSize: ".88rem",
                color: "#a78bfa",
                fontWeight: 500,
              }}
            >
              {role}
            </span>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "2px",
                height: "1.1rem",
                background: "#a78bfa",
                borderRadius: "1px",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>

          {/* description */}
          <p
            className="hm-in"
            style={{
              color: "rgba(148,163,184,.8)",
              lineHeight: 1.8,
              fontSize: ".96rem",
              maxWidth: "460px",
              margin: "0 0 2.2rem",
              animationDelay: ".3s",
            }}
          >
            I build <span style={{ color: "#6ee7b7", fontWeight: 500 }}>scalable</span>,{" "}
            <span style={{ color: "#a78bfa", fontWeight: 500 }}>pixel-perfect</span> web
            applications with a focus on performance and clean architecture, turning
            complex problems into elegant digital solutions.
          </p>

          {/* stats */}
          <div
            className="hm-in"
            style={{
              display: "flex",
              gap: ".9rem",
              flexWrap: "wrap",
              marginBottom: "2.75rem",
              animationDelay: ".4s",
            }}
          >
            {STATS.map((s) => (
              <div key={s.l} className="hm-stat" style={{ "--c": s.c }}>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: `linear-gradient(90deg,transparent,${s.c}66,transparent)`,
                  }}
                />
                <span style={{ fontWeight: 700, fontSize: "1.4rem", color: s.c, lineHeight: 1 }}>
                  {s.v}
                </span>
                <span
                  style={{
                    fontSize: ".65rem",
                    color: "rgba(148,163,184,.6)",
                    marginTop: "4px",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hm-in hm-actions" style={{ animationDelay: ".5s" }}>
            <a href="#contact" className="hm-btn hm-btn-primary">
              Get in touch <span aria-hidden="true">→</span>
            </a>
            <a href="#projects" className="hm-btn hm-btn-ghost">
              View projects
            </a>
            <div className="hm-cv" role="group" aria-label="Curriculum vitae">
              <a href={CV_URL} target="_blank" rel="noopener noreferrer">
                <FaEye aria-hidden="true" /> View CV
              </a>
              <a href={CV_URL} download={CV_FILENAME}>
                <FaDownload aria-hidden="true" /> Download
              </a>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT: PHOTO ═══ */}
        <div
          className="hm-in"
          style={{
            position: "relative",
            zIndex: 2,
            flexShrink: 0,
            animationDuration: ".7s",
            animationDelay: ".15s",
          }}
        >
          <div
            aria-hidden="true"
            className="hm-glow"
            style={{
              position: "absolute",
              inset: "-60px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(110,231,183,.1) 0%,rgba(167,139,250,.08) 45%,transparent 70%)",
              filter: "blur(28px)",
              animation: "glowPulse 4s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          <div
            className="hm-float"
            style={{
              position: "relative",
              width: "clamp(220px,22vw,295px)",
              height: "clamp(220px,22vw,295px)",
              animation: "floatUpDown 5s ease-in-out infinite",
            }}
          >
            <div
              aria-hidden="true"
              className="hm-ring"
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg,#6ee7b7,#a78bfa,#f472b6,#38bdf8,#6ee7b7)",
                animation: "spin360 6s linear infinite",
              }}
            />
            <div
              aria-hidden="true"
              style={{ position: "absolute", inset: "3px", borderRadius: "50%", background: "#07090f" }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "3px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,rgba(255,255,255,.06) 0%,transparent 55%)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "6px",
                borderRadius: "50%",
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              <img
                src={photo}
                alt="Portrait of Pen Bora"
                width="295"
                height="295"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>

          <div className="hm-badge hm-badge-status">
            <div
              style={{
                fontFamily: "'Fira Code',monospace",
                fontSize: ".6rem",
                color: "rgba(148,163,184,.55)",
                marginBottom: "2px",
              }}
            >
              status
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                className="hm-glow"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#6ee7b7",
                  boxShadow: "0 0 8px #6ee7b7",
                  animation: "glowPulse 2s ease-in-out infinite",
                }}
              />
              <span style={{ fontSize: ".75rem", fontWeight: 600, color: "#f1f5f9" }}>
                Open to opportunities
              </span>
            </div>
          </div>

          <div className="hm-badge hm-badge-exp">
            <div style={{ fontWeight: 700, fontSize: "1.25rem", color: "#a78bfa", lineHeight: 1 }}>
              1+
            </div>
            <div
              style={{
                fontSize: ".6rem",
                color: "rgba(148,163,184,.55)",
                marginTop: "3px",
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              Yrs exp
            </div>
          </div>
        </div>
        {/* scroll hint */}
        <a
          href="#skills"
          aria-label="Scroll to skills"
          className="hm-in"
          style={{
            position: "absolute",
            bottom: "1.8rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "7px",
            zIndex: 2,
            opacity: 0.4,
            textDecoration: "none",
            animationDelay: "1.6s",
          }}
        >
          <span
            style={{
              fontFamily: "'Fira Code',monospace",
              fontSize: ".58rem",
              color: "rgba(148,163,184,.8)",
              letterSpacing: ".18em",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: "20px",
              height: "32px",
              borderRadius: "10px",
              border: "1.5px solid rgba(148,163,184,.3)",
              display: "flex",
              justifyContent: "center",
              paddingTop: "5px",
            }}
          >
            <div
              className="hm-dot"
              style={{
                width: "3px",
                height: "7px",
                borderRadius: "2px",
                background: "rgba(110,231,183,.7)",
                animation: "scrollDot 1.4s ease-in-out infinite",
              }}
            />
          </div>
        </a>
      </section>
    </>
  );
}