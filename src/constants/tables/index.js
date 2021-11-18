import { getEmployeesColumns } from "./employees";
import { getUserColumns } from "./users";
import { getCasesColumns } from "./cases";
import { getRecoveredCasesColumns } from "./recoveredCases";
import { getCloseContactsColumns } from "./closeContacts";
import { getAlertsColumns } from "./alerts";
import { getFacilitiesColumns } from "./facilities"
import { getAreasColumns } from "./areas"
import { getGatewaysColumns } from "./gateways"
import { getCurrentAreasColumns } from "./currentAreas"
import { getBeaconsColumns } from "./beacons"
import { getPrivilegeLevelColumns } from "./privilegeLevels"
import { getVisitorColumns } from "./visitors";
import { getVisitorBeaconsColumns } from "./visitorBeacons";
import { getOrganizationsColumns } from "./organizations"
import { getAdminColumns } from "./admins"

export {
  getEmployeesColumns,
  getUserColumns,
  getCasesColumns,
  getCloseContactsColumns,
  getRecoveredCasesColumns,
  getAlertsColumns,
  getVisitorColumns,
  getVisitorBeaconsColumns,
  getFacilitiesColumns,
  getAreasColumns,
  getGatewaysColumns,
  getCurrentAreasColumns,
  getBeaconsColumns,
  getPrivilegeLevelColumns,
  getOrganizationsColumns,
  getAdminColumns
};

export default getEmployeesColumns;
