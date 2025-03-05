// utils/fileIoUtils.js
export async function uploadFileToFileIo(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file to file.io");
  }

  const data = await response.json();
  return data.link; // Public URL of the uploaded file
}
