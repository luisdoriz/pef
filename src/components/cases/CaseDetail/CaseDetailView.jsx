import React from 'react'
import { Table, Row, Col, Modal } from 'antd';
import { getCloseContactsColumns } from '../../../constants/tables';

const CaseDetailView = ({ activeCase, visible, onClose }) => {
const contacts = [
        {
          name: "Juan Perez",
          email: "juan.perez@mail.com"
        },
        {
          name: "Jaime Lopez",
          email: "jaime.lopez@mail.com"
        },
        {
          name: "Luis Gonzalez",
          email: "luis.gonzalez@mail.com"
        },
        {
          name: "Juan 10x",
          email: "juan.10x@mail.com"
        },
]
const columns = getCloseContactsColumns()
  return (
    <Modal width={"80%"} footer={null} title="Detalle Caso" visible={visible} onCancel={onClose}>
        <Col>
            <Col>
                <h2>Caso</h2>
                <Row gutter={100}>
                    <Col >
                        <h3>Nombre</h3>
                        <p>{activeCase?.name}</p>
                    </Col>
                    <Col >
                        <h3>Fecha</h3>
                        <p>{activeCase?.contagionDate}</p>
                    </Col>
                    <Col >
                        <h3>Edificio</h3>
                        <p>{activeCase?.facility}</p>
                    </Col>
                </Row>
            </Col>
            <Col>
                <h2>Contactos cercanos a caso positivo</h2>
                <Table columns={columns} dataSource={contacts} />
            </Col>  
        </Col>
    </Modal>
  )
}

export default CaseDetailView
