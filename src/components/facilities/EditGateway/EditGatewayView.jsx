/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Select, Button, Row, Col, Popconfirm } from 'antd';
import {
  DeleteOutlined
} from "@ant-design/icons";
const { Option } = Select
const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

class EditGatewayView extends Component {
  formRef = React.createRef();
  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.formRef.current.resetFields();
  };

  componentDidUpdate = () => {
    const { visible } = this.props;
    if (visible) {
      this.setFormState()
    }
  }

  setFormState = () => {
    const { gateway } = this.props
    this.formRef.current.setFieldsValue(gateway);

  }

  onCancel = () => {
    this.onReset()
  }
  onFinish = (values) => {
    const { setAddGatewaysPositionsVisible, setGateway, setEditGatewayVisible, defineArea, setEditing, gateway} = this.props
    defineArea(values.idArea)
    setEditGatewayVisible(false);
    setAddGatewaysPositionsVisible(true);
    setGateway({ idGateway: gateway.idGateway, ...values });
    setEditing(true);
    this.onReset();
  };

  deleteGateway = (gateway) => {
    const { setEditGatewayVisible, removeGateway } = this.props;
    const idGateway = gateway.idGateway;
    removeGateway(idGateway);
    setEditGatewayVisible(false);
  }

  render() {
    const { visible, onClose, gateway, areas } = this.props;
    return (
      <Modal footer={null} title="Editar gateway" visible={visible} onCancel={onClose}>
        <Row justify="end">
          <Popconfirm
            title="¿Seguro que quieres borrar este gateway?"
            onConfirm={() => this.deleteGateway(gateway)}
            okText="Confirmar"
            cancelText="Cancelar"
          >
            <Button
              type="danger"
              shape="round"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Row>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages} style={{ paddingTop: 16 }}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="idArea" label="Área" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el área"
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {areas.map(({ idArea, name }) => (
                    <Option value={idArea}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} style={{
              textAlign: 'right',
            }}
            >
              <Form.Item>
                <Button
                  style={{
                    margin: '0 8px',
                  }}
                  type="button" onClick={this.onReset}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit">
                  Continuar a seleccionar posiciones
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default EditGatewayView
