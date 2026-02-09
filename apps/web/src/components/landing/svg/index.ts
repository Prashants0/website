/* ═══════════════════════════════════════════════════════════
   SVG COMPONENTS BARREL EXPORT
   All SVG components are organized into logical groups:
   - shared-svgs: Reusable across multiple pages
   - homepage-svgs: Homepage-specific illustrations & icons
   - product-hero-svgs: Per-product hero illustrations
   - product-page-svgs: Architecture diagrams & use-case icons
   ═══════════════════════════════════════════════════════════ */

// Shared / reusable across pages
export {
  ProductIcon,
  TableCheckmarkSvg,
  TableDashSvg,
  ProtocolDotSvg,
  QuoteMarkSvg,
  FeatureCheckSvg,
  PricingCheckSvg,
  IntegrationDotSvg,
  UseCaseFallbackSvg,
  HorizontalArrowConnector,
  VerticalArrowConnector,
  MiniArchDiagramSvg,
} from "./shared-svgs";

// Homepage SVGs
export {
  PaperTextureSvg,
  CircuitBoardSvg,
  ArchitectureDiagramSvg,
  CryptoShieldSvg,
  KeySvg,
  ServerlessSvg,
  WorkflowSvg,
  BatchProcessSvg,
  BatchDocsSvg,
  BrowserShieldSvg,
  CloudSignSvg,
  CertificateSvg,
  DataFlowDivider,
  trustSvgIcons,
  AppStepIcon,
  SdkStepIcon,
  CryptoStepIcon,
  SignedDocStepIcon,
} from "./homepage-svgs";

// Product hero illustrations
export {
  SignBoltHeroSvg,
  BridgeHeroSvg,
  SignLiftHeroSvg,
  SignPadHeroSvg,
  productHeroSvgs,
} from "./product-hero-svgs";

// Product page SVGs (architecture diagrams, use-case icons)
export {
  ProductArchSvg,
  useCaseIcons,
} from "./product-page-svgs";

// SignBolt hero canvas
export { SignBoltHeroCanvas } from "./signbolt-hero-canvas";

// SignBridge hero canvas
export { SignBridgeHeroCanvas } from "./signbridge-hero-canvas";

// SignLift hero canvas
export { SignLiftHeroCanvas } from "./signlift-hero-canvas";

// SignPad hero canvas
export { SignPadHeroCanvas } from "./signpad-hero-canvas";
