import dayjs from "dayjs";

const formatDate = (unixTimestamp) =>
  dayjs.unix(unixTimestamp).format("DD-MM-YYYY");
export default formatDate;
