const validator = require("validator");
const isEmpty = require("../config/isEmpty");

const postValidation = (data) => {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 5, max: 300 })) {
    errors.text = "Post must be between 5 and 300 characters";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = postValidation;
