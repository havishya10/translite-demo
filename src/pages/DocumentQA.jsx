import React, { useState } from "react";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { uploadFileToGemini } from "../utils/geminiUtils";

import { Spinner } from "../components/Spinner";
import { ExtractedQA } from "./ExtractedQA";
import { decode } from "html-entities";

export function DocumentQA(props) {
  const [usrFiles, setUsrFiles] = useState([]);
  const [questionFile, setQuestionFile] = useState(null);
  const [extractedQuestions, setExtractedQuestions] = useState([]);
  const [extrQuesEng, setExtrQuesEng] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectLanguage, setSelectLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const languages = [
    // Tier 1: Excellent Proficiency

    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "zh-TW", name: "Chinese (Traditional)" },
    { code: "ja", name: "Japanese" },
    { code: "pt-BR", name: "Portuguese (Brazilian)" },
    { code: "pt-PT", name: "Portuguese (European)" },
    { code: "it", name: "Italian" },
    { code: "ru", name: "Russian" },
    { code: "ko", name: "Korean" },
    { code: "ar", name: "Arabic" },
    { code: "nl", name: "Dutch" },

    // Tier 2: Good Proficiency
    { code: "hi", name: "Hindi" },
    { code: "tr", name: "Turkish" },
    { code: "vi", name: "Vietnamese" },
    { code: "pl", name: "Polish" },
    { code: "id", name: "Indonesian" },
    { code: "sv", name: "Swedish" },
    { code: "da", name: "Danish" },
    { code: "no", name: "Norwegian (Bokmål)" },
    { code: "nn", name: "Norwegian (Nynorsk)" },
    { code: "fi", name: "Finnish" },
    { code: "he", name: "Hebrew" },
    { code: "el", name: "Greek" },
    { code: "cs", name: "Czech" },
    { code: "ro", name: "Romanian" },
    { code: "hu", name: "Hungarian" },
    { code: "th", name: "Thai" },
    { code: "uk", name: "Ukrainian" },

    // Tier 3: Functional Proficiency
    { code: "bn", name: "Bengali" },
    { code: "mr", name: "Marathi" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "gu", name: "Gujarati" },
    { code: "ur", name: "Urdu" },
    { code: "ms", name: "Malay" },
    { code: "fil", name: "Filipino" },
    { code: "fa", name: "Persian" },
    { code: "bg", name: "Bulgarian" },
    { code: "sr", name: "Serbian" },
    { code: "hr", name: "Croatian" },
    { code: "sk", name: "Slovak" },
    { code: "sl", name: "Slovenian" },
    { code: "lt", name: "Lithuanian" },
    { code: "lv", name: "Latvian" },
    { code: "et", name: "Estonian" },
    { code: "ca", name: "Catalan" },
    { code: "af", name: "Afrikaans" },
    { code: "sq", name: "Albanian" },
    { code: "hy", name: "Armenian" },
    { code: "ka", name: "Georgian" },
    { code: "ne", name: "Nepali" },
    { code: "pa", name: "Punjabi" },
  ];
  const handleUserDocumentUpload = (files) => {
    setUsrFiles(files);
  };

  const handleQuestionnaireUpload = (files) => {
    setQuestionFile(files[0]);
  };

  const handleUpload = async () => {
    if (!usrFiles.length || !questionFile) {
      alert("Please upload both a document and a questionnaire.");
      return;
    }
    props.setUploadStatus(true);
    setError(null);

    try {
      // Step 1: Extract questions from the questionnaire document
      const resultQuestions = await uploadFileToGemini(
        [questionFile],
        `Extract all questions from this document in ${selectLanguage}`
      );
      props.setExtractedQuestions(resultQuestions); // extracting in user specified language
      const resultQuestionsEng = await uploadFileToGemini(
        [questionFile],
        "Extract all questions from this document"
      );
      setExtrQuesEng(resultQuestionsEng); // extracting in eglish for the model to understand and translate it back

      const answerSysprompt = `
      You are an advanced AI assistant tasked with generating detailed, context-aware, and well-structured answers to questions based on provided documents. Your goal is to provide clear, engaging, and balanced explanations that are easy to understand while retaining key terminologies and ensuring accuracy. 
Here are the questions you need to answer from the provided documents, you need to answer the questions in ${selectLanguage}:
${resultQuestionsEng}

*** Follow these guidelines strictly for generating answers to the above questions in telugu

1. **Understand the Question**:
   - Carefully analyze the question to identify its core intent and requirements.
   - Break down complex questions into sub-components if necessary.

2. **Context-Aware Answers**:
   - Base your answers entirely on the content of the provided document.
   - Use the document’s terminology, tone, and context to craft accurate and relevant responses.
   - If the document does not contain sufficient information, provide a contextually relevant response based on the document’s scope and general knowledge.
   - Avoid overly generalized answers—stay specific and on-point.

3. **Structure and Format**:
   - Format your response as valid HTML using Tailwind CSS classes for styling.
   - Organize your answers into three main sections for clarity and readability:
     - **Introduction (10-15% of the answer)**: Briefly introduce the topic and its relevance.
     - **Main Body (70-80% of the answer)**:
       - Break the answer into 3-4 key subsections (e.g., "1. Key Concepts," "2. Applications," "3. Challenges").
       - Include examples, analogies, and real-world applications to make the explanation relatable.
       - Use bullet points or numbered lists for clarity when listing items or steps.
       - If applicable, leave placeholders for visual aids (e.g., diagrams, tables, flowcharts) to enhance understanding.
     - **Conclusion (10-15% of the answer)**: Summarize the key points discussed in the answer.

4. **Length and Depth**:
   - Provide sufficiently lengthy answers that cover the topic in depth without being overly verbose.
   - Aim for 3-6 paragraphs in the main body, ensuring each paragraph adds value.
   - Avoid unnecessary fluff or repetition—every sentence should contribute to the explanation.

5. **Key Terminologies**:
   - Retain and explain key terminologies from the document.
   - Define technical terms in simple language where necessary to ensure understanding.

6. **Handling Unanswerable Questions**:
   - If a question cannot be directly answered using the document, analyze the question and provide a contextually relevant response that aligns with the document’s scope.

7. **Tone and Style**:
   - Use a professional yet conversational tone to make the answers engaging and easy to understand.
   - Avoid overly complex language—explain concepts in simple terms without compromising accuracy.

8. **Examples and Analogies**:
   - Use real-world examples and analogies to illustrate complex concepts.
   - Ensure examples are relevant and enhance understanding.

9. **Avoid Generalizations**:
   - Ensure all answers are specific, contextually aware, and directly tied to the document’s content.
   - Do not provide generic or overly broad responses.

10. **Code Formatting**:
    - When including code snippets, ensure they are properly formatted and easy to read.
    - Use code blocks with clear syntax highlighting (if applicable) and proper indentation.
    - Provide brief comments within the code to explain key steps or logic.

11. **Final Check**:
    - Review the answer to ensure it adheres to the above guidelines.
    - Ensure the answer is well-structured, detailed, and easy to follow.

*** Output Format (HTML with Tailwind CSS):

<div >
  <h2 className="text-2xl font-semibold text-gray-800">Question: [Exact question from the question document]</h2>
  <div className="mt-4">
    <h3 className="text-xl font-medium text-gray-700">Introduction</h3>
    <p className="text-gray-600 leading-relaxed">[Brief introduction to the topic and its relevance.]</p>
    <h3 className="text-xl font-medium text-gray-700 mt-4">Main Body</h3>
    <ul className="list-disc pl-6 mt-2">
      <li className="text-gray-600 mb-2">[Key Point 1]</li>
      <li className="text-gray-600 mb-2">[Key Point 2]</li>
      ...
    </ul>
    <h3 className="text-xl font-medium text-gray-700 mt-4">Conclusion</h3>
    <p className="text-gray-600 leading-relaxed">[Summary of key points and final takeaway.]</p>
  </div>
</div>


example output:

<div >
  <h2 className="text-2xl font-semibold text-gray-800">Question: List and explain benefits of Scalable Computing over the Internet.</h2>
  <div className="mt-4">
    <h3 className="text-xl font-medium text-gray-700">Introduction</h3>
    <p className="text-gray-600 leading-relaxed">Scalable computing over the internet addresses the growing demand for high-performance computing services, especially from the massive number of internet users. This necessitates a shift from a centralized to a distributed computing model, offering several key benefits.</p>
    <h3 className="text-xl font-medium text-gray-700 mt-4">Main Body</h3>
    <ul className="list-disc pl-6 mt-2">
      <li className="text-gray-600 mb-2"><strong>High Throughput:</strong> The primary advantage is the ability to handle a vast number of tasks concurrently, drastically increasing the overall throughput. This is vital for applications like web services and internet searches which need to serve millions of users simultaneously.</li>
      <li className="text-gray-600 mb-2"><strong>Cost-effectiveness:</strong> Distributed computing models are generally more cost-effective than centralized ones, as resources can be added or removed on demand, reducing waste from underutilization or overspending on idle resources.</li>
      <li className="text-gray-600 mb-2"><strong>Fault Tolerance:</strong> The distributed nature of the system allows for increased fault tolerance. If one part of the system fails, others can continue operating, ensuring overall service availability and reducing downtime.</li>
      <li className="text-gray-600 mb-2"><strong>Scalability:</strong> Scalable computing can easily adapt to increased demand by adding more resources, whether it's physical machines or virtualized instances.</li>
      <li className="text-gray-600 mb-2"><strong>Flexibility:</strong> The system offers flexibility in choosing the hardware and software platforms that suit specific needs and enables the use of various technologies such as virtualization and containers.</li>
    </ul>
    <h3 class="text-xl font-medium text-gray-700 mt-4">Conclusion</h3>
    <p class="text-gray-600 leading-relaxed">Scalable computing over the internet solves the limitations of traditional centralized computing by providing a more efficient, reliable, and flexible way to manage and utilize computational resources, especially in the context of growing user demands and diverse application requirements.</p>
    <table> {"if any"}</table>
  </div>
</div>

      
      `;
      const answerResponse = await uploadFileToGemini(
        usrFiles,
        answerSysprompt
      );
      setAnswers(answerResponse);
      props.setAnswers(answerResponse);
    } catch (error) {
      console.error("Error during upload:", error);
      setError("The model is currently overloaded. Please try again later.");
      alert(error);
    } finally {
      setLoading(false);
      props.setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl  font-extrabold bg-gradient-to-r from-violet-500 via-slate-300 to-violet-500 bg-clip-text text-transparent drop-shadow-md ">
        Document Q/A Interaction
      </h1>
      <div className="upload-container">
        <div className="flex gap-12  justify-center">
          <Upload
            title="Upload Document"
            onFileChange={handleUserDocumentUpload}
          />
          <Upload
            title="Upload Questionnaire"
            onFileChange={handleQuestionnaireUpload}
          />
        </div>
        <div className="flex justify-center gap-12 flex-wrap">
          <select
            className="w-35 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-950 focus:border-violet-500"
            defaultValue="english"
            onChange={(e) => setSelectLanguage(e.target.value)}
          >
            <option value="english">English</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>
          <Button
            className="relative inline-block rounded-xl bg-gradient-to-r from-violet-500 via-slate-500 to-violet-900"
            onClick={handleUpload}
            disabled={props.uploadStatus}
          >
            <span className=" block bg-slate-950 backdrop-blur-md rounded-xl px-8 py-3 text-white font-semibold">
              {props.uploadStatus ? "Processing..." : "Upload"}
            </span>
          </Button>
        </div>
      </div>
      {/* Display Error Message */}
      {error && (
        <div className="mt-8 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {props.answers.length > 0 && props.setExtractedAnswerStatus(true)}
    </>
  );
}
