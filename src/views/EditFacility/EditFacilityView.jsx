import React from 'react'
import { useState } from 'react';
import { PageHeader, Row, Button, Col, Modal, notification } from 'antd';
import { AreasList, EditArea, GatewaysList, EditGateway, AddGateway, RolesList, EditRole, AddRole, GatewaysMap } from "../../components/facilities";
import useFacility from '../../hooks/Facilities/useFacility';
import useGateways from '../../hooks/Gateways';
import { useHistory, useParams } from "react-router-dom";
import { BeaconsList, AddBeacon } from "../../components/beacons";
import useBeacons from '../../hooks/Beacons';
import useEmployees from '../../hooks/Employees';
import { WarningOutlined } from '@ant-design/icons';

const { confirm } = Modal

const EditFacilityView = () => {
    let history = useHistory();
    let { idFacility } = useParams();
    const { beacons, removeBeacon, createBeacon, loading: loadingBeacons } = useBeacons(idFacility);
    const { gateways, createGateway, editGateway, removeGateway } = useGateways(idFacility);
    const { areas, editArea, loading: loadingAreas, removeArea } = useFacility(idFacility);
    const { privilegeLevels, loading: loadingRoles, createPrivilegeLevel, editPrivilegeLevel, removePrivilegelevel } = useEmployees(idFacility);
    const [area, setArea] = useState(null);
    const [editAreaVisible, setEditAreaVisible] = useState(false)
    const [role, setRole] = useState(null);
    const [editRoleVisible, setEditRoleVisible] = useState(false)
    const [gateway, setGateway] = useState(null);
    const [newGateway, setNewGateway] = useState(null)
    const [gatewayPosition, setGatewayPosition] = useState(null)
    const [editGatewayVisible, setEditGatewayVisible] = useState(false)
    const [addGatewayVisible, setAddGatewayVisible] = useState(false)
    const [addBeaconVisible, setAddBeaconVisible] = useState(false)
    const [addRoleVisible, setAddRoleVisible] = useState(false)
    const [addGatewaysPositionsVisible, setAddGatewaysPositionsVisible] = useState(false)
    const [areaPoints, setAreaPoints] = useState(null)
    const [editing, setEditing] = useState(false)

    const openNotification = (type, title, message) =>
        notification[type]({
            message: title,
            description: message,
        });

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

    const addGateway = () => {
        createGateway({ ...newGateway, ...gatewayPosition });
    }

    const defineArea = (prop) => {
        const selectedArea = areas.filter((room) => room.idArea === prop)
        setAreaPoints(selectedArea[0].vertices[0]);
    }

    const addBeacon = (prop) => {
        createBeacon({ ...prop, idFacility: idFacility });
    }

    const addRole = (prop) => {
        createPrivilegeLevel({ ...prop, idFacility: idFacility })
    }

    const deleteBeacon = (prop) => {
        removeBeacon({ idBeacon: prop.idBeacon })
    }

    const showConfirm = () => {
        confirm({
            title: "Confirmar posición de gateway",
            icon: <WarningOutlined />,
            onOk() {
                if (editing) {
                    editGateway({ ...gateway, ...gatewayPosition });
                }
                else {
                    addGateway();
                }
                setAddGatewaysPositionsVisible(false);
                setAreaPoints(null);
                setNewGateway(null);
                setEditing(false);
                setGateway(null)
                setGatewayPosition(null);
            }
        });
    }

    const printError = () => {
        openNotification(
            "error",
            "Dirección MAC no válida",
            "La dirección MAC que ingresó ya existe"
        );
    }

    return (
        <>
            {addGatewaysPositionsVisible ?
                <>
                    <PageHeader
                        onBack={null}
                        title={editing ? "Editar posición de gateway" : "Agregar gateway"}
                        onBack={() => {
                            setAddGatewaysPositionsVisible(false)
                            setNewGateway(null)
                            setGateway(null)
                            setGatewayPosition(null)
                        }}
                    />
                    <Row justify="end">
                        <Button
                            type="primary"
                            size="large"
                            shape="round"
                            onClick={showConfirm}
                            disabled={(gatewayPosition === null)}
                        >
                            Confirmar posición de gateway
                        </Button>
                    </Row>
                    <Row>
                        <Col span={18}>
                            <GatewaysMap
                                area={areaPoints}
                                sizeX={areas && areas.length > 0 ? areas[0].facilitySizeX : 0}
                                sizeY={areas && areas.length > 0 ? areas[0].facilitySizeY : 0}
                                gatewayPosition={gatewayPosition}
                                setGatewayPosition={setGatewayPosition}
                                gateways={gateways}
                                editing={editing}
                            />
                        </Col>
                    </Row>
                </>
                :
                <>
                    <PageHeader
                        onBack={null}
                        title="Editar"
                        subTitle={areas && areas.length > 0 ? areas[0].facilityName : ''}
                        onBack={() => history.goBack()}
                    />
                    <EditArea
                        area={area}
                        visible={editAreaVisible}
                        onClose={() => setEditAreaVisible(!editAreaVisible)}
                        removeArea={removeArea}
                        editArea={editArea}
                        setEditAreaVisible={setEditAreaVisible}
                    />
                    <EditGateway
                        visible={editGatewayVisible}
                        onClose={() => setEditGatewayVisible(false)}
                        areas={areas}
                        setGateway={setGateway}
                        setEditGatewayVisible={setEditGatewayVisible}
                        setAddGatewaysPositionsVisible={setAddGatewaysPositionsVisible}
                        defineArea={defineArea}
                        gateway={gateway}
                        removeGateway={removeGateway}
                        setEditing={setEditing}
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
                        visible={addGatewayVisible}
                        onClose={() => setAddGatewayVisible(false)}
                        areas={areas}
                        setNewGateway={setNewGateway}
                        setAddGatewayVisible={setAddGatewayVisible}
                        setAddGatewaysPositionsVisible={setAddGatewaysPositionsVisible}
                        defineArea={defineArea}
                        gateways={gateways}
                        printError={printError}
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
            }
        </>
    )
}

export default EditFacilityView
