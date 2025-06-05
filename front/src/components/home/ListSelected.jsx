import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Base from "../../utils/base";
import Patch from "../../utils/routes/patch";
import Config from "../../utils/data";
import Post from "../../utils/routes/post";
import Delete from "../../utils/routes/delete";
import TreshImg from "../../static/images/tresh.webp";
import Index from "../../pages/Dressed";

const OrderDish = ({
  orderId,
  id,
  dishName,
  dishPrise,
  count,
  updateOrderItemCount,
}) => {
  const { token } = Config();
  const [viewOrder, setView] = useState(true);

  const [countDish, setCountDish] = useState(count || 1);
  const [totalPrise_, setTotalPrise] = useState(0);

  useEffect(() => {
    setCountDish(count);
  }, [count]);

  const addCountDish = () => {
    setCountDish(countDish + 1);
  };

  const subtractCountDish = () => {
    setCountDish(countDish - 1);
  };

  const updateCountDish = (orderId, dishId) => {
    Patch(
      `orders/${orderId}/items/${dishId}`,
      { count: countDish },
      token
    ).then((r) => {
      if (r.status != 200) {
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    if (countDish <= 0) {
      const confirmDelete = window.confirm("Удалить блюдо из заказа?");
      if (confirmDelete) {
        setView(false);
        updateCountDish(orderId, id);
      } else {
        setCountDish(1); // вернуть обратно
      }
      return;
    }

    setTotalPrise(countDish * dishPrise);
    updateOrderItemCount(orderId, id, countDish);
    updateCountDish(orderId, id);
  }, [countDish]);

  if (!viewOrder) return null;

  return (
    <div className="order_dish" key={id}>
      <div className="name">{dishName}</div>
      <div className="prise">{Math.ceil(dishPrise)} сом</div>
      <div className="count">
        <button className="subtract" onClick={subtractCountDish}>
          -
        </button>
        {countDish}
        <button className="add" onClick={addCountDish}>
          +
        </button>
      </div>
      <div className="total_prise">{Math.ceil(totalPrise_)} сом</div>
    </div>
  );
};

const ListSelected = ({ order, setOrder }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const { id, id_tl } = useParams();
  const { token } = Config();
  const { listSelect, setListSelect, getOrder } = Base();
  const [animatedTotal, setAnimatedTotal] = useState(0);
  // const [order, setOrder] = useState(null);

  useEffect(() => {
    if (listSelect.length > 0) {
      const tableIndex = parseInt(query.get("tableInd"));
      const isValidIndex =
        !isNaN(tableIndex) && tableIndex >= 0 && tableIndex < listSelect.length;

      if (isValidIndex) {
        setOrder(listSelect[tableIndex]);
      } else {
        setOrder(listSelect[0]);
        query.set("tableInd", 0);
        navigate(`${location.pathname}?${query.toString()}`);
      }
    } else {
      setOrder(null);
    }
  }, [listSelect]);

  const handleClick = (orderItem, index) => {
    // console.log("Кликнули по заказу:", orderItem);
    setOrder(orderItem);
    query.set("tableInd", index);
    navigate(`${location.pathname}?${query.toString()}`);
  };

  const addOrder = () => {
    Post(`orders/`, { table: id_tl }, token).then((r) => {
      if (r?.status === 201) {
        getOrder().then((newOrders) => {
          const newOrder = newOrders.find((o) => o.id === r.data.id);
          if (newOrder) {
            setOrder(newOrder);
          }
        });
      }
    });
  };

  const updateOrderItemCount = (orderId, dishId, newCount) => {
    const updatedList = listSelect.map((order) => {
      if (order.id === orderId) {
        const updatedItems = order.items.map((item) => {
          if (item.id === dishId) {
            return {
              ...item,
              count: newCount,
              total_prise: newCount * item.dish.prise,
            };
          }
          return item;
        });

        const totalOrderPrice = updatedItems.reduce(
          (sum, item) => sum + item.count * item.dish.prise,
          0
        );

        return {
          ...order,
          items: updatedItems,
          total_prise: totalOrderPrice,
        };
      }
      return order;
    });

    setListSelect(updatedList);
  };

  useEffect(() => {
    if (!order) return;

    const target = Math.ceil(order.total_prise || 0);
    let start = animatedTotal;
    let startTime = null;

    const duration = 300;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const currentValue = start + (target - start) * percent;

      setAnimatedTotal(currentValue);

      if (percent < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [order?.total_prise]);

  const payFun = (idOrder) => {
    if (animatedTotal > 0 && typeof animatedTotal == "number") {
      const res = window.confirm(
        `Вы точно хотите завершить "Заказ №${idOrder}"`
      );
      if (res) {
        Patch(
          `orders/${idOrder}/`,
          {
            is_paid: true,
          },
          token
        ).then((r) => {
          if (r?.status === 200) {
            getOrder().then((newOrders) => {
              const newOrder = newOrders.find((o) => o.id === r.data.id);
              if (newOrder) {
                setOrder(newOrder);
              }
            });
          }
          navigate(`/check/${idOrder}/`);
        });
      }
    } else {
      toast.warning("Итоговая сумма должна быть больше 0 сом!");
    }
  };

  const deleteOrderFun = (idOrder) => {
    if (!idOrder) return;

    const conf = window.confirm(
      `Вы действительно хотите удалить "Заказ №${idOrder}"`
    );

    if (!conf) return;

    Delete(`orders/${idOrder}/`, token).then((r) => {
      if (r?.status === 204) {
        getOrder().then((newOrders) => {
          const newOrder = newOrders.find((o) => o.id === r.data.id);
          if (newOrder) {
            setOrder(newOrder);
          }
        });
      }
    });
  };

  const designOrder = (idOrder) => {

    const res = window.confirm(
      `Вы точно хотите оформить "Заказ №${idOrder}"`
    );

    if (!res) return;

    Patch(
      `orders/${idOrder}/`,
      {
        status: "confirmed",
      },
      token
    ).then((r) => {
      if (r?.status === 200) {
        getOrder().then((newOrders) => {
          const newOrder = newOrders.find((o) => o.id === r.data.id);
          if (newOrder) {
            setOrder(newOrder);
          }
        });
      }
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="left">
        <div className="left_container">
          <div
            className={`left_items ${
              listSelect.length == 0 ? "null_blok" : ""
            }`}
          >
            {listSelect.length === 0
              ? "Добавте заказ"
              : listSelect.map((item, index) => (
                  <div
                    className={`order_blok hr`}
                    key={item?.id}
                    onClick={() => handleClick(item, index)}
                  >
                    <h2 className="title_order">Заказ №{item?.id}</h2>

                    <div className="order_dishes">
                      {item?.items?.length !== 0
                        ? item?.items.map((order_item) => (
                            <>
                              <OrderDish
                                orderId={item?.id}
                                id={order_item?.id}
                                count={order_item?.count}
                                dishName={order_item?.dish?.name}
                                dishPrise={order_item?.dish?.prise}
                                updateOrderItemCount={updateOrderItemCount}
                              />
                            </>
                          ))
                        : "Добавите блюдо"}
                    </div>
                    {(item?.items?.length !== 0 && item?.status != "confirmed") && <button className="btn_design" onClick={() => designOrder(item?.id)}>Оформить</button>}
                  </div>
                ))}
          </div>
          <div className="blok_controls">
            <button className="add_order_btn" onClick={addOrder}>
              + Добавить заказ
            </button>

            <div className="blok_calculation">
              <div className="reminders_order">
                {order ? `Выбран заказ №${order?.id}` : "-"}
              </div>
              <div className="result">
                <div className="result_left">Итог:</div>
                <div className="result_right">
                  {order ? Math.ceil(animatedTotal) : "-"} сом
                </div>
              </div>
              <div className="pay">
                <button className="bnt_pay" onClick={() => payFun(order?.id)}>
                  Оплатить
                </button>
                <button
                  className="btn_delete"
                  onClick={() => deleteOrderFun(order?.id)}
                >
                  <img src={TreshImg} alt="tresh" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSelected;
