import { Button } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";

const getEmployeesColumns = (facilities, editEmployee,privilegeLevels) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellidos',
      dataIndex: 'lastNames',
      key: 'lastNames',
    },
    {
      title: 'Matricula', dataIndex: 'internalId', key: 'internalId',
    },
    {
      title: 'Rol', dataIndex: 'privilegeLevel', key: 'privilegeLevel', 
      filters: privilegeLevels.map(({ name }) => ({ text: name, value: name })),
      onFilter: (value, record) => record.privilegeLevel === value,
    },
    {
      title: 'Beacon MAC Address', dataIndex: 'macAddress', key: 'macAddress', 
    },
    {
      title: 'Edificio',
      dataIndex: 'facilityName',
      key: 'facilityName',
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