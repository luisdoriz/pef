import {sorter, sortDirections} from './index';

const getAlertsColumns = () => ([
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      sorter,
      sortDirections,
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
  ]);

export {
  getAlertsColumns,
};

export default getAlertsColumns;