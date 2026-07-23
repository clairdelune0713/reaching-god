"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProjectInfoItem = { label: string; value: string };

type CustomTabContent = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  description: string;
  details?: string[];
  meta?: { label: string; value: string }[];
};

type ProjectData = {
  slug: string;
  number: string;
  title: string;
  chineseTitle?: string;
  subtitle: string;
  statement: string;
  detail: string;
  background: string;
  approachTitle: string;
  approachText: string;
  projectInfo: ProjectInfoItem[];
  services: string[];
  videoUrl: string;
  embedUrl: string;
  accentColor: string;
  closing: string;
  
  // Custom bespoke sections per project
  customTabSectionTitle?: string;
  customTabs?: CustomTabContent[];
  extraSections?: { title: string; content: string | string[] }[];
  galleryTitle?: string;
  galleryItems?: { title: string; category: string; aspect?: string }[];
};

const projectsData: Record<string, ProjectData> = {
  "oc-aifx-1": {
    slug: "oc-aifx-1",
    number: "01",
    title: "GOOGLE CLOUD SUMMIT: OC.AIFX 1 MODEL DEBUT",
    subtitle: "PROPRIETARY MODEL DEVELOPMENT",
    statement: "Worlds are no longer found. They are summoned.",
    detail: "Feature-scale spectacle shaped through AI, live-action craft and relentless imagination.",
    background: "For the first time in public, One Cool AIFX unveiled OC.AIFX 1—our in-context domain-adaptive video generation model—alongside Google Veo 2 in a joint showcase at the 2025 Hong Kong Google Cloud Summit on 3 June 2025. The showcase introduced OC.AIFX 1 as a proprietary model developed around the visual requirements of professional film and entertainment production.",
    approachTitle: "02 — THE SHOWCASE",
    approachText: "Presented alongside Google Veo 2, the demonstration used the cinematic universe of Warriors of Future to explore how proprietary model development and leading generative technology could work together within a professional production workflow. The resulting showcase demonstrated the potential for a domain-adaptive model to operate within an established visual universe rather than producing imagery without a defined production context.",
    projectInfo: [
      { label: "PROJECT", value: "OC.AIFX 1 Model Debut" },
      { label: "EVENT", value: "2025 Hong Kong Google Cloud Summit" },
      { label: "DATE", value: "3 June 2025" },
      { label: "MODEL", value: "OC.AIFX 1" },
      { label: "SHOWCASED ALONGSIDE", value: "Google Veo 2" },
      { label: "FORMAT", value: "Proprietary Model Showcase" },
    ],
    services: [
      "Proprietary Model Development",
      "In-Context Domain Adaptation",
      "AI Video Generation",
      "Showcase Creative Development",
      "Film-Workflow Integration",
      "Production and Post-Production",
    ],
    videoUrl: "https://video.henrywithu.com/w/hYfxKmHQGNbaSauDDB9VhW",
    embedUrl: "https://video.henrywithu.com/videos/embed/hYfxKmHQGNbaSauDDB9VhW",
    accentColor: "#FFC627",
    closing: "A PROPRIETARY MODEL DEVELOPED FOR PRODUCTION-SPECIFIC CINEMATIC WORLDS.",
    galleryTitle: "04 — MEDIA GALLERY & SHOWCASE OUTPUTS",
    galleryItems: [
      { title: "FULL MODEL SHOWCASE", category: "KEYNOTE VIDEO" },
      { title: "OC.AIFX 1 + GOOGLE VEO 2 OUTPUT", category: "GENERATIVE TEST" },
      { title: "SELECTED SHOWCASE FRAMES", category: "4K STILLS" },
      { title: "WARRIORS OF FUTURE VISUAL TEST", category: "CINEMATIC UNIVERSE" },
      { title: "GOOGLE CLOUD SUMMIT COVERAGE", category: "PRESS & REVIEWS" },
    ],
  },

  "welab": {
    slug: "welab",
    number: "02",
    title: "WELAB: HK’S FIRST FULLY AI-POWERED COMMERCIAL",
    subtitle: "AI COMMERCIAL PRODUCTION",
    statement: "A campaign can move at the speed of an idea.",
    detail: "Cinematic advertising built to turn a single proposition into a living visual language.",
    background: "One Cool AIFX demonstrated how generative AI could be applied “invisibly” through Hong Kong’s first fully AI-powered fintech commercial campaign. Created for WeLend, a member of WeLab, in collaboration with Google Gemini, the campaign was released across television, cinema, MTR, billboards, iBillboard and social media. The campaign combined emotional storytelling, product communication and multi-format production within one connected AI-powered campaign system.",
    approachTitle: "02 — THE CREATIVE IDEA",
    approachText: "EMBRACE YOUR RACE AGAINST TIME. Just as WeLend’s AI loan services are designed to save time, the campaign used AI production to visualise the urgency of living now. The storytelling was divided into two emotional narratives: The family story explored young parents experiencing guilt over important moments missed; the relationship story focused on young couples allowing work demands to take priority over time together. Together, the stories positioned WeLend as an answer to 'time poverty'—encouraging Hong Kong audiences to stop waiting and take action.",
    projectInfo: [
      { label: "BRAND", value: "WeLend" },
      { label: "PARENT COMPANY", value: "WeLab" },
      { label: "COLLABORATION", value: "Google Gemini" },
      { label: "FORMAT", value: "Integrated AI-Powered Commercial Campaign" },
      { label: "CAMPAIGN THEME", value: "Embrace Your Race Against Time" },
    ],
    services: [
      "Creative Development",
      "AI Commercial Production",
      "Integrated Campaign Production",
      "Campaign Adaptation",
      "Editing",
      "Visual Effects",
      "Post-Production",
      "Multi-Format Delivery",
    ],
    videoUrl: "https://video.henrywithu.com/w/6brriZm7p4RAH7RsFQ3xQ9",
    embedUrl: "https://video.henrywithu.com/videos/embed/6brriZm7p4RAH7RsFQ3xQ9",
    accentColor: "#FFC627",
    closing: "AI WORKED INVISIBLY. THE HUMAN STORY REMAINED AT THE CENTRE.",
    customTabSectionTitle: "04 — CAMPAIGN CONTENT ARCHITECTURE",
    customTabs: [
      {
        id: "main-campaign",
        title: "MAIN CAMPAIGN FILM",
        badge: "95 SECONDS",
        description: "The hero narrative encapsulating the overarching philosophy 'Embrace Your Race Against Time'. Released across high-impact broadcast and digital platforms.",
        details: ["Television Broadcast", "Cinema Pre-Rolls", "Social Media Hero Cut", "iBillboard Giant Displays"],
        meta: [
          { label: "DURATION", value: "95 Seconds" },
          { label: "FORMAT", value: "Hero Brand Film" },
          { label: "NARRATIVE", value: "Dual Emotional Story Arc" },
        ],
      },
      {
        id: "thematic-films",
        title: "THEMATIC CUTDOWNS",
        badge: "30 SECONDS × 2",
        description: "Two dedicated emotional narratives tailored for targeted audience demographics, focusing on family life and modern relationships.",
        details: [
          "Family Theme: Exploring young parents experiencing guilt over missed milestones.",
          "Relationship Theme: Focusing on young couples balancing work pressures and togetherness.",
        ],
        meta: [
          { label: "CUTDOWN I", value: "Family Story (30s)" },
          { label: "CUTDOWN II", value: "Relationship Story (30s)" },
          { label: "TARGETING", value: "Demographic Specific" },
        ],
      },
      {
        id: "product-films",
        title: "PRODUCT FEATURES",
        badge: "15 SECONDS × 3",
        description: "Rapid, feature-specific AI commercials highlighting key financial offerings with visual clarity and speed.",
        details: [
          "15-Second Product Feature — Personal Loan",
          "15-Second Product Feature — Balance Transfer",
          "15-Second Product Feature — Tax Season Special",
        ],
        meta: [
          { label: "FEATURE I", value: "Personal Loan" },
          { label: "FEATURE II", value: "Balance Transfer" },
          { label: "FEATURE III", value: "Tax Season" },
        ],
      },
    ],
    extraSections: [
      {
        title: "05 — MULTI-FORMAT CAMPAIGN ROLLOUT",
        content: [
          "• BROADCAST & ENTERTAINMENT: Prime-time Television broadcast, full-screen Cinema ads, MTR station-wide digital network.",
          "• OUTDOOR & DOOH: High-impact street Billboards, iBillboard LED landmarks, dynamic outdoor displays across Hong Kong.",
          "• DIGITAL & SOCIAL: Multi-platform targeted video delivery on Instagram, Facebook, YouTube, and mobile programmatic ads.",
        ],
      },
    ],
    galleryTitle: "MEDIA & ROLLOUT HIGHLIGHTS",
    galleryItems: [
      { title: "95s MAIN CAMPAIGN FILM", category: "HERO VIDEO" },
      { title: "FAMILY THEME CUTDOWN", category: "30s THEMATIC" },
      { title: "RELATIONSHIP THEME CUTDOWN", category: "30s THEMATIC" },
      { title: "MTR NETWORK DOMINATION", category: "DOOH ROLLOUT" },
      { title: "iBILLBOARD LANDMARK DISPLAY", category: "OUTDOOR DISPLAY" },
    ],
  },

  "back-to-the-past": {
    slug: "back-to-the-past",
    number: "03",
    title: "AI-POWERED FESTIVE MOVIE PROMOTION",
    chineseTitle: "尋秦記",
    subtitle: "AI FILM PROMOTION",
    statement: "History returns with a new pulse.",
    detail: "Cultural memory, myth and machine-made atmospheres converge in a cinematic resurrection.",
    background: "One Cool AIFX created a series of festive promotional films for Back to the Past (尋秦記), placing the film’s characters and historical universe within playful seasonal scenarios. The project included Mid-Autumn Festival teasers, a three-part Halloween promotion and Christmas-themed content. Each campaign offered a new interpretation of the established film world while keeping its characters visible and relevant during important cultural and seasonal moments.",
    approachTitle: "02 — THE APPROACH",
    approachText: "The AI-powered production workflow allowed One Cool Pictures to respond quickly to time-sensitive promotional opportunities. Content of this scale and visual variety would otherwise have been difficult to produce within conventional budgets and scheduling constraints. Across the campaign, ancient warriors encountered moonlit rabbits, modern homes, vampires, monsters, cinema audiences and Christmas traditions—extending the film’s universe into unexpected new situations.",
    projectInfo: [
      { label: "PROJECT", value: "Back to the Past Festive Movie Promotion" },
      { label: "CHINESE TITLE", value: "尋秦記" },
      { label: "CLIENT", value: "One Cool Pictures" },
      { label: "FORMAT", value: "AI-Powered Film Promotion" },
      { label: "CAMPAIGN PERIODS", value: "Mid-Autumn, Halloween, Christmas" },
    ],
    services: [
      "Creative Development",
      "AI Video Production",
      "Film-Promotion Production",
      "Character Adaptation",
      "Cinematic-Universe Extension",
      "Editing",
      "Visual Effects",
      "Post-Production",
    ],
    videoUrl: "https://video.henrywithu.com/w/qxpUFhgVZnhBd4wWKy6m8q",
    embedUrl: "https://video.henrywithu.com/videos/embed/qxpUFhgVZnhBd4wWKy6m8q",
    accentColor: "#FFC627",
    closing: "ONE FILM UNIVERSE. REIMAGINED FOR EVERY FESTIVE MOMENT.",
    customTabSectionTitle: "04 — FESTIVE CAMPAIGN PERIODS",
    customTabs: [
      {
        id: "mid-autumn",
        title: "MID-AUTUMN FESTIVAL",
        badge: "3 TEASERS",
        description: "Three promotional teasers reimagining the characters of Back to the Past through moonlit imagery, rabbits and playful encounters between ancient and contemporary culture.",
        details: ["Mid-Autumn Festival Teaser I", "Mid-Autumn Festival Teaser II", "Mid-Autumn Festival Teaser III"],
        meta: [
          { label: "SEASON", value: "Mid-Autumn Festival" },
          { label: "VISUAL MOTIFS", value: "Moonlight, Jade Rabbits, Ancient Palace" },
          { label: "TONE", value: "Poetic & Playful" },
        ],
      },
      {
        id: "halloween",
        title: "HALLOWEEN PROMOTION",
        badge: "3-PART SERIES",
        description: "A three-part promotional series placing characters from the film within contemporary supernatural and horror-comedy scenarios.",
        details: ["Halloween Promotion — Part I", "Halloween Promotion — Part II", "Halloween Promotion — Part III"],
        meta: [
          { label: "SEASON", value: "Halloween" },
          { label: "VISUAL MOTIFS", value: "Vampires, Monsters, Modern Homes" },
          { label: "TONE", value: "Supernatural Horror-Comedy" },
        ],
      },
      {
        id: "christmas",
        title: "CHRISTMAS SPECIAL",
        badge: "SPECIAL RELEASE",
        description: "Christmas-themed content introducing modern festive traditions and imagery into the established world of Back to the Past.",
        details: ["Christmas Promotional Content", "Festive Character Adaptation", "Seasonal Cinema Interstitials"],
        meta: [
          { label: "SEASON", value: "Christmas" },
          { label: "VISUAL MOTIFS", value: "Winter Lights, Festive Decor, Modern Meets Ancient" },
          { label: "TONE", value: "Celebratory & Warm" },
        ],
      },
    ],
    galleryTitle: "CAMPAIGN STILLS & TEASER FRAMES",
    galleryItems: [
      { title: "MID-AUTUMN MOONLIT TEASER", category: "TEASER STILL" },
      { title: "HALLOWEEN PART I: SUPERNATURAL", category: "CAMPAIGN STILL" },
      { title: "HALLOWEEN PART II: MONSTER ENCOUNTER", category: "CAMPAIGN STILL" },
      { title: "CHRISTMAS SPECIAL EDITION", category: "PROMO FRAME" },
      { title: "CHARACTER ADAPTATION TEST", category: "AI WORKFLOW" },
    ],
  },

  "hybrid-ai-music-video": {
    slug: "hybrid-ai-music-video",
    number: "04",
    title: "HYBRID AI MUSIC VIDEO PRODUCTION",
    subtitle: "HYBRID AI MV PRODUCTION",
    statement: "Music becomes architecture for impossible feeling.",
    detail: "A performance world stretched beyond the lens through hybrid production and generative motion.",
    background: "Since 2025, One Cool AIFX and OCGO have developed a growing body of hybrid and AICG music-video work. Each production combines traditional filmmaking, live-action performance, AI-generated content and professional post-production in a different way. The objective is not to impose one AI aesthetic on every artist, but to develop the creative and technical system required by each song.",
    approachTitle: "02 — THE PRODUCTION APPROACH",
    approachText: "In some projects, AI expands the environments and transformations surrounding a filmed performance. In others, proprietary technology is used to reinterpret familiar screen identities and connect multiple cinematic universes. By combining a traditional live-action shoot with AI enhancement, the production bypassed conventional CGI bottlenecks and enabled multiple established cinematic universes to be reinterpreted within one music video.",
    projectInfo: [
      { label: "PRODUCTION", value: "One Cool AIFX × OCGO" },
      { label: "PRODUCED FOR", value: "Triple S, One Cool Music, Sky High" },
      { label: "FORMAT", value: "Hybrid Music Video & AI Visual Enhancement" },
      { label: "FEATURED ARTISTS", value: "胡子彤, 陳苡臻, 古天樂" },
    ],
    services: [
      "Creative Development",
      "Traditional Filming",
      "Hybrid AI Production",
      "AICG Production",
      "AI Visual Enhancement",
      "Character Reinterpretation",
      "Editing",
      "Visual Effects",
      "Colour and Finishing",
    ],
    videoUrl: "https://video.henrywithu.com/w/7vShiUEuhpAhJ2d4TEoDJJ",
    embedUrl: "https://video.henrywithu.com/videos/embed/7vShiUEuhpAhJ2d4TEoDJJ",
    accentColor: "#FFC627",
    closing: "THE PERFORMANCE REMAINS HUMAN. AI EXPANDS WHAT THE PRODUCTION CAN ACHIEVE.",
    customTabSectionTitle: "04 — FEATURED MUSIC VIDEO PRODUCTIONS",
    customTabs: [
      {
        id: "wu-tsz-tung",
        title: "胡子彤 《我獨自升級》",
        badge: "OFFICIAL MV",
        description: "A hybrid music-video production combining traditional filmmaking with AI-generated visual enhancement and transformation. Live-action performance remains at the centre, while AI expands the atmosphere, environments and visual possibilities surrounding the artist.",
        details: ["Live-Action Filmed Performance", "AI Atmospheric Expansion", "Environment Transformation", "Selected Concept Frames"],
        meta: [
          { label: "ARTIST", value: "胡子彤 (Wu Tsz Tung)" },
          { label: "PRODUCED FOR", value: "Triple S" },
          { label: "METHOD", value: "Traditional Shoot + AI Visual Enhancement" },
        ],
      },
      {
        id: "jessica-chan",
        title: "陳苡臻 《擊敗99%》",
        badge: "OFFICIAL MV",
        description: "A hybrid music-video production using live-action performance as its emotional centre while AI extends the visual treatment beyond the limitations of the physical set.",
        details: ["Emotional Live Performance", "Set Extension & Transformation", "Surreal AI Backgrounds", "Colour & Finishing Integration"],
        meta: [
          { label: "ARTIST", value: "陳苡臻 (Jessica Chan)" },
          { label: "PRODUCED FOR", value: "One Cool Music / Sky High Entertainment" },
          { label: "METHOD", value: "Live Action + Set Extension AI" },
        ],
      },
      {
        id: "louis-koo",
        title: "古天樂 《世紀大騙局》",
        badge: "LOUIS KOO MV",
        description: "TRADITIONAL SHOOT + AI ENHANCEMENT. Louis Koo's 'Con of the Century' music video reimagines his iconic roles through OC.AIFX 1. The AI-driven narrative brings characters from across his cinematic legacy together within one connected and stylised visual universe.",
        details: ["Iconic Character Reinterpretation", "OC.AIFX 1 Proprietary Model Output", "CGI Bottleneck Bypass", "Legacy Cinematic Universe Merge"],
        meta: [
          { label: "ARTIST", value: "古天樂 (Louis Koo)" },
          { label: "TECHNOLOGY", value: "Powered by OC.AIFX 1" },
          { label: "PRODUCED FOR", value: "One Cool Music / Sky High Entertainment" },
        ],
      },
    ],
    galleryTitle: "MUSIC VIDEO STILLS & TRANSFORMATION FRAMES",
    galleryItems: [
      { title: "胡子彤 《我獨自升級》 PERFORMANCE", category: "MV STILL" },
      { title: "陳苡臻 《擊敗99%》 SET EXTENSION", category: "MV STILL" },
      { title: "古天樂 《世紀大騙局》 CHARACTER MERGE", category: "OC.AIFX 1 FRAME" },
      { title: "LIVE-ACTION VS AI TRANSFORMATION", category: "BEHIND THE SCENES" },
      { title: "ENVIRONMENT CONCEPT RENDER", category: "VISUAL EFFECTS" },
    ],
  },

  "kooloo": {
    slug: "kooloo",
    number: "05",
    title: "KOOLOO: ORIGINAL IP DEVELOPMENT & INCUBATION",
    subtitle: "ORIGINAL IP CREATION",
    statement: "Characters begin as sparks. We give them a universe.",
    detail: "Original IP designed to travel across film, campaigns, collectibles and culture.",
    background: "KOOLOO is an original character-led intellectual property being developed through an integrated process of character creation, story development, world-building, visual research and AI-assisted prototyping. The project is not being approached as a single character design. The development process explores how KOOLOO can exist consistently across different stories, environments, formats and stages of production.",
    approachTitle: "02 — THE APPROACH",
    approachText: "By developing the creative language and production system together, One Cool AIFX can establish a consistent foundation for the IP before entering larger-scale production. The incubation process is designed to test and refine KOOLOO’s visual identity, personality, narrative potential, world and long-term adaptability. This approach allows the character and its universe to develop as one connected system rather than as a collection of disconnected assets.",
    projectInfo: [
      { label: "PROJECT", value: "KOOLOO Original IP" },
      { label: "CATEGORY", value: "Original IP Creation" },
      { label: "DEVELOPMENT TYPE", value: "IP Development & Incubation" },
      { label: "CURRENT STAGE", value: "Character, Story & World Development" },
      { label: "PRODUCTION APPROACH", value: "Creative Dev + AI Prototyping" },
    ],
    services: [
      "Original IP Development",
      "Character Design",
      "Story Development",
      "World-Building",
      "Visual Prototyping",
      "AI Workflow Development",
      "Production Planning",
    ],
    videoUrl: "https://video.henrywithu.com/w/bpATqtNwc5d235NSHjKcGP",
    embedUrl: "https://video.henrywithu.com/videos/embed/bpATqtNwc5d235NSHjKcGP",
    accentColor: "#FFC627",
    closing: "FROM AN ORIGINAL CHARACTER TO A WORLD BUILT FOR CONTINUED DEVELOPMENT.",
    customTabSectionTitle: "04 — INCUBATION & DEVELOPMENT ROADMAP",
    customTabs: [
      {
        id: "char-dev",
        title: "CHARACTER DEVELOPMENT",
        badge: "FOUNDATION",
        description: "Defining KOOLOO's signature visual silhouette, emotional spectrum, and behavioral nuances across diverse scenarios.",
        details: [
          "Character Identity & Core Silhouette",
          "Personality & Expression Matrix",
          "Poses & Dynamic Action Sheets",
          "Design Variations & Outfit Explorations",
          "Character-Consistency AI Testing",
        ],
        meta: [
          { label: "PILLAR", value: "Character Design" },
          { label: "FOCUS", value: "Consistency & Personality" },
          { label: "METHOD", value: "AI-Assisted Prototyping" },
        ],
      },
      {
        id: "story-world",
        title: "STORY & WORLD-BUILDING",
        badge: "UNIVERSE",
        description: "Constructing the narrative mythology, environmental concepts, and supporting cast that give KOOLOO a thriving ecosystem.",
        details: [
          "Story Development & Lore Bible",
          "Narrative Exploration & Arc Mapping",
          "Environment & Architecture Concepts",
          "Supporting Character Cast Design",
          "Visual-Language & Color Systems",
        ],
        meta: [
          { label: "PILLAR", value: "World-Building" },
          { label: "FOCUS", value: "Lore & Environments" },
          { label: "METHOD", value: "Visual Research & Concept Art" },
        ],
      },
      {
        id: "prototyping",
        title: "PROTOTYPING & PRODUCTION",
        badge: "TESTING",
        description: "Testing animation capabilities, proof-of-concept clips, and AI workflows to ensure readiness for multi-format deployment.",
        details: [
          "AI-Assisted 3D & 2D Prototyping",
          "Rigging & Animation Motion Tests",
          "Visual Proofs of Concept",
          "Production Pipeline Testing",
          "AI Workflow Optimization",
        ],
        meta: [
          { label: "PILLAR", value: "Production Pipeline" },
          { label: "FOCUS", value: "Animation & Workflow" },
          { label: "METHOD", value: "Rapid Iterative Testing" },
        ],
      },
      {
        id: "formats",
        title: "POTENTIAL FORMATS",
        badge: "CROSS-MEDIA",
        description: "Designing the IP to seamlessly expand across animation, entertainment, commercials, digital storytelling, and physical collectibles.",
        details: [
          "Animated Series & Short-Form Content",
          "Digital Storytelling & Web Experiences",
          "Music & Entertainment Collaborations",
          "Character-Led Commercial Campaigns",
          "Physical Collectibles & Merchandising",
          "Long-Form Film Development",
        ],
        meta: [
          { label: "PILLAR", value: "Commercial Ecosystem" },
          { label: "FOCUS", value: "Multi-Platform Adaptability" },
          { label: "METHOD", value: "Integrated Brand Strategy" },
        ],
      },
    ],
    galleryTitle: "KOOLOO CONCEPT ART & PROTOTYPE FRAMES",
    galleryItems: [
      { title: "KOOLOO CHARACTER SILHOUETTE", category: "CONCEPT ART" },
      { title: "EXPRESSION & PERSONALITY SHEET", category: "MODEL SHEET" },
      { title: "ENVIRONMENT & WORLD CONCEPT", category: "WORLD-BUILDING" },
      { title: "ANIMATION PROOF OF CONCEPT", category: "PROTOTYPE" },
      { title: "CHARACTER CONSISTENCY TEST", category: "AI OUTPUT" },
    ],
  },
};

const slugsOrdered = ["oc-aifx-1", "welab", "back-to-the-past", "hybrid-ai-music-video", "kooloo"];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: PageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const project = projectsData[slug];

  const [activeTabId, setActiveTabIndex] = useState<string>("");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<{ title: string; category: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project && project.customTabs && project.customTabs.length > 0) {
      setActiveTabIndex(project.customTabs[0].id);
    }
  }, [slug, project]);

  if (!project) {
    return (
      <div className="project-not-found">
        <p>Project not found.</p>
        <Link href="/" className="back-link">Return to Homepage</Link>
      </div>
    );
  }

  const currentIndex = slugsOrdered.indexOf(slug);
  const prevSlug = slugsOrdered[(currentIndex - 1 + slugsOrdered.length) % slugsOrdered.length];
  const nextSlug = slugsOrdered[(currentIndex + 1) % slugsOrdered.length];

  const handleBackToIndex = (e: React.MouseEvent) => {
    e.preventDefault();
    const index = slugsOrdered.indexOf(slug) + 1;
    sessionStorage.setItem("lastProjectChapter", index.toString());
    router.push("/", { scroll: false });
  };

  const currentTab = project.customTabs?.find((t) => t.id === activeTabId) || project.customTabs?.[0];

  return (
    <div className="project-detail-root" style={{ "--project-accent": project.accentColor } as React.CSSProperties}>
      {/* High-End Atmospheric Accents */}
      <div className="project-ambient-halo" />
      <div className="project-grid-overlay" />
      <div className="cinematic-linear-glow" />

      {/* Luxury Minimalist Header */}
      <header className="project-header">
        <div className="project-brand">
          <Link href="/" className="project-logo-link" onClick={handleBackToIndex}>
            <span className="gold-letter">ONE COOL</span>
            <span className="dim-letter">AIFX</span>
          </Link>
        </div>
        <div className="header-metadata-tag">
          <span>CAMPAIGN CASE STUDY // DOSSIER 0{currentIndex + 1}</span>
        </div>
        <button
          type="button"
          onClick={handleBackToIndex}
          className="close-project-btn"
          aria-label="Close Project"
        >
          <span>CLOSE PROJECT</span>
          <span className="close-icon">×</span>
        </button>
      </header>

      {/* Main Editorial Content */}
      <main className="project-main">
        
        {/* EDITORIAL HERO */}
        <section className="editorial-hero">
          <div className="editorial-hero-grid">
            <div className="hero-index-column">
              <span className="editorial-vertical-num">0{currentIndex + 1}</span>
              <div className="vertical-line" style={{ backgroundColor: project.accentColor }} />
              <span className="editorial-vertical-label">DOSSIER</span>
            </div>
            
            <div className="hero-content-column">
              <div className="editorial-eyebrow">
                <span className="eyebrow-accent-dot" style={{ backgroundColor: project.accentColor }} />
                <span>{project.subtitle}</span>
              </div>

              {project.chineseTitle && (
                <div className="hero-chinese-title">{project.chineseTitle}</div>
              )}

              <h1 className="hero-title">{project.title}</h1>
              
              <div className="editorial-statement-block">
                <p className="hero-statement">“{project.statement}”</p>
                <div className="statement-bar" style={{ backgroundColor: project.accentColor }} />
              </div>
              
              <p className="hero-detail">{project.detail}</p>
            </div>
          </div>
        </section>

        {/* PROMINENT METADATA DOSSIER BAR (WatchHouse / Payy Style) */}
        <section className="project-metadata-dossier-bar">
          <div className="dossier-metadata-grid">
            {project.projectInfo.map((info, idx) => (
              <div className="dossier-meta-item" key={idx}>
                <span className="dossier-meta-label">{info.label}</span>
                <span className="dossier-meta-val">{info.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ULTRA-WIDE CINEMATIC VIDEO PLATFORM */}
        <section className="project-player-section">
          <div className="editorial-player-frame">
            <div className="player-corner-accent top-left">+</div>
            <div className="player-corner-accent top-right">+</div>
            <div className="player-corner-accent bottom-left">+</div>
            <div className="player-corner-accent bottom-right">+</div>
            
            <div className="player-meta-strip top">
              <span>SYSTEM: PEERTUBE PRORES STREAM</span>
              <span className="live-badge"><i className="live-dot" /> LIVE SHOWCASE STREAM</span>
              <span>1080P // CINEMASCOPE 2.39:1</span>
            </div>
            
            <div className="player-aspect-container">
              <iframe
                src={`${project.embedUrl}?title=0&warningTitle=0&peertubeLink=0`}
                className="peertube-iframe"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                title={project.title}
                loading="lazy"
              />
            </div>
            
            <div className="player-meta-strip bottom">
              <span>CINEMA AUDIO // CELESTIAL SOUNDSCAPE</span>
              <span className="interaction-tip">CLICK TO UNMUTE / PLAY FULLSCREEN</span>
              <span>ONE COOL AIFX ARCHIVE</span>
            </div>
          </div>
        </section>

        {/* EDITORIAL BESPOKE DOSSIER GRID */}
        <section className="editorial-dossier-grid">
          
          {/* Card 1: Narrative & Context */}
          <div className="dossier-card narrative-card-large">
            <div className="dossier-card-header">
              <span className="dossier-card-num">01 /</span>
              <h3>BACKGROUND & CONCEPT</h3>
            </div>
            <div className="dossier-card-body">
              <p>{project.background}</p>
            </div>
            <div className="dossier-card-footer">
              <span>CLASSIFIED INTERNALLY // ONE COOL AIFX</span>
            </div>
          </div>

          {/* Card 2: Technical Approach */}
          <div className="dossier-card narrative-card-large">
            <div className="dossier-card-header">
              <span className="dossier-card-num">02 /</span>
              <h3>{project.approachTitle.startsWith("02 — ") ? project.approachTitle.substring(5) : project.approachTitle}</h3>
            </div>
            <div className="dossier-card-body">
              <p>{project.approachText}</p>
            </div>
            <div className="dossier-card-footer">
              <span>OPERATIONAL WORKFLOW // ACTIVE</span>
            </div>
          </div>

        </section>

        {/* BESPOKE CUSTOM TABBED INTERACTIVE MODULE (For Campaign Content, Festive Seasons, MV Tracks, IP Pillars) */}
        {project.customTabs && project.customTabs.length > 0 && (
          <section className="bespoke-interactive-section">
            <div className="section-header-tag">
              <span className="gold-dash">—</span>
              <h2>{project.customTabSectionTitle || "03 — DETAILED BREAKDOWN"}</h2>
            </div>

            <div className="custom-tabs-navigation">
              {project.customTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`custom-tab-btn ${activeTabId === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTabIndex(tab.id)}
                >
                  <span className="tab-title">{tab.title}</span>
                  {tab.badge && <span className="tab-badge">{tab.badge}</span>}
                </button>
              ))}
            </div>

            {currentTab && (
              <div className="custom-tab-content-card">
                <div className="tab-content-main">
                  <div className="tab-content-header">
                    <h3>{currentTab.title}</h3>
                    {currentTab.badge && <span className="tab-header-badge">{currentTab.badge}</span>}
                  </div>

                  <p className="tab-description">{currentTab.description}</p>

                  {currentTab.details && currentTab.details.length > 0 && (
                    <div className="tab-details-list">
                      <h4>DELIVERABLE DETAILS & HIGHLIGHTS</h4>
                      <ul>
                        {currentTab.details.map((d, i) => (
                          <li key={i}>
                            <span className="list-dot">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {currentTab.meta && currentTab.meta.length > 0 && (
                  <div className="tab-content-sidebar">
                    <h4>SPECIFICATIONS</h4>
                    <div className="tab-sidebar-meta">
                      {currentTab.meta.map((m, idx) => (
                        <div key={idx} className="tab-sidebar-row">
                          <span className="meta-label">{m.label}</span>
                          <span className="meta-val">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* SERVICES DELIVERED MODULE */}
        <section className="bespoke-services-section">
          <div className="dossier-card services-card-bespoke span-full-width">
            <div className="dossier-card-header">
              <span className="dossier-card-num">05 /</span>
              <h3>SERVICES & CAPABILITIES DELIVERED</h3>
            </div>
            <div className="dossier-card-body">
              <div className="editorial-services-pills">
                {project.services.map((service, idx) => (
                  <span className="editorial-service-badge" key={idx}>
                    <span className="badge-accent-dot" style={{ backgroundColor: project.accentColor }} />
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div className="dossier-card-footer">
              <span>CAPABILITIES LISTING // PRODUCTION-READY</span>
            </div>
          </div>
        </section>

        {/* EXTRA SECTIONS (E.g. Campaign Rollout) */}
        {project.extraSections?.map((section, sIdx) => (
          <section className="bespoke-extra-section" key={sIdx}>
            <div className="dossier-card narrative-card-large span-full-width">
              <div className="dossier-card-header">
                <span className="dossier-card-num">06 /</span>
                <h3>{section.title}</h3>
              </div>
              <div className="dossier-card-body">
                <div className="editorial-extra-columns">
                  {Array.isArray(section.content) ? (
                    <div className="editorial-bullet-list">
                      {section.content.map((line, lIdx) => (
                        <div className="editorial-bullet-item" key={lIdx}>
                          <span className="bullet-dash">—</span>
                          <p>{line.startsWith("• ") ? line.substring(2) : line}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              </div>
              <div className="dossier-card-footer">
                <span>ADDENDUM ANALYSIS // SECURE</span>
              </div>
            </div>
          </section>
        ))}

        {/* INTERACTIVE MEDIA GALLERY SHOWCASE */}
        {project.galleryItems && project.galleryItems.length > 0 && (
          <section className="bespoke-gallery-section">
            <div className="section-header-tag">
              <span className="gold-dash">—</span>
              <h2>{project.galleryTitle || "SHOWCASE FRAMES & MEDIA OUTPUTS"}</h2>
            </div>

            <div className="gallery-grid">
              {project.galleryItems.map((item, idx) => (
                <div
                  className="gallery-card-item"
                  key={idx}
                  onClick={() => setSelectedGalleryItem(item)}
                >
                  <div className="gallery-placeholder-box">
                    <div className="gallery-grid-pattern" />
                    <span className="gallery-play-icon">▶</span>
                    <span className="gallery-index-tag">FRAME 0{idx + 1}</span>
                  </div>
                  <div className="gallery-card-info">
                    <span className="gallery-category">{item.category}</span>
                    <span className="gallery-title">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LARGE INTENSITY CLOSING PHRASE */}
        <section className="editorial-philosophy-spotlight">
          <div className="spotlight-radial" />
          <div className="philosophy-container">
            <span className="philosophy-ornament">✧</span>
            <p className="philosophy-text-editorial">{project.closing}</p>
            <span className="philosophy-subtag">ONE COOL AIFX PRODUCTION STUDIO</span>
          </div>
        </section>
      </main>

      {/* LIGHTBOX MODAL */}
      {selectedGalleryItem && (
        <div className="gallery-lightbox-overlay" onClick={() => setSelectedGalleryItem(null)}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setSelectedGalleryItem(null)}
            >
              ×
            </button>
            <div className="lightbox-media-view">
              <div className="lightbox-simulated-frame">
                <span className="lightbox-watermark">ONE COOL AIFX // 1080P PRORES</span>
                <span className="lightbox-title-overlay">{selectedGalleryItem.title}</span>
              </div>
            </div>
            <div className="lightbox-meta-bar">
              <span className="lightbox-category-tag">{selectedGalleryItem.category}</span>
              <span>PROJECT: {project.title}</span>
            </div>
          </div>
        </div>
      )}

      {/* LUXURY INTERACTIVE FOOTER */}
      <footer className="editorial-project-footer">
        <div className="editorial-footer-line" />
        <div className="editorial-footer-navigation">
          <Link href={`/projects/${prevSlug}`} className="editorial-nav-btn">
            <span className="nav-btn-arrow">←</span>
            <span className="nav-btn-meta">
              <small>PREVIOUS PROJECT</small>
              <strong>{projectsData[prevSlug].title.split(":")[0]}</strong>
            </span>
          </Link>

          <Link href="/" className="editorial-nav-btn index-btn-bespoke" onClick={handleBackToIndex}>
            <div className="editorial-grid-icon">
              <span /><span />
              <span /><span />
            </div>
            <span className="index-btn-label">BACK TO INDEX</span>
          </Link>

          <Link href={`/projects/${nextSlug}`} className="editorial-nav-btn text-right-align">
            <span className="nav-btn-meta">
              <small>NEXT PROJECT</small>
              <strong>{projectsData[nextSlug].title.split(":")[0]}</strong>
            </span>
            <span className="nav-btn-arrow">→</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
