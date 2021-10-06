import {
  BankOutlined,
  FileOutlined,
  BellOutlined,
  SettingOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

import Home from "../views/Home";

const views = [
  {
    path: "/home",
    component: Home,
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
    component: Home,
    showSidebar: true,
    text: "Configuracion",
    icon: <SettingOutlined />,
  },
];

export default views;
