import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Chatbar } from "./components/Chatbar";
import { DocumentQA } from "./pages/DocumentQA";
import { ExtractedQA } from "./pages/ExtractedQA";
import { Loader } from "./components/Loader";
// import { DemoQA } from "./demo-ai/DemoQA";
export default function App() {
  const [uploadStatus, setUploadStatus] = React.useState(false);
  const [extractedQuestionStatus, setExtractedQuestionStatus] =
    React.useState(false);
  const [extractedAnswerStatus, setExtractedAnswerStatus] =
    React.useState(false);
  const [extractedQuestions, setExtractedQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [extrQuesEng, setExtrQuesEng] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Navbar />
      <main>
        {/* main -classes:   className="flex flex-col justify-center items-center gap-12" */}

        {uploadStatus ? (
          <ExtractedQA
            extractedQuestions={extractedQuestions}
            answers={answers}
            extractedQuestionStatus={extractedAnswerStatus}
            extractedAnswerStatus={extractedAnswerStatus}
            extrQuesEng={extrQuesEng}
            loading={loading}
          />
        ) : (
          <div className="flex flex-col justify-center items-center gap-12 mt-12">
            <DocumentQA
              setUploadStatus={setUploadStatus}
              uploadStatus={uploadStatus}
              setExtractedQuestions={setExtractedQuestions}
              setAnswers={setAnswers}
              extractedQuestions={extractedQuestions}
              answers={answers}
              setExtractedQuestionStatus={setExtractedQuestionStatus}
              setExtractedAnswerStatus={setExtractedAnswerStatus}
              setExtrQuesEng={setExtrQuesEng}
              setLoading={setLoading}
            />
          </div>
        )}
      </main>
      {/* <div className="flex justify-center ">
        <Chatbar />
      </div> */}
    </>
  );
}
