import { useState } from "react";
import classNames from "classnames";
import "./CheckBoxHelp.scss";

const CheckboxHelp = (props) => {
  const { setIsFormVisible, title } = props;

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsFormVisible();
    setIsActive(!isActive);
  };

  return (
    <div className={classNames("visible-container")}>
      <span
        className={classNames("section-icon", isActive ? "active" : "")}
        onClick={handleClick}
      />
      <div className="title" onClick={handleClick}>{title}</div>
    </div>
  );
};

export default CheckboxHelp;
