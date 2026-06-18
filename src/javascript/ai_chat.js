import { askAI } from "../main.js";
import {updateCodeEditors} from "../javascript/monaco_editor.js";
import {showLoading, hideLoading} from "../javascript/loading.js";

document.querySelector("#chat-ai-button").addEventListener("click", async () => {
    try {
      showLoading();
      const input = document.querySelector("#ai-chat-input");
      addChatMsg(String(input.value), "user");
      input.value = '';
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
      console.log("hi");
      let reply = await askAI(prompt);
      console.log(String(reply));
      if (!reply || !reply.trim().startsWith("{")) {
        console.error("MODEL RESPONSE:", reply);
        throw new Error("Model returned text instead of JSON");
      }
      const code = JSON.parse(reply);

      updateCodeEditors(code);

      addChatMsg(String(code.extra_txt), "ai");
      
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
});

export function addChatMsg(msgContent, origin){ // origin: options: user, ai
  const chatContainer = document.querySelector('#message-container');
  const msg = document.createElement('p');
  msg.textContent = String(msgContent);
  msg.setAttribute('id', `${origin}-message`);
  chatContainer.appendChild(msg);
}

