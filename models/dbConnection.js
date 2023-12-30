const mongoose = require('mongoose');


async function dbConnecion() {
    const uri = 'mongodb://localhost:27017/myDatabase';
    await mongoose.connect(uri)
        .then(() => {
            console.log('Database connected');
        })
        .catch((err) => {
            console.log('Database connection failed!');
        })
}

module.exports = dbConnecion;