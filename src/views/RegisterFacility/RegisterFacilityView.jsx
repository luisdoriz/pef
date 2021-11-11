import React, { useEffect } from 'react'
import { useState } from 'react';
import { PageHeader, Row, Button, Col, Modal } from 'antd';
import { BluePrintMap, AddRoom, FacilitiesList, CurrentAreasList, AddFacility } from "../../components/facilities";
import useFacilities from '../../hooks/Facilities';
import { WarningOutlined } from '@ant-design/icons';
import useGateways from '../../hooks/Gateways';

const { confirm } = Modal
const RegisterFacilityView = () => {
    
    const { facilities, createArea, loading, createFacility } = useFacilities();
    const { createGateway } = useGateways();
    const [points, setPoints] = useState({});
    const [walls, setWalls] = useState([]);
    const [createdFacility, setCreatedFacility] = useState({});
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [addRoomVisible, setAddRoomVisible] = useState(false);
    const [addFacilityVisible, setAddFacilityVisible] = useState(false);
    const [facilitySetupVisible, setFacilitySetupVisible] = useState(false);
    const [names, setNames] = useState([]);
    const [point, setCurrentPoint] = useState(null);
    const [addingGateways, setAddingGateways] = useState(false);
    const [gateways, setGateways] = useState([]);
    const [currentAreaId, setCurrentAreaId] = useState(null)
    
    const saveRoom = (values) => {
        //const idArea = createArea({...values, vertices: currentRoom.vertices}) 
        //setCurrentAreaId(idArea);
        let newRoom = rooms[rooms.length - 2];
        newRoom = { name: values.name, ...newRoom };
        let newRooms = rooms;
        newRooms[rooms.length - 2] = newRoom;
        setRooms(newRooms)
        setAddingGateways(true);
        let newNames = [...names];
        newNames.push({name: values.name, key: rooms.length - 2})
        setNames(newNames);
    }

    const deleteArea = (prop) => {

    }

    const cancelRoom = () => {
        const newRooms = rooms.filter((room) => !(room.vertices === currentRoom.vertices && room.edges === currentRoom.edges))
        setRooms(newRooms);
        setAddRoomVisible(false);
        setCurrentRoom([]);
        setCurrentPoint(null);
        setPoints({});
        setWalls([]);
    }

    const saveFacility = (prop) => {
        // const id = createFacility(prop)
        setCreatedFacility({ name: prop.name, idFacility: prop.idFacility, sizeX: prop.sizeX, sizeY: prop.sizeY }); //TODO: CAMBIAR A ID
    }

    const saveGateways = () => {
        // if(gateways){
        //     createGateway({...gateways, idArea: currentAreaId})
        // }
        setAddingGateways(false);
        setCurrentRoom(null);
        setGateways(null);
        setCurrentAreaId(null);
    }

    const showConfirm = () => {
        confirm({
            title: "¿Seguro que quieres regresar? Se borrará el edificio que está creando",
            icon: <WarningOutlined />,
            content: "Se borrará el edificio que está creando",
            onOk() {
                setFacilitySetupVisible(!facilitySetupVisible);
                setRooms([]);
                setCurrentRoom([]);
                setCurrentPoint(null);
                setPoints({});
                setWalls([]);
                //TODO: agregar delete facility
            }
        });
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
                            <Button
                                type="primary"
                                size="large"
                                shape="round"
                                onClick={cancelRoom}
                                disabled={(!currentRoom)}
                            >
                                Borrar área actual
                            </Button>
                        }
                    </Row>
                    <AddRoom
                        rooms={rooms}
                        visible={addRoomVisible}
                        saveRoom={saveRoom}
                        onClose={() => setAddRoomVisible(false)}
                        cancelRoom={cancelRoom}
                        setAddingGateways={setAddingGateways}
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
                            />

                        </Col>
                        <Col span={6} style={{ padding: 10 }}>
                            <h2>Áreas terminadas</h2>
                            <CurrentAreasList
                                names={names}
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
