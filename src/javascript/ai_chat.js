import { askAI } from "../main.js";
import {updateCodeEditors} from "../javascript/monaco_editor.js";
import {showLoading, hideLoading} from "../javascript/loading.js";

document
  .querySelector("#chat-ai-button")
  .addEventListener("click", async () => {
    try {
      showLoading();
      const input = document.querySelector("#ai-chat-input");
      const prompt = `
      Generate a webpage.

      User prompt:
      ${input.value}

      Return ONLY valid JSON.

      Rules:
      1. No markdown.
      2. No code fences.
      3. Explanations in extra_txt only.
      4. Escape all quotes correctly.
      5. html, css, and js must be valid JSON strings.

      Format:

      {
        "html": "<div>Hello</div>",
        "css": "body { margin: 0; }",
        "js": "console.log('hello');",
        "extra_txt": "Description here"
      }
      `;

      let reply = await askAI(prompt);
      reply = reply.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "");
      const code = JSON.parse(reply);
      updateCodeEditors(code);
      console.log(String(code.extra_txt));
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
  });