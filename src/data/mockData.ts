export type PageId = "home" | "platform" | "industries" | "about" | "contact";

/** Every renderable route, including the catch-all. */
export type RouteId = PageId | "notFound";

export type IconKey =
  | "activity"
  | "arrowRight"
  | "ban"
  | "book"
  | "building"
  | "check"
  | "clock"
  | "cloud"
  | "cpu"
  | "database"
  | "download"
  | "factory"
  | "flask"
  | "gauge"
  | "globe"
  | "leaf"
  | "mail"
  | "mapPin"
  | "network"
  | "phone"
  | "radio"
  | "settings"
  | "shield"
  | "terminal"
  | "waves"
  | "wrench"
  | "zap";

export const navItems: ReadonlyArray<{ readonly id: PageId; readonly label: string }> = [
  { id: "platform", label: "Platform" },
  { id: "industries", label: "Industries" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const homePage = {
  eyebrow: "Industrial intelligence for GCC manufacturing",
  title: "Industrial Intelligence for UAE Manufacturing",
  description:
    "Monitor energy, predict failures, and digitise maintenance - from a single platform that installs in hours and never touches your control system.",
  image: "/homepage.webp",
  imageAlt: "Kuroshio AI industrial dashboard with real-time analytics and machine scan visualizations.",
  primaryAction: "Request a Demo",
  secondaryAction: "Learn More",
  problems: [
    {
      title: "Energy Waste",
      body: "You receive one DEWA bill for the entire plant. You do not know which machine is consuming what, how much is wasted on idle running, or whether your power factor is costing you penalty charges every month.",
      icon: "zap",
    },
    {
      title: "Equipment Failures",
      body: "Bearing wear, winding degradation, element failure - all happen gradually over weeks. Without monitoring, the first sign of a problem is when the machine stops. Emergency repairs are expensive. Planned maintenance is cheap.",
      icon: "settings",
    },
    {
      title: "Paper Maintenance Records",
      body: "Maintenance history is scattered across paper logbooks. No searchable record. No link between what failed and what was done. New engineers have no visibility of machine history.",
      icon: "book",
    },
    {
      title: "Carbon Footprint & Sustainability",
      body: "Regulators, customers, and investors are demanding verified emissions data. Without per-machine carbon tracking, sustainability targets remain aspirational rather than measurable and provable.",
      icon: "leaf",
    },
  ],
  products: [
    {
      tag: "EnergyIQ",
      title: "Real-Time Energy Monitoring",
      icon: "activity",
      bullets: [
        "Live kW consumption per machine, updated every 60 seconds",
        "Idle detection alerts when equipment runs with no production output",
        "DEWA tariff mapping to translate readings into exact cost savings",
      ],
    },
    {
      tag: "Predictive Maintenance",
      title: "Motor & Bearing Intelligence",
      icon: "gauge",
      bullets: [
        "Continuous motor health scoring with anomaly baselines",
        "Bearing fault detection from current signature analysis",
        "7-30 day failure prediction to schedule maintenance without surprises",
      ],
    },
    {
      tag: "Digital Logbook",
      title: "Maintenance History, Digitised",
      icon: "book",
      bullets: [
        "Full maintenance history linked directly to each machine's health data",
        "One-click PDF export for audits, compliance, and ISO documentation",
        "Technician notes and photo attachments at the point of work",
      ],
    },
    {
      tag: "Carbon & Sustainability",
      title: "Per-Machine Emissions Tracking",
      icon: "leaf",
      bullets: [
        "CO2 equivalent calculated per machine per hour based on actual energy use",
        "Monthly emissions reports with verified reduction figures",
        "Scope 2 data ready for ESG reporting and customer sustainability audits",
      ],
    },
  ],
  process: [
    {
      title: "Install Sensors",
      body: "Clamp-on meters and sensors are installed without PLC or control-system access.",
    },
    {
      title: "Read Every 60 Seconds",
      body: "The edge unit captures current, vibration, temperature, and energy data.",
    },
    {
      title: "Send by Cellular SIM",
      body: "Encrypted data moves through our Etisalat/du SIM. Your network is never used.",
    },
    {
      title: "Process in UAE",
      body: "Azure UAE North generates health scores, anomalies, and energy analytics.",
    },
    {
      title: "Open Dashboard",
      body: "Use the live dashboard from any browser, tablet, or mobile within 24 hours.",
    },
  ],
  industries: [
    {
      title: "Glass Processing",
      body: "Furnace temperature anomalies and conveyor motor health monitoring for flat and container glass lines.",
      icon: "factory",
    },
    {
      title: "Plastics",
      body: "Injection moulding and extrusion energy profiling with cycle-time deviation alerts and idle detection.",
      icon: "flask",
    },
    {
      title: "Aluminium Extrusion",
      body: "Billet furnace efficiency, press motor diagnostics, and cooling-line energy optimisation in real time.",
      icon: "settings",
    },
    {
      title: "Rubber Recycling",
      body: "Shredder and granulator bearing health tracking with energy-per-tonne output metrics.",
      icon: "wrench",
    },
    {
      title: "Minerals Processing",
      body: "Mill and crusher motor health scoring, dust suppression pump monitoring, and shift-level energy reporting.",
      icon: "network",
    },
    {
      title: "Building & Utilities",
      body: "HVAC, chiller, and pump efficiency monitoring with demand-side management alerts for commercial facilities.",
      icon: "building",
    },
  ],
  cta: {
    title: "Start with One Machine. Risk Free.",
    body: "Our Proof of Concept covers one machine for 4 weeks. If you do not see clear value, we refund 75% of the fee. Your maximum risk is AED 1,500. We are that confident.",
    badge: "No PLC access. No client network. Live in hours.",
    action: "Request a Demo",
  },
} as const;

export const platformPage = {
  hero: {
    title: "One Operational View for Every Machine",
    description:
      "Integrate data from legacy PLCs, modern sensors, and enterprise systems into a single, cohesive industrial intelligence platform.",
    image: "/kuroshio/platform-hero.jpg",
    action: "Explore Architecture",
  },
  anchorNav: [
    { id: "energy-iq", label: "EnergyIQ", icon: "zap" },
    { id: "predictive-maintenance", label: "Predictive Maintenance", icon: "settings" },
    { id: "digital-logbook", label: "Digital Logbook", icon: "book" },
    { id: "carbon-tracking", label: "Carbon Tracking", icon: "leaf" },
    { id: "architecture", label: "Technical Architecture", icon: "network" },
  ],
  metrics: [
    {
      label: "Total energy",
      value: "~440.05",
      unit: "kWh",
      helper: "Estimated",
      delta: "Current view",
      tone: "info",
      icon: "zap",
    },
    {
      label: "Total energy cost",
      value: "~167.22",
      unit: "AED",
      helper: "Estimated",
      delta: "Current view",
      tone: "info",
      icon: "gauge",
    },
    {
      label: "Total idle time",
      value: "5.02",
      unit: "hours",
      helper: "Available",
      delta: "Today",
      tone: "neutral",
      icon: "clock",
    },
    {
      label: "Idle waste cost",
      value: "16.50",
      unit: "AED",
      helper: "Available",
      delta: "Today",
      tone: "warning",
      icon: "ban",
    },
  ],
  machines: [
    {
      machine: "Cooling Pump Skid",
      type: "Unit 6 · Centrifugal Pump",
      state: "Idle",
      tone: "warning",
      idle: "56m",
      energy: "~109.91 kWh",
      cost: "~41.77 AED",
      load: 22,
      accent: 62,
    },
    {
      machine: "Demo CNC Mill",
      type: "Unit 4 · CNC Mill",
      state: "Off",
      tone: "neutral",
      idle: "1h 30m",
      energy: "122.22 kWh",
      cost: "46.44 AED",
      load: 10,
      accent: 8,
    },
    {
      machine: "Hydraulic Press Line",
      type: "Unit 5 · Hydraulic Press",
      state: "Off",
      tone: "neutral",
      idle: "2h 35m",
      energy: "207.92 kWh",
      cost: "79.01 AED",
      load: 22,
      accent: 0,
    },
  ],
  predictive: {
    title: "Catch failures weeks before they happen",
    description:
      "We detect bearing wear, winding degradation, and element failure using ML models trained on thousands of industrial failure signatures.",
    features: [
      "Motor health score 0-100 with plain-language AI alerts",
      "Phase imbalance detection and current trend analysis",
      "Heating element monitoring across full load cycles",
      "Failure timeline prediction with confidence intervals",
    ],
  },
  logbook: {
    title: "Replace paper logs forever",
    description:
      "Every repair, inspection, and observation is logged, searchable, and downloadable as PDF, tied to the exact machine and timestamp.",
    features: [
      "Digital maintenance records with photo attachments",
      "Alert-to-logbook link with entries created from AI alerts",
      "Machine history per asset with full audit trail",
      "PDF maintenance report download and spare parts tracking",
    ],
    entries: [
      {
        title: "Bearing Replacement",
        date: "Oct 15, 2023",
        body: "Replaced main spindle bearing after vibration alert. Used part #BRG-409.",
        initials: "JD",
        owner: "John Doe",
        tone: "secondary",
      },
      {
        title: "Routine Inspection",
        date: "Sep 28, 2023",
        body: "Monthly visual inspection completed. No visible leaks or issues.",
        initials: "AS",
        owner: "Alice Smith",
        tone: "neutral",
      },
      {
        title: "Coolant System Flush",
        date: "Sep 10, 2023",
        body: "Full coolant system flushed and replaced with Castrol Hysol X-5.",
        initials: "MR",
        owner: "Maya Rao",
        tone: "neutral",
      },
    ],
  },
  architecture: {
    title: "Works on Any Machine. No PLC Access Required.",
    cards: [
      {
        title: "Hardware Agnostic",
        body: "Energy meters on machine incomer - no PLC needed.",
        icon: "factory",
      },
      {
        title: "Secure Connectivity",
        body: "Cellular uplink - never uses client network.",
        icon: "radio",
      },
      {
        title: "Data Residency",
        body: "Azure UAE North - data stays in UAE.",
        icon: "database",
      },
      {
        title: "Rapid Deployment",
        body: "Installs in 3-4 hours - no downtime.",
        icon: "clock",
      },
    ],
    pipeline: [
      { label: "Machine", icon: "factory" },
      { label: "Edge Device", icon: "cpu" },
      { label: "Cellular", icon: "radio" },
      { label: "Azure Cloud", icon: "cloud" },
      { label: "Dashboard", icon: "gauge" },
    ],
  },
  cta: {
    title: "See What Your Machines Are Telling You",
    description:
      "Schedule a technical walkthrough of the Kuroshio AI platform and discover how operational visibility can transform your facility.",
    action: "Request a Demo",
  },
} as const;

export const industriesPage = {
  title: "Industrial Intelligence Built Around Your Machines",
  description: "Transform raw sensor data into operational clarity across heavy manufacturing sectors.",
  sectors: [
    {
      title: "Glass Manufacturing",
      body: "Precision temperature and flow monitoring for continuous glass production lines to prevent defects and optimize energy consumption.",
      image: "/kuroshio/glass-manufacturing.jpg",
      imageAlt: "Industrial glass manufacturing facility with glowing production lines.",
      machines: ["Melting Furnaces", "Annealing Lehrs", "Forming Machines"],
      signals: ["Thermal Gradients", "Viscosity Rates", "Vibration Anomalies"],
    },
    {
      title: "Plastics & Polymers",
      body: "Advanced analytics for injection molding and extrusion processes, ensuring dimensional stability and material efficiency.",
      image: "/kuroshio/plastics-polymers.jpg",
      imageAlt: "Automated plastics and polymers manufacturing equipment.",
      machines: ["Extruders", "Injection Molders", "Cooling Towers"],
      signals: ["Melt Pressure", "Screw Speed", "Coolant Flow"],
    },
  ],
  cta: {
    title: "Your Machines Do Not Need to Be New to Become Intelligent",
    action: "Speak to an Engineer",
  },
} as const;

export const aboutPage = {
  hero: {
    title: "Built by Engineers Who Understand Factory Floors",
    description:
      "Kuroshio AI was founded by Ajas Khan and Noufal - engineers who saw firsthand that UAE and GCC manufacturing plants were running blind.",
  },
  story: {
    title: "Company Story",
    aside: "Built in Kerala, India - deployed across UAE and GCC. Technology export model.",
    paragraphs: [
      "Kuroshio AI was founded by engineers who spent years on factory floors and saw the same problem everywhere - machines running blind, energy being wasted invisibly, and maintenance teams reacting to failures rather than preventing them.",
      "We built Kuroshio AI to change that. Our platform brings the intelligence of enterprise monitoring systems to every manufacturing plant in the UAE and GCC - at a fraction of the cost, deployable in hours, and without touching the existing control infrastructure.",
      "We are named after the Kuroshio Current - the powerful warm ocean current that flows along the coast of Japan, shaping climates and enabling navigation for centuries. Like the current, we bring intelligence and direction to industrial operations.",
      "We are built in Kerala, India - one of Asia's strongest engineering talent hubs - and deployed across the UAE and GCC. Our technology crosses oceans. Our clients stay ahead.",
    ],
    calloutTitle: "Named for Movement and Direction",
    calloutBody:
      "Named after the Kuroshio Current - the powerful ocean current of the Pacific, a force that shapes climates and trade routes. Like the current, we move intelligence through industry.",
  },
  credentials: [
    ["DPIIT Recognised Deep Tech Startup", "Government of India"],
    ["Kerala Makers Village", "R&D Centre, Kochi, Kerala"],
    ["RAK Innovation City, RAKEZ", "UAE entity, Ras Al Khaimah"],
    ["IIT Madras", "Technology partnership and research affiliation"],
  ],
  approach: [
    {
      title: "No Client Network Access",
      body: "We never connect to client networks - cellular uplink only",
      icon: "radio",
    },
    {
      title: "No Control System Access",
      body: "We never touch client control systems - our own sensor layer",
      icon: "shield",
    },
    {
      title: "UAE Data Residency",
      body: "UAE data residency - Azure UAE North",
      icon: "database",
    },
    {
      title: "Deploy in Hours",
      body: "Deploy in hours - not months",
      icon: "clock",
    },
    {
      title: "Built for GCC",
      body: "Built for GCC - Arabic language support planned",
      icon: "globe",
    },
  ],
  leadership: [
    {
      name: "Ajas Khan",
      role: "Co-founder & CTO",
      bio: "B.Tech EEE, TKM College of Engineering. IIT Madras Data Science. Prior experience as Electrical Engineer at MRF Tyres.",
    },
    {
      name: "Noufal",
      role: "Co-founder & CEO",
      bio: "UAE operations, business development, client relationships.",
    },
    {
      name: "Parthiv Roshan",
      role: "IoT Engineer",
      bio: "Hardware design, firmware development, edge device assembly.",
    },
    {
      name: "Sree Harinandan",
      role: "Full-Stack Developer",
      bio: "Platform development, cloud infrastructure, AI integration.",
    },
    {
      name: "Farzana",
      role: "HR and Operations",
      bio: "",
    },
  ],
  entities: [
    {
      title: "Kuroshio AI Private Limited",
      country: "Kerala, India",
      role: "R&D and Engineering",
      location: "Kerala Makers Village, Kochi",
      credential: "DPIIT Recognised",
      icon: "flask",
    },
    {
      title: "Kuroshio AI Ltd",
      country: "Ras Al Khaimah, UAE",
      role: "Sales, Deployment, Client Success",
      location: "RAK Innovation City, RAKEZ",
      credential: "UAE registered entity",
      icon: "globe",
    },
  ],
} as const;

export const contactPage = {
  hero: {
    title: "Let's Start with One Machine.",
    description:
      "Connect with our engineering team to explore how Kuroshio AI can stabilise your industrial operations.",
  },
  fields: [
    { id: "name", label: "Full Name", type: "text", required: true, placeholder: "Jane Smith" },
    { id: "company", label: "Company", type: "text", required: true, placeholder: "Acme Manufacturing" },
    { id: "role", label: "Job Role", type: "text", required: false, placeholder: "Operations Manager" },
    { id: "email", label: "Work Email", type: "email", required: true, placeholder: "jane@acme.com" },
    { id: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "+971 50 000 0000" },
  ],
  regions: ["United Arab Emirates", "Saudi Arabia", "India", "United Kingdom", "United States", "Other"],
  industries: [
    "Glass Manufacturing",
    "Plastics & Polymers",
    "Food & Beverage",
    "Textiles",
    "Electronics Assembly",
    "Pharmaceuticals",
    "Metal Fabrication",
    "Other",
  ],
  direct: [
    {
      icon: "mail",
      label: "Email",
      links: [{ href: "mailto:info@kuroshioai.com", value: "info@kuroshioai.com" }],
    },
    {
      icon: "phone",
      label: "India",
      links: [
        { href: "tel:+919746779817", value: "+91 9746779817" },
        { href: "tel:+918590920120", value: "+91 8590920120" },
      ],
    },
    {
      icon: "phone",
      label: "UAE",
      links: [{ href: "tel:+971509420423", value: "+971 509420423" }],
    },
  ],
  offices: [
    {
      city: "UAE",
      tone: "secondary",
      address: ["RAK Innovation City, RAKEZ", "Ras Al Khaimah, UAE"],
    },
    {
      city: "India",
      tone: "primary",
      address: [
        "Kuroshio AI, STPI Building,",
        "Technopark Phase 1, Kazhakkoottam,",
        "Trivandrum, Kerala",
      ],
    },
  ],
} as const;
