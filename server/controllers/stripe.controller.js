const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class StripeController {
	async webhook(req, res, next) {
		try {
			let data
			let eventType
			const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

			if (webhookSecret) {
				const signature = req.headers[`stripe-signature`]

				const event = stripe.webhooks.constructEvent(
					req.body,
					signature,
					webhookSecret
				)
				data = event.data.object
				eventType = event.type
			} else {
				data = req.body.data.object
				eventType = req.body.type
			}

			console.log(data)
			console.log('Event Type', eventType)

			return res.json({ status: 200 })
		} catch (error) {
			console.log(error)

			next(error)
		}
	}
}

module.exports = new StripeController()
