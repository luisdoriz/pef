import React from 'react'
import { useState } from 'react';
import { PageHeader, Row, Button } from 'antd';
import { BluePrintMap, AddRoom, FacilitiesList } from "../../components/facilities";
import useFacilities from '../../hooks/Facilities';
import './styles.css';

const RegisterFacilityView = () => {
    const { facilities } = useFacilities();
    const [points, setPoints] = useState({});
    const [walls, setWalls] = useState([]);
    const [range, setRange] = useState(10); //HARDCODEADO
    const [rooms, setRooms] = useState([]);
    const [facility, setFacility] = useState(null);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [addRoomVisible, setAddRoomVisible] = useState(false);
    const [facilitySetupVisible, setFacilitySetupVisible] = useState(false);
    const [editFacilityVisible, setEditFacilityVisible] = useState(false)

    const saveRoom = (values) =>{
        console.log(currentRoom)
        console.log(values)
        setCurrentRoom(null);
    }

    const setEditFacility = (prop) => {
        setFacility(prop)
        setEditFacilityVisible(true)
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
