import { askAI } from "../main.js";
import {updateCodeEditors} from "../javascript/monaco_editor.js";

document
  .querySelector("#chat-ai-button")
  .addEventListener("click", async () => {
    try {
      const input = document.querySelector("#ai-chat-input");
      const prompt = `
          Generate a webpage.
          The users prompt: ${input.value}
          Respond ONLY as JSON:

          {
            "html": "...",
            "css": "...",
            "js": "...",
            "extra txt": "..."
          }
          `;

      let reply = await askAI(prompt);
      reply = reply.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/, "");
      const code = JSON.parse(reply);
      updateCodeEditors(code);
    } catch (err) {
      console.error(err);
    }
  });