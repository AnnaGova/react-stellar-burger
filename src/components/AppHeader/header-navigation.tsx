
import { ReactNode } from 'react';
import styles from './app-header.module.css'

interface INavigationElement {
  icon: ReactNode;
  text: string;
}

export function NavigationElement ({ icon, text}: INavigationElement) {
  return (
    <nav className={styles.navigation_element}>
      {icon}
      <p className="text text_type_main-default">{text}</p>
    </nav>
  )
}

