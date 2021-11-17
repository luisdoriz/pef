import { useState, useContext } from "react";
import axios from "axios";
import { getUser } from "../../data/user";
import Context from "../../contexts/mainContext";
import getFacilities from "../../data/facilities";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const { mainDispatch, mainData } = useContext(Context.Consumer);
  const { auth, user, facilities } = mainData;
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common.Authorization = token;
      const {
        status,
        data: { data },
      } = await getUser();
      if (status === 200) {
        const { data: facilities } = await getFacilities();
        mainDispatch({
          type: "CHECK_AUTH",
          payload: { user: data.user, facilities },
        });
        setLoading(false);
        return true;
      }
    }
    mainDispatch({ type: "LOGOUT" });
    setLoading(false);
    return false;
  };
  return { loading, checkAuth, auth, user, facilities};
};

export default useAuth;
