import React from 'react'
import { PageHeader, Spin, Row, Col, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { useFacility } from '../../hooks';
import { useParams } from 'react-router';
import FacilityMap from '../../components/facility/FacilityMap';

const FacilityView = () => {
  let { idFacility } = useParams();
  const { loading, areas, positions } = useFacility(idFacility)
  if (loading) {
    const antIcon = (<LoadingOutlined style={{ fontSize: 24 }} spin />);
    return (
      <Spin indicator={antIcon} />
    )
  }
  return (
    <>
      <PageHeader
        onBack={null}
        title="En vivo"
        subTitle={areas && areas.length > 0 ? areas[0].facilityName : ''}
      />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => console.log('actualizar')}
        >
          Actualizar posiciones
        </Button>
      </Row>
      <Row>
        <Col span={18}>
          <FacilityMap
            areas={areas}
            positions={positions}
            sizeX={areas && areas.length > 0 ? areas[0].facilitySizeX : 0}
            sizeY={areas && areas.length > 0 ? areas[0].facilitySizeY : 0}
          />
        </Col>
      </Row>

    </>
  )
}

export default FacilityView
