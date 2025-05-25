require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware')
const stripeController = require('./controllers/stripe.controller')
const { rateLimit } = require('express-rate-limit')

const app = express()

// Webhook
app.post(
	'/webhook/stripe',
	express.raw({ type: 'application/json' }),
	stripeController.webhook
)

// Middleware
app.use(
	rateLimit({
		windowMs: 1 * 60 * 1000,
		limit: 200,
		standardHeaders: 'draft-7',
		legacyHeaders: false,
	})
)
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', require('./routes/index'))

// Error handling
app.use(errorMiddleware)

const bootstrap = async () => {
	try {
		const PORT = process.env.PORT || 8080
		mongoose
			.connect(process.env.MONGO_URI)
			.then(() => console.log('Connected to MongoDB'))
			.catch(err => {
				console.error('Database connection error:', err)
			})

		app.listen(PORT, () => console.log(`Server running on ${PORT}`))
	} catch (error) {
		console.log('Error connecting to MongoDB', error)
	}
}

bootstrap()
