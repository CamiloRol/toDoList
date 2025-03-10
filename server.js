require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const path = require('path')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')

const app = express();
const PORT = process.env.PORT || 3000;

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
        const pool = await sql.connect();
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

        res.json({ message: "✅ Inicio de sesión exitoso", user });
    } catch (error) {
        res.status(500).json({ message: "Error en la autenticación", error });
    }
});

app.get('/api/photos', async (req, res) => {
    
        try {
            let URL = "https://jsonplaceholder.typicode.com/photos"
            let data = await fetch(URL)
            let photos = await data.json();
            
            res.json(photos.slice(0, 10)); 
           
        } catch (error) {
            console.log(error);
        }
    
})

// Servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor y conectar DB
app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

