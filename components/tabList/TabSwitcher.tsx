import { FunctionComponent } from "react";

const TabSwitcher: FunctionComponent<{
  title: string;
  uniqueId: string;
  selected: string;
  setSelected: (name: string) => void;
}> = ({ title, uniqueId, selected, setSelected }) => {
  return (
    <div
      className={`tabSwitcher ${selected === uniqueId ? "selected" : ""}`}
      onClick={() => {
        if (selected !== uniqueId) {
          setSelected(uniqueId);
        }
      }}
    >
      <p>{title}</p>
      <span className="tabIndicator"></span>
    </div>
  );
};

export default TabSwitcher;
