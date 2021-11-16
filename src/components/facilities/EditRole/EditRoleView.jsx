/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Row, Col, Popconfirm, Select } from 'antd';
import {
  DeleteOutlined
} from "@ant-design/icons";

const { Option } = Select;

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo valido!',
  },
};

class EditRoleView extends Component {
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
    const { role } = this.props
    const areasIds = role.areas.map(({idArea}) => idArea)
    this.formRef.current.setFieldsValue({name:role.name, areas: areasIds});

  }

  onCancel = () => {
    this.onReset()
  }
  onFinish = (values) => {
    this.onReset();
    let name = values.name.trim();
    name = name.split(' ');
    
    for(var i = 0; i<name.length; i++){
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    }
    values.name = name.join(' ')
    const { editRole, role } = this.props;
    editRole({idPrivilegeLevel:role.idPrivilegeLevel, idFacility:role.idFacility, ...values});
  };

  deleteRole = (role) => {
    const { setEditRoleVisible, removeRole } = this.props;
    const idPrivilegeLevel = role.idPrivilegeLevel;
    removeRole(idPrivilegeLevel);
    setEditRoleVisible(false);
  }
  
  render() {
    const { visible, onClose, role, areas } = this.props;
    return (
      <Modal footer={null} title="Editar rol" visible={visible} onCancel={onClose}>
       <Row justify="end">
        <Popconfirm
          title="¿Seguro que quieres borrar este rol?"
          onConfirm={() => this.deleteRole(role)}
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
                  {areas.map(({idArea, name}) => (
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

export default EditRoleView
