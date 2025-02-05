import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'vetcont-database.cbayq2mkk3jt.us-east-1.rds.amazonaws.com',  // Endpoint de Amazon RDS
    user: 'edwinSolorzano',  // Usuario de la BD en RDS
    password: 'vetcont_database_amazon',  // Contraseña de la BD en RDS
    database: 'bd_sistema_veterinario',  // Nombre de la base de datos
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Prueba la conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error en la conexión a MySQL:', err);
        return;
    }
    console.log('✅ Conexión exitosa a MySQL en Amazon RDS');
    connection.release();
});

export default pool;
