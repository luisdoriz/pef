/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Button, Select, Row, Col, Input, InputNumber } from 'antd';

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

class AddOrganizationView extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)
  }

  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.formRef.current.resetFields();
  };

  onCancel = () => {
    this.onReset()
  }

  onFinish = (values) => {
    const { addOrganization, printError, organizations } = this.props;
    let name = values.name.trim();
    name = name.split(' ');
    for (var i = 0; i < name.length; i++) {
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    }
    values.name = name.join(' ')
    let notValid = false;
    organizations.map((organization) => {
      if (organization.name === values.name)
        notValid = true
    })
    if (notValid) {
      printError();
    }
    else {
      addOrganization(values);
      this.onReset()
    }
  };

  render() {
    const { visible, onClose } = this.props;
    return (
      <Modal footer={null} title="Agregar organización" visible={visible} onCancel={onClose}>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Dirección"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="phoneNumber"
                label="Teléfono"
                rules={[
                  {
                    pattern:/^([0-9]{10})$/,
                    required: true
                  }
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
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
                  type="button" shape="round" onClick={this.onReset}>
                  Cancelar
                </Button>
                <Button type="primary" shape="round" htmlType="submit">
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

export default AddOrganizationView
