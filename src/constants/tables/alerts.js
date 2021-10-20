import {sorter, sortDirections} from './index';
import { Popconfirm, Button } from 'antd';
import {
  DeleteOutlined
} from "@ant-design/icons";

const getAlertsColumns = ( alerts, deleteAlert ) => ([
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      sorter,
      sortDirections,
      filters: alerts.map(({ type, idAlert }) => ({ text: type, value: idAlert })),
      onFilter: (value, record) => record.idAlert === value,
    },
    {
      title: 'Fecha', dataIndex: 'date', key: 'date', sorter,
      sortDirections,
      render: (row) => row.substring(0,10)
    },
    {
      title: 'Responsable', dataIndex: 'employeeName', key: 'employeeName', sorter,
      sortDirections,
    },
    {
      title: 'Edificio', dataIndex: 'facilityName', key: 'facilityName',
      sorter,
      sortDirections,
      filters: alerts.map(({ facilityName, idFacility }) => ({ text: facilityName, value: idFacility })),
      onFilter: (value, record) => record.idFacility === value,
    },
    {
      title: 'Área', dataIndex: 'areaName', key: 'areaName', sorter,
      sortDirections,
    },
    {
      title: 'Descripción', dataIndex: 'payload', key: 'payload', sorter,
      sortDirections,
    },
    {
      title: 'Borrar',
      dataIndex: '',
      key: 'x',
      render: (row) => <Popconfirm
      title="¿Seguro que quieres borrar esta alerta?"
      onConfirm={() => deleteAlert(row)}
      okText="Confirmar"
      cancelText="Cancelar"
    >
    <Button
      type="danger"
      shape="round"
      icon={<DeleteOutlined />}
    />
    </Popconfirm>
    },
  ]);

export {
  getAlertsColumns,
};

export default getAlertsColumns;