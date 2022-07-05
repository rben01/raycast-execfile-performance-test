import { Detail } from "@raycast/api";
import { execFileSync } from "child_process";

export default function Command() {
  const t0 = new Date();
  execFileSync("ls");
  const t1 = new Date();
  execFileSync("ls");
  const t2 = new Date();

  const elapsed1 = t1.getTime() - t0.getTime();
  const elapsed2 = t2.getTime() - t1.getTime();

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
