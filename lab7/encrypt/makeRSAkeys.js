const crypto = require('crypto');
const fs = require('fs');

const PUBLIC_KEY_FILE = 'public.pem';
const PRIVATE_KEY_FILE = 'private.pem';

function generateAndSaveRSAKeys(publicKeyPath, privateKeyPath) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    // Save the keys to files
    fs.writeFileSync(publicKeyPath, publicKey);
    fs.writeFileSync(privateKeyPath, privateKey);

    console.log(`Public key saved to ${publicKeyPath}`);
    console.log(`Private key saved to ${privateKeyPath}`);
}

// Call the function
generateAndSaveRSAKeys(PUBLIC_KEY_FILE, PRIVATE_KEY_FILE);
