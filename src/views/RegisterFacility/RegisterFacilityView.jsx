import React, { useState } from 'react'
import { PageHeader, Row, Button, Col, Modal, notification } from 'antd';
import { BluePrintMap, AddRoom, FacilitiesList, CurrentAreasList, AddFacility, AddGateway } from "../../components/facilities";
import useFacilities from '../../hooks/Facilities';
import { WarningOutlined } from '@ant-design/icons';
import useGateways from '../../hooks/Gateways';
import { mergeVertices } from "../../helpers/mergeVertices"

const { confirm } = Modal
const RegisterFacilityView = () => {
    const colors = [{ name: "Rojo", color: "#FF0000" }, { name: "Rosa", color: "#FF00FB" }, { name: "Azul oscuro", color: "#1B00FF" }, { name: "Azul claro", color: "#00E0FF" }, { name: "Naranja", color: "#FF9700" }, { name: "Verde", color: "#008C0D" }]
    const { facilities, createArea, loading, createFacility, removeFacility } = useFacilities();
    const { createGateway, gateways: existingGateways } = useGateways();
    const [points, setPoints] = useState({});
    const [walls, setWalls] = useState([]);
    const [createdFacility, setCreatedFacility] = useState({});
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [addRoomVisible, setAddRoomVisible] = useState(false);
    const [addFacilityVisible, setAddFacilityVisible] = useState(false);
    const [addGatewayVisible, setAddGatewayVisible] = useState(false);
    const [facilitySetupVisible, setFacilitySetupVisible] = useState(false);
    const [names, setNames] = useState([]);
    const [point, setCurrentPoint] = useState(null);
    const [addingGateways, setAddingGateways] = useState(false);
    const [gateways, setGateways] = useState([]);
    const [currentAreaId, setCurrentAreaId] = useState(null)

    const openNotification = (type, title, message) =>
        notification[type]({
            message: title,
            description: message,
        });

    const areEqual = (obj1, obj2) => {
        if (obj1 === null) {
            return false;
        }
        return (obj1.x === obj2.x && obj1.y === obj2.y)
    }

    const saveRoom = (values) => {
        let finalVertices = Object.values(currentRoom.vertices)
        let changed = true;
        while (changed) {
            let newVertices = [];
            let secondCounter = finalVertices.length - 1;
            let newLine;
            changed = false;
            for (let i = 0; i < (finalVertices.length); i++) {
                if (i < (finalVertices.length - 2)) {
                    newLine = mergeVertices([finalVertices[i], finalVertices[i + 1]], [finalVertices[i + 1], finalVertices[i + 2]])
                }
                else {
                    if (secondCounter === finalVertices.length) {
                        secondCounter = 0;
                    }
                    newLine = mergeVertices([finalVertices[i], finalVertices[secondCounter]], [finalVertices[secondCounter], finalVertices[(secondCounter === (finalVertices.length - 1)) ? 0 : secondCounter + 1]])
                    if (newLine) {
                        const matchingIndex = newVertices.findIndex((c) => c.x === newLine[1].x & c.y === newLine[1].y)
                        newVertices.splice(matchingIndex, 1);
                    }
                    secondCounter++;
                }
                if (newLine) {
                    const matchingIndex0 = newVertices.findIndex((c) => c.x === newLine[0].x & c.y === newLine[0].y)
                    const matchingIndex1 = newVertices.findIndex((c) => c.x === newLine[1].x & c.y === newLine[1].y)
                    if (areEqual(newLine[0], finalVertices[i])) {
                        if (matchingIndex0 === -1) {
                            newVertices.push(newLine[0]);
                        }
                        if (matchingIndex1 === -1) {
                            newVertices.push(newLine[1]);
                        }
                    }
                    else {
                        if (matchingIndex1 === -1) {
                            newVertices.push(newLine[1]);
                        }
                        if (matchingIndex0 === -1) {
                            newVertices.push(newLine[0]);
                        }
                    }
                    i++;
                    changed = true;
                }
                else {
                    const matchingIndex = newVertices.findIndex((c) => c.x === finalVertices[i].x & c.y === finalVertices[i].y)
                    if (matchingIndex === -1) {
                        newVertices.push(finalVertices[i])
                    }
                }
            }
            finalVertices = newVertices
        }
        // const idArea = createArea({ ...values, vertices: currentRoom.vertices })
        // setCurrentAreaId(idArea);
        let newRoom = rooms[rooms.length - 2];
        newRoom = { name: values.name, ...newRoom };
        let newRooms = rooms;
        newRooms[rooms.length - 2] = newRoom;
        setRooms(newRooms)
        setAddingGateways(true);
        let newNames = [...names];
        newNames.push({ name: values.name, key: rooms.length - 2, color: colors[(rooms.length - 2) % colors.length].color })
        setNames(newNames);
    }

    const cancelRoom = () => {
        let newRooms = [...rooms]
        newRooms.pop();
        newRooms.push({ vertices: [], edges: [] });
        setRooms(newRooms);
        setAddRoomVisible(false);
        setCurrentRoom(null);
        setCurrentPoint(null);
        setPoints({});
        setWalls([]);
    }

    const cancelAddRoom = () => {
        let newRooms = [...rooms]
        newRooms.pop();
        newRooms.pop();
        if (rooms.length > 0)
            newRooms.push({ vertices: [], edges: [] });
        setRooms(newRooms);
        setAddRoomVisible(false);
        setCurrentRoom(null);
        setCurrentPoint(null);
        setPoints({});
        setWalls([]);
    }

    const saveFacility = (prop) => {
        // const id = createFacility(prop)
        setCreatedFacility({ name: prop.name, idFacility: '1', sizeX: prop.sizeX, sizeY: prop.sizeY }); //TODO: CAMBIAR A ID
    }

    const saveGateways = () => {
        // if (gateways) {
        //     gateways.map((gateway) =>
        //         createGateway({ ...gateway, idArea: currentAreaId })
        //     )
        // }
        setAddingGateways(false);
        setCurrentRoom(null);
        setCurrentAreaId(null);
    }

    const showConfirm = () => {
        confirm({
            title: "¿Seguro que quieres regresar?",
            icon: <WarningOutlined />,
            content: "Se borrará el edificio que está creando",
            onOk() {
                setFacilitySetupVisible(!facilitySetupVisible);
                setRooms([]);
                setCurrentRoom([]);
                setCurrentPoint(null);
                setPoints({});
                setWalls([]);
                removeFacility(createdFacility.idFacility)
            }
        });
    }

    const confirmFinish = () => {
        confirm({
            title: "¿Seguro que ya terminó?",
            icon: <WarningOutlined />,
            content: "El edificio creado ya no podrá ser modificado",
            onOk() {
                setFacilitySetupVisible(false);
                setRooms([]);
                setCurrentRoom([]);
                setCurrentPoint(null);
                setPoints({});
                setWalls([]);
            }
        });
    }

    const printError = () => {
        openNotification(
            "error",
            "Nombre no válido",
            "El nombre que ingresó ya existe"
        );
    }

    const printGatewayError = () => {
        openNotification(
            "error",
            "Dirección MAC no válida",
            "La dirección MAC que ingresó ya existe"
        );
    }

    const cancelGateway = () => {
        let newGateways = [...gateways]
        newGateways.pop();
        console.log(newGateways)
        setGateways(newGateways);
        setAddGatewayVisible(false);
    }

    return (
        <>

            <AddFacility
                visible={addFacilityVisible}
                createFacility={saveFacility}
                onClose={() => setAddFacilityVisible(!addFacilityVisible)}
                setFacilitySetupVisible={setFacilitySetupVisible}
            />
            {facilitySetupVisible ?
                <>
                    <PageHeader
                        onBack={null}
                        title="Crear"
                        subTitle={createdFacility?.name}
                        onBack={showConfirm}
                    />
                    <AddGateway
                        visible={addGatewayVisible}
                        onClose={() => setAddGatewayVisible(false)}
                        setAddGatewayVisible={setAddGatewayVisible}
                        gateways={existingGateways}
                        printError={printGatewayError}
                        gatewaysList={gateways}
                        registering={true}
                        cancelGateway={cancelGateway}
                    />
                    <Row justify="end" style={{ padding: 10 }}>
                        {addingGateways ?
                            <Button
                                type="primary"
                                size="large"
                                shape="round"
                                onClick={saveGateways}
                            >
                                Terminar de agregar gateways de área
                            </Button>
                            :
                            <>
                                <Button
                                    type="primary"
                                    size="large"
                                    shape="round"
                                    onClick={cancelRoom}
                                    disabled={(currentRoom === null)}
                                >
                                    Borrar área actual
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    shape="round"
                                    onClick={confirmFinish}
                                    disabled={(!(currentRoom === null) || gateways.length === 0 || rooms.length === 0)}
                                >
                                    Terminar de agregar edificio
                                </Button>
                            </>
                        }
                    </Row>
                    <AddRoom
                        rooms={rooms}
                        visible={addRoomVisible}
                        saveRoom={saveRoom}
                        onClose={() => setAddRoomVisible(false)}
                        cancelRoom={cancelAddRoom}
                        setAddingGateways={setAddingGateways}
                        names={names}
                        printError={printError}
                    />
                    <Row>
                        <Col span={18}>
                            <BluePrintMap
                                points={points}
                                walls={walls}
                                rooms={rooms}
                                setWalls={setWalls}
                                setPoints={setPoints}
                                setRooms={setRooms}
                                setAddRoomVisible={setAddRoomVisible}
                                currentRoom={currentRoom}
                                setCurrentRoom={setCurrentRoom}
                                sizeX={createdFacility?.sizeX}
                                sizeY={createdFacility?.sizeY}
                                point={point}
                                setCurrentPoint={setCurrentPoint}
                                addingGateways={addingGateways}
                                gateways={gateways}
                                setGateways={setGateways}
                                setAddGatewayVisible={setAddGatewayVisible}
                            />
                        </Col>
                        <Col span={6} style={{ padding: 10 }}>
                            <h2>Áreas terminadas</h2>
                            <CurrentAreasList
                                names={names}
                                colors={colors}
                            />
                        </Col>
                    </Row>
                </>
                :
                <>
                    <PageHeader
                        onBack={null}
                        title="Configuración"
                        subTitle="Edificios"
                    />
                    <Row justify="end">
                        <Button
                            type="primary"
                            size="large"
                            shape="round"
                            onClick={() => setAddFacilityVisible(!addFacilityVisible)}
                        >
                            Agregar
                        </Button>
                    </Row>
                    <FacilitiesList
                        facilities={facilities}
                        loading={loading}
                    />
                </>
            }
        </>
    )
}

export default RegisterFacilityView
