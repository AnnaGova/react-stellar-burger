import styles from './app-header.module.css'
import { Logo, ListIcon, BurgerIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavigationElement } from './header-navigation'
import { NavLink } from 'react-router-dom';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles.container}>
          <NavLink className={styles.link} to="/react-stellar-burger">
            <NavigationElement icon={<BurgerIcon type="primary" />} text="Конструктор" />
          </NavLink>
          <NavLink className={styles.link} to="/feed">
            <NavigationElement icon={<ListIcon type="primary" />} text="Лента заказов" />
          </NavLink>
        </div>
        <NavLink className={styles.link} to="/profile">
          <NavigationElement icon={<ProfileIcon type="primary" />} text="Личный кабинет" />
        </NavLink>
      </nav>
      <div className={styles.logo}>
        <NavLink className={styles.link} to="/react-stellar-burger">
            <Logo />
        </NavLink>
      </div>

    </header>
  )
};






