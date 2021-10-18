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
      title: 'Fecha de prueba positiva', dataIndex: 'contagionDate', key: 'contagionDate', sorter,
      sortDirections,
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