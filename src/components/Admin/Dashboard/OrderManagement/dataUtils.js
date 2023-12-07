export function createData(
  id,
  orderID,
  customers,
  orderDate,
  status,
  totalProduct,
  totalAmount,
  email
) {
  return {
    id,
    orderID,
    customers,
    orderDate,
    status,
    totalProduct,
    totalAmount,
    email,
  };
}
export function transformData(dataArray) {
  return dataArray.map((item) => {
    const totalProduct = item.orderDetails.reduce(
      (total, detail) => total + detail.quantity,
      0
    );

    return createData(
      item.id,
      item.orderId,
      item.customerInfo.fullName,
      item.orderInfo.orderDate, // Chuyển đổi timestamp thành ngày
      item.orderInfo.status,
      totalProduct,
      item.orderInfo.total,
      item.customerInfo.email
    );
  });
}
