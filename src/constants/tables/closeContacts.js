import {sorter, sortDirections} from './index';

const getCloseContactsColumns = () => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter,
      sortDirections,
    },
    {
      title: 'Dirección de correo electrónico', dataIndex: 'email', key: 'email', sorter,
      sortDirections,
    },
  ]);

export {
    getCloseContactsColumns,
};

export default getCloseContactsColumns;