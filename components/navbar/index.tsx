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
        <p className="navUsername">{context.userState.user?.username}</p>
        {context.userState.user?.role.find((uRole) => uRole === ERole.ADMIN) ? (
          <NavItem to="/admin" displayName="Admin Dashboard" />
        ) : (
          <></>
        )}
        <NavItem to="/logout" displayName="Logout" />
      </div>
    </div>
  );
};

export default NavBar;
