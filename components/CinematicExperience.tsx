"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import CharacterMotionCanvas from "./CharacterMotionCanvas";
import WebGLAtmosphere from "./WebGLAtmosphere";
import VideoWipeCanvas from "./VideoWipeCanvas";

type Chapter = {
  number: string;
  roman: string;
  category: string;
  title: string;
  displayTitle: string[];
  client: string;
  action: string;
  statement: string;
  detail: string;
  video: string;
  accent: string;
};



const chapters: Chapter[] = [
  {
    number: "01",
    roman: "I",
    category: "About",
    title: "One Cool AIFX",
    displayTitle: ["One", "Cool", "AIFX"],
    client: "One Cool AIFX",
    action: "Enter worlds",
    statement: "One Cool AIFX is an AI-native production studio built to expand what film, brands and original IP can become.",
    detail: "We combine proprietary technology, creative leadership and production craft to transform ambitious ideas into distinctive, production-ready worlds. We do not simply adapt to the future of entertainment—we help define it.",
    video:
      "https://video.henrywithu.com/static/streaming-playlists/hls/81936e4a-302e-4c7c-92b7-70209c4106ef/e80bfa77-256b-4652-a956-9e45f626df73-1080-fragmented.mp4",
    accent: "#ffc627",
  },
  {
    number: "02",
    roman: "II",
    category: "Proprietary Model Debut",
    title: "Warriors of the Future",
    displayTitle: ["Warriors", "of the Future"],
    client: "Sony",
    action: "Watch film",
    statement: "Worlds are no longer found. They are summoned.",
    detail: "Feature-scale spectacle shaped through AI, live action craft and relentless imagination.",
    video:
      "https://video.henrywithu.com/static/streaming-playlists/hls/81936e4a-302e-4c7c-92b7-70209c4106ef/e80bfa77-256b-4652-a956-9e45f626df73-1080-fragmented.mp4",
    accent: "#c56c56",
  },
  {
    number: "03",
    roman: "III",
    category: "AI Commercial Production",
    title: "WeLend",
    displayTitle: ["We", "Lend"],
    client: "BoC",
    action: "View campaign",
    statement: "A campaign can move at the speed of an idea.",
    detail: "Cinematic advertising built to turn a single proposition into a living visual language.",
    video:
      "https://video.henrywithu.com/static/streaming-playlists/hls/cc8dace4-6ae5-463d-b1ad-536169590ae3/de7edff2-b1b4-476e-bb35-6dbb7f15f451-1080-fragmented.mp4",
    accent: "#4f8c86",
  },
  {
    number: "04",
    roman: "IV",
    category: "AI Film Promotion",
    title: "Chinese Mummy",
    displayTitle: ["Chinese", "Mummy"],
    client: "Museum",
    action: "Play trailer",
    statement: "History returns with a new pulse.",
    detail: "Cultural memory, myth and machine-made atmospheres converge in a cinematic resurrection.",
    video:
      "https://video.henrywithu.com/static/streaming-playlists/hls/14c99a6e-b317-484e-a106-ca439ce6dfe8/d38d568a-1504-4863-ad82-6dda9c770c4a-1080-fragmented.mp4",
    accent: "#b7a45a",
  },
  {
    number: "05",
    roman: "V",
    category: "Hybrid AI MV Production",
    title: "Defeat 99",
    displayTitle: ["Defeat", "99"],
    client: "Warner",
    action: "Watch video",
    statement: "Music becomes architecture for impossible feeling.",
    detail: "A performance world stretched beyond the lens through hybrid production and generative motion.",
    video:
      "https://video.henrywithu.com/static/streaming-playlists/hls/66e59670-7ef7-4ca5-9f7b-e863175f7f9b/5e49c8cb-b930-4cd0-91d5-4701911bf855-1080-fragmented.mp4",
    accent: "#6d7359",
  },
  {
    number: "06",
    roman: "VI",
    category: "Original IP Creation",
    title: "KooLoo",
    displayTitle: ["Koo", "Loo"],
    client: "One Cool",
    action: "Explore IP",
    statement: "Characters begin as sparks. We give them a universe.",
    detail: "Original IP designed to travel across film, campaigns, collectibles and culture.",
    video:
      "https://video.henrywithu.com/static/streaming-playlists/hls/88efbde4-9eeb-4fa3-9a17-287a778c65c1/1cf3e4d8-cc59-41f1-833c-368b1f2b68ee-1080-fragmented.mp4",
    accent: "#91a7ae",
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (edge0: number, edge1: number, value: number) => {
  const point = clamp((value - edge0) / (edge1 - edge0));
  return point * point * (3 - 2 * point);
};
export default function CinematicExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<Array<HTMLVideoElement | null>>([]);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  // Preloading & Buffering States
  const [heroBgLoaded, setHeroBgLoaded] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>([false, false, false, false, false, false]);
  const [isEntered, setIsEntered] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const smoothIntroRef = useRef(0);
  const targetIntroRef = useRef(0);
  const lerpFrameRef = useRef<number | null>(null);

  const lastScrollTimeRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const menuOpenRef = useRef(menuOpen);
  const isEnteredRef = useRef(isEntered);

  // Compute loading percentage
  const loadingProgress = 
    (heroBgLoaded ? 10 : 0) +
    (videosLoaded[0] ? 20 : 0) +
    (videosLoaded[1] ? 20 : 0) +
    (videosLoaded[2] ? 13 : 0) +
    (videosLoaded[3] ? 13 : 0) +
    (videosLoaded[4] ? 12 : 0) +
    (videosLoaded[5] ? 12 : 0);

  // Audio Fade Utility for bgm.mp3
  const fadeAudio = useCallback((targetVolume: number, durationMs: number) => {
    const audio = bgmRef.current;
    if (!audio) return;

    const runFade = () => {
      const startVolume = audio.volume;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        audio.volume = startVolume + (targetVolume - startVolume) * progress;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (targetVolume === 0) {
          audio.pause();
        }
      };
      requestAnimationFrame(animate);
    };

    if (targetVolume > 0 && audio.paused) {
      audio.play()
        .then(() => {
          runFade();
        })
        .catch(() => {
          // Autoplay fallback: wait for user interaction to trigger play and fade
          const playOnInteraction = () => {
            audio.play()
              .then(() => {
                setSoundOn(true);
                runFade();
              })
              .catch(() => undefined);
            cleanup();
          };

          const cleanup = () => {
            window.removeEventListener("click", playOnInteraction);
            window.removeEventListener("mousedown", playOnInteraction);
            window.removeEventListener("touchstart", playOnInteraction);
            window.removeEventListener("keydown", playOnInteraction);
            window.removeEventListener("pointerdown", playOnInteraction);
          };

          window.addEventListener("click", playOnInteraction, { passive: true });
          window.addEventListener("mousedown", playOnInteraction, { passive: true });
          window.addEventListener("touchstart", playOnInteraction, { passive: true });
          window.addEventListener("keydown", playOnInteraction, { passive: true });
          window.addEventListener("pointerdown", playOnInteraction, { passive: true });
        });
    } else {
      runFade();
    }
  }, []);

  // Entrance transition to the landing page (BGM slowly rises)
  const handleEnter = useCallback(() => {
    setIsEntered(true);
    document.body.classList.remove("loading-locked");

    // Force scroll to top on enter to override browser scroll restoration jumps
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    fadeAudio(0.04, 2000); // 2s celestial slow fade in
    setSoundOn(true);

    setTimeout(() => {
      setIsPreloaded(true);
    }, 1800); // Match globals.css preloader-overlay fade transition
  }, [fadeAudio]);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    isEnteredRef.current = isEntered;
  }, [isEntered]);

  // Lock body scroll when preloader is active
  useEffect(() => {
    if (!isEntered) {
      document.body.classList.add("loading-locked");
    } else {
      document.body.classList.remove("loading-locked");
    }
    return () => {
      document.body.classList.remove("loading-locked");
    };
  }, [isEntered]);

  // Initialize and clean up bgm.mp3
  useEffect(() => {
    const audio = new Audio("/assets/bgm.mp3");
    audio.loop = true;
    audio.volume = 0;
    bgmRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  // Configure browser scroll behavior and reset on mount
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Auto-entering passage after loading completes
  useEffect(() => {
    if ((loadingProgress >= 100 || timedOut) && !isEntered) {
      const delayTimer = setTimeout(() => {
        handleEnter();
      }, 1000); // 1s delay at 100% for visual breathing room
      return () => clearTimeout(delayTimer);
    }
  }, [loadingProgress, timedOut, isEntered, handleEnter]);

  // Monitor image & video preloading
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/hero-layers/background.png";
    img.onload = () => setHeroBgLoaded(true);
    img.onerror = () => setHeroBgLoaded(true);

    const interval = setInterval(() => {
      videosRef.current.forEach((video, index) => {
        if (video && video.readyState >= 2) {
          setVideosLoaded((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }
      });
    }, 250);

    const timeout = setTimeout(() => {
      setTimedOut(true);
    }, 6000); // 6s maximum load time fallback

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleVideoReady = (index: number) => {
    setVideosLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isEnteredRef.current) {
        e.preventDefault();
        return;
      }
      if (menuOpenRef.current) return;

      // Prevent native momentum-based scrolling
      e.preventDefault();

      const now = Date.now();
      // Swallow events during active transitions and momentum cooldown
      if (isTransitioningRef.current || now - lastScrollTimeRef.current < 800) {
        return;
      }

      // Ignore small jitter / low-magnitude wheel movements
      if (Math.abs(e.deltaY) < 10) return;

      const viewport = Math.max(window.innerHeight, 1);
      const currentPage = Math.round(window.scrollY / viewport);

      let targetPage = currentPage;
      if (e.deltaY > 0) {
        targetPage = Math.min(currentPage + 1, chapters.length);
      } else if (e.deltaY < 0) {
        targetPage = Math.max(currentPage - 1, 0);
      }

      if (targetPage !== currentPage) {
        isTransitioningRef.current = true;
        lastScrollTimeRef.current = now;

        window.scrollTo({
          top: targetPage * viewport,
          behavior: "smooth",
        });

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 800);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEnteredRef.current) {
        const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Spacebar"];
        if (keys.includes(e.key)) {
          e.preventDefault();
        }
        return;
      }
      if (menuOpenRef.current) return;

      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Spacebar"];
      if (!keys.includes(e.key)) return;

      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      e.preventDefault();

      const now = Date.now();
      if (isTransitioningRef.current || now - lastScrollTimeRef.current < 800) {
        return;
      }

      const viewport = Math.max(window.innerHeight, 1);
      const currentPage = Math.round(window.scrollY / viewport);

      let targetPage = currentPage;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        targetPage = Math.min(currentPage + 1, chapters.length);
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        targetPage = Math.max(currentPage - 1, 0);
      }

      if (targetPage !== currentPage) {
        isTransitioningRef.current = true;
        lastScrollTimeRef.current = now;

        window.scrollTo({
          top: targetPage * viewport,
          behavior: "smooth",
        });

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 800);
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (!isEnteredRef.current) return;
      if (menuOpenRef.current) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isEnteredRef.current) {
        e.preventDefault();
        return;
      }
      if (menuOpenRef.current) return;
      if (isTransitioningRef.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isEnteredRef.current) {
        e.preventDefault();
        return;
      }
      if (menuOpenRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Minimum swipe distance threshold of 50px
      if (Math.abs(deltaY) < 50) return;

      const now = Date.now();
      if (isTransitioningRef.current || now - lastScrollTimeRef.current < 800) {
        return;
      }

      const viewport = Math.max(window.innerHeight, 1);
      const currentPage = Math.round(window.scrollY / viewport);

      let targetPage = currentPage;
      if (deltaY > 0) {
        targetPage = Math.min(currentPage + 1, chapters.length);
      } else if (deltaY < 0) {
        targetPage = Math.max(currentPage - 1, 0);
      }

      if (targetPage !== currentPage) {
        e.preventDefault();
        isTransitioningRef.current = true;
        lastScrollTimeRef.current = now;

        window.scrollTo({
          top: targetPage * viewport,
          behavior: "smooth",
        });

        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 800);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const active = chapters[Math.max(activeChapter, 0)];

  const animateIntro = useCallback(() => {
    const target = targetIntroRef.current;
    const current = smoothIntroRef.current;
    const diff = target - current;

    if (Math.abs(diff) < 0.0001) {
      smoothIntroRef.current = target;
      if (lerpFrameRef.current !== null) {
        cancelAnimationFrame(lerpFrameRef.current);
        lerpFrameRef.current = null;
      }
    } else {
      // Symmetrical luxurious, slow, and incredibly smooth transition easing for both directions
      smoothIntroRef.current = current + diff * 0.035;
      lerpFrameRef.current = requestAnimationFrame(animateIntro);
    }

    const smoothIntro = smoothIntroRef.current;
    const root = rootRef.current;
    if (!root) return;

    const viewport = Math.max(window.innerHeight, 1);
    const raw = clamp(window.scrollY / viewport, 0, chapters.length);

    const introPart1 = clamp(smoothIntro, 0, 1);
    const collapse = smoothstep(0.08, 0.43, introPart1);
    const reveal = smoothstep(0.63, 0.96, introPart1);
    const copyReveal = smoothstep(0.80, 1, introPart1);

    // Etch is only active during Transition 2
    let etch = 0;
    if (smoothIntro > 1 && smoothIntro <= 2) {
      const progress2 = 2 - smoothIntro; // goes from 1 to 0 as we scroll 1 to 2
      etch = smoothstep(0.40, 0.61, progress2) * (1 - smoothstep(0.73, 0.93, progress2));
    }

    // Hero opacity: 1 on Page 0 & 1, fades out during Transition 2
    let heroOpacity = 1;
    if (smoothIntro > 1) {
      const progress2 = smoothIntro - 1; // goes from 0 to 1
      heroOpacity = 1 - smoothstep(0.62, 0.94, progress2);
    }

    let baseBrightness = 1;
    if (smoothIntro <= 1) {
      baseBrightness = 1 - smoothIntro * 0.44; // darkens from 1.0 down to 0.56 for the About page
    } else {
      baseBrightness = 0.56;
    }

    root.style.setProperty("--intro", introPart1.toFixed(4));
    root.style.setProperty("--collapse", collapse.toFixed(4));
    root.style.setProperty("--etch", etch.toFixed(4));
    root.style.setProperty("--reveal", reveal.toFixed(4));
    root.style.setProperty("--copy-reveal", copyReveal.toFixed(4));
    root.style.setProperty("--etch-opacity", (etch * 0.26).toFixed(4));
    root.style.setProperty("--hero-opacity", heroOpacity.toFixed(4));
    root.style.setProperty("--hero-scale", (1.02 + collapse * 0.035).toFixed(4));
    root.style.setProperty("--hero-contrast", (1 + etch * 1.35).toFixed(4));
    root.style.setProperty("--hero-brightness", (baseBrightness - etch * 0.34).toFixed(4));
    root.style.setProperty("--title-y", `${((1 - reveal) * 54).toFixed(3)}vh`);
    root.style.setProperty("--meta-y", `${((1 - reveal) * 13.5).toFixed(3)}vh`);
    root.style.setProperty("--edition-offset", `${((1 - collapse) * 18).toFixed(2)}px`);
    root.style.setProperty("--index-offset", `${((1 - collapse) * 30).toFixed(2)}px`);
    root.style.setProperty("--frame-scale", (1 - collapse / 22).toFixed(4));
    root.style.setProperty("--frame-blur", `${(collapse * 8).toFixed(2)}px`);

    // Determine active chapter: 
    // Use raw for immediate swipe trigger, but if raw < 1, let activeChapter follow smoothIntro so it fades out slowly when scrolling up
    const effectiveIntro = raw < 1 ? smoothIntro : raw;
    const nextActive = effectiveIntro < 0.64 ? -1 : clamp(Math.round(raw) - 1, 0, chapters.length - 1);

    root.style.setProperty("--accent", chapters[Math.max(nextActive, 0)].accent);
    setScrollProgress(smoothIntro);
    setActiveChapter((current) => (current === nextActive ? current : nextActive));
  }, []);

  const updateScroll = useCallback(() => {
    frameRef.current = 0;
    const root = rootRef.current;
    if (!root) return;
    const viewport = Math.max(window.innerHeight, 1);
    const raw = clamp(window.scrollY / viewport, 0, chapters.length);
    const intro = clamp(raw, 0, 2);

    targetIntroRef.current = intro;
    if (lerpFrameRef.current === null) {
      lerpFrameRef.current = requestAnimationFrame(animateIntro);
    }
  }, [animateIntro]);

  useEffect(() => {
    const requestUpdate = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(updateScroll);
    };
    updateScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (lerpFrameRef.current !== null) cancelAnimationFrame(lerpFrameRef.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [updateScroll]);

  useEffect(() => {
    videosRef.current.forEach((video, index) => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      const nearby = activeChapter < 0 ? index === 0 : Math.abs(index - activeChapter) <= 1;
      if (nearby) video.play().catch(() => undefined);
      else video.pause();
    });
  }, [activeChapter]);

  const toggleAmbience = useCallback(() => {
    const enable = !soundOn;
    if (enable) {
      fadeAudio(0.04, 1400);
      setSoundOn(true);
    } else {
      fadeAudio(0, 500);
      setSoundOn(false);
    }
  }, [soundOn, fadeAudio]);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  const scrollToChapter = useCallback((index: number) => {
    setMenuOpen(false);
    window.scrollTo({
      top: (index + 1) * window.innerHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, []);

  const scrollHome = useCallback(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const replayActiveFilm = useCallback(() => {
    const video = videosRef.current[Math.max(activeChapter, 0)];
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.currentTime = 0;
    video.play().catch(() => undefined);
  }, [activeChapter]);

  const handleButtonClick = useCallback(() => {
    if (activeChapter === 0) {
      scrollToChapter(1);
    } else {
      replayActiveFilm();
    }
  }, [activeChapter, scrollToChapter, replayActiveFilm]);

  return (
    <div className="cinematic-root" ref={rootRef}>
      {!isPreloaded && (
        <div className={`preloader-overlay ${isEntered ? "is-fading" : ""}`}>
          <div className="preloader-halo" />
          <div className="preloader-content">
            <div className="preloader-logo-container">
              <img className="preloader-logo" src="/assets/logos/onecool-logo.png" alt="One Cool" />
            </div>
            <p className="preloader-subtitle">AIFX Editions · Vol. 01</p>
            
            <div className="preloader-progress-container">
              <svg className="progress-circle" viewBox="0 0 100 100">
                <circle className="progress-circle-bg" cx="50" cy="50" r="45" />
                <circle 
                  className="progress-circle-bar" 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  style={{ strokeDasharray: 283, strokeDashoffset: 283 - (283 * Math.min(loadingProgress, 100)) / 100 }}
                />
              </svg>
              <div className="progress-value">
                <span>{Math.min(loadingProgress, 100)}%</span>
              </div>
            </div>
            
            <p className="preloader-hint">
              {loadingProgress >= 100 || timedOut ? "Opening passage..." : "Summoning worlds..."}
            </p>
          </div>
          <div className="preloader-grain" />
        </div>
      )}

      <a className="skip-link" href="#experience-stage">
        Skip to the films
      </a>

      <section className="experience" aria-label="AIFX cinematic showcase">
        <div className="stage" id="experience-stage">
          <div className="video-stack" aria-hidden={activeChapter < 0}>
            {chapters.map((chapter, index) => {
              const isActive = index === Math.max(activeChapter, 0);
              const isLoaded = videosLoaded[index];
              return (
                <div 
                  key={`${chapter.title}-${index}`} 
                  className="chapter-video-container" 
                  style={{ 
                    position: "absolute", 
                    inset: 0, 
                    width: "100%", 
                    height: "100%", 
                    opacity: isActive ? 1 : 0, 
                    zIndex: isActive ? 1 : 0, 
                    pointerEvents: "none" 
                  }}
                >
                  <video
                    ref={(node) => {
                      videosRef.current[index] = node;
                    }}
                    className="chapter-video"
                    crossOrigin="anonymous"
                    src={chapter.video}
                    style={{ 
                      opacity: isActive && isLoaded ? 1 : 0, 
                      zIndex: isActive ? 1 : 0,
                      transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onCanPlay={() => handleVideoReady(index)}
                  />
                  {isActive && !isLoaded && (
                    <div className="chapter-video-loader">
                      <div className="loader-spinner" />
                      <span>Buffering {chapter.roman}...</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <VideoWipeCanvas activeIndex={Math.max(activeChapter, 0)} videosRef={videosRef} />

          <div className="hero-world" aria-hidden="true">
            <img className="hero-background" src="/assets/hero-layers/background.png" alt="" />
            <CharacterMotionCanvas progress={clamp(scrollProgress <= 1 ? scrollProgress : 2 - scrollProgress)} />
            <div className="hero-etch" />
          </div>

          <div className="video-darkness" aria-hidden="true" />
          <div className="cinematic-vignette" aria-hidden="true" />
          <div className="film-grain" aria-hidden="true" />
          <WebGLAtmosphere progress={clamp(scrollProgress > 1 ? 2 - scrollProgress : 0)} />

          <header className="site-header">
            <button className="brand-lockup" type="button" onClick={scrollHome} aria-label="AIFX home">
              <span className="brand-glyph">A</span>
              <span>AIFX Editions</span>
              <em>Vol. 01</em>
            </button>
            <button
              className="index-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="chapter-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              Index <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
            </button>
            <button
              className="sound-toggle"
              type="button"
              aria-pressed={soundOn}
              onClick={toggleAmbience}
            >
              <span className="sound-bars" aria-hidden="true"><i /><i /><i /><i /></span>
              {soundOn ? "Ambience on" : "Ambience off"}
            </button>
            <a className="project-link" href="mailto:hello@aifx.studio">
              Start a project
            </a>
          </header>

          <aside className="edition-title" aria-hidden={scrollProgress < 0.18}>
            <img className="edition-logo" src="/assets/logos/onecool-logo.png" alt="One Cool" />
          </aside>

          <aside className="chapter-index" aria-label="Film navigation">
            <ol>
              {chapters.map((chapter, index) => (
                <li key={`${chapter.title}-${index}`} className={activeChapter === index ? "is-active" : ""}>
                  <button type="button" onClick={() => scrollToChapter(index)}>
                    <span>{chapter.category}</span>
                    <i>{chapter.roman}</i>
                  </button>
                </li>
              ))}
            </ol>
            <div className="index-footer">
              <b>© AIFX 2026</b>
              <span>Hong Kong · Worldwide</span>
            </div>
          </aside>

          <div className="intro-frame">
            <div className="frame-orbit" aria-hidden="true"><i /><i /><i /></div>
            <div className="intro-heading-container">
              <img className="intro-logo" src="/assets/logos/onecool-logo.png" alt="One Cool" />
            </div>
            <p className="intro-statement">
              {/* A new renaissance for moving image.<br />
              Five worlds, made possible by imagination. */}
            </p>
            <ol className="intro-list">
              {chapters.map((chapter, index) => (
                <li key={`${chapter.title}-${index}`}>
                  <span>{chapter.category}</span><i>{chapter.roman}</i>
                </li>
              ))}
            </ol>
            <p className="intro-edition">AI FILM · CAMPAIGNS · ORIGINAL IP</p>
          </div>

          <div className={`chapter-copy${activeChapter >= 0 ? " is-visible" : ""}`} key={activeChapter}>
            <div className="gate-eyebrow-container">
              <span className="gate-category">{active.category}</span>
            </div>
            <h1 className="split-text-title">
              {active.title.split(" ").map((word, wordIndex, words) => {
                const preceding = words.slice(0, wordIndex).join(" ");
                const start = preceding ? preceding.length + 1 : 0;
                return (
                  <Fragment key={word}>
                    <span className="word-wrap">
                      {word.split("").map((character, characterIndex) => (
                        <span className="char-wrap" key={`${character}-${characterIndex}`}>
                          <span className="char" style={{ animationDelay: `${(start + characterIndex) * 0.015}s` }}>
                            {character}
                          </span>
                        </span>
                      ))}
                    </span>
                    {wordIndex < words.length - 1 && <span className="space" aria-hidden="true">&nbsp;</span>}
                  </Fragment>
                );
              })}
            </h1>
            {activeChapter === 0 ? (
              <div className="about-narrative-container">
                <p className="about-text-lead">
                  One Cool AIFX is an AI-native production studio built to expand what film, brands and original IP can become.
                </p>
                <p className="about-text-body">
                  We combine proprietary technology, creative leadership and production craft to transform ambitious ideas into distinctive, production-ready worlds.
                </p>
                <p className="about-text-callout">
                  We do not simply adapt to the future of entertainment—we help define it.
                </p>
              </div>
            ) : (
              <div className="gate-client-info">
                <div className="gate-client-logo-wrapper">
                  <img
                    className="gate-client-logo"
                    src={`/assets/logos-normalized/${activeChapter === 0 ? 1 : Math.max(1, activeChapter)}.png`}
                    alt={active.client}
                  />
                </div>
              </div>
            )}
            <button className="ritual-button" type="button" onClick={handleButtonClick}>
              <span>{active.action}</span>
            </button>
          </div>

          <p className="scroll-cue">
            <span>Scroll to create</span><i aria-hidden="true" />
          </p>

          <p className="scene-count" aria-live="polite">
            <b>{activeChapter < 0 ? "00" : active.number}</b><span>/ 06</span>
          </p>

          <div className="chapter-progress" aria-hidden="true">
            {chapters.map((chapter, index) => (
              <button
                key={`${chapter.number}-${index}`}
                className={activeChapter === index ? "is-active" : ""}
                type="button"
                tabIndex={-1}
                onClick={() => scrollToChapter(index)}
              ><span /></button>
            ))}
          </div>

          <div
            className={`menu-panel${menuOpen ? " is-open" : ""}`}
            id="chapter-menu"
            aria-hidden={!menuOpen}
            inert={!menuOpen}
          >
            <div className="menu-portrait" aria-hidden="true">
              <img src="/assets/characters/kooloo.jpg" alt="" />
            </div>
            <div className="menu-content">
              <p className="menu-eyebrow">Six chapters · One new image culture</p>
              <nav aria-label="All films">
                {chapters.map((chapter, index) => (
                  <button type="button" key={`${chapter.title}-${index}`} onClick={() => scrollToChapter(index)}>
                    <small>{chapter.number} / {chapter.category}</small>
                    <span>{chapter.title}</span>
                    <i>↗</i>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="scroll-spine" aria-hidden="true">
          {Array.from({ length: chapters.length + 1 }, (_, index) => <div className="snap-point" key={index} />)}
        </div>
      </section>

      <div className="semantic-content">
        {chapters.map((chapter, index) => (
          <section key={`${chapter.title}-${index}`} id={chapter.title.toLowerCase().replaceAll(" ", "-")}>
            <h2>{chapter.title}</h2>
            <p>{chapter.category}. Client: {chapter.client}. {chapter.detail}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
