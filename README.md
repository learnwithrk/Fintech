# FinTech — Quiz Hub

Same pattern as the Principles of Management site: name-based login, per-module MCQ quizzes, shared leaderboard, wrong-answer review, plus a textbook-style **Read** page for every module.

## Files
```
index.html            Home — quiz list (from quizzes/manifest.json) + reading material
read.html             Textbook reader (?id=1-fintech-eco-system) with topic index, ← All modules, prev/next
quiz.html             Quiz runner            ← copy from Principles-of-Management
leaderboard.html      Leaderboard            ← copy from Principles-of-Management
css/style.css         Shared styling         ← copy from Principles-of-Management
js/app.js             Login/header/leaderboard   ← copy from Principles-of-Management
js/quiz-engine.js     Quiz engine            ← copy from Principles-of-Management
js/firebase-config.js Firebase keys (same project quiz-hub-836f8) ← copy
firestore.rules.txt   Same rules             ← copy
content/modules.json  Module list (id, title, file) used by the home page and Read page
content/m1..m5.html   Reading content for each module (edit these)
quizzes/manifest.json List of quizzes
quizzes/fintech-module-N.json  8 MCQs per module (add more in the same format)
```

## Publish
Create repo `learnwithrk/FinTech`, push all files, then Settings → Pages → Deploy from branch `main` / root.

## Edit later
- Reading text: edit `content/mN.html` (each `<h3>` becomes an index entry automatically).
- Questions: add `{ "q", "options", "answer" }` objects (zero-based `answer`) and update `questionCount` in `manifest.json`.
