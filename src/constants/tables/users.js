import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { sorter, sortDirections } from "./index";

const getUserColumns = (editUser, roles) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
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
    filters: roles.map(({ name }) => ({ text: name, value: name })),
      onFilter: (value, record) => record.roleName === value,
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
