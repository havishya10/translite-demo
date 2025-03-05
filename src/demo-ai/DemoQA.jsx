// import React from "react";
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";

// export function DemoQA({ documents = [], questions = [] }) {
//   const apiKey = "AIzaSyA7zJBYYlZlUCr0Z_GZDyZfBzZRxkNhWpk";
//   const genAI = new GoogleGenerativeAI(apiKey);
//   const fileManager = new GoogleAIFileManager(apiKey);

//   async function uploadToGemini(file) {
//     const uploadResult = await fileManager.uploadFile(file.path, {
//       mimeType: file.type,
//       displayName: file.name,
//     });
//     const uploadedFile = uploadResult.file;
//     console.log(
//       `Uploaded file ${uploadedFile.displayName} as: ${uploadedFile.name}`
//     );
//     return uploadedFile;
//   }

//   async function waitForFilesActive(files) {
//     console.log("Waiting for file processing...");
//     for (const name of files.map((file) => file.name)) {
//       let file = await fileManager.getFile(name);
//       while (file.state === "PROCESSING") {
//         process.stdout.write(".");
//         await new Promise((resolve) => setTimeout(resolve, 10_000));
//         file = await fileManager.getFile(name);
//       }
//       if (file.state !== "ACTIVE") {
//         throw Error(`File ${file.name} failed to process`);
//       }
//     }
//     console.log("...all files ready\n");
//   }

//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//     systemInstruction: `You are an advanced AI assistant tasked with generating detailed, context-aware, and well-structured answers to questions based on provided documents. Your goal is to provide clear, engaging, and balanced explanations that are easy to understand while retaining key terminologies and ensuring accuracy. Follow these guidelines strictly:

// Understand the Question
// Carefully analyze the question to identify its core intent and requirements.

// Break down complex questions into sub-components if necessary.

// Context-Aware Answers
// Base your answers entirely on the content of the provided document.

// Use the document’s terminology, tone, and context to craft accurate and relevant responses.

// Avoid overly generalized answers—stay specific and on-point.

// Structure and Format
// Organize your answers into three main sections for clarity and readability:

// A. Introduction (10-15% of the answer)
// Briefly introduce the topic and its relevance.

// B. Main Body (70-80% of the answer)
// Break the answer into 2-3 key subsections, each focusing on a specific aspect of the topic.

// Use subheadings (e.g., "1. Key Concepts," "2. Applications," "3. Challenges") to organize the content.

// Include examples, analogies, and real-world applications to make the explanation relatable, if present in the document, if not give simple example

// Use bullet points or numbered lists for clarity when listing items or steps.

// If applicable, leave placeholders for visual aids (e.g., diagrams, tables, flowcharts) to enhance understanding.

// Example: "Refer to Figure 1 for a diagram illustrating the key components of X. [Placeholder: Diagram showing A, B, and C with labels.]"

// C. Conclusion (10-15% of the answer)
// Summarize the key points discussed in the answer.

// Length and Depth
// Provide sufficiently lengthy answers that cover the topic in depth without being overly verbose.

// Avoid unnecessary fluff or repetition—every sentence should add value.

// Key Terminologies
// Retain and explain key terminologies from the document.

// Define technical terms in simple language where necessary to ensure understanding.

// Handling Unanswerable Questions
// If a question cannot be directly answered using the document, analyze the question and provide a contextually relevant response that aligns with the document’s scope.

// If the question is absolutely irrelevant, respond with:
// "The content required to answer this question is not present in the provided document."

// Tone and Style
// Use a professional yet conversational tone to make the answers engaging and easy to understand.

// Avoid overly complex language—explain concepts in simple terms without compromising accuracy.

// Examples and Analogies
// Use real-world examples and analogies to illustrate complex concepts.

// Ensure examples are relevant and enhance understanding.

// Avoid Generalizations
// Ensure all answers are specific, contextually aware, and directly tied to the document’s content.

// Do not provide generic or overly broad responses.

// Code Formatting
// When including code snippets, ensure they are properly formatted and easy to read.

// Use code blocks with clear syntax highlighting (if applicable) and proper indentation.

// Provide brief comments within the code to explain key steps or logic.

// Example:

// python
// Copy

// Example: Binary Classification Model

// from tensorflow.keras import Sequential
// from tensorflow.keras.layers import Dense

// Define the model

// model = Sequential([
// Dense(64, activation='relu', input_shape=(10,)),  # Hidden layer with 64 units
// Dense(1, activation='sigmoid')  # Output layer for binary classification
// ])

// Compile the model

// model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
// 11. Final Check
// Review the answer to ensure it adheres to the above guidelines.

// Ensure the answer is well-structured, detailed, and easy to follow.

// Output Format
// Question: [Exact question from the question document]

// Answer:

// Introduction:
// [Brief introduction to the topic and its relevance.]

// Main Body:

// [Subheading 1: Key Concepts]

// [Detailed explanation with examples.]

// [Placeholder for visual aid if applicable.]

// [Subheading 2: Applications or Examples]

// [Further details or related concepts.]

// [Placeholder for visual aid if applicable.]

// [Subheading 3: Challenges or Limitations]

// [Address challenges, limitations, or controversies.]

// Conclusion:
// [Summary of key points and final takeaway.]

// Example Output Using the Revised System Prompt
// Question: Inspect the implementation of binary classification.

// Answer:

// Introduction:
// Binary classification is a fundamental task in machine learning where the goal is to classify data into one of two possible categories. This answer will walk through the implementation of a binary classification model using a deep learning framework like TensorFlow or PyTorch.

// Main Body:

// Model Architecture
// A binary classification model typically consists of:

// An input layer that receives the feature data.

// One or more hidden layers with activation functions like ReLU.

// An output layer with a sigmoid activation function to produce probabilities.

// Here’s an example implementation in TensorFlow:

// python
// Copy

// Import necessary libraries

// from tensorflow.keras import Sequential
// from tensorflow.keras.layers import Dense

// Define the model

// model = Sequential([
// Dense(64, activation='relu', input_shape=(10,)),  # Hidden layer with 64 units
// Dense(1, activation='sigmoid')  # Output layer for binary classification
// ])

// Compile the model

// model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
// Training the Model

// The model is trained using a labeled dataset, where the input features are mapped to binary labels (0 or 1).

// The binary cross-entropy loss function is used to measure the difference between predicted and actual labels.

// The Adam optimizer is commonly used to update the model’s weights during training.

// Evaluation

// After training, the model’s performance is evaluated on a test dataset using metrics like accuracy, precision, and recall.

// Example evaluation code:

// python
// Copy

// Evaluate the model

// test_loss, test_accuracy = model.evaluate(x_test, y_test)
// print(f"Test Accuracy: {test_accuracy:.2f}")
// Conclusion:
// In conclusion, binary classification is a foundational task in machine learning, and its implementation involves defining a model architecture, training it on labeled data, and evaluating its performance. The example provided demonstrates how to implement a binary classification model using TensorFlow, highlighting key steps like model compilation and evaluation.`,
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };

//   async function run() {
//     const uploadedFiles = await Promise.all(
//       documents.map((file) => uploadToGemini(file))
//     );
//     await waitForFilesActive(uploadedFiles);

//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             ...uploadedFiles.map((file) => ({
//               fileData: {
//                 mimeType: file.mimeType,
//                 fileUri: file.uri,
//               },
//             })),
//             {
//               text: "The above are the documents that you need to answer from. Now I will give you the questions document.",
//             },
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {
//               text: "Okay, I'm ready. Please provide the questions document. I will do my best to extract the questions and answer them using the content from the documents you've already provided.",
//             },
//           ],
//         },
//         {
//           role: "user",
//           parts: [{ text: questions.join("\n") }],
//         },
//       ],
//     });

//     const result = await chatSession.sendMessage(
//       "Please answer the questions based on the provided documents."
//     );
//     document.getElementById("demo-p").innerText = result.response.text();
//   }

//   React.useEffect(() => {
//     console.log("Documents:", documents);
//     console.log("Questions:", questions);

//     if (documents.length > 0 && questions.length > 0) {
//       run();
//     }
//   }, [documents, questions]);

//   return (
//     <>
//       <p id="demo-p">This is the demo of AI implementation of DocumentQA</p>
//     </>
//   );
// }

// PREV WORKING CODE

// import React from "react";
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";
// import { GoogleAIFileManager } from "@google/generative-ai/server";

// export function DemoQA({ documents = [], questions = [] }) {
//   const apiKey = "AIzaSyA7zJBYYlZlUCr0Z_GZDyZfBzZRxkNhWpk";
//   const genAI = new GoogleGenerativeAI(apiKey);
//   const fileManager = new GoogleAIFileManager(apiKey);

//   async function uploadToGemini(file) {
//     const uploadResult = await fileManager.uploadFile(file.path, {
//       mimeType: file.type,
//       displayName: file.name,
//     });
//     const uploadedFile = uploadResult.file;
//     console.log(
//       `Uploaded file ${uploadedFile.displayName} as: ${uploadedFile.name}`
//     );
//     return uploadedFile;
//   }

//   async function waitForFilesActive(files) {
//     console.log("Waiting for file processing...");
//     for (const name of files.map((file) => file.name)) {
//       let file = await fileManager.getFile(name);
//       while (file.state === "PROCESSING") {
//         process.stdout.write(".");
//         await new Promise((resolve) => setTimeout(resolve, 10_000));
//         file = await fileManager.getFile(name);
//       }
//       if (file.state !== "ACTIVE") {
//         throw Error(`File ${file.name} failed to process`);
//       }
//     }
//     console.log("...all files ready\n");
//   }

//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//     systemInstruction:
//       "You are an advanced AI assistant tasked with generating detailed, context-aware, and well-structured answers to questions based on provided documents.",
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };

//   async function run() {
//     const uploadedFiles = await Promise.all(
//       documents.map((file) => uploadToGemini(file))
//     );
//     await waitForFilesActive(uploadedFiles);

//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             ...uploadedFiles.map((file) => ({
//               fileData: {
//                 mimeType: file.mimeType,
//                 fileUri: file.uri,
//               },
//             })),
//             {
//               text: "The above are the documents that you need to answer from. Now I will give you the questions document.",
//             },
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {
//               text: "Okay, I'm ready. Please provide the questions document. I will do my best to extract the questions and answer them using the content from the documents you've already provided.",
//             },
//           ],
//         },
//         {
//           role: "user",
//           parts: [{ text: questions.join("\n") }],
//         },
//       ],
//     });

//     const result = await chatSession.sendMessage(
//       "Please answer the questions based on the provided documents."
//     );
//     console.log(result.response.text());
//   }

//   React.useEffect(() => {
//     console.log("Documents:", documents);
//     console.log("Questions:", questions);

//     if (documents.length > 0 && questions.length > 0) {
//       run();
//     }
//   }, [documents, questions]);

//   return (
//     <>
//       <h1>This is the demo of AI implementation of DocumentQA</h1>
//     </>
//   );
// }

// MODIFIED CODE
import React from "react";
import { answerQuestionsWithGemini } from "../utils/geminiUtils";

export function DemoQA({ documents = [], questions = [] }) {
  React.useEffect(() => {
    console.log("Documents:", documents);
    console.log("Questions:", questions);

    if (documents.length > 0 && questions.length > 0) {
      const systemPrompt =
        "You are an advanced AI assistant tasked with generating detailed, context-aware, and well-structured answers to questions based on provided documents.";
      answerQuestionsWithGemini(documents, questions, systemPrompt)
        .then((response) => {
          console.log("Gemini Response:", response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [documents, questions]);

  return (
    <>
      <h1>This is the demo of AI implementation of DocumentQA</h1>
    </>
  );
}
