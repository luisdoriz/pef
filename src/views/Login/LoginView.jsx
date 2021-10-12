import React, { useContext } from 'react'
import { Row, Col } from 'antd';

import { LoginForm } from '../../components/login';
import Context from '../../contexts/mainContext';
import './styles.css';

const LoginView = () => {
  const { mainDispatch } = useContext(Context.Consumer);

  const postLogin = (values) => {
    console.log(values)
    mainDispatch({ type: "login" })
  }
  return (
    <Col className="login-container">
      <Row justify="center">
        <Col span={10} className="logo" />
      </Row>
      <Row justify="center">
        <Col span={8}>
          <LoginForm postLogin={postLogin} />
        </Col>
      </Row>
    </Col>
  )
}

export default LoginView
