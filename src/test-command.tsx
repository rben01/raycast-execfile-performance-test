import { Detail } from "@raycast/api";
import { execFileSync } from "child_process";

export default function Command() {
  const t0_ms = new Date().getTime();
  execFileSync("ls");
  const t1_ms = new Date().getTime();
  execFileSync("ls");
  const t2_ms = new Date().getTime();

  const elapsed1 = t1_ms - t0_ms;
  const elapsed2 = t2_ms - t1_ms;

  return (
    <Detail
      markdown={"# Results"}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Elapsed for first call" text={`${elapsed1} ms`}></Detail.Metadata.Label>
          <Detail.Metadata.Label title="Elapsed for second call" text={`${elapsed2} ms`}></Detail.Metadata.Label>
        </Detail.Metadata>
      }
    ></Detail>
  );
}
