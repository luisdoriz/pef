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
      <FacilityMap areas={areas} positions={positions}/>
    </>
  )
}

export default FacilityView
