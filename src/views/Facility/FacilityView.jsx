import React from 'react'
import { PageHeader, Spin } from 'antd'
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
        title="Facility"
      />
      <FacilityMap
        areas={areas}
        positions={positions}
        sizeX={areas && areas.length > 0 ? areas[0].facilitySizeX : 0}
        sizeY={areas && areas.length > 0 ? areas[0].facilitySizeY : 0}
      />
    </>
  )
}

export default FacilityView
