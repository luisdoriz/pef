import React, { useState } from 'react'
import { PageHeader, Row, Button } from 'antd';
import { AddBeacon, VisitorBeaconsList } from '../../components/visitorBeacons';
import { useVisitorBeacons } from '../../hooks';

const VisitorBeaconsView = ({ user }) => {
  const [addVisitorBeacons, setAddBeaconVisitor] = useState(false)
  const { beacons, loading, deleteBeacon } = useVisitorBeacons()
  return (
    <>
      <PageHeader
        onBack={null}
        title="Beacons"
      />
      <AddBeacon visible={addVisitorBeacons} onClose={() => setAddBeaconVisitor(false)} />
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
      <VisitorBeaconsList loading={loading} beacons={beacons} deleteBeacon={deleteBeacon} />

    </>
  )
}

export default VisitorBeaconsView
