import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './lib/mongooseConfig.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads', express.static('uploads'))


//Ruta de prueba
app.get('/api', (req, res) => {
    res.json({ message: 'API funcionando!'})
})

//Rutas

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Arrancar el servidor

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})