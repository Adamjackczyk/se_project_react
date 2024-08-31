import avatar from "../../assets/avatar.svg";
import "./Sidebar.css";
const Sidebar = () => {
  let name = "Terrence Tegegne";

  return (
    <div className="sidebar">
      <img src={avatar} alt="Default avatar" className="sidebar__avatar" />
      <p className="sidebar__username">{`${name}`}</p>
    </div>
  );
};

export default Sidebar;
