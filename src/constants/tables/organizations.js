import { Button } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const getOrganizationsColumns = (editOrganization) => ([
    {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Dirección",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Teléfono",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
    },
    {
        title: 'Editar',
        dataIndex: '',
        key: 'x',
        render: (row) => <Button
            onClick={() => editOrganization(row)}
            shape="round"
            icon={<EditOutlined />}
        />,
    },
    {
        title: 'Ver administradores',
        dataIndex: '',
        key: 'x',
        render: (row) =>  <Link to={`/organization/${row.idOrganization}`}>
            <Button
                shape="round"
                icon={<EyeOutlined />}
        /></Link>,
      },
]
);
export { getOrganizationsColumns };

export default getOrganizationsColumns;
