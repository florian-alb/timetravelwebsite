# TimeTravelAgency — Webapp Interactive

Webapp immersive pour une agence de voyage temporel fictive.

## Stack Technique

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- [Mistral AI / Groq / OpenAI] pour le chatbot

## Features

- Landing page avec hero animé et quiz de recommandation
- Galerie de 3 destinations temporelles (Crétacé, Florence, Paris)
- Chatbot IA conversationnel (page dédiée + widget flottant)
- Formulaire de réservation avec confirmation simulée

## Installation

```bash
npm install
cp .env.example .env.local

# Renseigner votre clé API dans .env.local

npm run dev
```

Ouvrir http://localhost:3000

## Images

Placer vos images dans `/public/images/` :

- `cretace.jpg`
- `florence.jpg`
- `paris.jpg`

Des gradients colorés sont utilisés en fallback si les images sont absentes.

## Déploiement

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Déployer sur Vercel et ajouter la variable d'environnement de votre provider IA dans les settings du projet.
