// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AlSidrDashboard from "./components/AlSidrDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AlSidrDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
