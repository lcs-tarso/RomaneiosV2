import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SidebarLayout from "./components/SidebarLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import RomaneioList from "./pages/RomaneioList";
import RomaneioForm from "./pages/RomaneioForm";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rota pública de login */}
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas dentro do layout */}
        <Route
          path="/romaneios"
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          {/* Página inicial: listagem de romaneios */}
          <Route index element={<RomaneioList />} />

          {/* Página de criação de novo romaneio */}
          <Route path="novo" element={<RomaneioForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;


