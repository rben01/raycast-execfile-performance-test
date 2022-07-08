import { Detail } from "@raycast/api";
import { execFile } from "child_process";
import { useState, useEffect } from "react";

interface ElapsedText {
  text: string;
  didSet: boolean;
  index: number;
}

type ElapsedTextSetter = (_: ElapsedText) => void;

type ElapsedTextState = [ElapsedText, ElapsedTextSetter];

export default function Command() {
  function runExec(state: ElapsedText, setter: ElapsedTextSetter, callback?: () => void) {
    const { didSet, index } = state;

    const tStart_ms = new Date().getTime();
    execFile("ls", {}, (error, _stdout, _stderr) => {
      const tEnd_ms = new Date().getTime();
      if (error) {
        throw error;
      }

      console.log(`Setting ${index}`);

      setter({ text: `${tEnd_ms - tStart_ms} ms`, didSet: true, index });

      console.log(`Set ${index}`);

      if (callback) {
        callback();
      }
    });
  }

  let index = 0;
  function getState() {
    const state = {
      text: "waiting...",
      didSet: false,
      index,
    };
    index += 1;
    return state;
  }

  const statesAndSetters = [] as [ElapsedText, (_: ElapsedText) => void][];

  statesAndSetters.push(useState(getState()));
  statesAndSetters.push(useState(getState()));
  statesAndSetters.push(useState(getState()));
  statesAndSetters.push(useState(getState()));
  statesAndSetters.push(useState(getState()));
  statesAndSetters.push(useState(getState()));
  statesAndSetters.push(useState(getState()));
  statesAndSetters.push(useState(getState()));

  // Queue up functions back to front
  useEffect(() => {
    const funcs = [] as (() => void)[];
    for (let i = 0; i < index; i++) {
      const prevFunc = funcs[i - 1];
      const stateAndSetter = statesAndSetters[index - i - 1];
      funcs.push(() => runExec(...stateAndSetter, prevFunc));
    }
    funcs[funcs.length - 1]();
  }, []);

  return (
    <Detail
      markdown={
        "# Results\nDescription: `execFile`, with each call scheduled serially via a callback, four times.\n\nIf they don't all load... try again? (Not sure I fully understand the React render cycle...) Anyway what's important is the difference in time taken for the first call and subsequent ones."
      }
      metadata={
        <Detail.Metadata>
          {statesAndSetters.map(([state, _setter]) => {
            const { text, index } = state;
            const indexStr = `${index}`;
            const title = `Elapsed for call #${index + 1}`;
            return <Detail.Metadata.Label {...{ key: indexStr, title, text }}></Detail.Metadata.Label>;
          })}
        </Detail.Metadata>
      }
    ></Detail>
  );
}
