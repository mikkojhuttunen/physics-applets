/*
 * Applet gate (client). Load in <head> of every gated page:
 *   <script src="../assets/js/gate.js" data-id="fys501/laser-rate-equations"></script>
 * Course index page:
 *   <script src="../assets/js/gate.js" data-course="fys501" data-index></script>
 * Parts of a page that open later: add data-gate-section="hw3-3" to the element.
 *
 * Failure policy: whole pages FAIL OPEN (a network problem never locks a student out);
 * data-gate-section parts FAIL CLOSED (they stay hidden until the server says open).
 * While API still holds the PASTE_ placeholder the script does nothing, so it is safe to deploy first.
 */
(function () {
  var API = "https://script.google.com/macros/s/AKfycbxH1sXj0fjxEvpTMNYoD5ywZhO2mY__wKwYXA09BjN7VSpZQoel7WiyjHj0IVstAI1fgw/exec";
  var me = document.currentScript;
  if (!me) return;
  var ID = me.getAttribute("data-id") || "";
  var COURSE = me.getAttribute("data-course") || ID.split("/")[0];
  var INDEX = me.hasAttribute("data-index");
  var KEY = "applet-gate-teacher";
  var de = document.documentElement;

  /* sections stay hidden until opened */
  var st = document.createElement("style");
  st.textContent = "[data-gate-section]:not(.gate-open){display:none!important}" +
    ".gate-pending{visibility:hidden}" +
    ".gate-lock{opacity:.55}.gate-badge{font-size:.8em;margin-left:.5em;opacity:.8}" +
    ".gate-teacher{position:fixed;right:8px;bottom:8px;z-index:99999;background:#222;color:#fff;font:12px system-ui,sans-serif;padding:4px 8px;border-radius:6px;opacity:.85}" +
    ".gate-closed{max-width:560px;margin:18vh auto;padding:0 20px;font:16px/1.5 system-ui,sans-serif;text-align:center}";
  document.head.appendChild(st);
  if (!INDEX) de.classList.add("gate-pending");
  var failsafe = setTimeout(function () { de.classList.remove("gate-pending"); }, 4000);

  var token = "";
  try {
    var q = new URLSearchParams(location.search), t = q.get("teacher");
    if (t === "off") localStorage.removeItem(KEY);
    else if (t) localStorage.setItem(KEY, t);
    if (t) { q.delete("teacher"); var s = q.toString(); history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash); }
    token = localStorage.getItem(KEY) || "";
  } catch (e) {}

  var fi = /^fi/i.test((new URLSearchParams(location.search).get("lang")) || navigator.language || "");
  function fmt(ms) { return new Date(ms).toLocaleDateString("fi-FI", { day: "numeric", month: "numeric", timeZone: "Europe/Helsinki" }); }
  function ready(fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }

  function fetchGates() {
    if (!API || API.indexOf("PASTE_") === 0) return Promise.reject(new Error("cfg"));
    var url = API + (API.indexOf("?") < 0 ? "?" : "&") + "a=gates&course=" + encodeURIComponent(COURSE) +
      (token ? "&t=" + encodeURIComponent(token) : "") + "&_=" + Date.now();
    return fetch(url, { cache: "no-store" }).then(function (r) { if (!r.ok) throw new Error("http"); return r.json(); })
      .then(function (j) { if (!j.ok) throw new Error("bad"); return j; });
  }

  function applySections(j) {
    var els = document.querySelectorAll("[data-gate-section]"), anyClosed = false;
    for (var i = 0; i < els.length; i++) {
      var g = j.gates[ID + "#" + els[i].getAttribute("data-gate-section")];
      if (!g) { els[i].classList.add("gate-open"); continue; }      /* no rule = not gated */
      if (g.open) els[i].classList.add("gate-open"); else { els[i].classList.remove("gate-open"); anyClosed = true; }
    }
    return anyClosed;
  }

  function showClosed(j, g) {
    window.stop && window.stop();
    clearTimeout(failsafe);
    var m = (fi ? j.msg.fi : j.msg.en) || "";
    var next = g.opens ? "<p><b>" + (fi ? "Avautuu " : "Opens ") + fmt(g.opens) + "</b></p>" : "";
    document.body.innerHTML = '<div class="gate-closed"><h2>' + (fi ? "Ei auki vielä" : "Not open yet") + "</h2><p></p>" + next + "</div>";
    document.body.querySelector("p").textContent = m;
    de.classList.remove("gate-pending");
  }

  function teacherBanner(j, g) {
    if (!j.teacher) return;
    var d = document.createElement("div"); d.className = "gate-teacher";
    d.textContent = "Teacher view" + (g && g.opens ? " · students: opens " + fmt(g.opens) : "");
    document.body.appendChild(d);
  }

  function pageMode(j) {
    var g = j.gates[ID] || { open: true };
    ready(function () {
      if (!g.open) { showClosed(j, g); setTimeout(function () { poll(true); }, 30000); return; }
      var anyClosed = applySections(j);
      teacherBanner(j, g);
      clearTimeout(failsafe); de.classList.remove("gate-pending");
      if (anyClosed) setTimeout(function () { poll(false); }, 60000);
    });
  }

  function poll(reloadWhenOpen) {
    if (document.visibilityState === "hidden") { setTimeout(function () { poll(reloadWhenOpen); }, 30000); return; }
    fetchGates().then(function (j) {
      var g = j.gates[ID] || { open: true };
      if (reloadWhenOpen) { if (g.open) location.reload(); else setTimeout(function () { poll(true); }, 30000); }
      else if (applySections(j)) setTimeout(function () { poll(false); }, 60000);
    }).catch(function () { setTimeout(function () { poll(reloadWhenOpen); }, 60000); });
  }

  function indexMode(j) {
    ready(function () {
      var as = document.querySelectorAll("a[href$='.html']");
      for (var i = 0; i < as.length; i++) {
        var base = as[i].getAttribute("href").split("/").pop().replace(/\.html$/, "");
        var g = j.gates[COURSE + "/" + base];
        if (!g || (g.open && !g.opens)) continue;
        var b = document.createElement("span"); b.className = "gate-badge";
        if (!g.open) {
          b.textContent = g.opens ? (fi ? "🔒 avautuu " : "🔒 opens ") + fmt(g.opens) : "🔒";
          as[i].classList.add("gate-lock");
          as[i].addEventListener("click", function (ev) { ev.preventDefault(); });
        } else b.textContent = "(students: opens " + fmt(g.opens) + ")";
        as[i].parentNode.insertBefore(b, as[i].nextSibling);
      }
      teacherBanner(j);
    });
  }

  fetchGates().then(function (j) { INDEX ? indexMode(j) : pageMode(j); })
    .catch(function () { clearTimeout(failsafe); de.classList.remove("gate-pending"); });
})();
