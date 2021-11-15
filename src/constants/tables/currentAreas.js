import { Tag } from 'antd';
const getCurrentAreasColumns = () => ([
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Color',
    key: 'color',
    dataIndex: 'color',
    render: (row) => (
      <>
      <Tag color={row}>
        Color
      </Tag>
      </>
    )
  },
]);

export {
  getCurrentAreasColumns,
};

export default getCurrentAreasColumns;