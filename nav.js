// ===== Navbar compartida — filtra enlaces por rol =====
(function(){
  const css = `
    #tusnav{position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:18px;
      background:rgba(255,255,255,.96);border-bottom:1px solid #e6e1d4;padding:10px 22px;
      font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
      backdrop-filter:blur(6px)}
    #tusnav img{height:30px;object-fit:contain}
    #tusnav .nvl{display:flex;gap:4px;flex-wrap:wrap;flex:1}
    #tusnav .nvl a{padding:6px 12px;border-radius:8px;font-size:.8rem;font-weight:600;
      color:#7d766a;text-decoration:none;transition:all .15s}
    #tusnav .nvl a:hover{color:#c0392b;background:#fdf0ee}
    #tusnav .nvl a.on{color:#fff;background:#c0392b}
    #tusnav #nvout{background:transparent;border:1px solid #c9c2ae;color:#7d766a;border-radius:8px;
      padding:6px 14px;font-size:.75rem;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap}
    #tusnav #nvout:hover{border-color:#c0392b;color:#c0392b}
    #tusnav .nvemail{font-size:.75rem;color:#7d766a;white-space:nowrap}
    #tusnav .drop{position:relative}
    #tusnav .drop>span{padding:6px 12px;border-radius:8px;font-size:.8rem;font-weight:600;
      color:#7d766a;cursor:pointer;user-select:none}
    #tusnav .drop:hover>span{color:#c0392b;background:#fdf0ee}
    #tusnav .drop .menu{display:none;position:absolute;top:100%;left:0;min-width:190px;
      background:#fff;border:1px solid #e6e1d4;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.08);
      padding:6px;flex-direction:column;z-index:200}
    #tusnav .drop:hover .menu{display:flex}
    #tusnav .drop .menu a{white-space:nowrap;border-radius:7px}
    @media(max-width:720px){#tusnav{flex-wrap:wrap}#tusnav .nvl a{padding:5px 9px;font-size:.75rem}}
  `;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  const LINKS = [
    ["panel.html","Panel","cliente"],
    ["accesos.html","Accesos","admin"],
    ["d1chklst.html","Checklist D1","cliente"],
    {drop:"Informes", role:"cliente", kids:[
      ["informe01.html","Informe 01 — Auditoría Ads"],
      ["informe01B.html","Informe 01B — Sitio y funnel"],
      ["informe01C.html","Informe 01C — Estado"],
      ["flujo.html","Flujo de reserva"]
    ]},
    ["informeD2.html","Informe D2","cliente"],
    ["llamada.html","Llamada Google","admin"],
    ["index.html","Documentos","admin"]
  ];

  firebase.auth().onAuthStateChanged(u => {
    if (!u) return;
    const role = window.TUS_ROLE ? window.TUS_ROLE(u) : "cliente";
    const file = location.pathname.split("/").pop() || "index.html";
    const bar = document.createElement("nav");
    bar.id = "tusnav";
    bar.innerHTML =
      `<a href="index.html"><img src="tusxx.png" alt="The Unknown Shopper"></a>` +
      `<div class="nvl">` +
      LINKS.filter(l => role === "admin" || l.role === "cliente" || l[2] === "cliente")
          .map(l => l.drop
            ? `<div class="drop"><span>${l.drop} ▾</span><div class="menu">` +
              l.kids.map(k => `<a href="${k[0]}" class="${file === k[0] ? "on" : ""}">${k[1]}</a>`).join("") +
              `</div></div>`
            : `<a href="${l[0]}" class="${file === l[0] ? "on" : ""}">${l[1]}</a>`).join("") +
      `</div><span class="nvemail">${u.email} · ${role}</span><button id="nvout">Salir</button>`;
    document.body.prepend(bar);
    bar.querySelector("#nvout").addEventListener("click", () => {
      firebase.auth().signOut().then(() => location.href = "index.html");
    });
  });
})();
