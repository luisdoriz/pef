import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row } from 'antd';

import { ActiveCasesList, AddCase, RecoveredCasesList, CaseDetail } from "../../components/cases";
import useActiveCases from '../../hooks/ActiveCases/useCases';
import useRecoveredCases from '../../hooks/RecoveredCases/useRecoveredCases';
import useEmployeesFacilities from '../../hooks/EmployeeFacility/useEmployeesFacilities';

const CasesView = () => {

  const { aCases, postActiveCase, loading, deleteActiveCase } = useActiveCases();
  const { rCases } = useRecoveredCases();
  
  const { facilities } = useEmployeesFacilities();
  const [addCaseVisible, setAddCaseVisible] = useState(false)
  const [caseDetailVisible, setCaseDetailVisible] = useState(false)
  const [caseDetail, setCaseDetail] = useState(null)

  const seeCaseDetail = (prop) => {
    setCaseDetail(prop)
    setCaseDetailVisible(true)
  }

  const addCase = (prop) => {
    postActiveCase(prop);
  }

  const onCloseCaseDetail = () => {
    setCaseDetailVisible(!caseDetailVisible)
    setCaseDetail(null)
  }

  const deleteCase = (prop) =>{
    deleteActiveCase( {idCase: prop.idCase} );
    setCaseDetailVisible(false);

  }

  return (
    <>
      <PageHeader
        onBack={null}
        title="Contagios COVID-19"
      />
      <AddCase
        facilities={facilities}
        addCase={addCase}
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
        cases={aCases}
        seeCaseDetail={seeCaseDetail}
        loading={loading}
      />
      <h3>Casos recuperados</h3>
      <RecoveredCasesList
        cases={rCases}
        loading={loading}
      />
    </>
  )
}

export default CasesView
