import { useState, useContext } from "react";
import Context from "../../contexts/mainContext";
import { sendLogin } from "../../data/user";
import { notification } from 'antd';

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { mainDispatch } = useContext(Context.Consumer);
  const postLogin = async (data) => {
    setLoading(true);
    const response = await sendLogin(data);
    if (response !== 400) {
      mainDispatch({ type: "LOGIN", payload: { token: response } });
    }
    else {
      openNotification(
        "error",
        "Contraseña o email no válido",
        "Revisa tu correo y/o contraseña"
      );
    }
    setLoading(false);
  };
  return { loading, postLogin };
};

export default useLogin;
