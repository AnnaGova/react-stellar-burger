import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Overlay } from "../ModalOverlay/modal-overlay";
import { createPortal } from "react-dom";
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';



const modalRoot = document.getElementById('modal');

export function Modal ({title, onClose, children, isOpen, handleClosePopup }) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);


  return createPortal(
    (
      <>
      { isOpen && (
        <div >
          <div className={styles.container}>
            <div className={`${styles.header} pt-10 pr-10 ml-10`}>
            <p className="text text_type_main-large">{title}</p>
            <button className={styles.close_button} onClick={() => onClose()}>
              <CloseIcon />
            </button>
            </div>
            {children}
          </div>
          <Overlay onClick={() => onClose()} />
        </div>
         )}
      </>

    ),
    modalRoot

  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
