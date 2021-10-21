import { Button } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";

import {sorter, sortDirections} from './index';

const getEmployeesColumns = (facilities, editEmployee,roles) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter,
      sortDirections,
    },
    {
      title: 'Apellidos',
      dataIndex: 'lastNames',
      key: 'lastNames',
      sorter,
      sortDirections
    },
    {
      title: 'Matricula', dataIndex: 'internalId', key: 'internalId', sorter,
      sortDirections,
    },
    {
      title: 'Rol', dataIndex: 'privilegeLevel', key: 'privilegeLevel', sorter,
      sortDirections,
      filters: roles.map(({ name }) => ({ text: name, value: name })),
      onFilter: (value, record) => record.privilegeLevel === value,
    },
    {
      title: 'Beacon MAC Address', dataIndex: 'macAddress', key: 'macAddress', sorter,
      sortDirections,
    },
    {
      title: 'Edificio',
      dataIndex: 'facilityName',
      key: 'facilityName',
      sorter, sortDirections,
      filters: facilities.map(({ name }) => ({ text: name, value: name })),
      onFilter: (value, record) => record.facilityName === value,
    },
    {
      title: 'Editar',
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