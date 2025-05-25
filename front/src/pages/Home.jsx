import { useParams } from "react-router-dom";

import Header from "../components/Header";
import ListCategory from "../components/home/ListCategory";
import ListDishes from "../components/home/ListDishes";
import ListSelected from "../components/home/ListSelected";
import "../static/css/home.css";
import Base from "../utils/base";
import Search from "../static/svgs/search.svg";
import useStore from "../utils/store";

const Home = () => {
  const {
    viewCategory,
    setViewCategory,
    dishes,
    setDishes,

    setCategoryIsSelect,
    setCategoryId,
    
    searchQuery,
    setSearchQuery,
  } = Base();

  const { selectOrder, setSelectOrder } = useStore();

  const { id } = useParams();

  const handelSubmit = () => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    
    console.log(data);
    
    setSearchQuery(data?.search)
    setViewCategory(false)
  };

  return (
    <>
      <Header text={`${id} Стол`} />

      <main className="main">
        <div className="container">
          <div className="main_items">
            <ListSelected
              dishes={dishes}
              setDishes={setDishes}
              order={selectOrder}
              setOrder={setSelectOrder}
            />

            <div className="right">
              <div className="right_container">
                <div className="right_items">
                  {/* <form
                    method="get"
                    className="control_dish"
                    onSubmit={handelSubmit}
                  >
                    <label className="search_blok">
                      <input
                        type="text"
                        name="search"
                        placeholder="Названия блюда..."
                      />
                      <button type="submit">
                        <img src={Search} alt="search" />
                      </button>
                    </label>
                  </form> */}

                  {viewCategory ? (
                    <ListCategory setCategoryId={setCategoryId} />
                  ) : (
                    <ListDishes
                      setViewCategory={setViewCategory}
                      setCategoryIsSelect={setCategoryIsSelect}
                      dishes={dishes}
                      setDishes={setDishes}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
