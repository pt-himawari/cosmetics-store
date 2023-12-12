// utils.js
import shortid from "shortid";

// Hàm tạo ID sản phẩm
export const generateProductId = (productType) => {
  const valueType = {
    haircare: "HAIR",
    makeup: "MU",
    skincare: "SKIN",
  };
  const intID = valueType[productType] || "OTH";
  return `${intID}-${shortid.generate()}`;
};
