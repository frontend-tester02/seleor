const router = require('express').Router()
const otpController = require('../controllers/otp.contoller')

router.post('/send', otpController.sendOtp)
router.post('/verify', otpController.verifyOtp)

module.exports = router
