/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import getFacilities from "../../data/facilities";
import getFacilityReport from "../../data/reports";

export const useReports = () => {
  const [traffic, setTraffic] = useState([]);
  const [heatMap, setHeatMap] = useState([]);
  const [checkIn, setCheckIn] = useState([]);
  const [casesReport, setCasesReport] = useState([]);
  const [timeSpent, setTimeSpent] = useState([]);
  const [casesReportData, setCasesReportData] = useState([]);
  const [facilites, setFacilites] = useState([]);
  const [idFacility, setIdFacility] = useState(null);
  const [from, setFrom] = useState(moment().startOf('week'));
  const [to, setTo] = useState(moment());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInfo = async () => {
      if (facilites.length === 0) {
        const { data } = await getFacilities();
        if (data.length > 0) {
          setFacilites(data);
          setIdFacility(
            data.sort((a, b) => (a.idFacility > b.idFacility ? 1 : -1))[0]
              .idFacility
          );
        }
      } else if (idFacility) {
        setLoading(true);
        const body = {
          to: to.format("YYYY-MM-DD"),
          from: from.format("YYYY-MM-DD"),
          idFacility,
        };
        const {
          areaTraffic,
          areaOcurrencies,
          cases: {
            casesReport: casesReportLocal,
            casesReportData: casesReportDataLocal,
          },
          checkIn: checkInData,
          timeSpentData,
        } = await getFacilityReport(body);
        setTraffic(areaTraffic);
        setHeatMap(areaOcurrencies);
        setCheckIn(checkInData);
        setCasesReport(casesReportLocal);
        setCasesReportData(casesReportDataLocal);
        setCheckIn(checkInData);
        setTimeSpent(timeSpentData)
        setLoading(false);
      }
    };
    fetchInfo();
  }, [facilites, idFacility, to, from]);

  return {
    traffic,
    heatMap,
    checkIn,
    from,
    to,
    loading,
    setFrom,
    setTo,
    facilites,
    idFacility,
    setIdFacility,
    casesReport,
    casesReportData,
    timeSpent,
  };
};

export default useReports;
