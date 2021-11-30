import { FunctionComponent } from "react";

const PreviewContainer: FunctionComponent = () => {
  return (
    <div className="previewContainer">
      <h1 className="headerTitle">Commerce Bank</h1>
      <div className="previews">
        <img
          className="previewImage"
          src="/ReservationCompilation.svg"
          alt="Reservsation Card"
        />
      </div>
      <div className="previewContent">
        <h1 className="previewTitle">Manage Create Explore</h1>
        <h1 className="previewDescription">
          The ability to schedule and find workspaces at your finger tip.
        </h1>
      </div>
    </div>
  );
};

export default PreviewContainer;
