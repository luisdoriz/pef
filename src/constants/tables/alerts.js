import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const getAlertsColumns = (alerts, deleteAlert, idRole) => {
  const columns = [
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      filters: alerts.map(({ type }) => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
      sortDirections: ['descend','ascend','descend'],
      defaultSortOrder: 'descend',
      render: (row) => row.substring(0, 10),
    },
    {
      title: "Responsable",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Edificio",
      dataIndex: "facilityName",
      key: "facilityName",
      filters: alerts.map(({ facilityName }) => ({ text: facilityName, value: facilityName })),
      onFilter: (value, record) => record.facilityName === value,
    },
    {
      title: "Área",
      dataIndex: "areaName",
      key: "areaName",
    },
    {
      title: "Descripción",
      dataIndex: "payload",
      key: "payload",
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
