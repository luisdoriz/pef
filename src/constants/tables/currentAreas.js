import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const getCurrentAreasColumns = ( deleteArea ) => ([
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: "Borrar",
        dataIndex: "name",
        key: "x",
        render: (row) => (
          <Popconfirm
            title="¿Seguro que quieres borrar esta área?"
            onConfirm={() => deleteArea(row)}
            okText="Confirmar"
            cancelText="Cancelar"
          >
            <Button type="danger" shape="round" icon={<DeleteOutlined />} />
          </Popconfirm>
        ),
    },
  ]);

export {
  getCurrentAreasColumns,
};

export default getCurrentAreasColumns;