import api from "./api.js";

const Delete = async (url, token = null) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`, // Добавляем токен в заголовок
    },
  };
  try {
    const res = await api.delete(url, token ? config : "");

    return res;
  } catch (e) {
    console.log("Ошибка при", e);
    return e
  }
};

export default Delete;