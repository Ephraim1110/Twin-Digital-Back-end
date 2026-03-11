# TwinDigital Server

Socket.IO server pour gérer la présence des utilisateurs et leur position en temps réel dans TwinDigital.

## Installation

1. Clonez le repository
2. Installez les dépendances:
```bash
npm install
```

3. Créez un fichier `.env` à partir de `.env.example`:
```bash
cp .env.example .env
```

## Utilisation

### Mode développement (avec hot reload)
```bash
npm run dev
```

### Mode production
```bash
npm start
```

Le serveur démarre sur `http://localhost:3000` par défaut.

## API Endpoints

### GET `/api/users/count`
Retourne le nombre d'utilisateurs connectés.
```json
{ "count": 5 }
```

### GET `/api/users`
Retourne la liste de tous les utilisateurs connectés.
```json
{
  "users": [
    {
      "id": "socket_id",
      "name": "Jean",
      "color": "#FF0000",
      "position": { "x": 100, "y": 200 }
    }
  ]
}
```

## Socket.IO Events

### Client → Server

- **`user:join`** - Ajouter un nouvel utilisateur
  ```javascript
  { name: "Jean", color: "#FF0000", position: { x: 0, y: 0 } }
  ```

- **`user:position`** - Mettre à jour la position d'un utilisateur
  ```javascript
  { x: 100, y: 200 }
  ```

### Server → Client

- **`users:list`** - Liste mise à jour des utilisateurs
- **`user:position:update`** - Mise à jour de position d'un utilisateur
  ```javascript
  { id: "socket_id", position: { x: 100, y: 200 } }
  ```

## Configuration

Modifiez le fichier `.env` pour:
- Changer le port du serveur
- Adapter l'URL du client Vue pour CORS

## Technologies utilisées

- Express.js - Framework web
- Socket.IO - Communication temps réel
- CORS - Gestion des requêtes cross-origin
- Nodemon - Auto-reload en développement
