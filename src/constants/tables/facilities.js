import { Button } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";
import { Link } from 'react-router-dom';

const getFacilitiesColumns = ( editFacility ) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Editar',
      dataIndex: '',
      key: 'x',
      render: (row) =>  <Link to={`/settings/facility/${row.idFacility}`}>
          <Button
              onClick={() => editFacility(row)}
              type="primary"
              shape="round"
              icon={<EditOutlined />}
      /></Link>,
    },
  ]);

export {
  getFacilitiesColumns,
};

export default getFacilitiesColumns;