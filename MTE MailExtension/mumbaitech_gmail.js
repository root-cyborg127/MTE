(() => {
  /******************** CONFIG ********************/
  const BRAND = {
    name: "Mumbai Tech Engineers",
    version: "v1.7",
    accent: "#f4b21b",
    developer: "https://github.com/root-cyborg127",
    uiLogo: chrome.runtime.getURL("logo.png"),
    mailLogo:
      "https://drive.google.com/uc?export=view&id=1fFC67bSA_i6vY9E9XEcMizsqCQHxM9BP"
  };

  const STORAGE_KEY = "mte_custom_templates";

  /******************** HELPERS ********************/
  const qs = q => document.querySelector(q);

  function waitForEditor(cb) {
    const find = () => {
      const editor = [...document.querySelectorAll(
        'div[contenteditable="true"][role="textbox"]'
      )].find(e => e.offsetParent);
      if (editor) cb(editor);
      return !!editor;
    };
    if (!find()) {
      const mo = new MutationObserver(() => find() && mo.disconnect());
      mo.observe(document.body, { childList: true, subtree: true });
    }
  }

  function insertHTML(editor, html) {
    editor.focus();
    document.execCommand("insertHTML", false, html);
  }

  function setSubject(text) {
    const s = qs('input[name="subjectbox"]');
    if (s) s.value = text;
  }

  /******************** EMAIL TEMPLATE BASE ********************/
  const baseTemplate = body => `
<table width="600" cellpadding="0" cellspacing="0"
 style="background:#f9f9f9;border:1px solid #ddd;border-radius:8px">
<tr>
<td align="center" style="padding:30px;background:#ffffff">
<img src="${BRAND.mailLogo}" width="260" style="display:block">
</td>
</tr>
<tr><td style="height:3px;background:${BRAND.accent}"></td></tr>
<tr>
<td style="padding:30px;font-family:Arial,Helvetica,sans-serif;
font-size:15px;color:#333;line-height:24px">
${body}
<br><br>
<b>${BRAND.name}</b><br>
Excavator Parts • Export • Service<br>
Mumbai, India
</td>
</tr>
<tr>
<td align="center" style="padding:12px;font-size:11px;color:#777">
Confidential email intended only for the recipient.
</td>
</tr>
</table>`;

  /******************** BUILT-IN TEMPLATES ********************/
  const BUILTIN = {
    Registration: {
      subject: "Company Registration Documents – Mumbai Tech Engineers",
      html: baseTemplate(`<p>Please find attached the company registration documents.</p>`)
    },
    Quotation: {
      subject: "Quotation – Excavator Parts",
      html: baseTemplate(`<p>Please find attached our quotation.</p>`)
    },
    Invoice: {
      subject: "Invoice – Mumbai Tech Engineers",
      html: baseTemplate(`<p>Please find attached the invoice.</p>`)
    },
    Receipt: {
      subject: "Payment Receipt – Mumbai Tech Engineers",
      html: baseTemplate(`<p>This email confirms receipt of payment.</p>`)
    },
    Service: {
      subject: "Service Report – Excavator",
      html: baseTemplate(`<p>Please find attached the service report.</p>`)
    }
  };

  function loadCustomTemplates() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  }

  function saveCustomTemplate(name, html) {
    const t = loadCustomTemplates();
    t[name] = html;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
  }

  /******************** UI PANEL ********************/
  function createPanel() {
    if (qs("#mte-panel")) return;

    const panel = document.createElement("div");
    panel.id = "mte-panel";
    panel.style.cssText = `
      position:fixed;
      top:120px;
      left:120px;
      width:380px;
      height:520px;
      min-width:320px;
      min-height:420px;
      background:#ffffff;
      border-radius:14px;
      box-shadow:0 15px 40px rgba(0,0,0,.3);
      z-index:999999;
      font-family:Arial,Helvetica,sans-serif;
      display:flex;
      flex-direction:column;
    `;

    panel.innerHTML = `
<div id="mte-header"
 style="cursor:move;padding:10px;border-bottom:1px solid #eee;
 display:flex;align-items:center">
  <img src="${BRAND.uiLogo}" style="height:34px">
  <div style="margin-left:10px">
    <b>${BRAND.name}</b><br>
    <small>${BRAND.version}</small>
  </div>
  <div style="margin-left:auto">
    <button id="mte-theme">🌙</button>
    <button id="mte-close">✖</button>
  </div>
</div>

<div id="mte-body" style="flex:1;overflow:auto;padding:12px">

<label><b>Template</b></label>
<select id="mte-template" style="width:100%;margin:6px 0;padding:6px"></select>

<button id="mte-insert"
 style="width:100%;padding:12px;background:${BRAND.accent};
 border:none;border-radius:10px;font-weight:bold;cursor:pointer;margin-bottom:12px">
Insert Template
</button>

<hr>

<label><b>Template Editor</b></label>
<input id="mte-name" placeholder="Template name"
 style="width:100%;margin:6px 0;padding:6px">

<textarea id="mte-html"
 style="width:100%;height:120px;resize:vertical;
 padding:8px;font-family:monospace;font-size:12px;
 border-radius:6px;border:1px solid #ccc"></textarea>

<div style="display:flex;gap:8px;margin-top:8px">
  <button id="mte-preview" style="flex:1">Preview</button>
  <button id="mte-save" style="flex:1">Save</button>
</div>

<div id="mte-preview-box"
 style="margin-top:10px;border:1px solid #ddd;
 border-radius:8px;padding:10px;height:180px;
 overflow:auto;background:#fafafa">
 <em style="color:#777">Preview will appear here</em>
</div>

<div style="margin-top:10px;font-size:11px;text-align:center;color:#666">
Developed by <a href="${BRAND.developer}" target="_blank">root-cyborg127</a>
</div>
</div>

<div id="mte-resize"
 style="width:14px;height:14px;position:absolute;
 right:6px;bottom:6px;cursor:se-resize;
 background:#ccc;border-radius:3px"></div>
`;

    document.body.appendChild(panel);

    /******** Populate template list ********/
    const sel = qs("#mte-template");
    const refreshList = () => {
      sel.innerHTML = "";
      Object.keys(BUILTIN).forEach(k => sel.append(new Option(k, k)));
      Object.keys(loadCustomTemplates()).forEach(k =>
        sel.append(new Option("🧩 " + k, k))
      );
    };
    refreshList();

    /******** Insert ********/
    qs("#mte-insert").onclick = () => {
      const key = sel.value.replace("🧩 ", "");
      const tpl = BUILTIN[key] || {
        subject: key,
        html: loadCustomTemplates()[key]
      };
      waitForEditor(ed => {
        setSubject(tpl.subject);
        insertHTML(ed, tpl.html);
      });
    };

    /******** Editor ********/
    qs("#mte-preview").onclick = () =>
      qs("#mte-preview-box").innerHTML = qs("#mte-html").value;

    qs("#mte-save").onclick = () => {
      const n = qs("#mte-name").value.trim();
      const h = qs("#mte-html").value.trim();
      if (!n || !h) return alert("Name & HTML required");
      saveCustomTemplate(n, h);
      refreshList();
      alert("Template saved");
    };

    qs("#mte-close").onclick = () => panel.remove();

    /******** Drag ********/
    let drag = false, sx, sy, sl, st;
    const header = qs("#mte-header");

    header.addEventListener("mousedown", e => {
      drag = true;
      sx = e.clientX;
      sy = e.clientY;
      sl = panel.offsetLeft;
      st = panel.offsetTop;
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", e => {
      if (!drag) return;
      panel.style.left = sl + (e.clientX - sx) + "px";
      panel.style.top = st + (e.clientY - sy) + "px";
    });

    document.addEventListener("mouseup", () => {
      drag = false;
      document.body.style.userSelect = "";
    });

    /******** Resize ********/
    let resize = false, rw, rh, rx, ry;
    const resizer = qs("#mte-resize");

    resizer.addEventListener("mousedown", e => {
      resize = true;
      rw = panel.offsetWidth;
      rh = panel.offsetHeight;
      rx = e.clientX;
      ry = e.clientY;
      e.stopPropagation();
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", e => {
      if (!resize) return;
      panel.style.width = Math.max(320, rw + (e.clientX - rx)) + "px";
      panel.style.height = Math.max(420, rh + (e.clientY - ry)) + "px";
    });

    document.addEventListener("mouseup", () => {
      resize = false;
      document.body.style.userSelect = "";
    });

    /******** Theme ********/
    let dark = false;
    qs("#mte-theme").onclick = () => {
      dark = !dark;
      panel.style.background = dark ? "#1e1e1e" : "#ffffff";
      panel.style.color = dark ? "#eaeaea" : "#000000";
    };
  }

  /******************** TOOLBAR BUTTON ********************/
  new MutationObserver(() => {
    const bar = qs('[aria-label="Formatting options"]');
    if (bar && !qs(".mte-btn")) {
      const b = document.createElement("button");
      b.className = "mte-btn";
      b.textContent = "MTE";
      b.style.cssText = `
        margin-left:6px;
        border-radius:6px;
        border:1px solid #ccc;
        padding:4px 8px;
        cursor:pointer;
        font-weight:bold;
      `;
      b.onclick = createPanel;
      bar.appendChild(b);
    }
  }).observe(document.body, { childList: true, subtree: true });

})();
