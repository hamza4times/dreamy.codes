import { getCodeEditors } from "./monaco_editor.js";

const runBtn     = document.getElementById("run-btn");
const container  = document.getElementById("preview-container");
const iframe     = document.getElementById("preview-frame");

runBtn.addEventListener("click", () => {
  const { html, css, js } = getCodeEditors();
  iframe.srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <style>${css}</style></head><body>${html}<script>${js}<\/script>
    </body></html>`;
  iframe.style.display = "block";                    // show iframe
  document.getElementById("preview-placeholder").style.display = "none";
});