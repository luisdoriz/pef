import React from 'react'
import { PageHeader, Row, Button } from 'antd'
import { useFacility } from '../../hooks/Facilities';
import { useParams } from 'react-router';
import FacilityMap from '../../components/facility/FacilityMap';

const FacilityView = () => {
  let { idFacility } = useParams();
  const { loading, areas, positions, fetchPositions } = useFacility(idFacility)

  return (
    <>
      <PageHeader
        onBack={null}
        title={areas && areas.length > 0 ? areas[0].facilityName : ''}
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
      <FacilityMap
        loading={loading}
        areas={areas}
        positions={positions}
        sizeX={areas && areas.length > 0 ? areas[0].facilitySizeX : 0}
        sizeY={areas && areas.length > 0 ? areas[0].facilitySizeY : 0}
      />
    </>
  )
}

export default FacilityView
