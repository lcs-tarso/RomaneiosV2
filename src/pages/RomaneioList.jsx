import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function RomaneioList() {
  const [romaneios, setRomaneios] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("romaneios") || "[]");
    setRomaneios(data.reverse());
  }, []);

  const exportarPDF = (romaneio) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Romaneio de entrega de notas", 14, 20);

    const headers = [[
      "ID", "Emissão", "Nº Nota", "Fornecedor", "Descrição",
      "Categoria", "Bruto", "ISS", "INSS", "Descontos",
      "Líquido", "Vencimento", "Pagamento", "Centro de Custo"
    ]];

    const body = [[
      romaneio.numeroControle,
      romaneio.dataEmissao,
      romaneio.numeroNota,
      romaneio.emitente,
      romaneio.descricao,
      romaneio.categoria,
      `R$ ${romaneio.valorBruto}`,
      `R$ ${romaneio.iss}`,
      `R$ ${romaneio.inss}`,
      `R$ ${(parseFloat(romaneio.pis || 0) + parseFloat(romaneio.cofins || 0) + parseFloat(romaneio.descontoValor || 0)).toFixed(2)}`,
      `R$ ${romaneio.valorLiquido}`,
      romaneio.vencimento,
      romaneio.pagamento,
      romaneio.centroCusto
    ]];

    autoTable(doc, {
      head: headers,
      body: body,
      startY: 30,
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        halign: 'center'
      }
    });

    doc.save(`${romaneio.nomeArquivo}.pdf`);
  };

  const excluirRomaneio = (revisaoId) => {
    const novos = romaneios.filter(r => r.revisaoId !== revisaoId);
    setRomaneios(novos);
    localStorage.setItem("romaneios", JSON.stringify([...novos].reverse()));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Romaneios Cadastrados</h1>
      {romaneios.length === 0 ? (
        <p className="text-gray-600">Nenhum romaneio encontrado.</p>
      ) : (
        <ul className="space-y-2">
          {romaneios.map((r) => (
            <li key={r.revisaoId} className="border p-4 rounded shadow-sm">
              <p><strong>#{r.numeroControle}</strong> — {r.emitente} — R$ {r.valorLiquido}</p>
              <div className="mt-2 flex gap-4 text-sm">
                <button onClick={() => exportarPDF(r)} className="text-blue-600 underline">Exportar PDF</button>
                <button onClick={() => excluirRomaneio(r.revisaoId)} className="text-red-600 underline">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/romaneios/novo" className="inline-block mt-4 text-blue-700 underline">+ Novo Romaneio</Link>
    </div>
  );
}
