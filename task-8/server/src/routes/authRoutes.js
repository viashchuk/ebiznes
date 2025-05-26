import { Router } from 'express'
import authController from '../controllers/authController.js'

const router = Router()

router.post('/login', authController.login)
router.get('/oauth/google', authController.googleLogin)
router.get('/oauth/google/callback', authController.googleCallback)
router.post('/register', authController.register)

export default router