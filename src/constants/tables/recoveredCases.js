const getRecoveredCasesColumns = (facilities) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fecha de prueba positiva', dataIndex: 'date', key: 'date', 
      sorter: (a, b) => a.date.localeCompare(b.date),
      sortDirections: ['descend','ascend','descend'],
      defaultSortOrder: 'descend',
      render: (row) => row.substring(0,10)
    },
    {
      title: 'Edificio', dataIndex: 'facilityName', key: 'facilityName',
      filters: facilities.map(({ facilityName }) => ({ text: facilityName, value: facilityName })),
      onFilter: (value, record) => record.facilityName === value,
    },
  ]);

export {
  getRecoveredCasesColumns,
};

export default getRecoveredCasesColumns;