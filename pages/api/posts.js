import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const id = uuidv4();
    const date = new Date().toISOString();
    const filename = `${id}.md`;
    const fileContent = `---
title: "${title}"
date: "${date}"
---

${content}
`;
    const filePath = path.join(process.cwd(), "posts", filename);
    fs.writeFileSync(filePath, fileContent);
    res.status(201).json({ id });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

