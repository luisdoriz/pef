/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Select, Button, Row, Col } from 'antd';
import MaskedInput from 'antd-mask-input'
const { Option } = Select;
const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
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
    const { registering, cancelGateway } = this.props;
    if (registering) {
      cancelGateway()
    }
    this.onReset()
  }
  onFinish = (values) => {
    const { setAddGatewaysPositionsVisible, setNewGateway, setAddGatewayVisible, defineArea, gateways, printError, registering, setGateways} = this.props
    let notValid = false;
    if (gateways && gateways.length > 0) {
      gateways.map((gateway) => {
        if (gateway.macAddress === values.macAddress) {
          notValid = true;
        }
      })
    }
    if (notValid) {
      printError();
    }
    else {
      if (!registering) {
        defineArea(values.idArea)
        setAddGatewaysPositionsVisible(true)
        setNewGateway(values);
      }
      else{
        let newGateways = [...gateways]
        newGateways[newGateways.length-1] = {macAddress: values.macAddress, ...newGateways[newGateways.length-1]}
        setGateways(newGateways)
      }
      setAddGatewayVisible(false);
      this.onReset();
    }
  };

  render() {
    const { visible, areas, registering } = this.props;
    return (
      <Modal footer={null} title="Añadir gateway" visible={visible} onCancel={this.onCancel}>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages} style={{ paddingTop: 16 }}>
          <Row gutter={24}>
            <Col span={12}>
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
            {!registering &&
              <Col span={12}>
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
            }
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
                {!registering ?
                  <Button type="primary" shape="round" htmlType="submit">
                    Continuar a selección de ubicación
                  </Button>
                  :
                  <Button type="primary" shape="round" htmlType="submit">
                    Confirmar
                  </Button>
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default AddGatewayView
