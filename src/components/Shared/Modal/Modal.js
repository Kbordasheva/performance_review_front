import React, { useEffect } from "react";
import ExitImg from "../../../assets/img/exit.png";
import "./Modal.scss";

export const Modal = (props) => {
  const { isVisible, setIsVisible, children, size } = props;
  let sizeModal = "col-sm-11 col-md-9 col-lg-7 col-xl-5";

  if (size === "l") {
    sizeModal = "col-sm-11 col-md-9 col-lg-6";
  }
  if (size === "xs") {
    sizeModal = "col-sm-11 col-md-8 col-lg-6 col-xl-4";
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, [])

  useEffect(() => {
    return () => {document.body.style.overflow = 'unset'};
  })

  return (
    isVisible && (
      <div className="wrapper">
        <div className={`modal-container ${sizeModal}`}>
          <div className="exit-container">
            <button className="exit-button" onClick={() =>  setIsVisible(false)}>
              <img src={ExitImg} alt="exit" />
            </button>
          </div>

          <div>{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
