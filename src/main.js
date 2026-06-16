import "./style.css";
import {createEditor} from "./javascript/monaco_editor.js";

createEditor();

const OPENROUTER_API_KEY =
  import.meta.env.VITE_OPENROUTER_API_KEY;


/* AI Function */
async function askAI(prompt) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
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

  console.log(data);

  if (!response.ok) {
    throw new Error(
      data.error?.message ||
      "Request failed"
    );
  }

  return data.choices[0].message.content;
}

/* Test */
for (let i = 0; i < 1; i++){
  (async () => {
    try {
      const answer = await askAI(
        "Write me a to-do app!!"
      );

      console.log(answer);
    } catch (err) {
      console.error("AI Error:", err);
    }
  })();
}