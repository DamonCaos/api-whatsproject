import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function loginController(req, res) {
    try {
        const {identifier, password} = req.body

        if(!identifier || !password) {
            return res.status(400).json({ error: 'faltan credenciales'})
        }
        // Buscar usuario por email o teléfono
        const user = await User.findOne({
            $or: [{ email: identifier}, {phone: identifier}],
        })
        if(!user) {
            return res.status(401).json({ error: 'Credenciales inválidas'})
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas'})
        }

        // Generar token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h'}
        )

        // Respuesta
        res.json({
            message: 'Login correcto',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al iniciar sesión' })
        
    }
}