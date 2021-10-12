import { useState, useContext } from "react";
import Context from "../../contexts/mainContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { mainDispatch } = useContext(Context.Consumer);
  const postLogin = async (data) => {
    setLoading(true);
    mainDispatch({ type: "LOGIN" });
    localStorage.setItem("token", true);
    setLoading(false);
  };
  return { loading, postLogin };
};

export default useLogin;
