import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Get from "./routes/get.js";

const Base = () => {
  const { id } = useParams();
  const location = useLocation();

  const [viewCategory, setViewCategory] = useState(true);
  const [dishes, setDishes] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    if (location.pathname === "/") {
      Get("tables/").then((r) => {
        if (r?.status === 200) {
          setTables(r?.data);
        }
      });
    }
  }, [id]);

  return {
    viewCategory,
    setViewCategory,
    dishes,
    setDishes,
    tables,
    setTables,
  };
};

export default Base;
