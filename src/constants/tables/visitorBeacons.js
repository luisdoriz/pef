import { Popconfirm, Button } from "antd";
import { sorter, sortDirections } from "./index";
import { DeleteOutlined } from "@ant-design/icons";

const getVisitorBeaconsColumns = (deleteVisitorBeacon) => [
  {
    title: "ID",
    dataIndex: "idBeacon",
    key: "idBeacon",
    sorter,
    sortDirections,
  },
  {
    title: "Direccion MAC",
    dataIndex: "macAddress",
    key: "macAddress",
    sorter,
    sortDirections,
  },
  {
    title: "Privilege",
    dataIndex: "idPrivilegeLevel",
    key: "idPrivilegeLevel",
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
