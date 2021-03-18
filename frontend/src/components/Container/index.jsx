const Container = ({ children, style }) => {
    return (
      <div style={style} className="container">
        {children}
      </div>
    );
  };
  
  export default Container;