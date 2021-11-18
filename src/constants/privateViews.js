import {
  BankOutlined,
  FileOutlined,
  PieChartOutlined,
  BellOutlined,
  SettingOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

import Visitors from "../views/Visitors";
import Employees from "../views/Employees";
import Users from "../views/Users";
import Cases from "../views/Cases";
import Alerts from "../views/Alerts";
import RegisterFacility from "../views/RegisterFacility";
import EditFacility from "../views/EditFacility";
import Reports from "../views/Reports";
import Facility from "../views/Facility";
import Organizations from "../views/Organizations"
import Admins from "../views/Admins"

const getViews = (facilities) => [
  {
    path: "/facility/:idFacility",
    component: Facility,
    showSidebar: true,
    sameComponent: true,
    text: "Edificios",
    icon: <BankOutlined />,
    access: [2, 3],
    subMenuItems: facilities.map(({ name, idFacility }) => ({
      subItemText: name,
      id: idFacility,
      route: "/facility",
    })),
  },
  {
    path: "/reports",
    component: Reports,
    showSidebar: true,
    text: "Reportes",
    icon: <PieChartOutlined />,
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
  {
    path: "/organizations",
    component: Organizations,
    showSidebar: false,
    access: [1],
  },
  {
    path: "/organization/:idOrganization",
    component: Admins,
    showSidebar: false,
    access: [1],
  },
];
export const getRoutes = (idRole, facilities) => {
  const routes = [];
  const views = getViews(facilities)
  views.forEach((viewItem) => {
    const { subMenuItems, access, sameComponent } = viewItem;
    if (access.includes(idRole)) {
      const hasNestedRoutes = typeof subMenuItems !== "undefined";
      if (hasNestedRoutes && !sameComponent) {
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

export const getSidebarContent = (idRole, facilities) => {
  const content = [];
  const views = getViews(facilities)
  views.forEach((viewItem) => {
    const { access } = viewItem;
    if (access.includes(idRole)) {
      content.push(viewItem);
    }
  });
  return content;
};

export default getRoutes;
