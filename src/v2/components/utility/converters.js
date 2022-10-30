import * as React from "react";

// Use in every textField with numbers
const persianNumberArr = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
const arabicNumberArr = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];

export const toEnglishNumberString = (string) => {
  if (typeof string === "string") {
    let i = 0;
    for (; i < 10; i++) {
      string = string
        .replace(persianNumberArr[i], i)
        .replace(arabicNumberArr[i], i);
    }
  }
  return string;
};

// Use in every textFields with money
export const tomanConverter = (Rial, isFree = false) => {
  return (
    <React.Fragment>
      {" "}
      {isFree === true ? (
        <React.Fragment>رایگان</React.Fragment>
      ) : (
        `${(Rial / 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`
      )}
    </React.Fragment>
  );
};

// Temporary - must sink with backend
export const groupIdToLabel = {
  1: "دوازدهم ریاضی",
  3: "دوازدهم تجربی",
  5: "دوازدهم انسانی",
  7: "هنر",
  9: "منحصرا زبان",
  21: "یازدهم ریاضی",
  22: "یازدهم تجربی",
  23: "یازدهم علوم انسانی",
  24: "دهم ریاضی",
  25: "دهم تجربی",
  26: "دهم علوم انسانی",
  94: "دوازدهم عمومی",
};

export function embolden(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "ی") {
      console.log(str[i]);
      str[i] = "_";
    }
  }
  str
    .replace(1610, "_")
    .replace(1740, "_")
    .replace(1603, "_")
    .replace(1705, "_");

  console.log(str);
  return str;
}
