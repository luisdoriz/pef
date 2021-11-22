import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const getAreasTrafficReportsColumns = () => [
  {
    title: "Área",
    dataIndex: "label",
    key: "label",
  },
  {
    title: "Frecuencia de personas",
    dataIndex: "value",
    key: "value",
  },
];

const getHeatMapReportsColumns = () => [
  {
    title: "Persona",
    dataIndex: "personName",
    key: "personName",
  },
  {
    title: "Apellidos",
    dataIndex: "",
    key: "x",
    render: ({ firstLastName, secondLastName }) =>
      `${firstLastName} ${secondLastName}`,
  },
  {
    title: "Área",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Frecuencia",
    dataIndex: "count",
    key: "count",
  },
];

const getCheckInReportsColumns = () => [
  {
    title: "Persona",
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
    title: "Fecha de registro",
    dataIndex: "CreationDate",
    key: "CreationDate",
    render: (date) => moment(date).format("MMMM D YYYY, h:mm a"),
  },
];

export {
  getAreasTrafficReportsColumns,
  getHeatMapReportsColumns,
  getCheckInReportsColumns,
};

export default getAreasTrafficReportsColumns;
