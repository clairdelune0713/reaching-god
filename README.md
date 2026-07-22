# AIFX — The Synthetic Muse

A high-fidelity, TypeScript and Next.js cinematic showcase designed as an immersive interactive portfolio. "The Synthetic Muse" represents a synthesis of classical Renaissance aesthetics and cutting-edge WebGL graphics pipeline development, orchestrating full-screen video narratives, interactive GPU-driven mesh deformations, custom transition mathematics, and celestial particle fields into a cohesive storytelling platform.

---

## 🌌 Key Architectural Concepts & Interactive Storytelling

The experience is structured as an interactive scroll-scrubbed passage consisting of an introductory landing stage followed by **five distinct cinematic chapters**.

1. **The Renaissance Tableau (The Entrance)**:
   Upon entering the application, users are greeted with a high-resolution, multi-layered classical scene depicting a classical scholar and a companion feline. This digital tableau undergoes complex spatial deformations as the user scrolls, transforming from a fully colored illustration into a monochromatic, hand-etched sketch before collapsing into the persistent layout.
2. **The Cinematic Index (The Chapters)**:
   As the scroll travel passes a critical threshold, the historical tableau collapses, revealing an interactive video gallery of five distinct chapters. Each chapter features high-resolution cinematic footage (covering feature films, commercial campaigns, cinematic trailers, music videos, and original IP development) and dynamic typographic cards, accompanied by persistent navigation, ambient controls, and interactive index drawers.

---

## 🛠️ Advanced WebGL & GPU Pipeline Implementation

To achieve premium, lag-free performance at 60 frames per second, the visual atmosphere and core animations are entirely offloaded to the GPU via three specialized `<canvas>` components powered by raw WebGL (GLSL) vertex and fragment shaders.

### 1. `WebGLAtmosphere` (Celestial Ambient Space)
* **File Location**: [WebGLAtmosphere.tsx](./components/WebGLAtmosphere.tsx)
* **Purpose**: Generates a responsive, atmospheric backdrop that feels alive and reacts to user input.
* **Technical Details**:
  * **Coordinate Translation**: Employs a vertex shader mapping clip space coordinates directly into normalized UV coordinate space `v_uv = (a_position + 1.0) * 0.5`.
  * **Swirling Nebula**: Uses a 2D fractional Brownian motion (FBM) style noise algorithm with trigonometric time rotation to simulate fluid, gaseous nebula structures.
  * **Twinkling Starfield**: Generates a high-density star layer via modular cell coordinate hashing (`starId` and pseudo-random seed calculations) modulated by low-frequency sinusoidal curves to achieve organic twinkling patterns.
  * **Interactivity**: Captures window pointer movement (`pointermove`) to feed pointer uniforms into the fragment shader, yielding a subtle, inertia-smoothed coordinate offset that shifts the cosmos as the cursor moves.
  * **Scroll scrubbing**: The entire shader shifts from inactive to an operational state based on a custom `u_progress` uniform, fading elements out dynamically during chapter exploration.

### 2. `VideoWipeCanvas` (Diagonal Chapter Transitions)
* **File Location**: [VideoWipeCanvas.tsx](./components/VideoWipeCanvas.tsx)
* **Purpose**: Performs real-time, hardware-accelerated transitions between full-screen videos with high-fidelity visual effects.
* **Technical Details**:
  * **Aspect-Correct Sampling (`coverUv`)**: Computes texture matrices dynamically to replicate the CSS `background-size: cover` behavior in GLSL, preventing visual stretching of video layers regardless of the viewport aspect ratio.
  * **Tilted Diagonal Wipe**: Rather than a standard linear wipe, it executes a diagonal right-to-left division line controlled by a tilted coordinate offset:
    $$\text{boundary} = 1.08 - u_{\text{local}} \times 1.16 + 0.115 \times (v_{\text{uv}.y} - 0.5)$$
  * **Glowing Seam Highlight**: Renders a rich bronze-gold glowing filament centered on the transition boundary using a mathematical exponential falloff:
    $$\text{glow} = e^{-|\text{v\_uv}.x - \text{boundary}| \times 82.0} \times \sin(u_{\text{local}} \times \pi)$$
  * **Visual Feedback**: Applies a subtle zoom/depth expansion scaling factor `1.0 + sin(u_local * pi) * 0.022` on transition activation to mimic cinematic lens expansions.

### 3. `CharacterMotionCanvas` (GPU Mesh Deformations & Grayscale Etching)
* **File Location**: [CharacterMotionCanvas.tsx](./components/CharacterMotionCanvas.tsx)
* **Purpose**: Animates the layers of the Renaissance illustration through structural mesh deformations and transforms them into an authentic etched drawing.
* **Technical Details**:
  * **Mesh Generation**: Dynamically compiles a structural $72 \times 40$ vertex grid on the CPU during mount, which is uploaded to WebGL buffers (`ELEMENT_ARRAY_BUFFER` and `ARRAY_BUFFER`) for localized vertex displacement.
  * **Rigid-Mesh Deformations**: The vertex shader acts as a skeletal deformation engine, executing rotational and translation displacements on distinct geometric bounding boxes (modeled as `region` and `band` functions). Limb deformations (including reaching arms, moving fingers, waving cat tails, and walking leg rotations) are animated directly in clip-space using sinusoidal scroll progress triggers.
  * **Anatomical Face Protection**: Leverages strict coordinate boundary exclusions inside the shader to isolate the facial areas (scholarly spectacles, face features, and feline muzzles) from deformation, keeping focal facial structures perfectly rigid.
  * **Grayscale Etching Shader**: Translates rich colored textures into grayscale drawings on-the-fly inside the fragment shader using standard Rec. 601 luminance vectors:
    $$\text{luminance} = \text{dot}(\text{color}.\text{rgb}, \text{vec3}(0.299, 0.587, 0.114))$$
    These are interpolated by `u_etch` to seamlessly transition colored digital artwork into historical charcoal/sepia prints as the page collapses.

---

## 💎 Custom Scrolling, Preloading, & Media Systems

A premium experience demands complete control over assets, timing, and sensory feedback. The codebase includes custom software systems to guarantee exceptional performance:

1. **Integrated Multi-Asset Preloader**:
   * Measures loading milestones sequentially (Hero illustration: 15%; chapter 1: 25%; chapters 2–5: 15% each) using an interactive circular SVG loader.
   * Locks user scrolling during asset pre-buffering (`loading-locked` state) and executes a cinematic fade-in once assets are ready, with a failsafe 6-second timeout to maintain reliable accessibility.
2. **Wheel, Touch, & Keyboard Interception**:
   * Overrides native page-scrolling behaviors to ensure page-by-page snapping (Intro, Chapter I, II, III, IV, and V).
   * Intercepts `wheel`, keyboard (`ArrowDown`, `ArrowUp`, `PageDown`, `PageUp`, `Spacebar`), and swipe gestures (`touchstart`, `touchmove`, `touchend`), processing inputs through an 800ms transition cooldown to enforce fluid cinematic page snaps without momentum jitter.
3. **Automated Audio Fades & Autoplay Compliance**:
   * Incorporates high-fidelity browser autoplay compliant controls for `bgm.m4a`.
   * Automatically sets up event-listener fallbacks (`click`, `touchstart`, `pointerdown`) to unmute and trigger audio when user interaction is registered, easing in sound with a slow 2000ms audio fade.

---

## 📂 Project Directory Structure

```
.
├── app/
│   ├── globals.css          # Design system tokens, typographic declarations, and scroll layouts
│   ├── layout.tsx           # Application structure and viewport constraints
│   └── page.tsx             # Entry-point initializing the main CinematicExperience
├── components/
│   ├── CinematicExperience.tsx    # State engine orchestrating scroll progress, menus, preloading, and UI elements
│   ├── WebGLAtmosphere.tsx       # WebGL backdrop drawing cosmic dust, nebulae, and star fields
│   ├── CharacterMotionCanvas.tsx # WebGL mesh deformation shader simulating physical movements & etching effects
│   └── VideoWipeCanvas.tsx       # GPU-accelerated diagonal video wipe and transition canvas
├── public/
│   └── assets/              # Premium multimedia files (looping videos, static illustrations, audio soundtracks)
├── tsconfig.json            # Strict TypeScript configuration
├── next.config.ts           # Next.js configurations
└── package.json             # Package configuration (React 19, TypeScript, Next.js 16)
```

---

## ⚙️ Local Development Setup

To test, deploy, or run the project locally, follow these steps:

### Prerequisites
* Ensure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Build for Production
```bash
npm run build
```

---

## ♿ Accessibility, Easing, & Responsive Standards

* **`prefers-reduced-motion` Alignment**:
  Detects browser system preferences for reduced motion dynamically. When enabled, the application bypasses spatial mesh deformations, skips transition times, and disables intensive GPU shaders to ensure a calm, comfortable experience for all users.
* **Typographic Rigor**:
  Custom typography draws from Google Fonts (`Inter`, `Montserrat`, `Noto Serif TC`, `Playfair Display`) to ensure a beautiful contrast between classical serif notes and clean modern sans-serif categories.
* **Semantic HTML**:
  Incorporates proper accessibility features including hidden screen-reader skip-links, ARIA landmarks, `aria-live` containers for video progress updates, and native keyboard navigation fallbacks.

---

## 🤝 Special Thanks

Special thanks to **Zooey Chan** ([czq030710@gmail.com](mailto:czq030710@gmail.com)) for their contributions to this showcase.

---

## 📄 License

Proprietary and Commercial License. Copyright © 2026 **OneCool AIFX**. All Rights Reserved.

Primary Developer & Sole Contributor: **Henry Meng**

This project is exclusive proprietary software. No unauthorized reproduction, copying, distribution, or modifications are permitted. For commercial licensing inquiries or permissions, please refer to the [LICENSE](./LICENSE) file.

