import BoxColor from "./BoxColor";
import Greetings from "./Greeting";

const App = () => {
  return (
    <div> 
      <BoxColor r={255} g={0} b={0} />
      <BoxColor r={128} g={255} b={0} />
      <Greetings lang="de">Ludwig</Greetings>
      <Greetings lang="fr">François</Greetings>
      <Greetings lang="fi">Stadin</Greetings>
    </div>
  );
};

export default App;