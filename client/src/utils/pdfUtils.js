import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// PDF worker
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

/**
 * Extracts text from a PDF file
 * @param {File} file - PDF file
 * @returns {Promise<string>} - extracted text
 */
export const extractPDFText = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(" ") + "\n";
    }
    return text;
  } catch (err) {
    console.error("PDF extraction failed:", err);
    return "";
  }
};