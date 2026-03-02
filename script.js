const btn = document.getElementById("btn");
const msg = document.getElementById("msg");

btn.addEventListener("click", () => {
  const now = new Date();
  msg.textContent = `Köszönjük! ${now.toLocaleString("hu-HU")} 🚀`;
});
