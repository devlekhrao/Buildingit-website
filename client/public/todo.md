# Fundraiser Payment Feature TODO

- [x] Set up Stripe integration via webdev_add_feature
- [x] Stripe API keys auto-configured (no user input needed)
- [x] Add `contributions` table to drizzle/schema.ts (amount, currency, email, name, message, stripe session id, status, createdAt)
- [x] Push DB schema (pnpm db:push)
- [x] Add db helper functions for contributions (insert, list, totals)
- [x] Add tRPC procedures: createCheckoutSession, listContributions, getStats
- [x] Wire Stripe webhook to mark contributions as paid
- [x] Build dedicated Fundraiser page UI with real payment flow
- [x] Add success/cancel handling after Stripe redirect
- [x] Show live total raised + backers from DB
- [x] Register route in App.tsx (keep existing)
- [x] Add explicit error UI for stats/backers queries
- [x] Stop bySession polling once confirmed
- [x] Write vitest tests for contribution procedures
- [x] Test full flow and deliver

- [x] Move "buildingit" brand to the right side of the top nav
- [x] Group all page nav links on the right side
- [x] Add a "Home" button among right-side links that redirects to homepage

- [x] Move "buildingit" brand back to the LEFT side, keep links on the right
- [x] Make the top bar fixed/frozen so it stays visible while scrolling

- [x] Make Home link scroll to top of homepage (incl. when already on home)

- [x] Remove Founder section from homepage
- [x] Keep Founder as separate /founder page in top bar
- [x] Rename "Founder" nav label to "About Us" across all pages

- [x] (Superseded) Restyle top bar into high-contrast silver across all pages

- [x] Build reusable floating left Sidebar component (silver, rounded/pill edges, vertical, detached)
- [x] Replace silver top bar with floating left Sidebar on all 5 pages (mobile keeps slim top bar)
- [x] Set active link per page in Sidebar
- [x] Remove old h-14 top spacers (desktop)

- [x] (Superseded) Add desktop left padding to page content so sidebar never overlaps content — sidebar replaced by floating top bar

## Remove Fundraiser + Payment Gateway
- [x] Remove /fundraiser route from App.tsx and the Fundraiser page file
- [x] Remove Fundraiser links from Sidebar component + all mobile top bars + footers
- [x] Unregister Stripe webhook route and fundraiser router from server
- [x] Remove fundraiser tests; verify build + tests pass

## Convert sidebar back to floating top bar + Magazine landscape
- [x] Convert floating left Sidebar into a floating top bar (same silver pill/circular-edge styling)
- [x] Apply floating top bar across all pages (Home inline + Sidebar component pages)
- [x] Remove desktop left padding (md:pl-*) now that sidebar is gone; add top spacing for floating bar
- [x] Convert Magazine layout/preview into landscape orientation
- [x] Verify build + tests pass, then checkpoint
- [x] Remove "Enter Spacetime Grid" and "Meet The Architect" buttons from homepage hero

## Website Intro Animation Sequence
- [x] Build IntroSequence overlay component (full-screen black, fixed, z-top)
- [x] Stage 1: "YOU NAME IT" enters
- [x] Stage 2: "WE ARE BUILDINGIT" enters below
- [x] Stage 3: suffix titles rapid-cycle at full speed
- [x] Stage 4: silver "buildingit" pill button materializes center
- [x] Stage 5: pill expands/morphs upward into the floating top bar position
- [x] Stage 6: reveal homepage hero underneath, unmount overlay
- [x] Play once per session (sessionStorage), skippable on click
- [x] Respect prefers-reduced-motion (skip straight to homepage)
- [x] Verify build + tests pass, checkpoint

## Nav routing + Infinity Scale cleanup
- [x] Show intro only on genuine fresh page load, not on client-side (SPA) navigation back to Home
- [x] Ensure clicking Home from other pages routes to homepage without replaying intro
- [x] Remove standalone /infinity-scale route and InfinityScale page
- [x] Remove "Infinity Scale" nav item from the top bar (Sidebar + Home inline bar) and intro bar
- [x] Redirect leftover /infinity-scale links to /?scroll=infinity-scale (home section)
- [x] Keep Infinity Scale as homepage scroll-down section
- [x] Verify build + tests pass, checkpoint

## Lead Capture & Conversion
- [x] Add `leads` table (name, email, project_type, budget, timeline, message, created_at) to drizzle schema
- [x] Add `newsletter_signups` table (email, created_at, unique email)
- [x] db.ts helpers: insertLead, subscribeNewsletter (idempotent)
- [x] routers.ts: public leads.create mutation (validation + notifyOwner)
- [x] routers.ts: public newsletter.subscribe mutation (dedupe + notifyOwner)
- [x] StartBuildModal component (silver/black theme, fields, validation, success/error states)
- [x] Floating "Let's build it" CTA that opens the modal
- [x] Newsletter/waitlist signup component with silver-pill styling
- [x] Integrate CTA + newsletter into Home page
- [x] Vitest for leads.create and newsletter.subscribe (9 tests passing)
- [x] Verify build + tests pass, checkpoint (lead + newsletter verified end-to-end + DB row confirmed)

## Favicon + Interactive "Name it" Hero
- [x] Generate a square silver "b" monogram favicon tile and set it as the site favicon (+ apple-touch-icon, title, description)
- [x] Clear stale `contributions` module error via server restart
- [x] Build interactive "Name it" hero input with rotating example placeholders (type what you want built)
- [x] Live "...we are building <idea>" response animation (silver/neon idea + blinking caret) as they type
- [x] Pre-fill the Start-a-build form message with the visitor's idea on CTA click (StartBuildModal prefillIdea prop)
- [x] Verify build + tests pass (9/9), browser end-to-end verified, checkpoint


## Glimpse of Ventures + PurpleBat AI Core
- [x] Add "A Glimpse of the Ventures" section after Infinity Scale (compact at-a-glance grid of all ventures, clickable chips jump to carousel)
- [x] Feature PurpleBat as the AI core: mock UI/UX chat preview panel (prompt, AI response, cross-venture action chips, typing dots, composer)
- [x] Visualize how PurpleBat sits at the center of the ecosystem (orbit topology with glowing core + connector lines to ventures)
- [x] Update PurpleBat venture data to reflect AI positioning (AI CORE)
- [x] Add supporting CSS (orbit, glow, AI panel), keep silver/black theme
- [x] Build + 9/9 tests pass, browser-verified

## PurpleBat UI/UX silver sidebar redesign
- [x] Rebuild PurpleBat preview as app UI with high-contrast silver sidebar (light silver gradient bg)
- [x] Black logo tile + black sidebar text/icons; active nav item highlighted
- [x] White main chat surface with black text bubbles/chips/composer
- [x] Add pb-app / pb-sidebar / pb-nav-active / pb-typing-dot CSS
- [x] Build passes, browser-verified

## Dedicated PurpleBat AI application section
- [x] Replace small card preview with a dedicated full section (#purplebat) presenting PurpleBat as an AI application (eyebrow THE AI APPLICATION + large headline + intro)
- [x] Large product UI mockup (silver sidebar app shell) as the centerpiece of the hero
- [x] Capability cards (Prompt to product, Orchestrates every venture, Real-time & autonomous, Secure by default) + metrics strip (<12ms / 840+ / 6 / 24/7)
- [x] Dedicated "Core of the Ecosystem" band with orbit diagram (PurpleBat center + 6 ventures)
- [x] Kept "A Glimpse of the Ventures" at-a-glance grid as a separate slimmer section
- [x] Build passes, browser-verified, checkpoint

## Infinity Scale cards in motion
- [x] Auto-rotate the 3D carousel every ~3.2s
- [x] Pause auto-rotate on hover; resume on mouse leave
- [x] Pause auto-rotate after manual arrow/dot interaction
- [x] Gentle continuous float on the centered card (card-float keyframe, respects prefers-reduced-motion)
- [x] Build passes, browser-verified, checkpoint


## Build roadmap (replaces cluttered PurpleBat showcase)
- [x] Replaced busy PurpleBat chat mockup + duplicate orbit band + glimpse grid with a single clean roadmap
- [x] Roadmap as alternating vertical timeline: PurpleBat (live core) -> FirstFeedback -> Pillar -> LedgerGate -> SecurePass -> RouteFlow -> Grid
- [x] Each stage: phase label, status badge (Live / Building now / Up next / Planned), name, domain, short description
- [x] On-brand silver/black with restrained violet only on the PurpleBat core stage (roadmap-core glass treatment)
- [x] Stages clickable -> deep-link into Infinity Scale carousel for that venture (verified FirstFeedback)
- [x] Build passes, browser-verified, checkpoint


## Services rework + silver roadmap cards
- [x] Repurposed Infinity Scale carousel into services/expertise (AI Solutions, Website Building, Automation Tools, Logistics Software, Retail & POS SaaS, Fintech & Payments, Cybersecurity & Identity)
- [x] Updated VENTURES data: service title, domain label, tagline, two relevant stats per service; heading now "Our Expertise / WHAT WE BUILD"
- [x] Updated ROADMAP stages to match the service positioning (PurpleBat AI core first, deep-links still resolve)
- [x] Restyled the "What we're building" roadmap cards as high-contrast silver cards (silver gradient bg, black text/icons, violet ring on core)
- [x] Build passes, 9/9 tests pass, browser-verified, checkpoint


## Venture-projects roadmap with connecting stream
- [x] Defined ROADMAP as the real venture projects: PurpleBat, FirstFeedback, Grid, ZXStudio, Pillar
- [x] Cards alternate left and right of a central vertical line (desktop), stacked on mobile
- [x] Added an animated violet "stream" flowing down the center with a travelling pulse + horizontal branch into each card
- [x] Kept high-contrast silver cards with black text/icons; PurpleBat as the live core (violet ring + Powers everything)
- [x] Build passes, browser-verified, checkpoint


## Organic plant-stem connector + higher-contrast silver
- [x] Replaced straight center stream with a curving vine/plant-stem SVG path (gentle S-curves) that weaves between alternating cards
- [x] Flowing light pulse travels along the curved stem via stroke-dash animation (reduced-motion respected)
- [x] Ventures alternate left/right around the stem on desktop; straight stem fallback on mobile
- [x] Increased silver card contrast (brighter brushed-silver gradient + stronger border/shadow)
- [x] Build passes, browser-verified, checkpoint


## Venture logos (silver + black theme)
- [x] Designed PurpleBat logo (circuit bat AI core mark) in brushed-silver/chrome on transparent
- [x] Designed FirstFeedback logo (chat bubble + growth arrow) in matching silver/chrome
- [x] Designed Grid logo (3x3 node lattice) in matching silver/chrome
- [x] Designed ZXStudio logo (interlocking ZX monogram) in matching silver/chrome
- [x] Designed Pillar logo (classical column) in matching silver/chrome
- [x] Uploaded logos and wired into roadmap cards (replaced lucide icon tiles with logo images)
- [x] Build passes, browser-verified, checkpoint


## Canvas-rendered venture logos
- [x] Built reusable CanvasLogo component that draws each venture mark on <canvas> (brushed-silver gradient on black tile)
- [x] Implemented 5 draw functions: PurpleBat (bat), FirstFeedback (bubble+trend arrow), Grid (3x3 lattice), ZXStudio (ZX monogram), Pillar (column)
- [x] Handles devicePixelRatio (capped at 3) for crisp rendering
- [x] Replaced roadmap card logo <img> with CanvasLogo by logoKey (core gets violet accent gradient + ring)
- [x] Build passes, browser-verified, checkpoint


## Rebuild intro sequence (silver pill must be visible)
- [x] Order: YOU NAME IT -> neon suffix cycle -> WE ARE BUILDINGIT punch-in -> "WE ARE " fades out leaving BUILDINGIT -> visible silver pill draws in around BUILDINGIT (becomes "buildingit" button) -> pill shrinks & flies up to top bar
- [x] Silver pill chrome now fully opaque/visible at center stage (removed the transparent-background override that made it look all black)
- [x] Slower, readable pacing for each beat
- [x] Build + tests pass, checkpoint


## Intro: in-place pill wrap (no separate button scene)
- [x] Fix WE ARE BUILDINGIT alignment during the WE ARE fade (line stays centered; BUILDINGIT does not shift)
- [x] Wrap the SAME on-screen BUILDINGIT word with a silver rounded-square pill in place (fill turns silver, text turns black) — no separate centered button scene
- [x] Fix overflow/left-anchor: shrink via real font-size (not transform) + content-sized centered wrapper so the badge sits in the middle of the screen
- [x] After the in-place pill fills, it shrinks and flies up to become the top bar
- [x] Build + 9/9 tests pass, removed temp debug freeze hook, checkpoint


## Intro: typewriter + border-then-fill (smooth, longer)
- [x] "WE ARE BUILDINGIT" reveals word-by-word with a typing effect (blinking caret), not a punch-in
- [x] "WE ARE" fades out + collapses, leaving BUILDINGIT centered
- [x] A thick silver rounded-square BORDER draws around BUILDINGIT first (outline only, soft glow) — verified stage 4
- [x] Then the silver color FILLS the border and the text turns black (two-step) — verified stage 5
- [x] Filled pill smoothly shrinks + flies up to the top bar (single transform)
- [x] Longer total runtime, continuous eased transitions (block mounts once; size driven by one animated font-size; WE ARE never unmounts)
- [x] Build + 9/9 tests pass, removed debug hook, checkpoint

## Intro: smooth final fly-up/expand only
- [x] Make the lift height-INDEPENDENT: animate `top` (50vh -> 1.75rem) with constant translateY(-50%) so a shrinking word can't wobble the rise
- [x] Unify final morph timing to 1.4s ease (lift, max-width expand, word font-size shrink, pill padding) so rise + shrink + expand finish as one motion
- [x] Verified flying/top-bar end state (stage 6); build + 9/9 tests pass; removed debug hook; checkpoint

## Intro rephrase (exact scenes + underscore typing)
- [x] Scene 3: word now lowercase "buildingit" in the top-bar logo font (font-display font-black tracking-tight) beside uppercase "WE ARE" — verified, no longer all-caps
- [x] Typing uses a blinking UNDERSCORE "_" cursor (verified trailing the typed words)
- [x] Scene 4: WE ARE fades out -> silver border draws -> silver fills
- [x] Scene 5: filled silver button (logo font/style) hovers up from center, expands into the top bar position
- [x] Build + 9/9 tests pass, debug hook removed, checkpoint


## Intro fly-up: transform-only morph (no layout reflow)
- [x] Replaced width/maxWidth/justifyContent animation with a single measured GPU transform (translate + scale) on the real full-layout top bar
- [x] Center = bar scaled+translated so brand lands dead-center; flying = transform back to its natural resting position
- [x] No left-drift confirmed via full-speed frame capture (justify-content/width never change mid-flight)
- [x] Verified at full speed via frame capture; build clean + 9/9 tests pass; checkpoint

## Intro fixes (user report): remove underscore + center the line
- [ ] Remove the trailing underscore "_" caret at the end of "WE ARE buildingit" (user did not ask for it)
- [ ] Fix the typing line drifting left: pill measures ~994px wide (near full viewport) so visible text reads left-shifted; pill must hug the actual text and stay visually centered

## Intro fixes (user report): remove underscore + center the line
- [x] Removed the trailing underscore "_" caret entirely (no cursor after WE/ARE/buildingit); words reveal by fade + width-expand
- [x] Fixed left-shift: reduced centered headline font to clamp(2rem,7vw,4.75rem) so the line keeps side margins and reads centered (DOM offset 0px verified)

## Remove leftover blinking caret next to buildingit (user report)
- [x] Removed the homepage hero blinking bar (.name-it-caret) after the "…we are building <idea>" line
- [x] Re-confirmed intro has no underscore/caret (intro-caret 0); runtime verified INTRO 0 / HOME 0
