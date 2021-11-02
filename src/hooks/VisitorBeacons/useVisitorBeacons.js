/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getAvailableBeacons } from "../../data/beacons";

export const useVisitorBeacons = () => {
  const [beacons, setBeacons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeacons = async () => {
      const { data } = await getAvailableBeacons();
      setBeacons(data);
      setLoading(false);
    };
    if (beacons.length === 0 && loading) {
      fetchBeacons();
    }
  }, [beacons, loading]);

  // const postUser = async (body) => {
  //   const { status } = await createUser(body);
  //   setLoading(true);
  //   setUsers([]);
  // }

  const deleteBeacon = async ({ idBeacon }) => {
    console.log(idBeacon);
    setLoading(true);
    setBeacons([]);
  };

  // const editUser = async (body) => {
  //   const { status } = await putUser(body);
  //   setLoading(true);
  //   setUsers([]);
  // }

  return {
    beacons,
    deleteBeacon,
    loading,
  };
};

export default useVisitorBeacons;
