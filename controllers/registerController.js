import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { registerSchema } from '../validators/userValidator.js'

export async function registerController(req, res) {
  try {
    // Validar con Zod
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: parsed.error.errors,
      })
    }

    const { phone, name, email, password } = parsed.data
    const normalizedEmail = email.trim().toLowerCase()

    // Verificar si ya existe el teléfono o el email
    const existingUser = await User.findOne({
      $or: [{ phone }, { email: normalizedEmail }],
    })

    if (existingUser) {
      return res.status(409).json({ error: 'El teléfono o email ya están registrados' })
    }

    // Hashear contraseña
    const passwordHash = await bcrypt.hash(password, 10)
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : undefined

    // Crear usuario
    const user = new User({
      phone,
      name,
      email: normalizedEmail,
      passwordHash,
      avatar: avatarPath,
    })

    await user.save()

    // Respuesta
    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al registrar el usuario' })
  }
}
