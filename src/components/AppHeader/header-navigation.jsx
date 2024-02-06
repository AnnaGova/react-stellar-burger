
import styles from './app-header.module.css'

export function NavigationElement ({ icon, text}) {
  return (
    <nav className={styles.navigation_element}>
      {icon}
      <p className="text text_type_main-default">{text}</p>
    </nav>
  )
}

