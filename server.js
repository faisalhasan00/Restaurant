const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

async function getConnection() {
    return await oracledb.getConnection({
        user: 'your_username',
        password: 'your_password',
        connectString: 'localhost/XEPDB1' // Replace with your connection string
    });
}

// API endpoint to get orders
app.get('/api/orders', async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.execute('SELECT * FROM orders');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
