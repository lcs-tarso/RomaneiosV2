import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RomaneioForm() {
  const navigate = useNavigate();
  const [romaneio, setRomaneio] = useState({
    numeroControle: "",
    centroCusto: ""
  });
  const [notas, setNotas] = useState([]);

  const novaNota = {
    numeroNota: "",
    dataEmissao: "",
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
    pagamento: ""
  };

  const adicionarNota = () => {
    setNotas([...notas, { ...novaNota }]);
  };

  const atualizarNota = (index, field, value) => {
    const novas = [...notas];
    novas[index][field] = value;

    const descontos = ["iss", "inss", "pis", "cofins", "descontoValor"]
      .map(k => parseFloat(novas[index][k]) || 0)
      .reduce((a, b) => a + b, 0);

    const bruto = parseFloat(novas[index].valorBruto) || 0;
    novas[index].valorLiquido = (bruto - descontos).toFixed(2);
    setNotas(novas);
  };

  const salvarRomaneio = (e) => {
    e.preventDefault();
    const romaneios = JSON.parse(localStorage.getItem("romaneios") || "[]");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const now = new Date();
    const dataStr = now.toLocaleDateString("pt-BR").replaceAll("/", ".");
    const numero = romaneio.numeroControle || (romaneios.length + 1).toString();
    const nomeObra = romaneio.centroCusto?.replace(/\s+/g, "") || "Obra";
    const nomeArquivo = `${numero}_Romaneio de entrega de notas_${dataStr}_${nomeObra}`;

    const novo = {
      ...romaneio,
      revisaoId: Date.now(),
      criadoEm: now.toISOString(),
      criadoPor: user.email,
      nomeArquivo,
      notas
    };

    localStorage.setItem("romaneios", JSON.stringify([...romaneios, novo]));
    navigate("/romaneios");
  };

  return (
    <div className="space-y-4 max-w-4xl">
      <h1 className="text-xl font-bold">Novo Romaneio</h1>
      <form onSubmit={salvarRomaneio} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="numeroControle" placeholder="Número de controle" value={romaneio.numeroControle} onChange={e => setRomaneio({ ...romaneio, numeroControle: e.target.value })} />
          <input name="centroCusto" placeholder="Centro de Custo" value={romaneio.centroCusto} onChange={e => setRomaneio({ ...romaneio, centroCusto: e.target.value })} />
        </div>

        <h2 className="text-lg font-semibold">Notas Fiscais</h2>
        {notas.map((nota, index) => (
          <div key={index} className="border p-4 rounded-md space-y-2 bg-gray-50">
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Número da Nota" value={nota.numeroNota} onChange={e => atualizarNota(index, "numeroNota", e.target.value)} />
              <input type="date" placeholder="Data de Emissão" value={nota.dataEmissao} onChange={e => atualizarNota(index, "dataEmissao", e.target.value)} />
              <input placeholder="Emitente" value={nota.emitente} onChange={e => atualizarNota(index, "emitente", e.target.value)} />
              <input placeholder="Descrição" value={nota.descricao} onChange={e => atualizarNota(index, "descricao", e.target.value)} />
              <input placeholder="Categoria" value={nota.categoria} onChange={e => atualizarNota(index, "categoria", e.target.value)} />
              <input placeholder="Valor Bruto" value={nota.valorBruto} onChange={e => atualizarNota(index, "valorBruto", e.target.value)} />
              <input placeholder="ISS" value={nota.iss} onChange={e => atualizarNota(index, "iss", e.target.value)} />
              <input placeholder="INSS" value={nota.inss} onChange={e => atualizarNota(index, "inss", e.target.value)} />
              <input placeholder="PIS" value={nota.pis} onChange={e => atualizarNota(index, "pis", e.target.value)} />
              <input placeholder="COFINS" value={nota.cofins} onChange={e => atualizarNota(index, "cofins", e.target.value)} />
              <input placeholder="Desconto direto" value={nota.descontoValor} onChange={e => atualizarNota(index, "descontoValor", e.target.value)} />
              <input placeholder="Valor Líquido" readOnly value={nota.valorLiquido} />
              <input type="date" placeholder="Vencimento" value={nota.vencimento} onChange={e => atualizarNota(index, "vencimento", e.target.value)} />
              <input placeholder="Pagamento" value={nota.pagamento} onChange={e => atualizarNota(index, "pagamento", e.target.value)} />
            </div>
          </div>
        ))}

        <button type="button" onClick={adicionarNota} className="bg-yellow-500 text-white px-4 py-2 rounded">
          + Adicionar Nota
        </button>

        <div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
            Salvar Romaneio
          </button>
        </div>
      </form>
    </div>
  );
}
