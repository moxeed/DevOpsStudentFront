// Validator for persian phoneNumber starts with 09
export const phoneNumberValidation = (number) => {
  if (number.length !== 11) {
    return false;
  } else if (isNaN(number) || number.indexOf(" ") !== -1) {
    return false;
  } else if (
    number.charAt(0) + number.charAt(1) !== "09" &&
    number.charAt("۰") + number.charAt(1) !== "۰۹"
  ) {
    return false;
  }
  return true;
};
// for auth
export const validationUsername = (isCounter, username) => {
  if (isCounter) {
    return username.length === 9;
  } else {
    return phoneNumberValidation(username);
  }
};
