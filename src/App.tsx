import { atom, useAtom } from "./jotai";
import "./App.css";

const ageAtom = atom(25);

function AgeDisplay() {
  const [age] = useAtom(ageAtom);

  return (
    <div>
      <h2>My age: {age}</h2>
    </div>
  );
}

function App() {
  const [age, setAge] = useAtom(ageAtom);

  return (
    <>
      <h1>Jotai Clone</h1>
      <div className="card">
        <AgeDisplay />
        <input
          className="age_input"
          value={age}
          onChange={(e) => setAge(+e.target.value)}
        />
      </div>
    </>
  );
}

export default App;
