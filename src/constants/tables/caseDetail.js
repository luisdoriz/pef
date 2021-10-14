const getCaseDetailColumns = () => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido', dataIndex: 'lastName', key: 'lastName',
    },
    {
      title: 'Fecha de prueba positiva', dataIndex: 'contagionDate', key: 'contagionDate',
    },
  ]);

export {
  getCaseDetailColumns,
};

export default getCaseDetailColumns;