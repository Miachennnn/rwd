import React from "react";
import "../style/msg.scss";

const Msg = ({ msg }) => {
  return (
    <div className="msg">
      <p>{msg}</p>
    </div>
  );
};

export default Msg;
