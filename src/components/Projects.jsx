import React from "react";

import musicImg from "../assets/image/music.png";
import toseatImg from "../assets/image/toseat.png";
import imusicImg from "../assets/image/Imusic.png"; // keep exact file-name case: Vercel is case-sensitive

const PROJECTS = [
  {
    title: "Music",
    subtitle: "Frontend music player",
    description:
      "Frontend-only music player web app for browsing and playing songs, built with React and a responsive Tailwind CSS layout.",
    tags: ["React", "Tailwind"],
    image: musicImg,
    link: "https://play-music-blue-one.vercel.app/",
  },
  {
    title: "TosEat",
    subtitle: "Full-stack restaurant ordering system",
    description:
      "Restaurant ordering platform where customers browse the menu by cuisine, check prices and stock status, and place orders, with an admin dashboard for managing the menu and orders.",
    tags: ["React", "Tailwind", "PHP", "Laravel"],
    image: toseatImg,
    link: "https://tos-eat-swart.vercel.app/",
  },
  {
    title: "iMusic",
    subtitle: "Full-stack music streaming app",
    description:
      "Music streaming web app where users browse and play songs, with an admin dashboard for managing the music library.",
    tags: ["React", "Tailwind", "PHP", "Laravel"],
    image: imusicImg,
    link: "https://imusic-hub.vercel.app/",
  },
];

const AMBER = "#fbbf24";

const Projects = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "120px clamp(1.5rem, 7vw, 7rem) 5rem",
        fontFamily: "'Inter', sans-serif",
        color: "#f8fafc",
        position: "relative",
        zIndex: 1,
      }}
    >
      <style>{`
        .proj-card {
          background: rgba(10,16,34,0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s, transform 0.25s;
        }
        .proj-card:hover { border-color: rgba(251,191,36,0.4); transform: translateY(-3px); }
        .proj-thumb {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(135deg, #1e293b, #0f172a);
        }
        .proj-thumb img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          display: block;
        }
        .proj-thumb::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 30%;
          background: linear-gradient(to bottom, transparent, rgba(10,16,34,0.9));
          pointer-events: none;
        }
        .proj-arrow {
          position: absolute; top: 12px; right: 12px; z-index: 2;
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(15,23,42,0.85); color: #f8fafc;
          border: 1px solid rgba(255,255,255,0.12);
          text-decoration: none; font-size: 1rem;
          transition: background 0.2s, color 0.2s;
        }
        .proj-arrow:hover { background: ${AMBER}; color: #0a1020; }
        .proj-tag {
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255,255,255,0.06);
          color: #e2e8f0;
        }
        .proj-live {
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          color: #f59e0b;
          text-decoration: none;
          letter-spacing: 0.04em;
        }
        .proj-live:hover { color: ${AMBER}; }
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2rem;
        }
        @media (max-width: 1100px) {
          .proj-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 700px) {
          .proj-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'Fira Code', monospace",
            color: "#f59e0b",
            letterSpacing: "0.12em",
            fontSize: "0.85rem",
            margin: 0,
          }}
        >
          SELECTED WORK
        </p>
        <h2
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            margin: "0.5rem 0 3rem",
          }}
        >
          My projects
        </h2>

        <div className="proj-grid">
          {PROJECTS.map((p) => (
            <article key={p.title} className="proj-card">
              <div className="proj-thumb">
                <img
                  src={p.image}
                  alt={`${p.title} preview`}
                  loading="lazy"
                  onError={(e) => {
                    console.warn(`[Projects] image failed to load: ${p.image}`);
                    e.currentTarget.style.display = "none";
                  }}
                />
                <a
                  className="proj-arrow"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${p.title}`}
                >
                  ↗
                </a>
              </div>

              <div
                style={{
                  padding: "1.5rem 1.5rem 1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <h3 style={{ fontSize: "1.35rem", fontWeight: 600, margin: 0 }}>
                  {p.title}
                </h3>
                <p style={{ color: AMBER, margin: "0.35rem 0 1rem" }}>
                  {p.subtitle}
                </p>
                <p
                  style={{
                    color: "rgba(148,163,184,0.9)",
                    lineHeight: 1.7,
                    fontSize: "1.05rem",
                    margin: "0 0 1.25rem",
                  }}
                >
                  {p.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {p.tags.map((t) => (
                    <span key={t} className="proj-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "1.1rem",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <a
                    className="proj-live"
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View live ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
