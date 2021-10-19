import { getEmployeesColumns } from "./employees";
import { getUserColumns } from "./users";
import { getCasesColumns } from "./cases";
import { getRecoveredCasesColumns } from "./recoveredCases";
import { getCloseContactsColumns } from "./closeContacts";
import { getAlertsColumns } from "./alerts";

const sorter = (a, b) => a.name.length - b.name.length;
const sortDirections = ["descend"];

export { sorter, sortDirections, getEmployeesColumns, getUserColumns,  getCasesColumns, getCloseContactsColumns, getRecoveredCasesColumns, getAlertsColumns};

export default sorter;
