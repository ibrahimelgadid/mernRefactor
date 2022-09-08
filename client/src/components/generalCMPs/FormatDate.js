import React from "react";

const FormatDate = ({ date }) => {
  const d = new Date(date);
  return (
    <span>
      {`${d.getDate()} ${
        d.getMonth() + 1
      }, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`}
    </span>
  );
};

export default FormatDate;
