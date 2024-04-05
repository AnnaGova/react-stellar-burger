import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Overlay } from "../ModalOverlay/modal-overlay";
import { createPortal } from "react-dom";
import styles from './modal.module.css';
import { useEffect, PropsWithChildren } from 'react';



const modalRoot = document.getElementById('modal');

interface ModalProps {
  onClose: () => void;
  title: string;
}


export function Modal ({ onClose, children, title }: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    const handleKeyPress = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }


  return createPortal(

    <>
        <div >
          <div data-cy="modal" className={styles.container}>
            <div className={`${styles.header} pt-10 pr-10 ml-10`}>
            <p className="text text_type_main-large">{title}</p>
            <button data-cy="close-modal" className={styles.close_button} onClick={() => onClose()}>
              <CloseIcon type="primary" />
            </button>
            </div>
            {children}
          </div>
          <Overlay onClick={() => onClose()} />
        </div>

      </>,

    modalRoot

  );
};

