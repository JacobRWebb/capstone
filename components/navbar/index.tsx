import { FunctionComponent } from "react";
import { ERole } from "../../store/authFeature/authSlice";
import { useAppSelector } from "../../store/store";
import NavItem from "./NavItem";

const NavBar: FunctionComponent = () => {
  const state = useAppSelector((state) => state);

  return (
    <div className="navbar">
      <div className="navMenu">
        <h1 className="navHeader">Commerce Bank</h1>
      </div>
      <div className="navMenu">
        {state.Auth.user?.role === ERole.ADMIN ? (
          window.location.pathname === "/" ? (
            <NavItem to="/admin" displayName="Admin Dashboard" />
          ) : (
            <NavItem to="/" displayName="Home" />
          )
        ) : (
          <></>
        )}
        <NavItem to="/logout" displayName="Logout" />
      </div>
    </div>
  );
};

export default NavBar;
