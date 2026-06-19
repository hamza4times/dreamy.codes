import JSZip from 'jszip';
import {getCodeEditors} from './monaco_editor.js';

export async function downloadProjectZip(html, css, js, name) {
  const zip = new JSZip();

  // 1. Define file contents
  const htmlContent = String(html);

  const cssContent = String(css);

  const jsContent = String(js);

  // 2. Add files to the ZIP
  zip.file("index.html", htmlContent);
  zip.file("style.css", cssContent);
  zip.file("script.js", jsContent);

  // 3. Generate the ZIP blob
  const zipBlob = await zip.generateAsync({ type: "blob" });

  // 4. Trigger download using standard browser APIs
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${String(name)}.zip`;
  
  document.body.appendChild(link);
  link.click();
  
  // 5. Clean up memory
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


document.querySelector('#upload-btn').addEventListener('click', () => {
    let code = getCodeEditors();
    downloadProjectZip(code.html, code.css, code.js, promptName());
});

function promptName(){
    return "untitled";
}
