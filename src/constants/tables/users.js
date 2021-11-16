import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const getUserColumns = (editUser, roles) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Correo",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Rol",
    dataIndex: "roleName",
    key: "roleName",
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
