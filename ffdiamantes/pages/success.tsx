import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const { playerID, qtd, server } = router.query;

  useEffect(() => {
    if (playerID && qtd && server) {
      const url = `https://wa.me/351912345678?text=Novo%20pedido:%20${qtd}%20diamantes%20(${server})%20para%20ID%20${playerID}`;
      window.location.href = url;
    }
  }, [playerID, qtd, server]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-xl">Redirecionando para o WhatsApp...</h1>
    </div>
  );
}