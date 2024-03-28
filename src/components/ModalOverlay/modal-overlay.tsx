import styles from "./modal-overlay.module.css";


interface IOverlay {
  onClick: () => void;
}

export function Overlay({ onClick }: IOverlay) {
  return (
    <div className={styles.overlay} onClick={onClick}></div>
  );
}

