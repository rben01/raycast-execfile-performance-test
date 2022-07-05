const child_process = require("child_process");
const execFileSync = child_process.execFileSync;

function Command() {
  const t0_ms = new Date().getTime();
  execFileSync("ls");
  const t1_ms = new Date().getTime();
  execFileSync("ls");
  const t2_ms = new Date().getTime();

  const elapsed1 = t1_ms - t0_ms;
  const elapsed2 = t2_ms - t1_ms;

  console.log({ elapsed1, elapsed2 });
}

Command();
