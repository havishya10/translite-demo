import React from "react";

export function Upload({ title, onFileChange }) {
  const [File, setFile] = React.useState([]);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFile(filesArray);
    onFileChange(filesArray);
  };
  console.log(File);

  return (
    <div className="group relative max-w-[350px]">
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10">
        <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-sky-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
        <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />
        <div className="relative p-6">
          <div className="flex items-center gap-12 justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-slate-400">
                Drag & drop your files here
              </p>
            </div>
            <div className="rounded-lg bg-cyan-500/10 p-2">
              <svg
                className="h-6 w-6 text-cyan-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>
          <div className="group/dropzone mt-6">
            <div className="k relative rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 p-8 transition-colors group-hover/dropzone:border-cyan-500/50">
              <input
                type="file"
                className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                multiple
                onChange={handleFileChange}
              />
              <div className="space-y-3 text-center">
                <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full bg-slate-900">
                  {File.length === 0 ? (
                    <svg
                      className="h-9 w-9 text-cyan-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 576"
                      width="5em"
                      height="2em"
                      className="h-9 w-9 text-emerald-500"
                    >
                      <path
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M0 64C0 28.7 28.7 0 64 0h160v128c0 17.7 14.3 32 32 32h128v38.6c-73.9 20.9-128 88.8-128 169.4c0 59.1 29.1 111.3 73.7 143.3c-3.2.5-6.4.7-9.7.7H64c-35.3 0-64-28.7-64-64zm384 64H256V0zm-96 240a144 144 0 1 1 288 0a144 144 0 1 1-288 0m211.3-43.3c-6.2-6.2-16.4-6.2-22.6 0L416 385.4l-28.7-28.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c6.2 6.2 16.4 6.2 22.6 0l72-72c6.2-6.2 6.2-16.4 0-22.6"
                      />
                    </svg>
                  )}
                </div>
                <div className="space-y-2">
                  {File.length === 0 ? (
                    <>
                      <p className="text-sm text-slate-400">
                        Support files: PDF, DOC, JPG, PNG
                      </p>
                      <p className="text-xs text-slate-400">
                        Max file size: 2GB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-white">
                        Selected file{File.length > 1 ? "s" : ""}:
                      </p>
                      <ul className="space-y-1">
                        {File.map((file, idx) => {
                          const extension = file.name.split(".").pop();
                          return (
                            <li key={idx} className="text-slate-400">
                              {file.name.length > 10
                                ? file.name.slice(0, 9) + "..." + extension
                                : file.name}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
