/* eslint-disable no-unused-vars */
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

  // const postUser = async (body) => {
  //   const { status } = await createUser(body);
  //   setLoading(true);
  //   setUsers([]);
  // }

  const deleteVisitor = async ({ idVisitor }) => {
    const status = await removeVisitor(idVisitor);
    setLoading(true);
    setVisitors([])
  };

  // const editUser = async (body) => {
  //   const { status } = await putUser(body);
  //   setLoading(true);
  //   setUsers([]);
  // }

  return {
    visitors,
    loading,
    deleteVisitor,
  };
};

export default useVisitors;
