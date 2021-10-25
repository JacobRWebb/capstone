import { FunctionComponent } from "react";
import NavBar from "../components/navbar";

const Admin: FunctionComponent = () => {
  return (
    <div className="page">
      <NavBar />
      <div className="content"></div>
    </div>
  );
};

export default Admin;
