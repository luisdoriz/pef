import { Button } from 'antd';
import {sorter, sortDirections} from './index';
import {
  ArrowRightOutlined
} from "@ant-design/icons";

const getCasesColumns = (seeCaseDetail, facilities) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter,
      sortDirections,
    },
    {
      title: 'Fecha de prueba positiva', dataIndex: 'date', key: 'date', sorter,
      sortDirections,
      render: (row) => row.substring(0,10)
    },
    {
      title: 'Edificio', dataIndex: 'facilityName', key: 'facilityName', sorter,
      sortDirections,
      filters: facilities.map(({ facilityName }) => ({ text: facilityName, value: facilityName })),
      onFilter: (value, record) => record.facilityName === value,
    },
    {
      title: 'Ver detalle',
      dataIndex: '',
      key: 'x',
      render: (row) => <Button
        onClick={() => seeCaseDetail(row)}
        type="primary"
        shape="round"
        ghost
        icon={<ArrowRightOutlined />}
      />,
    },
  ]);

export {
  getCasesColumns,
};

export default getCasesColumns;