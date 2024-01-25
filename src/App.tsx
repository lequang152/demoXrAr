import "./App.css";
import { Route, Routes } from "react-router-dom";
import FallingContainer from "./components/falling/FallingContainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FallingContainer />} />
    </Routes>
  );
}

export default App;
