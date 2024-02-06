import styles from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

export function Overlay({ onClick }) {
  return (
    <div className={styles.overlay} onClick={onClick}></div>
  );
}

Overlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
