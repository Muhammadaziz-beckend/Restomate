import { ToastContainer, toast } from "react-toastify";

import Config from "../../utils/data";
import Post from "../../utils/routes/post";
import useStore from "../../utils/store";
import Base from "../../utils/base";

const Dishes = ({ item }) => {
  const { token } = Config();
  const {getOrder} = Base()
  const { selectOrder, setSelectOrder } = useStore();

  const addInOrderDish = (dishId) => {
    console.log(selectOrder);

    if (!selectOrder) {
      toast.warning("Выберите заказ перед тем добавлять блюдо!");
      return;
    }

    Post(
      `orders/${selectOrder?.id}/items/${dishId}`,
      {
        count: 1,
      },
      token
    ).then(
      r => {
        if (r?.status === 201 || r?.status === 200) {
          getOrder()
        }
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <div
        className="blok_dish"
        key={item?.id}
        onClick={() => addInOrderDish(item?.id)}
      >
        <img src={item?.image} alt="" />

        <div className="blok_content">
          <div className="name">{item?.name}</div>

          <div className="prise">{Math.ceil(item?.prise)} com</div>
        </div>
      </div>
    </>
  );
};

const ListDishes = ({
  setViewCategory,
  setCategoryIsSelect,
  dishes,
  setDishes,
}) => {
  return (
    <>
      <div className="blok_dishes wite">
        <div
          className="blok_dish black"
          onClick={() => {
            setCategoryIsSelect(0);
            setViewCategory(true);
          }}
        >
          <div className="blok_content">
            <div className="name">Назад</div>
          </div>
        </div>

        {dishes?.map((item) => (
          <Dishes item={item} />
        ))}
      </div>
    </>
  );
};

export default ListDishes;
