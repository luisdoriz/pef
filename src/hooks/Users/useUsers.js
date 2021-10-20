import { useEffect, useState } from "react";
import { getUsers, getRoles, createUser, deleteUser, putUser } from "../../data/user";
import { notification } from "antd";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers(); 
      setUsers(response.data.users);
      setLoading(false);
    };
    if (users.length === 0 && loading){
      fetchUsers();
      fetchRoles();
    }
  },[users, loading]);

  const fetchRoles = async () => {
    const response = await getRoles();
    setRoles(response.data.roles);
  };

  const postUser = async (body) => {
    const { status } = await createUser(body);
    setLoading(true);
    setUsers([]);
  }

  const removeUser = async (body) => {
    const  status  = await deleteUser(body);
    setLoading(true);
    setUsers([])
  }

  const editUser = async (body) => {
    const { status } = await putUser(body);
    setLoading(true);
    setUsers([]);
  }
  
  return {
    users,
    setUsers,
    postUser,
    roles,
    removeUser,
    editUser
  };
};

export default useUsers;