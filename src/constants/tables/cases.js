import { Button } from 'antd';
import {
  EyeOutlined
} from "@ant-design/icons";

const getCasesColumns = (seeCaseDetail, facilities) => ([
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
    {
      title: 'Ver detalle',
      dataIndex: '',
      key: 'x',
      render: (row) => <Button
        onClick={() => seeCaseDetail(row)}
        shape="round"
        icon={<EyeOutlined />}
      />,
    },
  ]);

export {
  getCasesColumns,
};

export default getCasesColumns;