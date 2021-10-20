import { useEffect, useState } from "react";
import {createEmployee, getEmployees, getPrivilegeLevel} from "../../data/employees";
import { notification } from "antd";

const openNotification = (type, title, message) =>
  notification[type]({
    message: title,
    description: message,
  });

export const useEmployees = () => {
  const [addEmployeVisible, setAddEmployeVisible] = useState(false);
  const [editEmployeVisible, setEditEmployeVisible] = useState(false);
  const [employee, setCurrentEmployee] = useState(null);
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

  const fetchPrivilegeLevels = async () => {
    const response = await getPrivilegeLevel();
    setPrivilegeLevels(response.data)

  }
  const postNewEmployee = async (body) => {
    const { status } = await createEmployee(body);
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

  return {
    addEmployeVisible,
    setAddEmployeVisible,
    editEmployeVisible,
    setEditEmployeVisible,
    employee,
    setCurrentEmployee,
    employees,
    setEmployees,
    privilegeLevels,
    postNewEmployee
  };
};

export default useEmployees;
