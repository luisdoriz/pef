import {sorter, sortDirections} from './index';

const getRecoveredCasesColumns = () => ([
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
    },
  ]);

export {
  getRecoveredCasesColumns,
};

export default getRecoveredCasesColumns;