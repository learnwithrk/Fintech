/* ==========================================================
   Read engine — drives read.html
   URL usage: read.html?id=1-nature-of-partnership
   Loads reads/manifest.json -> reads/<id>.json and renders a
   standalone reading page with a sticky section index (TOC)
   and prev/next navigation between sections.
   ========================================================== */

(async function () {
  QuizApp.renderTopbar();

  const params = new URLSearchParams(location.search);
  const readId = params.get("id");
  const root = document.getElementById("readRoot");

  if (!readId) {
    root.innerHTML = `<div class="empty-note">No module selected. <a href="index.html">Go back to the module list</a>.</div>`;
    return;
  }

  let manifest, entry, data;
  try {
    manifest = await (await fetch("reads/manifest.json")).json();
    entry = manifest.find((r) => r.id === readId);
    if (!entry) throw new Error("Module not found in manifest");
    data = await (await fetch(entry.file)).json();
  } catch (e) {
    root.innerHTML = `<div class="empty-note">Couldn't load this module (${QuizApp.escapeHtml(e.message)}). <a href="index.html">Go back</a>.</div>`;
    return;
  }

  document.title = data.title + " — Read";

  const sections = data.sections || [];

  root.innerHTML = `
    <div class="read-header">
      <span class="tag">${QuizApp.escapeHtml(entry.subject || "Reading")}</span>
      <h1>${QuizApp.escapeHtml(data.title)}</h1>
      ${data.subtitle ? `<p style="color:var(--ink-soft);margin:0;">${QuizApp.escapeHtml(data.subtitle)}</p>` : ""}
    </div>

    <button class="btn btn-ghost read-toc-toggle" id="tocToggle" type="button">Contents &#9662;</button>

    <div class="read-layout">
      <nav class="read-toc" id="readToc">
        <div class="toc-label">On this page</div>
        <ol>
          ${sections.map((s) => `<li><a href="#${s.id}" data-sec="${s.id}">${QuizApp.escapeHtml(s.heading)}</a></li>`).join("")}
        </ol>
      </nav>
      <div class="read-content" id="readContent"></div>
    </div>
  `;

  const contentEl = document.getElementById("readContent");

  sections.forEach((s, i) => {
    const sec = document.createElement("section");
    sec.className = "read-section";
    sec.id = s.id;
    sec.innerHTML = `<h2>${QuizApp.escapeHtml(s.heading)}</h2>${s.html || ""}`;
    contentEl.appendChild(sec);

    const nav = document.createElement("div");
    nav.className = "read-pagenav";
    const prev = sections[i - 1];
    const next = sections[i + 1];
    nav.innerHTML = `
      ${prev ? `<a class="btn btn-ghost" href="#${prev.id}" data-sec-link="${prev.id}">&larr; ${QuizApp.escapeHtml(prev.heading)}</a>` : `<span class="btn btn-ghost spacer"></span>`}
      ${next ? `<a class="btn btn-primary" href="#${next.id}" data-sec-link="${next.id}">${QuizApp.escapeHtml(next.heading)} &rarr;</a>` : `<span class="btn btn-primary spacer"></span>`}
    `;
    contentEl.appendChild(nav);
  });

  // Jump-to-section links scroll smoothly (html{scroll-behavior:smooth} already set).
  document.querySelectorAll('[data-sec-link]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.getElementById(a.dataset.secLink);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${a.dataset.secLink}`);
      }
    });
  });

  // Mobile contents toggle.
  const toc = document.getElementById("readToc");
  const tocToggle = document.getElementById("tocToggle");
  tocToggle.addEventListener("click", () => {
    toc.classList.toggle("open");
  });
  toc.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => toc.classList.remove("open"));
  });

  // Highlight the active section in the TOC as the reader scrolls.
  const tocLinks = Array.from(toc.querySelectorAll("a[data-sec]"));
  const sectionEls = sections.map((s) => document.getElementById(s.id));
  function setActive(id) {
    tocLinks.forEach((a) => a.classList.toggle("active", a.dataset.sec === id));
  }
  if (sectionEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sectionEls.forEach((el) => el && observer.observe(el));
    setActive(sections[0].id);
  }

  // If the URL already has a #hash, jump there on load.
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ block: "start" });
  }
})();
