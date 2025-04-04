const crypto = require('crypto');
const fs = require('fs');

const SYM_ALGORITHM = 'aes-128-ctr';
const SYM_KEY_LEN = 16;
const ASYM_HASH = 'sha256';
const ASYM_PAD = crypto.constants.RSA_PKCS1_PADDING;

const publicKey = fs.readFileSync('public.pem', 'utf8');

// Generate AES key and IV
const aesKey = crypto.randomBytes(SYM_KEY_LEN);
const iv = crypto.randomBytes(SYM_KEY_LEN);

// Sample messages to encrypt
const messages = [
    "This is message 1",
    "Another message goes here",
    "Secret message 3"
];

// AES encrypt function
function encrypt(text, key, iv) {
    const cipher = crypto.createCipheriv(SYM_ALGORITHM, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('base64'); // Store as base64 string
}

// RSA encrypt function for AES key & IV
function encryptWithPublicKey(data, publicKey) {
    const buffer = Buffer.from(data);
    const encrypted = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    }, buffer);
    return encrypted.toString('base64');
}

// Encrypt AES key and IV with RSA
const encryptedKey = encryptWithPublicKey(aesKey, publicKey);
const encryptedIV = encryptWithPublicKey(iv, publicKey);

// Encrypt all messages with AES
const encryptedMessages = messages.map(msg => encrypt(msg, aesKey, iv));

// Create JSON output
const output = {
    key: encryptedKey,
    iv: encryptedIV,
    data: encryptedMessages
};

// Save to file
fs.writeFileSync('msgs.json', JSON.stringify(output, null, 2));
console.log('Messages encrypted and saved to msgs.json');
