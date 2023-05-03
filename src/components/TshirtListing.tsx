import React from "react";
import useFetchTshirts from "../hooks/useFetchTshirts";

const TshirtListing = () => {
  const { tshirts } = useFetchTshirts();
  return (
    <div>
      {tshirts.map((tshirt, index) => {
        const {
          id,
          imageURL,
          name,
          type,
          price,
          currency,
          color,
          gender,
          quantity,
        } = tshirt;

        return (
          <div key={id}>
            <div>
              <img src={imageURL} alt={name} width={200} height={200} />
            </div>
            <h3>{name}</h3>
            <div>Rs. {price}</div>
            <button>Add to cart</button>
          </div>
        );
      })}
    </div>
  );
};

export default TshirtListing;
