import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link, Outlet } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function isAuthenticated() {
  return localStorage.getItem("auth") === "true";
}

function getLoggedUser() {
  return JSON.parse(localStorage.getItem("user")) || { email: "" };
}

function saveRomaneioWithRevision(data) {
  const romaneios = JSON.parse(localStorage.getItem("romaneios") || "[]");
  const user = getLoggedUser();
  const now = new Date();
  const dateStr = now.toLocaleDateString("pt-BR").replaceAll("/", ".");
  const nomeObra = data.centroCusto?.replace(/\s+/g, "") || "Obra";
  const numero = data.numeroControle || (romaneios.length + 1).toString();
  const nomeArquivo = `${numero}_Romaneio de entrega de notas_${dateStr}_${nomeObra}`;

  const revisao = {
    ...data,
    revisaoId: Date.now(),
    criadoPor: user.email,
    nomeArquivo,
    criadoEm: now.toISOString(),
  };

  localStorage.setItem("romaneios", JSON.stringify([...romaneios, revisao]));
}

function RevisaoModal({ aberto, onClose, ultima, anterior }) {
  const diffFields = (a, b) => {
    return Object.keys(a)
      .filter(key => a[key] !== b[key] && !["revisaoId", "criadoEm"].includes(key))
      .map(key => ({
        campo: key,
        de: a[key],
        para: b[key],
      }));
  };

  const diferencas = diffFields(anterior, ultima);

  return (
    <Dialog open={aberto} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Diferenças da Revisão</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p><strong>Arquivo:</strong> {ultima.nomeArquivo}</p>
          <p><strong>Criado por:</strong> {ultima.criadoPor}</p>
          {diferencas.length > 0 ? (
            <ul className="space-y-2">
              {diferencas.map((d, i) => (
                <li key={i} className="text-sm">
                  <strong>{d.campo}</strong><br />
                  <span className="text-red-500 line-through">{d.de}</span> ➔ <span className="text-green-600 font-semibold">{d.para}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Sem diferenças detectadas.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

function SidebarLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getLoggedUser());

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-64 bg-gray-100 p-4 space-y-4">
        <div className="flex items-center justify-between md:block">
          <h2 className="text-xl font-bold">Romaneios</h2>
          <p className="text-sm text-gray-600 hidden md:block">{user.email}</p>
        </div>
        <nav className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 mt-4">
          <Link to="/romaneios" className="hover:underline">Lista</Link>
          <Link to="/romaneios/novo" className="hover:underline">Novo</Link>
          <button onClick={handleLogout} className="text-red-500 text-left hover:underline">Sair</button>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && senha) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/romaneios");
    } else {
      alert("Preencha e-mail e senha");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-32 p-4 text-center">
      <h1 className="text-3xl font-bold mb-2">ROMANEIOS</h1>
      <p className="text-sm text-gray-500 mb-6">Developed by TARSOLUTIONS</p>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <form onSubmit={handleLogin} className="grid gap-4">
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <Button type="submit">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/romaneios"
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<RomaneioList />} />
          <Route path="novo" element={<RomaneioForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
