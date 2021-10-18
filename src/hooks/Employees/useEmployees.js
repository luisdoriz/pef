import { useEffect, useState } from "react";
import { notification } from "antd";
import getEmployees from "../../data/employees";

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
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployees();
      console.log(response);
    };
    fetchEmployees();
  });

  return {
    addEmployeVisible,
    setAddEmployeVisible,
    editEmployeVisible,
    setEditEmployeVisible,
    employee,
    setCurrentEmployee,
    employees,
  };
};

export default useEmployees;
