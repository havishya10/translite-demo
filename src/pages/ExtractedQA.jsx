import React from "react";
import { Spinner } from "../components/Spinner";
import { Loader } from "../components/Loader";

export function ExtractedQA(props) {
  console.log(props.extractedQuestions);
  console.log(props.answers.replace(props.answers.slice(0, 7), ""));
  return (
    <div className="">
      <h1 className="text-2xl font-bold ">Document Question & Answer </h1>
      <div className="extracted-response-container bg-gradient-to-br from-slate-800/40 via-slate-950/40 to-slate-800/40 backdrop-blur-md rounded-xl shadow-xl hover:shadow-xl transition-shadow duration-300  ">
        <div>
          <h1 className="text-center">Extracted Questions</h1>
          <div className="extracted-questions-container overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 mt-6 bg-slate-900/50 backdrop-blur-md rounded-lg border border-slate-800/30 shadow-lg  hover:shadow-2xl transition-shadow duration-300">
            {/* <pre className="typed-out typing">{props.extractedQuestions}</pre> */}
            {props.extractedQuestions.length > 0 ? (
              <pre className="typed-out typing">{props.extractedQuestions}</pre>
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div>
          <h1 className="text-center">Extracted Answers</h1>
          <div className="extracted-answers-container overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 mt-6 bg-slate-900/50 backdrop-blur-md rounded-lg border border-slate-800/30 shadow-lg  hover:shadow-2xl transition-shadow duration-300">
            <div>
              {props.answers.length > 0 ? (
                <div
                  className="typed-out typing"
                  dangerouslySetInnerHTML={{
                    __html: `${props.answers
                      .replace(props.answers.slice(0, 7), "")
                      .replace("className", "class")}`,
                  }}
                ></div>
              ) : (
                <Loader />
              )}
            </div>
            {/* {props.extractedAnswerStatus ? (
              <pre className="motion-preset-typewriter ">{props.answers}</pre>
            ) : (
              <div className="flex justify-center mt-20">
                <Spinner />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
