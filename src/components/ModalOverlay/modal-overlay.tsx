import styles from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

interface IOverlay {
  onClick: () => void;
}

export function Overlay({ onClick }: IOverlay) {
  return (
    <div className={styles.overlay} onClick={onClick}></div>
  );
}

Overlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
