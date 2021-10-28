/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Row, Col, Popconfirm } from 'antd';
import {
  DeleteOutlined
} from "@ant-design/icons";
import MaskedInput from 'antd-mask-input'

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo valido!',
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
    this.onReset();
    // const { editGateway, gateway } = this.props;
    // editGateway({idGateway:gateway.idGateway, ...values});
  };

  deleteGateway = (gateway) => {
    const { setEditGatewayVisible, removeGateway } = this.props;
    // const idGateway = gateway.idGateway;
    // removeGateway(idGateway);
    setEditGatewayVisible(false);
  }
  
  render() {
    const { visible, onClose, gateway } = this.props;
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
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages} style={{paddingTop:16}}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="macAddress"
                label="Dirección MAC (Beacon)"
                rules={[
                  { required: true, pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/}
                ]}
              >
                <MaskedInput mask="##:##:##:##:##:##" placeholder="00:00:00:00:00:00"/>
              </Form.Item>
            </Col>  
            <Col span={12}>
              <Form.Item
                name="x"
                label="Coordenada x"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="y"
                label="Coordenada y"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
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
                  Guardar
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
