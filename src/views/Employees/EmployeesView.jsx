import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row, Col } from 'antd';

import { EmployeeList, AddEmployee, EditEmployee } from "../../components/employees";
const initialEmployees = [
  // {
  //   name: "Juan Perez",
  //   internalId: "1231",
  //   facilityId: 1,
  //   facilityName: "Edificio 1"
  // },
  // {
  //   name: "Jaime Lopez",
  //   internalId: "1234",
  //   facilityId: 1,
  //   facilityName: "Edificio 1"
  // },
  // {
  //   name: "Luis Gonzalez",
  //   internalId: "123331",
  //   facilityId: 2,
  //   facilityName: "Edificio 2"
  // },
  // {
  //   name: "Juan 10x",
  //   internalId: "12234532431",
  //   facilityId: 2,
  //   facilityName: "Edificio 2"
  // },
]
const EmployeesView = () => {
  const [addEmployeVisible, setAddEmployeVisible] = useState(false)
  const [editEmployeVisible, setEditEmployeVisible] = useState(false)
  const [employee, setCurrentEmployee] = useState(null)
  const [employees, setEmployees] = useState(initialEmployees)
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
