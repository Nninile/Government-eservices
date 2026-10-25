import express from 'express'
import cors from 'cors'
import db from './config/database.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

// Test API
app.get('/', (req, res) => {
  res.json({
    message: 'Government e-Services Gateway API is running',
  })
})

// Test database
app.get('/api/test-database', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT DATABASE() AS database_name'
    )

    res.json({
      success: true,
      message: 'Database connected successfully',
      database: rows[0].database_name,
    })
  } catch (error) {
    console.error('Database error:', error)

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
    })
  }
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Government e-Services API running on port ${PORT}`)
})