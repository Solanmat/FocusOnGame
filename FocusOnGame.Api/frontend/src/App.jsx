import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardGames from "./pages/DashboardGames";
import GameCreator from "./pages/GameCreator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardGames" element={<DashboardGames />} />
        <Route path="/gameCreator" element={<GameCreator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;