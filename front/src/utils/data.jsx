const Config = () => {
    const user = localStorage.getItem("userToken");

  const get_user_token = () => {
    if (typeof user === "string") {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser?.info?.token; 
      } catch (error) {
        console.error("Error parsing user token from localStorage:", error);
        return null;
      }
    }

    return user?.info?.token;
  };

  const setToken = (token) => {
    try {
      localStorage.setItem("userToken", JSON.stringify({ info: token }));
      return token; 
    } catch (error) {
      console.error("Error setting token to localStorage:", error);
      return null;
    }
  };

  const isAdminUser = () => {
    if (typeof user === "string") {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser?.info?.role; 
      } catch (error) {
        console.error("Error parsing user role from localStorage:", error);
        return null;
      }
    }

    return user?.info?.role;
  }

  // get in .env
  const apiUrl = import.meta.env.VITE_API;

  return {
    url: apiUrl,
    token: get_user_token(),
    setToken,
    isAdminUser,
  };
};


export default Config