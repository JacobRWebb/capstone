import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { ERole, useAppSelector } from "../../../store";
import NavItem from "./NavItem";

const NavBar: FunctionComponent = () => {
  const state = useAppSelector((state) => state);
  const [navItems, setNavItems] = useState<ReactNode[]>([]);

  useEffect(() => {
    let tempNavItems: ReactNode[] = [];
    if (
      window.location.pathname === "/" &&
      state.Auth.user?.role === ERole.ADMIN
    ) {
      tempNavItems.push(
        <NavItem key="/admin" to="/admin" displayName="Admin Dashboard" />
      );
    } else {
      tempNavItems.push(<NavItem key="/" to="/" displayName="Home" />);
    }
    tempNavItems.push(
      <NavItem key="/logout" to="/logout" displayName="Logout" />
    );
    setNavItems(tempNavItems);
  }, []);

  return (
    <div className="navbar">
      <div className="navMenu">
        <h1 className="navHeader">Commerce Bank</h1>
      </div>
      <div className="navMenu">{navItems}</div>
    </div>
  );
};

export default NavBar;
