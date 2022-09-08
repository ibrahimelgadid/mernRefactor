import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ErrorCMP = ({ errorData }) => {
  return (
    <div className="error text-red-400 text-sm font-medium">
      {errorData ? (
        <>
          <FontAwesomeIcon icon={faCircleExclamation} /> {errorData}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ErrorCMP;
