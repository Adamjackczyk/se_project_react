import React, { useContext } from "react";
import "./Sidebar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Sidebar = () => {
  const currentUser = useContext(CurrentUserContext);

  const { name = "Guest", avatar = "" } = currentUser || {};

  // Function to get the first initial of the user's name
  const getInitial = (fullName) => {
    return fullName.charAt(0).toUpperCase();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__user-info">
        {avatar ? (
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{getInitial(name)}</div>
        )}
        <p className="sidebar__username">{name}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
