import React from "react";

const Button = ({ text, type , onclick}) => {
  return (
    <>
      <button 
      onClick={onclick}
      type={type}
      className=" mt-5 px-3 py-2 rounded bg-blue-500 text-white">
        {text}
      </button>
    </>
  );
};

export default Button;
