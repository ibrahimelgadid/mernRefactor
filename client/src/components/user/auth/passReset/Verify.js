import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Verify = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-6xl text-green-500 font-semibold">
        <FontAwesomeIcon icon={faCheckCircle} />
      </span>
      <span className="text-gray-500 text-2xl font-semibold">
        Check your email to reset your password
      </span>
    </div>
  );
};

export default Verify;
