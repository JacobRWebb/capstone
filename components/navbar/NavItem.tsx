import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";

export interface INavItem {
  to: string;
  displayName: string;
}

const NavItem: FunctionComponent<INavItem> = (item) => {
  const router = useRouter();

  return (
    <button
      className="navItem"
      onClick={(event) => {
        event.preventDefault();
        if (location.pathname !== item.to) {
          router.push(item.to);
        }
      }}
    >
      {item.displayName}
    </button>
  );
};

export default NavItem;
