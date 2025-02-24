import React from "react";

export function Chatbar() {
  return (
    <div className="footer-chatbar-container bg-gradient-to-br from-slate-800/40 via-slate-950/40 to-slate-800/40 backdrop-blur-md rounded-xl shadow-xl hover:shadow-xl transition-shadow duration-300 ">
      {/* <div className="ani bg-slate-950/30 focus-within:shadow-[0_0_10px_rgba(137,207,240,0.5)] hover:shadow-[0_0_10px_rgba(137,207,240,0.5)]"> */}
      <div className="ani bg-slate-950/30 focus-within:shadow-[0_0_10px_rgba(75,0,130,0.5),0_0_8px_rgba(137,207,240,0.3)] hover:shadow-[0_0_10px_rgba(75,0,130,0.5),0_0_8px_rgba(137,207,240,0.3)]">
        <input
          type="text"
          placeholder="chat with document..."
          className="footer-chatbar"
        />
        <button className="btn-chatbar">Send</button>
      </div>
    </div>
  );
}
