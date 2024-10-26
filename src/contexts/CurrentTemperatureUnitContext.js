import React from "react";

/**
 * CurrentTemperatureUnitContext
 *
 * Provides the current temperature unit, a toggle function,
 * and authentication-related states across the application.
 */
const CurrentTemperatureUnitContext = React.createContext({
  currentTempUnit: "F", // Default temperature unit
  handleToggleSwitchChange: () => {},
  isLoggedIn: false, // Default authentication state
  currentUser: null, // Default current user
});

export { CurrentTemperatureUnitContext };
