import { useEffect, useState } from "react";
import { getActiveCases, postCase, deleteCase } from "../../data/cases";
import { notification } from "antd";

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

export const useCases = () => {
  const [activeCases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveCases = async () => {
      const response = await getActiveCases();
      setCases(response.data);
      setLoading(false)
    };
    if (activeCases.length === 0 && loading)
      fetchActiveCases();
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
        "Error interno favor de intentar mas tarde."
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
        "Error interno favor de intentar mas tarde."
      );
    }
  }
  
  return {
    activeCases,
    setCases,
    postActiveCase,
    deleteActiveCase,
    loading
  };
};

export default useCases;