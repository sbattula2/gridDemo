import React from "react";

import "./ButtonBar.css";

const ButtonBar: React.FC = (props) => {
  return <div className="Button-Bar">{props.children}</div>;
};

export default ButtonBar;
