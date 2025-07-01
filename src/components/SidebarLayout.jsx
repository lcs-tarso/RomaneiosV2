import { useNavigate, Link, Outlet } from "react-router-dom";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { email: "" };

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
