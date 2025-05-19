import { authMiddleware } from "../middlewares/auth.js";
import User from "../models/User.js";
import express from "express";

const router = express.Router()
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash')
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        
        res.json({ user })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error al obtener el usuario' })
        
    }
})

export default router