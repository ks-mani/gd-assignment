const Layer = ({ children }) => {
  return (
    <div
      style={{
        padding: "20px 30px",
        boxShadow: "0 0 30px 0 rgb(218, 218, 218)",
        margin: "20px 0",
      }}
    >
      {children}
    </div>
  );
};

export default Layer;
