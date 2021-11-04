import { useEffect, useState } from "react";
import { getEmployees, createEmployee, getPrivilegeLevel, putEmployee, deleteEmployee, postPrivilegeLevel, putPrivilegeLevel, deletePrivilegeLevel } from "../../data/employees";
import { postBeacon } from "../../data/beacons";
import { notification } from "antd";

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

export const useEmployees = (idFacility) => {
  const [facilities, setFacilities] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [privilegeLevels, setPrivilegeLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployees();
      setEmployees(response.data);
      setLoading(false)
    };
    if (employees.length === 0 && loading){
      fetchEmployees();
      fetchPrivilegeLevels();
    }
  },[employees, loading]);

  useEffect(() => {
    fetchPrivilegeLevels()
  },[idFacility]);

  const fetchPrivilegeLevels = async () => {
    const response = await getPrivilegeLevel(idFacility);
    setPrivilegeLevels(response.data)

  }

  const postNewEmployee = async (body) => {
    const response = await postBeacon({macAddress:body.macAddress, idFacility: body.idFacility});
    const status = await createEmployee({idBeacon: response.idBeacon, ...body});
    setLoading(true);
    setEmployees([])
    if (status === 201) {
      openNotification(
        "success",
        "Listo",
        "El empleado fue agregado con éxito"
      );
    } else {
      openNotification(
        "error",
        "Error",
        "Error interno favor de intentar mas tarde."
      );
    }
  }

  const editEmployee = async (body) => {
    const status  = await putEmployee(body);
    setLoading(true);
    setEmployees([]);
  }

  const removeEmployee = async (body) => {
    const  status  = await deleteEmployee(body);
    setLoading(true);
    setEmployees([])
  }

  const createPrivilegeLevel = async (body) => {
    const status = await postPrivilegeLevel(body);
    setLoading(true);
    setEmployees([])
  }

  const editPrivilegeLevel = async (body) => {
    const status  = await putPrivilegeLevel(body);
    setLoading(true);
    setEmployees([]);
  }

  const removePrivilegelevel = async (body) => {
    const  status  = await deletePrivilegeLevel(body);
    setLoading(true);
    setEmployees([])
  }

  return {
    employees,
    facilities,
    setFacilities,
    privilegeLevels,
    postNewEmployee,
    editEmployee,
    removeEmployee,
    loading,
    createPrivilegeLevel,
    editPrivilegeLevel,
    removePrivilegelevel
  };
};

export default useEmployees;
