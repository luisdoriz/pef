import React, { useState } from 'react'
import { PageHeader, Row, Button } from 'antd';
import { AddVisitor, VisitorsList } from '../../components/visitors';
import { useVisitors } from '../../hooks';

const VisitorsViews = ({ user }) => {
  const [addVisitorVisible, setAddVisitor] = useState(false)
  const [editVisitorVisible, setEditVisitor] = useState(false)
  const [currentVisitor, setCurrentVisitor] = useState(null)
  const { visitors, loading, deleteVisitor, fetchVisitors } = useVisitors()
  const editVisitor = (visitor) => {
    setCurrentVisitor(visitor)
    setEditVisitor(true)
  }
  const onCloseEdit = () => {
    setCurrentVisitor(null)
    setEditVisitor(false)
  }
  return (
    <>
      <PageHeader
        onBack={null}
        title="Visitantes"
      />
      <AddVisitor
        fetchVisitors={fetchVisitors}
        type="add"
        visible={addVisitorVisible}
        onClose={() => setAddVisitor(false)}
      />
      <AddVisitor
        fetchVisitors={fetchVisitors}
        type="edit"
        visible={editVisitorVisible}
        onClose={onCloseEdit}
        deleteVisitor={deleteVisitor}
        visitor={currentVisitor}
      />
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
      <VisitorsList
        loading={loading}
        visitors={visitors}
        editVisitor={editVisitor}
      />

    </>
  )
}

export default VisitorsViews
