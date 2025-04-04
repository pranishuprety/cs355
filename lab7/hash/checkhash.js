const bcrypt = require('bcrypt');
const fs = require('fs');

const HASH_FILE = 'password.txt'

async function main(){
    const input = process.argv[2];
    const savedhash = fs.readFileSync(HASH_FILE, 'utf8');
    
    const match = await bcrypt.compare(input, savedhash);
    
    if (match)console.log('Password matches!');
    else console.log('Password does not match.');
}

main();