/* eslint-disable no-unused-vars */
import { notification } from "antd";
import { useEffect, useState } from "react";
import { getVisitors, removeVisitor } from "../../data/visitors";

export const useVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getVisitors();
      setVisitors(data);
      setLoading(false);
    };
    if (visitors.length === 0 && loading) {
      fetchUsers();
    }
  }, [visitors, loading]);

  const deleteVisitor = async ({ idVisitor }) => {
    const status = await removeVisitor(idVisitor);
    notification.success({
      message: "Éxito",
      description: "Se eliminó la visita con éxito."
    })
    setLoading(true);
    setVisitors([]);
  };

  const fetchVisitors = async () => {
    setLoading(true);
    setVisitors([]);
  };

  return {
    visitors,
    loading,
    deleteVisitor,
    fetchVisitors,
  };
};

export default useVisitors;
