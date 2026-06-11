import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  BrainCircuit,
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  FileSpreadsheet,
  Filter,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Moon,
  MousePointer2,
  Route,
  Search,
  Send,
  ServerCog,
  Star,
  Sun,
  Target,
  X
} from "lucide-react";
import {
  certifications,
  contactLinks,
  education,
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
import { trackEvent } from "./utils/analytics";

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

const roleTone = {
  "Data Engineer": {
    badge: "bg-sky-50 text-sky-800 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-200 dark:ring-sky-700/50",
    border: "border-sky-300 dark:border-sky-700",
    accent: "text-sky-700 dark:text-sky-300"
  },
  "Data Analytics": {
    badge: "bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:ring-emerald-700/50",
    border: "border-emerald-300 dark:border-emerald-700",
    accent: "text-emerald-700 dark:text-emerald-300"
  },
  "BI Analyst": {
    badge: "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:ring-amber-700/50",
    border: "border-amber-300 dark:border-amber-700",
    accent: "text-amber-700 dark:text-amber-300"
  },
  "Machine Learning": {
    badge: "bg-violet-50 text-violet-800 ring-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:ring-violet-700/50",
    border: "border-violet-300 dark:border-violet-700",
    accent: "text-violet-700 dark:text-violet-300"
  }
};

const getRoleTone = (role) => roleTone[role] ?? roleTone["Data Engineer"];
const reviewWorkbookHref = `${import.meta.env.BASE_URL}visitor-review-tracker.xlsx`;
const proofTickerItems = [
  "17 public repositories",
  "Cloud pipelines",
  "ML lifecycle systems",
  "RAG evaluation",
  "Power BI-ready marts",
  "Data quality checks",
  "FastAPI scoring",
  "Snowflake features",
  "UCF M.S. Computer Science",
  "4.0 GPA"
];
const heroEvidence = [
  { label: "Public repos", value: "17", note: "Inspectable code, runbooks, docs, tests, and architecture" },
  { label: "Role tracks", value: "4", note: "Data Engineering, Analytics, BI, and Machine Learning" },
  { label: "Signal density", value: "High", note: "Designed for fast senior hiring manager review" }
];
const featuredSystemTitles = [
  "Cloud-Native Retail Lakehouse",
  "AWS Snowflake ML Lifecycle Platform",
  "AI Data Quality Monitoring Framework",
  "LLM RAG Evaluation Platform",
  "Event-Driven Customer Events API",
  "Legal Operations Matter Analytics"
];
const openToRoles = [
  "Data Engineer",
  "Data Scientist",
  "ML Engineer",
  "Analytics Engineer"
];
const proofSignals = [
  {
    label: "Architecture",
    icon: Layers3,
    note: "Lakehouse layers, event flows, agent workflows, and API boundaries are documented."
  },
  {
    label: "Data Models",
    icon: Database,
    note: "Fact tables, dimensions, feature contracts, marts, and dashboard-ready extracts are represented."
  },
  {
    label: "Quality",
    icon: CheckCircle2,
    note: "Validation rules, QA checks, drift metrics, duplicate handling, and monitoring paths are visible."
  },
  {
    label: "Serving",
    icon: ServerCog,
    note: "FastAPI endpoints, BI outputs, scoring services, and operational read paths show delivery thinking."
  },
  {
    label: "Analytics",
    icon: BarChart3,
    note: "KPIs, cohorts, funnels, ROI, churn, LTV, SLA, workload, and executive reporting are covered."
  },
  {
    label: "AI/ML",
    icon: BrainCircuit,
    note: "Feature engineering, MLflow, monitoring, RAG evaluation, anomaly detection, and agent logic are included."
  }
];
const roleVisuals = {
  "Data Engineer": {
    shortLabel: "DE",
    sceneLabel: "Pipelines",
    icon: ServerCog,
    color: "#0284c7",
    darkColor: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.32)",
    summary: "Ingestion, quality gates, orchestration, lakehouse layers, and warehouse-ready models.",
    signals: ["Batch + streaming", "Data quality", "Lakehouse marts"]
  },
  "Data Analytics": {
    shortLabel: "DA",
    sceneLabel: "Insights",
    icon: BarChart3,
    color: "#059669",
    darkColor: "#34d399",
    glow: "rgba(52, 211, 153, 0.3)",
    summary: "SQL/Python analysis that turns raw datasets into KPIs, cohorts, and business recommendations.",
    signals: ["Cohorts", "Segmentation", "Executive output"]
  },
  "BI Analyst": {
    shortLabel: "BI",
    sceneLabel: "Dashboards",
    icon: Layers3,
    color: "#d97706",
    darkColor: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.28)",
    summary: "Semantic marts, dashboard specifications, KPI definitions, and stakeholder reporting surfaces.",
    signals: ["Gold marts", "KPI design", "Power BI specs"]
  },
  "Machine Learning": {
    shortLabel: "ML",
    sceneLabel: "Models",
    icon: BrainCircuit,
    color: "#7c3aed",
    darkColor: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.28)",
    summary: "Feature engineering, model training, RAG evaluation, drift monitoring, and inference APIs.",
    signals: ["MLflow", "Model monitoring", "RAG evaluation"]
  }
};
function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let nodes = [];
    const pointer = { x: 0, y: 0, active: false };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createNodes = () => {
      const count = Math.min(78, Math.max(42, Math.floor((width * height) / 18000)));
      nodes = Array.from({ length: count }, (_, index) => ({
        x: (index * 137.5) % width,
        y: (index * 91.7) % height,
        vx: ((index % 5) - 2) * 0.07,
        vy: (((index + 2) % 5) - 2) * 0.055,
        size: 2 + (index % 3),
        phase: index * 0.37
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    };

    const movePointer = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const clearPointer = () => {
      pointer.active = false;
    };

    const draw = (time = 0) => {
      const dark = document.documentElement.classList.contains("dark");
      const edgeColor = dark ? "rgba(125, 211, 252, 0.2)" : "rgba(14, 116, 144, 0.16)";
      const activeEdgeColor = dark ? "rgba(52, 211, 153, 0.42)" : "rgba(5, 150, 105, 0.32)";
      const nodeColor = dark ? "rgba(167, 243, 208, 0.72)" : "rgba(15, 118, 110, 0.48)";
      const sparkColor = dark ? "rgba(251, 191, 36, 0.68)" : "rgba(124, 58, 237, 0.4)";

      context.clearRect(0, 0, width, height);

      context.save();
      context.translate((time * 0.006) % 56, 0);
      context.strokeStyle = dark ? "rgba(148, 163, 184, 0.045)" : "rgba(15, 23, 42, 0.05)";
      context.lineWidth = 1;
      for (let x = -80; x < width + 80; x += 56) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x - height * 0.18, height);
        context.stroke();
      }
      context.restore();

      nodes.forEach((node) => {
        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 155) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const pointerDistance = pointer.active ? Math.hypot(midX - pointer.x, midY - pointer.y) : 9999;
            context.strokeStyle = pointerDistance < 180 ? activeEdgeColor : edgeColor;
            context.lineWidth = pointerDistance < 180 ? 1.35 : 0.8;
            context.globalAlpha = 1 - distance / 170;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      context.globalAlpha = 1;
      nodes.forEach((node, index) => {
        const pulse = reducedMotion ? 0 : Math.sin(time * 0.002 + node.phase) * 0.9;
        const pointerDistance = pointer.active ? Math.hypot(node.x - pointer.x, node.y - pointer.y) : 9999;
        const size = node.size + pulse + (pointerDistance < 140 ? 2 : 0);
        context.fillStyle = pointerDistance < 140 ? sparkColor : nodeColor;
        context.fillRect(node.x - size / 2, node.y - size / 2, size, size);

        if (index % 7 === 0 && !reducedMotion) {
          const next = nodes[(index + 5) % nodes.length];
          const progress = (time * 0.00008 + index * 0.071) % 1;
          context.fillStyle = sparkColor;
          context.fillRect(
            node.x + (next.x - node.x) * progress - 2,
            node.y + (next.y - node.y) * progress - 2,
            4,
            4
          );
        }
      });

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    if (reducedMotion) {
      draw();
    } else {
      animationFrame = window.requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", movePointer);
    window.addEventListener("pointerleave", clearPointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-100/85 via-white/55 to-transparent dark:from-slate-900 dark:via-slate-950/68" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-emerald-50/85 via-transparent to-transparent dark:from-emerald-950/22" />
    </div>
  );
}

function Navbar({ activeSection, isDark, setIsDark, recruiterMode, setRecruiterMode }) {
  const [open, setOpen] = useState(false);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const showRecruiterSummary = () => {
    setRecruiterMode(true);
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById("recruiter-summary")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/88 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/82">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => goTo("home")} className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white shadow-glow dark:bg-white dark:text-slate-950">
            RV
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-black text-slate-950 dark:text-white">Rithik Reddy Varla</span>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Data and ML Portfolio</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
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
            onClick={showRecruiterSummary}
            className={`hidden rounded-full px-4 py-2 text-sm font-black transition sm:inline-flex ${
              recruiterMode
                ? "bg-emerald-500 text-slate-950 shadow-glow"
                : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"
            }`}
          >
            Evidence Summary
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
                  className="rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={showRecruiterSummary}
                className="rounded-lg bg-emerald-500 px-4 py-3 text-left text-sm font-black text-slate-950"
              >
                Evidence Summary
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function TypingText() {
  const phrases = useMemo(
    () => ["Data Engineer", "Analytics Builder", "BI Developer", "ML Platform Builder"],
    []
  );
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [letters, setLetters] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const delay = deleting ? 38 : 74;
    const timer = setTimeout(() => {
      if (!deleting && letters === current.length) {
        setTimeout(() => setDeleting(true), 900);
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
    <span className="text-emerald-700 dark:text-emerald-300">
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
          id="recruiter-summary"
          className="mx-auto mt-24 max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-lg border border-emerald-300 bg-white/92 p-4 shadow-glow dark:border-emerald-400/25 dark:bg-black/62 dark:shadow-emerald-950/30">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="section-kicker">Evidence View</p>
                <h2 className="mt-2 max-w-sm text-2xl font-black leading-tight text-slate-950 dark:text-white">
                  Fast evidence map for serious data roles
                </h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[520px]">
                {recruiterHighlights.map((highlight) => (
                  <div key={highlight} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600 dark:text-emerald-300" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function ProofTicker() {
  return (
    <div className="proof-ticker mt-8 overflow-hidden border-y border-slate-200 bg-white/70 py-3 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="proof-ticker-track flex min-w-max gap-3">
        {[...proofTickerItems, ...proofTickerItems].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-black/40 dark:text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function EvidenceLedger() {
  return (
    <motion.div variants={sectionVariants} className="mt-8 grid gap-3 sm:grid-cols-3">
      {heroEvidence.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-slate-200 bg-white/82 p-4 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/[0.055]"
        >
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{item.label}</p>
          <div className="mt-3 text-4xl font-black leading-none text-slate-950 dark:text-white">{item.value}</div>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{item.note}</p>
        </div>
      ))}
    </motion.div>
  );
}

function SystemsCockpit({ activeRole, counts, setActiveRole }) {
  const activeVisual = roleVisuals[activeRole] ?? roleVisuals["Data Engineer"];
  const activeCount = counts.find((role) => role.label === activeRole)?.count ?? 0;

  return (
    <div className="systems-cockpit" data-testid="systems-cockpit">
      <div className="systems-cockpit-header">
        <span className="inline-flex items-center gap-2">
          <MousePointer2 size={14} /> Interactive Evidence Map
        </span>
        <span>{activeCount} repos in focus</span>
      </div>

      <div className="systems-cockpit-stage" style={{ "--active-color": activeVisual.darkColor }}>
        <svg className="systems-cockpit-lines" viewBox="0 0 680 440" role="img" aria-label="Data systems evidence map">
          <defs>
            <linearGradient id="activeFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor={activeVisual.darkColor} />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <path className="systems-grid-line" d="M68 76 H600" />
          <path className="systems-grid-line" d="M68 174 H600" />
          <path className="systems-grid-line" d="M68 272 H600" />
          <path className="systems-grid-line" d="M68 370 H600" />
          <path className="systems-grid-line" d="M116 52 V392" />
          <path className="systems-grid-line" d="M278 52 V392" />
          <path className="systems-grid-line" d="M438 52 V392" />
          <path className="systems-flow-line" d="M96 324 C170 250 214 198 288 198 S430 142 548 104" />
          <path className="systems-flow-line delay-one" d="M102 118 C198 142 236 266 330 272 S456 250 564 328" />
          <path className="systems-flow-line delay-two" d="M116 366 C198 360 254 314 326 238 S438 112 574 86" />
          <circle className="systems-packet" cx="96" cy="324" r="7" />
          <circle className="systems-packet delay-one" cx="102" cy="118" r="6" />
          <circle className="systems-packet delay-two" cx="116" cy="366" r="5" />
        </svg>

        <div className="systems-core-panel">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Portfolio Kernel</p>
          <h3>Data systems with inspectable proof</h3>
          <div className="mt-5 grid gap-3">
            {["Architecture", "Execution", "Tests", "Business output"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {counts.map((role, index) => {
          const visual = roleVisuals[role.label];
          const Icon = visual.icon;
          const isActive = role.label === activeRole;
          return (
            <button
              key={role.label}
              type="button"
              onClick={() => setActiveRole(role.label)}
              style={{ "--role-color": visual.darkColor, "--role-glow": visual.glow }}
              className={`systems-role-node node-${index + 1} ${isActive ? "is-active" : ""}`}
            >
              <span className="systems-role-icon"><Icon size={19} /></span>
              <span className="systems-role-copy">
                <span>{visual.shortLabel}</span>
                <strong>{role.label}</strong>
              </span>
              <span className="systems-role-count">{role.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RoleOrbitExperience({ activeRole, counts, onExploreRole, setActiveRole }) {
  const activeVisual = roleVisuals[activeRole] ?? roleVisuals["Data Engineer"];
  const activeCount = counts.find((role) => role.label === activeRole)?.count ?? 0;
  const ActiveIcon = activeVisual.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative"
    >
      <SystemsCockpit activeRole={activeRole} counts={counts} setActiveRole={setActiveRole} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          className="mt-4 rounded-lg border border-slate-200 bg-white/88 p-5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/78"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-3">
              <span
                style={{ "--role-glow": activeVisual.glow }}
                className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-slate-950 text-white shadow-[0_14px_35px_var(--role-glow)] dark:bg-white dark:text-slate-950"
              >
                <ActiveIcon size={21} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {activeCount} repositories mapped
                </p>
                <h3 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">{activeRole}</h3>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{activeVisual.summary}</p>
              </div>
            </div>
            <button
              onClick={() => onExploreRole(activeRole)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-black text-white transition hover:-translate-y-1 dark:bg-white dark:text-slate-950"
            >
              <Route size={16} /> Explore Projects
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeVisual.signals.map((signal) => (
              <span key={signal} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-white/10 dark:text-slate-200">
                {signal}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function Hero({ onRoleExplore }) {
  const [activeRole, setActiveRole] = useState("Data Engineer");
  const counts = useMemo(
    () =>
      roleTargets.map((role) => ({
        ...role,
        count: projects.filter((project) => project.roles.includes(role.label)).length
      })),
    []
  );

  return (
    <section id="home" className="mx-auto flex min-h-screen max-w-7xl scroll-mt-24 flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={sectionVariants} className="mb-5 inline-flex rounded-full border border-slate-300 bg-white/86 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-200">
            UCF M.S. Computer Science | Orlando, FL
          </motion.p>
          <motion.h1 variants={sectionVariants} className="max-w-5xl text-4xl font-black leading-[0.96] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            I build <span className="animated-gradient-text">data systems</span> you can inspect.
          </motion.h1>
          <motion.p variants={sectionVariants} className="mt-6 text-2xl font-black text-slate-700 dark:text-slate-200">
            Data Engineer | Data Scientist | ML Engineer
          </motion.p>
          <motion.p variants={sectionVariants} className="mt-3 max-w-2xl text-base font-bold leading-7 text-slate-600 dark:text-slate-300">
            Production-style projects across cloud pipelines, BI marts, ML monitoring, event-driven APIs, and AI evaluation systems.
          </motion.p>
          <motion.p variants={sectionVariants} className="mt-4 text-xl font-bold text-slate-600 dark:text-slate-300">
            Production-style data platforms built by a <TypingText />
          </motion.p>
          <motion.p variants={sectionVariants} className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            I designed this portfolio as a technical audit of my work: cloud data pipelines, analytics marts, BI specifications, ML lifecycle platforms, RAG evaluation, and model monitoring with repos that show the engineering behind each claim.
          </motion.p>
          <motion.div variants={sectionVariants} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-1 dark:bg-white dark:text-slate-950">
              <Target size={17} /> View Projects
            </a>
            <IconLink href={contactLinks.github} icon={Github} onClick={() => trackEvent("contact_click", { contact_method: "github" })}>GitHub</IconLink>
            <IconLink href={contactLinks.linkedin} icon={Linkedin} onClick={() => trackEvent("contact_click", { contact_method: "linkedin" })}>LinkedIn</IconLink>
          </motion.div>
          <EvidenceLedger />
        </motion.div>

        <RoleOrbitExperience
          activeRole={activeRole}
          counts={counts}
          onExploreRole={onRoleExplore}
          setActiveRole={setActiveRole}
        />
      </div>
      <ProofTicker />
    </section>
  );
}

function About() {
  return (
    <motion.section id="about" variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading kicker="Profile" title="Data engineering, data science, and ML engineering portfolio." />
        <div className="grid gap-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
          <p>
            I am a University of Central Florida M.S. Computer Science graduate with a 4.0 GPA and hands-on experience building data pipelines, analytical datasets, ML lifecycle platforms, model monitoring systems, and RAG evaluation workflows.
          </p>
          <p>
            My strongest fit is at the intersection of Data Engineer, Data Scientist, and ML Engineer responsibilities: designing reliable data foundations, engineering features, training and evaluating models, monitoring drift, and delivering production-ready APIs, dashboards, and documentation.
          </p>
          <div className="grid gap-3 rounded-lg border border-slate-200 bg-white/88 p-5 text-base shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Open to Roles</p>
            <div className="flex flex-wrap gap-2">
              {openToRoles.map((role) => (
                <span key={role} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-700 dark:bg-white/10 dark:text-slate-100">
                  {role}
                </span>
              ))}
            </div>
            <p className="font-bold text-slate-600 dark:text-slate-300">
              Orlando, FL | Open to remote, hybrid, and relocation-aligned data roles.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Education() {
  return (
    <section id="education" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading kicker="Education" title="Computer science foundation for data platforms." className="mb-8" />
      <div className="grid gap-5">
        {education.map((item) => (
          <motion.article
            key={`${item.school}-${item.degree}`}
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-lg border border-slate-200 bg-white/88 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="section-kicker">{item.status}</p>
                <h3 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{item.degree}</h3>
                <p className="mt-2 text-lg font-black text-slate-700 dark:text-slate-200">{item.school}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{item.location}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 dark:bg-white/10 dark:text-slate-100">
                  {item.period}
                </span>
                {item.gpa && (
                  <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">
                    {item.gpa}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-slate-600 dark:text-slate-300">
              {item.details.map((detail) => (
                <p key={detail} className="leading-8">{detail}</p>
              ))}
            </div>
            {item.coursework?.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Relevant Coursework</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.coursework.map((course) => (
                    <span key={course} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const [active, setActive] = useState(skillGroups[0].title);
  const selected = skillGroups.find((group) => group.title === active) ?? skillGroups[0];
  const Icon = selected.icon;

  return (
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading kicker="Skills" title="Stack organized by production responsibility." className="mb-8" />
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="grid gap-3">
          {skillGroups.map((group) => {
            const TabIcon = group.icon;
            return (
              <button
                key={group.title}
                onClick={() => setActive(group.title)}
                className={`flex items-center gap-3 rounded-lg border p-4 text-left transition ${
                  active === group.title
                    ? "border-emerald-400 bg-emerald-50 shadow-glow dark:bg-emerald-950/35"
                    : "border-slate-200 bg-white/78 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <TabIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                <span className="font-black text-slate-900 dark:text-white">{group.title}</span>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="rounded-lg border border-slate-200 bg-white/88 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10"
          >
            <Icon className="mb-5 h-10 w-10 text-emerald-600 dark:text-emerald-300" />
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">{selected.title}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {selected.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.035 }}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100"
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
      <SectionHeading kicker="Experience" title="Production-minded delivery and technical mentoring." className="mb-10" />
      <div className="relative grid gap-6">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-emerald-400 via-slate-300 to-transparent md:block dark:via-white/20" />
        {experiences.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, x: -26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="relative rounded-lg border border-slate-200 bg-white/88 p-6 shadow-xl shadow-slate-900/5 md:ml-16 dark:border-white/10 dark:bg-white/10"
            >
              <div className="absolute -left-[4.7rem] top-6 hidden h-12 w-12 place-items-center rounded-lg bg-slate-950 text-emerald-300 shadow-glow md:grid">
                <Icon size={22} />
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-950 dark:text-white">{item.company} - {item.role}</h3>
                  <p className="mt-1 text-sm font-black text-emerald-700 dark:text-emerald-300">{item.period}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-white/10 dark:text-slate-200">
                  {item.impact}
                </span>
              </div>
              <ul className="mt-5 grid gap-2 text-slate-600 dark:text-slate-300">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-emerald-600 dark:text-emerald-300" />
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

function ProjectCard({ project, active, onSelect }) {
  const tone = getRoleTone(project.primaryRole);

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className={`group flex min-h-[390px] flex-col rounded-lg border bg-white/90 p-5 shadow-xl shadow-slate-900/5 transition dark:bg-white/10 ${
        active ? `${tone.border} shadow-glow` : "border-slate-200 dark:border-white/10"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <Briefcase className={`h-8 w-8 ${tone.accent}`} />
        <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${tone.badge}`}>{project.primaryRole}</span>
      </div>
      <h3 className="mt-5 text-2xl font-black leading-tight text-slate-950 dark:text-white">{project.title}</h3>
      <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-300">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.roles.map((role) => (
          <span key={role} className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${getRoleTone(role).badge}`}>
            {role}
          </span>
        ))}
      </div>
      <div className="mt-5 grid gap-2">
        {project.metrics.map((metric) => (
          <span key={metric} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 dark:border-white/10 dark:text-slate-200">
            {metric}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.proof.slice(0, 3).map((item) => (
          <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-white/10 dark:text-slate-200">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={() => {
            trackEvent("project_open", { project_title: project.title });
            onSelect(project);
          }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-black text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
        >
          <Star size={16} /> Brief
        </button>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("project_github_click", { project_title: project.title })}
          aria-label={`Open ${project.title} on GitHub`}
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
        >
          <Github size={18} />
        </a>
      </div>
    </motion.article>
  );
}

function FeaturedSystems({ onSelect }) {
  const featuredProjects = featuredSystemTitles
    .map((title) => projects.find((project) => project.title === title))
    .filter(Boolean);

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Featured Systems</p>
          <h3 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">Start with the strongest proof.</h3>
        </div>
        <span className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-600 sm:inline-flex dark:bg-white/10 dark:text-slate-200">
          6 priority builds
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project) => {
          const tone = getRoleTone(project.primaryRole);
          return (
            <motion.button
              key={project.title}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                trackEvent("featured_project_open", { project_title: project.title });
                onSelect(project);
                requestAnimationFrame(() => {
                  document.getElementById("project-brief")?.scrollIntoView({ behavior: "smooth", block: "start" });
                });
              }}
              className={`rounded-lg border bg-white/90 p-5 text-left shadow-xl shadow-slate-900/5 transition dark:bg-white/10 ${tone.border}`}
            >
              <div className="flex items-center justify-between gap-3">
                <Star className={`h-5 w-5 ${tone.accent}`} />
                <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${tone.badge}`}>{project.primaryRole}</span>
              </div>
              <h4 className="mt-4 text-xl font-black leading-tight text-slate-950 dark:text-white">{project.title}</h4>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.metrics.slice(0, 2).map((metric) => (
                  <span key={metric} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-white/10 dark:text-slate-200">
                    {metric}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ProofMatrix() {
  return (
    <div className="mb-10 rounded-lg border border-slate-200 bg-white/88 p-5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Evidence Matrix</p>
          <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">What the project library proves.</h3>
        </div>
        <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-600 dark:bg-white/10 dark:text-slate-200">
          Architecture to delivery
        </span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {proofSignals.map((signal) => {
          const Icon = signal.icon;
          return (
            <div key={signal.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/45">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                <h4 className="font-black text-slate-950 dark:text-white">{signal.label}</h4>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{signal.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectBrief({ project }) {
  if (!project) return null;
  const tone = getRoleTone(project.primaryRole);

  return (
    <aside id="project-brief" className={`sticky top-24 scroll-mt-24 rounded-lg border bg-white/92 p-6 shadow-2xl shadow-slate-900/10 dark:bg-slate-900/90 ${tone.border}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Selected Brief</p>
          <h3 className="mt-2 text-3xl font-black leading-tight text-slate-950 dark:text-white">{project.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${tone.badge}`}>{project.primaryRole}</span>
      </div>
      <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">{project.recruiterRead}</p>
      <div className="mt-6 grid gap-3">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Proof Points</p>
        {project.proof.map((item) => (
          <div key={item} className="flex gap-3 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700 dark:bg-white/5 dark:text-slate-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600 dark:text-emerald-300" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Tech Stack</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-white/10 dark:text-slate-200">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-6 leading-7 text-slate-600 dark:text-slate-300">{project.details}</p>
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("project_github_click", { project_title: project.title })}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 dark:bg-white dark:text-slate-950"
      >
        <ExternalLink size={17} /> Open GitHub Repo
      </a>
    </aside>
  );
}

function Projects({ filter, setFilter }) {
  const [query, setQuery] = useState("");
  const [activeProject, setActiveProject] = useState(projects[0]);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesRole = filter === "All" || project.roles.includes(filter);
      const searchText = [
        project.title,
        project.summary,
        project.recruiterRead,
        project.primaryRole,
        ...project.roles,
        ...project.tech,
        ...project.metrics,
        ...project.proof
      ]
        .join(" ")
        .toLowerCase();
      return matchesRole && (!normalized || searchText.includes(normalized));
    });
  }, [filter, query]);

  const projectCounts = useMemo(
    () =>
      projectFilters.map((item) => ({
        label: item,
        count: item === "All" ? projects.length : projects.filter((project) => project.roles.includes(item)).length
      })),
    []
  );

  const selectedProject = filteredProjects.find((project) => project.title === activeProject?.title) ?? filteredProjects[0] ?? null;

  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <SectionHeading kicker="Project Library" title="Seventeen public repositories, organized by role and evidence." />
        <div className="grid gap-3">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search projects"
              placeholder="Search projects, tools, cloud platforms, or outcomes"
              className="w-full rounded-full border border-slate-200 bg-white/90 py-3 pl-11 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:focus:ring-emerald-950"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {projectCounts.map((item) => (
              <button
                key={item.label}
                onClick={() => setFilter(item.label)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition ${
                  filter === item.label
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:-translate-y-0.5 dark:bg-white/10 dark:text-slate-200 dark:ring-white/10"
                }`}
              >
                <Filter size={15} /> {item.label} <span className="opacity-70">{item.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <FeaturedSystems onSelect={setActiveProject} />
      <ProofMatrix />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div layout className="grid gap-5 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              active={selectedProject?.title === project.title}
              onSelect={setActiveProject}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="rounded-lg border border-slate-200 bg-white/88 p-6 text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
              No project matches this search.
            </div>
          )}
        </motion.div>
        <ProjectBrief project={selectedProject} />
      </div>
    </section>
  );
}

function Metrics() {
  const [active, setActive] = useState(metrics[0].label);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading kicker="Portfolio Signals" title="High-signal proof points for fast screening." className="mb-8" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isActive = active === metric.label;
          return (
            <motion.button
              key={metric.label}
              onClick={() => setActive(metric.label)}
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -5 }}
              className={`rounded-lg border p-6 text-left transition ${
                isActive
                  ? "border-emerald-400 bg-emerald-50 shadow-glow dark:bg-emerald-950/35"
                  : "border-slate-200 bg-white/88 dark:border-white/10 dark:bg-white/10"
              }`}
            >
              <Icon className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
              <div className="mt-5 text-4xl font-black text-slate-950 dark:text-white">{metric.value}</div>
              <div className="mt-2 text-sm font-black text-slate-600 dark:text-slate-300">{metric.label}</div>
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
      <div className="rounded-lg border border-slate-200 bg-white/88 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10">
        <p className="section-kicker">Certifications</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {certifications.map((certification) => (
            <div key={certification} className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 font-black text-slate-800 dark:bg-slate-950/50 dark:text-white">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
              {certification}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [review, setReview] = useState({
    name: "",
    role: "",
    contact: "",
    rating: 5,
    message: "",
    quotePermission: true
  });
  const [attempted, setAttempted] = useState(false);
  const isValid = review.name.trim() && review.message.trim().length >= 20;

  const submitReview = (event) => {
    event.preventDefault();
    setAttempted(true);
    if (!isValid) return;

    const subject = encodeURIComponent(`Portfolio review from ${review.name.trim()}`);
    const body = encodeURIComponent(
      [
        "Portfolio Visitor Review",
        "",
        `Name: ${review.name.trim()}`,
        `Role / Company: ${review.role.trim() || "Not provided"}`,
        `Email or LinkedIn: ${review.contact.trim() || "Not provided"}`,
        `Rating: ${review.rating}/5`,
        `Permission to Quote: ${review.quotePermission ? "Yes" : "No"}`,
        "",
        "Review:",
        review.message.trim(),
        "",
        `Submitted from: ${window.location.href}`,
        `Submitted at: ${new Date().toISOString()}`
      ].join("\n")
    );

    trackEvent("portfolio_review_submit", { rating: review.rating });
    window.location.href = `mailto:${contactLinks.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="reviews" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading kicker="Visitor Review" title="Leave a short review if this portfolio was useful." />
          <div className="mt-8 rounded-lg border border-slate-200 bg-white/88 p-5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="mt-1 h-6 w-6 flex-none text-emerald-600 dark:text-emerald-300" />
              <div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">Review tracker</h3>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  Reviews sent from this page are formatted for an Excel tracker, so feedback can be saved and reviewed later.
                </p>
                <a
                  href={reviewWorkbookHref}
                  download
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-800 transition hover:-translate-y-1 dark:border-white/15 dark:bg-white/10 dark:text-white"
                >
                  <Download size={16} /> Download tracker
                </a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submitReview} className="rounded-lg border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">Name</span>
              <input
                value={review.name}
                onChange={(event) => setReview({ ...review, name: event.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-950"
                placeholder="Your name"
              />
              {attempted && !review.name.trim() && <span className="mt-1 block text-sm font-semibold text-rose-500">Name is required</span>}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">Role / Company</span>
              <input
                value={review.role}
                onChange={(event) => setReview({ ...review, role: event.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-950"
                placeholder="Hiring manager / Company"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">Email or LinkedIn</span>
            <input
              value={review.contact}
              onChange={(event) => setReview({ ...review, contact: event.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-950"
              placeholder="Optional"
            />
          </label>

          <div className="mt-5">
            <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">Rating</span>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setReview({ ...review, rating })}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-black transition ${
                    review.rating === rating
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                      : "bg-slate-100 text-slate-600 hover:-translate-y-0.5 dark:bg-white/10 dark:text-slate-200"
                  }`}
                  aria-label={`${rating} star rating`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">Review</span>
            <textarea
              value={review.message}
              onChange={(event) => setReview({ ...review, message: event.target.value })}
              rows="5"
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-950"
              placeholder="What stood out about the portfolio?"
            />
            {attempted && review.message.trim().length < 20 && <span className="mt-1 block text-sm font-semibold text-rose-500">Review needs at least 20 characters</span>}
          </label>

          <label className="mt-4 flex items-start gap-3 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700 dark:bg-white/5 dark:text-slate-200">
            <input
              type="checkbox"
              checked={review.quotePermission}
              onChange={(event) => setReview({ ...review, quotePermission: event.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600"
            />
            <span>You may quote this review on the portfolio or LinkedIn.</span>
          </label>

          <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 dark:bg-white dark:text-slate-950">
            <MessageSquare size={17} /> Send Review
          </button>
          {attempted && isValid && (
            <p className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm font-black text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">
              Your email app should open with the review ready to send.
            </p>
          )}
        </form>
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
    if (!isValid) return;

    const subject = encodeURIComponent(`Portfolio contact from ${form.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nMessage:\n${form.message.trim()}`
    );

    trackEvent("contact_form_submit", { contact_method: "mailto" });
    window.location.href = `mailto:${contactLinks.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading kicker="Contact" title="Available for data engineering, data science, and ML engineering roles." />
          <div className="mt-8 grid gap-3 text-slate-600 dark:text-slate-300">
            <a href={`mailto:${contactLinks.email}`} onClick={() => trackEvent("contact_click", { contact_method: "email" })} className="contact-link"><Mail size={18} /> {contactLinks.email}</a>
            <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" onClick={() => trackEvent("contact_click", { contact_method: "linkedin" })} className="contact-link"><Linkedin size={18} /> LinkedIn</a>
            <a href={contactLinks.github} target="_blank" rel="noreferrer" onClick={() => trackEvent("contact_click", { contact_method: "github" })} className="contact-link"><Github size={18} /> GitHub</a>
            <span className="contact-link"><MapPin size={18} /> {contactLinks.location}</span>
          </div>
        </div>
        <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/10">
          {["name", "email"].map((field) => (
            <label key={field} className="mb-4 block">
              <span className="mb-2 block text-sm font-black capitalize text-slate-700 dark:text-slate-200">{field}</span>
              <input
                value={form[field]}
                onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-950"
                placeholder={field === "email" ? "hiring.manager@company.com" : "Your name"}
              />
              {submitted && errors[field] && <span className="mt-1 block text-sm font-semibold text-rose-500">{errors[field]}</span>}
            </label>
          ))}
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">Message</span>
            <textarea
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              rows="5"
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:ring-emerald-950"
              placeholder="I am hiring for a data role..."
            />
            {submitted && errors.message && <span className="mt-1 block text-sm font-semibold text-rose-500">{errors.message}</span>}
          </label>
          <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950" disabled={submitted && !isValid}>
            <Send size={17} /> Send Message
          </button>
          {submitted && isValid && <p className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm font-black text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200">Your email app should open with the message ready to send. If it does not open, email me directly at {contactLinks.email}.</p>}
        </form>
      </div>
    </section>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [recruiterMode, setRecruiterMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [projectFilter, setProjectFilter] = useState("All");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const exploreRoleProjects = (role) => {
    setProjectFilter(role);
    requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

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
      <motion.div className="fixed left-0 right-0 top-0 z-[80] h-1 origin-left bg-emerald-400" style={{ scaleX }} />
      <Navbar activeSection={activeSection} isDark={isDark} setIsDark={setIsDark} recruiterMode={recruiterMode} setRecruiterMode={setRecruiterMode} />
      <main>
        <Hero onRoleExplore={exploreRoleProjects} />
        <RecruiterPanel recruiterMode={recruiterMode} />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects filter={projectFilter} setFilter={setProjectFilter} />
        <Metrics />
        <Certifications />
        <Reviews />
        <Contact />
      </main>
      <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400">
        Built for hiring teams evaluating data engineering, data science, and ML engineering work.
      </footer>
    </>
  );
}
