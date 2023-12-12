import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material/";
import { orderListSelector } from "../../../../redux-toolkit/selectors";

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}
const getPath = (x, y, width, height) =>
  `M${x},${y + height}
   C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
    x + width / 2
  }, ${y}
   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
   Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
export default function Chart() {
  const orderList = useSelector(orderListSelector);
  function calculateTotalQuantityByType(orders, type) {
    let totalQuantity = 0;
    orders.forEach((order) => {
      order.orderDetails.forEach((item) => {
        if (item.type === type) {
          totalQuantity += item.quantity;
        }
      });
    });
    return totalQuantity;
  }
  const totalHaircare = calculateTotalQuantityByType(orderList, "haircare");
  const totalMakeup = calculateTotalQuantityByType(orderList, "makeup");
  const totalSkincare = calculateTotalQuantityByType(orderList, "skincare");
  const createChartData = () => [
    { label: "Skincare", value: totalSkincare },
    { label: "Makeup", value: totalMakeup },
    { label: "Haircare", value: totalHaircare },
  ];
  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        gutterBottom
        sx={{
          color: "#5f748d",
        }}
      >
        Type
      </Typography>

      <ResponsiveContainer>
        <BarChart width={500} height={300} data={createChartData()}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            barSize={90}
            fill="#ab4aba"
            shape={<TriangleBar />}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
