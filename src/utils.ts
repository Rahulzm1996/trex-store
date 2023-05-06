export const convertToNumber = (num: string) => {
  return Number(num.replace(/Rs/, ""));
};

export const generateMinMaxFromLabelOfPrice = (price: string) => {
  console.log("generate : ", price);
  if (price.includes("-")) {
    const [min, max] = price.split("-");
    let priceInRs = {};
    if (Number(min) === 0) {
      priceInRs = { min: 0, max: convertToNumber(max) };
    } else {
      priceInRs = {
        min: convertToNumber(min),
        max: convertToNumber(max),
      };
    }
    return priceInRs;
  } else {
    return { min: 0, max: convertToNumber(price) };
  }
};
