import { Button, Popconfirm } from 'antd';
import {
  EditOutlined
} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { DeleteOutlined } from "@ant-design/icons";

const getFacilitiesColumns = ( removeFacility) => ([
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
              shape="round"
              icon={<EditOutlined />}
      /></Link>,
    },
    {
      title: "Borrar",
      dataIndex: "",
      key: "x",
      render: (row) => (
        <Popconfirm
          title="¿Seguro que quieres borrar este edificio?"
          onConfirm={() => removeFacility(row.idFacility)}
          okText="Confirmar"
          cancelText="Cancelar"
          okButtonProps={{shape:"round"}}
          cancelButtonProps={{shape:"round"}}
        >
          <Button type="danger" shape="round" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    }
  ]);

export {
  getFacilitiesColumns,
};

export default getFacilitiesColumns;