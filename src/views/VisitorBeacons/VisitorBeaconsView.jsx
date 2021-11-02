import React, { useState } from 'react'
import { PageHeader, Row, Button } from 'antd';
import { VisitorBeaconsList } from '../../components/visitorBeacons';
import { useVisitorBeacons } from '../../hooks';

const VisitorBeaconsView = ({ user }) => {
  const [addVisitorBeacons, setAddBeaconVisitor] = useState(false)
  const { beacons, loading, deleteBeacon } = useVisitorBeacons()
  if (loading) {
    return (<p>Loading..</p>)
  }
  return (
    <>
      <PageHeader
        onBack={null}
        title="Beacons"
      />
      {/* <AddVisitor visible={addVisitorBeacons} onClose={() => setAddBeaconVisitor(false)} /> */}
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddBeaconVisitor(true)}
        >
          Agregar
        </Button>
      </Row>
      <VisitorBeaconsList beacons={beacons} deleteBeacon={deleteBeacon} />

    </>
  )
}

export default VisitorBeaconsView
