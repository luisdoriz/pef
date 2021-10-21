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
import Cases from "../views/Cases";
import Alerts from "../views/Alerts";

const views = [
  {
    path: "/facility/:facilityId",
    component: Home,
    showSidebar: true,
    text: "Edificios",
    icon: <BankOutlined />,
    access: [2, 3],
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
    access: [2, 3],
  },
  {
    path: "/alerts",
    component: Alerts,
    showSidebar: true,
    text: "Alertas",
    icon: <BellOutlined />,
    access: [2, 3],
  },
  {
    path: "/cases",
    component: Cases,
    showSidebar: true,
    text: "Contagios",
    icon: <MedicineBoxOutlined />,
    access: [2, 3],
  },
  {
    showSidebar: true,
    text: "Configuracion",
    icon: <SettingOutlined />,
    access: [2],
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
        path: "/settings/employees",
        component: Employees,
      },
      {
        subItemText: "Usuarios",
        id: "users",
        route: "/settings",
        path: "/settings/users",
        component: Users,
      },
    ],
  },
];
export const getRoutes = (idRole) => {
  const routes = [];
  views.forEach((viewItem) => {
    const { subMenuItems, access } = viewItem;
    if (access.includes(idRole)) {
      const hasNestedRoutes = typeof subMenuItems !== "undefined";
      if (hasNestedRoutes) {
        subMenuItems.forEach((subMenuItem) => {
          const { component } = subMenuItem;
          if (typeof component !== "undefined") {
            routes.push(subMenuItem);
          }
        });
      } else {
        routes.push(viewItem);
      }
    }
  });
  return routes;
};

export const getSidebarContent = (idRole) => {
  const content = [];
  views.forEach((viewItem) => {
    const { access } = viewItem;
    if (access.includes(idRole)) {
      content.push(viewItem);
    }
  });
  return content;
};

export default getRoutes;
