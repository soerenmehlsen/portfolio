# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the one-page portfolio in the editorial style of the reference (sand hero, dark rounded sections, mono labels, scroll-driven animation) using Søren's existing content.

**Architecture:** Rewrite the section components in place on the existing Next 16 / Tailwind 4 / framer-motion stack. Three small motion primitives (`SmoothScroll`, `RevealHeading`, `ScrollWords`) are shared by all sections; content keeps coming from `src/app/lib/data.ts`. Theme switching and the old animation libraries are removed.

**Tech Stack:** Next.js 16 (App Router, `output: "export"`), React 19, Tailwind 4, framer-motion 11, lenis (new), TypeScript 7.

**Spec:** `docs/superpowers/specs/2026-11-15-portfolio-redesign-design.md`

## Global Constraints

- No copied text, images or code from the reference site.
- Fonts: Inter Tight (next/font/google) + Geist Mono (`src/app/fonts/GeistMonoVF.woff`). No Neue Montreal.
- Colors as Tailwind 4 `@theme` tokens: `sand #E8E8E3`, `ink #171717`, `night #080807`, `bone #D1D1C7`, `olive #8C8C73`, `stone #6B645C`.
- Big-motion easing `cubic-bezier(0.77, 0, 0.175, 1)`, 0.5–1 s; micro-interactions 0.15–0.3 s.
- `prefers-reduced-motion`: all content visible and static, Lenis off.
- `npm run build` (static export) must pass after every task.
- Existing `analyticsEvents` names unchanged; PostHog and GA wiring in `layout.tsx` unchanged.
- Existing copy in `data.ts` is not reworded.
- The project has no test runner and none is added. Each task is verified by `npm run build` plus a browser check on the dev server (`npm run dev`) at desktop (1280 px) and mobile (375 px) width.
- Work happens on the local branch `redesign-portfolio`; one commit per task. Never push, never touch `main`.

## Review Focus

1. **Reduced motion / no animation yet run:** headings and intro text must never be stuck invisible; with reduced motion on, every section's text is readable. (Checked in Task 1 and Task 7.)
2. **Narrow screens:** "SØREN MEHLSEN" must fit at 320–375 px without horizontal scroll. (Task 2.)
3. **Overlay menu:** Escape closes it, a link click closes it and scrolls, page behind does not scroll while open. (Task 2.)
4. **Anchor links with Lenis:** every nav link lands on its section; the fixed menu button does not cover headings. (Task 2, re-checked Task 7.)
5. **Long experience text:** the longest description (GEjSER) expands without clipping or layout jump at both widths. (Task 3.)

---

### Task 1: Foundation – tokens, fonts, layout shell, motion primitives

**Files:**
- Modify: `src/app/globals.css` (replace theme/background styles with tokens)
- Modify: `src/app/layout.tsx`, `src/app/containers/providers.tsx`, `src/app/page.tsx`
- Create: `src/app/components/motion/SmoothScroll.tsx`, `RevealHeading.tsx`, `ScrollWords.tsx`
- Modify: `package.json` (add `lenis`)

**Interfaces – Produces:**
- `SmoothScroll({ children }: { children: React.ReactNode })` – client provider; starts Lenis unless reduced motion; anchor clicks (`a[href^="#"]`) scroll via Lenis.
- `RevealHeading({ text, as = "h2", className }: { text: string; as?: "h1" | "h2"; className?: string })` – per-character masked slide-up when in view (once); element carries `aria-label={text}`, characters `aria-hidden`.
- `ScrollWords({ text, className }: { text: string; className?: string })` – words go from 0.2 to 1 opacity tied to scroll progress through the element.
- Tailwind utilities from tokens: `bg-sand`, `text-ink`, `bg-night`, `text-bone`, `text-olive`, `text-stone`, `font-sans` (Inter Tight), `font-mono` (Geist Mono); CSS var `--ease-big`.
- `Section` layout convention: every section is `<section id="…">` with ids `home`, `experience`, `projects`, `skills`, `about`, `contact`.

- [ ] **Step 1:** `npm install lenis`.
- [ ] **Step 2:** Rewrite `globals.css`: `@import "tailwindcss"`, `@theme` with the six colors, font vars and `--ease-big`; body `bg-sand text-ink`; remove dark-mode, grid/noise background, gradient and waving-hand styles.
- [ ] **Step 3:** `layout.tsx`: swap Sora for Inter Tight + local Geist Mono; remove `site-background`, `ThemeSwitch`, old `Navbar`; keep `PostHogProvider`, `GoogleAnalytics`; fix metadata title to "Søren Mehlsen – Full-Stack Developer". `providers.tsx` wraps children in `SmoothScroll` only.
- [ ] **Step 4:** Implement the three motion primitives with framer-motion (`useInView`, `useScroll`, `useTransform`, `useReducedMotion`).
- [ ] **Step 5:** `page.tsx`: temporarily render a `RevealHeading` and a `ScrollWords` inside tall placeholder sections.
- [ ] **Step 6: Verify.** `npm run build` → exits 0. In the browser: heading animates in, words fade with scroll, scroll is smooth; with reduced motion emulated, both texts are fully visible immediately.

### Task 2: Hero and navigation

**Files:**
- Rewrite: `src/app/components/home/Hero.tsx`
- Create: `src/app/components/layout/TopBar.tsx`, `src/app/components/layout/MenuButton.tsx`
- Modify: `src/app/lib/data.ts` (`links`, new `socials`), `src/app/lib/types.ts`
- Delete: `layout/Navbar.tsx`, `Header.tsx`, `Hamburger.tsx`, `CloseButton.tsx`

**Interfaces:**
- Consumes: `RevealHeading`, tokens.
- Produces: `links` = Home `#home`, Experience `#experience`, Projects `#projects`, Skills `#skills`, About `#about`, Contact `#contact`. `socials: { name: "LinkedIn" | "GitHub"; href: string }[]` and `contactEmail: string` exported from `data.ts` (values taken from the current `Hero.tsx`).
- `MenuButton()` – fixed round button (sand on dark, top right), visible after scrolling past the hero; toggles a full-screen overlay with `links` and `socials`.

- [ ] **Step 1:** Update `data.ts`/`types.ts` as above (`SectionName` still derives from `links`).
- [ ] **Step 2:** `TopBar`: "Full-Stack Developer" left, text links (all except Home) right; hidden links below `md`.
- [ ] **Step 3:** `Hero` (`id="home"`, sticky so the next section rolls over it): `RevealHeading as="h1"` "SØREN MEHLSEN" sized with `clamp()`/`vw` to span the width; arrow icon; tagline "Health Tech engineer, who likes to build things on the web."; "CONTACT ↗" pill (`mailto:`, `trackContactClick({ type: "email", section: "hero" })`); tall grayscale portrait from `/profilbillede.png`; mono status "BASED IN" / "DENMARK" bottom right.
- [ ] **Step 4:** `MenuButton` + overlay: Escape closes, link click closes then scrolls, body scroll locked while open (stop/start Lenis), social links fire `trackSocialClick({ platform, section: "menu" })`.
- [ ] **Step 5: Verify.** Build passes. Browser at 1280 and 375 px: name fits with no horizontal scrollbar (also check 320 px); menu button appears after the hero; overlay opens, Escape closes, link scrolls to section.

### Task 3: Experience accordion

**Files:**
- Rewrite: `src/app/components/experience/Experience.tsx`
- Delete: `experience/VerticalElement.tsx`

**Interfaces – Consumes:** `experiencesData`, `RevealHeading`, `ScrollWords`.

- [ ] **Step 1:** Dark section (`bg-night text-bone`, `rounded-t-3xl`, `relative z-10` above the sticky hero), heading "EXPERIENCE /", mono label "(CAREER)".
- [ ] **Step 2:** Rows `(01)`…`(05)`: number left, title right, location + date in mono, hairline dividers. Desktop: the row nearest the viewport centre is active (framer-motion `useInView` with a centre `margin`, or scroll position) and expands its description with a height/opacity animation; others collapse to one line. Below `md` and with reduced motion: all rows expanded, no scroll logic.
- [ ] **Step 3: Verify.** Build passes. Browser: scrolling moves the active row top to bottom and back; GEjSER description is fully visible when active at both widths; mobile shows all descriptions.

### Task 4: Projects

**Files:**
- Rewrite: `src/app/components/projects/Projects.tsx`, `projects/Project-card.tsx`
- Delete: `layout/BottomDrawer.tsx`, `ui/3d-card.tsx`

**Interfaces – Consumes:** `projectsData`, `RevealHeading`, `ScrollWords`, `analyticsEvents`.

- [ ] **Step 1:** Dark section continuing from Experience: heading "SELECTED WORKS /", label "(PROJECTS)", intro via `ScrollWords`: "A selection of things I have built, from side projects to tools used in practice."
- [ ] **Step 2:** `ProjectCard({ project, index }: { project: ProjectInfo; index: number })`: large mono number (`01`…) left, rounded image card right (plain `<img>`/`next/image` unoptimized; GIF for DeepDR), description, title in mono, `techStack` as pill tags, links "LIVE ↗" (`trackDemoClick({ project: title, section: "projects" })`) and "GITHUB ↗" (`trackSocialClick({ platform: "github", section: "projects" })`). When `live === github`, render only the GitHub link. Slight image scale on scroll and hover lift.
- [ ] **Step 3: Verify.** Build passes. Browser: four projects, numbers 01–04, links open the same URLs as in `data.ts`, DeepDR shows one link; single column at 375 px.

### Task 5: Skills, certificate and About

**Files:**
- Rewrite: `src/app/components/skills/Skills.tsx`, `src/app/components/about/About.tsx`
- Delete: `certificate/Certificates.tsx`
- Modify: `src/app/lib/data.ts` (add `issuer: "Microsoft"` to the certificate)

**Interfaces – Consumes:** `skillsData`, `certificiateData`, `RevealHeading`, `ScrollWords`.

- [ ] **Step 1:** Skills (`id="skills"`, light, `rounded-t-3xl` so it rolls over the dark block): heading "SKILLS /", label "(STACK)"; four groups as columns on desktop, stacked on mobile; each skill = icon + name with hairlines. Below: certificate row – title, issuer in mono, "VIEW ↗" link to `link`.
- [ ] **Step 2:** About (`id="about"`, light): statement via `ScrollWords` in large type: "The thrill of solving a problem is what drives me."; then two-column grid with mono labels "MY PASSION" and "PERSONAL PROFILE" left and the existing two paragraphs right (text copied unchanged from the current `About.tsx`, inline emphasis kept as plain medium-weight spans).
- [ ] **Step 3: Verify.** Build passes. Browser: all skills from `skillsData` present, certificate link opens the Microsoft URL, About text matches the old text word for word.

### Task 6: Contact / footer

**Files:**
- Rewrite: `src/app/components/layout/Footer.tsx`

**Interfaces – Consumes:** `socials`, `contactEmail`, `RevealHeading`, `analyticsEvents`.

- [ ] **Step 1:** Dark section `id="contact"`, `rounded-t-3xl`: heading "LET'S TALK", email pill (`trackContactClick({ type: "email", section: "footer" })`), social links (`trackSocialClick({ platform, section: "footer" })`), mono footer line with "© 2026 Søren Mehlsen" and a live clock labelled "LOCAL TIME" in `Europe/Copenhagen` (client-only, rendered after mount to avoid hydration mismatch).
- [ ] **Step 2:** Final `page.tsx` order: `TopBar`, `Hero`, `Experience`, `Projects`, `Skills`, `About`; `Footer` and `MenuButton` from `layout.tsx`.
- [ ] **Step 3: Verify.** Build passes with no hydration warnings in the browser console; clock ticks; links correct.

### Task 7: Cleanup and full verification

**Files:**
- Delete: `containers/theme-context.tsx`, `containers/active-section.tsx`, `lib/useInView.ts`, `layout/ThemeSwitch.tsx`, `layout/Switch.tsx`, `ui/AnimatedGradientText.tsx`, `ui/NaturalTypewriter.tsx`, `common/SectionDivider.tsx`, `common/SectionHeading.tsx` (each only if no remaining import)
- Modify: `package.json`

- [ ] **Step 1:** `npm uninstall @splinetool/react-spline @splinetool/runtime react-awesome-reveal react-vertical-timeline-component @types/react-vertical-timeline-component hamburger-react react-intersection-observer react-hot-toast` – skip any package still imported (check with grep first).
- [ ] **Step 2:** `npx tsc --noEmit` → no errors; `npm run build` → exits 0.
- [ ] **Step 3:** Browser pass over all six sections at 1280 px and 375 px; console free of errors; every nav link lands on its section without the menu button covering the heading.
- [ ] **Step 4:** Emulate reduced motion: all headings, intro texts and experience descriptions visible; no smooth-scroll hijack.
- [ ] **Step 5:** Compare against the spec's section list and note anything not done.
