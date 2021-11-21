import React from 'react'
import { PageHeader, Row, Button } from 'antd'
import useFacility from '../../hooks/Facility';
import { useParams } from 'react-router';
import FacilityMap from '../../components/facility/FacilityMap';

const FacilityView = () => {
  let { idFacility } = useParams();
  const { loading, areas, positions, fetchPositions } = useFacility(idFacility)
  let facilityName = "Edificio";
  if (areas.length > 0) {
    const { facilityName: name } = areas[0]
    facilityName = name
  }
  return (
    <>
      <PageHeader
        onBack={null}
        title={facilityName}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          // shape="round"
          onClick={fetchPositions}
        >
          Actualizar
        </Button>
      </Row>
      <FacilityMap loading={loading} areas={areas} positions={positions} />
    </>
  )
}

export default FacilityView
