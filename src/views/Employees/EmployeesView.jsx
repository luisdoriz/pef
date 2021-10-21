import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row } from 'antd';

import { EmployeeList, AddEmployee, EditEmployee } from "../../components/employees";
import useEmployees from '../../hooks/Employees';
import useFacilities from '../../hooks/Facilities';

const EmployeesView = () => {
  const { employees, privilegeLevels, postNewEmployee, editEmployee, removeEmployee } = useEmployees();
  const { facilities } = useFacilities();
  const [addEmployeeVisible, setAddEmployeeVisible] = useState(false)
  const [editEmployeeVisible, setEditEmployeeVisible] = useState(false)
  const [employee, setCurrentEmployee] = useState(null);
  const setEditEmployee = (prop) => {
    setCurrentEmployee(prop)
    setEditEmployeeVisible(true)
  }

  const onCloseEditEmployee = () => {
    setEditEmployeeVisible(!editEmployeeVisible)
    setCurrentEmployee(null)
  }

  const addEmployee = (prop) => {
    postNewEmployee(prop);
  }

  const modifyEmployee = (prop) => {
    editEmployee(prop);
  }

  return (
    <>
      <PageHeader
        onBack={null}
        title="Configuracion"
        subTitle="Empleados" />
      <AddEmployee
        addEmployee={addEmployee}
        facilities={facilities}
        visible={addEmployeeVisible}
        onClose={() => setAddEmployeeVisible(!addEmployeeVisible)}
        roles={privilegeLevels}
      />
      <EditEmployee
        employee={employee}
        facilities={facilities}
        visible={editEmployeeVisible}
        onClose={() => onCloseEditEmployee()}
        roles={privilegeLevels}
        modifyEmployee={modifyEmployee}
        removeEmployee={removeEmployee}
        setEditEmployeeVisible={setEditEmployeeVisible}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddEmployeeVisible(!addEmployeeVisible)}
        >
          Agregar
        </Button>
      </Row>
      <EmployeeList
        employees={employees}
        facilities={facilities}
        editEmployee={setEditEmployee}
        roles={privilegeLevels}
      />
    </>
  )
}

export default EmployeesView
