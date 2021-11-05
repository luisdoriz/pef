/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react'
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  DatePicker,
  notification,
  Popconfirm
} from 'antd';
import {
  DeleteOutlined
} from "@ant-design/icons";
import moment from 'moment';


import getAvailableBeacons from '../../../data/beacons';
import getFacilities from '../../../data/facilities';
import getPrivilegeLevels from '../../../data/privilegeLevels';
import { editVisitor, postVisitor } from '../../../data/visitors';
const { Option } = Select;

const validateMessages = {
  required: '¡${label} es requerido!',
  pattern: '${label} no tiene el formato correcto.',
  types: {
    email: '¡${label} no es un correo válido!',
  },
};

const initialState = {
  beacons: [],
  facilities: [],
  privilegeLevels: [],
  currentFacility: null,
  visitorBeacon: null,
}

class AddVisitorView extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props)

    this.state = initialState
  }


  componentDidUpdate = (prevProps) => {
    const { visible, type } = this.props;
    if (visible && prevProps.visible === false) {
      if (type === "edit") {
        this.setFormData()
      }
      this.setBeacons()
      this.setFacilites()
      this.setPrivilegeLevels()
    }
  }

  setFormData = () => {
    const { visitor } = this.props;
    const {
      email,
      expirationDate,
      idFacility,
      idBeacon,
      idPrivilegeLevel,
      firstLastName,
      secondLastName,
      name,
      macAddress,
    } = visitor
    this.formRef.current.setFieldsValue({
      email,
      expirationDate: moment(expirationDate),
      idFacility,
      idBeacon,
      idPrivilegeLevel,
      firstLastName,
      secondLastName,
      name,
    });
    this.setState({ visitorBeacon: { idBeacon, macAddress, idFacility } })
  }
  setFacilites = async () => {
    const { data } = await getFacilities()
    this.setState({ facilities: data })
  }

  setBeacons = async () => {
    const { data } = await getAvailableBeacons()
    this.setState({ beacons: data })
  }

  setPrivilegeLevels = async () => {
    const { data } = await getPrivilegeLevels()
    this.setState({ privilegeLevels: data })
  }

  onReset = () => {
    const { onClose } = this.props;
    onClose()
    this.setState(initialState)
    this.formRef.current.resetFields();
  };

  onCancel = () => {
    this.onReset()
  }

  formatNames = (values) => {
    const fName = values.name.split(' ');
    for (var i = 0; i < fName.length; i++) {
      fName[i] = fName[i].charAt(0).toUpperCase() + fName[i].slice(1);
    }
    const ucName = fName.join(' ');

    const fLName = values.firstLastName.split(' ');
    for (var index = 0; index < fLName.length; index++) {
      fLName[index] = fLName[index].charAt(0).toUpperCase() + fLName[index].slice(1);
    }
    const uc1LName = fLName.join(' ');

    const sLName = values.secondLastName.split(' ');
    for (var slNameIndex = 0; slNameIndex < sLName.length; slNameIndex++) {
      sLName[slNameIndex] = sLName[slNameIndex].charAt(0).toUpperCase() + sLName[slNameIndex].slice(1);
    }
    const uc2LName = sLName.join(' ');
    return { ucName, uc1LName, uc2LName }
  }

  onFinish = async (values) => {
    const { type, fetchVisitors, visitor } = this.props
    const { ucName, uc1LName, uc2LName } = this.formatNames(values)
    values.name = ucName;
    values.firstLastName = uc1LName;
    values.secondLastName = uc2LName;
    let responseStatus = ""
    let description = ""
    if (type === "add") {
      const { status } = await postVisitor(values)
      responseStatus = status
      description = "La visita fue creada con exito."
    } else if (type === "edit") {
      const { status } = await editVisitor({
        ...values,
        idVisitor: visitor.idVisitor,
      })
      responseStatus = status
      description = "La visita fue editada con exito."
    }
    if (responseStatus === "success") {
      this.onReset()
      fetchVisitors()
      notification.success({
        message: "Exito",
        description,
      })
    } else {
      notification.error({
        message: "Error",
        description: "Error interno, favor de intentarlo mas tarde."
      })
    }
  };

  onChangeFacility = (facility) => {
    this.setState({ currentFacility: facility })
    this.formRef.current.setFieldsValue({ idBeacon: null, idPrivilegeLevel: null })
  }

  deleteVisitor = () => {
    const { deleteVisitor, visitor } = this.props;
    deleteVisitor(visitor)
    this.onReset()
  }

  render() {
    const { visible, type } = this.props;
    const { beacons: beaconsData, visitorBeacon, facilities, currentFacility, privilegeLevels } = this.state;
    let title = "Añadir Visita"
    let beacons = [...beaconsData]
    if (type === "edit") {
      title = "Editar Visita"
      if (visitorBeacon !== null) {
        beacons.push(visitorBeacon)
      }
    }
    return (
      <Modal
        footer={null}
        title={title}
        visible={visible}
        onCancel={this.onCancel}
      >
        {type === "edit" ? (<Row justify="end">
          <Popconfirm
            title="¿Seguro que quieres borrar esta alerta?"
            onConfirm={() => this.deleteVisitor()}
            okText="Confirmar"
            cancelText="Cancelar"
          >
            <Button
              type="danger"
              shape="round"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Row>) : (null)}
        <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish} validateMessages={validateMessages}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="idFacility" label="Edificio" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el edificio"
                  allowClear
                  optionFilterProp="children"
                  onChange={this.onChangeFacility}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {facilities.map(({ idFacility, name }) => (
                    <Option value={idFacility}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="idBeacon" label="Beacon" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el Beacon"
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {beacons.filter((beacon) => currentFacility === null || currentFacility === beacon.idFacility).map(({ idBeacon, macAddress }) => (
                    <Option value={idBeacon}>{macAddress}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
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
              <Form.Item name="idPrivilegeLevel" label="Rol" rules={[{ required: true, }]}>
                <Select
                  showSearch
                  placeholder="Selecciona el Beacon"
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {privilegeLevels.filter((privilegeLevel) => currentFacility === null || currentFacility === privilegeLevel.idFacility).map(({ idPrivilegeLevel, name }) => (
                    <Option value={idPrivilegeLevel}>{name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="firstLastName"
                label="Apellido paterno"
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
              <Form.Item name="expirationDate" label="Fecha limite">
                <DatePicker showTime />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="secondLastName"
                label="Apellido materno"
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

export default AddVisitorView
