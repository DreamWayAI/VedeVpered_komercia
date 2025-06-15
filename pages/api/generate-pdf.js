export default async function handler(req, res) {
  const response = await fetch("https://polibest-pdf-generator.onrender.com/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  const blob = await response.blob();
  res.setHeader("Content-Type", "application/pdf");
  blob.arrayBuffer().then(buf => res.end(Buffer.from(buf)));
}