## ROLE

You are a **senior Next.js + Tailwind** engineer. Build a **pixel-accurate** frontend from the provided Figma. Implement **only frontend** (no backend), with full responsiveness for **mobile, tablet, and desktop**.

## FIGMA

Use this design as the single source of truth (match spacing, typography, radii, colors, shadows, letter-spacing, and alignment exactly):
**Figma:** [https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=0-1&p=f&t=venuAvxsjX6XolYc-0](https://www.figma.com/design/wgGODdp9oCh2zDlZqSGaaz/BEAUTY-COPS--Copy-?node-id=0-1&p=f&t=venuAvxsjX6XolYc-0)

Export all required images/SVGs from Figma and place them in `/public` (preserve exact sizes). Use SVG where possible.

---

## TECH & CONSTRAINTS

- **Next.js 14+ (App Router)** with TypeScript
- **Tailwind CSS** (no other CSS frameworks)
- **next/image** for all raster images; **inline SVG** or `/public/*.svg` for icons/decoration
- **No absolute positioning** for layout except for intentionally decorative elements (badges, floating shapes). Prefer **flex/grid**, auto layout, and intrinsic sizing.
- **No fixed widths**. Use `%`, `auto`, `max-w-*`, `w-full`, and **clamp()** for fluid typography and spacing where needed.
- **Mobile-first**; scale up with Tailwind breakpoints (`sm, md, lg, xl, 2xl`).
- **Accessibility**: semantic HTML, aria-labels for icons, proper alt text, focus states, color contrast ≥ WCAG AA.
- **Performance**: lazy images, `priority` only for above-the-fold hero assets; avoid layout shift; use CSS for effects when possible.

---

## MUST RESPECT (Responsive Design Fixes Summary)

**Issues to avoid by design:**

1. Fixed width containers → use relative units & `max-w`
2. Absolute positioning with fixed pixels → use flow layout; only decorative elements may be absolute
3. Inconsistent media queries → use Tailwind breakpoints consistently across components
4. Missing responsive patterns → implement stacked → columns patterns on small → large

**Apply these in the build:**

- **Navbar**: percentage-based widths, fluid container, consistent breakpoints
- **Home**: replace absolute with relative flow; `%` widths + `max-w`; responsive grids; horizontal scroll for overflowing card rows on small screens
- **Product Cards**: responsive image wrappers (`aspect-*`), text scales, consistent gaps; snap scrolling on mobile if shown in a row
- **Footer**: center-aligned, flexible, `%`/`auto` widths, scalable text/icons
- **Global CSS**: add only minimal layer for custom utilities; prefer Tailwind utilities

---

## PROJECT SETUP

Initialize or update project:

1. Create a Next.js app (if not present):

```bash
npx create-next-app@latest beauty-cops --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"
cd beauty-cops
```

2. Tailwind config: enable container, custom screens if needed, and fonts/colors extracted from Figma tokens.

**tailwind.config.ts** (Cursor: infer theme values from Figma; use exact font sizes/line-heights/letter-spacing from design):

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", lg: "2rem" } },
    extend: {
      colors: {
        // Cursor: map exact Figma color tokens here (names like primary, secondary, neutral, accent)
      },
      fontFamily: {
        // Cursor: load exact Figma font(s) via next/font or @import if variable font
      },
      boxShadow: {
        // Cursor: add shadows matching Figma elevation
      },
      borderRadius: {
        // Cursor: match Figma radii (e.g., xl/2xl/round)
      },
      letterSpacing: {
        // Cursor: match Figma tracking values
      },
    },
  },
  plugins: [],
} satisfies Config;
```

3. Global styles: **app/globals.css**

- Include Tailwind layers.
- Add minimal custom utilities (e.g., `.text-balance`, `.container-gutter`) only if needed.
- No general fixed sizes.

4. Fonts:

- Use `next/font` to load Figma font(s) (weights/styles exactly as in design). Apply at `app/layout.tsx`.

---

## FILE STRUCTURE

```
app/
  layout.tsx
  page.tsx
  (sections)/
    hero.tsx
    features.tsx
    categories.tsx
    products.tsx
    testimonials.tsx
    cta.tsx
    faq.tsx
  globals.css
components/
  NavbarContainer.tsx
  MobileMenu.tsx
  ProductCard.tsx
  SectionHeader.tsx
  Footer.tsx
  Badge.tsx
  Button.tsx
  RatingStars.tsx
  CarouselSnap.tsx        // optional horizontal snap container
lib/
  breakpoints.ts          // optional shared responsive helpers
public/
  (exported images & svgs from Figma)
```

**Mapping from your previous filenames**

- `components/navbarcontainer.js` → `components/NavbarContainer.tsx`
- `pages/home.js` → `app/page.tsx` (App Router)
- `components/productcard.js` → `components/ProductCard.tsx`
- `components/footer.js` → `components/Footer.tsx`
- `pages/style.css` → `app/globals.css` (Tailwind-first, minimal custom CSS)

---

## IMPLEMENTATION NOTES (do this precisely)

### 1) Container & Layout

- Use `container` + `max-w-screen-2xl` on major sections.
- No fixed widths: prefer `w-full`, `max-w-[###px]` only when the design requires an exact cap.
- Use `grid` + `gap-x-6 gap-y-8` patterns.
- Use `md:`/`lg:` modifiers to switch from stacked (mobile) to two/three+ columns (tablet/desktop).

### 2) Navbar (`NavbarContainer.tsx`)

- Desktop: logo left, nav center/right, CTA right (as Figma).
- Mobile: use a **mobile menu** (`MobileMenu.tsx`) with a11y: focus trap, ESC to close, ARIA roles.
- Use `%` widths or `flex-1` for spacing; avoid fixed pixel nav widths.

### 3) Hero (`(sections)/hero.tsx`)

- Use fluid typography with `clamp()` (via Tailwind arbitrary values):
  Example: `text-[clamp(28px,5vw,56px)]` to match Figma exact sizes.
- Constrain hero content with `max-w-*`, not fixed widths.
- If decorative shapes are absolutely positioned, guard with `pointer-events-none` and responsive `inset-*` using `%`.

### 4) Cards / Grids (`ProductCard.tsx`)

- Use `aspect-[4/5]` (or exact from Figma) for images; wrap with `overflow-hidden` and `rounded-*`.
- Text should wrap and scale; never overflow horizontally.
- Add `hover:shadow-*` and subtle `transition` if in Figma.
- For mobile rows: implement horizontal **snap** container (`CarouselSnap.tsx`) with `overflow-x-auto snap-x snap-mandatory` and `scrollbar-gutter: stable;`.

### 5) Footer (`Footer.tsx`)

- Center layout; `grid` for columns on `md+`, stacked on mobile.
- Use `%` or `auto` widths; no fixed widths.
- Ensure link groups wrap properly on small screens.

### 6) Images

- Use `next/image` with `fill` or fixed `width/height` per asset needs; set `sizes` attributes for responsive loading.
- Mark only critical Hero image(s) as `priority`.

### 7) States & Interactions

- Add focus-visible outlines for keyboard nav.
- Buttons/links minimum target size `min-h-[44px]` on touch devices.

### 8) Content

- Use placeholder text only until assets are exported from Figma; match exact copy, letter-case, and spacing from Figma once available.

---

## RESPONSIVE RULES (apply consistently)

- **Mobile-first**: Base styles = mobile.
- `sm` (~640px): small phones phablets
- `md` (~768px): tablets → introduce 2-column where Figma implies
- `lg` (~1024px): desktop baseline
- `xl/2xl`: wide desktops → follow Figma max width
- Typography uses `clamp()` where the design scales; otherwise Tailwind fixed sizes that match Figma at the reference width.
- Replace **any** absolute coordinate layout with grid/flex equivalents. Only decorative items can be `absolute`, with `%`-based offsets at breakpoints.

---

## DELIVERABLES

- Fully coded pages/sections matching Figma exactly.
- All components responsive and accessible.
- No design drift: paddings, gaps, radii, shadows, and line-heights must match Figma.
- Lighthouse (no auth) performance ≥ 90 on desktop, ≥ 85 mobile (no heavy libs).

---

## QA & ACCEPTANCE CHECKLIST (Cursor: verify before finishing)

1. **Pixel parity**: overlay browser with Figma prototype at common widths (375, 768, 1280, 1440).
2. **No fixed-width layout containers**; all major wrappers use `%` + `max-w`.
3. **No layout-breaking absolute positioning**; only decorative.
4. **Navbar** collapses to mobile menu ≤ `md`; desktop restored ≥ `lg`.
5. **Product cards** scale and maintain aspect; horizontal snap works on small screens.
6. **Footer** stacks on mobile, becomes columns on tablet/desktop.
7. **Images** don’t stretch; crisp on retina; alt text present.
8. **A11y**: keyboard nav works; focus rings visible; landmarks used.
9. **CLS** near-zero; use reserved aspect boxes for images/media.
10. **Mobile** thumb targets ≥ 44px.
11. **Code**: no unnecessary CSS; Tailwind utility-first; clean components.

---

## TASKS FOR CURSOR

1. Scaffold/adjust Next.js 14 app with Tailwind as above.
2. Create the file structure and empty components.
3. Inspect Figma; extract tokens (colors, fonts, radii, shadows, spacing). Populate `tailwind.config.ts` accordingly.
4. Implement **Navbar**, **Hero**, **all sections**, **ProductCard**, **Footer**, matching Figma exactly.
5. Ensure full responsiveness per rules; remove any fixed/absolute layout hacks.
6. Replace raster icons with SVG wherever possible.
7. Wire images with `next/image` and proper `sizes`.
8. Deliver a build that passes the QA checklist.

**End of prompt.**
