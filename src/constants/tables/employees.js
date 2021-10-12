import { Button } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";

import {sorter, sortDirections} from './index';

const getEmployeesColumns = (facilities, editEmployee) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter,
      sortDirections,
    },
    {
      title: 'Matricula', dataIndex: 'internalId', key: 'internalId', sorter,
      sortDirections,
    },
    {
      title: 'Rol', dataIndex: 'role', key: 'role', sorter,
      sortDirections,
    },
    {
      title: 'Beacon Mac Address', dataIndex: 'beaconMacAddress', key: 'beaconMacAddress', sorter,
      sortDirections,
    },
    {
      title: 'Edificio',
      dataIndex: 'facilityId',
      key: 'facilityId',
      sorter,
      sortDirections,
      filters: facilities.map(({ name, id }) => ({ text: name, value: id })),
      onFilter: (value, record) => record.facilityId === value,
      render: (facilityId) => facilities.find(x => x.id === facilityId)?.name,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (row) => <Button
        onClick={() => editEmployee(row)}
        type="primary"
        shape="round"
        icon={<EditOutlined />}
      />,
    },
  ]);

export {
  getEmployeesColumns,
};

export default getEmployeesColumns;