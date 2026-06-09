import {
  Award,
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
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" }
];

export const recruiterHighlights = [
  "M.S. Computer Science graduate from UCF with a 4.0 GPA",
  "Production data engineering experience across Python, SQL, PySpark, AWS, Snowflake, and BI delivery",
  "Project portfolio spans cloud pipelines, feature engineering, model training, ML monitoring, RAG evaluation, and analytics outputs",
  "Repositories include runbooks, tests, CI/CD, infrastructure scaffolds, APIs, dashboards, and technical documentation"
];

export const roleTargets = [
  {
    label: "Data Engineer",
    summary: "Cloud pipelines, lakehouse layers, orchestration, quality gates, and warehouse-ready data products.",
    proof: ["AWS, Azure, GCP", "PySpark and Beam", "Airflow, dbt, Terraform"]
  },
  {
    label: "Data Analytics",
    summary: "Analytical workflows that move from messy source data to KPIs, cohorts, segmentation, and recommendations.",
    proof: ["SQL and Python", "Cohorts and funnels", "Executive summaries"]
  },
  {
    label: "BI Analyst",
    summary: "Gold marts, dashboard specifications, KPI definitions, DAX-ready measures, and stakeholder reporting.",
    proof: ["Power BI and Tableau specs", "Semantic models", "Dashboard extracts"]
  },
  {
    label: "Machine Learning",
    summary: "Data science and ML engineering work across feature design, model training, evaluation, deployment, monitoring, and RAG systems.",
    proof: ["MLflow and SageMaker", "FastAPI scoring", "RAG and AI monitoring"]
  }
];

export const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    skills: ["Python", "SQL", "Java", "JavaScript", "PySpark"]
  },
  {
    title: "Data Engineering",
    icon: Workflow,
    skills: ["ETL/ELT", "Lakehouse Design", "Data Modeling", "Data Quality", "Pipeline Orchestration"]
  },
  {
    title: "Cloud Platforms",
    icon: Cloud,
    skills: ["AWS", "Azure Databricks", "Google Cloud", "Snowflake", "BigQuery", "Redshift"]
  },
  {
    title: "Analytics and BI",
    icon: LineChart,
    skills: ["Power BI", "Tableau", "KPI Design", "Cohort Analysis", "Dashboard Specs", "Stakeholder Reporting"]
  },
  {
    title: "Machine Learning",
    icon: Sparkles,
    skills: ["MLflow", "SageMaker", "RAG Evaluation", "Drift Detection", "XGBoost", "Model Monitoring"]
  },
  {
    title: "Delivery",
    icon: ShieldCheck,
    skills: ["Docker", "Terraform", "GitHub Actions", "FastAPI", "Streamlit", "Testing"]
  }
];

export const experiences = [
  {
    role: "Graduate Teaching Assistant",
    company: "University of Central Florida",
    period: "M.S. Computer Science",
    icon: GraduationCap,
    impact: "Mentored 150+ students while maintaining a 4.0 GPA in graduate coursework.",
    bullets: [
      "Supported instruction, grading, and technical mentoring for computer science students.",
      "Explained programming, database, and data concepts for students with different technical backgrounds.",
      "Balanced graduate coursework, teaching responsibilities, and production-grade portfolio delivery."
    ]
  },
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
      "Partnered with analytics stakeholders to improve trust in production datasets."
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
  }
];

export const education = [
  {
    degree: "M.S. in Computer Science",
    school: "University of Central Florida",
    location: "Orlando, Florida",
    status: "Graduate Degree",
    period: "Aug 2024 - May 2026",
    gpa: "GPA: 4.0/4.0",
    coursework: [
      "Database Systems",
      "Data Mining",
      "Big Data Analytics",
      "Machine Learning",
      "Cloud Data Platforms",
      "Data Warehousing",
      "Data Visualization",
      "Distributed Data Processing"
    ],
    details: [
      "Completed graduate study focused on scalable data systems, analytics pipelines, machine learning foundations, and cloud data platforms.",
      "Coursework and project delivery connect computer science fundamentals with production-minded data engineering, data science, and ML engineering execution."
    ]
  },
  {
    degree: "B.Tech in Computer Science & Engineering (IoT)",
    school: "GITAM University",
    location: "Hyderabad, India",
    status: "Undergraduate Degree",
    period: "Aug 2020 - May 2024",
    gpa: "",
    coursework: [
      "Database Management Systems",
      "Data Structures",
      "Python Programming",
      "Internet of Things",
      "Cloud Computing",
      "Data Analytics",
      "Computer Networks",
      "Software Engineering"
    ],
    details: [
      "Computer science foundation with coursework across databases, cloud computing, analytics, networks, and software engineering.",
      "IoT concentration supported practical work with data collection, system design, and connected-device architectures."
    ]
  }
];

export const projectFilters = ["All", "Data Engineer", "Data Analytics", "BI Analyst", "Machine Learning"];

export const projects = [
  {
    title: "Cloud-Native Retail Lakehouse",
    primaryRole: "Data Engineer",
    roles: ["Data Engineer", "BI Analyst"],
    github: "https://github.com/rithikreddyvarla19/Bi-analytics-project",
    summary: "AWS-ready retail lakehouse with batch and streaming ingestion, bronze/silver/gold layers, dbt marts, Airflow orchestration, and BI-ready outputs.",
    recruiterRead: "Shows end-to-end ownership of ingestion, modeling, quality, warehouse serving, orchestration, and reporting outputs.",
    metrics: ["Batch + streaming", "25+ quality checks", "BI-ready extracts"],
    tech: ["Python", "SQL", "PySpark", "Airflow", "dbt", "AWS", "Terraform"],
    proof: ["Medallion lakehouse", "PostgreSQL/Redshift serving layer", "Observability artifacts"],
    details:
      "Built a production-style retail data platform that lands raw ecommerce data, standardizes it through lakehouse layers, creates fact and dimension marts, validates quality, and exports KPI files for BI tools."
  },
  {
    title: "GCP Batch and Streaming Pipeline",
    primaryRole: "Data Engineer",
    roles: ["Data Engineer", "BI Analyst"],
    github: "https://github.com/rithikreddyvarla19/Real-Time-Data-Pipeline-on-Google-Cloud-Batch-Streaming",
    summary: "Google Cloud clickstream pipeline with local simulation, Pub/Sub and Dataflow production mapping, BigQuery schemas, Cloud SQL serving, lineage, and monitoring.",
    recruiterRead: "Strong signal for cloud data engineering because it covers both local reproducibility and a production GCP deployment path.",
    metrics: ["Batch + streaming modes", "Dead-letter quarantine", "Lineage audit records"],
    tech: ["Python", "Apache Beam", "Pub/Sub", "BigQuery", "Cloud SQL", "GCS", "Terraform"],
    proof: ["Dataflow-ready transforms", "Partitioned analytics schemas", "Monitoring docs"],
    details:
      "Implements an ecommerce clickstream platform that validates and enriches timestamped events, writes raw/cleaned/curated/analytics layers, emits dead-letter records, and maps the workflow to Pub/Sub, Dataflow, BigQuery, Cloud SQL, and Cloud Storage."
  },
  {
    title: "Azure Databricks Customer Analytics Platform",
    primaryRole: "Data Engineer",
    roles: ["Data Engineer", "Data Analytics", "BI Analyst"],
    github: "https://github.com/rithikreddyvarla19/azure-databricks-customer-analytics-platform",
    summary: "Azure Databricks lakehouse simulation for customer, transaction, product, support, and web activity data with Gold marts for Power BI.",
    recruiterRead: "Demonstrates medallion architecture, API ingestion, quarantine logic, customer 360 modeling, and dashboard-ready semantic design.",
    metrics: ["Bronze/Silver/Gold", "5 synthetic sources", "Power BI measures"],
    tech: ["Python", "PySpark-ready", "FastAPI", "Parquet", "SQL", "Docker", "Terraform"],
    proof: ["Customer 360 summary", "Gold analytics marts", "Runbook and data dictionary"],
    details:
      "Generates synthetic customer data, ingests from files and a mock REST API, applies Bronze-Silver-Gold transformations, quarantines invalid records, and publishes Gold datasets designed for Power BI dashboards."
  },
  {
    title: "AWS Snowflake ML Lifecycle Platform",
    primaryRole: "Machine Learning",
    roles: ["Machine Learning", "Data Engineer"],
    github: "https://github.com/rithikreddyvarla19/aws-snowflake-ml-lifecycle-platform",
    summary: "Machine learning lifecycle platform for churn prediction with multi-source ingestion, PySpark ETL, Snowflake feature storage, MLflow, SageMaker, monitoring, and retraining orchestration.",
    recruiterRead: "Connects data engineering, feature engineering, experiment tracking, deployment, monitoring, and retraining in one production-oriented system.",
    metrics: ["Champion model selection", "Drift monitoring", "Airflow retraining policy"],
    tech: ["AWS Glue", "Snowflake", "PySpark", "MLflow", "SageMaker", "FastAPI", "Airflow"],
    proof: ["Feature store contracts", "Model registry hooks", "Terraform templates"],
    details:
      "Covers ingestion, quality validation, feature engineering, candidate model training, hyperparameter optimization, MLflow tracking, champion selection, SageMaker deployment, FastAPI inference, drift detection, and retraining policies."
  },
  {
    title: "AI Data Quality Monitoring Framework",
    primaryRole: "Machine Learning",
    roles: ["Machine Learning", "Data Engineer"],
    github: "https://github.com/rithikreddyvarla19/ai-data-quality-monitoring-framework",
    summary: "Enterprise monitoring framework for data quality, dataset integrity, drift, model health, and AI system performance across ML and generative AI workloads.",
    recruiterRead: "High-value MLOps signal: quality checks, drift metrics, GPT monitoring, model health, alerting, API workflows, dashboarding, and persistence.",
    metrics: ["PSI/KS/JSD drift", "GPT quality metrics", "FastAPI + Streamlit"],
    tech: ["Python", "FastAPI", "Streamlit", "PostgreSQL", "Docker", "pytest", "CI/CD"],
    proof: ["Validation engine", "Alert routing", "Monitoring API"],
    details:
      "Implements reusable checks for schema, nulls, duplicates, ranges, drift, leakage, model metrics, GPT response quality, latency, retrieval overlap, and alert routing with API and dashboard surfaces."
  },
  {
    title: "LLM RAG Evaluation Platform",
    primaryRole: "Machine Learning",
    roles: ["Machine Learning", "Data Engineer"],
    github: "https://github.com/rithikreddyvarla19/llm-rag-evaluation-platform",
    summary: "RAG knowledge assistant for 50K+ technical documents with ingestion, chunking, embeddings, FAISS search, source-linked responses, MLflow evaluation, feedback storage, and monitoring dashboard.",
    recruiterRead: "Shows modern AI application depth: RAG architecture, evaluation metrics, prompt experiments, telemetry, and deployment scaffolding.",
    metrics: ["50K+ document target", "Top-3 accuracy", "Hallucination tracking"],
    tech: ["Python", "FastAPI", "FAISS", "MLflow", "PostgreSQL", "Streamlit", "AWS ECS"],
    proof: ["Ground-truth validation", "Prompt comparison", "Feedback loop"],
    details:
      "Builds a retrieval-augmented assistant that loads documents, chunks content, creates embeddings, indexes vectors, serves answers through FastAPI, evaluates faithfulness and relevance, stores feedback, and visualizes monitoring metrics."
  },
  {
    title: "Wealth Client Retention Platform",
    primaryRole: "Machine Learning",
    roles: ["Machine Learning", "BI Analyst"],
    github: "https://github.com/rithikreddyvarla19/wealth-client-retention-platform",
    summary: "Financial services ML platform for retention risk, asset consolidation opportunity scoring, advisor recommendations, explainability, monitoring, API scoring, and advisor dashboarding.",
    recruiterRead: "Combines domain-aware feature engineering, model training, explainability, real-time scoring, and business-facing recommendations.",
    metrics: ["Retention risk score", "AUM trend features", "Advisor action engine"],
    tech: ["PySpark", "Snowflake SQL", "MLflow", "XGBoost", "LightGBM", "FastAPI", "Streamlit"],
    proof: ["SHAP explainability", "SageMaker helper", "Advisor dashboard"],
    details:
      "Combines CRM, AUM, transactions, advisor interactions, marketing engagement, and demographics to generate risk tiers, top drivers, consolidation opportunities, and recommended advisor interventions."
  },
  {
    title: "Customer Growth Analytics Platform",
    primaryRole: "Data Analytics",
    roles: ["Data Analytics", "BI Analyst"],
    github: "https://github.com/rithikreddyvarla19/customer-growth-analytics-platform",
    summary: "End-to-end analytics project for acquisition, conversion, retention, churn, revenue, campaign ROI, segmentation, dashboard extracts, and executive-ready outputs.",
    recruiterRead: "A clean analyst work sample: source data to SQL/Python analysis, KPIs, cohorts, segmentation, visuals, and stakeholder outputs.",
    metrics: ["6,000 customers", "24.03% churn rate", "4.81x ROI proxy"],
    tech: ["SQL", "Python", "Pandas", "NumPy", "SciPy", "SQLite", "Excel"],
    proof: ["Cohort analysis", "Dashboard-ready files", "KPI definitions"],
    details:
      "Generates synthetic subscription and ecommerce data, cleans and validates it, loads SQLite analysis tables, runs SQL and Python analytics, exports KPI summaries, dashboard extracts, Excel workbooks, visuals, and business insight documentation."
  },
  {
    title: "Child Welfare India Analytics",
    primaryRole: "Data Analytics",
    roles: ["Data Analytics", "BI Analyst"],
    github: "https://github.com/rithikreddyvarla19/child-welfare-india-analytics",
    summary: "Public-sector analytics workflow using 10,000 synthetic case records for data quality, KPI reporting, visuals, dashboard planning, and stakeholder-ready recommendations.",
    recruiterRead: "Signals strong reporting discipline: synthetic data generation, cleaning rules, KPI methodology, dashboard guide, and executive summaries.",
    metrics: ["10,000 raw records", "9,771 clean records", "58.44% follow-up completion"],
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter", "CSV"],
    proof: ["Data dictionary", "KPI definitions", "Stakeholder report"],
    details:
      "Creates controlled synthetic child welfare support data, cleans duplicates and inconsistent labels, calculates operational KPIs, produces visuals, and documents insights for program review and dashboard planning."
  },
  {
    title: "OPT-In Family Services Dashboard",
    primaryRole: "BI Analyst",
    roles: ["BI Analyst", "Data Analytics"],
    github: "https://github.com/rithikreddyvarla19/optin-family-services-data-dashboard",
    summary: "Family services data quality and outcomes dashboard work sample with referral cleaning, operational KPIs, chart outputs, reports, and BI dashboard specifications.",
    recruiterRead: "A compact BI and research analytics sample built around data quality, operational metrics, and non-technical stakeholder deliverables.",
    metrics: ["774 raw rows", "Referral KPIs", "Power BI/Tableau specs"],
    tech: ["Python", "Pandas", "Jupyter", "Matplotlib", "BI Specs"],
    proof: ["Data quality report", "Executive summary", "Dashboard mockup"],
    details:
      "Generates realistic referral data, validates outreach and service fields, calculates program KPIs, produces charts, and writes dashboard and reporting artifacts for family support program monitoring."
  },
  {
    title: "Data Engineering Universe",
    primaryRole: "Data Engineer",
    roles: ["Data Engineer"],
    github: "https://github.com/rithikreddyvarla19/data-engineering-universe",
    summary: "Full-stack data engineering mastery platform with Next.js, FastAPI, PostgreSQL, Redis, OpenAI-ready tutoring, curriculum seed data, Docker, and Kubernetes manifests.",
    recruiterRead: "Adds product engineering range around data engineering education, backend APIs, persistent progress tracking, and deployment-ready infrastructure.",
    metrics: ["Full-stack cockpit", "AI tutor endpoint", "Kubernetes manifests"],
    tech: ["Next.js", "React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    proof: ["Skill tree", "Progress API", "Architecture docs"],
    details:
      "Builds a learning cockpit across SQL, Python, modeling, CDC, warehousing, Spark, streaming, orchestration, cloud, DevOps, governance, observability, analytics engineering, and AI data engineering."
  },
  {
    title: "ResumeOptimizerPro",
    primaryRole: "Data Analytics",
    roles: ["Data Analytics"],
    github: "https://github.com/rithikreddyvarla19/ResumeOptimizerPro",
    summary: "React platform that analyzes resume and job description alignment, extracts keywords, estimates ATS fit, compares missing skills, and generates presentation-ready rewrite suggestions locally.",
    recruiterRead: "Shows user-facing product thinking plus practical text analysis, scoring logic, local privacy controls, and polished workflow design.",
    metrics: ["ATS scoring", "Keyword gap analysis", "Local-only prototype"],
    tech: ["React", "Vite", "Tailwind", "Framer Motion", "JavaScript", "Local Storage"],
    proof: ["Before/after bullets", "Truthfulness warnings", "Export workflow"],
    details:
      "Parses resume sections, extracts job description keywords, compares matched and missing terms, estimates ATS alignment, rewrites supported bullets, and previews optimized resume output without sending user data outside the browser."
  },
  {
    title: "SQL Injection Demo App",
    primaryRole: "Data Engineer",
    roles: ["Data Engineer"],
    github: "https://github.com/rithikreddyvarla19/sql-injection-demo",
    summary: "Educational Node.js and MySQL app comparing intentionally vulnerable SQL string concatenation with secure prepared-statement authentication.",
    recruiterRead: "Useful database engineering signal: understands SQL safety, attack paths, prepared statements, and secure data access patterns.",
    metrics: ["Vulnerable vs secure route", "Prepared statements", "MySQL schema"],
    tech: ["Node.js", "Express", "MySQL", "SQL", "HTML", "CSS"],
    proof: ["Security walkthrough", "Demo payload", "Local-only instructions"],
    details:
      "Demonstrates how a classic SQL injection payload can bypass unsafe string-concatenated login logic and how prepared statements block the same attack path."
  }
];

export const metrics = [
  { label: "Public portfolio repos", value: "13", icon: Database },
  { label: "Cloud ecosystems", value: "3", icon: Cloud },
  { label: "Project categories", value: "4", icon: Network },
  { label: "Graduate GPA", value: "4.0", icon: Award },
  { label: "Students mentored", value: "150+", icon: GraduationCap },
  { label: "Records/day handled", value: "2M+", icon: Workflow }
];

export const certifications = ["AWS Cloud Foundations", "AWS Architecting", "Python for Data Science"];

export const contactLinks = {
  email: "rithikreddyvarla@gmail.com",
  linkedin: "https://www.linkedin.com/in/rithikreddyvarla/",
  github: "https://github.com/rithikreddyvarla19",
  location: "Orlando, Florida"
};
