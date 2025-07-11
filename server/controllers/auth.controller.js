const bcrypt = require('bcrypt')
const userModel = require('../models/user.model')
class AuthContoller {
	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const user = await userModel.findOne({ email })
			if (!user) {
				return res.json({ failure: 'User not found' })
			}

			const isValidPassword = await bcrypt.compare(password, user.password)

			if (!isValidPassword) {
				return res.json({ failure: 'Password is incorrect' })
			}

			if (user.isDeleted)
				return res.json({
					failure: `User is deleted at ${user.deletedAt.toLocaleString()}`,
				})

			return res.json({ user })
		} catch (error) {
			next(error)
		}
	}
	async register(req, res, next) {
		try {
			const { email, password, fullName } = req.body

			const user = await userModel.findOne({ email })
			if (user) return res.json({ failure: 'User already exists' })

			const hashedPassword = await bcrypt.hash(password, 10)
			const newUser = await userModel.create({
				email,
				password: hashedPassword,
				fullName,
			})

			return res.json({ user: newUser })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Server error', message: error.message })
			next(error)
		}
	}
}

module.exports = new AuthContoller()
