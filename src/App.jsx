import React, { useState, useEffect, useRef } from "react";
import ContactForm from "./components/common/ContactForm";

export default function App() {
  // Projects State - Starts with Sibi's key resume projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Bug Tracking System",
      tech: ["Angular", "Spring Boot", "PostgreSQL", "JWT"],
      desc: "Developed a role-based bug tracking system with custom Admin, Developer, and Tester workflows to manage issue lifecycles. Designed RESTful APIs and implemented secure JWT authorization with Role-Based Access Control (RBAC).",
      bullets: [
        "Designed RESTful APIs using layered architecture & DTO patterns.",
        "Built comments feed, bug statuses, pagination & data filters.",
        "Optimized responsive Angular frontend for clean visual updates.",
      ],
      img: "/assets/bug-tracker.png",
      link: "https://github.com/sibi-7",
      isInjected: false,
    },
    {
      id: 2,
      title: "Blood Donor Easy Navigate",
      tech: ["Angular", "Spring Boot", "PostgreSQL", "Hibernate"],
      desc: "A web application designed to connect blood donors with recipients efficiently, ensuring quick access to life-saving donations. Developed REST APIs with Spring Boot and Hibernate for inventory management and user transactions.",
      bullets: [
        "Designed relational database schemas and optimized queries.",
        "Implemented session authentication using Spring Security & JWT.",
        "Built order logging and inventory transaction flows.",
      ],
      img: "/assets/blood-donor.png",
      link: "https://github.com/sibi-7",
      isInjected: false,
    },
  ]);
  // ==========================================================================
  // 1. STATE & REF DEFINITIONS
  // ==========================================================================
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Refs for tracking DOM elements
  const projectsGridRef = useRef(null);

  // ==========================================================================
  // 2. EFFECTS & INTERACTIVE HANDLERS
  // ==========================================================================

  // Pathname guard: Restrict sub-paths (like /contact) and redirect back to root /
  useEffect(() => {
    if (window.location.pathname !== "/" && window.location.pathname !== "") {
      window.location.replace("/");
    }
  }, []);

  // Theme state effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Scrollspy & Scroll Reveal logic
  useEffect(() => {
    const handleScroll = () => {
      // Header sticky state (class added in body or handled directly)
      const navbar = document.getElementById("navbar");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }

      // Scroll Spy active navigation link
      const sections = [
        "about",
        "skills",
        "experience",
        "projects",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 120; // Header offset

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll entry reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]); // Re-observe when projects list updates

  // Theme Toggler
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* Sticky Header */}
      <header id="navbar">
        <div className="nav-container">
          <a href="#home" class="logo">
            Sibi Vengatesan
          </a>

          {/* Mobile Nav Toggle */}
          <button
            className={`nav-toggle ${mobileMenuOpen ? "open" : ""}`}
            aria-label="toggle navigation"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="hamburger"></span>
          </button>

          {/* Navigation Links */}
          <nav
            className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}
            id="navMenu"
          >
            <ul>
              <li>
                <a
                  href="#about"
                  className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className={`nav-link ${activeSection === "experience" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  className={`nav-link ${activeSection === "education" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Education
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Theme & Action buttons */}
          <div className="nav-actions">
            <button
              onClick={toggleTheme}
              className="theme-btn"
              aria-label="Toggle dark/light mode"
            >
              <i
                className={
                  theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon"
                }
              ></i>
            </button>
            <a href="#contact" className="cta-btn-header">
              Let's Talk
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          {/* Premium Hero Card (Figma Inspired) */}
          <div className="hero-card">
            {/* Left Side: Content */}
            <div className="hero-content">
              <span className="hero-tagline animate-fade">
                Java Full Stack Developer
              </span>
              <h1 className="hero-title animate-fade">
                Hello, my name is Sibi Vengatesan
              </h1>
              <p className="hero-description animate-fade">
                Java Full Stack Developer with hands-on enterprise experience in
                Spring Boot, RESTful APIs, and Angular. I build robust, scalable
                backends and integrate them with modern, responsive user
                interfaces.
              </p>
              <div className="hero-buttons animate-fade">
                <a href="#projects" className="btn btn-primary">
                  Projects
                </a>
                <a
                  href="https://linkedin.com/in/sibi-vengatesan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <i className="fa-brands fa-linkedin-in btn-icon"></i>LinkedIn
                </a>
                <a
                  href="https://github.com/sibi-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <i className="fa-brands fa-github btn-icon"></i>GitHub
                </a>
              </div>
            </div>

            {/* Right Side: Wavy Graphic & Photo */}
            <div className="hero-graphic-container">
              <div className="wave-shape-bg"></div>
              <img
                src="/assets/profile.jpg"
                alt="Sibi Vengatesan"
                className="hero-profile-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Who I Am</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-underline"></div>
          </div>

          <div className="about-grid">
            {/* Left Column: Photo & Stats */}
            <div className="about-visual scroll-reveal">
              <div className="about-img-wrapper">
                <img
                  src="/assets/profile-cap.jpg"
                  alt="Sibi Vengatesan working"
                  className="about-img"
                />
              </div>
              <div className="stats-cards-grid">
                <div className="stat-card">
                  <i className="fa-solid fa-gauge-high stat-icon"></i>
                  <div className="stat-num">~60%</div>
                  <div className="stat-label">API Load Time Saved</div>
                </div>
                <div className="stat-card">
                  <i className="fa-solid fa-check-double stat-icon"></i>
                  <div className="stat-num">30+</div>
                  <div className="stat-label">Production Issues Solved</div>
                </div>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="about-details scroll-reveal">
              <h3 className="about-heading">
                Enterprise-Level Java & Angular Developer
              </h3>
              <p className="about-text">
                I am a dedicated software engineer with a strong foundation in
                Object-Oriented Programming, MVC architecture, and backend
                automation. Over my professional career, I have designed and
                implemented backend workflows, integrated compliance schedulers,
                and built server-side pagination workflows.
              </p>
              <p className="about-text">
                My passion is writing clean, scalable, and standardized code
                using the Controller-Service-Repository layered architecture and
                standard DTO design patterns. I bridge backends and frontends
                using optimized REST APIs and JWT security.
              </p>

              <div className="personal-info-grid">
                <div className="info-item">
                  <span className="info-label">
                    <i class="fa-solid fa-envelope info-icon"></i> Email:
                  </span>
                  <span className="info-value">
                    <a href="mailto:sibi772001@gmail.com">
                      sibi772001@gmail.com
                    </a>
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <i class="fa-solid fa-phone info-icon"></i> Phone:
                  </span>
                  <span className="info-value">
                    <a href="tel:+919500746841">+91 9500746841</a>
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <i class="fa-solid fa-location-dot info-icon"></i> Location:
                  </span>
                  <span className="info-value">Chennai, India</span>
                </div>
                <div className="info-item">
                  <span className="info-label">
                    <i class="fa-solid fa-briefcase info-icon"></i>{" "}
                    Availability:
                  </span>
                  <span className="info-value">Immediate Joiner</span>
                </div>
              </div>

              <div className="about-action">
                <a href="#contact" className="btn btn-primary">
                  Work With Me
                </a>
                <a
                  href="mailto:sibi772001@gmail.com?subject=Resume Request"
                  className="btn btn-secondary"
                >
                  <i className="fa-solid fa-download btn-icon"></i>Request
                  Resume PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">My Toolkit</span>
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-underline"></div>
          </div>

          <div className="skills-container scroll-reveal">
            {/* Languages & Concepts */}
            <div className="skills-card">
              <div className="skills-card-icon">
                <i className="fa-solid fa-code"></i>
              </div>
              <h3 className="skills-category-title">Languages & Concepts</h3>
              <div className="skills-pills">
                <span className="skill-pill">Java (OOP, Collections)</span>
                <span className="skill-pill">JavaScript</span>
                <span className="skill-pill">TypeScript</span>
                <span className="skill-pill">REST API Design</span>
                <span className="skill-pill">Layered Architecture</span>
                <span className="skill-pill">DTO Pattern</span>
                <span className="skill-pill">Agile/Scrum</span>
              </div>
            </div>

            {/* Backend Stack */}
            <div className="skills-card">
              <div className="skills-card-icon">
                <i className="fa-solid fa-gears"></i>
              </div>
              <h3 className="skills-category-title">Backend Development</h3>
              <div className="skills-pills">
                <span className="skill-pill highlight-pill">Spring Boot</span>
                <span className="skill-pill">Spring MVC</span>
                <span className="skill-pill">Spring Data JPA</span>
                <span className="skill-pill">Hibernate</span>
                <span className="skill-pill highlight-pill">
                  Spring Security (JWT)
                </span>
                <span className="skill-pill">Spring Batch</span>
                <span className="skill-pill">Spring Scheduler</span>
              </div>
            </div>

            {/* Frontend & Databases */}
            <div className="skills-card">
              <div className="skills-card-icon">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3 class="skills-category-title">Frontend & Databases</h3>
              <div className="skills-pills">
                <span className="skill-pill highlight-pill">Angular</span>
                <span className="skill-pill">HTML5</span>
                <span className="skill-pill">CSS3</span>
                <span className="skill-pill highlight-pill">PostgreSQL</span>
                <span className="skill-pill">SQL Query Optimization</span>
                <span className="skill-pill">Joins & Indexing</span>
              </div>
            </div>

            {/* Tools & Testing */}
            <div className="skills-card">
              <div className="skills-card-icon">
                <i className="fa-solid fa-wrench"></i>
              </div>
              <h3 className="skills-category-title">Tools & Testing</h3>
              <div className="skills-pills">
                <span className="skill-pill">Git / GitHub</span>
                <span className="skill-pill">GitLab</span>
                <span className="skill-pill">Postman</span>
                <span className="skill-pill">REST API Testing</span>
                <span className="skill-pill">JUnit</span>
                <span className="skill-pill">Mockito</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Career Roadmap</span>
            <h2 className="section-title">Work Experience</h2>
            <div className="section-underline"></div>
          </div>

          <div className="experience-grid scroll-reveal">
            {/* Left Card: Associate Software Engineer */}
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-date">Mar 2025 – Present</span>
                <h3 className="timeline-role">Associate Software Engineer</h3>
                <h4 className="timeline-company">
                  <i className="fa-solid fa-building timeline-company-icon"></i>{" "}
                  Inspirisys Solutions Limited{" "}
                  <span className="timeline-location">Chennai, TN</span>
                </h4>
              </div>

              <div className="timeline-body">
                <div className="project-tagline-experience">
                  <strong>Project:</strong> Komply 360 — Banking Compliance SaaS
                  Platform
                </div>
                <ul className="experience-list">
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Implemented server-side pagination using{" "}
                      <strong>Spring Boot and PostgreSQL (LIMIT/OFFSET)</strong>
                      , reducing API response payload size and improving load
                      time by <strong>~60%</strong>.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Developed <strong>Spring Batch</strong> jobs and scheduled
                      workflows using <strong>Spring Scheduler</strong> to
                      automate compliance processes and handle large-scale data
                      operations.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Debugged and resolved{" "}
                      <strong>30+ critical backend issues</strong> involving API
                      failures, data inconsistencies, and performance
                      bottlenecks.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Standardized RESTful APIs following strictly compliant
                      HTTP guidelines, including custom validation and unified
                      global exception handling via{" "}
                      <code>@ControllerAdvice</code>.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Wrote unit tests using <strong>JUnit and Mockito</strong>{" "}
                      to validate service-layer logic, reducing regressions in
                      production.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Card: Mobile Application Developer */}
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-date">May 2025 – Present</span>
                <h3 className="timeline-role">Mobile Application Developer</h3>
                <h4 className="timeline-company">
                  <i className="fa-solid fa-building timeline-company-icon"></i>{" "}
                  Inspirisys Solutions Limited{" "}
                  <span className="timeline-location">Chennai, TN</span>
                </h4>
              </div>

              <div className="timeline-body">
                <div className="project-tagline-experience">
                  <strong>Project:</strong> Komply360 Mobile — Banking
                  Compliance Application
                </div>
                <ul className="experience-list">
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Developed a cross-platform mobile application using{" "}
                      <strong>Flutter and Dart</strong> for banking compliance
                      operations.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Implemented secure authentication with{" "}
                      <strong>JWT, RSA encryption, biometric login</strong>, and
                      OTP-based device registration.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Integrated Flutter application with{" "}
                      <strong>Spring Boot REST APIs</strong> and PostgreSQL
                      backend services.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Built compliance dashboards with charts, filters, and
                      drill-down views for CSAF and regulatory guideline
                      tracking.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Developed real-time chat functionality using{" "}
                      <strong>STOMP/WebSocket</strong> for seamless user
                      communication.
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check exp-bullet"></i>
                    <span>
                      Implemented document viewing, report downloads, call
                      logging, and email/phone communication features.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">My Portfolio</span>
            <h2 className="section-title">Key Projects</h2>
            <div className="section-underline"></div>
          </div>

          {/* Projects Grid */}
          <div
            className="projects-grid scroll-reveal"
            id="projectsGrid"
            ref={projectsGridRef}
          >
            {Array.isArray(projects) &&
              projects.map((project) => (
                <div className="project-card" key={project.id}>
                  {project.isInjected ? (
                    <div
                      className="project-img-wrapper"
                      style={{
                        background: `linear-gradient(135deg, ${project.gradient[0]} 0%, ${project.gradient[1]} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <i
                        className="fa-solid fa-folder-open"
                        style={{ fontSize: "64px", opacity: 0.85 }}
                      ></i>
                      <div className="project-tech-tags">
                        {project.tech.map((tag, idx) => (
                          <span key={idx}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="project-img-wrapper">
                      <img
                        src={project.img}
                        alt={`${project.title} Preview`}
                        className="project-img"
                      />
                      <div className="project-tech-tags">
                        {project.tech.map((tag, idx) => (
                          <span key={idx}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="project-card-content">
                    <h3 className="project-card-title">
                      {project.title}
                      {project.isInjected && (
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "var(--accent-color)",
                            textTransform: "uppercase",
                            backgroundColor: "var(--accent-light)",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            marginLeft: "8px",
                          }}
                        >
                          Injected
                        </span>
                      )}
                    </h3>
                    <p className="project-card-desc">{project.desc}</p>
                    <ul className="project-bullets">
                      {project.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="project-card-footer">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-btn"
                      >
                        <i className="fa-brands fa-github"></i> View Repository
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Credentials</span>
            <h2 className="section-title">Education & Certifications</h2>
            <div className="section-underline"></div>
          </div>

          <div className="education-grid scroll-reveal">
            {/* Education Card */}
            <div className="education-card">
              <div className="edu-card-icon">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="edu-card-body">
                <span className="edu-tag">Postgraduate Degree</span>
                <h3 className="edu-degree">
                  Master of Computer Applications (MCA)
                </h3>
                <h4 className="edu-institution">
                  Dhanalakshmi Srinivasan College of Engineering & Technology
                </h4>
                <div className="edu-details">
                  <span>
                    <i className="fa-solid fa-university edu-sub-icon"></i> Anna
                    University
                  </span>
                  <span>
                    <i className="fa-solid fa-calendar edu-sub-icon"></i>{" "}
                    Completed: May 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Certification Card */}
            <div className="education-card">
              <div className="edu-card-icon">
                <i className="fa-solid fa-award"></i>
              </div>
              <div className="edu-card-body">
                <span className="edu-tag tag-cert">
                  Professional Certification
                </span>
                <h3 className="edu-degree">Advanced Java Programming</h3>
                <h4 className="edu-institution">Anudip Academy</h4>
                <div className="edu-details">
                  <span>
                    <i className="fa-solid fa-id-card edu-sub-icon"></i> CIN:
                    U74900HR2009PTC039529
                  </span>
                  <span>
                    <i className="fa-solid fa-shield-halved edu-sub-icon"></i>{" "}
                    Verification Secured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Get In Touch</span>
            <h2 className="section-title">Contact Me</h2>
            <div className="section-underline"></div>
          </div>

          <div className="contact-grid scroll-reveal">
            {/* Contact details */}
            <div className="contact-info">
              <h3 className="contact-info-title">
                Let's build something great together
              </h3>
              <p className="contact-info-desc">
                I am currently open to new career opportunities, project
                collaborations, and full-stack backend integrations. Reach out
                directly or fill out the secure contact form.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-card">
                  <i className="fa-solid fa-envelope contact-card-icon"></i>
                  <div className="contact-card-content">
                    <span className="contact-card-label">Email Me</span>
                    <a
                      href="mailto:sibi772001@gmail.com"
                      className="contact-card-value"
                    >
                      sibi772001@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-card">
                  <i className="fa-solid fa-phone contact-card-icon"></i>
                  <div className="contact-card-content">
                    <span className="contact-card-label">Call Me</span>
                    <a href="tel:+919500746841" class="contact-card-value">
                      +91 9500746841
                    </a>
                  </div>
                </div>

                <div className="contact-info-card">
                  <i className="fa-solid fa-location-dot contact-card-icon"></i>
                  <div className="contact-card-content">
                    <span className="contact-card-label">Location</span>
                    <span className="contact-card-value">
                      Chennai, Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>

              <div className="social-links-wrapper">
                <h4 className="social-links-title">
                  Connect on Social Networks
                </h4>
                <div className="social-links-container">
                  <a
                    href="https://linkedin.com/in/sibi-vengatesan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-icon"
                    aria-label="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a
                    href="https://github.com/sibi-7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-icon"
                    aria-label="GitHub"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-info">
              <h3 className="contact-info-title">Message Me</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <p className="footer-logo">Sibi Vengatesan</p>
          <p className="footer-copyright">
            &copy; 2026 Sibi Vengatesan. All rights reserved.
          </p>
          <div className="footer-socials">
            <a
              href="https://linkedin.com/in/sibi-vengatesan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/sibi-7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
