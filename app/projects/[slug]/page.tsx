"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProjectData = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  statement: string;
  detail: string;
  background: string;
  approachTitle: string;
  approachText: string;
  projectInfo: { label: string; value: string }[];
  services: string[];
  videoUrl: string;
  embedUrl: string;
  accentColor: string;
  extraSections?: { title: string; content: string | string[] }[];
  closing: string;
};

const projectsData: Record<string, ProjectData> = {
  "oc-aifx-1": {
    slug: "oc-aifx-1",
    number: "01",
    title: "GOOGLE CLOUD SUMMIT: OC.AIFX 1 MODEL DEBUT",
    subtitle: "PROPRIETARY MODEL DEVELOPMENT",
    statement: "Worlds are no longer found. They are summoned.",
    detail: "Feature-scale spectacle shaped through AI, live action craft and relentless imagination.",
    background: "For the first time in public, One Cool AIFX unveiled OC.AIFX 1—our in-context domain-adaptive video generation model—alongside Google Veo 2 in a joint showcase at the 2025 Hong Kong Google Cloud Summit on 3 June 2025. The showcase introduced OC.AIFX 1 as a proprietary model developed around the visual requirements of professional film and entertainment production.",
    approachTitle: "THE SHOWCASE",
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
    accentColor: "#c56c56",
    closing: "A PROPRIETARY MODEL DEVELOPED FOR PRODUCTION-SPECIFIC CINEMATIC WORLDS.",
  },
  "welab": {
    slug: "welab",
    number: "02",
    title: "WELAB: HK’S FIRST FULLY AI-POWERED COMMERCIAL",
    subtitle: "AI COMMERCIAL PRODUCTION",
    statement: "A campaign can move at the speed of an idea.",
    detail: "Cinematic advertising built to turn a single proposition into a living visual language.",
    background: "One Cool AIFX demonstrated how generative AI could be applied “invisibly” through Hong Kong’s first fully AI-powered fintech commercial campaign. Created for WeLend, a member of WeLab, in collaboration with Google Gemini, the campaign was released across television, cinema, MTR, billboards, iBillboard and social media. The campaign combined emotional storytelling, product communication and multi-format production within one connected AI-powered campaign system.",
    approachTitle: "THE CREATIVE IDEA",
    approachText: "EMBRACE YOUR RACE AGAINST TIME. Just as WeLend’s AI loan services are designed to save time, the campaign used AI production to visualise the urgency of living now. The storytelling was divided into two emotional narratives. The family story explored young parents experiencing guilt over important moments they had missed. The relationship story focused on young couples allowing the demands of work to take priority over their time together. Together, the stories positioned WeLend as an answer to “time poverty”—encouraging Hong Kong audiences to stop waiting and take action.",
    projectInfo: [
      { label: "BRAND", value: "WeLend" },
      { label: "PARENT COMPANY", value: "WeLab" },
      { label: "TECHNOLOGY COLLABORATION", value: "Google Gemini" },
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
    accentColor: "#4f8c86",
    extraSections: [
      {
        title: "CAMPAIGN CONTENT",
        content: [
          "• MAIN CAMPAIGN: 95-Second Main Campaign Film (TVC, Social Media, Cinema, iBillboard)",
          "• THEMATIC FILMS: 30-Second Thematic Cutdown — Family Theme",
          "• THEMATIC FILMS: 30-Second Thematic Cutdown — Relationship Theme",
          "• PRODUCT FILMS: 15-Second Product Feature — Personal Loan",
          "• PRODUCT FILMS: 15-Second Product Feature — Balance Transfer",
          "• PRODUCT FILMS: 15-Second Product Feature — Tax Season",
        ],
      },
      {
        title: "CAMPAIGN ROLLOUT",
        content: [
          "• BROADCAST: Television, Cinema, MTR (Mass Transit Railway)",
          "• OUTDOOR: Billboards, iBillboard, Outdoor Displays",
          "• DIGITAL: Multi-Platform Social Media Campaign",
        ],
      },
    ],
    closing: "AI WORKED INVISIBLY. THE HUMAN STORY REMAINED AT THE CENTRE.",
  },
  "back-to-the-past": {
    slug: "back-to-the-past",
    number: "03",
    title: "AI-POWERED FESTIVE MOVIE PROMOTION: 尋秦記",
    subtitle: "AI FILM PROMOTION",
    statement: "History returns with a new pulse.",
    detail: "Cultural memory, myth and machine-made atmospheres converge in a cinematic resurrection.",
    background: "One Cool AIFX created a series of festive promotional films for Back to the Past (尋秦記), placing the film’s characters and historical universe within playful seasonal scenarios. The project included Mid-Autumn Festival teasers, a three-part Halloween promotion and Christmas-themed content. Each campaign offered a new interpretation of the established film world while keeping its characters visible and relevant during important cultural and seasonal moments.",
    approachTitle: "THE APPROACH",
    approachText: "The AI-powered production workflow allowed One Cool Pictures to respond quickly to time-sensitive promotional opportunities. Content of this scale and visual variety would otherwise have been difficult to produce within conventional budgets and scheduling constraints. Across the campaign, ancient warriors encountered moonlit rabbits, modern homes, vampires, monsters, cinema audiences and Christmas traditions—extending the film’s universe into unexpected new situations.",
    projectInfo: [
      { label: "PROJECT", value: "Back to the Past Festive Movie Promotion" },
      { label: "CHINESE TITLE", value: "尋秦記" },
      { label: "CLIENT", value: "One Cool Pictures" },
      { label: "FORMAT", value: "AI-Powered Film Promotion" },
      { label: "CAMPAIGN PERIODS", value: "Mid-Autumn Festival, Halloween, Christmas" },
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
    accentColor: "#b7a45a",
    extraSections: [
      {
        title: "FESTIVE SEGMENTS",
        content: [
          "• MID-AUTUMN FESTIVAL: Three promotional teasers reimagining the characters of Back to the Past through moonlit imagery, rabbits and playful encounters.",
          "• HALLOWEEN: A three-part promotional series placing characters from the film within contemporary supernatural and horror-comedy scenarios.",
          "• CHRISTMAS: Festive content introducing modern traditions and seasonal imagery into the film's established historical world.",
        ],
      },
    ],
    closing: "ONE FILM UNIVERSE. REIMAGINED FOR EVERY FESTIVE MOMENT.",
  },
  "hybrid-ai-music-video": {
    slug: "hybrid-ai-music-video",
    number: "04",
    title: "HYBRID AI MUSIC VIDEO PRODUCTION",
    subtitle: "HYBRID AI MV PRODUCTION",
    statement: "Music becomes architecture for impossible feeling.",
    detail: "A performance world stretched beyond the lens through hybrid production and generative motion.",
    background: "Since 2025, One Cool AIFX and OCGO have developed a growing body of hybrid and AICG music-video work. Each production combines traditional filmmaking, live-action performance, AI-generated content and professional post-production in a different way. The objective is not to impose one AI aesthetic on every artist, but to develop the creative and technical system required by each song.",
    approachTitle: "PRODUCTION APPROACH",
    approachText: "In some projects, AI expands the environments and transformations surrounding a filmed performance. In others, proprietary technology is used to reinterpret familiar screen identities and connect multiple cinematic universes. By combining a traditional live-action shoot with AI enhancement, the production bypassed conventional CGI bottlenecks and enabled multiple established cinematic universes to be reinterpreted within one music video.",
    projectInfo: [
      { label: "PRODUCTION", value: "One Cool AIFX × OCGO" },
      { label: "PRODUCERS FOR", value: "Triple S, One Cool Music, Sky High Entertainment" },
      { label: "FORMAT", value: "Hybrid Music Video & AI visual enhancement" },
      { label: "FEATURED ARTISTS", value: "胡子彤, 陳苡臻 (Jessica), 古天樂" },
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
    accentColor: "#6d7359",
    extraSections: [
      {
        title: "FEATURED PRODUCTIONS",
        content: [
          "• 胡子彤 《我獨自升級》: A hybrid MV combining traditional filmmaking with AI-generated visual enhancement, expanding the atmosphere around the artist.",
          "• 陳苡臻 《擊敗99%》: Employs live-action performance as its emotional centre while AI extends the visual treatment beyond the physical set boundaries.",
          "• 古天樂 《世紀大騙局》: Reimagines Louis Koo's iconic historical roles through OC.AIFX 1, merging multiple established cinematic universes into one music video.",
        ],
      },
    ],
    closing: "THE PERFORMANCE REMAINS HUMAN. AI EXPANDS WHAT THE PRODUCTION CAN ACHIEVE.",
  },
  "kooloo": {
    slug: "kooloo",
    number: "05",
    title: "KOOLOO: ORIGINAL IP DEVELOPMENT & INCUBATION",
    subtitle: "ORIGINAL IP CREATION",
    statement: "Characters begin as sparks. We give them a universe.",
    detail: "Original IP designed to travel across film, campaigns, collectibles and culture.",
    background: "KOOLOO is an original character-led intellectual property being developed through an integrated process of character creation, story development, world-building, visual research and AI-assisted prototyping. The project is not being approached as a single character design. The development process explores how KOOLOO can exist consistently across different stories, environments, formats and stages of production.",
    approachTitle: "THE INCUBATION APPROACH",
    approachText: "By developing the creative language and production system together, One Cool AIFX can establish a consistent foundation for the IP before entering larger-scale production. The incubation process is designed to test and refine KOOLOO’s visual identity, personality, narrative potential, world and long-term adaptability. This approach allows the character and its universe to develop as one connected system rather than as a collection of disconnected assets.",
    projectInfo: [
      { label: "PROJECT", value: "KOOLOO Original IP" },
      { label: "CATEGORY", value: "Original IP Creation" },
      { label: "DEVELOPMENT TYPE", value: "Original IP Development and Incubation" },
      { label: "CURRENT STAGE", value: "Character, Story and World Development" },
      { label: "PRODUCTION APPROACH", value: "Creative Development + AI-Assisted Prototyping" },
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
    accentColor: "#91a7ae",
    extraSections: [
      {
        title: "CHARACTER & WORLD-BUILDING",
        content: [
          "• CHARACTER DESIGN: Identity, Personality, Expressions, Poses, Design Variations, Consistency Testing.",
          "• STORY & WORLD: Narrative Exploration, Environment Concepts, Supporting Characters, Visual-Language.",
          "• PROTOTYPING & PRODUCTION: AI-Assisted Prototyping, Animation Tests, Visual Proofs of Concept, Production Testing, Format Exploration.",
        ],
      },
      {
        title: "POTENTIAL FORMATS",
        content: [
          "• Animation / Short-Form Content / Digital Storytelling",
          "• Music and Entertainment Content",
          "• Character-Led Commercial Campaigns & Collectibles",
          "• Long-Form Production Development",
        ],
      },
    ],
    closing: "FROM AN ORIGINAL CHARACTER TO A WORLD BUILT FOR CONTINUED DEVELOPMENT.",
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

  useEffect(() => {
    // Scroll to top when the subpage mounts
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="project-not-found">
        <p>Project not found.</p>
        <Link href="/" className="back-link">Return to Homepage</Link>
      </div>
    );
  }

  // Calculate previous and next slugs for the footer navigation
  const currentIndex = slugsOrdered.indexOf(slug);
  const prevSlug = slugsOrdered[(currentIndex - 1 + slugsOrdered.length) % slugsOrdered.length];
  const nextSlug = slugsOrdered[(currentIndex + 1) % slugsOrdered.length];

  const handleBackToIndex = (e: React.MouseEvent) => {
    e.preventDefault();
    const index = slugsOrdered.indexOf(slug) + 1; // Project 1 maps to chapter index 1 (About is 0)
    sessionStorage.setItem("lastProjectChapter", index.toString());
    router.push("/", { scroll: false });
  };

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
          <span>PORTFOLIO DOSSIER // AUTUMN-WINTER EDITION</span>
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
              <span className="editorial-vertical-num">0{currentIndex + 2}</span>
              <div className="vertical-line" style={{ backgroundColor: project.accentColor }} />
              <span className="editorial-vertical-label">DOSSIER</span>
            </div>
            
            <div className="hero-content-column">
              <div className="editorial-eyebrow">
                <span className="eyebrow-accent-dot" style={{ backgroundColor: project.accentColor }} />
                <span>{project.subtitle}</span>
              </div>
              <h1 className="hero-title">{project.title}</h1>
              
              <div className="editorial-statement-block">
                <p className="hero-statement">“{project.statement}”</p>
                <div className="statement-bar" style={{ backgroundColor: project.accentColor }} />
              </div>
              
              <p className="hero-detail">{project.detail}</p>
            </div>
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
              <span>SYSTEM: PEERTUBE STREAM</span>
              <span className="live-badge"><i className="live-dot" /> STREAMING SECURE SOURCE</span>
              <span>1080P PRO RES</span>
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
              <span>CINEMASCOPE 2.39:1</span>
              <span className="interaction-tip">CLIPS INTEGRAL • PRESS TO LISTEN</span>
              <span>AUDIO: CELESTIAL ATMOSPHERE</span>
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
              <h3>{project.approachTitle}</h3>
            </div>
            <div className="dossier-card-body">
              <p>{project.approachText}</p>
            </div>
            <div className="dossier-card-footer">
              <span>OPERATIONAL WORKFLOW // ACTIVE</span>
            </div>
          </div>

          {/* Card 3: Parameters / Project Info */}
          <div className="dossier-card params-card">
            <div className="dossier-card-header">
              <span className="dossier-card-num">03 /</span>
              <h3>PROJECT METADATA</h3>
            </div>
            <div className="dossier-card-body">
              <div className="editorial-meta-list">
                {project.projectInfo.map((info, idx) => (
                  <div className="editorial-meta-row" key={idx}>
                    <span className="meta-row-label">{info.label}</span>
                    <span className="meta-row-value">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="dossier-card-footer">
              <span>ARCHIVAL DOCUMENTATION // VERIFIED</span>
            </div>
          </div>

          {/* Card 4: Services Outlines */}
          <div className="dossier-card services-card-bespoke">
            <div className="dossier-card-header">
              <span className="dossier-card-num">04 /</span>
              <h3>SERVICES DELIVERED</h3>
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

          {/* Render extra details elegantly if present */}
          {project.extraSections?.map((section, sIdx) => (
            <div className="dossier-card narrative-card-large span-full-width" key={sIdx}>
              <div className="dossier-card-header">
                <span className="dossier-card-num">05 /</span>
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
          ))}

        </section>

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

      {/* LUXURY INTERACTIVE FOOTER */}
      <footer className="editorial-project-footer">
        <div className="editorial-footer-line" />
        <div className="editorial-footer-navigation">
          <Link href={`/projects/${prevSlug}`} className="editorial-nav-btn">
            <span className="nav-btn-arrow">←</span>
            <span className="nav-btn-meta">
              <small>PREVIOUS WORK</small>
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
              <small>NEXT WORK</small>
              <strong>{projectsData[nextSlug].title.split(":")[0]}</strong>
            </span>
            <span className="nav-btn-arrow">→</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
