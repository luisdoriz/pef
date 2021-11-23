/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import { Modal, Form, Input, InputNumber, Button, Row, Col, Popconfirm } from 'antd';
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

class EditOrganizationView extends Component {
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
        const { selectedOrganization } = this.props
        this.formRef.current.setFieldsValue(selectedOrganization);

    }

    onCancel = () => {
        this.onReset()
    }
    onFinish = (values) => {
        const { editOrganization, printError, organizations, selectedOrganization, setEditOrganizationVisible } = this.props;
        let name = values.name.trim();
        name = name.split(' ');
        for (var i = 0; i < name.length; i++) {
            name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
        }
        values.name = name.join(' ')
        let notValid = false;
        organizations.map((organization) => {
            if (organization.name === values.name && values.name !== selectedOrganization.name)
                notValid = true
        })
        if (notValid) {
            printError();
        }
        else {
            setEditOrganizationVisible(false)
            editOrganization({ ...values, idOrganization: selectedOrganization.idOrganization });
            this.onReset()
        }
    };

    deleteOrganization = (selectedOrganization) => {
        const { setEditOrganizationVisible, removeOrganization } = this.props;
        const idOrganization = selectedOrganization.idOrganization;
        removeOrganization(idOrganization);
        setEditOrganizationVisible(false);
    }

    render() {
        const { visible, onClose, selectedOrganization } = this.props;
        return (
            <Modal footer={null} title="Editar organización" visible={visible} onCancel={onClose}>
                <Row justify="end">
                    <Popconfirm
                        title="¿Seguro que quieres borrar esta organización?"
                        onConfirm={() => this.deleteOrganization(selectedOrganization)}
                        okText="Confirmar"
                        cancelText="Cancelar"
                        okButtonProps={{ shape: "round" }}
                        cancelButtonProps={{ shape: "round" }}
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
                                name="address"
                                label="Dirección"
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="phoneNumber"
                                label="Teléfono"
                                rules={[
                                    {
                                        pattern: /^([0-9]{10})$/,
                                        required: true
                                    }
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} min={0} />
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

export default EditOrganizationView
