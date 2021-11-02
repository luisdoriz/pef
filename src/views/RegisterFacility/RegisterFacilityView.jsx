import React from 'react'
import { useState } from 'react';
import { PageHeader, Row, Button, Col } from 'antd';
import { BluePrintMap, AddRoom, FacilitiesList, CurrentAreasList } from "../../components/facilities";
import useFacilities from '../../hooks/Facilities';
import './styles.css';

const RegisterFacilityView = () => {
    const { facilities, createArea } = useFacilities();
    const [points, setPoints] = useState({});
    const [walls, setWalls] = useState([]);
    const [range, setRange] = useState(10); //HARDCODEADO
    const [rooms, setRooms] = useState([]);
    const [facility, setFacility] = useState(null);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [addRoomVisible, setAddRoomVisible] = useState(false);
    const [facilitySetupVisible, setFacilitySetupVisible] = useState(false);
    const [editFacilityVisible, setEditFacilityVisible] = useState(false)
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
        newRooms.map((room) =>(
            newNames.push({name: room.name})
        ))
        setNames(newNames)
    }

    const setEditFacility = (prop) => {
        setFacility(prop)
        setEditFacilityVisible(true)
    }

    const deleteArea = (prop) =>{
        
    }

    return (
    <>
        <PageHeader
            onBack={null}
            title="Configuración"
            subTitle="Edificios" 
        />
        {facilitySetupVisible ?
        <>
            <AddRoom
                rooms={rooms}
                visible={addRoomVisible}
                saveRoom={saveRoom}
                onClose={() => setAddRoomVisible(!addRoomVisible)}
            />
            <Row justify="end">
                <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={() => setFacilitySetupVisible(!facilitySetupVisible)}
                    >
                    Cancelar
                </Button>
            </Row>
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
                        areas={names}
                    />
                </Col>
            </Row>
        </>
        :
        <>
            <Row justify="end">
                <Button
                    type="primary"
                    size="large"
                    shape="round"
                    onClick={() => setFacilitySetupVisible(!facilitySetupVisible)}
                    >
                    Agregar
                </Button>
            </Row>
            <FacilitiesList 
                facilities={facilities}
                editFacility={setEditFacility}
            />
        </>
        }
    </>
  )
}

export default RegisterFacilityView
