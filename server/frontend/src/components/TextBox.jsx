import React from "react";

function TextBox({ type }) {
  return (
    <div>
      <label htmlFor="" className="leading-7 text-sm text-gray-600">Email</label>
      <input
        type={type}
        id="full-name"
        name="full-name"
        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
  );
}

export default TextBox;
