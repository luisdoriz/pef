import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row, notification } from 'antd';
import { AddOrganization, OrganizationsList, EditOrganization } from "../../components/organizations";
import { useOrganizations } from '../../hooks';

const OrganizationsView = () => {
  const { organizations, createOrganization, editOrganization, removeOrganization, loading } = useOrganizations();
  const [addOrganizationVisible, setAddOrganizationVisible] = useState(false)
  const [editOrganizationVisible, setEditOrganizationVisible] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState(null)

  const openNotification = (type, title, message) =>
    notification[type]({
      message: title,
      description: message,
    });

  const setEditOrganization = (prop) => {
    setSelectedOrganization(prop) 
    setEditOrganizationVisible(true)
  }

  const addOrganization = (prop) => {
    createOrganization(prop);
  }

  const printError = () => {
    openNotification(
      "error",
      "Nombre no válido",
      "El nombre que ingresó ya existe"
    );
  }


  return (
    <>
      <PageHeader
        onBack={null}
        title="Organizaciones"
      />
      <AddOrganization
        addOrganization={addOrganization}
        visible={addOrganizationVisible}
        onClose={() => setAddOrganizationVisible(false)}
        organizations={organizations}
        printError={printError}
      />
      <EditOrganization
        editOrganization={editOrganization}
        visible={editOrganizationVisible}
        onClose={() => setEditOrganizationVisible(false)}
        organizations={organizations}
        printError={printError}
        removeOrganization={removeOrganization}
        selectedOrganization={selectedOrganization}
        setEditOrganizationVisible={setEditOrganizationVisible}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddOrganizationVisible(true)}
        >
          Agregar
        </Button>
      </Row>
      <OrganizationsList
        organizations={organizations}
        loading={loading}
        editOrganization={setEditOrganization}
      />
    </>
  )
}

export default OrganizationsView
