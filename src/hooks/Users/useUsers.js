/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getUsers, getRoles, createUser, deleteUser, putUser, getAdmins } from "../../data/user";
import { notification } from 'antd';

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

export const useUsers = (idOrganization) => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data.users);
      setLoading(false);
    };
    if (users.length === 0 && loading) {
      fetchUsers();
      fetchRoles();
      fetchAdmins();
    }
  }, [users, loading, idOrganization]);

  const fetchRoles = async () => {
    const response = await getRoles();
    setRoles(response.data.roles);
  };

  const fetchAdmins = async () => {
    if (idOrganization) {
      const response = await getAdmins(idOrganization);
      setAdmins(response.data.admins);
      setLoading(false);
    }
  };

  const postUser = async (body) => {
    const status = await createUser(body);
    if (status.status === 409) {
      openNotification(
        "error",
        "Correo no válido",
        "El correo que ingresó ya existe"
      );
    }
    else {
      setLoading(true);
      setUsers([]);
    }

  }

  const removeUser = async (body) => {
    const status = await deleteUser(body);
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
    admins,
    setUsers,
    postUser,
    roles,
    removeUser,
    editUser,
    loading
  };
};

export default useUsers;