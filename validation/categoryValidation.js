const validator = require("validator");
const isEmpty = require("../config/isEmpty");

module.exports = function categoryValidation(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (!validator.isLength(data.name, { min: 2 })) {
    errors.name = "Name value must be at least 2 charchter";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
