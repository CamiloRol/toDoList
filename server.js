require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const path = require('path')
const bcrypt = require('bcrypt')
const axios = require('axios')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express();
const PORT = process.env.PORT || 3000;
const pexelURL = "https://api.pexels.com/v1/search"
const pexelApi = "yTMGSruXPCeYXFzvMLmfPdyrUzC7DGmha65DzTNl3V2ZdjiBsw0ibqgg"

// Configuración de SQL Server
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

// Conectar a SQL Server
async function connectDB() {
    try {
        await sql.connect(dbConfig);
        console.log("✅ Conexión a SQL Server exitosa");
    } catch (error) {
        console.error("❌ Error conectando a SQL Server:", error);
    }
}

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Endpoint para obtener usuarios
app.get('/users', async (req, res) => {
    try {
        const pool = await sql.connect();
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo usuarios", error });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE emailUsers = @email');

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "❌ Usuario no encontrado" });
        }

        const user = result.recordset[0];
        
        // Validar contraseña
        const isMatch = await bcrypt.compare(password, user.passwordUsers);
        if (!isMatch) {
            return res.status(401).json({ message: "❌ Contraseña incorrecta" });
        }

        const token = jwt.sign(
            {id: user.id,
             usuario: user.email   
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error en la autenticación", error });
    }
});

app.get("/api/galeria", async (req, res) => {
    try {
        const query = req.query.query || "nature";
        const response = await axios.get(pexelURL, {
            headers: { Authorization: pexelApi },
            params: { query, per_page: 10 }
        });

        let images = response.data.photos.map(photo => photo.src.medium);

        // Completar con imágenes aleatorias si faltan
        while (images.length < 10) {
            images.push(`https://picsum.photos/400/300?random=${images.length}`);
        }

        res.json({ gallery: images });
    } catch (error) {
        console.error("Error al obtener imágenes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor y conectar DB
app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

