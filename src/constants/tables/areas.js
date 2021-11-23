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
        title: 'Tiempo límite',
        dataIndex: 'timeLimit',
        key: 'timeLimit',
    },
    {
        title: 'Capacidad máxima',
        dataIndex: 'maxCapacity',
        key: 'maxCapacity',
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