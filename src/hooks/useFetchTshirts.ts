import axios from "axios";
import { useEffect, useState } from "react";

import { fetchTshirtsUrl } from "../constants";
import { ITshirt } from "../types";

const useFetchTshirts = () => {
  const [tshirts, setTshirts] = useState<Array<ITshirt>>([]);
  const [loading, setLoading] = useState(false);

  const fetchTshirts = async () => {
    try {
      const { data, status } = await axios.get(fetchTshirtsUrl);
      if (status === 200) {
        setLoading(false);
        setTshirts(data);
      }
    } catch (error) {
      console.error("error occured while fetching tshirts ", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTshirts([]);
    fetchTshirts();
  }, []);

  return { loading, tshirts };
};

export default useFetchTshirts;
