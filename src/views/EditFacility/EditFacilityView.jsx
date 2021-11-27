import React, { useState } from 'react';
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
    const { areas, editArea, loading: loadingAreas } = useFacility(idFacility);
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
    const [selectedGateways, setSelectedGateways] = useState([])

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
        const selectedArea = areas.filter((room) => room.idArea === prop);
        setAreaPoints(selectedArea[0].vertices[0]);
        const gatewaysInArea = gateways.filter((gateway) => gateway.idArea === selectedArea[0].idArea);
        setSelectedGateways(gatewaysInArea);
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
                setSelectedGateways([])
                setNewGateway(null);
                setEditing(false);
                setGateway(null)
                setGatewayPosition(null);
            }
        });
    }

    const printNameError = () => {
        openNotification(
            "error",
            "Nombre no válido",
            "El nombre que ingresó ya existe"
        );
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
                                gateways={selectedGateways}
                                editing={editing}
                            />
                        </Col>
                        <Col span={6}>
                            <div style={{ paddingTop: 20 }}>
                                <h4>Da click en el punto donde desee colocar el gateway.</h4>
                                <h4> Solo se muestra el área que seleccionó, no todo el edificio.</h4>
                                <div style={{ display: 'flex', alignItems: "center" }}>
                                    <span style={{ height: "15px", width: "15px", backgroundColor: "#31327A", borderRadius: "50%", display: 'inline-block' }}>
                                    </span>
                                    <h4 style={{ paddingLeft: 10 }}>Gateways existentes</h4>
                                </div>
                                <div style={{ display: 'flex', alignItems: "center" }}>
                                    <span style={{ height: "15px", width: "15px", backgroundColor: "#2A96C1", borderRadius: "50%", display: 'inline-block' }}>
                                    </span>
                                    <h4 style={{ paddingLeft: 10 }}>Gateway nuevo</h4>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </>
                :
                <>
                    <PageHeader
                        title="Editar"
                        subTitle={areas && areas.length > 0 ? areas[0].facilityName : ''}
                        onBack={() => history.goBack()}
                    />
                    <EditArea
                        area={area}
                        visible={editAreaVisible}
                        onClose={() => setEditAreaVisible(!editAreaVisible)}
                        editArea={editArea}
                        setEditAreaVisible={setEditAreaVisible}
                        areas={areas}
                        printError={printNameError}
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
                        privilegeLevels={privilegeLevels}
                        printError={printNameError}
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
                        registering={false}
                    />
                    <AddBeacon
                        addBeacon={addBeacon}
                        visible={addBeaconVisible}
                        onClose={() => setAddBeaconVisible(!addBeaconVisible)}
                        beacons={beacons}
                        printError={printError}
                    />
                    <AddRole
                        addRole={addRole}
                        visible={addRoleVisible}
                        onClose={() => setAddRoleVisible(!addRoleVisible)}
                        areas={areas}
                        privilegeLevels={privilegeLevels}
                        printError={printNameError}
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
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Roles</h3>
                                <Button
                                    type="primary"
                                    size="large"
                                    shape="round"
                                    onClick={() => setAddRoleVisible(!addRoleVisible)}
                                >
                                    Agregar
                                </Button>
                            </div>
                            <RolesList
                                roles={privilegeLevels}
                                loading={loadingRoles}
                                editRole={setEditRole}
                                idFacility={idFacility}
                            />
                        </Col>
                    </Row>
                    <Row gutter={8} justify="space-between">
                        <Col span={11}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Gateways</h3>
                                <Button
                                    type="primary"
                                    size="large"
                                    shape="round"
                                    onClick={() => setAddGatewayVisible(!addGatewayVisible)}
                                >
                                    Agregar
                                </Button>
                            </div>
                            <GatewaysList
                                gateways={gateways}
                                editGateway={setEditGateway}
                                loading={loadingAreas}
                            />
                        </Col>
                        <Col span={11}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Beacons disponibles</h3>
                                <Button
                                    type="primary"
                                    size="large"
                                    shape="round"
                                    onClick={() => setAddBeaconVisible(!addBeaconVisible)}
                                >
                                    Agregar
                                </Button>
                            </div>
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
