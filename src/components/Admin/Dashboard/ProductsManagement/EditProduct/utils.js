// utils.js
import shortid from "shortid";

// ham tao data
export const constructNewProductData = (data, productWithId, image) => {
  return {
    id: productWithId.id,
    ...data,
    star: productWithId.star,
    image,
    prevPrice:
      Number(data.currentPrice) === 0
        ? Number(productWithId.prevPrice)
        : Number(productWithId.currentPrice),
    currentPrice:
      Number(data.currentPrice) === 0
        ? Number(productWithId.currentPrice)
        : Number(data.currentPrice),
  };
};

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
