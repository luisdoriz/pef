import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { sorter, sortDirections } from "./index";

const getUserColumns = (editUser) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    sorter,
    sortDirections,
  },
  {
    title: "Apellidos",
    dataIndex: "lastName",
    key: "lastName",
    sorter,
    sortDirections,
  },
  {
    title: "Correo",
    dataIndex: "email",
    key: "email",
    sorter,
    sortDirections,
  },
  {
    title: "Rol",
    dataIndex: "roleName",
    key: "roleName",
    sorter,
    sortDirections,
  },
  {
    title: "Editar",
    dataIndex: "",
    key: "x",
    render: (row) => (
      <Button
        onClick={() => editUser(row)}
        type="primary"
        shape="round"
        icon={<EditOutlined />}
      />
    ),
  },
];

export { getUserColumns };

export default getUserColumns;
