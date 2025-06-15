export default async function handler(req, res) {
  const response = await fetch("https://polibest-docx-generator.onrender.com/generate-docx", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  const blob = await response.blob();
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  blob.arrayBuffer().then(buf => res.end(Buffer.from(buf)));
}