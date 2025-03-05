// // gemini.js

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";

// const apiKey = "AIzaSyA7zJBYYlZlUCr0Z_GZDyZfBzZRxkNhWpk"; // Ensure you have this environment variable set
// const genAI = new GoogleGenerativeAI(apiKey);

// const fileManager = new GoogleAIFileManager(apiKey);

// /**
//  * Uploads the given file to Gemini.
//  * @param {File} file - The file to upload.
//  * @param {string} mimeType - The MIME type of the file.
//  * @returns {Promise<Object>} - The uploaded file object.
//  */
// async function uploadToGemini(file, mimeType) {
//   const uploadResult = await fileManager.uploadFile(file.path, {
//     mimeType,
//     displayName: file.name,
//   });
//   const uploadedFile = uploadResult.file;
//   console.log(
//     `Uploaded file ${uploadedFile.displayName} as: ${uploadedFile.name}`
//   );
//   return uploadedFile;
// }

// /**
//  * Waits for the given files to be active.
//  * @param {Array<Object>} files - The files to wait for.
//  * @returns {Promise<void>}
//  */
// async function waitForFilesActive(files) {
//   console.log("Waiting for file processing...");
//   for (const name of files.map((file) => file.name)) {
//     let file = await fileManager.getFile(name);
//     while (file.state === "PROCESSING") {
//       process.stdout.write(".");
//       await new Promise((resolve) => setTimeout(resolve, 10_000));
//       file = await fileManager.getFile(name);
//     }
//     if (file.state !== "ACTIVE") {
//       throw Error(`File ${file.name} failed to process`);
//     }
//   }
//   console.log("...all files ready\n");
// }

// /**
//  * Initializes the Gemini model and starts a chat session.
//  * @param {Array<Object>} files - The files to be used in the chat session.
//  * @returns {Promise<Object>} - The chat session object.
//  */
// async function initializeGeminiModel(files) {
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//     systemInstruction:
//       "You are an advanced AI assistant tasked with generating detailed, context-aware, and well-structured answers to questions based on provided documents. Your goal is to provide clear, engaging, and balanced explanations that are easy to understand while retaining key terminologies and ensuring accuracy.",
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };

//   await waitForFilesActive(files);

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: files.map((file) => ({
//           fileData: {
//             mimeType: file.mimeType,
//             fileUri: file.uri,
//           },
//         })),
//       },
//       {
//         role: "model",
//         parts: [
//           {
//             text: "Okay, I'm ready. Please provide the questions and I will answer them to the best of my ability using the content from the documents you've provided.",
//           },
//         ],
//       },
//     ],
//   });

//   return chatSession;
// }

// /**
//  * Sends a message to the Gemini chat session.
//  * @param {Object} chatSession - The chat session object.
//  * @param {string} message - The message to send.
//  * @returns {Promise<string>} - The response from Gemini.
//  */
// async function sendMessageToGemini(chatSession, message) {
//   const result = await chatSession.sendMessage(message);
//   return result.response.text();
// }

// export { uploadToGemini, initializeGeminiModel, sendMessageToGemini };
//        --------------------------------------------------
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini
// const apiKey = "AIzaSyA7zJBYYlZlUCr0Z_GZDyZfBzZRxkNhWpk"; // Ensure this is set in your environment
// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// /**
//  * Uploads a file to Gemini and returns the response.
//  * @param {File} file - The file to upload (e.g., PDF, DOCX).
//  * @returns {Promise<string>} - The response from Gemini.
//  */

// function arrayBufferToBase64(arrayBuffer) {
//   const uint8Array = new Uint8Array(arrayBuffer);
//   let binaryString = "";
//   uint8Array.forEach((byte) => {
//     binaryString += String.fromCharCode(byte);
//   });
//   return btoa(binaryString); // Use btoa to encode to base64
// }

// /**
//  * Uploads a file to Gemini and returns the response.
//  * @param {File} file - The file to upload (e.g., PDF, DOCX).
//  * @returns {Promise<string>} - The response from Gemini.
//  */
// export async function uploadFileToGemini(
//   file,
//   sysprompt = "you are a helpful assistant"
// ) {
//   try {
//     const fileBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer
//     const base64Data = arrayBufferToBase64(fileBuffer); // Convert to base64

//     const result = await model.generateContent([
//       {
//         inlineData: {
//           data: base64Data,
//           mimeType: file.type, // e.g., "application/pdf"
//         },
//       },
//       sysprompt,
//     ]);

//     return result.response.json();
//   } catch (error) {
//     console.error("Error uploading file to Gemini:", error);
//     throw error;
//   }
// }
//                ----------------------------------------------
// export async function extractQuestionsFromFile(file) {
//   try {
//     const fileBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer
//     const base64Data = arrayBufferToBase64(fileBuffer); // Convert to base64

//     const result = await model.generateContent([
//       {
//         inlineData: {
//           data: base64Data,
//           mimeType: file.type, // e.g., "application/pdf"
//         },
//       },
//       "Extract all the questions from this document.",
//     ]);

//     // Parse the response into an array of questions
//     const questions = JSON.parse(result.response.text());
//     return questions;
//   } catch (error) {
//     console.error("Error extracting questions:", error);
//     throw error;
//   }
// }

/// working code - final cut

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini
// const apiKey = "AIzaSyA7zJBYYlZlUCr0Z_GZDyZfBzZRxkNhWpk"; // Replace with your API key
// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

// /**
//  * Converts an ArrayBuffer to a base64 string (browser-compatible).
//  * @param {ArrayBuffer} arrayBuffer - The binary data to convert.
//  * @returns {string} - The base64-encoded string.
//  */
// function arrayBufferToBase64(arrayBuffer) {
//   const uint8Array = new Uint8Array(arrayBuffer);
//   let binaryString = "";
//   uint8Array.forEach((byte) => {
//     binaryString += String.fromCharCode(byte);
//   });
//   return btoa(binaryString); // Use btoa to encode to base64
// }

// /**
//  * Uploads a file to Gemini and returns the response.
//  * @param {File} file - The file to upload (e.g., PDF, DOCX).
//  * @param {string} sysprompt - The system prompt for Gemini.
//  * @returns {Promise<string>} - The response from Gemini.
//  */
// export async function uploadFileToGemini(
//   file,
//   sysprompt = "You are a helpful assistant"
// ) {
//   try {
//     const fileBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer
//     const base64Data = arrayBufferToBase64(fileBuffer); // Convert to base64

//     const result = await model.generateContent([
//       {
//         inlineData: {
//           data: base64Data,
//           mimeType: file.type, // e.g., "application/pdf"
//         },
//       },
//       sysprompt,
//     ]);

//     // Access the text directly from result.response
//     return result.response.text();
//   } catch (error) {
//     console.error("Error uploading file to Gemini:", error);
//     throw error;
//   }
// }

// CORRECTLY WORKING CODE

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = "AIzaSyA7zJBYYlZlUCr0Z_GZDyZfBzZRxkNhWpk"; // Replace with your API key
// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

// /**
//  * Converts an ArrayBuffer to a base64 string (browser-compatible).
//  * @param {ArrayBuffer} arrayBuffer - The binary data to convert.
//  * @returns {string} - The base64-encoded string.
//  */
// function arrayBufferToBase64(arrayBuffer) {
//   const uint8Array = new Uint8Array(arrayBuffer);
//   let binaryString = "";
//   uint8Array.forEach((byte) => {
//     binaryString += String.fromCharCode(byte);
//   });
//   return btoa(binaryString); // Use btoa to encode to base64
// }

// export async function uploadFileToGemini(
//   files,
//   sysprompt = "You are a helpful assistant"
// ) {
//   try {
//     const results = [];
//     for (const file of files) {
//       const fileBuffer = await file.arrayBuffer();
//       const base64Data = arrayBufferToBase64(fileBuffer);

//       const result = await model.generateContent([
//         {
//           inlineData: {
//             data: base64Data,
//             mimeType: file.type,
//           },
//         },
//         sysprompt,
//       ]);

//       results.push(result.response.text());
//     }
//     return results.join("\n");
//   } catch (error) {
//     console.error("Error uploading file to Gemini:", error);
//     throw error;
//   }
// }

// TEST DEMO CODE - 1

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = "AIzaSyA7zJBYYlZlUCr0Z_GZDyZfBzZRxkNhWpk"; // Replace with your API key
// const genAI = new GoogleGenerativeAI(apiKey);

// /**
//  * Converts an ArrayBuffer to a base64 string (browser-compatible).
//  */
// function arrayBufferToBase64(arrayBuffer) {
//   const uint8Array = new Uint8Array(arrayBuffer);
//   let binaryString = "";
//   uint8Array.forEach((byte) => {
//     binaryString += String.fromCharCode(byte);
//   });
//   return btoa(binaryString);
// }

// /**
//  * Uploads multiple files to Gemini and returns the response.
//  * @param {File[]} files - Array of files to upload.
//  * @param {string} sysprompt - System prompt for Gemini.
//  * @param {number} retries - Number of retry attempts.
//  * @param {number} delay - Delay between retries in milliseconds.
//  * @returns {Promise<string>} - Response from Gemini.
//  */
// export async function uploadFileToGemini(
//   files,
//   sysprompt = "You are a helpful assistant",
//   retries = 3,
//   delay = 2000
// ) {
//   try {
//     const fileParts = [];

//     // Convert each file to base64 and add it to the fileParts array
//     for (const file of files) {
//       const fileBuffer = await file.arrayBuffer();
//       const base64Data = arrayBufferToBase64(fileBuffer);

//       fileParts.push({
//         inlineData: {
//           data: base64Data,
//           mimeType: file.type,
//         },
//       });
//     }

//     // Add the system prompt as a text part
//     fileParts.push(sysprompt);

//     // Retry mechanism
//     for (let attempt = 1; attempt <= retries; attempt++) {
//       try {
//         const result = await genAI
//           .getGenerativeModel({ model: "gemini-1.5-flash-002" })
//           .generateContent(fileParts);
//         return result.response.text();
//       } catch (error) {
//         if (attempt === retries) throw error; // Throw error if all retries fail
//         console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
//         await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
//       }
//     }
//   } catch (error) {
//     console.error("Error uploading files to Gemini:", error);
//     throw error;
//   }
// }

// test demo code - 2

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyA7zJBYYlZlUCr0Z_GZDyZfBzZRxkNhWpk"; // Replace with your API key

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Converts an ArrayBuffer to a base64 string (browser-compatible).
 */
function arrayBufferToBase64(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  let binaryString = "";
  uint8Array.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });
  return btoa(binaryString);
}

/**
 * Uploads multiple files to Gemini and returns the response.
 * @param {File[]} files - Array of files to upload.
 * @param {string} sysprompt - System prompt for Gemini.
 * @param {number} retries - Number of retry attempts.
 * @param {number} delay - Initial delay between retries in milliseconds.
 * @returns {Promise<string>} - Response from Gemini.
 */
export async function uploadFileToGemini(
  files,
  sysprompt = "You are a helpful assistant",
  retries = 3,
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

    // Add the system prompt as a text part
    fileParts.push(sysprompt);

    // Retry mechanism with exponential backoff
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Try the primary model first
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
        const result = await model.generateContent(fileParts);
        return result.response.text();
      } catch (error) {
        if (attempt === retries) {
          // If all retries fail, try the fallback model
          console.warn("Primary model overloaded. Trying fallback model...");
          const fallbackModel = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-002",
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
