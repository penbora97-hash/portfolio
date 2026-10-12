import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SpaceCanvas from "./components/SpaceCanvas";


const App = () => {
  return (
    <div className="bg-[#07090f] min-h-screen text-slate-50 overflow-x-hidden font-sans relative">
      <style>{`
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 68px; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>

      <SpaceCanvas />
      <Navbar />

      <main className="relative z-10">
        <section id="home"><Home /></section>
        <section id="skills"><Skill /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>

      <Footer />
    </div>
  );
};

export default App;