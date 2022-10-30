import React from "react";

const TomanConverter = ({ Rial, isFree }) => {
  return (
    <>
      {" "}
      {isFree === true || Rial === 0 ? (
        <>رایگان</>
      ) : (
        `${(Rial / 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان`
      )}
    </>
  );
};

export default TomanConverter;
