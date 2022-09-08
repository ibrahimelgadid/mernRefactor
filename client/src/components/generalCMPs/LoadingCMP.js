import React from "react";

const LoadingCMP = ({ siz }) => {
  return (
    <div
      className={`${siz} mx-auto border-4 animate-spin border-gray-400 border-t-white rounded-full `}
    ></div>
  );
};

export default LoadingCMP;
