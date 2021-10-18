import { useEffect, useState } from "react";
import { getActiveCases, postCase, deleteCase } from "../../data/cases";
import { notification } from "antd";

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

export const useCases = () => {
  const [aCases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveCases = async () => {
      const response = await getActiveCases();
      setCases(response.data);
      setLoading(false)
    };
    if (aCases.length === 0 && loading)
      fetchActiveCases();
  },[aCases, loading]);

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
    aCases,
    setCases,
    postActiveCase,
    deleteActiveCase
  };
};

export default useCases;