import moment from "moment";
import { Button } from "antd";
import { sorter, sortDirections } from "./index";
import { EditOutlined } from "@ant-design/icons";
import "moment/locale/es";

moment.locale("es");

const getVisitorColumns = (editVisitor) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Apellidos",
    dataIndex: "",
    key: "x",
    render: ({ firstLastName, secondLastName }) =>
      `${firstLastName} ${secondLastName}`,
  },
  {
    title: "Direccion de correo",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Permiso",
    dataIndex: "privilegeLevel",
    key: "privilegeLevel",
  },
  {
    title: "Id del beacon",
    dataIndex: "idBeacon",
    key: "idBeacon",
  },
  {
    title: "Mac address del beacon",
    dataIndex: "macAddress",
    key: "macAddress",
  },
  {
    title: "Fecha limite",
    dataIndex: "expirationDate",
    key: "expirationDate",
    render: (date) => {
      const momentDate = moment(date);
      const momentDateFormatted = momentDate.format("MMMM D YYYY, h:mm a");
      if (momentDate > moment()) {
        return momentDateFormatted;
      }
      return (
        <strong style={{ color: "#AD0000" }}>{momentDateFormatted}</strong>
      );
    },
  },
  {
    title: "Editar",
    dataIndex: "",
    key: "x",
    render: (row) => (
      <Button
        onClick={() => editVisitor(row)}
        type="primary"
        shape="round"
        icon={<EditOutlined />}
      />
    ),
  },
];

export { getVisitorColumns };

export default getVisitorColumns;
