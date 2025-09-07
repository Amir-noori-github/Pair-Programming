import IdCard from "./IdCard";   // ✅ only import, do not redeclare
import Random from "./Random";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>LAB | React Training</h1>

      {/* IdCards */}
      <IdCard
        lastName="Doe"
        firstName="John"
        gender="male"
        height={176}
        birth={new Date("1992-07-14")}
        picture="https://randomuser.me/api/portraits/men/44.jpg"
      />

      <IdCard
        lastName="Delores"
        firstName="Obrien"
        gender="female"
        height={174}
        birth={new Date("1988-05-11")}
        picture="https://randomuser.me/api/portraits/women/44.jpg"
      />

      {/* Random numbers */}
      <Random min={1} max={6} />
      <Random min={1} max={100} />
    </div>
  );
}

export default App;
