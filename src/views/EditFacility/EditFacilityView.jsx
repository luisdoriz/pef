import React from 'react'
import { useState } from 'react';
import { PageHeader, Row, Button } from 'antd';
import { AreasList, EditArea, GatewaysList, EditGateway, AddGateway } from "../../components/facilities";
import useFacility from '../../hooks/Facilities/useFacility';
import { useHistory, useParams } from "react-router-dom";

const EditFacilityView = () => {
    let history = useHistory();
    let { idFacility } = useParams();

    const { areas, editArea} = useFacility(idFacility);
    const [area, setArea] = useState(null);
    const [editAreaVisible, setEditAreaVisible] = useState(false)
    const [gateway, setGateway] = useState(null);
    const [editGatewayVisible, setEditGatewayVisible] = useState(false)
    const [addGatewayVisible, setAddGatewayVisible] = useState(false)

    // const areas =[
    //     {name:"Area 1", timeLimit: "30", maxCapacity:"5"},
    //     {name:"Area 2", timeLimit: null, maxCapacity:"5"},
    // ]

    const gateways =[
        {macAddress: "00:00:00:00:00:00", x: "1", y:"2"},
        {macAddress: "11:11:11:11:11:11", x: "2", y:"3"},
    ]

    const setEditArea = (prop) => {
        setArea(prop)
        setEditAreaVisible(true)
    }

    const setEditGateway = (prop) => {
        setGateway(prop)
        setEditGatewayVisible(true)
    }

    const addGateway = (prop) => {
        console.log('agregar',prop)
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
            // removeGateway={removeGateway}
            // editGateway={editGateway}
            setEditGatewayVisible={setEditGatewayVisible}
        />
        <AddGateway 
            addGateway={addGateway}
            visible={addGatewayVisible}
            onClose={() => setAddGatewayVisible(!addGatewayVisible)}
        />
        <h3>Áreas</h3>
        <AreasList 
            areas={areas}
            editArea={setEditArea}
        />
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
        />
    </>
  )
}

export default EditFacilityView
