import done from '../../images/done.svg';
import styles from './order-details.module.css'


export function OrderDetails () {
  return (
    <div className={`${styles.container} mb-30`}>
      <h2 className="text text_type_digits-large mt-14">034536</h2>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <img src={done} alt="Заказ принят" className={styles.icon}/>
      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить </p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
