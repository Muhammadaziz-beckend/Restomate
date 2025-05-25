import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Post from "../utils/routes/post.js";

import Data from "../utils/data.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = Data();
  const [loading, setLoading] = useState(false);

  const handelSubmit = () => {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (!formData.get("username")) {
      return toast.error("Имя не было указен!");
    } else if (!formData.get("password")) {
      return toast.error("Пароль не было указен!");
    }

    Post("auth/login", formData).then((r) => {
        console.log(r?.data);
        if (r?.status === 200 || r?.status === 201) {
            setToken(r?.data)
        navigate("/");
      } else {
        console.log(r?.data);

        toast.error("Что-то пошло не так!");
      }
    });
  };

  return (
    <>
      <form method="post" className="form_auth" onSubmit={handelSubmit}>
        <div className="container">
          <h2>Login</h2>

          <label className="label_form">
            <input type="text" placeholder="Имя" name="username" required />
          </label>

          <label className="label_form">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              required
            />
          </label>

          {loading ? (
            <img src={loading_gif} alt="loading" />
          ) : (
            <button className="btn" type="submit">
              Войти
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
