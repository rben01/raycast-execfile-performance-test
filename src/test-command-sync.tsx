import { Detail } from "@raycast/api";
import { execFileSync } from "child_process";

export default function Command() {
  let prevTimestamp = new Date().getTime();
  const elapsedTimes = [] as number[];

  for (let i = 0; i < 8; i++) {
    execFileSync("ls");
    const newTimestamp = new Date().getTime();
    const elapsed = newTimestamp - prevTimestamp;
    elapsedTimes.push(elapsed);
    prevTimestamp = newTimestamp;
  }

  return (
    <Detail
      markdown={"# Results\nDescription: `execFileSync`, four times"}
      metadata={
        <Detail.Metadata>
          {elapsedTimes.map((t, i) => {
            return (
              <Detail.Metadata.Label
                key={`${i}`}
                title={`Elapsed for call #${i + 1}`}
                text={`${t} ms`}
              ></Detail.Metadata.Label>
            );
          })}
        </Detail.Metadata>
      }
    ></Detail>
  );
}
