import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config()

const app = express()
const port = process.env.PORT || 3001
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

// CORS configuration
const corsOptions = {
  origin: function(origin: any, callback: any) {
    callback(null, true); // allow all origins
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: false
}

// Enable CORS with configuration
app.use(cors(corsOptions))

// Test endpoint
app.get('/test', (req, res) => {
  console.log('Test endpoint hit from:', req.headers.origin)
  res.status(200).json({ 
    status: 'Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    message: 'Connection successful'
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal Server Error', details: err.message })
})

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log('Environment:', process.env.NODE_ENV)
  console.log('Frontend URLs allowed:', corsOptions.origin)
}) 