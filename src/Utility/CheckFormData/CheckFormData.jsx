const CheckFormData = (obj) => {
  let allFilled = true;
  Object.keys(obj).forEach(function (key) {
    if (obj[key] === "") {
      allFilled = false;
    }
  });
  return allFilled;
};

export default CheckFormData;
