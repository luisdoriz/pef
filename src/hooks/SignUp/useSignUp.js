import { useState } from "react";
import { notification } from "antd";
import { createUser } from "../../data/user";

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [sendToLogin, setSendToLogin] = useState(false);
  const postUser = async (data) => {
    setLoading(true);
    const { status } = await createUser(data);
    console.log(status);
    if (status === 201) {
      openNotification(
        "success",
        "Listo",
        "¡Su cuenta ha sido creada correctamente!"
      );
      setSendToLogin(true);
    } else if (status === 409) {
      openNotification("error", "Error", "El correo que envio ya existe.");
    } else {
      openNotification(
        "error",
        "Error",
        "Error interno favor de intentar mas tarde."
      );
    }
    setLoading(false);
  };
  return { loading, postUser, sendToLogin };
};

export default useSignUp;
