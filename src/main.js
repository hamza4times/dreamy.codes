import "./style.css";
import {createEditor} from "./javascript/monaco_editor.js";
import "./javascript/ai_chat.js";

createEditor();

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

/* AI Function */
export async function askAI(prompt) {
  const selectedModel = document.getElementById("model-select").value;
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: selectedModel,
        max_tokens: 512,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Request failed"
    );
  }
  console.log(await response);
  return data.choices[0].message.content;
}