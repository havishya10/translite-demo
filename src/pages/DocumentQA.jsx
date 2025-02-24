import React from "react";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
export function DocumentQA() {
  let [uploadStatus, setUploadStatus] = React.useState(false);
  return (
    <>
      <h1 className="text-4xl  font-extrabold bg-gradient-to-r from-violet-500 via-slate-300 to-violet-500 bg-clip-text text-transparent drop-shadow-md ">
        Document Q/A Interaction
      </h1>
      <div className="upload-container ">
        <div className="flex gap-12  justify-center">
          <Upload title="Upload File" />
          <Upload title="Upload Questionaire" />
        </div>
        <Button
          className="relative inline-block rounded-xl bg-gradient-to-r from-violet-500 via-slate-500 to-violet-900"
          onClick={() => {
            console.log("Upload button clicked");
            setUploadStatus(true);
          }}
        >
          <span className="block bg-slate-950 backdrop-blur-md rounded-xl px-8 py-2 text-white font-semibold">
            Upload
          </span>
        </Button>
      </div>
    </>
  );
}
