// ============================================================
//  The Unknown Shopper · Guardia de acceso (Firebase Auth)
//  Pega aquí la configuración de tu proyecto Firebase:
//  console.firebase.google.com → Configuración del proyecto → Tu app web
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyAfcsIOKuU9eRwZWhXADANncVMc6xK-WTM",
  authDomain: "nututun.firebaseapp.com",
  projectId: "nututun",
  storageBucket: "nututun.firebasestorage.app",
  messagingSenderId: "766697523081",
  appId: "1:766697523081:web:d9cb12b46ece012d57c358"
};

firebase.initializeApp(firebaseConfig);

// ===== Roles =====
// admin: acceso total · cliente: solo los documentos de CLIENT_PAGES
// Correos nuevos se agregan aquí; los no listados quedan como "cliente" (mínimo privilegio)
const ROLES = {
  "the@unknownshoppers.com": "admin",
  "ale@nututun.com": "cliente"
};
const CLIENT_PAGES = ["panel.html", "propuesta.html", "d1.html", "accesos.html", "llamada.html", "capacidades.html", "d1chklst.html", "informe01.html", "informe01B.html", "informe01C.html", "flujo.html"];

window.TUS_ROLE = u => ROLES[(u && u.email || "").toLowerCase()] || "cliente";

const _file = location.pathname.split("/").pop() || "index.html";

// En páginas protegidas: sin sesión → al login. Con sesión → verificar rol y revelar página.
if (_file !== "index.html") {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) { location.replace("index.html"); return; }
    const role = window.TUS_ROLE(user);
    if (role !== "admin" && !CLIENT_PAGES.includes(_file)) { location.replace("index.html"); return; }
    document.documentElement.style.display = "";
  });
}
