// src/components/ProtectedRoute/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

/**
 * ProtectedRoute Component
 *
 * A wrapper for protected routes that redirects unauthorized users to the main page.
 *
 * Props:
 * - children (ReactNode): The component to render if the user is authenticated.
 */
const ProtectedRoute = ({ children }) => {
  // Consume the current user context to determine authentication status
  const { isLoggedIn } = React.useContext(CurrentTemperatureUnitContext);

  // If the user is not logged in, redirect to the main page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the child component
  return children;
};

export default ProtectedRoute;
