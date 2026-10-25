import db from '../config/database.js'
import bcrypt from 'bcryptjs'

// REGISTER CITIZEN
export const registerCitizen = async (req, res) => {
  try {
    const {
      national_id,
      first_name,
      surname,
      date_of_birth,
      nationality,
      phone_number,
      email,
      username,
      password,
    } = req.body
console.log('RECEIVED REGISTRATION DATA:', req.body)
    // Check required fields
    if (
      !national_id ||
      !first_name ||
      !surname ||
      !date_of_birth ||
      !nationality ||
      !phone_number ||
      !email ||
      !username ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields.',
      })
    }

    // Check whether National ID already exists
    const [existingCitizen] = await db.query(
      `SELECT citizen_id
       FROM citizens
       WHERE national_id = ? OR username = ? OR email = ?`,
      [national_id, username, email]
    )

    if (existingCitizen.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          'An account with this National ID, username or email already exists.',
      })
    }

    // Securely hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Insert citizen
    const [result] = await db.query(
      `INSERT INTO citizens
      (
        national_id,
        username,
        password,
        name,
        surname,
        date_of_birth,
        nationality,
        phone_number,
        email,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        national_id,
        username,
        hashedPassword,
        first_name,
        surname,
        date_of_birth,
        nationality,
        phone_number,
        email,
        'ACTIVE',
      ]
    )

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      citizen_id: result.insertId,
    })
  } catch (error) {
    console.error('Registration error:', error)

    res.status(500).json({
      success: false,
      message: 'Could not create account.',
      error: error.message,
    })
  }
}
// LOGIN CITIZEN
export const loginCitizen = async (req, res) => {
  try {
    const { login_id, password } = req.body

    if (!login_id || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your National ID or username and password.',
      })
    }

    // Find citizen using either National ID or username
    const [citizens] = await db.query(
      `SELECT *
       FROM citizens
       WHERE national_id = ? OR username = ?
       LIMIT 1`,
      [login_id, login_id]
    )

    if (citizens.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid National ID/username or password.',
      })
    }

    const citizen = citizens[0]

    // Compare entered password with hashed password
    const passwordMatches = await bcrypt.compare(
      password,
      citizen.password
    )

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid National ID/username or password.',
      })
    }

    // Check account status
    if (citizen.status !== 'ACTIVE') {
      return res.status(403).json({
        success: false,
        message: 'Your account is not active.',
      })
    }

    // Login successful
    res.status(200).json({
      success: true,
      message: 'Login successful.',
      citizen: {
        citizen_id: citizen.citizen_id,
        national_id: citizen.national_id,
        username: citizen.username,
        name: citizen.name,
        surname: citizen.surname,
        email: citizen.email,
        phone_number: citizen.phone_number,
        nationality: citizen.nationality,
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    res.status(500).json({
      success: false,
      message: 'Could not sign in.',
      error: error.message,
    })
  }
}