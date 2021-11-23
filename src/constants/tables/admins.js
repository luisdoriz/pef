import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const getAdminColumns = (editAdmin) => [
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
    title: "Editar",
    dataIndex: "",
    key: "x",
    render: (row) => (
      <Button
        onClick={() => editAdmin(row)}
        shape="round"
        icon={<EditOutlined />}
      />
    ),
  },
];

export { getAdminColumns };

export default getAdminColumns;