import { FunctionComponent, useContext } from "react";
import { ERole, GlobalContext } from "../../context/GlobalProvider";
import NavItem from "./NavItem";

const NavBar: FunctionComponent = () => {
  const context = useContext(GlobalContext);

  return (
    <div className="navbar">
      <div className="navMenu">
        <h1 className="navHeader">Commerce Bank</h1>
      </div>
      <div className="navMenu">
        {context.userState.user?.role.find((uRole) => uRole === ERole.ADMIN) ? (
          window.location.pathname === "/" ? (
            <NavItem to="/admin" displayName="Admin Dashboard" />
          ) : (
            <NavItem to="/" displayName="Home" />
          )
        ) : (
          <></>
        )}
        <NavItem
          to="/logout"
          displayName={context.userState.user?.username || ""}
        />
      </div>
    </div>
  );
};

export default NavBar;
