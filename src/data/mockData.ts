export type PageId = "home" | "products" | "platform" | "ktrack" | "industries" | "about" | "contact";

/** Industries splits into two audience tracks; the product underneath is one. */
export type TrackId = "factories" | "buildings";

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
  { id: "products", label: "Products & services" },
  { id: "industries", label: "Industries" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const homePage = {
  eyebrow: "Industrial intelligence for GCC factories and buildings",
  title: "Industrial Intelligence for UAE Factories and Buildings",
  description:
    "Monitor energy, predict failures, and digitise maintenance from a single platform that installs in hours and never touches your control system.",
  image: "/homepage.webp",
  imageAlt: "The Kuroshio AI dashboard, showing live energy and health readings for each machine on site.",
  primaryAction: "Request a Demo",
  secondaryAction: "Learn More",
  problems: [
    {
      title: "Energy Waste",
      body: "You receive one DEWA bill for the whole site. You do not know which machine is consuming what, how much is wasted running with no load, or whether your power factor is costing you penalty charges every month.",
      icon: "zap",
    },
    {
      title: "Equipment Failures",
      body: "Bearing wear, winding degradation, element failure. A press and a chiller fail the same way, gradually, over weeks. Without monitoring, the first sign of a problem is when the machine stops. Emergency repairs are expensive. Planned maintenance is cheap.",
      icon: "settings",
    },
    {
      title: "Paper Maintenance Records",
      body: "Maintenance history is scattered across paper logbooks and a contractor's spreadsheet. No searchable record. No link between what failed and what was done. When the team or the FM contractor changes, the history walks out with them.",
      icon: "book",
    },
    {
      title: "Carbon Footprint & Sustainability",
      body: "Customers and investors have started asking for emissions figures, and a number estimated from floor area does not survive an audit. Until you can show CO2 per machine, the reduction target on the slide stays a target on the slide.",
      icon: "leaf",
    },
  ],
  products: [
    {
      tag: "EnergyIQ",
      title: "Real-Time Energy Monitoring",
      icon: "activity",
      bullets: [
        "Live kW consumption per machine, updated every 40 seconds",
        "Idle detection alerts when equipment draws power with nothing to show for it",
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
      body: "Clamp-on meters and sensors are installed without PLC, BMS, or control-system access.",
    },
    {
      title: "Read Every 40 Seconds",
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
  // Deliberately half factory, half building: this strip is the first place a
  // visitor checks whether the product is meant for a site like theirs.
  industries: [
    {
      title: "Glass Processing",
      body: "Furnace temperature anomalies and conveyor motor health monitoring for flat and container glass lines.",
      icon: "factory",
      track: "factories",
    },
    {
      title: "Plastics & Extrusion",
      body: "Injection moulding and extrusion energy profiling with cycle-time deviation alerts and idle detection.",
      icon: "flask",
      track: "factories",
    },
    {
      title: "Aluminium & Metals",
      body: "Billet furnace efficiency, press motor diagnostics, and cooling-line energy optimisation in real time.",
      icon: "settings",
      track: "factories",
    },
    {
      title: "Chiller Plant",
      body: "Per-chiller kW against tons of cooling delivered, so efficiency drift shows up months before a breakdown.",
      icon: "waves",
      track: "buildings",
    },
    {
      title: "Towers & Offices",
      body: "Pumps, AHUs, and lift motor rooms metered at the panel, with after-hours load broken out by riser.",
      icon: "building",
      track: "buildings",
    },
    {
      title: "Hotels & Malls",
      body: "Kitchen, laundry, and HVAC load separated per asset, with power-factor penalties traced to their source.",
      icon: "network",
      track: "buildings",
    },
  ],
  cta: {
    title: "Start with One Machine. Risk Free.",
    body: "The pilot covers one machine for four weeks. A press, a chiller, whichever one you argue about most. If the numbers do not convince you, we refund 75% of the fee. Worst case it costs you AED 1,500, and you keep the report.",
    badge: "No PLC or BMS access. No client network. Live in hours.",
    action: "Request a Demo",
  },
} as const;

export const platformPage = {
  hero: {
    description:
      "Kuroshio Platform reads presses, chillers, pumps and extruders. If it runs on three-phase power, the same sensing layer reads it, with no PLC, no BMS, and no controls work.",
    action: "See how it connects",
  },
  anchorNav: [
    { id: "energy-iq", label: "EnergyIQ", icon: "zap" },
    { id: "predictive-maintenance", label: "Predictive maintenance", icon: "settings" },
    { id: "digital-logbook", label: "Digital logbook", icon: "book" },
    { id: "carbon-tracking", label: "Carbon tracking", icon: "leaf" },
    { id: "architecture", label: "Architecture", icon: "network" },
  ],
} as const;

export const industriesPage = {
  title: "Industrial Intelligence Built Around Your Machines",
  description:
    "The hardware is the same either way. Pick whichever one you actually run, and we will show you the equipment we read and what comes back.",
  /**
   * The product is horizontal - any three-phase asset - but proof has to be
   * vertical. A facilities manager does not need a different platform, they
   * need to see a chiller named on the page. Hence one spine, two tracks.
   */
  tracks: [
    {
      id: "factories",
      label: "Factories",
      icon: "factory",
      summary: "Presses, extruders, furnaces, mills",
      eyebrow: "Heavy manufacturing · UAE & GCC",
      headline: "Built around the machines you run.",
      description:
        "We clamp onto the incomer and read the current every 40 seconds. Pick a machine to see what that reading turns into.",
      sectors: [
        {
          title: "Glass Manufacturing",
          body: "Furnaces and lehrs run around the clock, so a worn motor or a failing element turns up in the current weeks before it turns up in the glass. We read that drift and name the machine causing it.",
          image: "/kuroshio/glass-manufacturing.jpg",
          imageAlt:
            "Hot end of a flat glass line, the annealing lehr glowing orange above a roller conveyor driven by rows of small motors.",
          machines: ["Melting furnaces", "Annealing lehrs", "Forming machines"],
          signals: ["Element current per phase", "Motor load", "Idle running"],
        },
        {
          title: "Plastics & Polymers",
          body: "Extruders and moulders lose money quietly. Cycle time creeps, screws wear, and the machine keeps running as if nothing is wrong. The current shows it well before the scrap rate does.",
          image: "/kuroshio/plastics-polymers.jpg",
          imageAlt:
            "Row of horizontal injection moulding machines with feed hoppers and coloured coolant lines on a factory floor.",
          machines: ["Extruders", "Injection moulders", "Cooling towers"],
          signals: ["Heater current", "Screw motor load", "Cycle time"],
        },
      ],
      grid: {
        eyebrow: "Also deployed in",
        title: "Six sectors, one sensing layer.",
        body: "The same sensing layer reads any three-phase asset. These are the sectors already running on it across RAK, Dubai, Sharjah, and Umm Al Quwain.",
        items: [
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
            title: "Metal Fabrication",
            body: "Press, shear, and compressor load profiling with phase-imbalance alerts across the fabrication bay.",
            icon: "wrench",
          },
        ],
      },
    },
    {
      id: "buildings",
      label: "Buildings",
      icon: "building",
      summary: "Chillers, pumps, AHUs, lift rooms",
      eyebrow: "Facilities & FM · UAE & GCC",
      headline: "The same meter, in your plant room.",
      description:
        "A chiller and a press are both motors on three-phase power. We clamp on at the panel, with no BMS integration and no controls work. Pick a machine to see what comes back.",
      sectors: [
        {
          title: "Chiller Plant & District Cooling",
          diagram: "chiller",
          image: "/kuroshio/chiller-plant.jpg",
          imageAlt:
            "Chiller plant room with three water-cooled centrifugal chillers on concrete plinths.",
          body: "Chiller plant is the largest single line on a tower's DEWA bill and the least attributed. Metering each machine at the panel turns efficiency drift into a number: kW against tons of cooling delivered. That number moves months before a breakdown or a peak-demand charge does.",
          machines: ["Centrifugal chillers", "Primary and secondary pumps", "Cooling tower fans"],
          signals: ["Compressor current", "Power factor", "Phase imbalance"],
        },
        {
          title: "Towers, Hotels & Malls",
          image: "/kuroshio/riser-room.jpg",
          imageAlt:
            "Electrical riser room with a row of distribution panels fed from overhead cable tray.",
          body: "One bill for the whole building tells you nothing about which riser, which floor, or which tenant. Per-panel metering makes the service charge defensible, exposes plant left running overnight, and traces power-factor penalties back to the asset causing them.",
          machines: ["Air handling units", "Booster and sump pumps", "Lift motor rooms"],
          signals: ["After-hours load", "Power factor", "Phase imbalance"],
        },
      ],
      grid: {
        eyebrow: "Built for",
        title: "Six building types, one sensing layer.",
        body: "The sensing layer does not care what the building is for. It reads any three-phase panel. No BMS integration, no controls work, and nothing routed through the building network.",
        items: [
          {
            title: "Commercial Towers",
            body: "Landlord and tenant load separated per panel, with after-hours running broken out floor by floor.",
            icon: "building",
          },
          {
            title: "Hotels & Resorts",
            body: "Kitchen, laundry, and guest-floor HVAC metered separately so cost per occupied room stops being a guess.",
            icon: "waves",
          },
          {
            title: "Retail & Malls",
            body: "Common-area plant and tenant supply measured apart, with idle running caught outside trading hours.",
            icon: "network",
          },
          {
            title: "District Cooling",
            body: "Plant-side kW against delivered tons, per machine, so efficiency drift is visible before it is expensive.",
            icon: "waves",
          },
          {
            title: "Hospitals & Clinics",
            body: "Critical plant health scored continuously, with phase imbalance and bearing wear flagged weeks ahead.",
            icon: "shield",
          },
          {
            title: "Warehousing & Logistics",
            body: "Cold-store compressors, dock levellers, and material handling profiled against actual throughput hours.",
            icon: "cpu",
          },
        ],
      },
    },
  ],
} as const;

export const aboutPage = {
  hero: {
    title: "Built by Engineers Who Understand Shop Floors and Plant Rooms",
    description:
      "Ajas Khan and Noufal started Kuroshio AI after years of watching UAE sites, factories and towers alike, run on guesswork and a monthly bill.",
  },
  story: {
    title: "Company Story",
    aside: "Engineered in Trivandrum. Installed across the UAE and GCC.",
    paragraphs: [
      "We spent years on factory floors before starting this, and the same thing kept happening. Nobody could say what any single machine cost to run. Maintenance found out about a bearing after it had already gone.",
      "The systems that fix this properly were built for plants ten times the size, and priced to match. So we built one that goes in during an afternoon, costs a fraction of that, and never touches your control system.",
      "The name comes from the Kuroshio Current, the warm current that runs north past Japan. You cannot see it from the shore. Everything downstream still depends on what it is doing.",
      "The engineering happens in Trivandrum, Kerala. Installation and support run out of Ras Al Khaimah. That split is deliberate, and it is a large part of why the hardware costs what it does.",
    ],
    calloutTitle: "Why Kuroshio",
    calloutBody:
      "The Kuroshio is one of the strongest currents in the world, and almost nobody standing on a beach in Japan knows it is there. Same idea. The data was always in the cable.",
  },
  credentials: [
    ["DPIIT Recognised Deep Tech Startup", "Government of India"],
    ["Kerala Makers Village", "R&D Centre, Kochi, Kerala"],
    ["RAK Innovation City, RAKEZ", "UAE entity, Ras Al Khaimah"],
    ["IIT Madras", "Technology partnership and research affiliation"],
  ],
  approach: [
    {
      title: "No client network access",
      body: "Readings leave over our own cellular uplink, never through your network.",
    },
    {
      title: "No control system access",
      body: "We bring our own sensor layer and never touch your PLC or BMS.",
    },
    {
      title: "UAE data residency",
      body: "Your data is stored in Azure UAE North.",
    },
    {
      title: "Deployed in hours",
      body: "An install takes an afternoon, not months, and the line keeps running.",
    },
    {
      title: "Built for the GCC",
      body: "Priced against local tariffs. Arabic language support is planned.",
    },
  ],
  leadership: [
    {
      name: "Noufal",
      role: "Co-founder & CEO",
      bio: "UAE operations, business development, client relationships.",
    },
    {
      name: "Ajas Khan",
      role: "Co-founder & CTO",
      bio: "Electrical engineering, data science, technical direction. Previously at MRF Tyres.",
    },
    {
      name: "Sree Harinandan",
      role: "Full-Stack Developer",
      bio: "Platform development, cloud infrastructure, AI integration.",
    },
    {
      name: "Parthiv Roshan",
      role: "IoT Engineer",
      bio: "Hardware design, firmware development, edge device assembly.",
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
    title: "Tell us what you need.",
    description:
      "Machines to meter, certificates to track, or a job stuck in spreadsheets. An engineer reads every message that comes in here, and you will get a straight answer on whether we can help.",
  },
  fields: [
    { id: "name", label: "Full name", type: "text", required: true, placeholder: "Jane Smith" },
    { id: "company", label: "Company", type: "text", required: true, placeholder: "Acme Industries LLC" },
    { id: "role", label: "Job role", type: "text", required: false, placeholder: "Operations Manager" },
    { id: "email", label: "Work email", type: "email", required: true, placeholder: "jane@acme.com" },
    { id: "phone", label: "Phone number", type: "tel", required: false, placeholder: "+971 50 000 0000" },
  ],
  regions: ["United Arab Emirates", "Saudi Arabia", "India", "United Kingdom", "United States", "Other"],
  // Grouped so a facilities manager can find themselves without reading past
  // seven manufacturing sectors first.
  industryGroups: [
    {
      label: "Factories",
      options: [
        "Glass Manufacturing",
        "Plastics & Polymers",
        "Aluminium & Metal Fabrication",
        "Food & Beverage",
        "Textiles",
        "Electronics Assembly",
        "Pharmaceuticals",
      ],
    },
    {
      label: "Buildings",
      options: [
        "Commercial Towers & Offices",
        "Hotels & Resorts",
        "Retail & Malls",
        "District Cooling",
        "Hospitals & Clinics",
        "Warehousing & Logistics",
        "Facilities Management",
      ],
    },
    { label: "Other", options: ["Other"] },
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
