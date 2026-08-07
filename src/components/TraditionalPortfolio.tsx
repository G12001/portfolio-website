"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { portfolioData } from "@/data/knowledgeBase";
import { Mail, ExternalLink, Code2, Terminal, User, BookOpen, Briefcase, Cpu, Menu, X } from "lucide-react";

export default function TraditionalPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNav, setShowNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    const rafId = requestAnimationFrame(raf);
    
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const navLinks = [
    { name: "About", href: "#about", icon: <User size={16} /> },
    { name: "Careers", href: "#careers", icon: <Briefcase size={16} /> },
    { name: "Education", href: "#education", icon: <BookOpen size={16} /> },
    { name: "Abilities", href: "#abilities", icon: <Cpu size={16} /> },
    { name: "Projects", href: "#projects", icon: <Code2 size={16} /> },
    { name: "Contact", href: "#contact", icon: <Mail size={16} /> },
  ];

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div 
      ref={containerRef}
      onScroll={(e) => {
        if (e.currentTarget.scrollTop > window.innerHeight * 0.5) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }}
      className="h-[100dvh] w-full overflow-y-auto bg-[#050816] text-white selection:bg-[#74DF00]/30 selection:text-white pb-12 relative"
    >
      <div className="relative w-full">
        {/* Sticky Navbar (Hidden on Hero) */}
        <motion.nav 
          initial={{ y: "-100%" }}
          animate={{ y: showNav ? 0 : "-100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 z-50 w-full bg-[#050816]/80 backdrop-blur-lg border-b border-white/10 px-6 py-4"
        >
          <div className="max-w-6xl mx-auto flex justify-between items-center md:justify-center">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex flex-wrap justify-center gap-8 text-sm font-medium w-full">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="flex items-center gap-2 text-gray-400 hover:text-[#5CE1E6] transition-colors">
                    <span>{link.icon}</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex w-full justify-start items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 focus:outline-none hover:text-[#74DF00] transition-colors relative z-50"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-[#050816]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden absolute top-full left-0 w-full shadow-2xl"
              >
                <ul className="flex flex-col items-center py-8 gap-8">
                  {navLinks.map((link) => (
                    <li key={link.name} className="w-full text-center">
                      <a 
                        href={link.href} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-4 text-gray-300 hover:text-[#5CE1E6] transition-all text-xl tracking-wide hover:scale-105"
                      >
                        <span className="text-[#74DF00]">{link.icon}</span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* 1. Hero Header - Simple & Sweet with Full-Width Video */}
        <section id="hero" className="flex flex-col items-center justify-center text-center min-h-[100dvh] w-full relative overflow-hidden pt-12">
          
          {/* Background Video (now spans full screen width) */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
          >
            {/* Replace 'bg-video.mp4' with the actual name of your video file in the public folder */}
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>
          
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/60 via-[#050816]/30 to-[#050816]/90 z-0 pointer-events-none" />
          
          {/* Inner Content Container (constrained width) */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
            >
              Hi, I&apos;m <span className="text-[#74DF00]">{portfolioData.personalInfo.name.split(" ")[0]}</span>
            </motion.h1>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl font-medium mb-6 flex items-center justify-center gap-3"
            >
              <Code2 size={24} className="text-[#5CE1E6]" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5CE1E6] to-[#74DF00]">
                {portfolioData.personalInfo.role}
              </span>
            </motion.h2>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light mb-10 leading-relaxed"
            >
              {portfolioData.personalInfo.tagline}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <a href={portfolioData.personalInfo.github} target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#74DF00]/50 hover:text-[#74DF00] transition-all hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#5CE1E6]/50 hover:text-[#5CE1E6] transition-all hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href={`mailto:${portfolioData.personalInfo.email}`} className="px-8 py-4 bg-[#74DF00]/10 border border-[#74DF00]/30 rounded-full text-[#74DF00] hover:bg-[#74DF00]/20 transition-all font-medium flex items-center gap-2 hover:-translate-y-1">
                <Mail size={20} /> Get in Touch
              </a>
            </motion.div>
          </div>
        </section>

        <main className="max-w-5xl mx-auto px-6 py-12 space-y-32 pb-32">

          {/* 2. About Me */}
          <section id="about">
            <motion.h3 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={itemVariant}
              className="text-3xl font-bold mb-8 flex items-center gap-3"
            >
              <User className="text-[#74DF00]" /> About
            </motion.h3>
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={itemVariant}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                {portfolioData.about.split(" ").map((word, i) => {
                  const keywords = ["Backend", "Engineer", "Node.js/TypeScript", "Node.js", "TypeScript", "resilient", "distributed", "systems.", "EHR,", "HRMS,", "E-commerce", "RESTful"];
                  return keywords.some(k => word.includes(k)) ? (
                    <span key={i} className="text-[#5CE1E6] font-medium">{word} </span>
                  ) : (
                    word + " "
                  );
                })}
              </p>
            </motion.div>
          </section>

          {/* 3. Careers */}
          <section id="careers">
            <motion.h3 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={itemVariant}
              className="text-3xl font-bold mb-12 flex items-center gap-3"
            >
              <Briefcase className="text-[#74DF00]" /> Experience
            </motion.h3>
            
            <div className="relative border-l-2 border-transparent" style={{ borderImage: "linear-gradient(to bottom, #74DF00, #5CE1E6) 1" }}>
              <motion.div 
                variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
                className="space-y-12 pl-8"
              >
                {portfolioData.experience.map((exp, idx) => (
                  <motion.div key={idx} variants={itemVariant} className="relative group">
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#050816] border-2 border-[#74DF00] group-hover:scale-125 transition-transform" />
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#74DF00]/50 transition-all shadow-lg hover:shadow-[#74DF00]/5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                        <div>
                          <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                          <p className="text-[#5CE1E6] font-medium">{exp.company}</p>
                        </div>
                        <span className="inline-block bg-[#74DF00]/10 text-[#74DF00] border border-[#74DF00]/30 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap w-fit">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map(tech => (
                          <span key={tech} className="bg-white/5 text-gray-300 border border-white/10 text-xs px-2.5 py-1 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 4. Education Timeline */}
          <section id="education">
            <motion.h3 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={itemVariant}
              className="text-3xl font-bold mb-12 flex items-center gap-3"
            >
              <BookOpen className="text-[#5CE1E6]" /> Education
            </motion.h3>
            
            <div className="relative border-l-2 border-transparent" style={{ borderImage: "linear-gradient(to bottom, #5CE1E6, #74DF00) 1" }}>
              <motion.div 
                variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
                className="space-y-12 pl-8"
              >
                {portfolioData.education.map((edu, idx) => (
                  <motion.div key={idx} variants={itemVariant} className="relative group">
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#050816] border-2 border-[#5CE1E6] group-hover:scale-125 transition-transform" />
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#5CE1E6]/50 transition-all shadow-lg hover:shadow-[#5CE1E6]/5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                        <div>
                          <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                          <p className="text-[#5CE1E6] font-medium">{edu.institution}</p>
                        </div>
                        <span className="inline-block bg-[#5CE1E6]/10 text-[#5CE1E6] border border-[#5CE1E6]/30 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap w-fit">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 5. Abilities & Skills */}
          <section id="abilities">
            <motion.h3 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={itemVariant}
              className="text-3xl font-bold mb-12 flex items-center gap-3"
            >
              <Cpu className="text-[#74DF00]" /> Abilities
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioData.skills.map((category) => (
                <motion.div 
                  key={category.category}
                  initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={itemVariant}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-6"
                >
                  <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Terminal size={18} className="text-[#5CE1E6]" />
                    {category.category}
                  </h4>
                  <div className="space-y-4">
                    {category.items.map((skill) => (
                      <div key={skill}>
                        <div className="flex justify-between text-sm mb-1.5 text-gray-300">
                          <span>{skill}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.floor(Math.random() * 20) + 75}%` }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            className="h-full rounded-full bg-gradient-to-r from-[#74DF00] to-[#5CE1E6] shadow-[0_0_10px_rgba(116,223,0,0.4)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 6. Projects */}
          <section id="projects">
            <motion.h3 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={itemVariant}
              className="text-3xl font-bold mb-12 flex items-center gap-3"
            >
              <Code2 className="text-[#5CE1E6]" /> Projects
            </motion.h3>
            
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {portfolioData.projects.map((proj) => (
                <motion.div key={proj.id} variants={itemVariant} className="group flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-[#74DF00]/50 transition-all">
                  <div className="relative h-48 w-full bg-gradient-to-br from-[#74DF00]/10 to-[#5CE1E6]/10 flex items-center justify-center border-b border-white/5 overflow-hidden">
                    <Code2 size={48} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#050816]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <a href={proj.github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:border-white/40 transition-all flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> View Source
                      </a>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-2xl font-bold text-white group-hover:text-[#5CE1E6] transition-colors">{proj.name}</h4>
                      <span className="bg-[#74DF00]/10 text-[#74DF00] border border-[#74DF00]/30 text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#74DF00] animate-pulse" /> Live
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 flex-1">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.technologies.map((tech) => (
                        <span key={tech} className="text-xs text-[#5CE1E6] bg-[#5CE1E6]/10 px-2 py-1 rounded border border-[#5CE1E6]/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mt-auto">
                        <ExternalLink size={14} /> Visit Project
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Footer */}
          <footer id="contact" className="pt-24 pb-8 text-center border-t border-white/10 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-6 text-white">Let&apos;s Build Something Great</h3>
            <a href={`mailto:${portfolioData.personalInfo.email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#74DF00]/10 text-[#74DF00] border border-[#74DF00]/50 rounded-full hover:bg-[#74DF00]/20 transition-all font-medium mb-12 shadow-[0_0_20px_rgba(116,223,0,0.15)] hover:shadow-[0_0_30px_rgba(116,223,0,0.25)]">
              <Mail size={18} /> Say Hello
            </a>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {portfolioData.personalInfo.name}.
            </p>
          </footer>

        </main>
      </div>
    </div>
  );
}
