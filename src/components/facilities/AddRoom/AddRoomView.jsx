/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col, Input, InputNumber } from 'antd';

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
};

class AddRoomView extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)

    this.state = {
      selectedFacility: null
    }
  }

  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.formRef.current.resetFields();
  };

  onCancel = () => {
    const { cancelRoom } = this.props;
    cancelRoom();
  }

  onFinish = (values) => {
    const { saveRoom, setAddingGateways, names, printError } = this.props;
    let name = values.name.trim();
    name = name.split(' ');

    for (var i = 0; i < name.length; i++) {
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    }
    values.name = name.join(' ')
    let notValid = false;
    names.map((indName) => {
      if (indName.name === values.name)
        notValid = true
    })
    if (notValid) {
      printError();
    }
    else {
      saveRoom(values);
      setAddingGateways(true);
      this.onReset()
    }
  };

  render() {
    const { visible, onClose } = this.props;
    return (
      <Modal footer={null} title="Agregar área" visible={visible} onCancel={this.onCancel}>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nombre"
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
                name="timeLimit"
                label="Tiempo límite (minutos)"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <InputNumber min={1} max={720} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxCapacity"
                label="Capacidad máxima"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <InputNumber min={1} max={720} />
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
                  type="button" shape="round" onClick={this.onCancel}>
                  Cancelar
                </Button>
                <Button type="primary" shape="round" htmlType="submit">
                  Continuar a agregar gateways
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default AddRoomView
