/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, Button, Row, Col, Popconfirm } from 'antd';
import {
    DeleteOutlined
} from "@ant-design/icons";
const validateMessages = {
    required: '¡${label} es requerido!',
    pattern: '${label} no tiene el formato correcto.',
    types: {
        email: '¡${label} no es un correo válido!',
    },
};

class EditAdminView extends Component {
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
        const { selectedAdmin } = this.props
        this.formRef.current.setFieldsValue(selectedAdmin);

    }

    onCancel = () => {
        this.onReset()
    }
    onFinish = (values) => {
        const { editAdmin, printError, admins, selectedAdmin, setEditAdminVisible } = this.props;
        let name = values.name.trim();
        name = name.split(' ');
        for (var i = 0; i < name.length; i++) {
            name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
        }
        values.name = name.join(' ')
        let notValid = false;
        admins.map((admin) => {
            if (admin.name === values.name && values.name !== selectedAdmin.name)
                notValid = true
        })
        if (notValid) {
            printError();
        }
        else {
            setEditAdminVisible(false)
            editAdmin({...values, idUser: selectedAdmin.idUser});
            this.onReset()
        }
    };

    deleteAdmin = (selectedAdmin) => {
        const { setEditAdminVisible, removeAdmin } = this.props;
        const idUser = selectedAdmin.idUser;
        setEditAdminVisible(false);
        removeAdmin(idUser);
    }

    render() {
        const { visible, onClose, selectedAdmin } = this.props;
        return (
            <Modal footer={null} title="Editar administrador" visible={visible} onCancel={onClose}>
                <Row justify="end">
                    <Popconfirm
                        title="¿Seguro que quieres borrar este administrador?"
                        onConfirm={() => this.deleteAdmin(selectedAdmin)}
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
                                label="Dirección de correo electrónico"
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

export default EditAdminView
