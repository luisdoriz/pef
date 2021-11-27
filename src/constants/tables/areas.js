import { Button } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";

const getAreasColumns = ( editArea ) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Tiempo límite (minutos)',
        dataIndex: 'timeLimit',
        key: 'timeLimit',
        render: (row) => (row===null) ? 'Ilimitado' : row
    },
    {
        title: 'Capacidad máxima',
        dataIndex: 'maxCapacity',
        key: 'maxCapacity',
        render: (row) => (row===null) ? 'Ilimitada' : row
      },
    {
      title: 'Editar',
      dataIndex: '',
      key: 'x',
      render: (row) => <Button
        onClick={() => editArea(row)}
        shape="round"
        icon={<EditOutlined />}
      />,
    },
  ]);

export {
  getAreasColumns,
};

export default getAreasColumns;