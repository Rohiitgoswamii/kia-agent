// Kia chat widget — add: <script src="kia-widget.js" data-endpoint="https://YOUR-APP.vercel.app/api/kia" defer></script>
(() => {
  const ENDPOINT = document.currentScript.dataset.endpoint;
  const css = `
  :root{--kia-bg:#0D0F14;--kia-card:#1A1E28;--kia-accent:#F5A623;--kia-text:#E8EAF0}
  #kia-btn{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;border:0;background:var(--kia-accent);color:#0D0F14;font-size:24px;cursor:pointer;z-index:10000;box-shadow:0 8px 30px #F5A62340}
  #kia-box{position:fixed;right:20px;bottom:90px;width:340px;max-width:calc(100vw - 40px);height:460px;background:var(--kia-bg);color:var(--kia-text);border:1px solid #ffffff1f;border-radius:16px;display:none;flex-direction:column;z-index:10000;font:13px/1.6 "JetBrains Mono",monospace;overflow:hidden}
  #kia-box.open{display:flex}
  #kia-head{padding:12px 16px;border-bottom:1px solid #ffffff1a;font-weight:600}
  #kia-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
  .kia-m{padding:8px 12px;border-radius:12px;max-width:85%;white-space:pre-wrap}
  .kia-b{background:var(--kia-card);align-self:flex-start}.kia-u{background:var(--kia-accent);color:#0D0F14;align-self:flex-end}
  #kia-chips{display:flex;gap:6px;flex-wrap:wrap;padding:0 12px 8px}
  #kia-chips button{background:none;border:1px solid #ffffff33;color:var(--kia-text);border-radius:99px;padding:4px 10px;font-size:12px;cursor:pointer}
  #kia-form{display:flex;border-top:1px solid #ffffff1a}
  #kia-in{flex:1;min-width:0;background:transparent!important;border:0!important;color:#E8EAF0!important;caret-color:#F5A623;font:inherit!important;padding:12px;outline:none!important;cursor:text!important;pointer-events:auto!important;user-select:text!important;-webkit-user-select:text!important}#kia-in::placeholder{color:#8b93a1}#kia-box,#kia-box *{cursor:auto}#kia-btn,#kia-send,#kia-chips button{cursor:pointer!important}
  #kia-send{background:none;border:0;color:var(--kia-accent);padding:0 14px;cursor:pointer;font-size:18px}`;
  document.head.append(Object.assign(document.createElement("style"), { textContent: css }));
  document.body.insertAdjacentHTML("beforeend", `
    <button id="kia-btn" aria-label="Chat with Kia">✦</button>
    <div id="kia-box"><div id="kia-head">Kia · ask me anything about Rohit</div>
      <div id="kia-msgs"></div>
      <div id="kia-chips"></div>
      <div id="kia-form"><input id="kia-in" type="text" autocomplete="off" placeholder="Ask about projects, skills, hiring…"><button id="kia-send">➤</button></div></div>`);
  const $ = (id) => document.getElementById(id), msgs = $("kia-msgs"), hist = [];
  const add = (t, who) => { const d = document.createElement("div"); d.className = "kia-m " + (who === "u" ? "kia-u" : "kia-b"); d.textContent = t; msgs.append(d); msgs.scrollTop = 1e9; return d; };
  add("Hey, I'm Kia ✦ I know Rohit's projects, stack and story. What're you curious about?");
  ["What has Rohit built?", "Is he open to work?", "Tech stack?"].forEach(q => {
    const b = document.createElement("button"); b.textContent = q; b.onclick = () => send(q); $("kia-chips").append(b); });
  async function send(text) {
    text = (text || $("kia-in").value).trim(); if (!text) return;
    $("kia-in").value = ""; $("kia-chips")?.remove(); add(text, "u"); hist.push({ role: "user", content: text });
    const t = add("…", "b");
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: hist }) });
      const d = await r.json().catch(() => ({})); const reply = d.reply || "Kia hit a snag (server " + r.status + "). Try again in a bit."; t.textContent = reply; if (d.reply) hist.push({ role: "assistant", content: reply }); else hist.pop();
    } catch (err) { console.error("Kia fetch failed:", err); hist.pop(); t.textContent = "Can't reach my brain right now 😵 Try again?"; }
  }
  $("kia-btn").onclick = () => $("kia-box").classList.toggle("open");
  $("kia-send").onclick = () => send();
  $("kia-in").addEventListener("keydown", (e) => { e.stopPropagation(); if (e.key === "Enter") { e.preventDefault(); send(); } });
})();
