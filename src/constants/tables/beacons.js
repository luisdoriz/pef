import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const getBeaconsColumns = ( deleteBeacon ) => ([
    {
      title: "Dirección MAC",
      dataIndex: "macAddress",
      key: "macAddress",
    },
    {
      title: "Borrar",
      dataIndex: "",
      key: "x",
      render: (row) => (
        <Popconfirm
          title="¿Seguro que quieres borrar este beacon?"
          onConfirm={() => deleteBeacon(row)}
          okText="Confirmar"
          cancelText="Cancelar"
        >
          <Button type="danger" shape="round" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    }
  ]);
export { getBeaconsColumns };

export default getBeaconsColumns;
