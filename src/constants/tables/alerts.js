import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from 'moment';

const getAlertsColumns = (deleteAlert, idRole, types, facilities) => {
  const columns = [
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      filters: types.map(({ name }) => ({ text: name, value: name })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
      sortDirections: ['descend', 'ascend', 'descend'],
      defaultSortOrder: 'descend',
      render: (row) => moment(row).local().format("YYYY/MM/DD"),
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
      filters: facilities.map(({ name }) => ({ text: name, value: name })),
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
          okButtonProps={{shape:"round"}}
          cancelButtonProps={{shape:"round"}}
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
