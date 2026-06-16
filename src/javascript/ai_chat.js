import { askAI } from "../main.js";

document
  .querySelector("#chat-ai-button")
  .addEventListener("click", async () => {
    try {
      const input = document.querySelector("#ai-chat-input");
      const reply = await askAI(input.value);
      console.log(reply);
    } catch (err) {
      console.error(err);
    }
  });