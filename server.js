const crypto = require('crypto');
const config = require('./config');
const axios = require('axios');
var fs = require("fs");
var assert = require('assert');

let publicKey = fs.readFileSync("./key/user_key.pub", "utf8");
let privateKey = fs.readFileSync("./key/user_key.priv", "utf8");
let serverKey = fs.readFileSync("./key/server_key.pub", "utf8");

assert(publicKey != "", "Unable to load user public key")
assert(privateKey != "", "Unable to load user private key")
assert(serverKey != "", "Unable to load server public key")

function encrypt_data(data) {
    let encrypted = ""
    try {
        let cipher = crypto.createCipher('aes-256-cbc', config.ENC_KEY);
        encrypted = cipher.update(data, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
    }
    catch (e) {
        console.log("Cannot encrypt data !!!")
        console.log(e)
    }    
    return encrypted
}

function decrypt_data(enc_data, dec_key) {
    let decrypted = ""
    try {
        let decipher = crypto.createDecipher('aes-256-cbc', dec_key);
        decrypted = decipher.update(enc_data, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        decrypted = JSON.parse(decrypted)
    }
    catch (e) {
        console.log("Cannot decrypt data !!!")
        console.log(e)        
    }  
    return decrypted  
}

function encrypt_key() {
    let enc_key = ""
    try {
        enc_key = crypto.publicEncrypt(serverKey, Buffer.from(JSON.stringify(config.ENC_KEY)));
        enc_key = enc_key.toString('base64')
    }
    catch (e) {
        console.log("Cannot encrypt key !!!")
        console.log(e)
    }
    return enc_key
}

function decrypt_key(enc_key) {
    let dec_key = ""
    try {
        dec_key = crypto.privateDecrypt(privateKey, Buffer.from(enc_key, "base64"));
        dec_key = dec_key.toString('utf-8')
    }
    catch (e) {
        console.log("Cannot decrypt key !!!")
        console.log(e)
    }
    return dec_key
}

axios
    .get(config.IH_URL + "/registerToken")
    .then(res => {
        console.log("Receiving token...")

        assert(res.data.token != "", "Token is empty")

        let token = 'OBC ' + res.data.token

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }

        const raw_data = {
            password: "testobc123"
        }

        const data = {
            encryptedkey: encrypt_key(),
            encrypteddata: encrypt_data(JSON.stringify(raw_data)),
            publickey: publicKey.replace(/(\r\n|\n|\r)/gm, "")
        }

        assert(data.encryptedkey != "", "Unable to encrypt key")
        assert(data.encrypteddata != "", "Unable to encrypt data")
        assert(data.publickey != "", "Unable to get public key")

        axios
            .post(config.IH_URL + config.IH_BC + "/web3.eth.personal/newAccount", data, {
                headers: headers
            })
            .then(res => {
                console.log("Receiving reply from Blockchain...")
                assert(res.data.result.EncryptKey != "", "Unable to get encrypted key from server")
                assert(res.data.result.EncryptedData != "", "Unable to get encrypted data from server")

                let rcv_key = decrypt_key(res.data.result.EncryptKey)
                let rcv_dat = decrypt_data(res.data.result.EncryptedData, rcv_key)
                console.log("Receive data:", rcv_dat)
            })
            .catch(error => {
                console.log(error.response)
            });
    })
    .catch(error => {
        console.log(error.response)
    });

