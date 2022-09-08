const isEmpty = (value) => {
  return (
    (typeof value === "string" && value.trim().length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    value === undefined ||
    value === null
  );
};

module.exports = isEmpty;
