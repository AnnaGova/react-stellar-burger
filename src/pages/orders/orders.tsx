import styles from './orders.module.css'
// import { ProfileMenu } from "../../components/profile-menu/profile-menu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { getCookie } from "../../utils/cookie";
import {wsConnectOrder, wsDisconnectOrder} from "../../services/all-orders/action";
import Order from "../../components/Order/order";

export function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.Orders.data);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    dispatch(
      wsConnectOrder({
        wsUrl: `wss://norma.nomoreparties.space/orders?token=${accessToken?.replace(
          "Bearer ",
          ""
        )}`,
        withTokenRefresh: true,
      })
    );
    return () => {
      dispatch(wsDisconnectOrder());
    };
  }, [dispatch]);

  return (
    <section className={styles.wrap}>
      <div className={styles.text}>
        {/* <ProfileMenu activeTab={"orderHistory"} /> */}
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={styles.orders__container}>
        {orders?.orders?.map((order) => (
          <Order
            key={order._id}
            order={order}
            url={"/profile/orders"}
            showStatus={true}
          />
        ))}
      </div>
    </section>
  );
}
