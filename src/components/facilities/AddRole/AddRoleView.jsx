/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col, Input, Select, TimePicker } from 'antd';
const { Option } = Select
const format = 'HH:mm'

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
};

class AddRoleView extends Component {
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
    this.onReset()
  }

  onFinish = (values) => {
    const { addRole, printError, privilegeLevels } = this.props;
    let name = values.name.trim();
    name = name.split(' ');

    for (var i = 0; i < name.length; i++) {
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    }
    values.name = name.join(' ')
    let notValid = false;
    privilegeLevels.map((indPL) => {
      if (indPL.name === values.name)
        notValid = true
    })
    if (notValid) {
      printError();
    }
    else {
      const formattedTime = values.entryTime.format('HH:mm');
      values.entryTime = formattedTime
      addRole(values);
      this.onReset()
    }
  };

  render() {
    const { visible, onClose, areas } = this.props;
    return (
      <Modal footer={null} title="Editar rol" visible={visible} onCancel={onClose}>
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages} style={{ paddingTop: 16 }}>
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
                name="areas"
                label="Áreas permitidas"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Selecciona las áreas permitidas"
                >
                  {areas.map(({ idArea, name }) => (
                    <Option value={idArea}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="entryTime"
                label="Hora de llegada"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <TimePicker
                  format={format}
                />
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

export default AddRoleView
