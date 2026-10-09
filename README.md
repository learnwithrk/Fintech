# FinTech — Quiz Hub

A static, GitHub Pages-friendly quiz site — same pattern as the Principles of Management and Partnership Accounts sites. Name-based login, per-module MCQ quizzes (50 each), a shared leaderboard, a review of wrong answers, and a standalone **Read** page for every module (sidebar index + prev/next navigation, mobile-friendly).

**Content is updated for Assessment Year 2026-27** (income of FY 2025-26, assessed under the Income-tax Act, 1961; the Income-tax Act, 2025 applies from 1 April 2026 / Tax Year 2026-27). Module V section 5.6 covers tax issues.

## Files
```
index.html / quiz.html / read.html / leaderboard.html
css/style.css          js/app.js  quiz-engine.js  read-engine.js  firebase-config.js
quizzes/manifest.json  quizzes/<id>.json   (50 questions each)
reads/manifest.json    reads/<id>.json     (sections: id, heading, html)
firestore.rules.txt    (same rules as the other sites — same Firebase project)
```

## Modules
1 FinTech Eco System · 2 Digital Economy · 3 Innovation and Disruption · 4 FinTech Landscape · 5 Regulatory and Compliance

## Publish
Create repo `learnwithrk/FinTech`, upload everything, then Settings → Pages → Deploy from `main` / root.

## Editing later
- Reading: edit the `sections` in `reads/<id>.json`; keep `sectionCount` in `reads/manifest.json` in step.
- Quizzes: edit `questions` (`answer` is the zero-based option index); keep `questionCount` in `quizzes/manifest.json` in step.
