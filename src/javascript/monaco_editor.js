import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

export function createEditor(){
    /* Create editor */
    const editor = monaco.editor.create(
    document.getElementById("editor"),
    {
        value: `// Write your code here
    console.log("Hello, Monaco!");`,
        language: "javascript",
        theme: "vs-light",
        automaticLayout: true
    }
    );
}


/* Monaco Worker  */
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (
      label === "javascript" ||
      label === "typescript"
    ) {
      return new tsWorker();
    }

    return new editorWorker();
  }
};
