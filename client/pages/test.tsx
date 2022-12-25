import { FC, useState } from "react";
import { NextPage } from "next";

export default function Test() {
  function renderCreativeWriting() {
    // Render a div that explains how creative writing works
    const [text, setText] = useState(
      "Creative writing is a form of writing that expresses the writers feelings and emotions or thoughts and ideas, in an imaginative, often considered unique, and poetic way. It is a form of self-expression."
    );

    return (
      <div>
        <h2>Creative Writing</h2>
        <p
          className="font-extrabold text-red-500"
          onClick={() =>
            setText(
              text === "something cool"
                ? "Creative writing is a form of writing that expresses the writers feelings and emotions or thoughts and ideas, in an imaginative, often considered unique, and poetic way. It is a form of self-expression."
                : "something cool"
            )
          }
        >
          {text}
        </p>
      </div>
    );
  }
  return (
    <div>
      <h2>Test</h2>
      {renderCreativeWriting()}
    </div>
  );
}
