import { Typography } from "@mui/material/";
// import { useTheme } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { orderListSelector } from "../../../../redux-toolkit/selectors";

// function getIntroOfPage(label) {
//   if (label === "Skincare") {
//     return "";
//   }
//   if (label === "Page B") {
//     return "Page B is about womens dress";
//   }
//   if (label === "Page C") {
//     return "Page C is about womens bag";
//   }
//   if (label === "Page D") {
//     return "Page D is about household goods";
//   }
//   if (label === "Page E") {
//     return "Page E is about food";
//   }
//   if (label === "Page F") {
//     return "Page F is about baby food";
//   }
// }
function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
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
  // const theme = useTheme();
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
  // console.log("Total haircare quantity sold:", totalHaircareQuantity);

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
            // barSize={90}
            barSize={90}
            fill="#ab4aba"
            // style={{ fill: "var(--accent-9)" }}
            // fill={"var(--accent-9)"}
            shape={<TriangleBar />}
          />
        </BarChart>
        {/* <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart> */}
      </ResponsiveContainer>
    </>
  );
}
