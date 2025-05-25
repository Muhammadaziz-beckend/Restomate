import { useEffect } from "react";
import Base from "../../utils/base";

const ListCategory = ({ setCategoryId }) => {
  const {
    categories,
    viewCategory,
    setViewCategory,
    idCategoryIsSelect,
    setCategoryIsSelect,
  } = Base();

  return (
    <div className="blok_categories">
      {categories.map((item) => (
        <div
          className="blok_category"
          key={item?.id}
          onClick={() => setCategoryId(item?.id, false)}
        >
          <div className="title">{item?.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ListCategory;
