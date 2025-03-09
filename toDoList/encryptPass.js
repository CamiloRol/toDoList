require('dotenv').config();
const sql = require('mssql');
const bcrypt = require('bcrypt');

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


// Conectar a la base de datos y actualizar contraseñas
async function encryptPasswords() {
    try {
        await sql.connect(dbConfig);
        console.log("✅ Conexión a SQL Server establecida");

        // Obtener usuarios con contraseñas sin encriptar
        const result = await sql.query('SELECT id, passwordUsers FROM Users');

        for (let user of result.recordset) {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(user.passwordUsers, 10);

            // Actualizar la base de datos con la nueva contraseña encriptada
            await sql.query(`
                UPDATE Users
                SET passwordUsers = '${hashedPassword}'
                WHERE id = ${user.id}
            `);
            console.log(`🔹 Contraseña encriptada para usuario ID: ${user.id}`);
        }

        console.log("✅ Todas las contraseñas han sido encriptadas con éxito");
        process.exit();
    } catch (error) {
        console.error("❌ Error encriptando contraseñas:", error);
        process.exit(1);
    }
}

// Ejecutar la función
encryptPasswords();
