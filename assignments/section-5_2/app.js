const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

const PORT = process.env.PORT || 3000

app.use(express.static('public'));

app.get('/users', (req, res, next) => {
    console.log('Users 2 path handler');
    res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

app.get('/', (req, res, next) => {
    console.log('Any path handler');
    res.send('<div>Any</div>');
})

app.listen(PORT, () => { console.log(`Server is  on port ${PORT}`)})
