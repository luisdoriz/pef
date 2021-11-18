/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Row, Col, Popconfirm, InputNumber } from 'antd';
import {
  DeleteOutlined
} from "@ant-design/icons";

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo valido!',
  },
};

class EditAreaView extends Component {
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
    const { area } = this.props
    this.formRef.current.setFieldsValue(area);

  }

  onCancel = () => {
    this.onReset()
  }
  onFinish = (values) => {
    const { editArea, area, areas, printError } = this.props;
    let name = values.name.trim();
    name = name.split(' ');

    for (var i = 0; i < name.length; i++) {
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    }
    values.name = name.join(' ')
    let notValid = false;
    areas.map((indArea) => {
      if (indArea.name === values.name && values.name !== area.name)
        notValid = true
    })
    if (notValid) {
      printError();
    }
    else {
      editArea({ idArea: area.idArea, ...values });
      this.onReset();
    }
  };

  deleteArea = (area) => {
    const { setEditAreaVisible, removeArea } = this.props;
    const idArea = area.idArea;
    removeArea(idArea);
    setEditAreaVisible(false);
  }

  render() {
    const { visible, onClose, area } = this.props;
    return (
      <Modal footer={null} title="Editar área" visible={visible} onCancel={onClose}>
        <Row justify="end">
          <Popconfirm
            title="¿Seguro que quieres borrar esta área?"
            onConfirm={() => this.deleteArea(area)}
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
                label="Tiempo límite"
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

export default EditAreaView
