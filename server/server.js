const express = require('express')
const routes = require('./routes/routes.js')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors')
const bodyParser = require('body-parser');
const ENABLE_LOG = true
const ENABLE_LAG = false
const LAG_TIMERANGE = [1000, 1500] // If lag enable, wait beetwen 1 to 1.5s


const app = express()

app.use(cors());

// Make public dir accessible
app.use(express.static('public'))

// Enable parsing of query body content
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// Juste un petit middleware pour afficher chaque connection dans la console
// passez la constante ENABLE_LOG à false pour désactiver
if (ENABLE_LOG) {
    app.use((req, res, next) => {
        const clientIp = req.headers['x-forwarded-for'] || req.ip;
        const { method, originalUrl } = req;
        console.log(`Received request from IP: ${clientIp}, Method: ${method}, Endpoint: ${originalUrl}`);
        next(); // Pass control to the next middleware or route handler
    });
}

// Un autre petit middleware pour ajouter un faux lag au serveur pour simuler un réseau défaillant
// passez la constance ENABLE_LAG à true pour activer
if (ENABLE_LAG) {
    app.use((req, res, next) => {
        const randomInterval = Math.floor(Math.random() * (LAG_TIMERANGE[0] - LAG_TIMERANGE[1] + 1)) + LAG_TIMERANGE[0];
        setTimeout(() => {
            next(); // Continue to the next middleware or route handler
        }, randomInterval);
    });
}



app.use(bodyParser.json());

app.use('/', routes.router)

app.listen(3001, () => {
    console.log('Start server on port 3001')
})
