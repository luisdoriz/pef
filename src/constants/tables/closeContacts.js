const getCloseContactsColumns = () => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Dirección de correo electrónico', dataIndex: 'email', key: 'email',
    },
  ]);

export {
    getCloseContactsColumns,
};

export default getCloseContactsColumns;