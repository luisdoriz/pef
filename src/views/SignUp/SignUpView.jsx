import React from 'react'
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import {
  Redirect,
} from "react-router-dom";

import { SignUpForm } from '../../components/signUp';
import { useSignUp } from '../../hooks';
import './styles.css';

const SignUpView = () => {
  const { loading, postUser, sendToLogin } = useSignUp();
  if (sendToLogin) {
    return <Redirect to='/login'/>;
  }
  return (
    <Col className="signup-container">
      <Row justify="center">
        <Col span={10} className="logo" />
      </Row>
      <Row justify="center">
        <Col span={8}>
          <SignUpForm postUser={postUser} loading={loading} />
        </Col>
      </Row>
      <Row justify="center">
        <Link to="/login"><h4>¿Tienes Cuenta? Inicia Sesion</h4></Link>
      </Row>
    </Col>
  )
}

export default SignUpView
