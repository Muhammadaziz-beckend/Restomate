import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { create } from "zustand";

import Config from "./data.jsx";
import Get from "./routes/get.js";
import useStore from "./store.jsx";

const Base = () => {
  const { id_tl } = useParams();
  const location = useLocation();

  const { token, isAdminUser } = Config();

  const [idCategoryIsSelect, setCategoryIsSelect] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tables, setTables] = useState([]);
  const {
    listSelect,
    setListSelect,

    searchQuery,
    setSearchQuery,

    viewCategory,
    setViewCategory,

    ordersAdmin,
    setOrdersAdmin,
  } = useStore();
  // const [selectOrder, setSelectOrder] = useState(null);

  const buildQuery = (base, params) => {
    const query = new URLSearchParams(params).toString();
    return `${base}?${query}`;
  };

  const getOrder = () => {
    Get(`orders/?table=${id_tl}&is_paid=false`, token).then((r) => {
      if (r?.status === 200) {
        setListSelect(r?.data);
      }
    });
  };

  useEffect(() => {
    if (location.pathname === "/") {
      Get("tables/", token).then((r) => {
        if (r?.status === 200) {
          setTables(r?.data);
        }
      });
    }

    if (id_tl) {
      getOrder();

      Get("category/", token).then((r) => {
        if (r?.status === 200) {
          setCategories(r?.data);
        }
      });
    }
  }, [id_tl]);

  const setCategoryId = (id = 0, view = true) => {
    setCategoryIsSelect(id);
    setViewCategory(view);
  };

  useEffect(() => {
    if (idCategoryIsSelect != 0 || searchQuery) {
      const categoryName = categories.find(
        (item) => item.id === idCategoryIsSelect
      )?.id;

      const url = buildQuery("dishes/", {
        category: categoryName || "",
        search: searchQuery,
      });

      console.log(url);

      Get(url, token).then((r) => {
        if (r?.status === 200) {
          setDishes(r?.data);
        }
      });
    }
  }, [idCategoryIsSelect, searchQuery, viewCategory]);

  return {
    viewCategory,
    setViewCategory,

    dishes,
    setDishes,

    tables,
    setTables,

    listSelect,
    setListSelect,

    categories,
    setCategories,

    idCategoryIsSelect,
    setCategoryIsSelect,
    setCategoryId,

    // selectOrder,
    // setSelectOrder,

    searchQuery,
    setSearchQuery,

    ordersAdmin,
    setOrdersAdmin,

    getOrder,
  };
};

export default Base;
