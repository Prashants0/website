export type AccentColor = "brand" | "violet" | "cyan" | "amber";

interface PricingTier {
  tier: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
  bestFor?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export interface PricingAddon {
  name: string;
  price: string;
  period: string;
  desc: string;
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
  bestFor: string;
  metric: string;
  metricLabel: string;
  accent: AccentColor;
  useCases: string[];
  benefits: string[];
  pricing: PricingTier[];
  icon: string;
  faq: FaqItem[];
}

export const products: Product[] = [
  {
    id: "01",
    slug: "signbolt",
    name: "SignBolt",
    tagline: "Sign Thousands of Documents in Minutes",
    desc: "Drop a folder of PDFs or Word files — SignBolt signs them all at once using your digital certificate. Set up a template once, and every signature lands in the right place, every time.",
    longDesc: "SignBolt is a Windows desktop app that turns hours of manual signing into a few-minute job. Drop an entire folder of documents, choose your digital certificate (USB token or installed certificate), pick a reusable template that tells SignBolt where to place the signature, and hit Sign. It handles PDFs directly, converts Word documents to PDF on the fly, and even merges files from multiple folders. Once everything is signed with industry-standard PAdES cryptographic signatures, SignBolt can automatically email the signed documents to recipients via Gmail — no extra steps needed.",
    features: [
      "Batch sign 10,000+ PDFs at once",
      "Reusable signing templates — set up once, reuse forever",
      "Works with Word (.docx) and PDF files",
      "Auto-email signed documents via Gmail",
      "Merge and sign PDFs from multiple folders",
      "Smart signature placement across varied layouts",
      "USB tokens and .pfx certificates",
      "PAdES + LTV cryptographic signatures",
    ],
    platform: "Windows",
    bestFor: "Teams signing large batches of documents",
    metric: "10K+",
    metricLabel: "PDFs per batch",
    accent: "brand",
    useCases: [
      "Government departments issuing thousands of signed certificates each quarter — signed in one batch, emailed automatically.",
      "HR teams sending 10,000+ appointment letters at once — drop the folder and hit Sign.",
      "Legal firms batch-signing contracts and NDAs from a shared folder — one template handles all document layouts.",
      "Universities signing transcripts and diplomas for graduating classes — Word templates auto-converted to signed PDFs.",
    ],
    benefits: [
      "Sign an entire folder in minutes, not days",
      "Auto-email signed documents to recipients",
      "Convert Word documents to signed PDFs automatically",
      "Templates ensure consistent signature placement",
      "Works with USB tokens and .pfx certificates",
      "PAdES + LTV: signatures stay valid for years",
    ],
    pricing: [
      {
        tier: "Demo Mode",
        price: "$0",
        period: "",
        features: [
          "All features included",
          "Watermark on signed PDFs",
          "Unlimited documents",
          "Test with your own files",
        ],
        cta: "Try Demo",
        bestFor: "Try before you buy",
      },
      {
        tier: "SignBolt License",
        price: "$149",
        period: "/user/year",
        features: [
          "Unlimited PDFs — no caps",
          "Unlimited certificates",
          "Signing templates",
          "Word to PDF conversion",
          "PDF merging",
          "Email support",
        ],
        cta: "Buy Now",
        popular: true,
        bestFor: "Per user, billed annually",
      },
    ],
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    faq: [
      { q: "What file formats can I sign?", a: "SignBolt signs PDF files directly. It also converts Word documents (.docx) to PDF before signing, so you can work with either format. You can even mix PDFs and Word files in the same batch." },
      { q: "What kinds of digital certificates does it support?", a: "SignBolt works with any X.509 digital certificate that Windows can see — USB tokens (like ePass, WatchData) or software certificates (.pfx/.p12 files). Just plug in your token or install your certificate, and SignBolt finds it automatically." },
      { q: "Do I have to set up the signature position for every document?", a: "No — that's what templates are for. Create a signing template once that specifies where the signature goes, what it looks like, and which certificate to use. Then just drop a folder and hit Sign. It handles everything automatically." },
      { q: "How does the auto-email feature work?", a: "After signing, SignBolt can automatically email the signed documents to recipients using your Gmail account. Connect your Gmail once, and it handles the sending based on a recipient list in your template settings." },
      { q: "How many documents can I sign at once?", a: "There's no limit. Your SignBolt license includes unlimited PDFs. We've tested it with batches of over 40,000 PDFs in a single run — it handles them without breaking a sweat. The demo mode also has no document limit, but adds a watermark to signed files." },
      { q: "What does PAdES + LTV mean for my signatures?", a: "PAdES is the European standard for PDF signatures — it means your signed documents are legally recognized worldwide. LTV (Long-Term Validation) embeds all the verification data inside the PDF itself, so the signature can be verified years from now, even if the original certificate has expired." },
    ],
  },
  {
    id: "02",
    slug: "signbridge",
    name: "SignBridge",
    tagline: "Sign From Your Browser. Keys Stay With You.",
    desc: "A small desktop app that connects your USB token to any website -- so you can digitally sign documents right from your browser without ever exposing your private key.",
    longDesc: "Most websites can't talk to the USB token plugged into your computer. SignBridge fixes that. It's a lightweight desktop app that sits in your system tray and creates a secure, encrypted tunnel between your browser and your hardware signing device. When a website asks you to sign, SignBridge handles the cryptography locally -- your private key never leaves the token, and the signed result is sent back to the website. Developers get a drop-in JavaScript SDK. End users just click \"Sign\" and approve. It's that simple.",
    features: [
      "Sign documents from any website or web app",
      "Private keys never leave your USB token",
      "Batch sign up to 20 PDFs in a single request",
      "Drop-in JavaScript SDK for developers",
      "HMAC-SHA256 session isolation per connected app",
      "Ed25519 JWT authentication between browser and agent",
    ],
    platform: "Windows + Any Browser",
    bestFor: "Websites that need hardware token signing",
    metric: "0ms",
    metricLabel: "key exposure",
    accent: "violet",
    useCases: [
      "Banking portals letting customers sign loan agreements with their USB token, right in the browser",
      "Government e-filing systems that require citizens to sign with their issued digital certificate",
      "Enterprise HR and procurement apps adding legally-binding DSC signatures to internal workflows",
      "SaaS platforms offering hardware-token signing as a premium feature for regulated industries",
    ],
    benefits: [
      "Your private key never leaves the hardware token",
      "Works with any website or browser-based app",
      "Supports USB tokens and Windows certificates",
      "Runs silently in your system tray -- no pop-ups",
      "Multiple websites can sign simultaneously, fully isolated",
    ],
    pricing: [
      {
        tier: "Custom",
        price: "Custom",
        period: "",
        features: [
          "Unlimited PDFs & connected apps",
          "Full JavaScript SDK & documentation",
          "Encryption, decryption & batch operations",
          "USB token & certificate support",
          "HMAC-SHA256 session isolation per app",
          "Priority support & dedicated engineer",
          "Custom branding & white-label options",
          "SSO, LDAP & audit logging",
          "99.9% uptime SLA",
        ],
        cta: "Talk to Us",
        bestFor: "Priced for your team, your scale, your needs",
      },
    ],
    icon: "M9 17H7A5 5 0 017 7h2m6 0h2a5 5 0 010 10h-2m-7-5h8",
    faq: [
      { q: "Do I need admin rights to install SignBridge?", a: "No. SignBridge installs in your user folder and runs as a regular desktop application. No administrator privileges are needed -- just download, install, and it's ready." },
      { q: "How does a website connect to my USB token through SignBridge?", a: "When you plug in your USB token and open a website that uses SignBridge, the website's JavaScript SDK creates a secure HTTPS connection to SignBridge running on your computer (localhost:53000). SignBridge reads the certificate from your token, signs the document hash locally, and returns only the signed result. Your private key never leaves the token." },
      { q: "Can I use SignBridge with multiple websites at the same time?", a: "Yes. Each website gets its own cryptographically isolated session using HMAC-SHA256 tokens. One website cannot see, access, or interfere with signing requests from another -- even if both are active simultaneously." },
      { q: "What happens if SignBridge isn't running when a website asks me to sign?", a: "The JavaScript SDK detects this automatically and can either show a friendly prompt asking you to launch SignBridge, or retry the connection in the background. No signing request is lost." },
      { q: "What types of signing hardware does SignBridge support?", a: "SignBridge works with any hardware that integrates with the Windows Certificate Store -- including USB tokens (like ePass, SafeNet, WatchData) and software certificates stored in Windows CAPI/CNG. If Windows can see it, SignBridge can sign with it." },
      { q: "Is SignBridge safe? Can a malicious website steal my private key?", a: "No. SignBridge uses Ed25519 JWT authentication so only authorized websites can request signatures. The private key never leaves your hardware token -- SignBridge sends only the document hash to the token for signing, and only the signed hash comes back. Zero key exposure, zero key extraction." },
    ],
  },
  {
    id: "03",
    slug: "signlift",
    name: "SignLift",
    tagline: "Add Signing to Your Product in Days, Not Months",
    desc: "A REST API that digitally signs PDFs, manages certificates, and fits into any workflow. Send a document in, get a cryptographically signed document back. Deploy as a standalone service or on AWS Lambda.",
    longDesc: "SignLift is an integration-first REST API that lets your application digitally sign PDFs with a single HTTP request. Send your document and certificate configuration, and SignLift returns a signed PDF with a PAdES-compliant cryptographic signature — the same standard used by banks, governments, and regulated industries worldwide. Bring your own certificates in PKCS#12 format (.p12/.pfx) and store them locally, in your application resources, or in AWS S3. Beyond signing, SignLift handles form field management — create, fill, lock, and flatten AcroForm fields programmatically. Deploy it as a standard Spring Boot service or on AWS Lambda with elastic scale and near-zero ops overhead. Authenticate with JWT tokens via the X-API-Token header.",
    features: [
      "Sign PDFs with a single REST API call",
      "PKCS#12 certificate support (.p12/.pfx)",
      "AcroForm field management — create, fill, lock, flatten",
      "JWT token-based API authentication",
      "Deploy as Spring Boot service or AWS Lambda",
      "Store certificates locally, in resources, or in S3",
    ],
    platform: "REST API",
    bestFor: "Engineering teams adding signing to their products",
    metric: "99.99%",
    metricLabel: "uptime SLA",
    accent: "cyan",
    useCases: [
      "SaaS platforms adding compliant PDF signing to their product — automate what used to be a manual step in your users' workflow.",
      "Mobile and web apps that need server-side signing — your app sends the PDF, SignLift returns it signed and ready to deliver.",
      "Automated document pipelines (CI/CD, invoice generation, contract processing) — sign thousands of documents without human intervention.",
      "Form-heavy workflows in insurance, banking, and government — create fields, fill them with data, sign, and lock the form in a single API call.",
    ],
    benefits: [
      "One API call to sign a document",
      "Bring your own PKCS#12 certificates",
      "PAdES-compliant digital signatures",
      "Deploy on AWS Lambda for elastic scale",
      "Works from any language that speaks HTTP",
      "No infrastructure to manage",
    ],
    pricing: [
      {
        tier: "Custom",
        price: "Custom",
        period: "",
        features: [
          "Unlimited API calls",
          "Full REST API access",
          "PKCS#12 certificate management",
          "AcroForm field lifecycle",
          "AWS Lambda or Spring Boot deployment",
          "JWT authentication",
          "Priority support & dedicated engineer",
          "Custom SLA & deployment options",
          "99.99% uptime guarantee",
        ],
        cta: "Talk to Us",
        bestFor: "Priced for your integration, your volume, your stack",
      },
    ],
    icon: "M7 16a4 4 0 01-.88-7.9A5 5 0 1115.9 6h.1a5 5 0 011 9.9M15 18l-3-3m0 0l-3 3m3-3v9",
    faq: [
      { q: "Do I need to manage any infrastructure?", a: "It depends on your deployment model. SignLift ships as a Spring Boot service you can run anywhere, or as an AWS Lambda function using a SAM template. Either way, you bring the runtime — we give you the signing engine. There's no third-party SaaS dependency; you own the deployment." },
      { q: "What certificate formats are supported?", a: "SignLift uses PKCS#12 certificates (.p12 or .pfx files) — the industry-standard format for bundling a private key with its X.509 certificate chain. You can load certificates from the local file system, from your application's packaged resources, or from an AWS S3 bucket. Both RSA and ECDSA keys are supported." },
      { q: "How does form field management work?", a: "The API gives you full control over PDF AcroForm fields. Create text fields, checkboxes, dropdowns, and signature fields programmatically. Fill them with data, lock specific fields to prevent editing, or flatten the entire form so it becomes a static, tamper-proof document. All of this happens in a single API call alongside signing." },
      { q: "How fast is the API?", a: "On AWS Lambda with SnapStart, cold starts are typically under 200ms. Warm requests complete in under 100ms. The API auto-scales to handle concurrent signing requests without any configuration on your part." },
      { q: "How does authentication work?", a: "SignLift uses token-based authentication. You include a JWT in the X-API-Token header of every request. The token is validated server-side before any signing operation proceeds. This is the same pattern used by most modern REST APIs — straightforward to integrate from any language or HTTP client." },
      { q: "What makes SignLift different from other signing APIs?", a: "SignLift is a self-hosted signing engine, not a SaaS platform that holds your documents and certificates. You deploy it in your own infrastructure, your certificates stay in your control (local, resources, or S3), and your documents never leave your network. It produces PAdES-compliant signatures with Long-Term Validation built in." },
    ],
  },
  {
    id: "04",
    slug: "signpad",
    name: "SignPad",
    tagline: "Send It. Sign It. Done.",
    desc: "Upload a document, place signature fields where you need them, pick who signs and how — electronic, USB certificate, or Aadhaar OTP — and send it. Track everything from one dashboard.",
    longDesc: "SignPad is a web-based document signing platform that handles the entire lifecycle — from uploading a PDF to collecting every last signature. Use the visual editor to drag signature fields, text boxes, and form elements exactly where they belong. Define signing order: who goes first, who signs in parallel, who just needs to approve. Each signer picks the method that works for them — draw or type a quick signature, plug in a USB token for a certificate-backed digital signature via SignBridge, or verify their identity with Aadhaar OTP for legally binding eSign under Indian law. Every action is recorded in a tamper-proof audit trail with SHA-256 integrity hashing, and real-time webhooks push updates to your CRM, ERP, or ticketing system the moment something happens.",
    features: [
      "Three signing methods — e-sign, USB digital certificate (DSC), and Aadhaar OTP",
      "Drag-and-drop document editor for placing signature and form fields",
      "Sequential and parallel signing workflows with role-based routing",
      "Reusable templates — set up once, send hundreds of times",
      "Tamper-proof audit trail with SHA-256 integrity hashing",
      "Real-time webhooks and REST API for system integration",
      "Team management with roles: owner, member, approver",
      "Credit-based usage — pay for what you send, scale as you grow",
    ],
    platform: "Web Platform",
    bestFor: "Teams replacing paper signatures entirely",
    metric: "3",
    metricLabel: "signature methods",
    accent: "amber",
    useCases: [
      "HR teams sending offer letters, NDAs, and onboarding paperwork — upload a template, add the new hire, and send. They sign from their phone in two minutes.",
      "Real estate firms managing lease agreements and sale deeds — multiple signers, sequential approval chains, and Aadhaar eSign for legally binding execution.",
      "Procurement departments routing purchase orders through approver chains — define who signs, in what order, and get notified the instant it's done.",
      "Legal teams collecting signatures on contracts, settlement agreements, and compliance declarations — full audit trail for every document, every signer, every action.",
    ],
    benefits: [
      "Three signing methods in one platform",
      "Visual drag-and-drop form builder",
      "Track signing progress in real-time",
      "SHA-256 tamper-proof audit trail",
      "Webhooks for CRM/ERP integration",
      "Custom branding for your organization",
      "Credit-based pricing — no wasted subscriptions",
      "Reusable templates for repeatable workflows",
    ],
    pricing: [
      {
        tier: "Credit-Based",
        price: "$0.20",
        period: "/credit",
        features: [
          "5 free credits/month to start",
          "All 3 signing methods included",
          "Volume discounts from $0.50 → $0.20/credit",
          "All features at every level",
          "Custom pricing for 2,500+ credits",
        ],
        cta: "Start Free",
        popular: true,
        bestFor: "Pay per document — scale as you grow",
      },
    ],
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L15.232 5.232zM3 21h18",
    faq: [
      { q: "What signing methods does SignPad support?", a: "Three methods, all in one platform. Electronic signatures let signers draw, type, or upload their signature — fast and familiar. USB digital certificate (DSC) signing uses your hardware token via SignBridge for cryptographically verifiable signatures. Aadhaar OTP eSign verifies the signer's identity through their Aadhaar number for legally binding signatures under the Indian IT Act, 2000." },
      { q: "How does credit-based pricing work?", a: "One credit = one document sent for signing. When you send a document to three people, that's one credit — not three. Credits don't expire. Buy a pack upfront, or let your balance auto-replenish when it runs low. The more credits you buy, the lower the per-credit price." },
      { q: "Can I set up multi-step signing workflows?", a: "Yes. Define the exact order signers should follow (sequential), let everyone sign at once (parallel), or mix both. You can also assign roles — signer, approver, viewer — so each person only sees and does what they need to." },
      { q: "Is SignPad legally compliant?", a: "Yes. Aadhaar eSign is recognized under the Indian IT Act, 2000 and the Indian Evidence Act. DSC signatures comply with IT Act Section 3A. Electronic signatures follow eSign and UETA standards. Every document includes a tamper-proof audit trail with SHA-256 integrity hashing for non-repudiation." },
      { q: "How does the audit trail work?", a: "Every action — document opened, field filled, signature applied, document completed — is logged with a timestamp, IP address, and SHA-256 hash. The hash chain means any tampering after the fact is mathematically detectable. You can download the full audit certificate as a PDF alongside the signed document." },
      { q: "Can I integrate SignPad with my existing systems?", a: "Yes. SignPad sends real-time webhook events (document.sent, document.viewed, document.signed, document.completed) to any URL you configure. You also get REST API v1 access for programmatic document creation, status checks, and downloads. Connect it to your CRM, ERP, HRMS, or ticketing system." },
      { q: "Can I customize SignPad with my company branding?", a: "Growth and Enterprise plans support custom branding — your logo, brand colors, custom email templates, and a white-label signing experience. Enterprise customers can use a custom domain for the signing portal." },
      { q: "What happens when a signer receives a document?", a: "They get an email with a secure link. No account needed. They click the link, review the document, fill in any required fields, and sign using whichever method you've enabled. The whole thing takes under two minutes for a typical document." },
    ],
  },
];

export const signboltAddons: PricingAddon[] = [
  {
    name: "Auto Email Delivery",
    price: "$49",
    period: "/user/year",
    desc: "Automatically email signed documents to recipients via Gmail after each batch.",
  },
  {
    name: "Word to PDF Signing",
    price: "$29",
    period: "/user/year",
    desc: "Drop Word (.docx) files directly — SignBolt converts and signs them as PDFs.",
  },
  {
    name: "Multi-Folder Merge",
    price: "$29",
    period: "/user/year",
    desc: "Combine PDFs from multiple folders into merged documents before signing.",
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
  { q: "Do you offer annual billing?", a: "Yes. Annual billing is available with a 20% discount on all paid plans. Contact us for annual pricing details." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), wire transfers for Enterprise customers, and UPI/NetBanking for Indian customers." },
  { q: "Is there a free trial for paid plans?", a: "Yes. All paid plans come with a 14-day free trial with full feature access. No credit card required to start." },
  { q: "What happens when I exceed my plan limits?", a: "You'll receive a notification at 80% and 100% usage. Overages are billed at the per-unit rate for your tier. Enterprise customers can negotiate custom overage terms." },
  { q: "Can I use multiple products under one account?", a: "Yes. Your SignSecure account works across all products. Each product has its own plan and billing, but you manage everything from a single dashboard." },
];

export const trustPoints = [
  { label: "Legally Valid", desc: "Court-admissible signatures" },
  { label: "Tamper-Proof", desc: "Any change is detected" },
  { label: "Long-Lasting", desc: "Valid for years to come" },
  { label: "Verified Identity", desc: "Signer authentication" },
  { label: "Encrypted", desc: "Bank-grade encryption" },
  { label: "Standards-Based", desc: "Global compliance" },
] as const;

/* Keep old export name as alias for backward compatibility */
export const trustBadges = trustPoints;

export const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Operations Director, FinStack Technologies",
    quote:
      "SignBolt processes our entire quarterly batch -- over 40,000 appointment letters -- in under 90 minutes. It used to take a team of three people an entire week.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Digital, NovaBanking Corp",
    quote:
      "SignBridge lets our customers sign documents right from our web portal using their USB certificates. No plugins, no uploads -- it just works. Our compliance team loves it.",
  },
  {
    name: "Rahul Deshmukh",
    role: "Product Manager, CloudDoc Solutions",
    quote:
      "SignPad's three signing methods -- electronic, USB certificate, and Aadhaar OTP -- mean we can handle every customer regardless of what signing method they prefer.",
  },
] as const;

export const howItWorks = [
  {
    num: "01",
    title: "Pick Your Product",
    desc: "Desktop batch signer, browser companion, cloud API, or complete web platform -- choose what fits your needs.",
    accent: "brand" as AccentColor,
  },
  {
    num: "02",
    title: "Set Up in Minutes",
    desc: "Install the app, get an API key, or sign up free. Every product has a free tier -- no credit card needed.",
    accent: "violet" as AccentColor,
  },
  {
    num: "03",
    title: "Sign Documents",
    desc: "Sign one document or ten thousand. Use templates, API calls, or drag-and-drop workflows.",
    accent: "cyan" as AccentColor,
  },
  {
    num: "04",
    title: "Track & Deliver",
    desc: "Tamper-proof audit trails, automatic email delivery, real-time tracking, and webhook notifications.",
    accent: "amber" as AccentColor,
  },
];

export const comparisonData = [
  {
    feature: "How It Runs",
    win: "Desktop app",
    bridge: "Desktop companion",
    api: "Cloud API",
    moon: "Web platform",
  },
  {
    feature: "Batch Signing",
    win: "10,000+",
    bridge: "20/request",
    api: "API driven",
    moon: "Workflow-based",
  },
  {
    feature: "Certificate Source",
    win: "Your computer",
    bridge: "Your computer",
    api: "Cloud-stored",
    moon: "eSign gateway",
  },
  {
    feature: "Form Fields",
    win: false as boolean | string,
    bridge: false as boolean | string,
    api: "Full management",
    moon: "Drag & drop",
  },
  {
    feature: "Multi-Signer Workflows",
    win: false as boolean | string,
    bridge: false as boolean | string,
    api: false as boolean | string,
    moon: true as boolean | string,
  },
  {
    feature: "Aadhaar OTP Signing",
    win: false as boolean | string,
    bridge: false as boolean | string,
    api: false as boolean | string,
    moon: true as boolean | string,
  },
  {
    feature: "API Access",
    win: false as boolean | string,
    bridge: "Local only",
    api: "Full REST API",
    moon: "Webhook API",
  },
  {
    feature: "Email Delivery",
    win: "Via Gmail",
    bridge: false as boolean | string,
    api: false as boolean | string,
    moon: "Built-in",
  },
  {
    feature: "Audit Trail",
    win: "Log files",
    bridge: "Session logs",
    api: "API logs",
    moon: "Full audit trail",
  },
  {
    feature: "Platform",
    win: "Windows",
    bridge: "Windows + Browser",
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
  "BATCH SIGNING",
  "DIGITAL CERTIFICATES",
  "BROWSER SIGNING",
  "KEYS STAY LOCAL",
  "CLOUD API",
  "FORM FIELD MANAGEMENT",
  "AADHAAR OTP SIGNING",
  "TAMPER-PROOF AUDIT TRAIL",
  "TEAM MANAGEMENT",
  "DRAG & DROP BUILDER",
  "MULTI-SIGNER WORKFLOWS",
  "SECURE AUTHENTICATION",
  "99.99% UPTIME",
  "10,000+ PDFs PER BATCH",
  "WORD TO PDF CONVERSION",
  "WEBHOOK INTEGRATIONS",
] as const;
