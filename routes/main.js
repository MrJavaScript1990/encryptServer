//express framework and router
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

const PreSharedSecret=Buffer.from('@dfdfddsljfdl44098vkvkhot!@#$$%#');
const IV = Buffer.from('3907fbc9a33f26d1');



function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, PreSharedSecret, IV);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

function decrypt(text) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, PreSharedSecret, IV);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

function encryptObject(obj){
    let tempString=JSON.stringify(obj);
    return encrypt(tempString);
}

function decryptObject(string){
    let tempString=decrypt(string);
    return JSON.parse(tempString)
}




let a={Hello:81,world:true,Thailand:'Amazing'};

let b={Hello:54,world:true,Vietnam:'Helllooooooo'};

let c={Hello:15,world:true,Qatar:'Fat'};


router.post('/getEncryptedData', function (req, res) {
    let enStr='';
    switch (req.body.id) {
        case 'a':
            enStr=encryptObject(a) ;
            break;
        case 'b':
            enStr=encryptObject(b) ;
            break;
        case 'c':
            enStr=encryptObject(c) ;
            break;

    }
    res.json({data:enStr});

});

router.post('/sendEncryptedData', function (req, res) {
    console.log(req.body.eData);
    const encryptedStr = req.body.eData;
    console.log(decryptObject(encryptedStr));
    res.json({data:'Hash received and decoded by server ! please check the server logs for more info'});
});


module.exports = router;
