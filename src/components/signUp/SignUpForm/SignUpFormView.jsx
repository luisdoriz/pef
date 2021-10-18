/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Form, Input, Button, Row } from 'antd';

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo valido!',
  },
};

class SignupFormView extends Component {
  formRef = React.createRef();
  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFinish = (values) => {
    const { postUser } = this.props;
    postUser(values);
    // this.onReset();
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
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
              message: '¡La contraseña debe de tener minimo 1 letra en mayuscula, 1 en minuscula, 1 digito y debe de contener al menos 8 caracteres!',
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          label="Confirma Contraseña"
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
        <Row justify="center">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Crear Usuario
            </Button>
          </Form.Item>
        </Row>
      </Form>
    )
  }
}

export default SignupFormView;
