import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaDocker,
  FaVuejs,
  FaLaravel,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
} from "react-icons/si";

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "Tools"];

const SKILLS = [
  {
    name: "React",
    icon: <FaReact />,
    color: "#61dafb",
    category: "Frontend",
    description: "Building fast and interactive user interfaces.",
  },
  {
    name: "Vue.js",
    icon: <FaVuejs />,
    color: "#42b883",
    category: "Frontend",
    description: "Component-driven apps, used in the MPOS project.",
  },

  {
    name: "JavaScript",
    icon: <SiJavascript />,
    color: "#f7df1e",
    category: "Frontend",
    description: "Core language for modern web apps.",
  },

  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "#38bdf8",
    category: "Frontend",
    description: "Utility-first modern styling workflow.",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    color: "#68a063",
    category: "Backend",
    description: "Backend APIs and server-side logic.",
  },
  {
    name: "Laravel",
    icon: <FaLaravel />,
    color: "#ff2d20",
    category: "Backend",
    description: "PHP framework for APIs and admin dashboards.",
  },

  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    color: "#5b9bd5",
    category: "Database",
    description: "Powerful relational database system.",
  },
  {
    name: "Git",
    icon: <FaGitAlt />,
    color: "#f05032",
    category: "Tools",
    description: "Version control and collaboration.",
  },

  {
    name: "Figma",
    icon: <FaFigma />,
    color: "#a78bfa",
    category: "Tools",
    description: "UI/UX design and prototyping.",
  },
];

export default function Skills() {
  const [active, setActive] = useState("All");
  const reduce = useReducedMotion();

  const visible =
    active === "All" ? SKILLS : SKILLS.filter((s) => s.category === active);
  const offset = reduce ? 0 : 24;

  return (
    <>
      <style>{`
        @keyframes glowPulse { 0%,100%{opacity:.4} 50%{opacity:.75} }

        .sk-glow { animation: glowPulse 5s ease-in-out infinite; }

        .sk-tab {
          font-family:'Inter',sans-serif; font-size:.85rem; font-weight:500;
          padding:.6rem 1.2rem; border-radius:999px; cursor:pointer;
          color:rgba(148,163,184,.85);
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.08);
          transition:color .2s, border-color .2s, background .2s;
        }
        .sk-tab:hover { color:#f8fafc; border-color:rgba(255,255,255,.2); }
        .sk-tab[aria-pressed="true"] {
          color:#6ee7b7;
          border-color:rgba(110,231,183,.4);
          background:rgba(110,231,183,.08);
        }
        .sk-tab:focus-visible, .sk-card:focus-visible { outline:2px solid #6ee7b7; outline-offset:3px; }

        .sk-card {
          position:relative; overflow:hidden; border-radius:20px; padding:1.75rem;
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.08);
          box-shadow:0 10px 40px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.04);
          transition:border-color .3s, box-shadow .3s;
        }
        .sk-card:hover {
          border-color:color-mix(in srgb, var(--c) 45%, transparent);
          box-shadow:0 0 30px color-mix(in srgb, var(--c) 12%, transparent),
                     inset 0 1px 0 rgba(255,255,255,.04);
        }

        @media (prefers-reduced-motion: reduce) { .sk-glow { animation:none; } }
      `}</style>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          padding: "8rem 2rem 6rem",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* background glows */}
        <div
          aria-hidden="true"
          className="sk-glow"
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(110,231,183,.08)",
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          className="sk-glow"
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(167,139,250,.08)",
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: offset }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "3rem", textAlign: "center" }}
          >
            <p
              style={{
                color: "#6ee7b7",
                fontSize: ".75rem",
                letterSpacing: ".25em",
                textTransform: "uppercase",
                margin: "0 0 1rem",
                fontWeight: 600,
              }}
            >
              My expertise
            </p>
            <h1
              style={{
                color: "#f8fafc",
                fontSize: "clamp(2.5rem,5vw,4.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-.04em",
                margin: "0 0 1.5rem",
              }}
            >
              Skills &amp; Technologies
            </h1>
            <p
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                color: "rgba(148,163,184,.8)",
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
              Technologies and tools I use to craft modern, scalable and
              high-performance digital experiences.
            </p>
          </motion.div>

          {/* category filter */}
          <div
            role="group"
            aria-label="Filter skills by category"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: ".75rem",
              marginBottom: "3rem",
            }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className="sk-tab"
                aria-pressed={active === c}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* grid */}
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((skill, i) => (
                <motion.article
                  key={skill.name}
                  layout={!reduce}
                  className="sk-card"
                  style={{ "--c": skill.color }}
                  initial={{ opacity: 0, y: offset }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                  whileHover={reduce ? undefined : { y: -6 }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.7rem",
                      marginBottom: "1.25rem",
                      color: skill.color,
                      background: `color-mix(in srgb, ${skill.color} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${skill.color} 25%, transparent)`,
                    }}
                  >
                    {skill.icon}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: ".5rem",
                      marginBottom: ".6rem",
                    }}
                  >
                    <h2
                      style={{
                        color: "#f8fafc",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        letterSpacing: "-.02em",
                        margin: 0,
                      }}
                    >
                      {skill.name}
                    </h2>
                    <span
                      style={{
                        color: "rgba(148,163,184,.6)",
                        fontSize: ".72rem",
                      }}
                    >
                      {skill.category}
                    </span>
                  </div>

                  <p
                    style={{
                      color: "rgba(148,163,184,.8)",
                      lineHeight: 1.7,
                      fontSize: ".92rem",
                      margin: 0,
                    }}
                  >
                    {skill.description}
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
