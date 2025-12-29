import React, { useEffect, useContext } from "react";
import style from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import OrderContext from "../../context/OrderContext";
import UserContext from "../../context/UserContext";

const OrderPage = (props) => {
  const ctx = useContext(OrderContext);
  const userCtx = useContext(UserContext);
  useEffect(() => {
    ctx.loadOrders(userCtx.state.token, userCtx.state.userId);
  }, []);

  return (
    <div className={style.OrderPage}>
      <h1>Orders History</h1>
      {ctx.state.loading ? (
        <Spinner />
      ) : (
        <div>
          {ctx.state.orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div>
              {ctx.state.orders.map((el) => (
                <Order key={el[0]} order={el[1]} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
