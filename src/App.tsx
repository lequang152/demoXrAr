import "./App.css";
import { Route, Routes } from "react-router-dom";
import FallingContainer from "./components/falling/FallingContainer";
import ThreeScene from "./components/cube/ThreeScene";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FallingContainer />} />
    </Routes>
  );
}

export default App;
