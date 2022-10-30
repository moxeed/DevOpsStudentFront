import noResult from "../../Assets/Images/noResult.jpg";
import * as React from "react";

const NoResult = () => {
  return (
    <img
      width="100%"
      style={{ maxWidth: "500px" }}
      src={noResult}
      alt="چیزی برای نمایش یافت نشد"
    />
  );
};

export default NoResult;
