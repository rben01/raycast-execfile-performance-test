import { Detail } from "@raycast/api";
import { execFileSync, execFile } from "child_process";
import { useState, useEffect } from "react";

interface ElapsedText {
  text: string;
  didSet: boolean;
}

export default function Command() {
  function runExec({ didSet }: ElapsedText, setElapsed: (_x: ElapsedText) => void, callback?: () => void) {
    if (didSet) {
      return;
    }

    const tStart_ms = new Date().getTime();
    execFile("ls", {}, (error, _stdout, _stderr) => {
      if (error) {
        throw error;
      }

      const tEnd_ms = new Date().getTime();
      setElapsed({ text: `${tEnd_ms - tStart_ms} ms`, didSet: true });

      if (callback) {
        callback();
      }
    });
  }

  const [elapsed1, setElapsed1] = useState({ text: "waiting...", didSet: false });
  const [elapsed2, setElapsed2] = useState({ text: "waiting...", didSet: false });

  useEffect(() => {
    runExec(elapsed1, setElapsed1, () => {
      runExec(elapsed2, setElapsed2, () => {
        console.log(elapsed2);
      });
    });
  }, [elapsed1, elapsed2]);

  return (
    <Detail
      markdown={"# Results"}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Elapsed for first call" text={`${elapsed1.text}`}></Detail.Metadata.Label>
          <Detail.Metadata.Label title="Elapsed for second call" text={`${elapsed2.text}`}></Detail.Metadata.Label>
        </Detail.Metadata>
      }
    ></Detail>
  );
}

// export function CommandSync() {
//   const t0_ms = new Date().getTime();
//   execFileSync("ls");
//   const t1_ms = new Date().getTime();
//   execFileSync("ls");
//   const t2_ms = new Date().getTime();

//   const elapsed1 = t1_ms - t0_ms;
//   const elapsed2 = t2_ms - t1_ms;

//   return (
//     <Detail
//       markdown={"# Results"}
//       metadata={
//         <Detail.Metadata>
//           <Detail.Metadata.Label title="Elapsed for first call" text={`${elapsed1} ms`}></Detail.Metadata.Label>
//           <Detail.Metadata.Label title="Elapsed for second call" text={`${elapsed2} ms`}></Detail.Metadata.Label>
//         </Detail.Metadata>
//       }
//     ></Detail>
//   );
// }
