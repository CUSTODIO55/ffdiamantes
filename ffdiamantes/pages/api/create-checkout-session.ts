import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { item, playerID, server } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `${item.qtd} Diamantes - ${server}`,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/success?playerID=${playerID}&qtd=${item.qtd}&server=${server}`,
    cancel_url: `${req.headers.origin}/`,
  });

  res.status(200).json({ url: session.url });
}