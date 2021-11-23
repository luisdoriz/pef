import React from 'react'
import { useState } from 'react';
import { Button, PageHeader, Row } from 'antd';

import { ActiveCasesList, AddCase, RecoveredCasesList, CaseDetail } from "../../components/cases";
import useActiveCases from '../../hooks/ActiveCases/useCases';
import useRecoveredCases from '../../hooks/RecoveredCases/useRecoveredCases';
import useEmployeesFacilities from '../../hooks/EmployeeFacility/useEmployeesFacilities';

const CasesView = ({ user }) => {
  const { idRole } = user;

  const { activeCases, postActiveCase, deleteActiveCase, loading: loadingActive, setInactiveCase } = useActiveCases();
  const { recoveredCases, loading: loadingRecovered } = useRecoveredCases();

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

  const deleteCase = (prop) => {
    deleteActiveCase({ idCase: prop.idCase });
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
        idRole={idRole}
        setInactiveCase={setInactiveCase}
      />
      {idRole === 2 && (<Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddCaseVisible(!addCaseVisible)}
        >
          Agregar
        </Button>
      </Row>)}
      <h3>Casos activos</h3>
      <ActiveCasesList
        cases={activeCases}
        seeCaseDetail={seeCaseDetail}
        facilities={facilities}
        loading={loadingActive}
      />
      <h3>Casos recuperados</h3>
      <RecoveredCasesList
        cases={recoveredCases}
        loading={loadingRecovered}
        facilities={facilities}
      />
    </>
  )
}

export default CasesView
