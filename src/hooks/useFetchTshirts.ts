import axios from "axios";
import { useEffect, useState } from "react";

import { fetchTshirtsUrl } from "../constants";
import { ITshirt } from "../types";

const useFetchTshirts = () => {
  const [tshirts, setTshirts] = useState<Array<ITshirt>>([]);

  const fetchTshirts = async () => {
    try {
      const { data, status } = await axios.get(fetchTshirtsUrl);
      if (status === 200) {
        setTshirts(data);
      }
    } catch (error) {
      console.error("error occured while fetching tshirts ", error);
    }
  };

  useEffect(() => {
    setTshirts([]);
    fetchTshirts();
  }, []);

  return { tshirts };
};

export default useFetchTshirts;
