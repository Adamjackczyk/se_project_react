import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTempUnit, setCurrentTempUnit] = React.useState("F");

  const handleChange = (e) => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");
  };

  console.log(currentTempUnit);

  return (
    <label className="switch">
      <input type="checkbox" className="switch__box" onChange={handleChange} />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p className={`switch__temp-F ${currentTempUnit === "F" && "active"}`}>
        F
      </p>
      <p className={`switch__temp-C ${currentTempUnit === "C" && "active"}`}>
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
