const express = require('express');
const path = require('path');
const session = require('express-session');
const cookie = require('express-cookie');
const morgan = require('morgan');
const nocache = require('nocache');
const dbConnecion = require('./models/dbConnection');



require('dotenv/config');
dbConnecion();
const app = express();

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views', 'user'),
    path.join(__dirname, 'views', 'admin')
]);

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(morgan('tiny'));
// app.use(['/signin', '/admin/signin'], nocache());
app.use(nocache());


app.use('/', require('./routes/userRoute'));
app.use('/admin', require('./routes/adminRoute'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}/signin`));