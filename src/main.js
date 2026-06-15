let txt = document.createElement('h1');
txt.textContent = "TEST!";
document.body.appendChild(txt);

import page from "page";

page("/", () => {
  console.log("Home");
});

page("/dashboard", () => {
  console.log("Dashboard");
});

page();