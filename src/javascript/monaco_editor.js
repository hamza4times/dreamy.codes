import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";


import {htmlCode, javascriptCode, cssCode} from "../firebase/storage.js";

let editor;

/* Monaco Worker  */
self.MonacoEnvironment = {
  getWorker(_, label) {

    if (
      label === "typescript" ||
      label === "javascript"
    ) {
      return new tsWorker();
    }

    if (label === "html") {
      return new htmlWorker();
    }

    if (
      label === "css" ||
      label === "scss" ||
      label === "less"
    ) {
      return new cssWorker();
    }

    return new editorWorker();
  }
};


export function createEditor(language){
    /* Create editor */
    editor = monaco.editor.create(
      document.getElementById("editor"),
      {
        model: htmlModel,
        theme: "vs-light",
        automaticLayout: true
      }
    );
}



const htmlModel = monaco.editor.createModel(htmlCode, "html");

const jsModel = monaco.editor.createModel(javascriptCode, "javascript");

const cssModel = monaco.editor.createModel( cssCode, "css");

export function updateCodeEditors(code){
  htmlModel.setValue(code.html);
  jsModel.setValue(code.js);
  cssModel.setValue(code.css);
}

export function getCodeEditors(){
  let currentCode = {
    "html": htmlModel.getValue(),
    "css": cssModel.getValue(),
    "js": jsModel.getValue()
  }
  return currentCode;
}

document.querySelector("#js-btn").addEventListener("click", () => {
    editor.setModel(jsModel);
  });

document.querySelector("#html-btn").addEventListener("click", () => {
    editor.setModel(htmlModel);
  });

document.querySelector("#css-btn").addEventListener("click", () => {
    editor.setModel(cssModel);
  });