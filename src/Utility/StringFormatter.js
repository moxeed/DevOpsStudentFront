/* eslint-disable no-var */
const Formatter = function (formatted) {
  for (var arg in arguments) {
    if (arg !== 0)
      formatted = formatted.split("{" + (arg - 1) + "}").join(arguments[arg]);
  }
  return formatted;
};

export default Formatter;
