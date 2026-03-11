import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Adapter selon votre port Vue
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(express.json())

// Store des utilisateurs connectés
const users = new Map()

io.on('connection', (socket) => {
  console.log(`✅ Nouvel utilisateur connecté: ${socket.id}`)

  // Ajouter l'utilisateur à la liste
  socket.on('user:join', (userData) => {
    users.set(socket.id, {
      id: socket.id,
      name: userData.name,
      color: userData.color,
      position: userData.position
    })

    // Notifier tous les clients du nouvel utilisateur
    io.emit('users:list', Array.from(users.values()))
    console.log(`👥 Utilisateurs connectés: ${users.size}`)
  })

  // Mettre à jour la position d'un utilisateur
  socket.on('user:position', (positionData) => {
    const user = users.get(socket.id)
    if (user) {
      user.position = positionData
      // Diffuser à tous les autres clients
      socket.broadcast.emit('user:position:update', {
        id: socket.id,
        position: positionData
      })
    }
  })

  // Déconnexion
  socket.on('disconnect', () => {
    users.delete(socket.id)
    io.emit('users:list', Array.from(users.values()))
    console.log(`❌ Utilisateur déconnecté: ${socket.id}`)
    console.log(`👥 Utilisateurs connectés: ${users.size}`)
  })
})

// Route pour obtenir le nombre d'utilisateurs
app.get('/api/users/count', (req, res) => {
  res.json({ count: users.size })
})

// Route pour obtenir la liste des utilisateurs
app.get('/api/users', (req, res) => {
  res.json({ users: Array.from(users.values()) })
})

const PORT =  5554
server.listen(PORT, () => {
  console.log(`🚀 Serveur Socket.IO running on http://localhost:${PORT}`)
})
