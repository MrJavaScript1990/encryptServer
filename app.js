const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./routes/main');
const helmet=require('helmet');
const app = express();


app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//end points that client will call to them
app.use('/api', users);

//client can see if server running...
app.get('/', function(req, res) {
    res.send('Server Is Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
