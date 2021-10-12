import { useState } from "react";
import { createUser } from "../../data/user";
import { useHistory } from "react-router-dom";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { history } = useHistory();
  const postUser = async (data) => {
    setLoading(true);
    const status = await createUser(data);
    console.log(status);
    history.push("/login");
    setLoading(false);
  };
  return { loading, postUser };
};

export default useSignUp;
