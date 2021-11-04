import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row } from 'antd';
import useBeacons from '../../hooks/Beacons';
import { EmployeeList, AddEmployee, EditEmployee } from "../../components/employees";
import useEmployees from '../../hooks/Employees';
import useFacilities from '../../hooks/Facilities';

const EmployeesView = () => {
  const { facilities } = useFacilities();
  const [selectedFacility, setSelectedFacility] = useState(null)
  const { employees, privilegeLevels, postNewEmployee, editEmployee, removeEmployee, loading:loadingEmployees } = useEmployees();
  const { beacons } = useBeacons()
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
        title="Configuración"
        subTitle="Empleados" />
      <AddEmployee
        addEmployee={addEmployee}
        facilities={facilities}
        visible={addEmployeeVisible}
        onClose={() => setAddEmployeeVisible(!addEmployeeVisible)}
        privilegeLevels={privilegeLevels}
        beacons={beacons}
        setSelectedFacility={setSelectedFacility}
        selectedFacility={selectedFacility}
      />
      <EditEmployee
        employee={employee}
        facilities={facilities}
        visible={editEmployeeVisible}
        onClose={() => onCloseEditEmployee()}
        privilegeLevels={privilegeLevels}
        modifyEmployee={modifyEmployee}
        removeEmployee={removeEmployee}
        setEditEmployeeVisible={setEditEmployeeVisible}
        beacons={beacons}
        setSelectedFacility={setSelectedFacility}
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
        privilegeLevels={privilegeLevels}
        loading={loadingEmployees}
      />
    </>
  )
}

export default EmployeesView
