import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import fs from "fs";
import path from "path";
import os from "os";

export const generatePdfSummaryWithLangChain = async (
  fileUrl: string
) => {
  const res = await fetch(fileUrl);
  const buffer = Buffer.from(await res.arrayBuffer());

  // write temp file
  const tempPath = path.join(os.tmpdir(), `pdf-${Date.now()}.pdf`);
  fs.writeFileSync(tempPath, buffer);

  // load pdf
  const loader = new PDFLoader(tempPath);
  const docs = await loader.load();

  // cleanup
  fs.unlinkSync(tempPath);

  return docs.map(d => d.pageContent).join("\n");
};
