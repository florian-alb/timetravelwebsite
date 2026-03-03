Tu vas créer une webapp complète pour une agence de voyage temporel fictive appelée "TimeTravelAgency".

## Stack technique

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Framer Motion (installer via `npm install framer-motion`) pour toutes les animations
- Lucide React pour les icônes

## Style visuel

Aventure & immersif. Atmosphère épique et cinématographique.

- Palette : noir profond (#0a0a0a), vert jungle (#1a3a2a), doré Renaissance (#c9a84c), cuivre/orange industriel (#b85c2a)
- Typographie grande, bold, dramatique — importer depuis Google Fonts via `next/font/google` : Cinzel pour les titres, Inter pour le corps
- Effets : parallax léger, hover lumineux, transitions Framer Motion durée 0.6–0.8s avec easing "easeOut", scroll-triggered animations (utiliser `whileInView` de Framer Motion)
- Mood général : immersif, premium, aventure
- Dark mode par défaut (pas de toggle — site entièrement sombre)

## Les 3 destinations

1. **Crétacé — -65 millions d'années**
   - Accroche : "Quand les géants dominaient la Terre."
   - Expériences : Safari T-Rex sécurisé, observation de la faune préhistorique, étude scientifique immersive
   - Profil : Aventure – Adrénaline – Exploration
   - Couleur dominante : vert jungle (#1a3a2a)
   - Image attendue : `/public/images/cretace.jpg`
   - Gradient fallback : `from-[#0a1a0f] to-[#1a3a2a]`

2. **Florence — Renaissance 1504**
   - Accroche : "L'âge d'or de l'art et de l'humanisme."
   - Expériences : Ateliers avec les maîtres, vie quotidienne florentine, soirées de la noblesse
   - Profil : Culture – Élégance – Histoire
   - Couleur dominante : doré (#c9a84c)
   - Image attendue : `/public/images/florence.jpg`
   - Gradient fallback : `from-[#1a1200] to-[#3a2a00]`

3. **Paris — 1889**
   - Accroche : "À l'aube du monde moderne."
   - Expériences : Inauguration de la Tour Eiffel, Exposition Universelle, balades en fiacre, Paris Belle Époque
   - Profil : Découverte – Innovation – Patrimoine
   - Couleur dominante : cuivre/orange (#b85c2a)
   - Image attendue : `/public/images/paris.jpg`
   - Gradient fallback : `from-[#1a0a00] to-[#3a1a00]`

> Les images sont placées par l'utilisateur dans `/public/images/`. Toujours utiliser le gradient fallback via un style CSS conditionnel (`<Image onError>` ou background CSS en superposition). Ne jamais bloquer le rendu si l'image manque.

## Structure des pages

### Page d'accueil `/`

1. **Header** — `position: fixed`, `z-50`. Transparent au départ (`bg-transparent`), devient `bg-black/90 backdrop-blur` au scroll (détecter avec `useScrollY` ou `window.scrollY > 50`). Logo "TimeTravelAgency" en Cinzel à gauche. Nav : Destinations / Expérience / Réserver. CTA "Commencer le voyage" (bouton bordure dorée). Sur mobile : hamburger menu.

2. **Hero Section** — Plein écran (`min-h-screen`). Fond : gradient animé CSS simulant un vortex temporel (utiliser `@keyframes` dans globals.css ou un canvas léger). Titre "Traversez les siècles." en Cinzel très grand (8xl). Sous-titre : "De l'ère des dinosaures à la naissance du monde moderne." Deux boutons : "Explorer les époques" (plein doré) et "Parler à un agent" (bordure). Indicateur de scroll animé (chevron qui pulse) en bas.

3. **Section Destinations** — `id="destinations"`. 3 cartes full-width empilées (height: 70vh chacune). Chaque carte a :
   - Image de fond avec `object-fit: cover` + overlay gradient sombre
   - Gradient fallback si image absente
   - Accroche en Cinzel, liste des expériences, badge profil coloré, bouton CTA
   - Apparition au scroll via Framer Motion `whileInView={{ opacity: 1, y: 0 }}` initial `{ opacity: 0, y: 60 }`

4. **Section "Comment ça marche"** — `id="experience"`. 4 étapes en ligne sur desktop, empilées sur mobile. Icônes Lucide. Étapes : Choisissez une époque → Consultez l'agent IA → Sélectionnez vos dates → Voyagez en sécurité. Numéros animés, hover scale sur chaque carte.

5. **Section Quiz de recommandation** — Quiz interactif 4 questions (une à la fois, avec transition Framer Motion entre chaque) :
   - Q1 : Type d'expérience ? (Culturelle / Aventure / Élégance)
   - Q2 : Votre période préférée ? (Histoire moderne / Temps anciens / Renaissance)
   - Q3 : Vous préférez ? (Effervescence urbaine / Nature sauvage / Art & Architecture)
   - Q4 : Activité idéale ? (Visiter des monuments / Observer la faune / Explorer des musées)

   Logique de scoring : chaque réponse ajoute +1 à une destination. Afficher la destination gagnante avec une animation de révélation dramatique (Framer Motion `scale` + `opacity`) et un bouton "Réserver cette destination".

6. **Section Formulaire de réservation** — `id="reserver"`. Champs : Destination (select avec les 3 options), Date de départ, Date de retour, Nombre de voyageurs (1–8), Niveau d'expérience (Novice / Aventurier / Expert). Validation côté client (champs requis, dates cohérentes). Au submit : afficher un message de confirmation animé (Framer Motion) avec une fausse référence de réservation générée aléatoirement (ex. `TTA-2024-XXXX`). Pas de backend.

7. **Footer** — Logo, liens (Destinations, Expérience, Réserver, Chat). Mentions légales fictives. "© 2024 TimeTravelAgency — Tous droits réservés à travers le temps."

### Page Chatbot `/chat`

- Interface pleine page, style terminal futuriste (fond très sombre, bordures subtiles)
- Header : "Votre guide temporel personnel" en Cinzel, avec icône d'horloge
- Fenêtre de messages scrollable : bulles user (droite, couleur dorée) et agent (gauche, couleur gris sombre). Afficher un indicateur "..." pendant le chargement de la réponse.
- Champ de saisie fixe en bas, bouton Envoyer, touche Entrée pour envoyer
- Chips de suggestions cliquables (se désactivent une fois une conversation commencée) : "Quelle époque me conseilles-tu ?", "Quel est le niveau de danger ?", "Quels sont les tarifs ?", "Comment se passe la réservation ?"
- Route API : `/api/chat` — POST, body `{ messages: [{role, content}] }`, réponse streamée ou JSON `{ reply: string }`

#### Intégration IA — support multi-provider

La route `/api/chat` doit détecter automatiquement quelle clé est disponible et utiliser le provider correspondant, dans cet ordre de priorité :

1. **Mistral AI** (recommandé — gratuit pour débuter) : si `MISTRAL_API_KEY` est défini → utiliser `https://api.mistral.ai/v1/chat/completions`, modèle `mistral-small-latest`
2. **Groq** (quota gratuit généreux, ultra-rapide) : si `GROQ_API_KEY` est défini → utiliser `https://api.groq.com/openai/v1/chat/completions`, modèle `llama-3.1-8b-instant`
3. **OpenAI** : si `OPENAI_API_KEY` est défini → utiliser `https://api.openai.com/v1/chat/completions`, modèle `gpt-4o-mini`

Tous ces providers sont compatibles avec le format OpenAI (`messages`, `model`, `max_tokens`). Utiliser `fetch` natif, pas de SDK tiers.

Si aucune clé n'est configurée, retourner une réponse simulée (mode démo) pour que le site reste fonctionnel.

#### System prompt de l'agent

```
Tu es l'assistant virtuel de TimeTravelAgency, une agence de voyage temporel de luxe. Ton rôle est de conseiller les clients sur les meilleures destinations temporelles. Tu es professionnel, chaleureux, passionné d'histoire. Réponds toujours en français.

Tu connais parfaitement :
- Le Crétacé (-65 millions d'années) : dinosaures, nature préhistorique sauvage, safari T-Rex sécurisé. Prix : 15 000€/personne.
- Florence 1504 (Renaissance italienne) : ateliers avec Michel-Ange et Léonard de Vinci, soirées de la noblesse. Prix : 8 500€/personne.
- Paris 1889 (Belle Époque) : inauguration de la Tour Eiffel, Exposition Universelle, Paris industriel. Prix : 6 000€/personne.

Tu guides les clients vers la réservation sur le site. Si on te demande un danger, tu rassures sur les protocoles de sécurité temporelle.
```

### Widget chatbot flottant (toutes les pages)

Présent sur toutes les pages via le layout racine. Bouton rond fixe en bas à droite (icône bulle de dialogue). Au clic, ouvrir une mini-fenêtre de chat inline (300×400px) avec les mêmes fonctionnalités que `/chat` mais en version compacte. Lien "Ouvrir en plein écran" dans la mini-fenêtre qui redirige vers `/chat`. Fermer avec un bouton ×.

## Fichiers d'environnement

### `.env.example` à créer à la racine

```
# Choisissez UN provider et renseignez sa clé API

# Option 1 — Mistral AI (recommandé, gratuit) : https://console.mistral.ai
MISTRAL_API_KEY=your_mistral_api_key_here

# Option 2 — Groq (ultra-rapide, quota gratuit) : https://console.groq.com
GROQ_API_KEY=your_groq_api_key_here

# Option 3 — OpenAI : https://platform.openai.com
OPENAI_API_KEY=your_openai_api_key_here
```

## README.md à générer

Créer un `README.md` complet avec les sections suivantes :

```markdown
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

\`\`\`bash
npm install
cp .env.example .env.local

# Renseigner votre clé API dans .env.local

npm run dev
\`\`\`

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
```

## Notes importantes

- Code en **anglais** (variables, fonctions, composants). Textes affichés en **français**.
- Responsive **mobile-first** sur toutes les pages.
- Le projet doit démarrer sans erreur avec `npm run dev` même sans clé API (mode démo).
- Ne pas créer de fichier `tailwind.config.*` — Tailwind v4 se configure via `globals.css` avec `@theme inline`.
- Toutes les animations utilisent Framer Motion — ne pas mélanger avec des classes Tailwind `animate-*` pour les animations complexes.
- Préparer le déploiement Vercel : pas de `output: 'export'` dans `next.config.ts`, garder le rendu SSR pour la route `/api/chat`.
