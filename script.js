// Mobil menü nyit/zár + aktív link jelölés + demo gomb
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const linkEls = Array.from(navLinks.querySelectorAll("a"));

function setMenu(open) {
  burger.classList.toggle("is-open", open);
  navLinks.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open ? "true" : "false");
  burger.setAttribute("aria-label", open ? "Menü bezárása" : "Menü megnyitása");
}

burger.addEventListener("click", () => {
  const open = !navLinks.classList.contains("is-open");
  setMenu(open);
});

// Kattintásra zárjuk a menüt mobilon
linkEls.forEach(a => {
  a.addEventListener("click", () => setMenu(false));
});

// Kattintás “kívülre” => zár
document.addEventListener("click", (e) => {
  const clickedInside = navLinks.contains(e.target) || burger.contains(e.target);
  if (!clickedInside) setMenu(false);
});

// Aktív link görgetés alapján (IntersectionObserver)
const sections = ["cel", "projektek", "terv", "kapcsolat"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  // azt választjuk aktívnak, ami leginkább látszik
  const visible = entries
    .filter(en => en.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  const id = visible.target.getAttribute("id");
  linkEls.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
  });
}, { threshold: [0.25, 0.5, 0.75] });

sections.forEach(sec => observer.observe(sec));

// Év a footerbe
document.getElementById("year").textContent = new Date().getFullYear();

// Demo “küldés”
document.getElementById("fakeSend").addEventListener("click", () => {
  const hint = document.getElementById("formHint");
  hint.textContent = "✅ Demo: elküldve! (Itt később jöhet igazi backend vagy email szolgáltatás.)";
});