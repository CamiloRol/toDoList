require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de SQL Server
const dbConfig = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'Temporal10.',
    server: process.env.DB_SERVER || '192.168.1.70/MSSQLSERVER',
    database: process.env.DB_NAME || 'pearoneProc',
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
app.use(express.static(path.join(__dirname, 'public')));

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

// Servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor y conectar DB
app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

