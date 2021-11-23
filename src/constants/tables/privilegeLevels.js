import { Button, Tag } from 'antd';
import {
    EditOutlined
  } from "@ant-design/icons";

const getPrivilegeLevelColumns = (editRole) => ([
    {
      title: "Rol",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "Áreas",
        dataIndex: "areas",
        key: "areas",
        render: areas => (
            <>
              {areas.map(area => {
                return (
                  <Tag color="geekblue" key={area.idArea}>
                    {area.name}
                  </Tag>
                );
              })}
            </>
          ),
      },
      {
        title: "Hora de llegada",
        dataIndex: "entryTime",
        key: "entryTime",
      },
    {
        title: 'Editar',
        dataIndex: '',
        key: 'x',
        render: (row) => <Button
          onClick={() => editRole(row)}
          shape="round"
          icon={<EditOutlined />}
        />,
      },
    ]);
export { getPrivilegeLevelColumns };

export default getPrivilegeLevelColumns;
