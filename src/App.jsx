import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Chatbar } from "./components/Chatbar";
import { DocumentQA } from "./pages/DocumentQA";
import { ExtractedQA } from "./pages/ExtractedQA";
export default function App() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-center items-center gap-12">
        <DocumentQA />
      </main>
      <div className="flex justify-center ">
        <Chatbar />
      </div>
    </>
  );
}
