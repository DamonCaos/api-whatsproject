import bcrypt from 'bcrypt';
import User from '../models/User.js';


// Función para registrar un nuevo usuario
export async function registerController(req, res) {
    try {
        const { phone, name, password } = req.body

        if (!phone || !name || !password) {
            return res.status(400).json({ message: 'Faltan datos' })
        }
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ phone })
        if (existingUser) {
            return res.status(409).json({ error: 'El usuario ya existe' })
        }
        // Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10)
        const avatarPath = req.file ? `/uploads/${req.file.filename}` : undefined
        // Crear el nuevo usuario
        const user = new User({
            phone,
            name,
            passwordHash,
            avatar: avatarPath,
        })
        await user.save()

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: {
                id: user._id,
                phone: user.phone,
                name: user.name,
                avatar: user.avatar,
            },
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error al registrar el usuario' })
        
    }
}