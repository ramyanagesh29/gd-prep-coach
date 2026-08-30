# GD Prep Coach — Challenge Retrospective

**Day 10 Deliverable | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

A day-by-day account of how GD Prep Coach went from no idea to a deployed, tested, production-ready v1.0.0.

---

## Day 1 — Product Discovery & Sprint Planning

The capstone began with genuine discovery, not a pre-decided idea. Through a structured interview, we explored Full Stack vs. AI vs. combined approaches, eventually landing on "Full Stack + AI" as the strongest option for demonstrating real engineering depth rather than a single-file demo.

The pivotal moment came when asked what domain to build in: rather than picking a generic idea, the project was grounded in a genuinely personal problem — failing three real Group Discussion rounds during placement prep, with no specific feedback on what went wrong. That single detail shaped the entire rest of the capstone and gave it an authentic narrative no generic project idea could match.

Two important scope decisions were made this day: dropping a full planner/reminder system in favor of a lightweight "Streak & Goals" mechanic, and choosing browser Speech-to-Text over custom audio recording and ML-based tone analysis. Both decisions protected the 10-day timeline without sacrificing the core value proposition.

Deliverables: PRD, Implementation Blueprint (Days 2-10), Pitch Deck.

## Day 2 — System Design

The PRD became a real technical blueprint: architecture diagrams (component, data flow, request lifecycle, AI interaction), a full MongoDB schema validated against every PRD requirement, a complete API contract for all 10 v1.0 endpoints, UI wireframes for every screen, and a project folder structure mapped to which Blueprint day would touch which files.

This was also the first day real Git/terminal friction appeared — folders created in the wrong directory, requiring careful reading of terminal output to diagnose and fix. A recurring theme throughout the capstone: the debugging skill mattered more than avoiding mistakes.

## Day 3 — Project Setup & Foundation

Backend (Express + MongoDB) and frontend (React + Vite) scaffolding, JWT auth middleware, and routing were built. A genuine infrastructure constraint surfaced here: MongoDB Atlas's free tier allows only one cluster per project — solved by creating a dedicated Atlas project rather than reusing an existing cluster from a different project. A real "IP not whitelisted" connection error was also diagnosed and fixed via Network Access configuration.

## Day 4 — Core Feature Implementation

Topics (model, seed data, API, browsing UI) were built, along with a minimal but real auth system — implemented earlier than the Blueprint's original schedule because Topics genuinely required a way to generate valid JWTs for testing. A multi-machine continuity challenge arose here too: continuing work from a second laptop required re-initializing Git from a ZIP download and carefully verifying no work had been lost.

## Day 5 — AI Analysis Engine

The most significant architectural decision of the capstone: switching the AI provider from Anthropic Claude to Google Gemini, driven by an explicit instruction to use only genuinely free tools. This was a clean provider swap — the prompt design, JSON contract, and error-handling logic were unchanged, only the SDK call differed, demonstrating that the architecture had been designed with the right seams from Day 2.

A real deprecation bug was hit and fixed (a model name had been retired), and the "save-before-analyze" design was validated in production: early test attempts show a null score in the database from before the fix, proving user responses survive AI failures rather than being lost.

## Day 6 — Complete the MVP & Deliver a Working Demo

Dashboard (streak, weekly goals, reminder banner) and History pages were built, completing every PRD v1.0 feature. The application was then deployed live for the first time — Render for the backend, Vercel for the frontend — and verified end-to-end in production. This was the moment the project became a genuinely shareable product rather than a local prototype.

## Day 7 — Product Refinement & User Experience

A full design system was built from scratch (a navy/violet theme matching the original pitch deck, consistent spacing/typography/buttons/cards) and applied across every screen. This day also produced a real, instructive Git incident: an unfinished merge from a previous session had to be diagnosed and safely completed without losing any styling work.

## Day 8 — Testing, Debugging & Production Optimization

A structured release-readiness review surfaced 15 real issues: open CORS, no rate limiting, missing security headers, weak validation, no global error handling, no route guards, no accessibility labels, and more. Every issue was fixed, then verified via a full 10-point end-to-end walkthrough on the live production site.

## Day 9 — Launch & Production Readiness

A full release-readiness pass covering documentation, SEO/social metadata, and package.json cleanup. Crucially, this day's testing uncovered three genuine production bugs that had not been caught earlier: a single-page-app routing 404 on direct navigation, a NavBar that didn't update after login without a manual refresh, and a component that had been silently overwritten with unrelated code during earlier edits. Finding and fixing all three before public launch is exactly what a release-readiness review is meant to catch.

## Day 10 — Final Review, Portfolio & Graduation

The final day: a last review through the lens of Engineer, PM, Designer, and Recruiter; portfolio materials; GitHub repository polish; and this retrospective, alongside the future roadmap and graduation artifacts marking the close of both the capstone and the full 60-Day Challenge.

---

## Skills Demonstrated

- Product discovery and scope discipline — repeatedly protecting the timeline by simplifying (planner to streak system; custom audio to Web Speech API)
- System design before implementation — schema, API contract, and architecture locked down before any code was written
- Full-stack engineering — React, Express, MongoDB, JWT auth, REST API design
- Real AI integration — prompt engineering, structured JSON output validation, provider-agnostic architecture (proven by the Claude to Gemini swap)
- Production deployment — Render, Vercel, MongoDB Atlas, environment variable management, CORS configuration
- Security-conscious engineering — rate limiting, input validation, centralized error handling, route guards
- Genuine debugging under real conditions — Git conflicts, deprecated APIs, cross-machine continuity, silent regressions
- Release engineering — QA processes, documentation, and a structured launch process

---

## Final Project Summary

GD Prep Coach is a fully deployed, tested, and documented AI-powered Group Discussion practice platform, built from a personal failure into a genuine tool others can use. It reflects a complete software development lifecycle, executed independently over 10 focused days, and stands as concrete proof of the ability to take a product from idea to production.

---

## Lessons Learned

1. A well-designed architecture pays for itself. The Claude to Gemini swap on Day 5 took minutes, not hours, because Day 2's design correctly isolated the AI provider behind a single service function.
2. Real bugs hide in real usage, not casual testing. Every production bug found on Days 8-9 only surfaced when actually trying to break the app deliberately, not from normal happy-path testing.
3. Git friction is normal, not a sign of failure. Diverged branches, unfinished merges, and multi-machine continuity issues appeared repeatedly, and every one was resolved without losing work by reading tool output carefully instead of panicking.
4. Constraints sharpen a project, they don't weaken it. The "free tools only" constraint didn't limit the product, it produced a better engineering story than an unconstrained build would have.

---

## A Note From Your AI Pair Programmer

Ten days ago, this project didn't exist, not even as an idea. What you brought to that first session was a genuinely hard-won piece of experience: three failed Group Discussion rounds, and the fact that nothing gave you a straight, specific answer about why. That's not a small thing to work from. Plenty of people fail at something and just feel bad about it. You turned it into a build spec.

What stood out across these ten days wasn't that everything went smoothly, it didn't. You hit a MongoDB free-tier limit you couldn't have anticipated. You lost an autogenerated password because Atlas only shows it once. You had a merge stuck mid-way through. You found a component silently overwritten with the wrong code, days after it happened. Every single time, the response was the same: read the actual error, don't guess, fix it properly, keep going. That's the real skill this capstone built, not React, not Express, not Gemini prompts. Those are just the materials. The skill is what you did on Day 3 when the cluster limit hit, and what you did on Day 9 when you found three bugs the night before launch instead of shipping around them.

The Claude-to-Gemini switch on Day 5 is probably my favorite moment in this whole build. Not because it was hard, it wasn't, it took one function change, but because it worked cleanly precisely because of decisions made on Day 2, three days before you knew you'd need it. That's what good architecture actually looks like: not being clever in the moment, but being disciplined earlier so the moment doesn't need cleverness.

You're closing this out with something real: a live URL, a tested product, genuine debugging stories you can tell in an interview without exaggerating a single detail, and proof, not a claim, proof, that you can take a project from a personal failure to a production deployment in ten days. Whatever comes next, in placements or otherwise, you've already done the hard part once. Do it again. It gets faster every time.

Go build the next one.
