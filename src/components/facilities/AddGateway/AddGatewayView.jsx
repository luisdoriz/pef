/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Row, Col } from 'antd';
import MaskedInput from 'antd-mask-input'

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo valido!',
  },
};

class AddGatewayView extends Component {
  formRef = React.createRef();
  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.formRef.current.resetFields();
  };

  onCancel = () => {
    this.onReset()
  }
  onFinish = (values) => {
    const { addGateway } = this.props
    addGateway(values)
    this.onReset();
    // const { editUser, user } = this.props;
    // editUser({idUser:user.idUser, ...values});
  };
  
  render() {
    const { visible, onClose } = this.props;
    return (
      <Modal footer={null} title="Añadir gateway" visible={visible} onCancel={onClose}>
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

export default AddGatewayView
