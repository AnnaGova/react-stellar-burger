import styles from './notfound-page.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

export function NotFoundPage () {
  return (
    <section className={styles.container}>
      <h1 className='text text_type_main-big'>404</h1>
      <p className='text text_type_main-medium'>Эту страницу съел иноплонетный монстр.</p>
      <Button> Вернуться </Button>
    </section>

  )
}
