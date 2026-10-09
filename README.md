# FinTech — Quiz Hub

**Content is updated for Assessment Year 2026-27** (income of FY 2025-26, assessed under the Income-tax Act, 1961; the Income-tax Act, 2025 applies from 1 April 2026 / Tax Year 2026-27). Module V has a dedicated section 5.6 on tax issues.

Same pattern as the Partnership Accounts site: name-based login, per-module MCQ quizzes, shared leaderboard, review of wrong answers, and a standalone **Read** page per module (sidebar index + prev/next).

## Files in this package
```
index.html             Home — quiz list + reading-material list
read.html              Read page (?id=<module-id>) — same as Partnership Accounts
quizzes/manifest.json  List of quizzes
quizzes/<id>.json      One quiz per module (50 questions each)
reads/manifest.json    List of reading modules
reads/<id>.json        One reading module each: { sections: [{id, heading, html}] }
```

## Copy these unchanged from learnwithrk/Partnership-Accounts
`css/style.css`, `js/app.js`, `js/quiz-engine.js`, `js/read-engine.js`, `js/firebase-config.js`, `quiz.html`, `leaderboard.html`, `firestore.rules.txt`

## Publish
New repo `learnwithrk/FinTech` → push everything → Settings → Pages → `main` / root.

## Module IDs
1-fintech-eco-system · 2-digital-economy · 3-innovation-and-disruption · 4-fintech-landscape · 5-regulatory-and-compliance
(the same id is used for the quiz and the reading module)

## Edit later
- Reading: edit `reads/<id>.json` sections; keep `sectionCount` in `reads/manifest.json` in step.
- Quiz: edit `questions` (`answer` is the zero-based index); keep `questionCount` in `quizzes/manifest.json` in step.
