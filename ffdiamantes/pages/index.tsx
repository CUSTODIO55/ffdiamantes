import { useState } from "react";
import axios from "axios";

const servers = [
  {
    name: "Europa",
    currency: "EUR",
    code: "eu",
    packages: [
      { qtd: 100, price: 0.95 },
      { qtd: 310, price: 2.7 },
      { qtd: 530, price: 4.8 },
    ],
  },
  {
    name: "Brasil",
    currency: "EUR",
    code: "br",
    packages: [
      { qtd: 100, price: 0.89 },
      { qtd: 310, price: 2.5 },
      { qtd: 530, price: 4.5 },
    ],
  },
  {
    name: "Ásia",
    currency: "EUR",
    code: "asia",
    packages: [
      { qtd: 100, price: 0.92 },
      { qtd: 310, price: 2.6 },
      { qtd: 530, price: 4.6 },
    ],
  },
];

export default function HomePage() {
  const [playerID, setPlayerID] = useState("");
  const [server, setServer] = useState(servers[0]);

  const handleBuy = async (item: { qtd: number; price: number }) => {
    if (!playerID) return alert("Por favor, insira seu ID de jogador.");
    const res = await axios.post("/api/create-checkout-session", {
      item,
      playerID,
      server: server.name,
    });
    window.location.href = res.data.url;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Comprar Diamantes Free Fire</h1>

        <label className="block mb-4">
          <span className="text-sm">Escolha seu servidor:</span>
          <select
            className="mt-1 block w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            value={server.code}
            onChange={(e) =>
              setServer(servers.find((s) => s.code === e.target.value)!)
            }
          >
            {servers.map((srv) => (
              <option key={srv.code} value={srv.code}>
                {srv.name}
              </option>
            ))}
          </select>
        </label>

        <input
          type="text"
          placeholder="Digite seu ID do jogador"
          className="w-full p-3 mb-6 rounded bg-gray-800 text-white border border-gray-700"
          value={playerID}
          onChange={(e) => setPlayerID(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {server.packages.map((pkg) => (
            <div
              key={pkg.qtd}
              className="bg-gray-800 p-6 rounded-xl shadow text-center"
            >
              <h2 className="text-xl font-bold">{pkg.qtd} Diamantes</h2>
              <p className="text-green-400 text-lg font-semibold">
                €{pkg.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleBuy(pkg)}
                className="mt-4 bg-green-600 hover:bg-green-700 w-full py-2 rounded"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}