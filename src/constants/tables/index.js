import { getEmployeesColumns } from "./employees";
import { getUserColumns } from "./users";

const sorter = (a, b) => a.name.length - b.name.length;
const sortDirections = ["descend"];

export { sorter, sortDirections, getEmployeesColumns, getUserColumns };

export default sorter;
