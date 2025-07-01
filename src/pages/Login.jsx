import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
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
