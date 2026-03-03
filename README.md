# TimeTravel Agency - Webapp Interactive

Webapp pour une agence de voyage temporel fictive, créée avec IA générative.

## 🛠️ Stack Technique
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Mistral AI API (fallback Groq / OpenAI)
- Hébergement : Vercel

## ✨ Features
- Landing page interactive avec animations
- Galerie de 3 destinations temporelles (Crétacé, Florence, Paris 1889)
- Chatbot IA conversationnel (page dédiée + widget flottant)
- Quiz de recommandation de destination
- Formulaire de réservation

## 🤖 IA Utilisées
- Code : Bolt.new (Claude 3.5 Sonnet)
- Chatbot : Mistral Small via API
- Visuels : Midjourney + Runway (Projet 1)

## 🚀 Lancer le projet

```bash
npm install
npm run dev
```

Ajouter un fichier `.env.local` avec :

```env
MISTRAL_API_KEY=...
```

## 📄 Licence
Projet pédagogique - M1/M2 Digital & IA
