import { useEffect, useState } from "react";
import { getActiveCases, postCase, deleteCase, putInactiveCase } from "../../data/cases";
import { notification } from "antd";

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

export const useCases = (idCase) => {
  const [activeCases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveCases = async () => {
      const response = await getActiveCases();
      setCases(response.data);
      setLoading(false)
    };
    if (activeCases.length === 0 && loading){
      fetchActiveCases();
    }
  },[activeCases, loading]);

  const postActiveCase = async (body) => {
    const { status } = await postCase(body);
    setLoading(true);
    setCases([])
    if (status === 201) {
      openNotification(
        "success",
        "Listo",
        "El caso fue creado con éxito"
      );
    } else {
      openNotification(
        "error",
        "Error",
        "Error interno favor de intentar más tarde."
      );
    }
  }

  const deleteActiveCase = async (body) => {
    const { status } = await deleteCase(body);
    setLoading(true);
    setCases([])
    if (status === 200) {
      openNotification(
        "success",
        "Listo",
        "El caso fue borrado con éxito"
      );
    } else {
      openNotification(
        "error",
        "Error",
        "Error interno favor de intentar más tarde."
      );
    }
  }

  const setInactiveCase = async (body) => {
    const status  = await putInactiveCase(body);
    setLoading(true);
    setCases([]);
  }
  
  return {
    activeCases,
    setCases,
    postActiveCase,
    deleteActiveCase,
    loading,
    setInactiveCase
  };
};

export default useCases;