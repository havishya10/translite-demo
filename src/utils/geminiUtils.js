import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyA7zJBYYlZlUCr0Z_GZDyZfBzZRxkNhWpk"; 

const genAI = new GoogleGenerativeAI(apiKey);

function arrayBufferToBase64(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  let binaryString = "";
  uint8Array.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });
  return btoa(binaryString);
}
export async function uploadFileToGemini(
  files,
  sysprompt = "You are a helpful assistant",
  retries = 5,
  delay = 2000
) {
  try {
    const fileParts = [];

    // Convert each file to base64 and add it to the fileParts array
    for (const file of files) {
      const fileBuffer = await file.arrayBuffer();
      const base64Data = arrayBufferToBase64(fileBuffer);

      fileParts.push({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    }


    fileParts.push(sysprompt);

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash-002",
        });
        const result = await model.generateContent(fileParts);
        return result.response.text();
      } catch (error) {
        if (attempt === retries) {
        
          console.warn("Primary model overloaded. Trying fallback model...");
          const fallbackModel = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
          });
          const result = await fallbackModel.generateContent(fileParts);
          return result.response.text();
        }
        console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
        delay *= 2; // Exponential backoff
      }
    }
  } catch (error) {
    console.error("Error uploading files to Gemini:", error);
    throw error;
  }
}
