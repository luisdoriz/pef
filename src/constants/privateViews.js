import {
  BankOutlined,
  FileOutlined,
  BellOutlined,
  SettingOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

import Home from "../views/Home";
import Visitors from "../views/Visitors";
import VisitorBeacons from "../views/VisitorBeacons";
import Employees from "../views/Employees";
import Users from "../views/Users";
import Cases from "../views/Cases";
import Alerts from "../views/Alerts";
import RegisterFacility from "../views/RegisterFacility";
import EditFacility from "../views/EditFacility";

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
    path: "/",
    component: Visitors,
    showSidebar: true,
    text: "Visitantes",
    icon: <FileOutlined />,
    access: [4],
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
    text: "Configuración",
    icon: <SettingOutlined />,
    access: [2],
    subMenuItems: [
      {
        subItemText: "Edificios",
        id: "facilities",
        route: "/settings",
        path: "/settings/facilities",
        component: RegisterFacility,
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
  {
    path: "/settings/facility/:idFacility",
    component: EditFacility,
    showSidebar: false,
    access: [2],
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
