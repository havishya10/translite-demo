// server.js
const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload", async (req, res) => {
  try {
    const file = req.files.file;
    const formData = new FormData();
    formData.append("file", fs.createReadStream(file.tempFilePath));

    const response = await axios.post("https://file.io", formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});
