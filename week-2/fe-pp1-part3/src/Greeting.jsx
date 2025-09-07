const Greetings = (props) => {
  let greeting;

  switch (props.lang) {
    case "fi":
      greeting = "Hei";
      break;
    case "de":
      greeting = "Hallo";
      break;
    case "en":
      greeting = "Hello";
      break;
    case "es":
      greeting = "Hola";
      break;
    case "fr":
      greeting = "Bonjour";
      break;
    default:
      greeting = "Hello";
  }

  const boxStyle = {
    border: "1px solid black",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    fontSize: "1.2rem",
    textAlign: "left",
  };

  return (
    <div style={boxStyle}>
      {greeting} {props.children}
    </div>
  );
};

export default Greetings;
