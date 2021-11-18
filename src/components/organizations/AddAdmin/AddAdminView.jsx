/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Button, Row, Col, Input } from 'antd';

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

class AddAdminView extends Component {
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
    const { addAdmin, printError, admins } = this.props;
    let name = values.name.trim();
    name = name.split(' ');
    for (var i = 0; i < name.length; i++) {
      name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    }
    values.name = name.join(' ')
    let notValid = false;
    admins.map((admin) => {
      if (admin.name === values.name || admin.email === values.email)
        notValid = true
    })
    if (notValid) {
      printError();
    }
    else {
      addAdmin(values);
      this.onReset()
    }
  };

  render() {
    const { visible, onClose } = this.props;
    return (
      <Modal footer={null} title="Agregar administrador" visible={visible} onCancel={onClose}>
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
                name="email"
                label="Direccion de correo electronico"
                rules={[
                  {
                    type: 'email',
                    required: true,
                  },
                ]}
              >
                <Input placeholder="ejemplo@correo.com" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                  },
                  {
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    message: '¡La contraseña debe de tener minimo 1 letra en mayuscula, 1 en minuscula, 1 digito y debe de contener al menos 8 caracteres!',
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                label="Confirma contraseña"
                rules={[
                  {
                    required: true,
                    message: '¡Favor de confirmar contraseña!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('La contraseña introducida no coincide con la definida anteriormente!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
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

export default AddAdminView
