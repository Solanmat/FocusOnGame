import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPathways from "./pages/DashboardPathways";
import GameCreator from "./pages/GameCreator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardPathways/:idUser" element={<DashboardPathways />} />
        <Route path="/gameCreator/:idUser/:namePathway" element={<GameCreator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;