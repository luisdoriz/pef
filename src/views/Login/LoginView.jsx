import React from 'react'
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { LoginForm } from '../../components/login';
import useLogin from '../../hooks';
import './styles.css';

const LoginView = () => {
  const { loading, postLogin } = useLogin();
  return (
    <Col className="login-container">
      <Row justify="center">
        <Col span={10} className="logo" />
      </Row>
      <Row justify="center">
        <Col span={8}>
          <LoginForm postLogin={postLogin} loading={loading} />
        </Col>
      </Row>
    </Col>
  )
}

export default LoginView
