import React, { useEffect } from "react";
import PropTypes from "prop-types";

import css from "./Modal.module.css"

export const Modal = ({onModalClose, largeImg}) => {

  useEffect(() => {

    const handleEscKey = (event) => {
    if (event.key === "Escape") {
      onModalClose();
    }
    };

    document.addEventListener("keydown", handleEscKey, false);

    return () => {

      document.removeEventListener("keydown", handleEscKey, false);
      
    };

  }, []);



    return (
    <div className={css.overlay} onClick={onModalClose}>
      <div className={css.modal}>
        <img src={largeImg} alt="img" />
      </div>
    </div>
  )

}


Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
}
