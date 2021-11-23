/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Form, Input, Button, Row } from 'antd';

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

class LoginForm extends Component {
  formRef = React.createRef();
  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFinish = (values) => {
    const { postLogin } = this.props;
    postLogin(values);
    this.onReset();
  };
  render() {
    const { loading } = this.props;
    return (
      <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages}>
        <Form.Item
          name="email"
          label="Correo"
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Row justify="center">
          <Form.Item>
            <Button type="primary" size="large" shape="round" htmlType="submit" loading={loading}>
              Iniciar sesión
            </Button>
          </Form.Item>
        </Row>
      </Form>
    )
  }
}

export default LoginForm;
