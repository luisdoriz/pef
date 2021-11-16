import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const getVisitorBeaconsColumns = (deleteVisitorBeacon) => [
  {
    title: "ID",
    dataIndex: "idBeacon",
    key: "idBeacon",
  },
  {
    title: "Direccion MAC",
    dataIndex: "macAddress",
    key: "macAddress",
  },
  {
    title: "Privilege",
    dataIndex: "idPrivilegeLevel",
    key: "idPrivilegeLevel",
  },
  {
    title: "Borrar",
    dataIndex: "",
    key: "x",
    render: (row) => (
      <Popconfirm
        title="¿Seguro que quieres borrar esta alerta?"
        onConfirm={() => deleteVisitorBeacon(row)}
        okText="Confirmar"
        cancelText="Cancelar"
      >
        <Button type="danger" shape="round" icon={<DeleteOutlined />} />
      </Popconfirm>
    ),
  },
];

export { getVisitorBeaconsColumns };

export default getVisitorBeaconsColumns;
