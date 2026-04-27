import {
  Award,
  BarChart3,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  LineChart,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

export const recruiterHighlights = [
  "4.0 GPA M.S. Computer Science candidate at UCF",
  "Production data engineering experience across AWS, Snowflake, SQL, Python, and PySpark",
  "Owns full ETL/ELT delivery: modeling, quality checks, monitoring, and BI enablement",
  "Quantified impact across reliability, error reduction, throughput, and mentoring"
];

export const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    skills: ["Python", "SQL", "Java", "PySpark"]
  },
  {
    title: "Data Engineering",
    icon: Workflow,
    skills: ["ETL/ELT", "Data Modeling", "Data Quality", "Pipeline Design"]
  },
  {
    title: "Big Data",
    icon: Network,
    skills: ["Spark", "Kafka", "Airflow", "Delta Lake"]
  },
  {
    title: "Cloud",
    icon: Cloud,
    skills: ["AWS S3", "Glue", "Lambda", "Redshift", "EMR", "Snowflake"]
  },
  {
    title: "Analytics",
    icon: LineChart,
    skills: ["Pandas", "NumPy", "Power BI", "Tableau"]
  },
  {
    title: "Tools",
    icon: ShieldCheck,
    skills: ["Git", "Docker", "CI/CD", "Troubleshooting"]
  }
];

export const experiences = [
  {
    role: "Data Engineer 1",
    company: "Asset Care",
    period: "Production Data Platforms",
    icon: Database,
    impact: "Supported systems processing 2M+ records/day with stronger operational reliability.",
    bullets: [
      "Built and optimized Python, SQL, PySpark, AWS, and Snowflake data pipelines.",
      "Improved workflow efficiency by 30% through automation and pipeline tuning.",
      "Reduced recurring data errors by 15% with validation, monitoring, and quality checks."
    ]
  },
  {
    role: "Data Engineer",
    company: "Asset Care",
    period: "Cloud Data Engineering",
    icon: Cloud,
    impact: "Improved pipeline reliability by 20% through ownership of ETL/ELT workflows.",
    bullets: [
      "Modeled curated datasets for analytics and reporting use cases.",
      "Troubleshot batch and cloud pipeline failures across data ingestion and transformation.",
      "Collaborated with analytics stakeholders to improve trust in production datasets."
    ]
  },
  {
    role: "Data Engineer Intern",
    company: "Synycs Group",
    period: "Data Platform Foundations",
    icon: BriefcaseBusiness,
    impact: "Delivered analytics-ready datasets using Python, SQL, and data quality practices.",
    bullets: [
      "Created repeatable ingestion and transformation workflows.",
      "Documented data logic and improved handoff quality for downstream users.",
      "Supported BI reporting through cleaned, validated, and modeled datasets."
    ]
  },
  {
    role: "Graduate Teaching Assistant",
    company: "University of Central Florida",
    period: "M.S. Computer Science",
    icon: GraduationCap,
    impact: "Mentored 150+ students while maintaining a 4.0 GPA in graduate coursework.",
    bullets: [
      "Supported instruction, grading, and technical mentoring for computer science students.",
      "Explained programming and data concepts with clarity for diverse learning styles.",
      "Balanced academic excellence with professional data engineering growth."
    ]
  }
];

export const projectFilters = ["All", "Data Engineer", "Data Analyst", "BI Analyst"];

export const projects = [
  {
    title: "Cloud-Native Retail Lakehouse",
    roles: ["Data Engineer", "BI Analyst"],
    github: "https://github.com/rithikreddyvarla19/Bi-analytics-project",
    summary: "AWS lakehouse pipeline for retail analytics with automated quality checks and Redshift-ready modeled data.",
    metrics: ["500K+ records/day", "25+ quality checks", "35% latency reduction"],
    tech: ["AWS S3", "Glue", "Redshift", "Lambda", "PySpark"],
    details:
      "Designed a cloud-native ingestion and transformation workflow that lands, validates, transforms, and publishes analytics-ready retail data for BI consumption."
  },
  {
    title: "Customer Growth Analytics Platform",
    roles: ["Data Analyst", "BI Analyst"],
    github: "https://github.com/rithikreddyvarla19/customer-growth-analytics-platform",
    summary: "Analytics platform for cohort behavior, funnel performance, segmentation, churn, retention, and LTV.",
    metrics: ["Cohort analysis", "Funnel insights", "Retention modeling"],
    tech: ["SQL", "Python", "Pandas", "Analytics"],
    details:
      "Built analysis workflows that convert raw customer events into growth metrics, behavioral segments, and decision-ready retention views."
  },
  {
    title: "AWS Snowflake Production Pipeline",
    roles: ["Data Engineer", "Cloud Data Engineer"],
    github: "",
    summary: "Production-style ETL/ELT ownership across AWS and Snowflake with reliability, troubleshooting, and data modeling focus.",
    metrics: ["20% reliability lift", "15% fewer errors", "ELT ownership"],
    tech: ["Python", "SQL", "AWS", "Snowflake"],
    details:
      "Owned pipeline troubleshooting and reliability improvements for cloud data workflows, emphasizing resilient transformations and trustworthy modeled datasets."
  }
];

export const metrics = [
  { label: "Records/day processed", value: "2M+", icon: Database },
  { label: "Pipeline throughput", value: "500K+", icon: Workflow },
  { label: "Performance improvement", value: "30%", icon: Sparkles },
  { label: "Quality checks", value: "25+", icon: ShieldCheck },
  { label: "Students mentored", value: "150+", icon: GraduationCap },
  { label: "Graduate GPA", value: "4.0", icon: Award }
];

export const certifications = ["AWS Cloud Foundations", "AWS Architecting", "Python for Data Science"];

export const contactLinks = {
  email: "rithik.reddy.varla@example.com",
  linkedin: "https://www.linkedin.com/in/rithik-reddy-varla",
  github: "https://github.com/rithikreddyvarla19",
  location: "Orlando, FL"
};

export const roleTargets = ["Data Engineer", "Cloud Data Engineer", "Business Intelligence Analyst", "Data Analyst", "Analytics Engineer"];
