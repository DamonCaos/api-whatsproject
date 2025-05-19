import { z } from 'zod';

export const registerSchema = z.object({
    phone: z
        .string()
        .min(9, { message: 'El número de teléfono debe tener al menos 9 dígitos' })
        .max(15, { message: 'El número de teléfono no puede tener más de 15 dígitos' })
        .regex(/^\+?\d{9,15}$/, { message: 'Número de teléfono inválido' }),
    name: z
        .string()
        .min(1, { message: 'El nombre es obligatorio' })
        .max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
    email: z
        .string()
        .email({ message: 'Email inválido' })
        .max(100, { message: 'El email no puede tener más de 100 caracteres' }),
    password: z
        .string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .max(50, { message: 'La contraseña no puede tener más de 50 caracteres' }),
})