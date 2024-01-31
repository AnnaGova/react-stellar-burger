import styles from './app-header.module.css'
import { Logo, ListIcon, BurgerIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavigationElement } from './header-navigation';

export  function AppHeader () {
    return (
        <header className={styles.header}>
          <nav className={styles.navigation}>
          <div className={styles.container}>
            <NavigationElement icon={<BurgerIcon type="primary" />} text="Конструктор" />
            <NavigationElement icon={<ListIcon type="primary" />} text="Лента заказов" />
          </div>
          <NavigationElement icon={<ProfileIcon type="primary" />} text="Личный кабинет" />
          </nav>
          <div className={styles.logo}>
          <Logo />
          </div>

        </header>
    )
};






