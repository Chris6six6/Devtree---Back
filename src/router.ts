import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, login, updateProfile, uploadImage } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";


const router = Router();

// Routing

// Register
router.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email').isEmail().withMessage('El email no valiido'),
    body('password').isLength({min: 8}).withMessage('Minimo 8 caracteres'),
    handleInputErrors,
    createAccount
);

// Login
router.post('/auth/login',
    body('email').isEmail().withMessage('El email no valiido'),
    body('password').notEmpty().withMessage('El password es obligatorio'),
    login
);


// Mostrar usuario
router.get('/user', 
    authenticate,
    getUser
);

// Actualizar perfil
router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    handleInputErrors,
    authenticate,
    updateProfile
);

// Subir imagenes
router.post('/user/image', authenticate, uploadImage);

export default router;