import React from 'react'
import { useState } from 'react';
import { PageHeader, Row, Button, Col, Popconfirm} from 'antd';
import {
  DeleteOutlined
} from "@ant-design/icons";

import { BluePrintMap, AddRoom, FacilitiesList, CurrentAreasList, AddFacility } from "../../components/facilities";
import useFacilities from '../../hooks/Facilities';
import './styles.css';

const RegisterFacilityView = () => {
    const { facilities, createArea, loading, createFacility } = useFacilities();
    const [points, setPoints] = useState({});
    const [walls, setWalls] = useState([]);
    const [createdFacility, setCreatedFacility] = useState({name: null, idFacility: null});
    const [range, setRange] = useState(10); //HARDCODEADO
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [addRoomVisible, setAddRoomVisible] = useState(false);
    const [addFacilityVisible, setAddFacilityVisible] = useState(false);
    const [facilitySetupVisible, setFacilitySetupVisible] = useState(false);
    const [names, setNames] = useState([]);

    const saveRoom = (values) =>{
        //createArea({...values, vertices: currentRoom.vertices})
        let newRoom = rooms[rooms.length-2];
        newRoom = {name: values.name, ...newRoom};
        let newRooms = rooms;
        newRooms[rooms.length-2] = newRoom;
        setRooms(newRooms)
        setCurrentRoom(null);
        let newNames = names;
        newRooms.map((room, i) =>(
            newNames.push({name: room.name, key: i})
        ))
        setNames(newNames)
    }

    const deleteArea = (prop) =>{
        
    }

    const saveFacility = (prop) =>{
        // const id = createFacility(prop)
        setCreatedFacility({name: prop.name, idFacility: prop.idFacility}); //TODO: CAMBIAR A ID
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
                    onBack={() => setFacilitySetupVisible(!facilitySetupVisible)} //TODO: AGREGAR CONFIRMACIION
                />
            <AddRoom
                rooms={rooms}
                visible={addRoomVisible}
                saveRoom={saveRoom}
                onClose={() => setAddRoomVisible(!addRoomVisible)}
            />
            <Row>
                <Col span={18}>
                    <div className="blueprint-container">
                        <BluePrintMap
                            points={points}
                            walls={walls}
                            rooms={rooms}
                            range={range}
                            setWalls={setWalls}
                            setPoints={setPoints}
                            setRooms={setRooms}
                            setAddRoomVisible={setAddRoomVisible}
                            currentRoom={currentRoom}
                            setCurrentRoom={setCurrentRoom}
                        />
                    </div>
                </Col>
                
                <Col span={6}>
                <h2>Áreas</h2>
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
