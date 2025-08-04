// src/routes/auth.ts
import { Router } from 'express';
import { supabase } from '../utils/supabase';

export const authRouter = Router();

// 📝 KAYIT (Register)
authRouter.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı
 *     description: Email ve şifre ile yeni kullanıcı oluşturur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: Kayıt başarılı
 *       400:
 *         description: Geçersiz veri
 */

    if (!email || !password) {
        return res.status(400).json({ error: 'Email ve şifre zorunlu!' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Şifre en az 6 karakter olmalı!' });
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {  // ✅ DÜZELTİLDİ: "data" alanı eklendi
                username: username || null,
            },
        },
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const user = data.user;

    if (user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ id: user.id, email: user.email, username: username || null }]);

        if (profileError) {
            console.warn('Profil oluşturulamadı:', profileError.message);
        }
    }

    return res.json({
        message: 'Kayıt başarılı! Lütfen emailinizi doğrulayın.',
        user,
    });
});

// 🔐 GİRİŞ (Login)
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    /**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     description: Mevcut kullanıcı email ve şifre ile giriş yapar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Giriş başarılı
 *       401:
 *         description: Kimlik doğrulama hatası
 */

    if (!email || !password) {
        return res.status(400).json({ error: 'Email ve şifre zorunlu!' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return res.status(401).json({ error: 'Giriş başarısız!', details: error.message });
    }

    return res.json({
        message: 'Giriş başarılı!',
        user: data.user,
        session: data.session,
    });
});