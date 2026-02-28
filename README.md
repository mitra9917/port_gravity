<div align="center">
  
# Port Gravity 🪐
  
**Where Uncompromising Aesthetics meet 100/100 Lighthouse Performance.**

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![WebGL / Canvas](https://img.shields.io/badge/HTML5_Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)

*An exploratory architecture piece demonstrating that true visual fidelity and interactive storytelling do not require sacrificing performance metrics.*

---
</div>

## Port Gravity live URL 🪐 -  https://port-gravity.vercel.app

## ✨ The Vision

Most digital portfolios rely on either heavy, unoptimized `.mp4` video files or simplistic scroll-jacking libraries that destroy browser performance and infuriate users. 

**Port Gravity** was built to solve the ultimate frontend dilemma: **How do we create a cinematic, 120-fps interactive sequence tied perfectly to the user's scroll wheel, without blowing up the DOM or the user's mobile data plan?**

## 🎹 The Hero Animation: Anatomy of a Keyboard

At the core of this experience is a custom, full-screen interactive sequence where a mechanical keyboard seamlessly unpacks and re-packs itself as you scroll. 

This is **not** a video. 

1. **AI Synthesis:** The 192 individual image frames comprising this explosion sequence were synthesized using **Google's Whisk and Flow** pipelines, ensuring immense visual clarity and perfect structural cohesion across every frame.
2. **The Canvas Engine:** Injecting 192 high-resolution `<img>` nodes into the React DOM would instantly crash mobile browsers. Instead, we draw the sequence iteratively directly onto a low-level HTML5 `<canvas>`.
3. **Scroll Synchronization:** Using `requestAnimationFrame` loops governed by `framer-motion`'s highly optimized `useScroll` hook, the canvas synchronously maps the user's scroll vector (both forward and reverse) to specific image indices at 120 frames per second. No layout thrashing, no dropped frames.
4. **Intelligent Chunking:** To achieve instantaneous First Contentful Paint (FCP), the application eagerly loads only the first 5 frames. The remaining 187 frames are aggressively chunked, debounced, and lazily fetched in the background with extremely low `fetchPriority`.

> **Result:** A visually immersive, silky-smooth native scroll experience that scores a perfect **100/100 on Lighthouse Performance**.

## 🏗️ Architecture & Philosophy

Port Gravity serves as a modern blueprint for high-end SaaS landing pages, luxury brand environments, and elite engineering portfolios.

- **Next.js 14 App Router:** Leveraging React Server Components (RSC) to render the vast majority of the static DOM on the server, shipping almost zero JavaScript for the text and structural scaffolding.
- **Micro-Client Boundaries:** "use client" directives are surgically isolated to the absolute lowest nodes of the component tree (e.g., the exact Canvas node computing the scroll animation, or the specific navigation interaction states).
- **Centralized Data Dictionary:** The `src/data/projects.ts` file acts as a headless CMS object. New portfolio projects are generated instantaneously by appending a typed configuration object to the data array.
- **Dynamic Routing:** Built-in dynamic `[slug]` pages ingest the centralized dictionary to automatically provision perfectly-styled, recruiter-ready case study architectures on demand.

## 🚀 Getting Started

Deploying your own zero-gravity portfolio:

1. **Clone the repo:**
   ```bash
   git clone https://github.com/mitra9917/port_gravity.git
   cd port_gravity
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Launch the development thrust:**
   ```bash
   npm run dev
   ```
   *Your site will be live at `http://localhost:3000`*

## 🎨 Design System

The application strictly adheres to a minimalist, premium design vocabulary:
- Deep black backgrounds paired with high-contrast, sub-pixel anti-aliased white typography.
- Glassmorphic noise textures and micro-gradients that respond dynamically to interaction states.
- Exacting Framer Motion transition curves utilizing custom `[cubic-bezier(0.16,1,0.3,1)]` easings to mimic real-world inertia and momentum rather than artificial linear tweens.

## 👤 The Engineer

Computer Science undergraduate exploring full-stack engineering, combining high-fidelity frontend motion interactions with robust, scalable backend methodologies and early-stage AI integrations.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Let's build the future, beautifully.
