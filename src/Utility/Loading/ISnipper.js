import React from "react";
import one from "./0pzzd67th2x2l5hfri2kd7/1.png";
import two from "./0pzzd67th2x2l5hfri2kd7/2.png";
import three from "./0pzzd67th2x2l5hfri2kd7/3.png";
import four from "./0pzzd67th2x2l5hfri2kd7/4.png";
import five from "./0pzzd67th2x2l5hfri2kd7/5.png";
import six from "./0pzzd67th2x2l5hfri2kd7/6.png";
import seven from "./0pzzd67th2x2l5hfri2kd7/7.png";
import eight from "./0pzzd67th2x2l5hfri2kd7/8.png";
import nine from "./0pzzd67th2x2l5hfri2kd7/9.png";
import "./ISnipper.scss";
const ISpinner = () => {
  return (
    <div className="spinner">
      <div className="spinner-image image1">
        <img src={one} alt="logo" />
      </div>
      <div className="spinner-image image2">
        <img src={two} alt="logo" />
      </div>
      <div className="spinner-image image3">
        <img src={three} alt="logo" />
      </div>
      <div className="spinner-image image4">
        <img src={four} alt="logo" />
      </div>
      <div className="spinner-image image5">
        <img src={five} alt="logo" />
      </div>
      <div className="spinner-image image6">
        <img src={six} alt="logo" />
      </div>
      <div className="spinner-image image7">
        <img src={seven} alt="logo" />
      </div>
      <div className="spinner-image image8">
        <img src={eight} alt="logo" />
      </div>
      <div className="spinner-image image9">
        <img src={nine} alt="logo" />
      </div>
    </div>
  );
};
export default ISpinner;
