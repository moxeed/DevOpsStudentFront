const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, auto)",
  "@media (max-width:910px)": {
    gridTemplateColumns: "repeat(2, auto)",
  },
  "@media (max-width:725px)": {
    gridTemplateColumns: "repeat(1, auto)",
  },
};

const cardContainerStyle = {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  backgroundColor: "white",
  height: "100%",
};

const flexibleCardStyle = { display: "flex", flexDirection: "column" };

export { containerStyle, cardContainerStyle, flexibleCardStyle };
