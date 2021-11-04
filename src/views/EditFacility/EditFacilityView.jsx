import React from 'react'
import { useState } from 'react';
import { PageHeader, Row, Button, Col } from 'antd';
import { AreasList, EditArea, GatewaysList, EditGateway, AddGateway, RolesList, EditRole, AddRole } from "../../components/facilities";
import useFacility from '../../hooks/Facilities/useFacility';
import { useHistory, useParams } from "react-router-dom";
import { BeaconsList, AddBeacon } from "../../components/beacons";
import useBeacons from '../../hooks/Beacons';
import useEmployees from '../../hooks/Employees';

const EditFacilityView = () => {
    let history = useHistory();
    let { idFacility } = useParams();
    const { beacons, removeBeacon, createBeacon, loading: loadingBeacons } = useBeacons(idFacility);
    const { areas, editArea, gateways, createGateway, editGateway, removeGateway, loading: loadingAreas} = useFacility(idFacility);
    const { privilegeLevels, loading: loadingRoles, createPrivilegeLevel, editPrivilegeLevel, removePrivilegelevel} = useEmployees(idFacility);
    const [area, setArea] = useState(null);
    const [editAreaVisible, setEditAreaVisible] = useState(false)
    const [role, setRole] = useState(null);
    const [editRoleVisible, setEditRoleVisible] = useState(false)
    const [gateway, setGateway] = useState(null);
    const [editGatewayVisible, setEditGatewayVisible] = useState(false)
    const [addGatewayVisible, setAddGatewayVisible] = useState(false)
    const [addBeaconVisible, setAddBeaconVisible] = useState(false)
    const [addRoleVisible, setAddRoleVisible] = useState(false)

    const setEditArea = (prop) => {
        setArea(prop)
        setEditAreaVisible(true)
    }

    const setEditGateway = (prop) => {
        setGateway(prop)
        setEditGatewayVisible(true)
    }

    const setEditRole = (prop) => {
        setRole(prop)
        setEditRoleVisible(true)
    }

    const addGateway = (prop) => {
        createGateway(prop);
    }

    const addBeacon = (prop) => {
        createBeacon({...prop, idFacility: idFacility});
    }

    const addRole = (prop) => {
        createPrivilegeLevel({...prop, idFacility: idFacility})
    }

    const deleteBeacon = (prop) => {
        removeBeacon({idBeacon: prop.idBeacon})
    }

    return (
    <>
        <PageHeader
            onBack={null}
            title="Editar"
            subTitle="Edificio" 
            onBack={() => history.goBack()}
        />
        <EditArea
            area={area}
            visible={editAreaVisible}
            onClose={() => setEditAreaVisible(!editAreaVisible)}
            // removeArea={removeArea}
            editArea={editArea}
            setEditAreaVisible={setEditAreaVisible}
        />
        <EditGateway
            area={gateway}
            visible={editGatewayVisible}
            onClose={() => setEditGatewayVisible(!editGatewayVisible)}
            removeGateway={removeGateway}
            editGateway={editGateway}
            setEditGatewayVisible={setEditGatewayVisible}
        />
        <EditRole
            areas={areas}
            role={role}
            visible={editRoleVisible}
            onClose={() => setEditRoleVisible(!editRoleVisible)}
            removeRole={removePrivilegelevel}
            setEditRoleVisible={setEditRoleVisible}
            editRole={editPrivilegeLevel}
        />
        <AddGateway 
            addGateway={addGateway}
            visible={addGatewayVisible}
            onClose={() => setAddGatewayVisible(!addGatewayVisible)}
        />
        <AddBeacon 
            addBeacon={addBeacon}
            visible={addBeaconVisible}
            onClose={() => setAddBeaconVisible(!addBeaconVisible)}
        />
        <AddRole 
            addRole={addRole}
            visible={addRoleVisible}
            onClose={() => setAddRoleVisible(!addRoleVisible)}
            areas={areas}
        />
        <Row gutter={8} justify="space-between">
            <Col span={11}>
                <h3>Áreas</h3>
                <AreasList 
                    areas={areas}
                    editArea={setEditArea}
                    loading={loadingAreas}
                />
            </Col>
            <Col span={11}>
                <h3>Roles</h3>
                <Row justify="end">
                <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={() => setAddRoleVisible(!addRoleVisible)}
                    >
                    Agregar
                </Button>
            </Row>
                <RolesList
                    roles={privilegeLevels}
                    loading={loadingRoles}
                    editRole={setEditRole}
                />
            </Col>
        </Row>
        <Row gutter={8} justify="space-between">
            <Col span={11}>
            <h3>Gateways</h3>
            <Row justify="end">
                <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={() => setAddGatewayVisible(!addGatewayVisible)}
                    >
                    Agregar
                </Button>
            </Row>
            <GatewaysList 
                gateways={gateways}
                editGateway={setEditGateway}
                loading={loadingAreas}
            />
            </Col>
            <Col span={11}>
            <h3>Beacons</h3>
            <Row justify="end">
                <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={() => setAddBeaconVisible(!addBeaconVisible)}
                    >
                    Agregar
                </Button>
            </Row>
            <BeaconsList
                beacons={beacons}
                deleteBeacon={deleteBeacon}
                loading={loadingBeacons}
            />
            </Col>
        </Row>
    </>
  )
}

export default EditFacilityView
