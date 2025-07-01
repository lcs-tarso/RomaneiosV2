import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

export default function RomaneioList() {
  const [romaneios, setRomaneios] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("romaneios") || "[]");
    setRomaneios(data.reverse());
  }, []);

  const exportarPDF = (romaneio) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Romaneio Nº ${romaneio.numeroControle}`, 10, 10);
    doc.text(`Emitente: ${romaneio.emitente}`, 10, 20);
    doc.text(`Categoria: ${romaneio.categoria}`, 10, 30);
    doc.text(`Valor líquido: R$ ${romaneio.valorLiquido}`, 10, 40);
    doc.text(`Centro de custo: ${romaneio.centroCusto}`, 10, 50);
    doc.save(`${romaneio.nomeArquivo}.pdf`);
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
              <div className="mt-2 flex gap-2">
                <button onClick={() => exportarPDF(r)} className="text-sm text-blue-600 underline">Exportar PDF</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="/romaneios/novo" className="inline-block mt-4 text-blue-700 underline">+ Novo Romaneio</Link>
    </div>
  );
}
