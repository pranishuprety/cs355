const crypto = require('crypto');
const fs = require('fs');

const SYM_ALGORITHM = 'aes-128-ctr';
const ASYM_PAD = crypto.constants.RSA_PKCS1_OAEP_PADDING;
const ASYM_HASH = 'sha256';

// AES decryption
function decrypt(text, key, iv) {
    const encryptedText = Buffer.from(text, 'base64');
    const decipher = crypto.createDecipheriv(SYM_ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// RSA decryption (returns Buffer)
function decryptPriv(text, privateKey) {
    const decryptedBuffer = crypto.privateDecrypt({
        key: privateKey,
        padding: ASYM_PAD,
        oaepHash: ASYM_HASH
    }, Buffer.from(text, 'base64'));
    return decryptedBuffer;
}

// Load the private key
const privateKey = fs.readFileSync('private.pem', 'utf8');

// Load the encrypted data
const messageFile = 'msgs.json'; 
const doc = JSON.parse(fs.readFileSync(messageFile));

// Decrypt AES key and IV
const key = decryptPriv(doc.key, privateKey);
const iv = decryptPriv(doc.iv, privateKey);

// Decrypt and print each message
console.log('Decrypted');
for (let txt of doc.data) {
    console.log(decrypt(txt, key, iv));
}
