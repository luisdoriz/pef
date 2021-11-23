/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col } from 'antd';
import MaskedInput from 'antd-mask-input'

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

class AddBeaconView extends Component {
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
    const { addBeacon, beacons, printError } = this.props;
    let notValid = false;
    beacons.map((indBeacon) => {
      if (indBeacon.macAddress === values.macAddress)
        notValid = true
    })
    if (notValid) {
      printError();
    }
    else {
      addBeacon(values);
      this.onReset()
    }
  };

  render() {
    const { visible, onClose } = this.props;
    return (
      <Modal footer={null} title="Registrar beacon" visible={visible} onCancel={onClose}>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="macAddress"
                label="Dirección MAC (Beacon)"
                rules={[
                  { required: true, pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/ }
                ]}
              >
                <MaskedInput mask="##:##:##:##:##:##" placeholder="00:00:00:00:00:00" />
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

export default AddBeaconView
