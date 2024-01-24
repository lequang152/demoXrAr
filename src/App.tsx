import "./App.css";
import { Route, Routes } from "react-router-dom";
import XrHitModelContainer from "./components/xr-hit-model/XrHitModelContainer";
import FallingDogContainer from "./components/dog/FallingDogContainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<XrHitModelContainer />} />

      <Route path="/dog" element={<FallingDogContainer />} />
    </Routes>
  );
}

export default App;
