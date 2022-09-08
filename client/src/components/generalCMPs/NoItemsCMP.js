import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const NoItemsCMP = ({ item }) => {
  return (
    <div className=" font-bold text-red-700 text-center">
      <FontAwesomeIcon icon={faCircleExclamation} /> There's no {item}
    </div>
  );
};

export default NoItemsCMP;
