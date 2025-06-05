import { useEffect, useState } from "react";
import Header from "../components/Header";

import "../static/css/dressed.css";
import Get from "../utils/routes/get";
import Config from "../utils/data";
import Patch from "../utils/routes/patch";

const Dressed = () => {
  const { token } = Config();
  const [orders, serOrders] = useState([]);

  const getOrderIsCreate = () => {
    Get("orders/?status=confirmed", token).then((r) => {
      if (r?.status === 200) {
        serOrders(r?.data);
      }
    });
  };

    useEffect(() => {
      getOrderIsCreate(); // загрузить сразу при монтировании

      const intervalId = setInterval(() => {
        getOrderIsCreate();
      }, 5000);

      return () => clearInterval(intervalId); // очистка таймера при размонтировании
    }, []);

  const handleMarkAsReady = (orderId, itemId) => {
    Patch(`orders/${orderId}/items/${itemId}`, {
      status: "ready",
    },token).then((r) => {
      if (r?.status === 201 || r?.status === 200) {
        getOrderIsCreate();
      } else {
        console.error("Error dressed update status:", r);
      }
    });
  };

  const everythingReady = (idOrder) => {

    
  }

  return (
    <>
      <Header />

      <div className="dressed">
        <div className="container">
          <div className="dressed_items">
            {orders?.map((order) => (
              <div
                className="card"
                style={{ width: "32rem", margin: "10px" }}
                key={order.id}
              >
                <div className="card-body">
                  <h5 className="card-title">Заказ №{order.id}</h5>

                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Блюдо</th>
                        <th>Кол-во</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => {
                        if (item?.status === "created") {
                          return (
                            <tr key={item.id}>
                              <td>{item.dish.name}</td>
                              <td>{item.count} шт</td>
                              <td>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() =>
                                    handleMarkAsReady(order?.id, item?.id)
                                  }
                                >
                                  Готово
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>

                  {/* Можно сюда вставить кнопку "Готов весь заказ" */}
                  <button className="btn btn-primary btn-block" onClick={() => everythingReady(order.id)}>
                    Готов весь заказ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dressed;
