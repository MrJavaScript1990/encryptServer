const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const main = require('./routes/main');
const helmet=require('helmet');
const app = express();


app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', main);

app.use(express.static(path.join(__dirname, 'Client/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/Client/build/index.html'));
});

//client can see if server running...
app.get('/status', function(req, res) {
    res.send('Server Is Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
