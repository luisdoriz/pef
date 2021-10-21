import { sorter, sortDirections } from "./index";
import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const getAlertsColumns = (alerts, deleteAlert, idRole) => {
  const columns = [
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      sorter,
      sortDirections,
      filters: alerts.map(({ type }) => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      sorter,
      sortDirections,
      render: (row) => row.substring(0, 10),
    },
    {
      title: "Responsable",
      dataIndex: "employeeName",
      key: "employeeName",
      sorter,
      sortDirections,
    },
    {
      title: "Edificio",
      dataIndex: "facilityName",
      key: "facilityName",
      sorter,
      sortDirections,
<<<<<<< HEAD
      filters: alerts.map(({ facilityName, idFacility }) => ({
        text: facilityName,
        value: idFacility,
      })),
      onFilter: (value, record) => record.idFacility === value,
=======
      filters: alerts.map(({ facilityName }) => ({ text: facilityName, value: facilityName })),
      onFilter: (value, record) => record.facilityName === value,
>>>>>>> fc341fc14eb38a535db520bf30c0ff09b9776baa
    },
    {
      title: "Área",
      dataIndex: "areaName",
      key: "areaName",
      sorter,
      sortDirections,
    },
    {
      title: "Descripción",
      dataIndex: "payload",
      key: "payload",
      sorter,
      sortDirections,
    },
  ];
  if (idRole === 2) {
    columns.push({
      title: "Borrar",
      dataIndex: "",
      key: "x",
      render: (row) => (
        <Popconfirm
          title="¿Seguro que quieres borrar esta alerta?"
          onConfirm={() => deleteAlert(row)}
          okText="Confirmar"
          cancelText="Cancelar"
        >
          <Button type="danger" shape="round" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    });
  }
  return columns;
};
export { getAlertsColumns };

export default getAlertsColumns;
