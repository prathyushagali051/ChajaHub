const quotes = [
  "💜 RM: Believe in yourself",
  "💜 Jin: Don't give up",
  "💜 Suga: Dreams come true",
  "💜 J-Hope: Keep going",
  "💜 Jimin: Stay strong",
  "💜 V: Love yourself",
  "💜 Jungkook: Hard work pays off",
  "💜 BTS: You are amazing",
  "💜 BTS: Keep shining",
  "💜 BTS: You can do it!"
];

// show motivation
document.getElementById("motivation").innerHTML =
  quotes.map(q => `<p>${q}</p>`).join("");

// SAVE
function saveData() {
  const days = ["mon","tue","wed","thu","fri","sat","sun"];

  days.forEach(day => {
    localStorage.setItem(day, document.getElementById(day).value);
  });

  localStorage.setItem("dream",
    document.getElementById("dream").value);

  alert("💜 Saved!");
}

// LOAD
window.onload = () => {
  const days = ["mon","tue","wed","thu","fri","sat","sun"];

  days.forEach(day => {
    document.getElementById(day).value =
      localStorage.getItem(day) || "";
  });

  document.getElementById("dream").value =
    localStorage.getItem("dream") || "";
};