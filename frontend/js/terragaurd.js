(function () {
  "use strict";

  const API_URL = "https://scholar-bigger-experts-healthy.trycloudflare.com";

  const STYLE = `
    .tg-page .tg-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(280px,1fr);gap:16px}
    .tg-page .tg-upload{min-height:180px;display:flex;align-items:center;justify-content:center;cursor:pointer}
    .tg-page .tg-preview{display:none;margin-top:14px}
    .tg-page .tg-preview img{width:100%;max-height:320px;object-fit:contain;border-radius:10px;background:#111}
    .tg-page .tg-filename{margin-top:8px;font-size:11px;color:var(--text-secondary);word-break:break-all}
    .tg-page .tg-engine{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .tg-page .tg-result-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:16px}
    .tg-page .tg-metric,.tg-page .tg-card{padding:14px;border:1px solid var(--border);border-radius:10px;background:var(--card-bg)}
    .tg-page .tg-metric span,.tg-page .tg-label{display:block;font-size:9px;letter-spacing:.1em;color:var(--text-secondary);margin-bottom:7px}
    .tg-page .tg-metric strong{font-size:16px}
    .tg-page .tg-card{margin-top:12px}
    .tg-page .tg-card p{margin:0;font-size:12.5px;line-height:1.7;color:var(--text-secondary);white-space:pre-wrap}
    .tg-page .tg-recs{display:flex;flex-direction:column;gap:8px}
    .tg-page .tg-rec{display:flex;gap:10px;padding:10px;border:1px solid var(--border);border-radius:8px}
    .tg-page .tg-rec-num{color:#75c69a;font-weight:700;font-size:10px}
    .tg-page .tg-rec p{margin:0}
    .tg-page .tg-links{display:flex;gap:8px;flex-wrap:wrap}
    .tg-page .tg-links a{display:inline-flex;padding:8px 10px;border:1px solid var(--border);border-radius:7px;color:var(--text);text-decoration:none;font-size:10px;font-weight:700}
    .tg-page .tg-error{display:none;margin-top:10px;padding:10px;border:1px solid #9d4b4b;border-radius:8px;color:#e9aaaa;background:rgba(150,40,40,.12);font-size:11px}
    @media(max-width:900px){.tg-page .tg-grid{grid-template-columns:1fr}.tg-page .tg-result-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:600px){.tg-page .tg-result-grid{grid-template-columns:1fr}.tg-page .tg-engine{grid-template-columns:1fr}}
  `;

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function confidence(value) {
    if (value === null || value === undefined || value === "") return "N/A";
    const n = Number(value);
    if (Number.isNaN(n)) return "N/A";
    const pct = n <= 1 ? n * 100 : n;
    return `${Math.round(Math.max(0, Math.min(100, pct)))}%`;
  }

  function init() {
    if (document.getElementById("page-terragaurd")) return;

    const style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);

    const navList = document.getElementById("navList");
    const content = document.querySelector(".content");
    const analytics = document.getElementById("page-analytics");
    if (!navList || !content) return;

    // The TerraGuard navigation item is already present in index.html.
    // Reuse it instead of creating a second sidebar entry.
    const nav = navList.querySelector('[data-page="terragaurd"]');
    if (!nav) return;

    const page = document.createElement("section");
    page.className = "page tg-page";
    page.id = "page-terragaurd";
    page.innerHTML = `
      <h2 class="section-heading">TerraGuard Intelligence</h2>
      <p class="section-sub">AI-assisted disaster assessment using satellite and aerial imagery.</p>

      <div class="tg-grid">
        <div class="card">
          <div class="card-title">Satellite / Aerial Imagery</div>
          <div class="card-subtitle">Upload one image for GeoGuard AI assessment.</div>
          <input type="file" id="tgImageInput" accept=".jpg,.jpeg,.png,.webp,.tif,.tiff,image/jpeg,image/png,image/webp,image/tiff" style="display:none;">
          <label class="upload-zone tg-upload" for="tgImageInput">＋ Upload satellite / aerial image</label>
          <div class="tg-preview" id="tgPreviewWrap">
            <img id="tgPreview" alt="Selected imagery preview">
            <div class="tg-filename" id="tgFileName"></div>
          </div>
          <button class="btn primary" id="tgRunButton" type="button" style="margin-top:14px;width:100%;">RUN AI ASSESSMENT</button>
          <div id="tgStatus" class="result-count" style="margin-top:10px;">Ready for analysis.</div>
          <div id="tgError" class="tg-error"></div>
        </div>

        <div class="card">
          <div class="card-title">TerraGuard AI Engine</div>
          <div class="card-subtitle">Local AI-powered disaster intelligence</div>
          <div class="tg-engine">
            <div class="info-item"><div class="il">Vision</div><div class="iv">GeoGuard SegFormer</div></div>
            <div class="info-item"><div class="il">Reasoning</div><div class="iv">Local Gemma 2</div></div>
            <div class="info-item"><div class="il">Compute</div><div class="iv">Local AI server</div></div>
            <div class="info-item"><div class="il">Output</div><div class="iv">Assessment + recommendations</div></div>
          </div>
        </div>
      </div>

      <div id="tgResults" style="display:none;"></div>
    `;
    if (analytics) analytics.before(page); else content.appendChild(page);

    nav.addEventListener("click", function () {
      document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
      document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
      page.classList.add("active");
      nav.classList.add("active");
      const title = document.getElementById("pageTitle");
      const sub = document.getElementById("pageSub");
      if (title) title.textContent = "TerraGuard Intelligence";
      if (sub) sub.textContent = "AI-assisted disaster assessment from aerial and satellite imagery";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const fileInput = document.getElementById("tgImageInput");
    const previewWrap = document.getElementById("tgPreviewWrap");
    const preview = document.getElementById("tgPreview");
    const fileName = document.getElementById("tgFileName");
    const runButton = document.getElementById("tgRunButton");
    const status = document.getElementById("tgStatus");
    const errorBox = document.getElementById("tgError");
    const results = document.getElementById("tgResults");
    let selectedFile = null;
    let objectUrl = null;

    function error(message) {
      errorBox.textContent = message;
      errorBox.style.display = "block";
    }
    function clearError() {
      errorBox.textContent = "";
      errorBox.style.display = "none";
    }

    fileInput.addEventListener("change", function () {
      clearError();
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/tiff"];
      if (file.type && !allowed.includes(file.type)) {
        fileInput.value = "";
        selectedFile = null;
        previewWrap.style.display = "none";
        error("Unsupported image format. Use JPG, PNG, WEBP or TIFF.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        fileInput.value = "";
        selectedFile = null;
        previewWrap.style.display = "none";
        error("Image is too large. Maximum size is 10 MB.");
        return;
      }
      selectedFile = file;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = URL.createObjectURL(file);
      preview.src = objectUrl;
      fileName.textContent = file.name;
      previewWrap.style.display = "block";
      results.style.display = "none";
      status.textContent = "Ready for analysis.";
    });

    function renderResults(data) {
      const a = data.assessment || {};
      const r = data.reasoning || {};
      const f = data.files || {};
      const recs = Array.isArray(r.recommendations) ? r.recommendations : [];
      results.innerHTML = `
        <div class="tg-result-grid">
          <div class="tg-metric"><span>SEVERITY</span><strong>${escapeHtml(a.severity || "UNKNOWN")}</strong></div>
          <div class="tg-metric"><span>CONFIDENCE</span><strong>${confidence(a.confidence)}</strong></div>
          <div class="tg-metric"><span>IMPACT</span><strong>${escapeHtml(a.impact || "UNKNOWN")}</strong></div>
          <div class="tg-metric"><span>PRIORITY</span><strong>${escapeHtml(r.priority || "UNKNOWN")}</strong></div>
        </div>
        <div class="tg-card"><div class="tg-label">AI SUMMARY</div><p>${escapeHtml(r.summary || "No summary returned.")}</p></div>
        <div class="tg-card"><div class="tg-label">ANALYSIS</div><p>${escapeHtml(r.analysis || "No analysis returned.")}</p></div>
        <div class="tg-card"><div class="tg-label">RECOMMENDATIONS</div>${recs.length ? '<div class="tg-recs">' + recs.map((x,i) => `<div class="tg-rec"><span class="tg-rec-num">${String(i+1).padStart(2,"0")}</span><p>${escapeHtml(x)}</p></div>`).join("") + '</div>' : '<p>No recommendations returned.</p>'}</div>
        ${(f.html_report || f.pdf_report) ? `<div class="tg-card"><div class="tg-label">GENERATED REPORTS</div><div class="tg-links">${f.html_report ? `<a href="${escapeHtml(f.html_report)}" target="_blank" rel="noopener noreferrer">View HTML Report</a>` : ""}${f.pdf_report ? `<a href="${escapeHtml(f.pdf_report)}" target="_blank" rel="noopener noreferrer">Download PDF Report</a>` : ""}</div></div>` : ""}
      `;
      results.style.display = "block";
    }

    runButton.addEventListener("click", async function () {
      clearError();
      if (!selectedFile) {
        error("Please upload a satellite or aerial image first.");
        return;
      }
      const formData = new FormData();
      formData.append("image", selectedFile);
      runButton.disabled = true;
      runButton.textContent = "RUNNING AI...";
      status.textContent = "TerraGuard is analyzing the uploaded image...";
      results.style.display = "none";
      try {
        const response = await fetch(`${API_URL}/api/predict`, { method: "POST", body: formData });
        const text = await response.text();
        if (!response.ok) throw new Error(`GeoGuard API returned ${response.status}: ${text}`);
        let data;
        try { data = JSON.parse(text); } catch (_) { throw new Error("GeoGuard returned invalid JSON."); }
        renderResults(data);
        status.textContent = "TerraGuard assessment completed successfully.";
      } catch (e) {
        console.error("[TerraGuard]", e);
        error(e instanceof Error ? e.message : "Unable to connect to TerraGuard Intelligence.");
        status.textContent = "Assessment failed.";
      } finally {
        runButton.disabled = false;
        runButton.textContent = "RUN AI ASSESSMENT";
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
