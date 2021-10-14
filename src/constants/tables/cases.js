import { Button } from 'antd';
import {sorter, sortDirections} from './index';
import {
  PlusCircleOutlined
} from "@ant-design/icons";

const getCasesColumns = (seeCaseDetail) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter,
      sortDirections,
    },
    {
      title: 'Fecha de prueba positiva', dataIndex: 'contagionDate', key: 'contagionDate', sorter,
      sortDirections,
    },
    {
      title: 'Edificio', dataIndex: 'facilityId', key: 'facilityId', sorter,
      sortDirections,
    },
    {
      title: 'Ver detalle',
      dataIndex: '',
      key: 'x',
      render: (row) => <Button
        onClick={() => seeCaseDetail(row)}
        type="primary"
        shape="round"
        icon={<PlusCircleOutlined />}
      />,
    },
  ]);

export {
  getCasesColumns,
};

export default getCasesColumns;