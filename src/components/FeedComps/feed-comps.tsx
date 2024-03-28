import { useSelector } from "../../services/store";
import styles from "./feed-comps.module.css";

export function FeedComps () {
  const orders = useSelector((store) => store.feed.data);
  const readyOrders = orders?.orders.filter((order) => order.status === "done");
  const inProgressOrders = orders?.orders.filter(
    (order) => order.status !== "done"
  );

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <div className={styles.status_ready}>
          <p className="text text_type_main-default mb-6">Готовы:</p>
          <div className={styles.ready}>
            {readyOrders?.map((order) => (
              <p
                key={order._id}
                className={`${styles.ready_order} text text_type_digits-default`}
              >
                {order.number}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.status_in_progress}>
          <p className="text text_type_main-default mb-6">В работе:</p>
          <div className={styles.in_progress}>
            {inProgressOrders?.map((order) => (
              <p
                key={order._id}
                className={`${styles.progress_order} text text_type_digits-default`}
              >
                {order.number}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.alltime}>
        <p className="text text_type_main-default">Выполнено за все время:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>
          {orders?.total}
        </p>
      </div>
      <div className={styles.today}>
        <p className="text text_type_main-default">Выполнено за сегодня:</p>
        <p className={`${styles.shadow} text text_type_digits-large`}>
          {orders?.totalToday}
        </p>
      </div>
    </div>
  );
}



