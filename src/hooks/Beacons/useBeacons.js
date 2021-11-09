import { useEffect, useState } from "react";
import { getAvailableBeacons, deleteBeacon, postBeacon } from "../../data/beacons";

export const useBeacons = (idFacility) => {
  const [beacons, setBeacons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeacons = async () => {
      const response = await getAvailableBeacons();
      setBeacons(response.data);
      setLoading(false)
    };
    if (beacons.length === 0 && loading)
      fetchBeacons();
  },[beacons, loading]);

  const removeBeacon = async (body) => {
    // eslint-disable-next-line no-unused-vars
    const status = await deleteBeacon(body);
    setLoading(true);
    setBeacons([]);
  }

  const createBeacon = async (body) => {
    const response = await postBeacon({macAddress:body.macAddress, idFacility: idFacility});
    setLoading(true);
    setBeacons([])
  }

  return {
    beacons,
    removeBeacon,
    createBeacon,
    loading,
  };
};

export default useBeacons;