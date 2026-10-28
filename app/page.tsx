"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

const ROLES: [string, string][] = [
  ["Mobile App", "Developer"],
  ["UI/UX", "Designer"],
];

const SKILLS: [string, string[]][] = [
  ["Front-end", ["React", "JavaScript", "HTML", "CSS"]],
  ["Back-end", ["Express.js", "Node.js", "REST APIs"]],
  ["Mobile", ["React Native", "iOS & Android"]],
  ["Database", ["MySQL"]],
  ["Design", ["Figma", "UX Research", "Prototyping"]],
  ["Tools", ["Git", "GitHub"]],
];

const PROJECTS = [
  {
    title: "Glitch Detective",
    type: "UI/UX Design · Mobile App",
    description:
      "A story-driven Python learning game for students from junior high to university. Many teens find programming difficult, dull and cryptic, so I designed an adventure where learners solve cases by reading and writing code, turning each lesson into a small mystery. The prototype covers a home screen, a case library, a shop and guided lessons with a mascot.",
    role: "Research and prototyping",
    tags: ["Figma", "UX Research", "Prototyping", "Mobile App"],
    ratio: "1 / 1",
    links: [
      {
        label: "View prototype",
        href: "https://www.figma.com/proto/YFAXHKc7QKkY5CWWrKw9jd/Untitled?page-id=1%3A3&node-id=1655-6681&viewport=-6431%2C163%2C0.23&t=HZLsmj7gReXyxs6G-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1655%3A6681&show-proto-sidebar=1",
        primary: true,
      },
      {
        label: "View design",
        href: "https://www.figma.com/design/YFAXHKc7QKkY5CWWrKw9jd/Untitled?node-id=1-3&p=f&t=7RkVYRBDCKsD8ns3-0",
        primary: false,
      },
    ],
    shots: [
      { src: "/projects/glitch-home.png", alt: "Glitch Detective home screen with start, cases and shop buttons" },
      { src: "/projects/glitch-story.png", alt: "Glitch Detective story scene with a dialogue box" },
      { src: "/projects/glitch-lesson.png", alt: "Glitch Detective lesson screen with code and a mascot" },
      { src: "/projects/glitch-login.png", alt: "Glitch Detective login screen" },
    ],
  },
  {
    title: "AgriLink",
    type: "UI/UX Design · Web",
    description:
      "A web platform that connects farmers directly with restaurants and individual buyers, cutting out middlemen so farmers keep more of their profit. I designed the farmer dashboard, covering market demand, a digital shop, land monitoring with soil sensors, weather, cameras and water tanks, and education tools with fertiliser and seed calculators, plus a marketplace for buyers.",
    role: "Research, visual design and prototyping",
    tags: ["Figma", "UX Research", "Visual Design", "Prototyping", "Web App"],
    ratio: "16 / 10",
    links: [
      {
        label: "View prototype",
        href: "https://www.figma.com/proto/sfeVhLBkQAS5cZRdh2n1kY/agriculture-monitoring-sistem?node-id=2459-7919&p=f&t=TL1tTNY7pNuW1DnY-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2459%3A7919",
        primary: true,
      },
      {
        label: "View design",
        href: "https://www.figma.com/design/sfeVhLBkQAS5cZRdh2n1kY/agriculture-monitoring-sistem?node-id=0-1&p=f&t=TL1tTNY7pNuW1DnY-0",
        primary: false,
      },
    ],
    shots: [
      { src: "/projects/agrilink-home.png", alt: "AgriLink farmer dashboard with market demand and featured products" },
      { src: "/projects/agrilink-monitoring.png", alt: "AgriLink land monitoring with sensors, camera and water tanks" },
      { src: "/projects/agrilink-shop.png", alt: "AgriLink farmer shop with product table and sales stats" },
      { src: "/projects/agrilink-overview.png", alt: "Overview of all AgriLink screens" },
    ],
  },
];

const EMAIL = "daffasulthan40@gmail.com";
const LINKS = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "LinkedIn", value: "Sulthan Daffa Nugraha", href: "https://www.linkedin.com/in/sulthan-daffa-nugraha-252647415/" },
  { label: "Instagram", value: "@sulthandaffan", href: "https://instagram.com/sulthandaffan" },
  { label: "GitHub", value: "dapoel", href: "https://github.com/dapoel" },
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("in");
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function glow(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("customCursor");
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const over = (e.target as HTMLElement).closest("a, button");
      ring.current?.classList.toggle("hover", !!over);
    };
    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("customCursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cRing" />
      <div ref={dot} className="cDot" />
    </>
  );
}

function Gallery({ shots, ratio }: { shots: { src: string; alt: string }[]; ratio: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="gallery">
      <div className="stage" style={{ aspectRatio: ratio }}>
        <Image src={shots[i].src} alt={shots[i].alt} fill sizes="(max-width: 800px) 90vw, 560px" />
      </div>
      <div className="thumbs">
        {shots.map((s, n) => (
          <button
            key={s.src}
            className={n === i ? "on" : ""}
            onClick={() => setI(n)}
            aria-label={`Show screenshot ${n + 1}`}
            aria-pressed={n === i}
          >
            <Image src={s.src} alt="" fill sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const hero = useRef<HTMLElement>(null);
  const [role, setRole] = useState(0);
  const [copied, setCopied] = useState(false);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(window.scrollY / window.innerHeight, 1);
      hero.current?.style.setProperty("--p", String(p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <>
      <Cursor />
      <header className="nav">
        <a href="#top" className="brand">Sulthan Daffa Nugraha</a>
        <nav>
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" ref={hero}>
          <div className="photo">
            <div className="photoBox">
              <Image src="/hero.jpg" alt="Sulthan Daffa Nugraha" fill priority sizes="60vw" />
            </div>
          </div>
          <h1 className="title">
            <span className="accent swap" key={`a${role}`}>{ROLES[role][0]}</span>
            <span className="swap" key={`b${role}`} style={{ animationDelay: ".12s" }}>{ROLES[role][1]}</span>
          </h1>
          <div className="intro">
            <h2>I build mobile apps and design the experience around them.</h2>
            <p>From REST APIs on Express.js and Node.js to clean, responsive interfaces built with React.</p>
          </div>
          <div className="hello">
            <span>Hello</span>
            <b>I&apos;m Sulthan Daffa Nugraha</b>
          </div>
          <div className="scrollHint" aria-hidden="true">Scroll<i /></div>
        </section>

        <section id="about" className="sec">
          <Reveal>
            <h2 className="h">A little about me</h2>
          </Reveal>
          <div className="aboutGrid">
            <Reveal>
              <div className="card profile" onMouseMove={glow}>
                <div className="pic">
                  <Image src="/about.jpg" alt="Sulthan in a black suit" fill sizes="320px" />
                </div>
                <dl>
                  <dt>Based in</dt><dd>Yogyakarta, Indonesia</dd>
                  <dt>Studying</dt><dd>Information Technology, Yogyakarta State University</dd>
                  <dt>Languages</dt><dd>Indonesian (Native), English (Beginner)</dd>
                </dl>
              </div>
            </Reveal>
            <Reveal className="aboutText">
              <p className="lead">
                I&apos;m a mobile app developer and UI/UX designer from Yogyakarta, Indonesia. I design app experiences in Figma, and I&apos;m learning to build them with React Native, React, Node.js and Express.js.
              </p>
              <p>
                I&apos;m a student in the Information Technology Department at Yogyakarta State University. So far I&apos;ve designed two projects, a game-based Python learning app and a platform that connects farmers directly with buyers, and I&apos;m keen to keep growing as a mobile app developer and UI/UX designer.
              </p>
              <div className="skills">
                {SKILLS.map(([group, items]) => (
                  <div className="card skill" key={group} onMouseMove={glow}>
                    <h3>{group}</h3>
                    <div className="chips">{items.map((s) => <span key={s}>{s}</span>)}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="education" className="sec split">
          <Reveal>
            <h2 className="h">Where I&apos;m at</h2>
            <p className="muted">Currently in semester 3. Open to internships and first real-world projects.</p>
          </Reveal>
          <Reveal>
            <div className="timeline">
              <div className="card" onMouseMove={glow}>
                <div className="row"><small>Yogyakarta State University</small><small>Semester 3 · Present</small></div>
                <h3>Information Technology</h3>
                <ul>
                  <li>Building a solid foundation in web, back-end and mobile development.</li>
                  <li>Practising with React, React Native and MySQL.</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="projects" className="sec">
          <Reveal>
            <h2 className="h">Projects</h2>
            <p className="muted">Two UI/UX design projects, both prototyped in Figma.</p>
          </Reveal>
          <div className="projGrid">
            {PROJECTS.map((pr) => (
              <Reveal key={pr.title}>
                <article className="card proj" onMouseMove={glow}>
                  <div className="projBody">
                    <small className="projType">{pr.type}</small>
                    <h3>{pr.title}</h3>
                    <p className="muted">{pr.description}</p>
                    <p className="projRole"><span>My role</span>{pr.role}</p>
                    <div className="chips">
                      {pr.tags.map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <div className="btns">
                      {pr.links.map((l) => (
                        <a
                          key={l.label}
                          className={`btn${l.primary ? " solid" : ""}`}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <Gallery shots={pr.shots} ratio={pr.ratio} />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="sec">
          <Reveal>
            <div className="card contact" onMouseMove={glow}>
              <div>
                <h2 className="h">Let&apos;s build something together.</h2>
                <p className="muted">Have a project in mind, an internship to talk about, or just want to say hi? Send me an email or a message on any of these.</p>
                <div className="btns">
                  <a className="btn solid" href={`mailto:${EMAIL}`}>Email me</a>
                  <button className="btn" onClick={copyEmail}>{copied ? "Copied" : "Copy email"}</button>
                </div>
              </div>
              <ul className="links">
                {LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noreferrer">
                      <small>{l.label}</small>
                      <span>{l.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="foot">© {year} Sulthan Daffa Nugraha</footer>
    </>
  );
}