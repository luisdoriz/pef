import {sorter, sortDirections} from './index';

const getRecoveredCasesColumns = (facilities) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter,
      sortDirections,
    },
    {
      title: 'Fecha de prueba positiva', dataIndex: 'date', key: 'date', sorter,
      sortDirections,
      render: (row) => row.substring(0,10)
    },
    {
      title: 'Edificio', dataIndex: 'facilityName', key: 'facilityName', sorter,
      sortDirections,
      filters: facilities.map(({ facilityName }) => ({ text: facilityName, value: facilityName })),
      onFilter: (value, record) => record.facilityName === value,
    },
  ]);

export {
  getRecoveredCasesColumns,
};

export default getRecoveredCasesColumns;