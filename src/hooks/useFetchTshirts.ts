import { useEffect, useState } from "react";
import axios from "axios";

const fetchTshirtsUrl =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const useFetchTshirts = () => {
  const [tshirts, setTshirts] = useState([]);

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
