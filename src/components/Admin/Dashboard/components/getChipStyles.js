const getChipStyles = (status) => {
  switch (status) {
    case "REFUNDED":
      return {
        backgroundColor: "#f0443842",
        color: "#b42318",
        borderRadius: "5px",
      };
    case "DELIVERED":
      return {
        backgroundColor: "#10b98133",
        color: "#0b815a",
        borderRadius: "5px",
      };
    default:
      return {
        backgroundColor: "#f7900938",
        color: "#b54708f7",
        borderRadius: "5px",
      };
  }
};
export default getChipStyles;
