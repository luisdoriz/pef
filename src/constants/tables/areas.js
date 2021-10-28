import { Button } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";

import {sorter, sortDirections} from './index';

const getAreasColumns = ( editArea ) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter,
      sortDirections,
    },
    {
        title: 'Tiempo límite',
        dataIndex: 'timeLimit',
        key: 'timeLimit',
        sorter,
        sortDirections,
    },
    {
        title: 'Capacidad máxima',
        dataIndex: 'maxCapacity',
        key: 'maxCapacity',
        sorter,
        sortDirections,
      },
    {
      title: 'Editar',
      dataIndex: '',
      key: 'x',
      render: (row) => <Button
        onClick={() => editArea(row)}
        type="primary"
        shape="round"
        icon={<EditOutlined />}
      />,
    },
  ]);

export {
  getAreasColumns,
};

export default getAreasColumns;