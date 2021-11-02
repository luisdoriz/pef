import React, { useState } from 'react'
import { PageHeader, Row, Button } from 'antd';
import { AddVisitor, VisitorsList } from '../../components/visitors';
import { useVisitors } from '../../hooks';

const VisitorsViews = ({ user }) => {
  const [addVisitorVisible, setAddVisitor] = useState(false)
  const { visitors, loading, deleteVisitor } = useVisitors()
  if (loading) {
    return (<p>Loading..</p>)
  }
  return (
    <>
      <PageHeader
        onBack={null}
        title="Visitantes"
      />
      <AddVisitor visible={addVisitorVisible} onClose={() => setAddVisitor(false)} />
      <Row justify="end">
        <Button
          type="primary"
          size="large"
          shape="round"
          onClick={() => setAddVisitor(true)}
        >
          Agregar
        </Button>
      </Row>
      <VisitorsList visitors={visitors} deleteVisitor={deleteVisitor} />

    </>
  )
}

export default VisitorsViews
