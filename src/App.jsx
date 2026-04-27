import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  Sun,
  X
} from "lucide-react";
import {
  certifications,
  contactLinks,
  experiences,
  metrics,
  navItems,
  projectFilters,
  projects,
  recruiterHighlights,
  roleTargets,
  skillGroups
} from "./data/portfolio";
import IconLink from "./components/IconLink";
import SectionHeading from "./components/SectionHeading";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 bg-subtle-grid bg-[length:38px_38px] opacity-70 dark:opacity-35" />
      {[...Array(18)].map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-teal-500/35 dark:bg-cyan-300/35"
          style={{ left: `${(index * 47) % 100}%`, top: `${(index * 29) % 100}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.8, 1] }}
          transition={{ duration: 5 + (index % 5), repeat: Infinity, delay: index * 0.25 }}
        />
      ))}
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-teal-200/45 via-sky-100/20 to-transparent dark:from-teal-950/50 dark:via-blue-950/20" />
    </div>
  );
}

function Navbar({ activeSection, isDark, setIsDark, recruiterMode, setRecruiterMode }) {
  const [open, setOpen] = useState(false);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/78 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/76">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => goTo("home")} className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-glow dark:bg-white dark:text-slate-950">
            RV
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-bold text-slate-950 dark:text-white">Rithik Reddy Varla</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Data Engineering Portfolio</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeSection === item.id
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRecruiterMode((value) => !value)}
            className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition sm:inline-flex ${
              recruiterMode
                ? "bg-teal-500 text-slate-950 shadow-glow"
                : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"
            }`}
          >
            Recruiter Mode
          </button>
          <button
            onClick={() => setIsDark((value) => !value)}
            aria-label="Toggle dark mode"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen((value) => !value)}
            aria-label="Open navigation"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden dark:border-white/10 dark:bg-slate-950"
          >
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setRecruiterMode((value) => !value)}
                className="rounded-xl bg-teal-500 px-4 py-3 text-left text-sm font-bold text-slate-950"
              >
                Recruiter Mode {recruiterMode ? "On" : "Off"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function TypingText() {
  const phrases = useMemo(() => ["Data Engineer", "Cloud Data Engineer", "BI & Analytics Builder", "Pipeline Reliability Owner"], []);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [letters, setLetters] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const delay = deleting ? 45 : 82;
    const timer = setTimeout(() => {
      if (!deleting && letters === current.length) {
        setTimeout(() => setDeleting(true), 850);
      } else if (deleting && letters === 0) {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      } else {
        setLetters((count) => count + (deleting ? -1 : 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [deleting, letters, phraseIndex, phrases]);

  return (
    <span className="text-teal-600 dark:text-teal-300">
      {phrases[phraseIndex].slice(0, letters)}
      <span className="ml-1 animate-pulse">|</span>
    </span>
  );
}

function RecruiterPanel({ recruiterMode }) {
  return (
    <AnimatePresence>
      {recruiterMode && (
        <motion.aside
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-2xl border border-teal-300/60 bg-teal-50/90 p-4 shadow-glow dark:border-teal-400/20 dark:bg-teal-950/40">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">Recruiter Mode</p>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Fast fit check for data roles</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {roleTargets.map((role) => (
                  <span key={role} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-white">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {recruiterHighlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 rounded-xl bg-white/75 p-3 text-sm text-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-teal-600 dark:text-teal-300" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  return (
    <section id="home" className="mx-auto flex min-h-screen max-w-7xl scroll-mt-24 flex-col justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={sectionVariants} className="mb-4 inline-flex rounded-full border border-teal-400/40 bg-white/80 px-4 py-2 text-sm font-bold text-teal-700 shadow-sm dark:bg-white/10 dark:text-teal-300">
            Orlando, FL based Data Engineer
          </motion.p>
          <motion.h1 variants={sectionVariants} className="max-w-4xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            Rithik Reddy Varla
          </motion.h1>
          <motion.p variants={sectionVariants} className="mt-4 text-2xl font-bold text-slate-700 dark:text-slate-200">
            Data Engineer | Cloud Data Engineer | BI & Analytics
          </motion.p>
          <motion.p variants={sectionVariants} className="mt-4 text-xl font-semibold text-slate-600 dark:text-slate-300">
            Building scalable data pipelines and cloud data platforms as a <TypingText />
          </motion.p>
          <motion.p variants={sectionVariants} className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            I design reliable ETL/ELT systems, analytics-ready data models, and BI foundations across Python, SQL, PySpark, AWS, Snowflake, Power BI, and Tableau.
          </motion.p>
          <motion.div variants={sectionVariants} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-1 dark:bg-white dark:text-slate-950">
              View Projects
            </a>
            <a href="#" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:-translate-y-1 dark:border-white/15 dark:bg-white/10 dark:text-white">
              Download Resume
            </a>
            <IconLink href={contactLinks.github} icon={Github}>GitHub</IconLink>
            <IconLink href={contactLinks.linkedin} icon={Linkedin}>LinkedIn</IconLink>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative"
        >
          <div className="rounded-3xl border border-slate-200 bg-white/82 p-5 shadow-2xl shadow-teal-900/10 backdrop-blur dark:border-white/10 dark:bg-white/10">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-bold text-teal-300">Pipeline Health</span>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-300">Live</span>
              </div>
              {["S3 ingestion", "Glue transforms", "Snowflake model", "BI semantic layer"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ width: "35%" }}
                  animate={{ width: `${82 + index * 4}%` }}
                  transition={{ duration: 1.2, delay: index * 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1.4 }}
                  className="mb-5"
                >
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{item}</span>
                    <span>{95 - index}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-gradient-to-r from-teal-300 to-sky-300" />
                  </div>
                </motion.div>
              ))}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["2M+ rows/day", "25+ checks", "30% faster", "4.0 GPA"].map((stat) => (
                  <div key={stat} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm font-bold">
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <motion.section id="about" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading kicker="About" title="Data engineering depth with analytics empathy." />
        <div className="grid gap-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
          <p>
            Rithik is pursuing an M.S. in Computer Science at the University of Central Florida with a 4.0 GPA while building a practical portfolio across data engineering, cloud platforms, and business intelligence.
          </p>
          <p>
            His work centers on scalable ETL/ELT pipelines, AWS and Snowflake data platforms, data modeling, data quality, and BI systems that turn operational data into trusted reporting and analytics.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function Skills() {
  const [active, setActive] = useState(skillGroups[0].title);
  const selected = skillGroups.find((group) => group.title === active) ?? skillGroups[0];
  const Icon = selected.icon;

  return (
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading kicker="Skills" title="A practical stack for modern data teams." className="mb-8" />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3">
          {skillGroups.map((group) => {
            const TabIcon = group.icon;
            return (
              <button
                key={group.title}
                onClick={() => setActive(group.title)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  active === group.title
                    ? "border-teal-400 bg-teal-50 shadow-glow dark:bg-teal-950/40"
                    : "border-slate-200 bg-white/70 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <TabIcon className="h-5 w-5 text-teal-600 dark:text-teal-300" />
                <span className="font-bold text-slate-900 dark:text-white">{group.title}</span>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-3xl border border-slate-200 bg-white/82 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10"
          >
            <Icon className="mb-5 h-10 w-10 text-teal-600 dark:text-teal-300" />
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">{selected.title}</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {selected.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading kicker="Experience" title="Production-minded, impact-led timeline." className="mb-10" />
      <div className="relative grid gap-6">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-teal-400 via-slate-300 to-transparent md:block dark:via-white/20" />
        {experiences.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative rounded-3xl border border-slate-200 bg-white/82 p-6 shadow-xl shadow-slate-900/5 md:ml-16 dark:border-white/10 dark:bg-white/10"
            >
              <div className="absolute -left-[4.7rem] top-6 hidden h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-teal-300 shadow-glow md:grid">
                <Icon size={22} />
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-950 dark:text-white">{item.company} - {item.role}</h3>
                  <p className="mt-1 text-sm font-bold text-teal-700 dark:text-teal-300">{item.period}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">
                  {item.impact}
                </span>
              </div>
              <ul className="mt-5 grid gap-2 text-slate-600 dark:text-slate-300">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-teal-600 dark:text-teal-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const visibleProjects = filter === "All" ? projects : projects.filter((project) => project.roles.includes(filter));

  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading kicker="Featured Projects" title="Proof of cloud, pipeline, and analytics execution." />
        <div className="flex flex-wrap gap-2">
          {projectFilters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                filter === item
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "bg-white text-slate-600 hover:-translate-y-1 dark:bg-white/10 dark:text-slate-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <motion.article
            layout
            key={project.title}
            whileHover={{ y: -8, scale: 1.015 }}
            className="group flex min-h-[360px] flex-col rounded-3xl border border-slate-200 bg-white/86 p-6 shadow-xl shadow-slate-900/5 transition dark:border-white/10 dark:bg-white/10"
          >
            <div className="flex items-start justify-between gap-4">
              <Briefcase className="h-8 w-8 text-teal-600 dark:text-teal-300" />
              <button onClick={() => setSelected(project)} className="rounded-full bg-slate-100 p-2 text-slate-700 transition group-hover:bg-slate-950 group-hover:text-white dark:bg-white/10 dark:text-white">
                <ArrowUpRight size={18} />
              </button>
            </div>
            <h3 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">{project.title}</h3>
            <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-950/50 dark:text-slate-200">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5 grid gap-2">
              {project.metrics.map((metric) => (
                <span key={metric} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-teal-700 dark:border-white/10 dark:text-teal-300">
                  {metric}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/70 p-4 backdrop-blur" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white p-6 shadow-2xl dark:bg-slate-950"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Project Detail</p>
                <h3 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{project.title}</h3>
              </div>
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white">
                <X size={20} />
              </button>
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{project.details}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric} className="rounded-2xl bg-teal-50 p-4 text-sm font-black text-teal-800 dark:bg-teal-950/40 dark:text-teal-200">
                  {metric}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-7">
              {project.github ? (
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
                  <Github size={17} /> View GitHub
                </a>
              ) : (
                <span className="inline-flex rounded-full bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-slate-200">
                  Private production-style project
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Metrics() {
  const [active, setActive] = useState(metrics[0].label);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading kicker="Metrics" title="Signals recruiters can scan fast." className="mb-8" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isActive = active === metric.label;
          return (
            <motion.button
              key={metric.label}
              onClick={() => setActive(metric.label)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -6 }}
              className={`rounded-3xl border p-6 text-left transition ${
                isActive
                  ? "border-teal-400 bg-teal-50 shadow-glow dark:bg-teal-950/40"
                  : "border-slate-200 bg-white/82 dark:border-white/10 dark:bg-white/10"
              }`}
            >
              <Icon className="h-8 w-8 text-teal-600 dark:text-teal-300" />
              <div className="mt-5 text-4xl font-black text-slate-950 dark:text-white">{metric.value}</div>
              <div className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-300">{metric.label}</div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white/82 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10">
        <p className="section-kicker">Certifications</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {certifications.map((certification) => (
            <div key={certification} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-bold text-slate-800 dark:bg-slate-950/50 dark:text-white">
              <CheckCircle2 className="h-5 w-5 text-teal-600 dark:text-teal-300" />
              {certification}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const errors = {
    name: form.name.trim().length > 0 ? "" : "Name is required",
    email: /.+@.+\..+/.test(form.email) ? "" : "Valid email is required",
    message: form.message.trim().length >= 12 ? "" : "Message needs at least 12 characters"
  };
  const isValid = !Object.values(errors).some(Boolean);

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading kicker="Contact" title="Let's talk data roles, cloud platforms, and analytics impact." />
          <div className="mt-8 grid gap-3 text-slate-600 dark:text-slate-300">
            <a href={`mailto:${contactLinks.email}`} className="contact-link"><Mail size={18} /> {contactLinks.email}</a>
            <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="contact-link"><Linkedin size={18} /> LinkedIn</a>
            <a href={contactLinks.github} target="_blank" rel="noreferrer" className="contact-link"><Github size={18} /> GitHub</a>
            <span className="contact-link"><MapPin size={18} /> {contactLinks.location}</span>
          </div>
        </div>
        <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white/86 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10">
          {["name", "email"].map((field) => (
            <label key={field} className="mb-4 block">
              <span className="mb-2 block text-sm font-bold capitalize text-slate-700 dark:text-slate-200">{field}</span>
              <input
                value={form[field]}
                onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:ring-teal-950"
                placeholder={field === "email" ? "recruiter@company.com" : "Your name"}
              />
              {submitted && errors[field] && <span className="mt-1 block text-sm font-semibold text-rose-500">{errors[field]}</span>}
            </label>
          ))}
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Message</span>
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              rows="5"
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:ring-teal-950"
              placeholder="I am hiring for a data engineering role..."
            />
            {submitted && errors.message && <span className="mt-1 block text-sm font-semibold text-rose-500">{errors.message}</span>}
          </label>
          <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950" disabled={submitted && !isValid}>
            <Send size={17} /> Send Message
          </button>
          {submitted && isValid && <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">Message UI validated. Connect this form to Formspree, Resend, or a backend endpoint for production delivery.</p>}
        </form>
      </div>
    </section>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatedBackground />
      <motion.div className="fixed left-0 right-0 top-0 z-[80] h-1 origin-left bg-teal-400" style={{ scaleX }} />
      <Navbar activeSection={activeSection} isDark={isDark} setIsDark={setIsDark} recruiterMode={recruiterMode} setRecruiterMode={setRecruiterMode} />
      <RecruiterPanel recruiterMode={recruiterMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Metrics />
        <Certifications />
        <Contact />
      </main>
      <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">
        Built for recruiters evaluating data engineering, cloud data, BI, analytics, and data analyst roles.
      </footer>
    </>
  );
}
