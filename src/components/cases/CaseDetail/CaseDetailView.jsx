import React from 'react'
import { Popconfirm, Table, Row, Col, Modal, Button } from 'antd';
import { getCloseContactsColumns } from '../../../constants/tables';
import {
  DeleteOutlined
} from "@ant-design/icons";
import useAtRiskPersons from '../../../hooks/AtRiskPersons/useAtRiskPersons';

const CaseDetailView = ({ activeCase, visible, onClose, deleteCase, idRole }) => {
  const { atRiskPersons: contacts, loading } = useAtRiskPersons(activeCase?.idCase);

  const columns = getCloseContactsColumns()
  const confirm = () => {
    deleteCase(activeCase)
  }
  return (
    <Modal width={"80%"} footer={null} title="Detalle Caso" visible={visible} onCancel={onClose}>
      <Col>
        <Col>
          {idRole === 2 && (<Row>
            <Popconfirm
              title="¿Seguro que quieres borrar este caso?"
              onConfirm={confirm}
              okText="Confirmar"
              cancelText="Cancelar"
            >
              <Button
                style={{ position: 'absolute', right: "0px" }}
                type="danger"
                shape="round"
                icon={<DeleteOutlined />}
                size="large"
              />
            </Popconfirm>
          </Row>)}
          <h2>Caso</h2>
          <Row gutter={100}>
            <Col >
              <h3>Nombre</h3>
              <p>{activeCase?.name}</p>
            </Col>
            <Col >
              <h3>Fecha</h3>
              <p>{activeCase?.date.substring(0, 10)}</p>
            </Col>
            <Col >
              <h3>Edificio</h3>
              <p>{activeCase?.facilityName}</p>
            </Col>
          </Row>
        </Col>
        <Col style={{ paddingTop: 30 }}>
          <h2>Contactos cercanos a caso positivo</h2>
          <Table columns={columns} dataSource={contacts} loading={loading} />
        </Col>
      </Col>
    </Modal>
  )
}

export default CaseDetailView
