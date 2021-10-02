import { FunctionComponent } from "react";
import NavBar from "../components/navbar";

const Admin: FunctionComponent = () => {
  return (
    <div className="page">
      <NavBar />
      <div className="contentContainer">
        <div className="container">
          <h1>Quick Actions</h1>
          <span className="separation" />
          <div className="quickActionMenu">
            <button className="quickAction">Create Space</button>
            <button className="quickAction">Manage All Reservations</button>
          </div>
        </div>
        <div className="container">
          <h1>Manage All Reservations</h1>
          <span className="separation" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
