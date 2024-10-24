import React from "react";
import MMDVoter from "./MMDVoter";
import SMDVoter from "./SMDVoter";

const VoterSeats = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "48%" }}>
        <SMDVoter />
      </div>
      <div style={{ width: "48%" }}>
        <MMDVoter />
      </div>
    </div>
  );
};

export default VoterSeats;
