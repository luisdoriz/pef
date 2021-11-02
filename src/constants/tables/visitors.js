import { Popconfirm, Button, Tag } from "antd";
import { sorter, sortDirections } from "./index";
import { DeleteOutlined } from "@ant-design/icons";

const getVisitorColumns = (deleteVisitor) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    sorter,
    sortDirections,
  },
  {
    title: "Apellidos",
    dataIndex: "lastNames",
    key: "lastNames",
    sorter,
    sortDirections,
  },
  {
    title: "Direccion de correo",
    dataIndex: "email",
    key: "email",
    sorter,
    sortDirections,
  },
  {
    title: "Permiso",
    dataIndex: "privilegeLevel",
    key: "privilegeLevel",
    sorter,
    sortDirections,
    render: (row) => <Tag color="processing">{row}</Tag>,
  },
  {
    title: "Id del beacon",
    dataIndex: "idBeacon",
    key: "idBeacon",
    sorter,
    sortDirections,
  },
  {
    title: "Fecha limite",
    dataIndex: "expirationDate",
    key: "expirationDate",
    sorter,
    sortDirections,
  },
  {
    title: "Borrar",
    dataIndex: "",
    key: "x",
    render: (row) => (
      <Popconfirm
        title="¿Seguro que quieres borrar esta alerta?"
        onConfirm={() => deleteVisitor(row)}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <Button type="danger" shape="round" icon={<DeleteOutlined />} />
      </Popconfirm>
    ),
  },
];

export { getVisitorColumns };

export default getVisitorColumns;
