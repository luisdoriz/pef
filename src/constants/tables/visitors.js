import moment from "moment";
import { Button } from "antd";
import { sorter, sortDirections } from "./index";
import { EditOutlined } from "@ant-design/icons";
import 'moment/locale/es';

moment.locale("es")

const getVisitorColumns = (editVisitor) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    sorter,
    sortDirections,
  },
  {
    title: "Apellidos",
    sorter,
    sortDirections,
    dataIndex: "",
    key: "x",
    render: ({ firstLastName, secondLastName }) =>
      `${firstLastName} ${secondLastName}`,
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
  },
  {
    title: "Id del beacon",
    dataIndex: "idBeacon",
    key: "idBeacon",
    sorter,
    sortDirections,
  },
  {
    title: "Mac address del beacon",
    dataIndex: "macAddress",
    key: "macAddress",
    sorter,
    sortDirections,
  },
  {
    title: "Fecha limite",
    dataIndex: "expirationDate",
    key: "expirationDate",
    sorter,
    sortDirections,
    render: (date) =>
      moment(date).format("MMMM D YYYY, h:mm:ss a"),
  },
  {
    title: "Editar",
    dataIndex: "",
    key: "x",
    render: (row) => (
      <Button
        onClick={() => editVisitor(row)}
        type="primary"
        shape="round"
        icon={<EditOutlined />}
      />
    ),
  },
];

export { getVisitorColumns };

export default getVisitorColumns;
