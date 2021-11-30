import { FunctionComponent, ReactNode } from "react";

const Dropdown: FunctionComponent<{
  icon: ReactNode;
  toggled: boolean;
}> = ({ icon, toggled, children }) => {
  return (
    <div className="dropdown">
      {icon}
      <div
        className="dropdownMenu"
        aria-expanded={toggled}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
