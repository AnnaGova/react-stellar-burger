import Order from "../../components/Order/order";
import styles from "./feed.module.css";
import { FeedComps } from "../../components/FeedComps/feed-comps";
import { useDispatch, useSelector } from "../../services/store";
import { useEffect } from "react";
import { wsConnectFeed, wsDisconnectFeed } from "../../services/feed/action";

function FeedPage() {
  const dispatch = useDispatch();
  const wsUrl = "wss://norma.nomoreparties.space/orders/all";
  const orders = useSelector((store) => store.feed.data);

  useEffect(() => {
    dispatch(
      wsConnectFeed({
        wsUrl: wsUrl,
        withTokenRefresh: true,
      })
    );
    return () => {
      dispatch(wsDisconnectFeed());
    };
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <h1 className="text text_type_main-medium mb-4">Лента заказов</h1>
      <div className={styles.orders_container}>
        <section className={styles.orders}>
          {orders?.orders.map((order) => (
            <Order order={order} url={"/feed"} key={order._id} />
          ))}
        </section>
        <section className={styles.order_status}>
          <FeedComps/>
        </section>
      </div>
    </main>
  );
}
export default FeedPage;
