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
        title: 'Editar',
        dataIndex: '',
        key: 'x',
        render: (row) => <Button
          onClick={() => editRole(row)}
          type="primary"
          shape="round"
          icon={<EditOutlined />}
        />,
      },
    ]);
export { getPrivilegeLevelColumns };

export default getPrivilegeLevelColumns;
