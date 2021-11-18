/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Row, Col, InputNumber } from 'antd';

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo valido!',
  },
};

class AddFacilityView extends Component {
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
    const { setFacilitySetupVisible, createFacility, facilities, printError } = this.props;
    let name = values.name.trim();
    name = name.split(' ');

    for (var i = 0; i < name.length; i++) {
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    }
    values.name = name.join(' ')
    let notValid = false;
    facilities.map((facility) => {
      if (facility.name === values.name)
        notValid = true
    })
    if (notValid) {
      printError();
    }
    else {
      createFacility(values);
      setFacilitySetupVisible(true);
      this.onReset();
    }
  };

  render() {
    const { visible, onClose } = this.props;
    return (
      <Modal footer={null} title="Crear edificio" visible={visible} onCancel={onClose}>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages} style={{ paddingTop: 16 }}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[
                  { required: true, }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sizeX"
                label="Tamaño en x"
                rules={[
                  { required: true, }
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sizeY"
                label="Tamaño en y"
                rules={[
                  { required: true, }
                ]}
              >
                <InputNumber min={1} />
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
                  Continuar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default AddFacilityView
