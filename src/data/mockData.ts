export type PageId = "home" | "platform" | "industries" | "about" | "contact";

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
  | "radio"
  | "settings"
  | "shield"
  | "waves"
  | "wrench"
  | "zap";

export const navItems: ReadonlyArray<{ readonly id: PageId; readonly label: string }> = [
  { id: "platform", label: "Platform" },
  { id: "industries", label: "Industries" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const footerGroups = [
  [
    { id: "platform", label: "Platform" },
    { id: "industries", label: "Industries" },
  ],
  [
    { id: "about", label: "Company" },
    { id: "contact", label: "Contact" },
  ],
  [
    { id: "home", label: "Privacy" },
    { id: "home", label: "Terms" },
  ],
] as const;

export const homePage = {
  title: "Industrial Intelligence at Your Fingertips",
  description:
    "Monitor energy consumption in real-time, predict equipment failures before they happen, and drive operational excellence with our AI-powered industrial IoT platform.",
  image: "/kuroshio/home-hero.jpg",
  primaryAction: "Request a Demo",
  secondaryAction: "Explore the Platform",
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
    { id: "architecture", label: "Technical Architecture", icon: "network" },
  ],
  metrics: [
    {
      label: "Total Energy Today",
      value: "12,450",
      unit: "kWh",
      helper: "Facility wide",
      delta: "+1.2%",
      tone: "primary",
      icon: "zap",
    },
    {
      label: "Energy Cost Today",
      value: "$1,482",
      unit: "USD",
      helper: "Estimated",
      tone: "secondary",
      icon: "gauge",
    },
    {
      label: "Idle Time Today",
      value: "14.2",
      unit: "h",
      helper: "Aggregate",
      tone: "neutral",
      icon: "clock",
    },
    {
      label: "Idle Waste Today",
      value: "$142",
      unit: "USD",
      helper: "Avoidable loss",
      tone: "critical",
      icon: "ban",
    },
  ],
  machines: [
    {
      machine: "CNC Lathe 01",
      type: "Milling Machine",
      state: "Production",
      tone: "primary",
      idle: "1.2 h",
      energy: "-420.5 kWh",
      cost: "-$48.20 USD",
      load: 78,
      accent: 8,
    },
    {
      machine: "Assembly Robot B",
      type: "Welding Arm",
      state: "Idle",
      tone: "warning",
      idle: "4.5 h",
      energy: "-185.0 kWh",
      cost: "-$21.50 USD",
      load: 58,
      accent: 12,
    },
    {
      machine: "Conveyor Belt 04",
      type: "Transport Line",
      state: "Off",
      tone: "neutral",
      idle: "-",
      energy: "0.0 kWh",
      cost: "0.0 USD",
      load: 0,
      accent: 0,
    },
    {
      machine: "HVAC Unit North",
      type: "Climate Control",
      state: "Unavailable",
      tone: "critical",
      idle: "Sensor data unreachable",
      energy: "-",
      cost: "-",
      load: 100,
      accent: 0,
    },
  ],
  predictive: {
    title: "Predictive Maintenance - Catch Failures Before They Happen",
    description:
      "We detect bearing wear, winding degradation, and element failure weeks before your machine stops.",
    features: [
      "Motor health score 0-100",
      "Current trend analysis",
      "Phase imbalance detection",
      "Heating element monitoring",
      "Plain language AI alerts",
      "Failure timeline prediction",
    ],
  },
  logbook: {
    title: "Digital Logbook - Replace Paper Forever",
    description: "Every repair, inspection, and observation is logged, searchable, and downloadable as PDF.",
    features: [
      "Digital maintenance records",
      "Machine history per asset",
      "Alert to logbook link",
      "Spare parts tracking",
      "PDF maintenance report download",
      "Multi-user access",
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
      "We did not start in a boardroom. We started on the production line, identifying the real-world gaps between theoretical AI and practical industrial application.",
  },
  story: {
    title: "The Kuroshio Current",
    aside: "A powerful, warm ocean current providing stability and vital energy to marine ecosystems.",
    paragraphs: [
      "Just as the Kuroshio current flows silently beneath the surface to drive massive global ecosystems, Kuroshio AI operates beneath the surface of your industrial operations. We observe, analyze, and optimize without disrupting the flow of production.",
      "Our origin story is not about software developers trying to disrupt manufacturing. It is about industrial engineers who needed better tools. Frustrated by generic AI solutions that demanded excessive connectivity and complex integrations, we built what we needed: an expert observer that respects the sanctity of the factory floor.",
    ],
    calloutTitle: "Engineer-Led, Field-Tested",
    calloutBody:
      "We bridge the gap between heavy industry and deep tech, translating complex operational data into actionable, secure intelligence.",
  },
  credentials: [
    ["DPIIT Recognised", "Deep Tech Startup"],
    ["Kerala Makers Village", "Incubated"],
    ["RAK Innovation City", "Partner"],
    ["IIT Madras", "Research Affiliate"],
  ],
  leadership: [
    ["Ajas Khan", "Founder & CEO"],
    ["Noufal", "Co-Founder & CTO"],
    ["Parthiv Roshan", "Head of Engineering"],
    ["Sree Harinandan", "Lead AI Researcher"],
    ["Farzana", "Operations Director"],
  ],
  presence: [
    {
      title: "India (Kochi / Chennai)",
      badge: "R&D Core",
      body: "Our primary research and development hub, focusing on core AI algorithms, edge computing infrastructure, and deep tech innovation.",
      icon: "flask",
    },
    {
      title: "UAE (Ras Al Khaimah)",
      badge: "Commercial HQ",
      body: "Our commercial and operational base for the MENA region, driving sales, strategic partnerships, and industrial deployments.",
      icon: "globe",
    },
  ],
} as const;

export const contactPage = {
  hero: {
    title: "Let's Start with One Machine.",
    description:
      "Connect with our engineering team to explore how Kuroshio AI can stabilize your industrial operations through deterministic AI analysis.",
  },
  fields: [
    { id: "name", label: "Full Name", type: "text", required: true },
    { id: "company", label: "Company", type: "text", required: true },
    { id: "role", label: "Job Role", type: "text", required: false },
    { id: "email", label: "Work Email", type: "email", required: true },
    { id: "phone", label: "Phone Number", type: "tel", required: false },
  ],
  regions: ["Middle East & Africa", "Asia Pacific", "Europe", "North America"],
  industries: ["Heavy Manufacturing", "Energy & Power", "Oil & Gas", "Other Industrial"],
  direct: [
    { label: "General Inquiries", value: "contact@kuroshio.ai" },
    { label: "Technical Support", value: "support@kuroshio.ai" },
  ],
  offices: [
    {
      city: "Dubai, UAE",
      tone: "secondary",
      address: ["Dubai Silicon Oasis", "Tech Hub Building, Level 4", "Dubai, United Arab Emirates"],
    },
    {
      city: "Bengaluru, India",
      tone: "primary",
      address: ["HSR Layout Sector 2", "Innovation Park, Tower B", "Bengaluru, Karnataka 560102"],
    },
  ],
} as const;
