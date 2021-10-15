import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row } from 'antd';

import { EmployeeList, AddEmployee, EditEmployee } from "../../components/employees";
import useEmployees from '../../hooks/Employees';

const EmployeesView = () => {
  const {employees, setEmployees } = useEmployees()
  const [addEmployeVisible, setAddEmployeVisible] = useState(false)
  const [editEmployeVisible, setEditEmployeVisible] = useState(false)
  const [employee, setCurrentEmployee] = useState(null)
  const facilities = [
    {
      name: "Edificio 1",
      id: 1,
    },
    {
      name: "Edificio 2",
      id: 2,
    }
  ]

  const editEmployee = (prop) => {
    setCurrentEmployee(prop)
    setEditEmployeVisible(true)
  }

  const onCloseEditEmployee = () => {
    setEditEmployeVisible(!editEmployeVisible)
    setCurrentEmployee(null)
  }
  return (
    <>
      <PageHeader
        onBack={null}
        title="Configuracion"
        subTitle="Empleados" />
      <AddEmployee
        setEmployees={(e) => setEmployees([e, ...employees])}
        facilities={facilities}
        visible={addEmployeVisible}
        onClose={() => setAddEmployeVisible(!addEmployeVisible)}
      />
      <EditEmployee
        employee={employee}
        facilities={facilities}
        visible={editEmployeVisible}
        onClose={() => onCloseEditEmployee()}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddEmployeVisible(!addEmployeVisible)}
        >
          Agregar
        </Button>
      </Row>
      <EmployeeList
        employees={employees}
        facilities={facilities}
        editEmployee={editEmployee}
      />
    </>
  )
}

export default EmployeesView
