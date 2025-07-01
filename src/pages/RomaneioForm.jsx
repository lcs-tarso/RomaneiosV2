import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RomaneioForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    numeroControle: "",
    dataEmissao: "",
    numeroNota: "",
    emitente: "",
    descricao: "",
    categoria: "",
    valorBruto: "",
    iss: "",
    inss: "",
    pis: "",
    cofins: "",
    descontoValor: "",
    valorLiquido: "",
    vencimento: "",
    pagamento: "",
    centroCusto: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const atualizado = { ...data, [name]: value };

    const descontos = [
      parseFloat(atualizado.iss) || 0,
      parseFloat(atualizado.inss) || 0,
      parseFloat(atualizado.pis) || 0,
      parseFloat(atualizado.cofins) || 0,
      parseFloat(atualizado.descontoValor) || 0
    ];

    const liquido = (parseFloat(atualizado.valorBruto) || 0) - descontos.reduce((a, b) => a + b, 0);
    atualizado.valorLiquido = liquido.toFixed(2);
    setData(atualizado);
  };

  const salvar = (e) => {
    e.preventDefault();
    const romaneios = JSON.parse(localStorage.getItem("romaneios") || "[]");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const now = new Date();
    const dataStr = now.toLocaleDateString("pt-BR").replaceAll("/", ".");
    const nomeObra = data.centroCusto?.replace(/\s+/g, "") || "Obra";
    const numero = data.numeroControle || (romaneios.length + 1).toString();
    const nomeArquivo = `${numero}_Romaneio de entrega de notas_${dataStr}_${nomeObra}`;

    const revisao = {
      ...data,
      revisaoId: Date.now(),
      criadoPor: user.email,
      nomeArquivo,
      criadoEm: now.toISOString(),
    };

    localStorage.setItem("romaneios", JSON.stringify([...romaneios, revisao]));
    navigate("/romaneios");
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-xl font-bold">Novo Romaneio</h1>
      <form onSubmit={salvar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="numeroControle" placeholder="Número de controle" value={data.numeroControle} onChange={handleChange} />
        <input name="dataEmissao" type="date" placeholder="Data de emissão" value={data.dataEmissao} onChange={handleChange} />
        <input name="numeroNota" placeholder="Nº Nota Fiscal" value={data.numeroNota} onChange={handleChange} />
        <input name="emitente" placeholder="Emitente/Empresa" value={data.emitente} onChange={handleChange} />
        <input name="descricao" placeholder="Descrição" value={data.descricao} onChange={handleChange} />
        <input name="categoria" placeholder="Categoria" value={data.categoria} onChange={handleChange} />
        <input name="valorBruto" placeholder="Valor Bruto" value={data.valorBruto} onChange={handleChange} />
        <input name="iss" placeholder="ISS" value={data.iss} onChange={handleChange} />
        <input name="inss" placeholder="INSS" value={data.inss} onChange={handleChange} />
        <input name="pis" placeholder="PIS" value={data.pis} onChange={handleChange} />
        <input name="cofins" placeholder="COFINS" value={data.cofins} onChange={handleChange} />
        <input name="descontoValor" placeholder="Desconto direto" value={data.descontoValor} onChange={handleChange} />
        <input name="valorLiquido" placeholder="Valor Líquido" value={data.valorLiquido} readOnly />
        <input name="vencimento" type="date" placeholder="Data vencimento" value={data.vencimento} onChange={handleChange} />
        <input name="pagamento" placeholder="Forma de pagamento" value={data.pagamento} onChange={handleChange} />
        <input name="centroCusto" placeholder="Centro de custo" value={data.centroCusto} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-full">Salvar</button>
      </form>
    </div>
  );
}
