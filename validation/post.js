//const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};



  if (isEmpty(data.text)) {
    errors.text = "Please add a text";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};