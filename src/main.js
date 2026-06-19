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
        max_tokens: 4096,

        response_format: {
          type: "json_object"
        },

        messages: [
          {
            role: "system",
            content:
              `
              You are a website generation assistant.
              Always follow the user's request exactly.
              If existing code is provided, modify that code instead of creating a completely different website unless user prompt states something different.

              Return ONLY valid JSON with:

              {
                "html": "...",
                "css": "...",
                "js": "...",
                "extra_txt": "..."
              }

              Do not include markdown.
              Do not include explanations outside JSON.
              `
          },
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

// TEST

// import Spline from '@splinetool/react-spline/next';

// export default function Home() {
//   return (
//     <main>
//       <Spline
//         scene="https://prod.spline.design/UWMV-l9r-EChJY4k/scene.splinecode" 
//       />
//     </main>
//   );
// }

// Home();
