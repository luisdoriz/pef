import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row } from 'antd';

import { ActiveCasesList, AddCase, RecoveredCasesList, CaseDetail } from "../../components/cases";
const initialCases = []

const CasesView = () => {

  const [addCaseVisible, setAddCaseVisible] = useState(false)
  const [activeCases, setActiveCases] = useState(initialCases)
  const [caseDetailVisible, setCaseDetailVisible] = useState(false)
  const [caseDetail, setCaseDetail] = useState(null)

  const facilities = [
    {
    facilityName: 'edifiico1',
    facilityId: 1,
    employees: [{
        name: 'vato',
        id: 1
    },{
        name: 'berno',
        id: 2
    }]
    },
    {
    facilityName: 'edifiico2',
    facilityId: 1,
    employees: [{
        name: 'vato12',
        id: 3
    },{
        name: 'berno3242',
        id: 4
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
      <ActiveCasesList
        cases={activeCases}
        seeCaseDetail={seeCaseDetail}
      />
    </>
  )
}

export default CasesView
