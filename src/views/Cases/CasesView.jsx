import React from 'react'
import { useState } from 'react';
import { Modal, Button, PageHeader, Row } from 'antd';

import { ActiveCasesList, AddCase, RecoveredCasesList, CaseDetail } from "../../components/cases";
import useActiveCases from '../../hooks/Cases/useActiveCases';

const initialCases = [{
  name: "Daniel Ramirez Viesca",
  contagionDate: "2021/10/13",
  facilityName: "Edificio 1"
}]

const initialRCases = [{
  name: "Camila Gonzalez Rodriguez",
  contagionDate: "2021/09/5",
  facilityName: "Edificio 1"
}]

const CasesView = () => {
  const { response } = useActiveCases();
  console.log(response)
  const [addCaseVisible, setAddCaseVisible] = useState(false)
  const [activeCases, setActiveCases] = useState(initialCases)
  const [caseDetailVisible, setCaseDetailVisible] = useState(false)
  const [caseDetail, setCaseDetail] = useState(null)
  const [recoveredCases, setRecoveredCases] = useState(initialRCases)

  const facilities = [
    {
    facilityName: 'Edificio 1',
    facilityId: 1,
    employees: [{
        name: 'Daniel Ramirez Viesca',
        id: 506861
    },{
        name: 'Bernardo Cardenas Domene',
        id: 666666
    }]
    },
    {
    facilityName: 'Edificio 2',
    facilityId: 1,
    employees: [{
        name: 'Luis Doriz Salazar',
        id: 222222
    },{
        name: 'Mauricio De Leon Cardenas',
        id: 444444
    }],
    }
    ]

  const seeCaseDetail = (prop) => {
    setCaseDetail(prop)
    setCaseDetailVisible(true)
  }

  const onCloseCaseDetail = () => {
    setCaseDetailVisible(!caseDetailVisible)
    setCaseDetail(null)
  }

  const deleteCase = (prop) =>{
    setCaseDetailVisible(false);
    //borrar de base
    let secondsToGo = 10;
    const modal = Modal.success({
      title: 'Caso borrado con éxito'
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
    
  }

  return (
    <>
      <PageHeader
        onBack={null}
        title="Contagios COVID-19"
      />
      <AddCase
        facilities={facilities}
        setActiveCases={(e) => setActiveCases([e, ...activeCases])}
        visible={addCaseVisible}
        onClose={() => setAddCaseVisible(!addCaseVisible)}
      />
      <CaseDetail
        activeCase={caseDetail}
        visible={caseDetailVisible}
        onClose={() => onCloseCaseDetail()}
        deleteCase={deleteCase}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddCaseVisible(!addCaseVisible)}
        >
          Agregar
        </Button>
      </Row>
      <h3>Casos activos</h3>
      <ActiveCasesList
        cases={activeCases}
        seeCaseDetail={seeCaseDetail}
      />
      <h3>Casos recuperados</h3>
      <RecoveredCasesList
        cases={recoveredCases}
      />
    </>
  )
}

export default CasesView
