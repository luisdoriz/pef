import { Button } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";

import {sorter, sortDirections} from './index';

const getGatewaysColumns = ( editGateway ) => ([
    {
      title: 'Dirección MAC',
      dataIndex: 'macAddress',
      key: 'macAddress',
      sorter,
      sortDirections,
    },
    {
        title: 'Coordenada x',
        dataIndex: 'x',
        key: 'x',
        sorter,
        sortDirections,
    },
    {
        title: 'Coordenada y',
        dataIndex: 'y',
        key: 'y',
        sorter,
        sortDirections,
      },
    {
      title: 'Editar',
      dataIndex: '',
      key: 'x',
      render: (row) => <Button
        onClick={() => editGateway(row)}
        type="primary"
        shape="round"
        icon={<EditOutlined />}
      />,
    },
  ]);

export {
  getGatewaysColumns,
};

export default getGatewaysColumns;