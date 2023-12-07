export function createData(
  id,
  name,
  type,
  category,
  brand,
  quantity,
  prevPrice,
  currentPrice
) {
  return {
    id,
    name,
    type,
    category,
    brand,
    quantity,
    prevPrice,
    currentPrice,
  };
}
export function transformData(dataArray) {
  return dataArray.map((item) =>
    createData(
      item.id,
      item.name,
      item.type,
      item.category,
      item.brand,
      item.quantity,
      item.prevPrice,
      item.currentPrice
    )
  );
}
