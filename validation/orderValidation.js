const validator = require("validator");
const isEmpty = require("../config/isEmpty");

module.exports = function orderValidation(data) {
  let errors = {};
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  /////////////////////////
  if (!validator.isLength(data.fullname, { min: 8 })) {
    errors.fullname = "fullname value must be at least 8 charchter";
  }

  if (validator.isEmpty(data.fullname)) {
    errors.fullname = "fullname field is required";
  }

  //////////////////////////
  if (!validator.isEmail(data.email)) {
    errors.email = "enter valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  //////////////////////////
  if (validator.isEmpty(data.address)) {
    errors.address = "address field is required";
  }

  /////////////////////////
  if (!validator.isLength(data.phone, { min: 11 })) {
    errors.phone = "phone value must be at least 11 digits";
  }

  if (!validator.isNumeric(data.phone)) {
    errors.phone = "phone field must be numbers";
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "phone field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
