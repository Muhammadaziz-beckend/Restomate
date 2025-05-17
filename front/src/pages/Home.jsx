import { useParams } from "react-router-dom";

import Header from "../components/Header";
import ListCategory from "../components/home/ListCategory";
import ListDishes from "../components/home/ListDishes";
import ListSelected from "../components/home/ListSelected";
import "../static/css/home.css";
import Base from "../utils/base";

const Home = () => {
  const { viewCategory, setViewCategory, dishes, setDishes } = Base();

  const { id } = useParams();

  return (
    <>
      <Header text={`${id} Стол`}/>

      <main className="main">
        <div className="container">
          <div className="main_items">
            <ListSelected dishes={dishes} setDishes={setDishes} />

            {viewCategory ? (
              <ListCategory />
            ) : (
              <ListDishes
                setViewCategory={setViewCategory}
                setDishes={setDishes}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
