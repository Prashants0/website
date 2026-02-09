export type AccentColor = "brand" | "violet" | "cyan" | "amber";

interface PricingTier {
  tier: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

interface FaqItem {
  q: string;
  a: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  longDesc: string;
  features: string[];
  platform: string;
  tech: string;
  metric: string;
  metricLabel: string;
  accent: AccentColor;
  useCases: string[];
  integrations: string[];
  pricing: PricingTier[];
  icon: string;
  faq: FaqItem[];
}

export const products: Product[] = [
  {
    id: "01",
    slug: "signsecure-win",
    name: "SignSecure Win",
    tagline: "The Desktop Powerhouse",
    desc: "High-volume batch PDF signing using Windows Certificate Store. Process entire folders with reusable templates, intelligent text-search placement, and automated Gmail distribution.",
    longDesc: "SignSecure Win is a native Windows desktop application engineered for organizations that need to sign thousands of PDF documents in a single operation. Built on JavaFX 22 with BouncyCastle cryptography, it connects directly to the Windows Certificate Store to access your digital certificates without any key export. Define reusable JSON signing templates once, then apply them across entire folders. Its intelligent text-search placement engine finds exactly where signatures need to go, even across varied document layouts. Once signed, documents can be automatically delivered via Gmail OAuth2 integration -- all without touching a browser.",
    features: [
      "Batch sign 10K+ PDFs",
      "Reusable JSON templates",
      "Native Windows cert store",
      "Gmail OAuth2 auto-delivery",
      "DOCX to PDF pipeline",
      "Multi-folder PDF merging",
    ],
    platform: "Windows",
    tech: "JavaFX 22 / Launch4j / BouncyCastle",
    metric: "10K+",
    metricLabel: "PDFs per batch",
    accent: "brand",
    useCases: [
      "Government departments signing bulk certificates",
      "HR teams signing 10K+ appointment letters at once",
      "Legal firms batch-signing contracts and NDAs",
      "Educational institutions signing transcripts/diplomas",
    ],
    integrations: [
      "Windows Certificate Store (CAPI)",
      "Gmail API via OAuth2",
      "Microsoft Word (DOCX conversion)",
      "JSON configuration templates",
      "File system watchers for hot-folder processing",
    ],
    pricing: [
      {
        tier: "Free",
        price: "$0",
        period: "/forever",
        features: [
          "100 PDFs/month",
          "1 certificate",
          "Manual signing",
          "Community support",
        ],
        cta: "Get Started",
      },
      {
        tier: "Starter",
        price: "$29",
        period: "/month",
        features: [
          "2,000 PDFs/month",
          "3 certificates",
          "JSON templates",
          "Email delivery",
          "Email support",
        ],
        cta: "Start Trial",
      },
      {
        tier: "Pro",
        price: "$99",
        period: "/month",
        features: [
          "Unlimited PDFs",
          "Unlimited certs",
          "DOCX pipeline",
          "PDF merging",
          "Batch templates",
          "Priority support",
        ],
        cta: "Go Pro",
        popular: true,
      },
      {
        tier: "Enterprise",
        price: "Custom",
        period: "",
        features: [
          "Volume licensing",
          "On-prem deployment",
          "Custom integrations",
          "Dedicated account manager",
          "SLA guarantee",
          "Training",
        ],
        cta: "Contact Sales",
      },
    ],
    icon: "M4 6h16M4 12h16M4 18h10",
    faq: [
      { q: "What certificate formats does SignSecure Win support?", a: "SignSecure Win works with certificates stored in the Windows Certificate Store (CAPI/CNG). It supports RSA and ECDSA keys, and can access certificates from USB tokens, smart cards, or software-installed PFX/P12 files that are registered with Windows." },
      { q: "Can I automate signing without a GUI?", a: "Yes. You can define JSON configuration templates that specify signature position, appearance, and certificate selection. These templates can be used with the batch processor to sign entire folders with zero manual interaction." },
      { q: "How does the Gmail integration work?", a: "SignSecure Win uses Gmail OAuth2 to send signed documents directly via your Gmail account. You authenticate once, and it can automatically email signed PDFs to recipients defined in your batch configuration." },
      { q: "Is there a limit on the number of PDFs per batch?", a: "The free tier allows 100 PDFs/month. Paid tiers scale up to unlimited. The application itself has been tested with batches of 40,000+ PDFs in a single run." },
    ],
  },
  {
    id: "02",
    slug: "signbridge",
    name: "SignBridge",
    tagline: "The Silent Guardian",
    desc: "Local HTTPS bridge connecting web applications to your Windows Certificate Store. Runs silently in the system tray, enabling any browser-based app to perform digital signatures without exposing private keys.",
    longDesc: "SignBridge is a lightweight desktop agent built on Electron and Java 21 that creates a secure HTTPS API on localhost:53000. It bridges the gap between browser-based web applications and hardware-bound digital certificates. Your private keys never leave the machine -- SignBridge handles all cryptographic operations locally, communicating with web apps via Ed25519 JWT-authenticated API calls. It supports batch signing of up to 20 PDFs per call, certificate-based encryption, and provides a TypeScript/JavaScript SDK for seamless frontend integration. HMAC cryptographic isolation ensures that even if multiple web apps connect simultaneously, each session remains fully isolated.",
    features: [
      "HTTPS API on localhost:53000",
      "Ed25519 JWT auth",
      "Batch 20 PDFs per call",
      "Certificate-based encryption",
      "TypeScript/JS SDK",
      "HMAC cryptographic isolation",
    ],
    platform: "Electron + Java",
    tech: "Hono / React / Java 21",
    metric: "0ms",
    metricLabel: "key exposure",
    accent: "violet",
    useCases: [
      "Banks integrating DSC signing into web portals",
      "E-governance portals requiring client-side signing",
      "Enterprise web apps needing hardware token access",
      "SaaS products adding USB token signing support",
    ],
    integrations: [
      "Any web application via REST API",
      "TypeScript/JavaScript SDK",
      "Windows Certificate Store",
      "USB hardware tokens (ePass, WatchData)",
      "Browser extensions",
    ],
    pricing: [
      {
        tier: "Free",
        price: "$0",
        period: "/forever",
        features: [
          "5 PDFs/day",
          "1 web app",
          "Community SDK",
          "Basic docs",
        ],
        cta: "Download",
      },
      {
        tier: "Starter",
        price: "$49",
        period: "/month",
        features: [
          "100 PDFs/day",
          "3 web apps",
          "TypeScript SDK",
          "Email support",
          "Auto-updates",
        ],
        cta: "Start Trial",
      },
      {
        tier: "Pro",
        price: "$149",
        period: "/month",
        features: [
          "Unlimited PDFs",
          "Unlimited apps",
          "Encryption API",
          "Batch operations",
          "Priority support",
          "Custom branding",
        ],
        cta: "Go Pro",
        popular: true,
      },
      {
        tier: "Enterprise",
        price: "Custom",
        period: "",
        features: [
          "Site license",
          "Custom SDK builds",
          "Dedicated support",
          "SLA 99.9%",
          "SSO integration",
          "Audit logging",
        ],
        cta: "Contact Sales",
      },
    ],
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    faq: [
      { q: "Does SignBridge require admin privileges to install?", a: "No. SignBridge installs in user-space and runs as a standard process. It creates a self-signed TLS certificate for localhost communication, which does not require admin rights." },
      { q: "How does the JWT authentication work?", a: "When a web app connects to SignBridge, it performs a handshake using Ed25519 key pairs. The web app receives a short-lived JWT token that must accompany every API request. Tokens expire after 15 minutes and can be refreshed." },
      { q: "Can multiple web apps use SignBridge simultaneously?", a: "Yes. HMAC cryptographic isolation ensures each connected web app has its own session context. One app cannot access certificates or signing operations initiated by another." },
      { q: "What happens if SignBridge is not running when my web app tries to connect?", a: "The TypeScript SDK includes built-in retry logic with exponential backoff. It can also prompt the user to launch SignBridge with a deep-link URL scheme." },
    ],
  },
  {
    id: "03",
    slug: "signly-api",
    name: "Signly API",
    tagline: "The Cloud Engine",
    desc: "Serverless REST API on AWS Lambda for document signing. Transform signing into a simple HTTP call with PKCS#12 certificates and comprehensive AcroForm management.",
    longDesc: "Signly API turns document signing into a simple HTTP call. Deployed on AWS Lambda with SnapStart for sub-second cold starts, it provides a comprehensive REST API for signing PDFs with PKCS#12 certificates loaded from S3, environment variables, or direct upload. Beyond signing, it offers a full AcroForm lifecycle -- create form fields, fill them programmatically, flatten them for tamper-proofing, and lock specific fields. Built on Micronaut 4.10 and Java 25 with GraalVM-ready configuration, it scales from zero to thousands of concurrent signing requests with 99.99% uptime SLA. JWT-based API authentication and OpenAPI 3.0 documentation make integration straightforward from any language or platform.",
    features: [
      "AWS Lambda + SnapStart",
      "AcroForm lifecycle (create/fill/flatten/lock)",
      "Multi-source cert loading",
      "JWT API auth",
      "S3 document pipeline",
      "Form field management",
    ],
    platform: "AWS Lambda",
    tech: "Micronaut 4.10 / Java 25",
    metric: "99.99%",
    metricLabel: "uptime SLA",
    accent: "cyan",
    useCases: [
      "SaaS platforms needing signing as a microservice",
      "Mobile apps requiring cloud-based document signing",
      "Automated document processing pipelines",
      "Form-heavy workflows (insurance, banking, govt)",
    ],
    integrations: [
      "REST API (any language/platform)",
      "AWS S3 for document storage",
      "AWS API Gateway",
      "Webhook callbacks",
      "OpenAPI 3.0 specification",
    ],
    pricing: [
      {
        tier: "Free",
        price: "$0",
        period: "/forever",
        features: [
          "50 API calls/month",
          "Test certificates",
          "Sandbox environment",
          "API docs",
        ],
        cta: "Get API Key",
      },
      {
        tier: "Starter",
        price: "$39",
        period: "/month",
        features: [
          "2,000 API calls/month",
          "Production certs",
          "S3 integration",
          "Form fields API",
          "Email support",
        ],
        cta: "Start Trial",
      },
      {
        tier: "Pro",
        price: "$129",
        period: "/month",
        features: [
          "25,000 API calls/month",
          "SnapStart enabled",
          "Batch operations",
          "Priority queue",
          "Webhook callbacks",
          "Priority support",
        ],
        cta: "Go Pro",
        popular: true,
      },
      {
        tier: "Enterprise",
        price: "Custom",
        period: "",
        features: [
          "Unlimited API calls",
          "Dedicated Lambda",
          "Custom domain",
          "VPC deployment",
          "SLA 99.99%",
          "24/7 support",
        ],
        cta: "Contact Sales",
      },
    ],
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    faq: [
      { q: "Do I need to manage my own AWS infrastructure?", a: "No. Signly API is fully managed. You get an API key and endpoint URL. We handle Lambda provisioning, S3 storage, API Gateway, scaling, and monitoring. Enterprise customers can opt for VPC deployment within their own AWS account." },
      { q: "What certificate formats are supported?", a: "Signly API supports PKCS#12 (.p12/.pfx) certificates. You can upload them directly in the API call, store them in S3, or configure them as environment variables. RSA (2048/4096) and ECDSA keys are supported." },
      { q: "How does AcroForm management work?", a: "The API provides full CRUD operations on PDF form fields. You can create text fields, checkboxes, dropdowns, and signature fields programmatically. Fill them with data, flatten to prevent editing, or lock specific fields while leaving others editable." },
      { q: "What is the cold start time?", a: "With AWS SnapStart enabled on Pro and Enterprise tiers, cold starts are typically under 200ms. Standard Lambda cold starts are 1-2 seconds. Warm invocations are consistently under 100ms." },
    ],
  },
  {
    id: "04",
    slug: "moonlight",
    name: "Moonlight",
    tagline: "The Complete Platform",
    desc: "Full-stack SaaS electronic signature platform. Upload PDFs, define multi-step workflows, send to signers via Electronic, DSC USB, or Aadhaar OTP methods.",
    longDesc: "Moonlight is a full-stack SaaS platform that brings electronic, DSC, and Aadhaar OTP signing together under one roof. Upload a PDF, drag-and-drop signature fields and form elements using the visual builder, define sequential or parallel signing workflows, and send to any number of signers. Each signer chooses their preferred method -- draw/type an electronic signature, plug in a USB DSC token via SignBridge integration, or authenticate via Aadhaar OTP for legally binding eSign. Multi-tenant organization management lets enterprises manage teams, permissions, and branding across departments. Every action is logged with a SHA-256 audit trail, and webhook APIs enable real-time integration with your existing systems.",
    features: [
      "Electronic + DSC + Aadhaar OTP",
      "Sequential/parallel workflows",
      "Drag-and-drop form builder",
      "Multi-tenant org management",
      "Webhook API",
      "SHA-256 audit trail",
    ],
    platform: "Full Stack SaaS",
    tech: "React 19 / TanStack / SST / AWS",
    metric: "3",
    metricLabel: "signature methods",
    accent: "amber",
    useCases: [
      "Companies replacing wet signatures entirely",
      "Real estate firms managing lease agreements",
      "Enterprises with complex multi-signer workflows",
      "Startups needing Aadhaar eSign compliance",
    ],
    integrations: [
      "REST API + Webhooks",
      "Aadhaar eSign gateway",
      "USB DSC tokens",
      "Email & SMS notifications",
      "Zapier / Make integrations",
    ],
    pricing: [
      {
        tier: "Free",
        price: "$0",
        period: "/forever",
        features: [
          "5 documents/month",
          "Electronic signatures",
          "1 user",
          "Basic templates",
        ],
        cta: "Sign Up Free",
      },
      {
        tier: "Starter",
        price: "$19",
        period: "/month",
        features: [
          "50 documents/month",
          "All 3 sign methods",
          "5 users",
          "Workflows",
          "Email support",
        ],
        cta: "Start Trial",
      },
      {
        tier: "Pro",
        price: "$79",
        period: "/month",
        features: [
          "500 documents/month",
          "Unlimited users",
          "Form builder",
          "Webhooks",
          "Audit trail",
          "Priority support",
          "Custom branding",
        ],
        cta: "Go Pro",
        popular: true,
      },
      {
        tier: "Enterprise",
        price: "Custom",
        period: "",
        features: [
          "Unlimited documents",
          "Multi-tenant orgs",
          "SSO/SAML",
          "Dedicated instance",
          "SLA 99.99%",
          "24/7 phone support",
        ],
        cta: "Contact Sales",
      },
    ],
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    faq: [
      { q: "What signing methods does Moonlight support?", a: "Moonlight supports three signing methods: Electronic signatures (draw/type/upload), DSC USB token signing (via SignBridge integration), and Aadhaar OTP-based eSign for legally binding signatures under Indian IT Act." },
      { q: "Can I set up multi-step signing workflows?", a: "Yes. You can define sequential workflows (signer A must sign before signer B) or parallel workflows (all signers can sign simultaneously). You can also mix both approaches with conditional routing." },
      { q: "Is Moonlight compliant with Indian regulations?", a: "Yes. Aadhaar eSign via licensed ASPs is recognized under the Information Technology Act, 2000 and the Indian Evidence Act. DSC signatures comply with the IT Act Section 3A for electronic signatures." },
      { q: "Can I white-label Moonlight for my organization?", a: "Pro and Enterprise tiers support custom branding including your logo, colors, email templates, and custom domain. Enterprise customers get a fully dedicated instance." },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export const pricingFaq: FaqItem[] = [
  { q: "Can I switch plans at any time?", a: "Yes, you can upgrade or downgrade your plan at any time. Upgrades are prorated, and downgrades take effect at the start of the next billing cycle." },
  { q: "Do you offer annual billing?", a: "Yes. Annual billing is available with a 20% discount on all paid plans. Contact sales for annual pricing details." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), wire transfers for Enterprise customers, and UPI/NetBanking for Indian customers." },
  { q: "Is there a free trial for paid plans?", a: "Yes. All paid plans come with a 14-day free trial with full feature access. No credit card required to start." },
  { q: "What happens when I exceed my plan limits?", a: "You will receive a notification at 80% and 100% usage. Overages are billed at the per-unit rate for your tier. Enterprise customers can negotiate custom overage terms." },
  { q: "Can I use multiple products under one account?", a: "Yes. Your SignSecure account works across all products. Each product has its own plan and billing, but you manage everything from a single dashboard." },
];

export const trustBadges = [
  { label: "X.509", desc: "Certificate Standard" },
  { label: "PAdES", desc: "PDF Advanced Signatures" },
  { label: "LTV", desc: "Long-Term Validation" },
  { label: "SHA-256", desc: "Cryptographic Hash" },
  { label: "256-bit AES", desc: "Encryption Standard" },
  { label: "RFC", desc: "Standards Compliant" },
] as const;

export const testimonials = [
  {
    name: "Arjun Mehta",
    role: "CTO, FinStack Technologies",
    quote:
      "SignSecure Win processes our entire quarterly compliance batch -- over 40,000 PDFs -- in under 90 minutes. It replaced a team of three people doing manual signing.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Digital, NovaBanking Corp",
    quote:
      "SignBridge gave us the holy grail: browser-based DSC signing without uploading private keys. Our security team finally approved the digital transformation initiative.",
  },
  {
    name: "Rahul Deshmukh",
    role: "VP Engineering, CloudDoc Solutions",
    quote:
      "Moonlight's triple-method approach -- Electronic, DSC, and Aadhaar OTP -- means we handle every Indian compliance requirement from a single platform. Game changer.",
  },
] as const;

export const howItWorks = [
  {
    num: "01",
    title: "Choose Your Tool",
    desc: "Desktop batch signer, localhost bridge, cloud API, or full SaaS platform -- pick what fits your architecture.",
    accent: "brand" as AccentColor,
  },
  {
    num: "02",
    title: "Configure Certs",
    desc: "Load certificates from Windows Store, PKCS#12 files, S3 buckets, or USB hardware tokens.",
    accent: "violet" as AccentColor,
  },
  {
    num: "03",
    title: "Sign Documents",
    desc: "Batch sign thousands of PDFs, call REST APIs, or send signing workflows to multiple signers.",
    accent: "cyan" as AccentColor,
  },
  {
    num: "04",
    title: "Verify & Deliver",
    desc: "SHA-256 audit trails, LTV-enabled signatures, automated email delivery, and webhook notifications.",
    accent: "amber" as AccentColor,
  },
];

export const comparisonData = [
  {
    feature: "Deployment",
    win: "Desktop",
    bridge: "Desktop Agent",
    api: "Cloud API",
    moon: "SaaS",
  },
  {
    feature: "Batch Signing",
    win: "10,000+",
    bridge: "20/call",
    api: "API driven",
    moon: "Workflow",
  },
  {
    feature: "Certificate Source",
    win: "Win Store",
    bridge: "Win Store",
    api: "PKCS#12 / S3",
    moon: "eSign Gateway",
  },
  {
    feature: "Form Fields",
    win: false as boolean | string,
    bridge: false as boolean | string,
    api: "Full CRUD",
    moon: "Drag & Drop",
  },
  {
    feature: "Multi-signer Workflows",
    win: false as boolean | string,
    bridge: false as boolean | string,
    api: false as boolean | string,
    moon: true as boolean | string,
  },
  {
    feature: "Aadhaar OTP",
    win: false as boolean | string,
    bridge: false as boolean | string,
    api: false as boolean | string,
    moon: true as boolean | string,
  },
  {
    feature: "REST API",
    win: false as boolean | string,
    bridge: "localhost",
    api: "Full REST",
    moon: "Webhook API",
  },
  {
    feature: "Email Delivery",
    win: "Gmail OAuth2",
    bridge: false as boolean | string,
    api: false as boolean | string,
    moon: "Built-in",
  },
  {
    feature: "Audit Trail",
    win: "Log files",
    bridge: "JWT logs",
    api: "CloudWatch",
    moon: "SHA-256",
  },
  {
    feature: "Platform",
    win: "Windows",
    bridge: "Win + Browser",
    api: "Any (HTTP)",
    moon: "Any (Web)",
  },
  {
    feature: "Starting Price",
    win: "Free",
    bridge: "Free",
    api: "Free",
    moon: "Free",
  },
] as const;

export const marqueeItems = [
  "BATCH PDF SIGNING",
  "WINDOWS CERT STORE",
  "LOCALHOST BRIDGE API",
  "ZERO KEY EXPOSURE",
  "AWS LAMBDA SERVERLESS",
  "ACROFORM LIFECYCLE",
  "AADHAAR OTP eSIGN",
  "SHA-256 AUDIT TRAIL",
  "MULTI-TENANT SAAS",
  "DRAG & DROP BUILDER",
  "PKCS#12 CERTIFICATES",
  "Ed25519 JWT AUTH",
  "99.99% UPTIME SLA",
  "10,000+ PDFs/BATCH",
  "DOCX TO PDF PIPELINE",
  "WEBHOOK INTEGRATIONS",
] as const;
