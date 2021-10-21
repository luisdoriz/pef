import { useState, useContext } from "react";
import axios from "axios";
import { getUser } from "../../data/user";
import Context from "../../contexts/mainContext";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const { mainDispatch, mainData } = useContext(Context.Consumer);
  const { auth, user} = mainData;
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common.Authorization = token;
      const { status, data } = await getUser();
      if (status === 200) {
        mainDispatch({  type: "CHECK_AUTH", payload: data.data.users[4]});
        setLoading(false);
        return true;
      }
    }
    mainDispatch({ type: "LOGOUT" });
    setLoading(false);
    return false;
  };
  return { loading, checkAuth, auth, user };
};

export default useAuth;
