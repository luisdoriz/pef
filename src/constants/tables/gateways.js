import { Button } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";

const getGatewaysColumns = (editGateway) => ([
  {
    title: 'Dirección MAC',
    dataIndex: 'macAddress',
    key: 'macAddress',
  },
  {
    title: 'Área',
    dataIndex: 'name',
    key: 'name'
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