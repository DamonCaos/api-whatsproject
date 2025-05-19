import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config()

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//Ruta de prueba
app.get('/api', (req, res) => {
    res.json({ message: 'API funcionando!'})
})

// Arrancar el servidor

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})