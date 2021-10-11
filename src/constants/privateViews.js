import {
  BankOutlined,
  FileOutlined,
  BellOutlined,
  SettingOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

import Home from "../views/Home";
import Employees from "../views/Employees";
import Users from "../views/Users";

const views = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/settings/employees",
    component: Employees,
  },
  {
    path: "/settings/users",
    component: Users,
  },
  {
    path: "/facility/:facilityId",
    component: Home,
    showSidebar: true,
    text: "Edificios",
    icon: <BankOutlined />,
    subMenuItems: [
      {
        subItemText: "Edificio 1",
        id: 1,
        route: "/facility",
      },
      {
        subItemText: "Edificio 2",
        id: 2,
        route: "/facility",
      },
    ],
  },
  {
    path: "/reports",
    component: Home,
    showSidebar: true,
    text: "Reportes",
    icon: <FileOutlined />,
  },
  {
    path: "/alerts",
    component: Home,
    showSidebar: true,
    text: "Alertas",
    icon: <BellOutlined />,
  },
  {
    path: "/contagion",
    component: Home,
    showSidebar: true,
    text: "Contagios",
    icon: <MedicineBoxOutlined />,
  },
  {
    path: "/settings",
    showSidebar: true,
    text: "Configuracion",
    icon: <SettingOutlined />,
    subMenuItems: [
      {
        subItemText: "Edificios",
        id: "facilities",
        route: "/settings",
      },
      {
        subItemText: "Empleados",
        id: "employees",
        route: "/settings",
      },
      {
        subItemText: "Contagios",
        id: "contagion",
        route: "/settings",
      },
      {
        subItemText: "Usuarios",
        id: "users",
        route: "/settings",
      },
    ],
  },
];

export default views;
