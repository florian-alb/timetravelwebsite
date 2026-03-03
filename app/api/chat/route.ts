import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravelAgency, une agence de voyage temporel de luxe. Ton rôle est de conseiller les clients sur les meilleures destinations temporelles. Tu es professionnel, chaleureux, passionné d'histoire. Réponds toujours en français.

Tu connais parfaitement :
- Le Crétacé (-65 millions d'années) : dinosaures, nature préhistorique sauvage, safari T-Rex sécurisé. Prix : 15 000€/personne.
- Florence 1504 (Renaissance italienne) : ateliers avec Michel-Ange et Léonard de Vinci, soirées de la noblesse. Prix : 8 500€/personne.
- Paris 1889 (Belle Époque) : inauguration de la Tour Eiffel, Exposition Universelle, Paris industriel. Prix : 6 000€/personne.

Tu guides les clients vers la réservation sur le site. Si on te demande un danger, tu rassures sur les protocoles de sécurité temporelle.`;

const DEMO_RESPONSES = [
  "Bonjour ! Je suis votre guide temporel personnel. Nos trois destinations phares sont le Crétacé (-65 Ma), Florence 1504 et Paris 1889. Quelle époque vous attire le plus ?",
  "Nos protocoles de sécurité temporelle sont irréprochables. Chaque voyageur est équipé d'un bouclier chronologique et accompagné d'un guide expert. Votre retour dans le présent est garanti à 100%.",
  "Nos tarifs varient selon la destination : Le Crétacé à 15 000€/personne, Florence 1504 à 8 500€/personne, et Paris 1889 à 6 000€/personne. Tous nos forfaits incluent l'hébergement et l'accompagnement personnalisé.",
  "Pour réserver, rendez-vous dans la section 'Réserver' de notre site. Choisissez votre destination, vos dates et le nombre de voyageurs. Votre aventure temporelle commence en quelques clics !",
];

let demoIndex = 0;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

async function callMistral(messages: ChatMessage[]): Promise<string> {
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 500,
    }),
  });

  if (!res.ok) throw new Error(`Mistral API error: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    let reply: string;

    if (process.env.MISTRAL_API_KEY) {
      reply = await callMistral(messages);
    } else {
      // Demo mode
      reply = DEMO_RESPONSES[demoIndex % DEMO_RESPONSES.length];
      demoIndex++;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Je rencontre une difficulté technique. Veuillez réessayer dans un instant.",
      },
      { status: 200 }
    );
  }
}
